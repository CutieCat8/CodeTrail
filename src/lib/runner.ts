import type { TestResult, TestSpec } from "@/types/domain";

export type SnippetRunResult = {
  output: string[];
  error?: string;
  durationMs: number;
};

export async function runIsolatedSnippet(source: string): Promise<SnippetRunResult> {
  const workerSource = `
    self.fetch = () => Promise.reject(new Error("network access is disabled"));
    self.XMLHttpRequest = undefined;
    self.WebSocket = undefined;
    self.importScripts = () => { throw new Error("imports are disabled"); };
    const format = (value) => {
      if (typeof value === "string") return value;
      if (typeof value === "undefined") return "undefined";
      try { return JSON.stringify(value); } catch { return String(value); }
    };
    self.onmessage = ({ data }) => {
      const output = [];
      const write = (...values) => output.push(values.map(format).join(" "));
      self.console = { log: write, info: write, warn: (...values) => write("⚠", ...values), error: (...values) => write("✕", ...values) };
      const started = performance.now();
      try {
        new Function('"use strict";\\n' + data.source)();
        self.postMessage({ output, durationMs: Math.max(1, Math.round(performance.now() - started)) });
      } catch (error) {
        self.postMessage({ output, error: error instanceof Error ? error.name + ": " + error.message : String(error), durationMs: Math.max(1, Math.round(performance.now() - started)) });
      }
    };
  `;
  const url = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
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

export async function runIsolatedTests(source: string, functionName: string, tests: TestSpec[]): Promise<TestResult[]> {
  const workerSource = `
    self.fetch = () => Promise.reject(new Error("network access is disabled"));
    self.XMLHttpRequest = undefined;
    self.WebSocket = undefined;
    self.importScripts = () => { throw new Error("imports are disabled"); };
    const stable = (value) => JSON.stringify(value, Object.keys(value && typeof value === "object" && !Array.isArray(value) ? value : {}).sort());
    self.onmessage = ({ data }) => {
      const results = [];
      try {
        const fn = new Function('"use strict";\\n' + data.source + '\\nreturn typeof ' + data.functionName + ' === "function" ? ' + data.functionName + ' : null;')();
        if (!fn) throw new Error('ไม่พบฟังก์ชัน ' + data.functionName);
        for (const test of data.tests) {
          try {
            const clonedArgs = structuredClone(test.args);
            const actual = fn(...clonedArgs);
            if (actual && typeof actual.then === "function") throw new Error("โจทย์นี้ยังไม่รองรับ async function");
            const passed = stable(actual) === stable(test.expected);
            results.push({ name: test.name, passed, expected: JSON.stringify(test.expected), actual: JSON.stringify(actual) });
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
  const url = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
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
