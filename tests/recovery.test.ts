import { describe, expect, it } from "vitest";
import { inspectBackup, listBackups, readBackupRaw, restoreBackup } from "@/lib/recovery";
import { emptyData, REJECTED_STORAGE_KEY, STORAGE_KEY } from "@/lib/storage";

const time = "2026-10-11T12:00:00.000Z";
const key = `${REJECTED_STORAGE_KEY}:${time}`;
function storageFixture(entries: Record<string, string> = {}, denied: (key: string) => boolean = () => false): Storage {
  const items = new Map(Object.entries(entries));
  return {
    get length() { return items.size; },
    key: index => [...items.keys()][index] ?? null,
    getItem: key => items.get(key) ?? null,
    setItem: (key, value) => { if (denied(key)) throw new DOMException("Denied", "QuotaExceededError"); items.set(key, value); },
    removeItem: key => { items.delete(key); },
    clear: () => items.clear(),
  };
}
const restoredRaw = JSON.stringify({ ...emptyData(), weeklyGoal: 7 });

describe("local backup recovery", () => {
  it("lists only backups and distinguishes valid, invalid schema, and corrupt JSON", () => {
    const storage = storageFixture({ [key]: restoredRaw, [`${key}:2`]: '{"version":9}', [`${key}:3`]: "broken", unrelated: "x" });
    const result = listBackups(storage);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.backups.map(item => item.status).sort()).toEqual(["invalid-json", "invalid-schema", "valid"]);
    expect(result.backups.every(item => item.timestamp === time)).toBe(true);
    expect(readBackupRaw(`${key}:3`, storage)).toBe("broken");
  });

  it("backs up the exact current raw data before restoring normalized data, preserving collisions", () => {
    const oldRaw = JSON.stringify({ ...emptyData(), weeklyGoal: 3 });
    const storage = storageFixture({ [STORAGE_KEY]: oldRaw, [key]: restoredRaw, [`${key}:2`]: "existing" });
    const result = restoreBackup(inspectBackup(key, restoredRaw), storage, new Date(time));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.preservedKey).toBe(`${key}:3`);
    expect(storage.getItem(`${key}:3`)).toBe(oldRaw);
    expect(storage.getItem(`${key}:2`)).toBe("existing");
    expect(storage.getItem(key)).toBe(restoredRaw);
    expect(JSON.parse(storage.getItem(STORAGE_KEY)!)).toEqual(result.data);
    expect(result.data.weeklyGoal).toBe(7);
  });

  it.each(["backup", "current"])("keeps current data unchanged when the %s write fails", failure => {
    const current = "even malformed data must survive";
    const storage = storageFixture({ [STORAGE_KEY]: current, [key]: restoredRaw }, item => failure === "current" ? item === STORAGE_KEY : item.startsWith(`${REJECTED_STORAGE_KEY}:`) );
    const result = restoreBackup(inspectBackup(key, restoredRaw), storage, new Date(time));
    expect(result.ok).toBe(false);
    expect(storage.getItem(STORAGE_KEY)).toBe(current);
    expect(storage.getItem(key)).toBe(restoredRaw);
  });

  it("rejects missing and changed backup entries without writing", () => {
    const selected = inspectBackup(key, restoredRaw);
    const storage = storageFixture({ [STORAGE_KEY]: "original" });
    expect(restoreBackup(selected, storage).ok).toBe(false);
    storage.setItem(key, JSON.stringify(emptyData()));
    expect(restoreBackup(selected, storage).ok).toBe(false);
    expect(storage.getItem(STORAGE_KEY)).toBe("original");
    expect(storage.length).toBe(2);
  });

  it.each(["broken", '{"version":2}'])("refuses invalid backup %s", raw => {
    const storage = storageFixture({ [STORAGE_KEY]: "original", [key]: raw });
    expect(restoreBackup(inspectBackup(key, raw), storage).ok).toBe(false);
    expect(storage.getItem(STORAGE_KEY)).toBe("original");
  });

  it("also preserves newer in-memory drafts while keeping invalid saved raw data", () => {
    const storage = storageFixture({ [STORAGE_KEY]: "invalid saved raw", [key]: restoredRaw });
    const draft = { ...emptyData(), weeklyGoal: 11 };
    const result = restoreBackup(inspectBackup(key, restoredRaw), storage, new Date(time), draft);
    expect(result.ok).toBe(true);
    expect(storage.getItem(`${key}:2`)).toBe("invalid saved raw");
    expect(JSON.parse(storage.getItem(`${key}:3`)!)).toMatchObject({ weeklyGoal: 11 });
  });

  it("reports read access errors without replacing saved data", () => {
    const storage = storageFixture({ [STORAGE_KEY]: "original", [key]: restoredRaw });
    const blocked = { ...storage, getItem: () => { throw new DOMException("Denied", "SecurityError"); } } as Storage;
    expect(listBackups(blocked).ok).toBe(false);
    expect(restoreBackup(inspectBackup(key, restoredRaw), blocked).ok).toBe(false);
    expect(storage.getItem(STORAGE_KEY)).toBe("original");
  });

  it("handles denied access to the localStorage property itself", () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, get: () => { throw new DOMException("Denied", "SecurityError"); } });
    try {
      expect(listBackups()).toMatchObject({ ok: false });
      expect(restoreBackup(inspectBackup(key, restoredRaw))).toMatchObject({ ok: false });
    } finally {
      if (descriptor) Object.defineProperty(globalThis, "localStorage", descriptor);
      else Reflect.deleteProperty(globalThis, "localStorage");
    }
  });

  it("does not create fictional data when no current saved value exists", () => {
    const storage = storageFixture({ [key]: restoredRaw });
    const result = restoreBackup(inspectBackup(key, restoredRaw), storage);
    expect(result.ok && result.preservedKey).toBe(null);
    expect(storage.length).toBe(2);
  });
});
