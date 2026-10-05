import type { AppData, LessonProgress, LessonStatus, RoadmapMark, StudyMode } from "@/types/domain";

export const STORAGE_KEY = "seas-fullstack-quest:v1";
// Stored data that fails validation is copied to `${REJECTED_STORAGE_KEY}:<ISO time>` before the
// app falls back to empty data, so a stricter schema never silently discards what was saved.
export const REJECTED_STORAGE_KEY = `${STORAGE_KEY}:rejected`;

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
const isOneOf = <T extends string>(value: unknown, allowed: readonly T[]): value is T => typeof value === "string" && (allowed as readonly string[]).includes(value);

// The app writes timestamps with Date#toISOString() and journal dates as their first 10 characters.
const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_TIMESTAMP.test(value)) return false;
  const time = Date.parse(value);
  return !Number.isNaN(time) && new Date(time).toISOString() === value;
}

export function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && ISO_DATE.test(value) && isIsoTimestamp(`${value}T00:00:00.000Z`);
}

export function isAppData(value: unknown): value is AppData {
  if (!isRecord(value)) return false;
  const candidate = value as Partial<AppData>;
  if (candidate.version !== 1) return false;
  if (!isOneOf<StudyMode>(candidate.mode, ["fullstack", "java", "mixed"])) return false;
  if (!Number.isInteger(candidate.weeklyGoal) || Number(candidate.weeklyGoal) < 1 || Number(candidate.weeklyGoal) > 14) return false;
  if (!isRecord(candidate.progress) || !Array.isArray(candidate.journal)) return false;
  for (const progress of Object.values(candidate.progress)) {
    if (!isRecord(progress)) return false;
    if (typeof progress.lessonId !== "string" || typeof progress.code !== "string" || typeof progress.notes !== "string" || typeof progress.reflection !== "string") return false;
    if (!isBooleanArray(progress.checklist) || !isOneOf<LessonStatus>(progress.status, ["not-started", "in-progress", "passed", "review"])) return false;
    if (!Number.isInteger(progress.attempts) || !isIsoTimestamp(progress.updatedAt)) return false;
    if (progress.completedAt !== undefined && !isIsoTimestamp(progress.completedAt)) return false;
    if (progress.solutionViewed !== undefined && typeof progress.solutionViewed !== "boolean") return false;
    if (progress.lastResult !== undefined) {
      if (!isRecord(progress.lastResult) || typeof progress.lastResult.passed !== "boolean" || !isIsoTimestamp(progress.lastResult.at) || !Array.isArray(progress.lastResult.details)) return false;
      if (!progress.lastResult.details.every((detail) => isRecord(detail) && typeof detail.name === "string" && typeof detail.passed === "boolean" && typeof detail.expected === "string" && typeof detail.actual === "string" && (detail.error === undefined || typeof detail.error === "string"))) return false;
    }
  }
  if (candidate.stepProgress !== undefined) {
    if (!isRecord(candidate.stepProgress)) return false;
    for (const progress of Object.values(candidate.stepProgress)) {
      if (!isRecord(progress) || typeof progress.stepId !== "string" || typeof progress.answer !== "string" || typeof progress.notes !== "string" || typeof progress.completed !== "boolean" || !isIsoTimestamp(progress.updatedAt)) return false;
      if (progress.answerRevealed !== undefined && typeof progress.answerRevealed !== "boolean") return false;
    }
  }
  if (candidate.roadmapMarks !== undefined) {
    if (!isRecord(candidate.roadmapMarks)) return false;
    if (!Object.values(candidate.roadmapMarks).every((mark) => isOneOf<RoadmapMark>(mark, ["learning", "done", "skip"]))) return false;
  }
  if (candidate.projectProgress !== undefined) {
    if (!isRecord(candidate.projectProgress)) return false;
    for (const progress of Object.values(candidate.projectProgress)) {
      if (!isRecord(progress)) return false;
      const item = progress as { repositoryUrl?: unknown; demoUrl?: unknown; checklist?: unknown; updatedAt?: unknown };
      if (typeof item.repositoryUrl !== "string" || typeof item.demoUrl !== "string" || !isIsoTimestamp(item.updatedAt)) return false;
      if (!isBooleanArray(item.checklist)) return false;
    }
  }
  if (candidate.lastLessonId !== undefined && typeof candidate.lastLessonId !== "string") return false;
  if (candidate.lastStepId !== undefined && typeof candidate.lastStepId !== "string") return false;
  return candidate.journal.every((entry) => isRecord(entry)
    && [entry.id, entry.title, entry.learned, entry.bug, entry.fix, entry.unclear, entry.link].every((field) => typeof field === "string")
    && isIsoDate(entry.date) && isIsoTimestamp(entry.updatedAt)
    && (entry.lessonId === undefined || typeof entry.lessonId === "string"));
}

// `backedUpRaw` is the rejected stored value that was copied aside, or null when nothing was
// rejected or the copy failed; pass it to canOverwriteStoredData before every save.
export function loadData(now = new Date()): { data: AppData; backedUpRaw: string | null } {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { data: emptyData(), backedUpRaw: null };
  }
  if (!raw) return { data: emptyData(), backedUpRaw: null };
  try {
    const normalized = normalizeAppData(JSON.parse(raw));
    if (normalized) return { data: normalized, backedUpRaw: null };
  } catch {
    // unreadable JSON is preserved below like any other rejected value
  }
  try {
    const base = `${REJECTED_STORAGE_KEY}:${now.toISOString()}`;
    let key = base;
    for (let suffix = 2; localStorage.getItem(key) !== null; suffix += 1) key = `${base}:${suffix}`;
    localStorage.setItem(key, raw);
    return { data: emptyData(), backedUpRaw: raw };
  } catch {
    return { data: emptyData(), backedUpRaw: null };
  }
}

// True when saving loses nothing: storage is empty, holds valid data (e.g. after an import or
// from another tab), or holds exactly the rejected value already backed up by loadData.
// Checked before every autosave, so invalid data written later (another tab) is never overwritten.
export function canOverwriteStoredData(backedUpRaw: string | null = null): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || raw === backedUpRaw) return true;
    return normalizeAppData(JSON.parse(raw)) !== null;
  } catch {
    return false;
  }
}

export function normalizeAppData(value: unknown): AppData | null {
  if (!isAppData(value)) return null;
  return { ...value, stepProgress: value.stepProgress ?? {}, projectProgress: value.projectProgress ?? {} };
}

export function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function serializeAppData(data: AppData) {
  return JSON.stringify(data, null, 2);
}

export type ImportResult = { ok: true; data: AppData } | { ok: false; error: string };

// Validates and persists an export file before the caller replaces in-memory data,
// so a rejected file or a failed write leaves the current data untouched.
export function importAppData(text: string, save: (data: AppData) => void = saveData): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "ไฟล์ไม่ใช่ JSON ที่ถูกต้อง" };
  }
  const normalized = normalizeAppData(parsed);
  if (!normalized) return { ok: false, error: "รูปแบบไม่ตรง schema v1" };
  try {
    save(normalized);
  } catch (error) {
    return { ok: false, error: `บันทึกลงอุปกรณ์ไม่สำเร็จ (${error instanceof Error ? error.name : "unknown"})` };
  }
  return { ok: true, data: normalized };
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

const bangkokDay = (time: number) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date(time));

export function calculateStreak(data: AppData, now = new Date()) {
  const activeDays = new Set<string>();
  // Non-canonical timestamps are skipped rather than mapped (or rolled over) to a day,
  // so bad data never invents activity.
  const addDay = (timestamp: string) => {
    if (isIsoTimestamp(timestamp)) activeDays.add(bangkokDay(Date.parse(timestamp)));
  };
  Object.values(data.progress).forEach((p) => addDay(p.updatedAt));
  data.journal.forEach((j) => addDay(j.updatedAt));
  if (!activeDays.size) return 0;
  const today = now.getTime();
  let cursor = activeDays.has(bangkokDay(today)) ? today : today - 86_400_000;
  let count = 0;
  while (activeDays.has(bangkokDay(cursor))) {
    count += 1;
    cursor -= 86_400_000;
  }
  return count;
}

export function xpTotal(data: AppData, xpByLesson: Record<string, number>) {
  return Object.values(data.progress).reduce((sum, item) => sum + (item.completedAt ? (xpByLesson[item.lessonId] ?? 0) : 0), 0);
}
