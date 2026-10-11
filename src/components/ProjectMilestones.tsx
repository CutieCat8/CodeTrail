"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { BookOpen, Check, ChevronRight, ExternalLink } from "lucide-react";
import { friendsActivityMilestones, friendsActivityProjectId } from "@/content/projects";
import { lessonById } from "@/content/lessons";
import { learningSteps } from "@/content/curriculum";
import { recordActivity } from "@/lib/activity";
import { emptyMilestoneProgress, isMilestoneSubmitted, milestoneSubmissionError, projectBriefMarkdown, projectMilestoneSummary, safeEvidenceUrl, updateMilestone } from "@/lib/projects";
import type { AppData, ProjectMilestoneProgress } from "@/types/domain";

type Props = {
  data: AppData;
  setData: Dispatch<SetStateAction<AppData>>;
  openLesson: (id: string) => void;
  openStep: (id: string) => void;
};

export function ProjectMilestones({ data, setData, openLesson, openStep }: Props) {
  const project = data.projectProgress?.[friendsActivityProjectId];
  const summary = projectMilestoneSummary(project);
  const [selectedId, setSelectedId] = useState(() => summary.next?.id ?? friendsActivityMilestones[0].id);
  const [notice, setNotice] = useState("");
  const milestone = friendsActivityMilestones.find(item => item.id === selectedId) ?? friendsActivityMilestones[0];
  const saved = project?.milestones?.[milestone.id] ?? emptyMilestoneProgress();
  const submitted = isMilestoneSubmitted(milestone, saved);
  const evidenceLink = safeEvidenceUrl(saved.evidenceUrl);
  const index = friendsActivityMilestones.indexOf(milestone);
  const next = friendsActivityMilestones[index + 1];

  const patch = (change: Partial<Pick<ProjectMilestoneProgress, "checks" | "evidenceUrl" | "notes">>) => {
    setNotice("");
    setData(current => {
      const existing = current.projectProgress?.[friendsActivityProjectId];
      const progress = existing?.milestones?.[milestone.id] ?? emptyMilestoneProgress();
      return {
        ...current,
        projectProgress: {
          ...current.projectProgress,
          [friendsActivityProjectId]: {
            repositoryUrl: "", demoUrl: "", checklist: [], ...existing,
            updatedAt: new Date().toISOString(),
            milestones: { ...existing?.milestones, [milestone.id]: updateMilestone(progress, change) },
          },
        },
      };
    });
  };

  const submit = () => {
    const error = milestoneSubmissionError(milestone, saved);
    if (error) { setNotice(error); return; }
    if (submitted) return;
    const now = new Date().toISOString();
    setData(current => {
      const existing = current.projectProgress?.[friendsActivityProjectId];
      const progress = existing?.milestones?.[milestone.id] ?? emptyMilestoneProgress();
      if (milestoneSubmissionError(milestone, progress) || isMilestoneSubmitted(milestone, progress)) return current;
      const updated: AppData = {
        ...current,
        projectProgress: {
          ...current.projectProgress,
          [friendsActivityProjectId]: {
            repositoryUrl: "", demoUrl: "", checklist: [], ...existing,
            updatedAt: now,
            milestones: { ...existing?.milestones, [milestone.id]: { ...progress, updatedAt: now, submittedAt: now } },
          },
        },
      };
      return recordActivity(updated, "project-evidence", `${friendsActivityProjectId}/${milestone.id}`, now);
    });
    setNotice("บันทึกการส่งหลักฐานแล้ว — สถานะนี้คือผู้เรียนตรวจเอง");
  };

  const select = (id: string) => { setSelectedId(id); setNotice(""); };
  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([projectBriefMarkdown()], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "friends-activity-planner-brief.md";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <section className="project-milestones" aria-labelledby="project-milestones-title">
    <header className="milestones-heading">
      <div><span className="eyebrow">BUILD → TRY → COLLECT EVIDENCE</span><h3 id="project-milestones-title">เส้นทางสร้างโปรเจกต์ทีละขั้น</h3><p>เริ่มตามลำดับที่แนะนำ หรือเลือกกลับไปทำขั้นไหนก็ได้ ส่งหลักฐานเมื่อทดลองตามเกณฑ์แล้ว</p></div>
      <strong>{summary.submitted}/{summary.total}<small>milestones ที่ส่งหลักฐานแล้ว</small></strong>
    </header>
    <button className="secondary milestone-download" onClick={downloadBrief}>ดาวน์โหลดโจทย์โปรเจกต์ (.md)</button>
    <div className="milestone-layout">
      <nav className="milestone-list" aria-label="เลือก milestone">
        <ol>{friendsActivityMilestones.map((item, itemIndex) => {
          const progress = project?.milestones?.[item.id];
          const done = isMilestoneSubmitted(item, progress);
          const started = progress && (progress.evidenceUrl.trim() || progress.notes.trim() || Object.values(progress.checks).some(Boolean));
          return <li key={item.id}><button aria-pressed={item.id === milestone.id} onClick={() => select(item.id)}>
            <span className="milestone-number">{done ? <Check aria-hidden="true" /> : String(itemIndex + 1).padStart(2, "0")}</span>
            <span><strong>{item.title}</strong><small>{done ? "ส่งหลักฐานแล้ว · ตรวจเอง" : started ? "กำลังทำ" : "ยังไม่เริ่ม"}</small></span>
          </button></li>;
        })}</ol>
      </nav>
      <article className="milestone-workspace" aria-labelledby="milestone-title">
        <span className="eyebrow">MILESTONE {index + 1} / {summary.total}</span>
        <h4 id="milestone-title">{milestone.title}</h4><p>{milestone.objective}</p>
        <section><h5>ลงมือทำ</h5><ol>{milestone.tasks.map(task => <li key={task}>{task}</li>)}</ol></section>
        <section><h5>หลักฐานที่ควรแนบ</h5><ul>{milestone.artifacts.map(artifact => <li key={artifact}>{artifact}</li>)}</ul></section>
        <section className="milestone-learning"><h5>บทเรียนที่ช่วยทำขั้นนี้</h5>
          {milestone.lessonIds.map(id => { const lesson = lessonById(id); return lesson && <button key={id} onClick={() => openLesson(id)}><BookOpen aria-hidden="true" /><span>{lesson.title}<small>{lesson.track === "java" ? "Java · ทางเลือกฝึกในเครื่อง" : lesson.module}</small></span><ChevronRight aria-hidden="true" /></button>; })}
          {(milestone.topicIds ?? []).map(id => { const step = learningSteps.find(item => item.topicId === id && item.kind === "concept"); return step && <button key={id} onClick={() => openStep(step.id)}><BookOpen aria-hidden="true" /><span>{step.title}<small>Developer Foundations</small></span><ChevronRight aria-hidden="true" /></button>; })}
        </section>
        <section className="milestone-evidence"><h5>ตรวจและส่งหลักฐาน</h5>
          <div className="project-checklist">{milestone.criteria.map(criterion => <label key={criterion.id}>
            <input type="checkbox" checked={Boolean(saved.checks[criterion.id])} onChange={event => patch({ checks: { ...saved.checks, [criterion.id]: event.target.checked } })} />
            <span>{criterion.label}</span>
          </label>)}</div>
          <label htmlFor="milestone-evidence-url">ลิงก์หลักฐานของ milestone<input id="milestone-evidence-url" type="url" value={saved.evidenceUrl} onChange={event => patch({ evidenceUrl: event.target.value })} placeholder="https://github.com/.../commit/... หรือเอกสาร/วิดีโอ" aria-describedby="milestone-evidence-help" /></label>
          <p id="milestone-evidence-help">ใช้ลิงก์ commit, ไฟล์งาน, ผลทดสอบ หรือวิดีโอที่เปิดตรวจได้</p>
          {evidenceLink && <a className="milestone-evidence-link" href={evidenceLink} target="_blank" rel="noopener noreferrer">เปิดหลักฐาน <ExternalLink aria-hidden="true" /></a>}
          <label htmlFor="milestone-evidence-notes">สิ่งที่ทำและผลตรวจ<textarea id="milestone-evidence-notes" value={saved.notes} onChange={event => patch({ notes: event.target.value })} placeholder="ทำอะไร ทดลองอย่างไร ได้ผลอะไร และยังมีข้อจำกัดใด" /></label>
          <p className="milestone-reflection"><strong>ชวนคิด:</strong> {milestone.reflection}</p>
          <div className="milestone-actions"><button className="primary" onClick={submit} disabled={submitted}>{submitted ? "ส่งหลักฐานแล้ว" : "ส่งหลักฐาน milestone"}<Check aria-hidden="true" /></button>{next && <button className="secondary" onClick={() => select(next.id)}>ดูขั้นถัดไป<ChevronRight aria-hidden="true" /></button>}</div>
          {notice && <p role="status" className="milestone-notice">{notice}</p>}
          {submitted && <p className="milestone-submitted">ผู้เรียนตรวจเอง · ส่งเมื่อ {new Date(saved.submittedAt!).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}</p>}
          <p className="milestone-proof-note">CodeTrail เก็บลิงก์และคำอธิบายของคุณ การส่งนี้ยังไม่ใช่ผลตรวจโค้ดหรือการรับรองจากระบบ แก้หลักฐานแล้วต้องส่งใหม่</p>
        </section>
      </article>
    </div>
  </section>;
}
