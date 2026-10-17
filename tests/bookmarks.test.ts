import { describe, expect, it } from "vitest";
import { learningSteps } from "@/content/curriculum";
import { toggleStepBookmark } from "@/lib/bookmarks";
import { emptyData, normalizeAppData, importAppData, serializeAppData } from "@/lib/storage";
import { initialLessonSearchFilters, searchLearningSteps } from "@/lib/lesson-search";

const stepId = learningSteps[0].id;

describe("lesson bookmarks", () => {
  it("adds and removes a bookmark without changing progress or activity", () => {
    const data = emptyData();
    const saved = toggleStepBookmark(data, stepId);
    expect(saved.bookmarkedStepIds).toEqual([stepId]);
    expect(data.bookmarkedStepIds).toEqual([]);
    expect(saved.progress).toBe(data.progress);
    expect(saved.stepProgress).toBe(data.stepProgress);
    expect(saved.activityEvents).toBe(data.activityEvents);
    expect(toggleStepBookmark(saved, stepId).bookmarkedStepIds).toEqual([]);
    expect(toggleStepBookmark(data, "missing-step")).toBe(data);
  });
  it("imports old v1 data without bookmarks and preserves unknown IDs for future content", () => {
    const old = emptyData();
    delete old.bookmarkedStepIds;
    expect(normalizeAppData(old)?.bookmarkedStepIds).toEqual([]);
    const saved = { ...old, bookmarkedStepIds: [stepId, "future-step"] };
    const writes: unknown[] = [];
    const imported = importAppData(serializeAppData(saved), data => { writes.push(data); });
    expect(imported.ok).toBe(true);
    if (imported.ok) expect(imported.data.bookmarkedStepIds).toEqual(saved.bookmarkedStepIds);
    expect(writes).toHaveLength(1);
  });
  it.each([null, {}, "step", [1], [""], ["  "], [stepId, stepId]])("rejects invalid bookmark data without writing: %j", bookmarks => {
    let wrote = false;
    const result = importAppData(JSON.stringify({ ...emptyData(), bookmarkedStepIds: bookmarks }), () => { wrote = true; });
    expect(result.ok).toBe(false);
    expect(wrote).toBe(false);
  });
  it("combines bookmarks with the search filters and hides unknown IDs", () => {
    const filters = { ...initialLessonSearchFilters, bookmarkedOnly: true };
    expect(searchLearningSteps(filters, {}, [stepId, "future-step"]).map(step => step.id)).toEqual([stepId]);
    expect(searchLearningSteps({ ...filters, query: "never-exists" }, {}, [stepId])).toEqual([]);
    expect(searchLearningSteps(filters, {})).toEqual([]);
  });
});
