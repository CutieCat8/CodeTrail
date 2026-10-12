import { curriculumCourses, learningSteps } from "@/content/curriculum";
import type { CodeLanguage, CurriculumCourse, LearningStep, StepProgress } from "@/types/curriculum";

export type LearningState = "not-started" | "in-progress" | "completed";
export type LessonSearchFilters = {
  query: string;
  bookmarkedOnly: boolean;
  track: "all" | CurriculumCourse["track"];
  courseId: string;
  language: "all" | CodeLanguage;
  state: "all" | LearningState;
};
export const initialLessonSearchFilters: LessonSearchFilters = {
  query: "", bookmarkedOnly: false, track: "all", courseId: "all", language: "all", state: "all",
};
export const learningStateLabels: Record<LearningState, string> = {
  "not-started": "ยังไม่เริ่ม", "in-progress": "กำลังเรียน", completed: "เรียนแล้ว",
};
export const courseById = new Map(curriculumCourses.map(course => [course.id, course]));
export const searchCourses = curriculumCourses.filter(course => learningSteps.some(step => step.courseId === course.id));
export const searchLanguages = [...new Set(learningSteps.map(step => step.language).filter((language): language is CodeLanguage => Boolean(language)))];

export function stepLearningState(progress: StepProgress | undefined): LearningState {
  if (progress?.completed) return "completed";
  return progress ? "in-progress" : "not-started";
}

const searchText = new Map(learningSteps.map(step => [step.id, [
  step.title, step.objective, step.unit, courseById.get(step.courseId)?.title ?? "",
  ...step.vocabulary.flat(),
].join(" ").toLocaleLowerCase()]));

export function searchLearningSteps(
  filters: LessonSearchFilters,
  progress: Record<string, StepProgress>,
  bookmarkedStepIds: readonly string[] = [],
): LearningStep[] {
  const bookmarks = new Set(bookmarkedStepIds);
  const tokens = filters.query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return learningSteps.filter(step => {
    if (filters.bookmarkedOnly && !bookmarks.has(step.id)) return false;
    if (filters.track !== "all" && courseById.get(step.courseId)?.track !== filters.track) return false;
    if (filters.courseId !== "all" && step.courseId !== filters.courseId) return false;
    if (filters.language !== "all" && step.language !== filters.language) return false;
    if (filters.state !== "all" && stepLearningState(progress[step.id]) !== filters.state) return false;
    const text = searchText.get(step.id) ?? "";
    return tokens.every(token => text.includes(token));
  });
}
