"use client";

import { Bookmark } from "lucide-react";
import { toggleStepBookmark } from "@/lib/bookmarks";
import type { AppData } from "@/types/domain";

export function BookmarkButton({ stepId, title, data, setData }: {
  stepId: string;
  title: string;
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}) {
  const saved = data.bookmarkedStepIds?.includes(stepId) ?? false;
  return <button className="secondary bookmark-button" type="button" aria-pressed={saved}
    aria-label={`บันทึกไว้เรียนภายหลัง: ${title}`}
    onClick={() => setData(current => toggleStepBookmark(current, stepId))}>
    <Bookmark aria-hidden="true" />{saved ? "บันทึกไว้แล้ว" : "บันทึกไว้เรียนภายหลัง"}
  </button>;
}
