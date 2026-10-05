import { afterEach, describe, expect, it, vi } from "vitest";
import {
  REJECTED_STORAGE_KEY,
  STORAGE_KEY,
  calculateStreak,
  canOverwriteStoredData,
  emptyData,
  importAppData,
  isIsoDate,
  isIsoTimestamp,
  loadData,
  normalizeAppData,
  serializeAppData,
} from "@/lib/storage";
import type { AppData } from "@/types/domain";

// A v1 export shaped like data the app writes today (toISOString timestamps, journal date = first 10 chars).
function sampleData(): AppData {
  return {
    ...emptyData(),
    mode: "fullstack",
    weeklyGoal: 4,
    lastLessonId: "web-react-filter",
    progress: {
      "web-react-filter": {
        lessonId: "web-react-filter",
        code: "function filterActivities(items) { return items; }",
        notes: "",
        reflection: "",
        checklist: [true, false],
        status: "passed",
        attempts: 2,
        updatedAt: "2026-10-04T10:00:00.000Z",
        completedAt: "2026-10-04T10:00:00.000Z",
        lastResult: { passed: true, at: "2026-10-04T10:00:00.000Z", details: [{ name: "รายการว่าง", passed: true, expected: "[]", actual: "[]" }] },
      },
    },
    stepProgress: {
      "dev-1": { stepId: "dev-1", answer: "a", notes: "", completed: true, updatedAt: "2026-10-03T09:30:00.000Z" },
    },
    journal: [
      { id: "j1", date: "2026-10-02", title: "Debug filter", learned: "", bug: "", fix: "", unclear: "", link: "", updatedAt: "2026-10-02T08:00:00.000Z" },
    ],
    roadmapMarks: { "rest-contract": "learning" },
    projectProgress: {
      "activity-board": { repositoryUrl: "", demoUrl: "", checklist: [true], updatedAt: "2026-10-01T12:00:00.000Z" },
    },
  };
}

const withProgress = (patch: Record<string, unknown>) => {
  const data = sampleData() as unknown as { progress: Record<string, Record<string, unknown>> };
  Object.assign(data.progress["web-react-filter"], patch);
  return data;
};

describe("date validation", () => {
  it("accepts the timestamp and date formats the app writes", () => {
    expect(isIsoTimestamp(new Date("2026-10-04T10:00:00Z").toISOString())).toBe(true);
    expect(isIsoTimestamp("2028-02-29T23:59:59.999Z")).toBe(true);
    expect(isIsoDate("2026-10-04")).toBe(true);
    expect(isIsoDate("2028-02-29")).toBe(true);
  });

  it.each(["bad", "", "2026-10-04", "2026-10-04T10:00:00Z", "2026-02-30T00:00:00.000Z", "2026-10-04T24:00:00.000Z", "2026-10-04T10:00:00+07:00", "2026-10-04 10:00:00", 1759572000000])(
    "rejects timestamp %j",
    (value) => expect(isIsoTimestamp(value)).toBe(false),
  );

  it.each(["2026-13-01", "2027-02-29", "04/10/2026", "2026-10-04T00:00:00.000Z", ""])("rejects journal date %j", (value) => {
    expect(isIsoDate(value)).toBe(false);
  });

  it("rejects an import with updatedAt: \"bad\" that previously crashed the streak", () => {
    expect(normalizeAppData(withProgress({ updatedAt: "bad" }))).toBeNull();
  });

  it.each([
    ["progress.completedAt", withProgress({ completedAt: "yesterday" })],
    ["progress.lastResult.at", withProgress({ lastResult: { passed: true, at: "now", details: [] } })],
    ["stepProgress.updatedAt", { ...sampleData(), stepProgress: { s: { stepId: "s", answer: "", notes: "", completed: false, updatedAt: "bad" } } }],
    ["projectProgress.updatedAt", { ...sampleData(), projectProgress: { p: { repositoryUrl: "", demoUrl: "", checklist: [], updatedAt: "bad" } } }],
    ["journal.updatedAt", { ...sampleData(), journal: [{ ...sampleData().journal[0], updatedAt: "bad" }] }],
    ["journal.date", { ...sampleData(), journal: [{ ...sampleData().journal[0], date: "2026-02-30" }] }],
  ])("rejects an invalid %s", (_field, data) => {
    expect(normalizeAppData(data)).toBeNull();
  });
});

describe("enum validation", () => {
  it.each([
    ["status as array", withProgress({ status: ["passed"] })],
    ["status as object", withProgress({ status: { toString: () => "passed" } })],
    ["status with wrong case", withProgress({ status: "PASSED" })],
    ["mode as array", { ...sampleData(), mode: ["mixed"] }],
    ["roadmap mark as array", { ...sampleData(), roadmapMarks: { "rest-contract": ["done"] } }],
    ["roadmap mark unknown", { ...sampleData(), roadmapMarks: { "rest-contract": "finished" } }],
  ])("rejects %s", (_label, data) => {
    expect(normalizeAppData(data)).toBeNull();
  });
});

describe("calculateStreak", () => {
  const now = new Date("2026-10-05T05:00:00.000Z"); // 12:00 in Bangkok

  it("keeps the existing streak definition for valid data", () => {
    const data = sampleData();
    data.progress["web-react-filter"].updatedAt = "2026-10-05T01:00:00.000Z";
    data.journal[0].updatedAt = "2026-10-04T01:00:00.000Z";
    expect(calculateStreak(data, now)).toBe(2);
  });

  it("uses Bangkok calendar days at the UTC boundary", () => {
    const data = { ...emptyData(), journal: [{ ...sampleData().journal[0], updatedAt: "2026-10-04T16:59:59.000Z" }] };
    expect(calculateStreak(data, new Date("2026-10-04T17:00:00.000Z"))).toBe(1);
    expect(calculateStreak(data, new Date("2026-10-05T17:00:00.000Z"))).toBe(0);
  });

  it("skips invalid timestamps instead of throwing or inventing a day", () => {
    const data = sampleData();
    data.progress["web-react-filter"].updatedAt = "bad";
    data.journal[0].updatedAt = "2026-10-05T01:00:00.000Z";
    expect(() => calculateStreak(data, now)).not.toThrow();
    expect(calculateStreak(data, now)).toBe(1);
    data.journal = [];
    expect(calculateStreak(data, now)).toBe(0);
  });

  it.each([
    ["an impossible calendar date", "2026-02-30T01:00:00.000Z", "2026-03-02T05:00:00.000Z"],
    ["hour 24", "2026-10-04T24:00:00.000Z", "2026-10-05T05:00:00.000Z"],
    ["a timestamp without milliseconds", "2026-10-05T01:00:00Z", "2026-10-05T05:00:00.000Z"],
  ])("does not roll %s over into a real day", (_label, updatedAt, today) => {
    const data = { ...emptyData(), journal: [{ ...sampleData().journal[0], updatedAt }] };
    expect(calculateStreak(data, new Date(today))).toBe(0);
  });
});

describe("importAppData", () => {
  it("round-trips an export without changing the data", () => {
    const original = sampleData();
    const save = vi.fn();
    const result = importAppData(serializeAppData(original), save);
    expect(result).toEqual({ ok: true, data: original });
    expect(save).toHaveBeenCalledWith(original);
  });

  it("restores optional collections missing from an older v1 export", () => {
    const legacy: Partial<AppData> = sampleData();
    delete legacy.stepProgress;
    delete legacy.projectProgress;
    const result = importAppData(JSON.stringify(legacy), vi.fn());
    expect(result.ok && result.data.stepProgress).toEqual({});
    expect(result.ok && result.data.projectProgress).toEqual({});
  });

  it.each([
    ["broken JSON", "{\"version\": 1,", /JSON/],
    ["invalid date", JSON.stringify(withProgress({ updatedAt: "bad" })), /schema v1/],
    ["enum array", JSON.stringify(withProgress({ status: ["passed"] })), /schema v1/],
  ])("rejects %s before saving anything", (_label, text, message) => {
    const save = vi.fn();
    const result = importAppData(text, save);
    expect(result).toMatchObject({ ok: false, error: expect.stringMatching(message) });
    expect(save).not.toHaveBeenCalled();
  });

  it("reports a failed save instead of success", () => {
    const save = vi.fn(() => { throw new DOMException("full", "QuotaExceededError"); });
    const result = importAppData(serializeAppData(sampleData()), save);
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/QuotaExceededError/) });
  });
});

describe("loadData", () => {
  const store = new Map<string, string>();
  let failingKey: (key: string) => boolean = () => false;
  const fakeStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      if (failingKey(key)) throw new DOMException("full", "QuotaExceededError");
      store.set(key, value);
    },
  };
  const at = new Date("2026-10-05T06:00:00.000Z");
  const backupKey = `${REJECTED_STORAGE_KEY}:${at.toISOString()}`;

  afterEach(() => {
    store.clear();
    failingKey = () => false;
    vi.unstubAllGlobals();
  });

  it("reads valid v1 data that the app saved", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    store.set(STORAGE_KEY, JSON.stringify(sampleData()));
    expect(loadData(at)).toEqual({ data: sampleData(), backedUpRaw: null });
    expect([...store.keys()]).toEqual([STORAGE_KEY]);
  });

  it.each([
    ["invalid date", JSON.stringify(withProgress({ updatedAt: "bad" }))],
    ["broken JSON", "{not json"],
  ])("keeps a copy of stored data with %s before falling back to empty data", (_label, raw) => {
    vi.stubGlobal("localStorage", fakeStorage);
    store.set(STORAGE_KEY, raw);
    expect(loadData(at)).toEqual({ data: emptyData(), backedUpRaw: raw });
    expect(store.get(backupKey)).toBe(raw);
    expect(store.get(STORAGE_KEY)).toBe(raw);
    expect(canOverwriteStoredData(raw)).toBe(true);
  });

  it("does not overwrite an earlier backup", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    store.set(`${REJECTED_STORAGE_KEY}:2026-10-01T00:00:00.000Z`, "old backup A");
    store.set(STORAGE_KEY, "{bad B");
    loadData(at);
    expect(store.get(`${REJECTED_STORAGE_KEY}:2026-10-01T00:00:00.000Z`)).toBe("old backup A");
    expect(store.get(backupKey)).toBe("{bad B");
  });

  it("does not overwrite a backup made in the same millisecond", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    store.set(STORAGE_KEY, "{bad A");
    loadData(at);
    store.set(STORAGE_KEY, "{bad B");
    loadData(at);
    expect(store.get(backupKey)).toBe("{bad A");
    expect(store.get(`${backupKey}:2`)).toBe("{bad B");
  });

  it("forbids overwriting rejected data that could not be backed up", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    failingKey = (key) => key.startsWith(REJECTED_STORAGE_KEY);
    store.set(STORAGE_KEY, "{bad B");
    const loaded = loadData(at);
    expect(loaded).toEqual({ data: emptyData(), backedUpRaw: null });
    expect(canOverwriteStoredData(loaded.backedUpRaw)).toBe(false);
    expect(store.get(STORAGE_KEY)).toBe("{bad B");
  });

  it("forbids overwriting different invalid data written after the backup (another tab)", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    store.set(STORAGE_KEY, "{bad A");
    const loaded = loadData(at);
    store.set(STORAGE_KEY, "{unbacked from other tab");
    expect(canOverwriteStoredData(loaded.backedUpRaw)).toBe(false);
    store.set(STORAGE_KEY, JSON.stringify(sampleData()));
    expect(canOverwriteStoredData(null)).toBe(true);
    store.set(STORAGE_KEY, "{unbacked from other tab");
    expect(canOverwriteStoredData(null)).toBe(false);
  });

  it("allows overwriting once a successful import has replaced unbacked data", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    failingKey = (key) => key.startsWith(REJECTED_STORAGE_KEY);
    store.set(STORAGE_KEY, "{bad B");
    const loaded = loadData(at);
    expect(importAppData(serializeAppData(sampleData()))).toMatchObject({ ok: true });
    expect(canOverwriteStoredData(loaded.backedUpRaw)).toBe(true);
    expect(JSON.parse(store.get(STORAGE_KEY)!)).toEqual(sampleData());
  });

  it("keeps overwriting blocked when an import is rejected", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    failingKey = (key) => key.startsWith(REJECTED_STORAGE_KEY);
    store.set(STORAGE_KEY, "{bad B");
    const loaded = loadData(at);
    expect(importAppData(JSON.stringify(withProgress({ updatedAt: "bad" })))).toMatchObject({ ok: false });
    expect(canOverwriteStoredData(loaded.backedUpRaw)).toBe(false);
    expect(store.get(STORAGE_KEY)).toBe("{bad B");
  });

  it("allows overwriting when storage is empty or valid, not when unreadable", () => {
    vi.stubGlobal("localStorage", fakeStorage);
    expect(canOverwriteStoredData()).toBe(true);
    store.set(STORAGE_KEY, JSON.stringify(sampleData()));
    expect(canOverwriteStoredData()).toBe(true);
    vi.stubGlobal("localStorage", { getItem: () => { throw new DOMException("denied", "SecurityError"); }, setItem: vi.fn() });
    expect(canOverwriteStoredData()).toBe(false);
    expect(loadData(at)).toEqual({ data: emptyData(), backedUpRaw: null });
  });
});
