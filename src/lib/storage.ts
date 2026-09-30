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

export function isAppData(value: unknown): value is AppData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AppData>;
  if (candidate.version !== 1) return false;
  if (!["fullstack", "java", "mixed"].includes(candidate.mode as StudyMode)) return false;
  if (!Number.isInteger(candidate.weeklyGoal) || Number(candidate.weeklyGoal) < 1 || Number(candidate.weeklyGoal) > 14) return false;
  if (!candidate.progress || typeof candidate.progress !== "object" || !Array.isArray(candidate.journal)) return false;
  if (candidate.roadmapMarks !== undefined) {
    if (!candidate.roadmapMarks || typeof candidate.roadmapMarks !== "object" || Array.isArray(candidate.roadmapMarks)) return false;
    if (!Object.values(candidate.roadmapMarks).every((mark) => ["learning", "done", "skip"].includes(String(mark)))) return false;
  }
  if (candidate.projectProgress !== undefined) {
    if (!candidate.projectProgress || typeof candidate.projectProgress !== "object" || Array.isArray(candidate.projectProgress)) return false;
    for (const progress of Object.values(candidate.projectProgress)) {
      if (!progress || typeof progress !== "object") return false;
      const item = progress as { repositoryUrl?: unknown; demoUrl?: unknown; checklist?: unknown; updatedAt?: unknown };
      if (typeof item.repositoryUrl !== "string" || typeof item.demoUrl !== "string" || typeof item.updatedAt !== "string") return false;
      if (!Array.isArray(item.checklist) || !item.checklist.every((checked) => typeof checked === "boolean")) return false;
    }
  }
  return candidate.journal.every((entry) => entry && typeof entry.id === "string" && typeof entry.title === "string");
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
