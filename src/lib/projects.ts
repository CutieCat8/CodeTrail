import { friendsActivityMilestones, type ProjectMilestone } from "@/content/projects";
import type { ProjectMilestoneProgress, ProjectProgress } from "@/types/domain";

export const emptyMilestoneProgress = (): ProjectMilestoneProgress => ({
  checks: {}, evidenceUrl: "", notes: "", updatedAt: "",
});

export function safeEvidenceUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export function milestoneSubmissionError(milestone: ProjectMilestone, progress: ProjectMilestoneProgress): string | null {
  if (!milestone.criteria.every(criterion => progress.checks[criterion.id] === true)) return "ตรวจและติ๊กเกณฑ์ของ milestone นี้ให้ครบก่อนส่งหลักฐาน";
  if (!safeEvidenceUrl(progress.evidenceUrl)) return "แนบลิงก์หลักฐานแบบ http:// หรือ https:// ที่ไม่มี username/password";
  if (!progress.notes.trim()) return "อธิบายสิ่งที่ทำ ผลที่ทดลอง และข้อจำกัดของงานก่อนส่งหลักฐาน";
  return null;
}

export function isMilestoneSubmitted(milestone: ProjectMilestone, progress: ProjectMilestoneProgress | undefined): boolean {
  return Boolean(progress?.submittedAt && Number.isFinite(Date.parse(progress.submittedAt)) && !milestoneSubmissionError(milestone, progress));
}

export function projectMilestoneSummary(project: ProjectProgress | undefined) {
  const submitted = friendsActivityMilestones.filter(milestone => isMilestoneSubmitted(milestone, project?.milestones?.[milestone.id])).length;
  return {
    submitted,
    total: friendsActivityMilestones.length,
    next: friendsActivityMilestones.find(milestone => !isMilestoneSubmitted(milestone, project?.milestones?.[milestone.id])),
  };
}

export function projectBriefMarkdown(): string {
  return [
    "# Friends Activity Planner",
    "สร้างระบบสำหรับเพื่อน 9 คน: ดูและกรองกิจกรรม สร้างกิจกรรม เข้าร่วม และโหวตช่วงเวลา",
    "ทำตามลำดับที่แนะนำหรือเลือกย้อนกลับไปฝึกได้ ทุก milestone ส่งลิงก์หลักฐานพร้อมคำอธิบายผลตรวจใน CodeTrail โดยผู้เรียนเป็นผู้ตรวจเอง",
    ...friendsActivityMilestones.map((milestone, index) => [
      `## ${index + 1}. ${milestone.title}`,
      milestone.objective,
      "### ลงมือทำ",
      ...milestone.tasks.map(task => `- ${task}`),
      "### เกณฑ์ตรวจ",
      ...milestone.criteria.map(criterion => `- [ ] ${criterion.label}`),
      "### หลักฐานที่ควรแนบ",
      ...milestone.artifacts.map(artifact => `- ${artifact}`),
      `ชวนคิด: ${milestone.reflection}`,
      "ลิงก์หลักฐาน: ", "ผลการทดลองและข้อจำกัด: ",
    ].join("\n\n")),
  ].join("\n\n") + "\n";
}

export function updateMilestone(
  progress: ProjectMilestoneProgress,
  patch: Partial<Pick<ProjectMilestoneProgress, "checks" | "evidenceUrl" | "notes">>,
  now = new Date().toISOString(),
): ProjectMilestoneProgress {
  const changed = (patch.notes !== undefined && patch.notes !== progress.notes)
    || (patch.evidenceUrl !== undefined && patch.evidenceUrl !== progress.evidenceUrl)
    || (patch.checks !== undefined && JSON.stringify(patch.checks) !== JSON.stringify(progress.checks));
  return { ...progress, ...patch, updatedAt: now, submittedAt: changed ? undefined : progress.submittedAt };
}
