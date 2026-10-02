import { lessons } from "@/content/lessons";
import type { AppData, Lesson } from "@/types/domain";
import { curriculumCourses, learningSteps } from "@/content/curriculum";

function eligible(data: AppData, lesson: Lesson) {
  if (data.mode === "fullstack" && lesson.track !== "web") return false;
  if (data.mode === "java" && lesson.track !== "java") return false;
  return true;
}

export function recommendation(data: AppData): { lesson: Lesson; reason: string } {
  const pool = lessons.filter((lesson) => eligible(data, lesson));
  const struggling = pool.find((lesson) => {
    const p = data.progress[lesson.id];
    return p && p.status !== "passed" && p.attempts >= 3;
  });
  if (struggling) return { lesson: struggling, reason: "ลองมาแล้วหลายครั้ง วันนี้ทบทวนแนวคิดและเปิด Hint ทีละระดับก่อนลองใหม่" };

  const ready = pool.find((lesson) => {
    if (data.progress[lesson.id]?.status === "passed") return false;
    return lesson.prerequisites.every((id) => data.progress[id]?.status === "passed");
  });
  if (ready) {
    const progress = data.progress[ready.id];
    return { lesson: ready, reason: progress ? "ทำต่อจากคำตอบล่าสุดได้ทันที" : "เป็นบทถัดไปที่ prerequisite พร้อมแล้ว" };
  }
  return { lesson: pool[0] ?? lessons[0], reason: "เริ่มทบทวนเส้นทางจากฐานที่สำคัญ" };
}

export function accessReason(data: AppData, lesson: Lesson) {
  const missing = lesson.prerequisites.filter((id) => data.progress[id]?.status !== "passed");
  if (!missing.length) return "พร้อมเริ่มเรียน";
  const names = missing.map((id) => lessons.find((l) => l.id === id)?.title ?? id);
  return `แนะนำให้ผ่านก่อน: ${names.join(", ")} — แต่ซีข้ามเข้าเรียนได้`;
}

const mixedStages = [
  ["developer-foundations", "java-foundations"],
  ["web-platform-foundations", "java-oop"],
  ["javascript-foundations"],
  ["node-foundations"],
] as const;

function hasDraft(data: AppData, stepId: string) {
  const progress = data.stepProgress[stepId];
  return Boolean(progress && !progress.completed && (progress.answer.trim() || progress.notes.trim()));
}

function nextMixedSteps(data: AppData) {
  for (const courseIds of mixedStages) {
    const stageSteps = courseIds.flatMap((courseId) =>
      learningSteps.filter((step) => step.courseId === courseId),
    );
    if (stageSteps.every((step) => data.stepProgress[step.id]?.completed)) continue;

    const routes = courseIds
      .map((courseId) => ({
        courseId,
        steps: stageSteps.filter((step) => step.courseId === courseId),
      }))
      .map((route) => ({
        ...route,
        completed: route.steps.filter((step) => data.stepProgress[step.id]?.completed).length,
        next: route.steps.find((step) => !data.stepProgress[step.id]?.completed),
      }))
      .filter((route) => route.next);

    const draftRoute = routes
      .filter((route) => hasDraft(data, route.next!.id))
      .sort((left, right) =>
        data.stepProgress[right.next!.id].updatedAt.localeCompare(data.stepProgress[left.next!.id].updatedAt),
      )[0];
    const selected = draftRoute ?? routes
      .sort((left, right) => {
        return left.completed - right.completed;
      })[0];
    if (selected?.next) {
      const companion = routes.find((route) => route.courseId !== selected.courseId)?.next;
      return { step: selected.next, companion };
    }
  }

  return {
    step: learningSteps.find((step) => step.courseId === mixedStages[0][0]) ?? learningSteps[0],
    companion: undefined,
  };
}

export function stepRecommendation(data: AppData) {
  const courseOrder = data.mode === "java"
    ? ["java-foundations", "java-oop"]
    : data.mode === "fullstack"
      ? ["developer-foundations", "web-platform-foundations", "javascript-foundations", "node-foundations"]
      : ["developer-foundations", "java-foundations", "web-platform-foundations", "javascript-foundations", "java-oop", "node-foundations"];
  const pool = courseOrder.flatMap((courseId) => learningSteps.filter((step) => step.courseId === courseId));
  const mixed = data.mode === "mixed" ? nextMixedSteps(data) : undefined;
  const step = mixed?.step
    ?? pool.find((candidate) => !data.stepProgress[candidate.id]?.completed)
    ?? pool[0]
    ?? learningSteps[0];
  const course = curriculumCourses.find((candidate) => candidate.id === step.courseId);
  const companionStep = mixed?.companion;
  const companionCourse = companionStep
    ? curriculumCourses.find((candidate) => candidate.id === companionStep.courseId)
    : undefined;
  const started = data.stepProgress[step.id];
  const reason = data.mode === "mixed"
    ? hasDraft(data, step.id)
      ? "กลับมาทำต่อจากคำตอบหรือบันทึกที่เก็บไว้ในเส้นทางผสม"
      : companionStep
        ? `ภารกิจผสมวันนี้เริ่ม ${course?.title ?? "เส้นทางแรก"} แล้วสลับไป ${companionCourse?.title ?? "อีกเส้นทาง"} เพื่อให้พื้นฐานทั้งสองฝั่งเดินคู่กัน`
        : `เรียน ${course?.title ?? "เส้นทางนี้"} ให้จบช่วงปัจจุบันก่อนเปิดช่วงถัดไป`
    : started
      ? "กลับมาต่อจากคำตอบที่บันทึกไว้"
      : `เรียนตามลำดับพื้นฐานของ ${course?.title ?? "เส้นทางนี้"} โดยไม่ข้าม mental model`;
  return { step, course, companionStep, companionCourse, reason };
}
