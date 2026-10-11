import { describe, expect, it } from "vitest";
import ts from "typescript";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { curriculumCourses, learningSteps, topicSources } from "@/content/curriculum";
import { buildSnippetWorkerSource, buildTestWorkerSource } from "@/lib/runner";
import type { TestResult, TestSpec } from "@/types/domain";
import type { TopicSource } from "@/types/curriculum";

// Topics marked standard "v3" must carry every part of the lesson standard in docs/COURSE-PLAN.md.
const v3Topics = topicSources.filter((topic) => topic.standard === "v3");

function runTests(source: string, functionName: string, tests: TestSpec[]) {
  const posted: Array<{ results?: TestResult[]; fatal?: string }> = [];
  const self: Record<string, unknown> = { postMessage: (message: { results?: TestResult[]; fatal?: string }) => posted.push(message) };
  new Function("self", buildTestWorkerSource())(self);
  (self.onmessage as (event: { data: unknown }) => void)({ data: { source, functionName, tests } });
  const outcome = posted[0];
  return outcome.fatal ? tests.map(() => false) : outcome.results!.map((result) => result.passed);
}

// Runs the exact snippet-worker source the browser uses, so expected outputs match what learners see.
async function consoleOutput(source: string) {
  const posted = new Promise<{ output: string[]; error?: string }>((resolve) => {
    const self: Record<string, unknown> = { postMessage: resolve };
    new Function("self", buildSnippetWorkerSource())(self);
    (self.onmessage as (event: { data: unknown }) => Promise<void>)({ data: { source } });
  });
  const result = await posted;
  expect(result.error, result.error).toBeUndefined();
  return result.output.join("\n");
}

const courseOrder = (topic: TopicSource) => topicSources.filter((other) => other.courseId === topic.courseId).findIndex((other) => other.id === topic.id);

describe("curriculum structure", () => {
  it("uses unique topic and step IDs", () => {
    const topicIds = topicSources.map((topic) => topic.id);
    expect(new Set(topicIds).size).toBe(topicIds.length);
    const stepIds = learningSteps.map((step) => step.id);
    expect(new Set(stepIds).size).toBe(stepIds.length);
  });

  it("assigns every topic to a known course", () => {
    const courseIds = new Set(curriculumCourses.map((course) => course.id));
    expect(topicSources.filter((topic) => !courseIds.has(topic.courseId)).map((topic) => topic.id)).toEqual([]);
  });

  it("links prerequisites to existing topics that come earlier in the same course", () => {
    const problems = topicSources.flatMap((topic) => (topic.prerequisites ?? []).flatMap((id) => {
      const prerequisite = topicSources.find((other) => other.id === id);
      if (!prerequisite) return [`${topic.id} → missing ${id}`];
      if (prerequisite.courseId === topic.courseId && courseOrder(prerequisite) >= courseOrder(topic)) return [`${topic.id} → ${id} comes later`];
      return [];
    }));
    expect(problems).toEqual([]);
  });
});

describe("v3 lesson standard", () => {
  it("has at least the exemplar lesson", () => {
    expect(v3Topics.map((topic) => topic.id)).toContain("js-functions");
  });

  it.each(v3Topics.map((topic) => [topic.id, topic] as const))("%s has every teaching part", (_id, topic) => {
    expect(topic.lesson, "standard topics need a rich lesson").toBeDefined();
    const lesson = topic.lesson!;
    if (topic.language === "javascript" || topic.language === "node") expect(topic.expectedOutput, "runnable examples need an expected output").toBeDefined();
    expect(topic.objective.trim()).not.toBe("");
    expect(lesson.hook.trim()).not.toBe("");
    expect(lesson.explain.length).toBeGreaterThan(0);
    expect(lesson.walkthrough.length).toBeGreaterThan(0);
    expect(lesson.pitfalls.length).toBeGreaterThan(0);
    expect(lesson.checks!.length).toBeGreaterThanOrEqual(2);
    expect(lesson.practiceHints).toHaveLength(3);
    expect(lesson.acceptance!.length).toBeGreaterThan(0);
    expect(lesson.solutionNotes!.length).toBeGreaterThan(0);
    expect(lesson.reflection!.length).toBeGreaterThan(0);
    expect(topic.starter.trim()).not.toBe(topic.solution.trim());
    if (lesson.analogy) {
      expect(lesson.analogy.mapping!.length).toBeGreaterThan(0);
      expect(lesson.analogy.limits!.trim()).not.toBe("");
    }
  });
});

describe("runnable JavaScript examples", () => {
  const jsTopics = topicSources.filter((topic) => topic.language === "javascript");

  it.each(jsTopics.filter((topic) => topic.expectedOutput !== undefined).map((topic) => [topic.id, topic] as const))("%s example prints its expected output", async (_id, topic) => {
    expect(await consoleOutput(topic.example)).toBe(topic.expectedOutput);
  });

  it.each(jsTopics.flatMap((topic) => (topic.lesson?.explain ?? []).filter((block) => block.code && block.output !== undefined).map((block) => [`${topic.id}: ${block.heading}`, block] as const)))("%s prints its expected output", async (_label, block) => {
    expect(await consoleOutput(block.code!)).toBe(block.output);
  });
});

describe("auto-checked practice", () => {
  const checked = topicSources.filter((topic) => topic.autoCheck);

  it.each(checked.map((topic) => [topic.id, topic] as const))("%s: solution passes, starter and known wrong answers fail", (_id, topic) => {
    const { functionName, tests, wrongAnswers = [] } = topic.autoCheck!;
    expect(runTests(topic.solution, functionName, tests).every(Boolean)).toBe(true);
    expect(runTests(topic.starter, functionName, tests).every(Boolean)).toBe(false);
    for (const wrong of wrongAnswers) expect(runTests(wrong, functionName, tests).every(Boolean), wrong).toBe(false);
  });

  it("only auto-checks topics whose practice runs as JavaScript in the browser", () => {
    expect(checked.filter((topic) => topic.language !== "javascript").map((topic) => topic.id)).toEqual([]);
  });

  it("exposes the check on the practice step", () => {
    for (const topic of checked) expect(learningSteps.find((step) => step.id === `${topic.id}-practice`)?.check).toEqual(topic.autoCheck);
  });
});

function runSnippet(source: string) {
  return new Promise<{ output: string[]; error?: string }>((resolve) => {
    const self: Record<string, unknown> = { postMessage: resolve };
    new Function("self", buildSnippetWorkerSource())(self);
    (self.onmessage as (event: { data: unknown }) => Promise<void>)({ data: { source } });
  });
}

describe("output-checked practice", () => {
  const checked = topicSources.filter((topic) => topic.outputCheck);

  it.each(checked.map((topic) => [topic.id, topic] as const))("%s: solution prints the expected output, starter and wrong scripts do not", async (_id, topic) => {
    const { expected, wrongAnswers = [] } = topic.outputCheck!;
    const solution = await runSnippet(topic.solution);
    expect(solution.error).toBeUndefined();
    expect(solution.output.join("\n")).toBe(expected);
    const starter = await runSnippet(topic.starter);
    expect(!starter.error && starter.output.join("\n") === expected).toBe(false);
    for (const wrong of wrongAnswers) {
      const result = await runSnippet(wrong);
      expect(!result.error && result.output.join("\n") === expected, wrong).toBe(false);
    }
  });

  it("uses at most one checking mechanism per practice and only for in-browser JavaScript", () => {
    expect(checked.filter((topic) => topic.autoCheck || topic.language !== "javascript").map((topic) => topic.id)).toEqual([]);
    for (const topic of checked) expect(learningSteps.find((step) => step.id === `${topic.id}-practice`)?.outputCheck).toEqual(topic.outputCheck);
  });
});

describe("snippet runner", () => {
  it("keeps output when an awaited promise never settles", async () => {
    const result = await runSnippet("console.log(\"before\");\nawait new Promise(() => {});");
    expect(result.output).toEqual(["before"]);
    expect(result.error).toMatch(/Promise ซึ่งไม่เคยจบ/);
  });

  it("reports an error thrown inside a timer callback with earlier output", async () => {
    const result = await runSnippet("console.log(\"before\");\nsetTimeout(() => { throw new Error(\"boom\"); }, 10);");
    expect(result.output).toEqual(["before"]);
    expect(result.error).toBe("Error: boom");
  });

  it("waits for timers started through self.setTimeout", async () => {
    const result = await runSnippet("self.setTimeout(() => console.log(\"late\"), 20);\nconsole.log(\"sync\");");
    expect(result).toMatchObject({ output: ["sync", "late"] });
    expect(result.error).toBeUndefined();
  });

  it("reports an interval that is never cleared", async () => {
    const result = await runSnippet("setInterval(() => {}, 20);\nconsole.log(\"started\");");
    expect(result.output).toEqual(["started"]);
    expect(result.error).toMatch(/clearInterval/);
  });

  it("collects output from promises and timers, and prints NaN and errors readably", async () => {
    const posted = new Promise<{ output: string[]; error?: string }>((resolve) => {
      const self: Record<string, unknown> = { postMessage: resolve };
      new Function("self", buildSnippetWorkerSource())(self);
      (self.onmessage as (event: { data: unknown }) => Promise<void>)({ data: { source: [
        "console.log(\"sync\", NaN, [1, 2]);",
        "setTimeout(() => console.log(\"timer\"), 20);",
        "await Promise.resolve();",
        "console.log(\"after await\");",
        "console.warn(new Error(\"careful\"));",
      ].join("\n") } });
    });
    const result = await posted;
    expect(result.error).toBeUndefined();
    expect(result.output).toEqual(["sync NaN [1,2]", "after await", "⚠ Error: careful", "timer"]);
  });

  it("reports a thrown error after keeping earlier output", async () => {
    const posted = new Promise<{ output: string[]; error?: string }>((resolve) => {
      const self: Record<string, unknown> = { postMessage: resolve };
      new Function("self", buildSnippetWorkerSource())(self);
      (self.onmessage as (event: { data: unknown }) => Promise<void>)({ data: { source: "console.log(\"before\");\nnull.length;" } });
    });
    const result = await posted;
    expect(result.output).toEqual(["before"]);
    expect(result.error).toMatch(/^TypeError: /);
  });
});

// TypeScript lessons: examples and solutions must type-check under strict, and examples must print their expected output.
const tsOptions: ts.CompilerOptions = { strict: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleDetection: ts.ModuleDetectionKind.Force, lib: ["lib.es2022.d.ts", "lib.dom.d.ts"], noEmit: true, types: [] };
const tsHost = ts.createCompilerHost(tsOptions);
const libCache = new Map<string, ts.SourceFile | undefined>();
const readLib = tsHost.getSourceFile.bind(tsHost);
function typeErrors(source: string) {
  const host: ts.CompilerHost = {
    ...tsHost,
    getSourceFile: (name, languageVersion, ...rest) => {
      if (name === "lesson.ts") return ts.createSourceFile(name, source, languageVersion, true);
      if (!libCache.has(name)) libCache.set(name, readLib(name, languageVersion, ...rest));
      return libCache.get(name);
    },
  };
  const program = ts.createProgram(["lesson.ts"], tsOptions, host);
  return ts.getPreEmitDiagnostics(program).map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}
const toJs = (source: string) => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleDetection: ts.ModuleDetectionKind.Force } }).outputText.replace(/^export \{\};\s*$/m, "");

describe("TypeScript lessons", () => {
  const tsTopics = topicSources.filter((topic) => topic.language === "typescript");

  it("ships the TypeScript course", () => {
    expect(tsTopics.length).toBeGreaterThanOrEqual(12);
  });

  it.each(tsTopics.map((topic) => [topic.id, topic] as const))("%s example and solution type-check under strict", (_id, topic) => {
    expect(typeErrors(topic.example)).toEqual([]);
    expect(typeErrors(topic.solution)).toEqual([]);
    for (const block of topic.lesson?.explain ?? []) if (block.code) expect(typeErrors(block.code), block.heading).toEqual([]);
  });

  it.each(tsTopics.map((topic) => [topic.id, topic] as const))("%s debug step matches what tsc really reports", (_id, topic) => {
    const errors = typeErrors(topic.buggy);
    if (/^tsc แจ้ง/.test(topic.bugExplanation)) expect(errors.length, "explanation says tsc reports an error").toBeGreaterThan(0);
    if (/^tsc (ผ่าน|ไม่เตือน|ตรวจผ่าน)/.test(topic.bugExplanation)) expect(errors, "explanation says tsc passes").toEqual([]);
  });

  it.each(tsTopics.filter((topic) => topic.expectedOutput !== undefined).map((topic) => [topic.id, topic] as const))("%s example prints its expected output", async (_id, topic) => {
    const result = await runSnippet(toJs(topic.example));
    expect(result.error).toBeUndefined();
    expect(result.output.join("\n")).toBe(topic.expectedOutput);
  });

  it.each(tsTopics.flatMap((topic) => (topic.lesson?.explain ?? []).filter((block) => block.code && block.output !== undefined).map((block) => [`${topic.id}: ${block.heading}`, block] as const)))("%s prints its expected output", async (_label, block) => {
    const result = await runSnippet(toJs(block.code!));
    expect(result.error).toBeUndefined();
    expect(result.output.join("\n")).toBe(block.output);
  });
});

// Node lessons use APIs the browser runner lacks, so examples run in a real Node process in a scratch directory.
describe("Node lessons", () => {
  const nodeTopics = topicSources.filter((topic) => topic.language === "node" && !topic.requires?.length);
  const runNode = (source: string) => {
    const dir = mkdtempSync(path.join(tmpdir(), "node-lesson-"));
    try {
      const file = path.join(dir, "example.mjs");
      writeFileSync(file, source);
      return execFileSync(process.execPath, [file], { cwd: dir, encoding: "utf8", timeout: 15000 }).replace(/\n$/, "");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };

  it("ships the Node course", () => {
    expect(nodeTopics.length).toBeGreaterThanOrEqual(10);
  });

  it.each(nodeTopics.filter((topic) => topic.expectedOutput !== undefined).map((topic) => [topic.id, topic] as const))("%s example prints its expected output in Node", (_id, topic) => {
    expect(runNode(topic.example)).toBe(topic.expectedOutput);
  });

  it.each(nodeTopics.flatMap((topic) => (topic.lesson?.explain ?? []).filter((block) => block.code && block.output !== undefined).map((block) => [`${topic.id}: ${block.heading}`, block] as const)))("%s prints its expected output in Node", (_label, block) => {
    expect(runNode(block.code!)).toBe(block.output);
  });
});

describe("labs link to the curriculum", () => {
  it("every lab links to existing curriculum topics", async () => {
    const { lessons } = await import("@/content/lessons");
    const topicIds = new Set(topicSources.map((topic) => topic.id));
    const problems = lessons.flatMap((lesson) =>
      !lesson.relatedTopics?.length ? [`${lesson.id} has no relatedTopics`] : lesson.relatedTopics.filter((id) => !topicIds.has(id)).map((id) => `${lesson.id} → missing ${id}`));
    expect(problems).toEqual([]);
  });
});
