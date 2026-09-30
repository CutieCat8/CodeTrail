import type { AppData } from "@/types/domain";

export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export type ActivityDay = {
  date: string;
  count: number;
  level: ActivityLevel;
};

const DAY_MS = 86_400_000;

export const bangkokDateKey = (iso: string) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Bangkok",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date(iso));

const timestampIsValid = (value: string | undefined): value is string => Boolean(value) && !Number.isNaN(new Date(value as string).getTime());

export function activityTimestamps(data: AppData) {
  const timestamps: string[] = [];
  Object.values(data.progress).forEach((progress) => {
    if (timestampIsValid(progress.updatedAt)) timestamps.push(progress.updatedAt);
  });
  Object.values(data.stepProgress).forEach((progress) => {
    if (timestampIsValid(progress.updatedAt)) timestamps.push(progress.updatedAt);
  });
  data.journal.forEach((entry) => {
    if (timestampIsValid(entry.updatedAt)) timestamps.push(entry.updatedAt);
  });
  Object.values(data.projectProgress ?? {}).forEach((project) => {
    if (timestampIsValid(project.updatedAt)) timestamps.push(project.updatedAt);
  });
  return timestamps;
}

export function buildActivityDays(data: AppData, weeks = 20, now = new Date()): ActivityDay[] {
  const length = Math.max(1, Math.floor(weeks)) * 7;
  const counts = new Map<string, number>();
  activityTimestamps(data).forEach((timestamp) => {
    const key = bangkokDateKey(timestamp);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const endKey = bangkokDateKey(now.toISOString());
  const end = new Date(`${endKey}T12:00:00+07:00`);
  const days = Array.from({ length }, (_, index) => {
    const date = new Date(end.getTime() - (length - 1 - index) * DAY_MS);
    const key = bangkokDateKey(date.toISOString());
    return { date: key, count: counts.get(key) ?? 0 };
  });
  const max = Math.max(1, ...days.map((day) => day.count));
  return days.map((day) => ({
    ...day,
    level: day.count === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil((day.count / max) * 4))) as ActivityLevel,
  }));
}
