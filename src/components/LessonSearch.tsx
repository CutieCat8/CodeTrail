"use client";

import { useId, useMemo, useState } from "react";
import {
  courseById, initialLessonSearchFilters, learningStateLabels, searchCourses,
  searchLanguages, searchLearningSteps, stepLearningState,
  type LessonSearchFilters,
} from "@/lib/lesson-search";
import type { AppData } from "@/types/domain";

const pageSize = 30;

type LessonSearchProps = {
  data: AppData;
  openStep: (id: string) => void;
  track?: LessonSearchFilters["track"];
};

export function LessonSearch(props: LessonSearchProps) {
  return <LessonSearchContent key={props.track ?? "all"} {...props} />;
}

function LessonSearchContent({ data, openStep, track = "all" }: LessonSearchProps) {
  const id = useId();
  const [filters, setFilters] = useState(initialLessonSearchFilters);
  const [limit, setLimit] = useState(pageSize);
  const results = useMemo(() => searchLearningSteps({ ...filters, track }, data.stepProgress), [filters, track, data.stepProgress]);
  function update<K extends keyof LessonSearchFilters>(key: K, value: LessonSearchFilters[K]) {
    setFilters(current => ({ ...current, [key]: value }));
    setLimit(pageSize);
  }
  const courses = searchCourses.filter(course => track === "all" || course.track === track);
  return <section className="lesson-search" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>ค้นหาบทเรียน</h2>
    <p>ค้นหาชื่อบทเรียน เป้าหมาย คอร์ส หรือคำศัพท์จากบทเรียนที่เปิดให้เรียนแล้ว</p>
    <div className="lesson-search-filters">
      <label htmlFor={`${id}-query`}>คำค้น
        <input id={`${id}-query`} type="search" value={filters.query} onChange={event => update("query", event.target.value)} placeholder="เช่น TypeScript union" />
      </label>
      <label htmlFor={`${id}-course`}>คอร์ส
        <select id={`${id}-course`} value={filters.courseId} onChange={event => update("courseId", event.target.value)}>
          <option value="all">ทุกคอร์ส</option>
          {courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}
        </select>
      </label>
      <label htmlFor={`${id}-language`}>ภาษา
        <select id={`${id}-language`} value={filters.language} onChange={event => update("language", event.target.value as LessonSearchFilters["language"])}>
          <option value="all">ทุกภาษา</option>
          {searchLanguages.map(language => <option key={language} value={language}>{language}</option>)}
        </select>
      </label>
      <label htmlFor={`${id}-state`}>สถานะการเรียน
        <select id={`${id}-state`} value={filters.state} onChange={event => update("state", event.target.value as LessonSearchFilters["state"])}>
          <option value="all">ทุกสถานะ</option>
          {Object.entries(learningStateLabels).map(([state, label]) => <option key={state} value={state}>{label}</option>)}
        </select>
      </label>
      <button className="secondary" type="button" onClick={() => { setFilters(initialLessonSearchFilters); setLimit(pageSize); }}>ล้างตัวกรอง</button>
    </div>
    <p role="status" aria-live="polite">พบ {results.length} บทเรียน · แสดง {Math.min(limit, results.length)} บทเรียน</p>
    {results.length === 0 ? <p>ไม่พบบทเรียนที่ตรงกับตัวกรอง ลองเปลี่ยนคำค้นหรือล้างตัวกรอง</p> : <ul className="lesson-search-results">
      {results.slice(0, limit).map(step => <li key={step.id}>
        <div><span>{courseById.get(step.courseId)?.title} · {step.unit}</span>
          <h3>{step.title}</h3><p>{step.objective}</p>
          <small>{step.language ?? "ไม่ระบุภาษา"} · {step.minutes} นาที · {learningStateLabels[stepLearningState(data.stepProgress[step.id])]}</small>
        </div>
        <button className="secondary" type="button" onClick={() => openStep(step.id)} aria-label={`เปิดบทเรียน ${step.title}`}>เปิดบทเรียน</button>
      </li>)}
    </ul>}
    {results.length > limit && <button className="secondary" type="button" onClick={() => setLimit(current => current + pageSize)}>แสดงเพิ่มอีก {Math.min(pageSize, results.length - limit)} บทเรียน</button>}
  </section>;
}
