"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, CircleDot, Code2, Database, GitBranch, LockKeyhole, Route, Server, ShieldCheck } from "lucide-react";
import { fullstackRoadmap, laneLabels, type RoadmapLane, type RoadmapNode } from "@/content/fullstack-roadmap";
import { learningSteps } from "@/content/curriculum";
import { lessons } from "@/content/lessons";
import type { AppData } from "@/types/domain";

type Props = {
  data: AppData;
  openStep: (id: string) => void;
  openLesson: (id: string) => void;
};

const laneIcons = {
  core: Route,
  frontend: Code2,
  backend: Server,
  data: Database,
  quality: ShieldCheck,
  java: GitBranch,
} satisfies Record<RoadmapLane, typeof Route>;

function evidenceFor(node: RoadmapNode, data: AppData) {
  const steps = learningSteps.filter((step) => node.topicIds?.includes(step.topicId));
  const relatedLessons = lessons.filter((lesson) => node.lessonIds?.includes(lesson.id));
  const doneSteps = steps.filter((step) => data.stepProgress[step.id]?.completed).length;
  const doneLessons = relatedLessons.filter((lesson) => data.progress[lesson.id]?.status === "passed").length;
  const total = steps.length + relatedLessons.length;
  const done = doneSteps + doneLessons;
  const started = steps.some((step) => data.stepProgress[step.id]) || relatedLessons.some((lesson) => data.progress[lesson.id]);
  const status = total === 0 ? "planned" : done === total ? "passed" : started ? "active" : "ready";
  return { steps, relatedLessons, total, done, status } as const;
}

export function FullStackRoadmap({ data, openStep, openLesson }: Props) {
  const [lane, setLane] = useState<RoadmapLane | "all">("all");
  const [selectedId, setSelectedId] = useState(fullstackRoadmap[0].nodes[0].id);
  const allNodes = useMemo(() => fullstackRoadmap.flatMap((stage) => stage.nodes), []);
  const selected = allNodes.find((node) => node.id === selectedId) ?? allNodes[0];
  const selectedEvidence = evidenceFor(selected, data);
  const visibleStages = fullstackRoadmap
    .map((stage) => ({ ...stage, nodes: stage.nodes.filter((node) => lane === "all" || node.lane === lane) }))
    .filter((stage) => stage.nodes.length);
  const passed = allNodes.filter((node) => evidenceFor(node, data).status === "passed").length;
  const active = allNodes.filter((node) => evidenceFor(node, data).status === "active").length;
  const available = allNodes.filter((node) => evidenceFor(node, data).total > 0).length;

  function startNode(node: RoadmapNode) {
    const evidence = evidenceFor(node, data);
    const nextStep = evidence.steps.find((step) => !data.stepProgress[step.id]?.completed) ?? evidence.steps[0];
    if (nextStep) return openStep(nextStep.id);
    const nextLesson = evidence.relatedLessons.find((lesson) => data.progress[lesson.id]?.status !== "passed") ?? evidence.relatedLessons[0];
    if (nextLesson) openLesson(nextLesson.id);
  }

  return (
    <div className="page roadmap-page">
      <div className="page-heading roadmap-heading">
        <div>
          <span className="eyebrow">SEA’S PERSONAL FULL-STACK ROUTE</span>
          <h1>Roadmap จากพื้นฐานถึงส่งระบบจริง</h1>
          <p>แผนภาพนี้ตอบว่า “ต้องเรียนอะไร ก่อน–หลัง และเพราะอะไร” ส่วนคอร์สและ Lab คือพื้นที่ลงมือทำ สถานะทุก node มาจากหลักฐานที่บันทึกจริง</p>
        </div>
        <div className="roadmap-summary" aria-label="สรุปความคืบหน้า roadmap">
          <span><strong>{passed}</strong> ผ่านครบ</span>
          <span><strong>{active}</strong> กำลังสำรวจ</span>
          <span><strong>{available}</strong> มีบทเรียนแล้ว</span>
        </div>
      </div>

      <div className="roadmap-legend">
        <div className="segmented" aria-label="กรองสายทักษะ">
          <button aria-pressed={lane === "all"} onClick={() => setLane("all")}>ทั้งหมด</button>
          {(Object.keys(laneLabels) as RoadmapLane[]).map((key) => <button key={key} aria-pressed={lane === key} onClick={() => setLane(key)}>{laneLabels[key]}</button>)}
        </div>
        <p><i className="legend-dot ready"/>พร้อมเรียน <i className="legend-dot active"/>กำลังทำ <i className="legend-dot passed"/>ผ่านครบ <i className="legend-dot planned"/>วางแผนไว้</p>
      </div>

      <div className="roadmap-layout">
        <div className="roadmap-track">
          {visibleStages.map((stage) => (
            <section className="roadmap-stage" key={stage.id} aria-labelledby={`stage-${stage.id}`}>
              <header>
                <span>{stage.number}</span>
                <div><h2 id={`stage-${stage.id}`}>{stage.title}</h2><p>{stage.outcome}</p></div>
              </header>
              <div className="roadmap-node-grid">
                {stage.nodes.map((node) => {
                  const Icon = laneIcons[node.lane];
                  const evidence = evidenceFor(node, data);
                  return <button key={node.id} className={`roadmap-node ${node.lane} ${evidence.status} ${selected.id === node.id ? "selected" : ""}`} aria-pressed={selected.id === node.id} onClick={() => setSelectedId(node.id)}>
                    <span className="roadmap-node-icon">{evidence.status === "passed" ? <Check/> : evidence.status === "planned" ? <LockKeyhole/> : <Icon/>}</span>
                    <span><small>{laneLabels[node.lane]}{node.optional ? " · เลือกเรียน" : ""}</small><strong>{node.title}</strong><em>{evidence.total ? `${evidence.done}/${evidence.total} หลักฐาน` : "วางแผนไว้"}</em></span>
                    <ArrowRight aria-hidden="true"/>
                  </button>;
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className={`roadmap-inspector ${selected.lane}`} aria-live="polite">
          <div className="inspector-kicker"><CircleDot/> {laneLabels[selected.lane]}</div>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <dl>
            <div><dt>ทำไมต้องเรียน</dt><dd>{selected.why}</dd></div>
            <div><dt>หลักฐานที่ควรทำได้</dt><dd>{selected.evidence}</dd></div>
            <div><dt>สถานะ</dt><dd>{selectedEvidence.status === "passed" ? "ผ่านหลักฐานครบแล้ว" : selectedEvidence.status === "active" ? `กำลังทำ · ${selectedEvidence.done}/${selectedEvidence.total}` : selectedEvidence.status === "ready" ? `พร้อมเรียน · ${selectedEvidence.total} หลักฐาน` : "วางแผนไว้—ยังไม่มีปุ่มเริ่ม"}</dd></div>
          </dl>
          {selectedEvidence.total > 0 ? <button className="primary inspector-action" onClick={() => startNode(selected)}>{selectedEvidence.status === "passed" ? "กลับไปทบทวน" : selectedEvidence.status === "active" ? "เรียนต่อ" : "เริ่มหัวข้อนี้"}<ArrowRight/></button> : <div className="inspector-planned"><LockKeyhole/><span>หัวข้อนี้แสดงให้เห็นภาพรวม แต่จะยังเปิดไม่ได้จนกว่าเนื้อหาและ feedback พร้อมจริง</span></div>}
          <p className="roadmap-note">Roadmap ไม่ใช่ checklist ที่ต้องรีบติ๊กทุกช่อง เลือกแกนหลักก่อน แล้วใช้โปรเจกต์เป็นตัวบอกว่าควรย้อนเติมพื้นฐานตรงไหน</p>
        </aside>
      </div>
    </div>
  );
}
