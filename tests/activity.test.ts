import { describe, expect, it } from "vitest";
import { buildActivityDays } from "@/lib/activity";
import { emptyData } from "@/lib/storage";

describe("activity heatmap", () => {
  it("starts with zero real activity instead of demo data", () => {
    const days = buildActivityDays(emptyData(), 2, new Date("2026-10-01T12:00:00+07:00"));
    expect(days).toHaveLength(14);
    expect(days.every((day) => day.count === 0 && day.level === 0)).toBe(true);
  });

  it("groups stored evidence by Asia/Bangkok day", () => {
    const data = emptyData();
    data.stepProgress.first = { stepId: "first", answer: "a", notes: "", completed: true, updatedAt: "2026-09-30T18:30:00.000Z" };
    data.journal.push({ id: "j1", date: "2026-10-01", title: "note", learned: "", bug: "", fix: "", unclear: "", link: "", updatedAt: "2026-09-30T19:00:00.000Z" });
    const days = buildActivityDays(data, 1, new Date("2026-10-01T12:00:00+07:00"));
    expect(days.at(-1)).toMatchObject({ date: "2026-10-01", count: 2, level: 4 });
  });
});
