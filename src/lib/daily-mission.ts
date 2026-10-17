import { stepById } from "@/content/curriculum";
import { routeCourseIds } from "./learning-route";
import { stepRecommendation } from "./recommendation";
import type { AppData } from "@/types/domain";

export function missionDay(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function dailyMission(data: AppData, day: string) {
  const saved = data.dailyMissions?.[data.mode];
  const step = saved?.date === day ? stepById(saved.stepId) : undefined;
  if (step && routeCourseIds(data.mode).includes(step.courseId)) return saved!;
  return { date: day, stepId: stepRecommendation(data).step.id };
}

export function ensureDailyMission(data: AppData, day: string): AppData {
  const mission = dailyMission(data, day);
  if (data.dailyMissions?.[data.mode] === mission) return data;
  return { ...data, dailyMissions: { ...data.dailyMissions, [data.mode]: mission } };
}
