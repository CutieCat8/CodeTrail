"use client";

import { useMemo, useState } from "react";
import { buildActivityDays, type ActivityDay } from "@/lib/activity";
import type { AppData } from "@/types/domain";

const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

const formatDay = (date: string) => new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Bangkok",
}).format(new Date(`${date}T12:00:00+07:00`));

function toWeeks(days: ActivityDay[]) {
  const weeks: ActivityDay[][] = [];
  for (let index = 0; index < days.length; index += 7) weeks.push(days.slice(index, index + 7));
  return weeks;
}

export function ActivityHeatmap({ data }: { data: AppData }) {
  const days = useMemo(() => buildActivityDays(data), [data]);
  const weeks = useMemo(() => toWeeks(days), [days]);
  const [active, setActive] = useState<ActivityDay | null>(null);
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const activeDays = days.filter((day) => day.count > 0).length;
  const monthLabels = weeks.map((week, index) => {
    const month = Number(week[0]?.date.slice(5, 7));
    const previousMonth = Number(weeks[index - 1]?.[0]?.date.slice(5, 7));
    return index === 0 || month !== previousMonth ? MONTHS[month - 1] : "";
  });
  const summary = active
    ? `${active.count} หลักฐาน · ${formatDay(active.date)}`
    : total
      ? "เลือกช่องเพื่อดูจำนวนหลักฐานในวันนั้น"
      : "เริ่มบทแรก แล้วกิจกรรมจริงจะปรากฏตรงนี้";

  return <section className="activity-card" aria-labelledby="activity-title">
    <header className="activity-card-head">
      <div><span className="eyebrow">Activity log</span><h2 id="activity-title">จังหวะการฝึก 20 สัปดาห์</h2></div>
      <div className="activity-totals"><strong>{activeDays}</strong><span>วันที่มีหลักฐาน</span><strong>{total}</strong><span>รายการบันทึก</span></div>
    </header>
    <div className="activity-stage">
      <div className="activity-months" aria-hidden="true">{monthLabels.map((month, index) => <span key={`${month}-${index}`}>{month}</span>)}</div>
      <div className="activity-grid" onPointerLeave={() => setActive(null)}>
        {weeks.map((week, weekIndex) => <div className="activity-week" key={week[0]?.date ?? weekIndex}>
          {week.map((day) => <button
            type="button"
            key={day.date}
            className={`activity-cell level-${day.level}`}
            aria-label={`${formatDay(day.date)} มี ${day.count} หลักฐาน`}
            aria-pressed={active?.date === day.date}
            onPointerEnter={() => setActive(day)}
            onFocus={() => setActive(day)}
            onClick={() => setActive(day)}
          />)}
        </div>)}
      </div>
      <p className="activity-detail" aria-live="polite">{summary}</p>
    </div>
    <footer><span>ข้อมูลจาก progress, micro-step, journal และ project ที่บันทึกใน browser นี้</span><div className="activity-legend"><small>น้อย</small>{[0,1,2,3,4].map((level) => <i className={`level-${level}`} key={level}/>)}<small>มาก</small></div></footer>
  </section>;
}
