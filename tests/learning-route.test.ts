import { describe, expect, it } from "vitest";
import { learningSteps } from "@/content/curriculum";
import { emptyData } from "@/lib/storage";
import { learningRouteSummary, routeCourseIds } from "@/lib/learning-route";
import { stepRecommendation } from "@/lib/recommendation";

for (const mode of ["fullstack", "java", "mixed"] as const) {
  it(`recognizes only completed authored steps in ${mode} mode and resumes when one is unfinished`, () => {
    const data = { ...emptyData(), mode };
    expect(learningRouteSummary(data).complete).toBe(false);
    const relevant = learningSteps.filter(step => routeCourseIds(mode).includes(step.courseId));
    for (const step of relevant) data.stepProgress[step.id] = { stepId: step.id, completed: true, answer: "", notes: "", updatedAt: "2026-10-11T00:00:00.000Z" };
    data.stepProgress.unknown = { stepId: "unknown", completed: true, answer: "", notes: "", updatedAt: "2026-10-11T00:00:00.000Z" };
    const before = structuredClone(data);
    expect(learningRouteSummary(data)).toMatchObject({ total: relevant.length, completed: relevant.length, complete: true });
    expect(stepRecommendation(data).routeComplete).toBe(true);
    expect(data).toEqual(before);
    data.stepProgress[relevant.at(-1)!.id].completed = false;
    expect(stepRecommendation(data).routeComplete).toBe(false);
    expect(stepRecommendation(data).step.id).toBe(relevant.at(-1)!.id);
  });
}

describe("completion scope", () => {
  it("keeps Java independent of unfinished web courses and lists available checkpoint links", () => {
    const summary = learningRouteSummary({ ...emptyData(), mode: "java" });
    expect(summary.courses.map(item => item.course.id)).toEqual(["java-foundations", "java-oop"]);
    expect(summary.courses.every(item => item.reviewStep.kind === "checkpoint")).toBe(true);
  });
});
