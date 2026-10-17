"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { stepById } from "@/content/curriculum";
import { dailyMission, ensureDailyMission, missionDay } from "@/lib/daily-mission";
import type { AppData } from "@/types/domain";

export function DailyMission({ data, setData, openStep }: {
  data: AppData; setData: Dispatch<SetStateAction<AppData>>; openStep: (id: string) => void;
}) {
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => {
    const refresh = () => setDay(missionDay());
    refresh();
    const timer = window.setInterval(refresh, 30_000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);
  useEffect(() => {
    if (day) setData(current => ensureDailyMission(current, day));
  }, [day, data.mode, data.dailyMissions, setData]);
  if (!day) return null;
  const mission = dailyMission(data, day);
  const step = stepById(mission.stepId);
  if (!step) return null;
  const progress = data.stepProgress[step.id];
  const completed = Boolean(progress?.completed);
  return <section className="daily-mission" aria-labelledby="daily-mission-title">
    <header><h2 id="daily-mission-title">ภารกิจวันนี้</h2><span>{day} · เวลาไทย</span></header>
    <h3>{step.title}</h3><p>{step.objective}</p>
    <p>{step.minutes} นาทีโดยประมาณ · {completed ? "บทนี้บันทึกว่าทำแล้ว" : progress ? "กำลังทำ" : "ยังไม่ได้ทำ"}</p>
    <p>บทเดิมตลอดวันในโหมดนี้ ใช้ progress ของบทเรียน ไม่ให้ XP เพิ่มจากการ์ดนี้</p>
    <button className="primary" type="button" onClick={() => openStep(step.id)}>{completed ? "ทบทวนภารกิจวันนี้" : "เปิดภารกิจวันนี้"}</button>
  </section>;
}
