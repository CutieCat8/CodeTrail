import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { runnerWorkerSource } from "@/lib/runner";
import { lessons } from "@/content/lessons";
import type { TestResult, TestSpec } from "@/types/domain";

function runWorker(source: string, tests: TestSpec[], functionName = "answer"): TestResult[] {
  let response: { results?: TestResult[]; fatal?: string } | undefined;
  const worker = {
    postMessage(message: typeof response) { response = message; },
  } as { onmessage?: (event: { data: unknown }) => void; postMessage: (message: typeof response) => void };
  runInNewContext(runnerWorkerSource, { self: worker, structuredClone });
  worker.onmessage?.({ data: { source, functionName, tests } });
  if (!response?.results) throw new Error(response?.fatal ?? "Worker returned no results");
  return response.results;
}

describe("JavaScript runner comparisons", () => {
  it("rejects a nested object with different values", () => {
    const results = runWorker(
      'function answer() { return { user: { name: "Wrong", score: -1 } }; }',
      [{ name: "nested value", args: [], expected: { user: { name: "Sea", score: 10 } } }],
    );
    expect(results[0].passed).toBe(false);
  });

  it("compares nested arrays and objects regardless of object key order", () => {
    const result = runWorker(
      'function answer() { return [{ b: { y: 2, x: 1 }, a: true }]; }',
      [{ name: "same structure", args: [], expected: [{ a: true, b: { x: 1, y: 2 } }] }],
    );
    expect(result[0].passed).toBe(true);
  });

  it.each([
    ["missing property", "{ user: {} }", { user: { name: "Sea" } }],
    ["extra property", "{ user: { name: 'Sea', extra: true } }", { user: { name: "Sea" } }],
    ["wrong array item", "[{ score: 1 }]", [{ score: 2 }]],
    ["undefined", "undefined", null],
    ["non-finite number", "NaN", null],
    ["negative zero", "-0", 0],
  ])("rejects %s", (_name, actual, expected) => {
    const result = runWorker(`function answer() { return ${actual}; }`, [
      { name: "invalid result", args: [], expected },
    ]);
    expect(result[0].passed).toBe(false);
  });

  it("still passes every shipped automatic challenge solution", () => {
    for (const lesson of lessons.filter((item) => item.checkMode === "auto")) {
      const results = runWorker(lesson.solution, lesson.tests ?? [], lesson.functionName);
      expect(results.every((result) => result.passed), lesson.id).toBe(true);
    }
  });
});
