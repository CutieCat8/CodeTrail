// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useQuestData } from "@/components/QuestApp";
import { REJECTED_STORAGE_KEY, STORAGE_KEY, emptyData, importAppData, serializeAppData } from "@/lib/storage";

const validData = () => ({ ...emptyData(), weeklyGoal: 4 });

async function mountHook() {
  const hook = renderHook(() => useQuestData());
  await act(async () => { await Promise.resolve(); });
  expect(hook.result.current.ready).toBe(true);
  return hook;
}

async function editAndWaitForAutosave(hook: Awaited<ReturnType<typeof mountHook>>, weeklyGoal: number) {
  // Flush the effect's "saving" microtask first, as a real browser does long before the 650 ms timer.
  await act(async () => { hook.result.current.setData((current) => ({ ...current, weeklyGoal })); await Promise.resolve(); });
  await act(async () => { vi.advanceTimersByTime(700); await Promise.resolve(); });
}

describe("useQuestData autosave", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    localStorage.clear();
  });

  it("saves edits to valid data", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validData()));
    const hook = await mountHook();
    await editAndWaitForAutosave(hook, 9);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).weeklyGoal).toBe(9);
    expect(hook.result.current.saveState).toBe("saved");
  });

  it("replaces rejected data only after backing it up", async () => {
    localStorage.setItem(STORAGE_KEY, "{bad A");
    const hook = await mountHook();
    await editAndWaitForAutosave(hook, 9);
    const backups = Object.keys(localStorage).filter((key) => key.startsWith(REJECTED_STORAGE_KEY));
    expect(backups.map((key) => localStorage.getItem(key))).toEqual(["{bad A"]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).weeklyGoal).toBe(9);
  });

  it("never overwrites rejected data whose backup failed, until a valid import replaces it", async () => {
    localStorage.setItem(STORAGE_KEY, "{bad B");
    const setItem = Storage.prototype.setItem;
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key: string, value: string) {
      if (key.startsWith(REJECTED_STORAGE_KEY)) throw new DOMException("full", "QuotaExceededError");
      return setItem.call(this, key, value);
    });
    const hook = await mountHook();
    await editAndWaitForAutosave(hook, 9);
    expect(localStorage.getItem(STORAGE_KEY)).toBe("{bad B");
    expect(hook.result.current.saveState).toBe("error");

    const imported = importAppData(serializeAppData(validData()));
    expect(imported.ok).toBe(true);
    if (imported.ok) act(() => { hook.result.current.setData(imported.data); });
    await editAndWaitForAutosave(hook, 7);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).weeklyGoal).toBe(7);
    expect(hook.result.current.saveState).toBe("saved");
    spy.mockRestore();
  });

  it("does not overwrite invalid data another tab writes during the session", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validData()));
    const hook = await mountHook();
    localStorage.setItem(STORAGE_KEY, "{unbacked from other tab");
    await editAndWaitForAutosave(hook, 9);
    expect(localStorage.getItem(STORAGE_KEY)).toBe("{unbacked from other tab");
    expect(hook.result.current.saveState).toBe("error");
  });
});
