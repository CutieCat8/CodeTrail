import { describe, expect, it } from "vitest";
import { emptyData, importAppData, serializeAppData } from "@/lib/storage";
import { dailyMission, ensureDailyMission, missionDay } from "@/lib/daily-mission";
import { routeCourseIds } from "@/lib/learning-route";
import { stepById } from "@/content/curriculum";

const day = "2026-10-12";
describe("daily mission", () => {
  it("changes day at Bangkok midnight", () => {
    expect(missionDay(new Date("2026-10-11T16:59:59Z"))).toBe("2026-10-11");
    expect(missionDay(new Date("2026-10-11T17:00:00Z"))).toBe(day);
  });
  it("keeps the chosen step after completion without awarding credit", () => {
    const data = emptyData();
    const saved = ensureDailyMission(data, day);
    const mission = dailyMission(saved, day);
    const done = { ...saved, stepProgress: { [mission.stepId]: { stepId: mission.stepId, completed: true, answer: "", notes: "", updatedAt: `${day}T00:00:00.000Z` } } };
    expect(dailyMission(done, day)).toBe(mission);
    expect(ensureDailyMission(done, day)).toBe(done);
    expect(saved.stepProgress).toBe(data.stepProgress);
    expect(saved.activityEvents).toBe(data.activityEvents);
    expect(saved.progress).toBe(data.progress);
    expect(dailyMission(done, "2026-10-13").stepId).not.toBe(mission.stepId);
  });
  it.each(["fullstack", "java", "mixed"] as const)("selects authored content for %s and preserves other modes", mode => {
    const saved = ensureDailyMission(emptyData(), day);
    const changed = ensureDailyMission({ ...saved, mode }, day);
    expect(routeCourseIds(mode)).toContain(stepById(dailyMission(changed, day).stepId)?.courseId);
    expect(changed.dailyMissions?.mixed).toEqual(saved.dailyMissions?.mixed);
  });
  it("replaces missing or out-of-mode content and transfers via JSON", () => {
    const saved = ensureDailyMission({ ...emptyData(), dailyMissions: { mixed: { date: day, stepId: "future-step" } } }, day);
    expect(stepById(dailyMission(saved, day).stepId)).toBeDefined();
    const result = importAppData(serializeAppData(saved), () => {});
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.dailyMissions).toEqual(saved.dailyMissions);
    expect(importAppData(serializeAppData(emptyData()), () => {}).ok).toBe(true);
  });
  it.each([{ bad: { date: day, stepId: "id" } }, { mixed: { date: "2026-02-30", stepId: "id" } }, { java: { date: day, stepId: "" } }])("rejects invalid records without writing", dailyMissions => {
    let written = false;
    expect(importAppData(JSON.stringify({ ...emptyData(), dailyMissions }), () => { written = true; }).ok).toBe(false);
    expect(written).toBe(false);
  });
});
