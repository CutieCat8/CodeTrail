"use client";

import { lessons } from "@/content/lessons";
import { friendsActivityProjectId } from "@/content/projects";
import { learningRouteSummary } from "@/lib/learning-route";
import { projectMilestoneSummary } from "@/lib/projects";
import type { AppData } from "@/types/domain";

export function RouteCompletion({ data, openStep, openProjects }: { data: AppData; openStep: (id: string) => void; openProjects: () => void }) {
  const summary = learningRouteSummary(data);
  const labs = lessons.filter(lesson => data.mode === "mixed" || lesson.track === (data.mode === "java" ? "java" : "web"));
  const passed = labs.filter(lesson => data.progress[lesson.id]?.status === "passed").length;
  const project = projectMilestoneSummary(data.projectProgress?.[friendsActivityProjectId]);
  return <section className="route-completion" aria-labelledby="route-completion-title">
    <span className="eyebrow">LEARNING PATH SUMMARY</span>
    <h1 id="route-completion-title">เรียนครบขั้นที่เปิดแล้วในเส้นทางนี้</h1>
    <p>บันทึกครบ {summary.completed}/{summary.total} ขั้นในโหมด {data.mode === "java" ? "Java & OOP" : data.mode === "fullstack" ? "Full-stack" : "ผสมสองเส้นทาง"} การบันทึกจบขั้นเป็นความคืบหน้าที่ผู้เรียนยืนยัน ไม่ใช่การรับรองความชำนาญ และไม่นับคอร์สที่ยังวางแผนไว้</p>
    <dl><div><dt>Labs ผ่านเงื่อนไขล่าสุด</dt><dd>{passed}/{labs.length}</dd></div><div><dt>บันทึก Journal</dt><dd>{data.journal.length}</dd></div><div><dt>Planner milestones · ตรวจเอง</dt><dd>{project.submitted}/{project.total}</dd></div></dl>
    <h2>เลือกทบทวนหรือฝึกต่อ</h2>
    <p>เปิด checkpoint เพื่ออธิบายด้วยตัวเอง หรือต่อยอดด้วย Lab และโปรเจกต์ ความคืบหน้าและ XP เดิมยังอยู่</p>
    <ul>{summary.courses.map(item => <li key={item.course.id}><span>{item.course.title} · {item.completed}/{item.steps.length} ขั้น</span><button className="home-quiet-action" onClick={() => openStep(item.reviewStep.id)}>ทบทวน {item.course.title}</button></li>)}</ul>
    <div className="button-row"><a className="home-quiet-action" href="#map">ไปฝึกใน Lab</a><button className="primary" onClick={openProjects}>ไปต่อยอดโปรเจกต์</button></div>
  </section>;
}
