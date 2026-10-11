import { describe, expect, it } from "vitest";
import { friendsActivityMilestones } from "@/content/projects";
import { lessons } from "@/content/lessons";
import { topicSources } from "@/content/curriculum";
import { emptyData, isAppData, normalizeAppData } from "@/lib/storage";
import { emptyMilestoneProgress, isMilestoneSubmitted, milestoneSubmissionError, projectMilestoneSummary, updateMilestone } from "@/lib/projects";

const milestone = friendsActivityMilestones[0];
const ready = () => ({
  ...emptyMilestoneProgress(),
  checks: Object.fromEntries(milestone.criteria.map(criterion => [criterion.id, true])),
  evidenceUrl: "https://github.com/example/planner/tree/main/docs",
  notes: "รันตาม README จาก checkout ใหม่แล้ว และตรวจ commit ตั้งต้น",
});

describe("Friends Activity Planner milestones", () => {
  it("links every milestone to available learning content and stable criteria", () => {
    expect(new Set(friendsActivityMilestones.map(item => item.id)).size).toBe(friendsActivityMilestones.length);
    for (const item of friendsActivityMilestones) {
      expect(item.tasks.length).toBeGreaterThan(0);
      expect(item.artifacts.length).toBeGreaterThan(0);
      expect(new Set(item.criteria.map(criterion => criterion.id)).size).toBe(item.criteria.length);
      for (const id of item.lessonIds) expect(lessons.some(lesson => lesson.id === id), id).toBe(true);
      for (const id of item.topicIds ?? []) expect(topicSources.some(topic => topic.id === id), id).toBe(true);
    }
  });

  it("requires all checks, a safe evidence URL, and an explanation before self submission", () => {
    expect(milestoneSubmissionError(milestone, emptyMilestoneProgress())).toBeTruthy();
    expect(milestoneSubmissionError(milestone, { ...ready(), checks: {} })).toBeTruthy();
    for (const evidenceUrl of ["", "javascript:alert(1)", "file:///tmp/code", "https://user:password@example.com/"]) {
      expect(milestoneSubmissionError(milestone, { ...ready(), evidenceUrl })).toBeTruthy();
    }
    expect(milestoneSubmissionError(milestone, { ...ready(), notes: "  " })).toBeTruthy();
    expect(milestoneSubmissionError(milestone, ready())).toBeNull();
  });

  it("counts self submissions only when evidence is complete and leaves legacy criteria independent", () => {
    const project = { repositoryUrl: "", demoUrl: "", checklist: [true, true, true, true], updatedAt: "", milestones: { [milestone.id]: { ...ready(), submittedAt: "2026-10-06T12:00:00.000Z" } } };
    expect(projectMilestoneSummary(project)).toMatchObject({ submitted: 1, total: 9, next: friendsActivityMilestones[1] });
    expect(projectMilestoneSummary({ ...project, milestones: undefined }).submitted).toBe(0);
    expect(isMilestoneSubmitted(milestone, { ...ready(), submittedAt: "not-a-date" })).toBe(false);
  });

  it("invalidates a submission when its evidence changes without mutating the old record", () => {
    const progress = { ...ready(), submittedAt: "2026-10-06T12:00:00.000Z" };
    const changed = updateMilestone(progress, { notes: "แก้แล้ว ต้องตรวจใหม่" }, "2026-10-07T12:00:00Z");
    expect(changed.submittedAt).toBeUndefined();
    expect(progress.submittedAt).toBeDefined();
    expect(updateMilestone(progress, { notes: progress.notes }).submittedAt).toBe(progress.submittedAt);
  });

  it("round trips new milestones while keeping old project links and checklist unchanged", () => {
    const data = { ...emptyData(), projectProgress: { planner: { repositoryUrl: "https://github.com/example/planner", demoUrl: "", checklist: [true, false], updatedAt: "2026-10-06T12:00:00.000Z", milestones: { [milestone.id]: { ...ready(), submittedAt: "2026-10-06T12:00:00.000Z" } } } } };
    expect(normalizeAppData(JSON.parse(JSON.stringify(data)))?.projectProgress).toEqual(data.projectProgress);
    const broken = { ...data, projectProgress: { planner: { ...data.projectProgress.planner, milestones: { bad: { ...ready(), checks: { scope: "yes" } } } } } };
    expect(isAppData(broken)).toBe(false);
    expect(isAppData({ ...data, projectProgress: { planner: { ...data.projectProgress.planner, milestones: { bad: null } } } })).toBe(false);
    expect(isAppData({ ...data, projectProgress: { planner: { ...data.projectProgress.planner, milestones: [] } } })).toBe(false);
  });
});
