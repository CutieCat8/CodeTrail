import type { TestResult, TestSpec } from "@/types/domain";
import { compareTestValue } from "@/lib/compare";

export type SnippetRunResult = {
  output: string[];
  error?: string;
  durationMs: number;
};

// Pending timers started by a snippet get this long to finish before output is posted, which stays
// below the 1.5 s hard timeout so async lessons still show their output.
const SNIPPET_SETTLE_LIMIT_MS = 1200;

// Snippets run as an async function body (top-level await works) with console and timers passed in,
// so output from promises and timers is collected; tests execute this same string.
export function buildSnippetWorkerSource() {
  return `
    self.fetch = () => Promise.reject(new Error("network access is disabled"));
    self.XMLHttpRequest = undefined;
    self.WebSocket = undefined;
    self.importScripts = () => { throw new Error("imports are disabled"); };
    const format = (value) => {
      if (typeof value === "string") return value;
      if (value === undefined) return "undefined";
      if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || typeof value === "symbol") return String(value);
      if (typeof value === "function") return "[Function " + (value.name || "anonymous") + "]";
      if (value instanceof Error) return value.name + ": " + value.message;
      try { const json = JSON.stringify(value); return json === undefined ? String(value) : json; } catch { return String(value); }
    };
    const describe = (error) => error instanceof Error ? error.name + ": " + error.message : "Uncaught " + format(error);
    const nativeSetTimeout = setTimeout;
    const nativeClearTimeout = clearTimeout;
    const nativeSetInterval = setInterval;
    const nativeClearInterval = clearInterval;
    self.onmessage = async ({ data }) => {
      const output = [];
      const write = (...values) => output.push(values.map(format).join(" "));
      const learnerConsole = { log: write, info: write, warn: (...values) => write("⚠", ...values), error: (...values) => write("✕", ...values) };
      self.console = learnerConsole;
      let failure;
      const fail = (error) => { if (failure === undefined) failure = describe(error); };
      const pending = new Set();
      const guard = (callback, args) => { try { callback(...args); } catch (error) { fail(error); } };
      const timers = {
        setTimeout: (callback, delay, ...args) => { const id = nativeSetTimeout(() => { pending.delete(id); guard(callback, args); }, delay); pending.add(id); return id; },
        clearTimeout: (id) => { pending.delete(id); nativeClearTimeout(id); },
        setInterval: (callback, delay, ...args) => { const id = nativeSetInterval(() => guard(callback, args), delay); pending.add(id); return id; },
        clearInterval: (id) => { pending.delete(id); nativeClearInterval(id); },
      };
      Object.assign(self, timers);
      self.onunhandledrejection = (event) => { event.preventDefault(); fail(event.reason); };
      const started = performance.now();
      const elapsed = () => Math.max(1, Math.round(performance.now() - started));
      let deadlineId;
      const deadline = new Promise((resolve) => { deadlineId = nativeSetTimeout(() => resolve("deadline"), ${SNIPPET_SETTLE_LIMIT_MS}); });
      try {
        const AsyncFunction = (async () => {}).constructor;
        const body = new AsyncFunction("self", "console", "setTimeout", "clearTimeout", "setInterval", "clearInterval", '"use strict";\\n' + data.source)(self, learnerConsole, timers.setTimeout, timers.clearTimeout, timers.setInterval, timers.clearInterval);
        const outcome = await Promise.race([body.then(() => "done"), deadline]);
        nativeClearTimeout(deadlineId);
        while (outcome === "done" && failure === undefined && pending.size > 0 && elapsed() < ${SNIPPET_SETTLE_LIMIT_MS}) await new Promise((resolve) => nativeSetTimeout(resolve, 5));
        await new Promise((resolve) => nativeSetTimeout(resolve, 0));
        const error = failure ?? (outcome === "deadline" ? "หยุดรอหลัง ${SNIPPET_SETTLE_LIMIT_MS} ms — มี await ที่รอ Promise ซึ่งไม่เคยจบ" : pending.size > 0 ? "หยุดรอ timer ที่ยังค้างหลัง ${SNIPPET_SETTLE_LIMIT_MS} ms — ตรวจ setInterval ที่ไม่ได้ clearInterval" : undefined);
        for (const id of pending) { nativeClearTimeout(id); nativeClearInterval(id); }
        self.postMessage({ output, error, durationMs: elapsed() });
      } catch (error) {
        nativeClearTimeout(deadlineId);
        fail(error);
        for (const id of pending) { nativeClearTimeout(id); nativeClearInterval(id); }
        self.postMessage({ output, error: failure, durationMs: elapsed() });
      }
    };
  `;
}

export async function runIsolatedSnippet(source: string): Promise<SnippetRunResult> {
  const url = URL.createObjectURL(new Blob([buildSnippetWorkerSource()], { type: "text/javascript" }));
  const worker = new Worker(url);
  return new Promise((resolve) => {
    const finish = (result: SnippetRunResult) => {
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(result);
    };
    const timeout = window.setTimeout(() => finish({ output: [], error: "หยุดการทำงานหลังเกิน 1.5 วินาที — ตรวจสอบ infinite loop", durationMs: 1500 }), 1500);
    worker.onmessage = ({ data }) => {
      window.clearTimeout(timeout);
      finish(data as SnippetRunResult);
    };
    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      finish({ output: [], error: event.message || "ไม่สามารถรันโค้ดได้", durationMs: 0 });
    };
    worker.postMessage({ source });
  });
}

// The Worker embeds compareTestValue's source, so tests that run this string exercise
// the same comparison the browser uses.
export function buildTestWorkerSource() {
  return `
    self.fetch = () => Promise.reject(new Error("network access is disabled"));
    self.XMLHttpRequest = undefined;
    self.WebSocket = undefined;
    self.importScripts = () => { throw new Error("imports are disabled"); };
    const compareTestValue = (${compareTestValue.toString()});
    self.onmessage = ({ data }) => {
      const results = [];
      try {
        const fn = new Function('"use strict";\\n' + data.source + '\\nreturn typeof ' + data.functionName + ' === "function" ? ' + data.functionName + ' : null;')();
        if (!fn) throw new Error('ไม่พบฟังก์ชัน ' + data.functionName);
        for (const test of data.tests) {
          try {
            const clonedArgs = structuredClone(test.args);
            const actual = fn(...clonedArgs);
            if (actual instanceof Promise) throw new Error("โจทย์นี้ยังไม่รองรับ async function");
            const comparison = compareTestValue(actual, test.expected);
            const result = { name: test.name, passed: comparison.passed, expected: JSON.stringify(test.expected), actual: comparison.actual };
            if (comparison.error) result.error = comparison.error;
            results.push(result);
          } catch (error) {
            results.push({ name: test.name, passed: false, expected: JSON.stringify(test.expected), actual: "—", error: error instanceof Error ? error.message : String(error) });
          }
        }
        self.postMessage({ results });
      } catch (error) {
        self.postMessage({ fatal: error instanceof Error ? error.message : String(error) });
      }
    };
  `;
}

export async function runIsolatedTests(source: string, functionName: string, tests: TestSpec[]): Promise<TestResult[]> {
  const url = URL.createObjectURL(new Blob([buildTestWorkerSource()], { type: "text/javascript" }));
  const worker = new Worker(url);
  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      worker.terminate(); URL.revokeObjectURL(url);
      resolve(tests.map((test) => ({ name: test.name, passed: false, expected: JSON.stringify(test.expected), actual: "—", error: "หยุดการทำงานหลังเกิน 1.5 วินาที" })));
    }, 1500);
    worker.onmessage = ({ data }) => {
      window.clearTimeout(timeout); worker.terminate(); URL.revokeObjectURL(url);
      if (data.fatal) resolve(tests.map((test) => ({ name: test.name, passed: false, expected: JSON.stringify(test.expected), actual: "—", error: data.fatal })));
      else resolve(data.results);
    };
    worker.onerror = (event) => {
      window.clearTimeout(timeout); worker.terminate(); URL.revokeObjectURL(url);
      resolve(tests.map((test) => ({ name: test.name, passed: false, expected: JSON.stringify(test.expected), actual: "—", error: event.message })));
    };
    worker.postMessage({ source, functionName, tests });
  });
}
