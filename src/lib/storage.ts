import type { AppData, LessonProgress, StudyMode } from "@/types/domain";

export const STORAGE_KEY = "seas-fullstack-quest:v1";

export const emptyData = (): AppData => ({
  version: 1,
  mode: "mixed",
  weeklyGoal: 5,
  progress: {},
  journal: [],
  stepProgress: {},
});

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const isBooleanArray = (value: unknown): value is boolean[] => Array.isArray(value) && value.every((item) => typeof item === "boolean");

export function isAppData(value: unknown): value is AppData {
  if (!isRecord(value)) return false;
  const candidate = value as Partial<AppData>;
  if (candidate.version !== 1) return false;
  if (!["fullstack", "java", "mixed"].includes(candidate.mode as StudyMode)) return false;
  if (!Number.isInteger(candidate.weeklyGoal) || Number(candidate.weeklyGoal) < 1 || Number(candidate.weeklyGoal) > 14) return false;
  if (!isRecord(candidate.progress) || !Array.isArray(candidate.journal)) return false;
  for (const progress of Object.values(candidate.progress)) {
    if (!isRecord(progress)) return false;
    if (typeof progress.lessonId !== "string" || typeof progress.code !== "string" || typeof progress.notes !== "string" || typeof progress.reflection !== "string") return false;
    if (!isBooleanArray(progress.checklist) || !["not-started", "in-progress", "passed", "review"].includes(String(progress.status))) return false;
    if (!Number.isInteger(progress.attempts) || typeof progress.updatedAt !== "string") return false;
    if (progress.completedAt !== undefined && typeof progress.completedAt !== "string") return false;
    if (progress.solutionViewed !== undefined && typeof progress.solutionViewed !== "boolean") return false;
    if (progress.lastResult !== undefined) {
      if (!isRecord(progress.lastResult) || typeof progress.lastResult.passed !== "boolean" || typeof progress.lastResult.at !== "string" || !Array.isArray(progress.lastResult.details)) return false;
      if (!progress.lastResult.details.every((detail) => isRecord(detail) && typeof detail.name === "string" && typeof detail.passed === "boolean" && typeof detail.expected === "string" && typeof detail.actual === "string" && (detail.error === undefined || typeof detail.error === "string"))) return false;
    }
  }
  if (candidate.stepProgress !== undefined) {
    if (!isRecord(candidate.stepProgress)) return false;
    for (const progress of Object.values(candidate.stepProgress)) {
      if (!isRecord(progress) || typeof progress.stepId !== "string" || typeof progress.answer !== "string" || typeof progress.notes !== "string" || typeof progress.completed !== "boolean" || typeof progress.updatedAt !== "string") return false;
      if (progress.answerRevealed !== undefined && typeof progress.answerRevealed !== "boolean") return false;
    }
  }
  if (candidate.roadmapMarks !== undefined) {
    if (!isRecord(candidate.roadmapMarks)) return false;
    if (!Object.values(candidate.roadmapMarks).every((mark) => ["learning", "done", "skip"].includes(String(mark)))) return false;
  }
  if (candidate.projectProgress !== undefined) {
    if (!isRecord(candidate.projectProgress)) return false;
    for (const progress of Object.values(candidate.projectProgress)) {
      if (!isRecord(progress)) return false;
      const item = progress as { repositoryUrl?: unknown; demoUrl?: unknown; checklist?: unknown; updatedAt?: unknown };
      if (typeof item.repositoryUrl !== "string" || typeof item.demoUrl !== "string" || typeof item.updatedAt !== "string") return false;
      if (!isBooleanArray(item.checklist)) return false;
    }
  }
  if (candidate.lastLessonId !== undefined && typeof candidate.lastLessonId !== "string") return false;
  if (candidate.lastStepId !== undefined && typeof candidate.lastStepId !== "string") return false;
  return candidate.journal.every((entry) => isRecord(entry)
    && [entry.id, entry.date, entry.title, entry.learned, entry.bug, entry.fix, entry.unclear, entry.link, entry.updatedAt].every((field) => typeof field === "string")
    && (entry.lessonId === undefined || typeof entry.lessonId === "string"));
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed: unknown = JSON.parse(raw);
    return normalizeAppData(parsed) ?? emptyData();
  } catch {
    return emptyData();
  }
}

export function normalizeAppData(value: unknown): AppData | null {
  if (!isAppData(value)) return null;
  return { ...value, stepProgress: value.stepProgress ?? {}, projectProgress: value.projectProgress ?? {} };
}

export function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function newProgress(lessonId: string, starterCode: string): LessonProgress {
  return {
    lessonId,
    code: starterCode,
    notes: "",
    reflection: "",
    checklist: [],
    status: "in-progress",
    attempts: 0,
    updatedAt: new Date().toISOString(),
  };
}

const bangkokDay = (iso: string) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date(iso));

export function calculateStreak(data: AppData) {
  const activeDays = new Set<string>();
  Object.values(data.progress).forEach((p) => activeDays.add(bangkokDay(p.updatedAt)));
  data.journal.forEach((j) => activeDays.add(bangkokDay(j.updatedAt)));
  if (!activeDays.size) return 0;
  const today = new Date();
  const todayKey = bangkokDay(today.toISOString());
  const yesterday = new Date(today.getTime() - 86_400_000);
  let cursor = activeDays.has(todayKey) ? today : yesterday;
  let count = 0;
  while (activeDays.has(bangkokDay(cursor.toISOString()))) {
    count += 1;
    cursor = new Date(cursor.getTime() - 86_400_000);
  }
  return count;
}

export function xpTotal(data: AppData, xpByLesson: Record<string, number>) {
  return Object.values(data.progress).reduce((sum, item) => sum + (item.completedAt ? (xpByLesson[item.lessonId] ?? 0) : 0), 0);
}
