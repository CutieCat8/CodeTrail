import { describe, expect, it } from "vitest";
import { curriculumCourses, learningSteps } from "@/content/curriculum";
import { initialLessonSearchFilters, searchCourses, searchLearningSteps, stepLearningState } from "@/lib/lesson-search";
import type { StepProgress } from "@/types/curriculum";

const search = (query: string) => searchLearningSteps({ ...initialLessonSearchFilters, query }, {});
const draft = (stepId: string, completed = false): StepProgress => ({ stepId, completed, answer: "", notes: "", updatedAt: "2026-10-11T12:00:00.000Z" });

describe("authored lesson search", () => {
  it("returns only real authored steps in learning order without mutating progress", () => {
    const progress = {};
    expect(searchLearningSteps(initialLessonSearchFilters, progress)).toEqual(learningSteps);
    expect(progress).toEqual({});
    for (const course of curriculumCourses.filter(course => course.status === "planned")) {
      expect(searchLearningSteps({ ...initialLessonSearchFilters, courseId: course.id }, progress)).toEqual([]);
      expect(searchCourses.some(available => available.id === course.id)).toBe(false);
    }
  });
  it("matches Thai and course names, trims spaces, and requires every token", () => {
    const step = learningSteps.find(step => step.courseId === "typescript")!;
    const results = search(`  TYPESCRIPT   ${step.title}  `);
    expect(results.map(result => result.id)).toContain(step.id);
    expect(results.every(result => result.courseId === "typescript")).toBe(true);
    const thaiStep = learningSteps.find(step => /[ก-๙]/.test(step.objective))!;
    expect(search(thaiStep.objective).map(result => result.id)).toContain(thaiStep.id);
    expect(search("typescript impossible-search-token")).toEqual([]);
    expect(search("[.*")).toEqual([]);
  });
  it("includes unit names and vocabulary in search", () => {
    const step = learningSteps.find(step => step.vocabulary.length > 0)!;
    expect(search(step.vocabulary[0][0]).map(result => result.id)).toContain(step.id);
    expect(search(step.unit).map(result => result.id)).toContain(step.id);
  });
  it("distinguishes a missing record, an empty saved draft, and completion", () => {
    expect(stepLearningState(undefined)).toBe("not-started");
    expect(stepLearningState(draft("draft"))).toBe("in-progress");
    expect(stepLearningState(draft("done", true))).toBe("completed");
    const [first, second] = learningSteps;
    const progress = { [first.id]: draft(first.id), [second.id]: draft(second.id, true) };
    expect(searchLearningSteps({ ...initialLessonSearchFilters, state: "in-progress" }, progress).map(step => step.id)).toEqual([first.id]);
    expect(searchLearningSteps({ ...initialLessonSearchFilters, state: "completed" }, progress).map(step => step.id)).toEqual([second.id]);
    expect(searchLearningSteps({ ...initialLessonSearchFilters, state: "not-started" }, progress)).toHaveLength(learningSteps.length - 2);
  });
  it("combines course, language, track, status, and query filters", () => {
    const step = learningSteps.find(step => step.courseId === "java-foundations" && step.language === "java")!;
    const progress = { [step.id]: draft(step.id, true) };
    const filters = { ...initialLessonSearchFilters, query: step.title, track: "java" as const, courseId: step.courseId, language: "java" as const, state: "completed" as const };
    expect(searchLearningSteps(filters, progress).map(result => result.id)).toEqual([step.id]);
    expect(searchLearningSteps({ ...filters, track: "web" }, progress)).toEqual([]);
    expect(searchLearningSteps({ ...filters, language: "javascript" }, progress)).toEqual([]);
  });
});
