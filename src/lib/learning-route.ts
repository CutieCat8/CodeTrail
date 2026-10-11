import { curriculumCourses, learningSteps } from "@/content/curriculum";
import type { AppData, StudyMode } from "@/types/domain";

const fullstack = ["developer-foundations", "web-platform-foundations", "javascript-foundations", "typescript", "node-foundations", "backend"];
const java = ["java-foundations", "java-oop"];

export function routeCourseIds(mode: StudyMode): readonly string[] {
  return mode === "java" ? java : mode === "fullstack" ? fullstack : [...fullstack, ...java];
}

export function learningRouteSummary(data: AppData) {
  const courses = routeCourseIds(data.mode).flatMap(id => {
    const course = curriculumCourses.find(item => item.id === id);
    const steps = learningSteps.filter(step => step.courseId === id);
    if (!course || !steps.length) return [];
    const completed = steps.filter(step => data.stepProgress[step.id]?.completed).length;
    return [{ course, steps, completed, reviewStep: steps.find(step => step.kind === "checkpoint") ?? steps[0] }];
  });
  const total = courses.reduce((sum, item) => sum + item.steps.length, 0);
  const completed = courses.reduce((sum, item) => sum + item.completed, 0);
  return { courses, total, completed, complete: total > 0 && completed === total };
}
