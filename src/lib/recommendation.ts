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

export function stepRecommendation(data: AppData) {
  const courseOrder = data.mode === "java"
    ? ["java-foundations", "java-oop"]
    : data.mode === "fullstack"
      ? ["developer-foundations", "javascript-foundations", "node-foundations"]
      : ["developer-foundations", "java-foundations", "javascript-foundations", "java-oop", "node-foundations"];
  const pool = courseOrder.flatMap((courseId) => learningSteps.filter((step) => step.courseId === courseId));
  const step = pool.find((candidate) => !data.stepProgress[candidate.id]?.completed) ?? pool[0] ?? learningSteps[0];
  const course = curriculumCourses.find((candidate) => candidate.id === step.courseId);
  const started = data.stepProgress[step.id];
  return { step, course, reason: started ? "กลับมาต่อจากคำตอบที่บันทึกไว้" : `เรียนตามลำดับพื้นฐานของ ${course?.title ?? "เส้นทางนี้"} โดยไม่ข้าม mental model` };
}
