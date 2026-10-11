import { describe, expect, it } from "vitest";
import { compareTestValue } from "@/lib/compare";
import { buildTestWorkerSource } from "@/lib/runner";
import { lessons } from "@/content/lessons";
import type { TestResult, TestSpec } from "@/types/domain";

// Executes the exact source string the browser Worker receives, with a stand-in `self`.
function runInTestWorker(source: string, functionName: string, tests: TestSpec[]) {
  const posted: Array<{ results?: TestResult[]; fatal?: string }> = [];
  const self: Record<string, unknown> = { postMessage: (message: { results?: TestResult[]; fatal?: string }) => posted.push(message) };
  new Function("self", buildTestWorkerSource())(self);
  (self.onmessage as (event: { data: unknown }) => void)({ data: { source, functionName, tests } });
  expect(posted).toHaveLength(1);
  return posted[0];
}

describe("compareTestValue", () => {
  it("rejects a wrong item inside an array of objects", () => {
    expect(compareTestValue([{ id: 2, kind: "onsite" }], [{ id: 1, kind: "online" }]).passed).toBe(false);
    expect(compareTestValue([{ x: 0 }, { y: 0 }], [{ id: 1, kind: "online" }, { id: 2, kind: "onsite" }]).passed).toBe(false);
  });

  it("rejects a wrong value inside a nested object", () => {
    expect(compareTestValue({ a: { b: 1 } }, { a: { b: 2 } }).passed).toBe(false);
    expect(compareTestValue({ a: { b: 1 } }, { a: { b: 1, c: 2 } }).passed).toBe(false);
    expect(compareTestValue({ a: { b: 1, extra: 0 } }, { a: { b: 1 } }).passed).toBe(false);
  });

  it("accepts plain objects whose keys are in a different order", () => {
    expect(compareTestValue({ b: 1, a: { d: [1, 2], c: "x" } }, { a: { c: "x", d: [1, 2] }, b: 1 })).toEqual({ passed: true, actual: '{"b":1,"a":{"d":[1,2],"c":"x"}}' });
  });

  it("treats array order as significant", () => {
    expect(compareTestValue([2, 1], [1, 2]).passed).toBe(false);
    expect(compareTestValue([{ id: 2 }, { id: 1 }], [{ id: 1 }, { id: 2 }]).passed).toBe(false);
  });

  it("does not confuse arrays with objects or mismatched primitives", () => {
    expect(compareTestValue({ 0: 1 }, [1]).passed).toBe(false);
    expect(compareTestValue("1", 1).passed).toBe(false);
    expect(compareTestValue(null, {}).passed).toBe(false);
    expect(compareTestValue([], []).passed).toBe(true);
    expect(compareTestValue({}, {}).passed).toBe(true);
  });

  it.each([
    ["undefined", undefined],
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["bigint", BigInt(1)],
    ["function", () => 1],
    ["symbol", Symbol("s")],
    ["Date", new Date(0)],
    ["Map", new Map()],
    ["Set", new Set()],
    ["class instance", new (class Point { x = 1; })()],
    ["undefined in array", [undefined]],
    ["sparse array", new Array(1)],
    ["undefined property", { a: undefined }],
    ["symbol key", { [Symbol("k")]: 1 }],
  ])("reports an unsupported actual value (%s) instead of passing", (_label, actual) => {
    const result = compareTestValue(actual, null);
    expect(result.passed).toBe(false);
    expect(result.actual).toBe("—");
    expect(result.error).toMatch(/ไม่รองรับ/);
  });

  it("reports circular references as unsupported", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(compareTestValue(circular, {}).error).toMatch(/circular/);
  });

  it("reports a symbol key hidden on an array", () => {
    const withSymbol: unknown[] = [];
    (withSymbol as unknown as Record<symbol, unknown>)[Symbol("s")] = () => 1;
    expect(compareTestValue(withSymbol, []).error).toMatch(/symbol key/);
  });

  it("reports extra non-index properties on an array", () => {
    const withExtra = Object.assign([1], { note: "x" });
    expect(compareTestValue(withExtra, [1]).error).toMatch(/property อื่น/);
  });

  it("reports non-enumerable properties", () => {
    const hidden = Object.defineProperty({}, "bad", { value: () => 1 });
    expect(compareTestValue(hidden, {}).error).toMatch(/ไม่ enumerable/);
  });

  it("does not let an inherited index fill a sparse array", () => {
    const sparse = new Array(1);
    const arrayProto = Array.prototype as unknown as Record<string, unknown>;
    arrayProto[0] = 1;
    try {
      expect(compareTestValue(sparse, [1]).error).toMatch(/ช่องว่างใน array/);
    } finally {
      delete arrayProto[0];
    }
  });

  it("reports getters instead of reading them repeatedly", () => {
    let reads = 0;
    const shifting = { get a() { reads += 1; return reads <= 2 ? 2 : undefined; } };
    expect(compareTestValue(shifting, { a: 2 })).toMatchObject({ passed: false, error: expect.stringMatching(/getter/) });
    expect(reads).toBe(0);
  });

  it("names a non-plain prototype without invoking its constructor getter", () => {
    const proto = Object.defineProperty({}, "constructor", { get() { throw new Error("constructor getter invoked"); } });
    expect(compareTestValue(Object.create(proto), {}).error).toMatch(/object ไม่ใช่ plain object/);
  });

  it("reports nesting deeper than the supported limit instead of overflowing the stack", () => {
    let deep: unknown = 0;
    for (let level = 0; level < 5000; level += 1) deep = { a: deep };
    expect(compareTestValue(deep, deep).error).toMatch(/ซ้อนลึกเกิน 200 ชั้น/);
    let supported: unknown = 0;
    for (let level = 0; level < 199; level += 1) supported = { a: supported };
    expect(compareTestValue(supported, JSON.parse(JSON.stringify(supported))).passed).toBe(true);
  });

  it("keeps an own __proto__ key as data", () => {
    const parsed = JSON.parse('{"__proto__":{"a":1}}');
    expect(compareTestValue(parsed, JSON.parse('{"__proto__":{"a":1}}'))).toEqual({ passed: true, actual: '{"__proto__":{"a":1}}' });
    expect(compareTestValue(parsed, {}).passed).toBe(false);
  });

  it("reports an unsupported expected value as a content error", () => {
    expect(compareTestValue(null, Number.NaN)).toMatchObject({ passed: false, error: expect.stringMatching(/^โจทย์กำหนด expected/) });
  });

  it("survives being evaluated without its module scope, as the Worker does", () => {
    const isolated = new Function(`return (${compareTestValue.toString()});`)() as typeof compareTestValue;
    expect(isolated([{ id: 2 }], [{ id: 1 }]).passed).toBe(false);
    expect(isolated({ b: 1, a: 2 }, { a: 2, b: 1 }).passed).toBe(true);
    expect(isolated(undefined, null).error).toMatch(/ไม่รองรับ/);
  });
});

describe("test Worker source", () => {
  const autoLessons = lessons.filter((lesson) => lesson.checkMode === "auto");

  it("covers every auto-checked lesson", () => {
    expect(autoLessons.length).toBeGreaterThan(0);
  });

  it.each(autoLessons.map((lesson) => [lesson.id, lesson] as const))("passes the reference solution for %s", (_id, lesson) => {
    const outcome = runInTestWorker(lesson.solution, lesson.functionName!, lesson.tests!);
    expect(outcome.fatal).toBeUndefined();
    expect(outcome.results!.filter((result) => !result.passed)).toEqual([]);
  });

  it.each(autoLessons.map((lesson) => [lesson.id, lesson] as const))("rejects a wrong answer on every case for %s", (_id, lesson) => {
    const outcome = runInTestWorker(`function ${lesson.functionName}() { return "WRONG"; }`, lesson.functionName!, lesson.tests!);
    expect(outcome.results!.map((result) => result.passed)).toEqual(lesson.tests!.map(() => false));
  });

  it("never invokes a getter on the learner's answer, even a self-deleting then", () => {
    const answer = `function answer() { const value = { get then() { globalThis.__thenReads = (globalThis.__thenReads ?? 0) + 1; delete this.then; return undefined; } }; return value; }`;
    try {
      const outcome = runInTestWorker(answer, "answer", [{ name: "accessor", args: [], expected: {} }]);
      expect(outcome.results![0]).toMatchObject({ passed: false, error: expect.stringMatching(/getter/) });
      expect((globalThis as Record<string, unknown>).__thenReads).toBeUndefined();
    } finally {
      delete (globalThis as Record<string, unknown>).__thenReads;
    }
  });

  it("still reports async functions clearly", () => {
    const outcome = runInTestWorker("async function answer() { return 1; }", "answer", [{ name: "async", args: [], expected: 1 }]);
    expect(outcome.results![0]).toMatchObject({ passed: false, error: expect.stringMatching(/async function/) });
  });

  it("rejects a filter that returns the wrong objects", () => {
    const filterLesson = autoLessons.find((lesson) => lesson.functionName === "filterActivities")!;
    const wrong = `function filterActivities(items, kind) { return kind === "all" ? items.map((item) => ({ ...item, id: 0 })) : items.filter((item) => item.kind !== kind); }`;
    const outcome = runInTestWorker(wrong, "filterActivities", filterLesson.tests!);
    const byName = Object.fromEntries(outcome.results!.map((result) => [result.name, result.passed]));
    expect(byName).toEqual({ "แสดงทั้งหมด": false, "กรองออนไลน์": false, "รายการว่าง": true });
  });

  it("rejects a hidden non-enumerable function on an otherwise correct answer", () => {
    const validateLesson = autoLessons.find((lesson) => lesson.functionName === "validateActivity")!;
    const hidden = `function validateActivity() { return Object.defineProperty({}, "bad", { value: () => 1 }); }`;
    const outcome = runInTestWorker(hidden, "validateActivity", validateLesson.tests!.slice(0, 1));
    expect(outcome.results![0]).toMatchObject({ passed: false, error: expect.stringMatching(/ไม่ enumerable/) });
  });

  it("fails an unsupported return value with an explanatory error", () => {
    const outcome = runInTestWorker("function answer() { return undefined; }", "answer", [{ name: "undefined", args: [], expected: null }]);
    expect(outcome.results).toEqual([{ name: "undefined", passed: false, expected: "null", actual: "—", error: expect.stringMatching(/ไม่รองรับ/) }]);
  });
});
