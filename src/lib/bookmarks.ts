import { stepById } from "@/content/curriculum";
import type { AppData } from "@/types/domain";

export function toggleStepBookmark(data: AppData, stepId: string): AppData {
  if (!stepById(stepId)) return data;
  const current = data.bookmarkedStepIds ?? [];
  return {
    ...data,
    bookmarkedStepIds: current.includes(stepId)
      ? current.filter(id => id !== stepId)
      : [...current, stepId],
  };
}
