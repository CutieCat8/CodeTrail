import { describe, expect, it } from "vitest";
import { buildActivityDays, recordActivity, weeklyActivityCount } from "@/lib/activity";
import { calculateStreak, emptyData, normalizeAppData } from "@/lib/storage";

describe("activity heatmap", () => {
  it("starts with zero real activity instead of demo data", () => {
    const days = buildActivityDays(emptyData(), 2, new Date("2026-10-01T12:00:00+07:00"));
    expect(days).toHaveLength(14);
    expect(days.every((day) => day.count === 0 && day.level === 0)).toBe(true);
  });

  it("groups stored evidence by Asia/Bangkok day", () => {
    let data = emptyData();
    data.stepProgress.first = { stepId: "first", answer: "a", notes: "", completed: true, updatedAt: "2026-09-30T18:30:00.000Z" };
    data.journal.push({ id: "j1", date: "2026-10-01", title: "note", learned: "", bug: "", fix: "", unclear: "", link: "", updatedAt: "2026-09-30T19:00:00.000Z" });
    data = recordActivity(data, "step-completed", "first", "2026-09-30T18:30:00.000Z");
    data = recordActivity(data, "journal-saved", "j1", "2026-09-30T19:00:00.000Z");
    const days = buildActivityDays(data, 1, new Date("2026-10-01T12:00:00+07:00"));
    expect(days.at(-1)).toMatchObject({ date: "2026-10-01", count: 2, level: 4 });
  });

  it("keeps earlier activity when the same step is edited later", () => {
    let data = recordActivity(emptyData(), "step-completed", "first", "2026-09-29T04:00:00.000Z");
    data.stepProgress.first = { stepId: "first", answer: "revised", notes: "", completed: true, updatedAt: "2026-10-01T04:00:00.000Z" };
    data = recordActivity(data, "lab-attempt", "lab", "2026-10-01T04:00:00.000Z");
    const days = buildActivityDays(data, 1, new Date("2026-10-01T12:00:00+07:00"));
    expect(days.find((day) => day.date === "2026-09-29")?.count).toBe(1);
    expect(days.find((day) => day.date === "2026-10-01")?.count).toBe(1);
    expect(weeklyActivityCount(data, new Date("2026-10-01T12:00:00+07:00"))).toBe(2);
  });

  it("preserves legacy snapshot dates on import", () => {
    const legacy = emptyData();
    delete legacy.activityEvents;
    legacy.stepProgress.first = { stepId: "first", answer: "a", notes: "", completed: true, updatedAt: "2026-09-29T04:00:00.000Z" };
    const migrated = normalizeAppData(legacy);
    expect(migrated?.activityEvents).toHaveLength(1);
    expect(buildActivityDays(migrated!, 1, new Date("2026-10-01T12:00:00+07:00")).find((day) => day.date === "2026-09-29")?.count).toBe(1);
  });

  it("counts micro-step evidence in the same streak as the heatmap", () => {
    const data = recordActivity(emptyData(), "step-completed", "first", "2026-09-30T18:30:00.000Z");
    expect(calculateStreak(data, new Date("2026-10-01T12:00:00+07:00"))).toBe(1);
  });
});
