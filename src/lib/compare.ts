export type TestValueComparison = {
  passed: boolean;
  actual: string;
  error?: string;
};

/**
 * Compares a learner's return value with a test's expected value.
 *
 * Supported values: null, boolean, string, finite number, arrays and plain objects
 * built from those. Arrays compare in order; plain-object keys compare regardless of
 * order. Anything else (undefined, NaN, Infinity, bigint, symbol, function, Date, Map,
 * Set, class instances, sparse arrays, extra array properties, symbol keys,
 * non-enumerable or accessor properties, circular references, nesting deeper than 200
 * levels) is reported as an error instead of being coerced into a passing result.
 *
 * Each value is read once into a snapshot of own data properties; comparison and the
 * reported `actual` both use that snapshot, and getters are never invoked.
 * Not a defence against code that deliberately lies (Proxy traps, or learner code that
 * replaces built-ins in the same Worker); see the runner limitations in the handoff.
 *
 * Must stay self-contained (no imports, no module-scope references): runner.ts embeds
 * this function's source into the test Worker so tests and Worker run the same logic.
 */
export function compareTestValue(actual: unknown, expected: unknown): TestValueComparison {
  type Plain = null | boolean | string | number | Plain[] | { [key: string]: Plain };
  type Snapshot = { value: Plain; problem?: undefined } | { problem: string };

  const snapshot = (value: unknown, path: string, seen: object[]): Snapshot => {
    if (value === null || typeof value === "string" || typeof value === "boolean") return { value };
    if (typeof value === "number") return Number.isFinite(value) ? { value } : { problem: `${path} เป็น ${String(value)}` };
    if (typeof value !== "object") return { problem: `${path} เป็น ${typeof value}` };
    if (seen.includes(value)) return { problem: `${path} อ้างอิงวนกลับ (circular)` };
    if (seen.length >= 200) return { problem: `${path} ซ้อนลึกเกิน 200 ชั้น` };
    const isArray = Array.isArray(value);
    if (!isArray) {
      const proto = Object.getPrototypeOf(value);
      if (proto !== Object.prototype && proto !== null) {
        const constructorDescriptor = proto ? Object.getOwnPropertyDescriptor(proto, "constructor") : undefined;
        const constructor = constructorDescriptor && "value" in constructorDescriptor ? constructorDescriptor.value : undefined;
        const nameDescriptor = typeof constructor === "function" ? Object.getOwnPropertyDescriptor(constructor, "name") : undefined;
        const name = nameDescriptor && typeof nameDescriptor.value === "string" && nameDescriptor.value ? nameDescriptor.value : "object";
        return { problem: `${path} เป็น ${name} ไม่ใช่ plain object` };
      }
    }
    if (Object.getOwnPropertySymbols(value).length > 0) return { problem: `${path} มี symbol key` };
    const descriptors = Object.getOwnPropertyDescriptors(value) as Record<string, PropertyDescriptor>;
    const keys = Object.keys(descriptors).filter((key) => !(isArray && key === "length"));
    const nextSeen = [...seen, value];
    const read = (key: string, childPath: string): Snapshot => {
      const descriptor = descriptors[key];
      if (!("value" in descriptor)) return { problem: `${childPath} เป็น getter/setter` };
      if (!descriptor.enumerable) return { problem: `${childPath} เป็น property ที่ไม่ enumerable` };
      return snapshot(descriptor.value, childPath, nextSeen);
    };
    if (isArray) {
      const length = descriptors.length.value as number;
      const items: Plain[] = [];
      for (let index = 0; index < length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(descriptors, String(index))) return { problem: `${path}[${index}] เป็นช่องว่างใน array` };
        const item = read(String(index), `${path}[${index}]`);
        if (item.problem !== undefined) return item;
        items.push(item.value);
      }
      if (keys.length !== length) return { problem: `${path} มี property อื่นนอกจาก index ของ array` };
      return { value: items };
    }
    const record: { [key: string]: Plain } = Object.create(null);
    for (const key of keys) {
      const entry = read(key, `${path}.${key}`);
      if (entry.problem !== undefined) return entry;
      record[key] = entry.value;
    }
    return { value: record };
  };

  const equal = (left: Plain, right: Plain): boolean => {
    if (left === null || right === null || typeof left !== "object" || typeof right !== "object") return left === right;
    if (Array.isArray(left) || Array.isArray(right)) {
      return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((item, index) => equal(item, right[index]));
    }
    const leftKeys = Object.keys(left);
    return leftKeys.length === Object.keys(right).length
      && leftKeys.every((key) => Object.prototype.hasOwnProperty.call(right, key) && equal(left[key], right[key]));
  };

  const expectedSnapshot = snapshot(expected, "expected", []);
  if (expectedSnapshot.problem !== undefined) return { passed: false, actual: "—", error: `โจทย์กำหนด expected ที่ runner ไม่รองรับ: ${expectedSnapshot.problem}` };
  const actualSnapshot = snapshot(actual, "ผลลัพธ์", []);
  if (actualSnapshot.problem !== undefined) {
    return { passed: false, actual: "—", error: `ผลลัพธ์มีค่าที่ runner ไม่รองรับ: ${actualSnapshot.problem} — รองรับเฉพาะ string, number, boolean, null, array และ plain object` };
  }
  return { passed: equal(actualSnapshot.value, expectedSnapshot.value), actual: JSON.stringify(actualSnapshot.value) };
}
