import type { TestResult, TestSpec } from "@/types/domain";

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
