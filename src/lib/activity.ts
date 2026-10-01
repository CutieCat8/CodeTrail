import type { AppData } from "@/types/domain";
import type { ActivityEvent } from "@/types/domain";

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

function legacyActivityTimestamps(data: AppData) {
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

export function activityTimestamps(data: AppData) {
  return data.activityEvents === undefined
    ? legacyActivityTimestamps(data)
    : data.activityEvents.filter((event) => timestampIsValid(event.occurredAt)).map((event) => event.occurredAt);
}

export function withLegacyActivityEvents(data: AppData): AppData {
  if (data.activityEvents !== undefined) return data;
  return {
    ...data,
    activityEvents: legacyActivityTimestamps(data).map((timestamp, index) => ({
      id: `legacy-${index}-${timestamp}`,
      occurredAt: timestamp,
      type: "legacy-snapshot",
      sourceId: `legacy-${index}`,
    })),
  };
}

export function recordActivity(data: AppData, type: Exclude<ActivityEvent["type"], "legacy-snapshot">, sourceId: string, occurredAt = new Date().toISOString()): AppData {
  const existing = withLegacyActivityEvents(data).activityEvents ?? [];
  return {
    ...data,
    activityEvents: [...existing, { id: crypto.randomUUID(), occurredAt, type, sourceId }],
  };
}

export function weeklyActivityCount(data: AppData, now = new Date()) {
  const todayKey = bangkokDateKey(now.toISOString());
  const today = new Date(`${todayKey}T12:00:00+07:00`);
  const daysSinceMonday = (today.getUTCDay() + 6) % 7;
  const monday = new Date(today.getTime() - daysSinceMonday * DAY_MS);
  const startKey = bangkokDateKey(monday.toISOString());
  return activityTimestamps(data).filter((timestamp) => {
    const day = bangkokDateKey(timestamp);
    return day >= startKey && day <= todayKey;
  }).length;
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
