import type { TestResult, TestSpec } from "@/types/domain";

export const runnerWorkerSource = `
    self.fetch = () => Promise.reject(new Error("network access is disabled"));
    self.XMLHttpRequest = undefined;
    self.WebSocket = undefined;
    self.importScripts = () => { throw new Error("imports are disabled"); };
    const equal = (actual, expected) => {
      if (actual === null || expected === null) return actual === expected;
      if (typeof actual !== typeof expected) return false;
      if (typeof actual === "number") return Number.isFinite(actual) && Number.isFinite(expected) && Object.is(actual, expected);
      if (typeof actual === "string" || typeof actual === "boolean") return actual === expected;
      if (Array.isArray(actual) || Array.isArray(expected)) {
        return Array.isArray(actual) && Array.isArray(expected)
          && actual.length === expected.length
          && actual.every((item, index) => equal(item, expected[index]));
      }
      if (Object.prototype.toString.call(actual) !== "[object Object]" || Object.prototype.toString.call(expected) !== "[object Object]") return false;
      const actualKeys = Object.keys(actual);
      const expectedKeys = Object.keys(expected);
      return actualKeys.length === expectedKeys.length
        && expectedKeys.every((key) => Object.prototype.hasOwnProperty.call(actual, key) && equal(actual[key], expected[key]));
    };
    const display = (value) => JSON.stringify(value) ?? String(value);
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
            const passed = equal(actual, test.expected);
            results.push({ name: test.name, passed, expected: display(test.expected), actual: display(actual) });
          } catch (error) {
            results.push({ name: test.name, passed: false, expected: display(test.expected), actual: "—", error: error instanceof Error ? error.message : String(error) });
          }
        }
        self.postMessage({ results });
      } catch (error) {
        self.postMessage({ fatal: error instanceof Error ? error.message : String(error) });
      }
    };
  `;

export async function runIsolatedTests(source: string, functionName: string, tests: TestSpec[]): Promise<TestResult[]> {
  const url = URL.createObjectURL(new Blob([runnerWorkerSource], { type: "text/javascript" }));
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
