"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, CircleDot, Code2, Database, GitBranch, LockKeyhole, Route, Server, ShieldCheck, X } from "lucide-react";
import { fullstackRoadmap, laneLabels, type RoadmapLane, type RoadmapNode } from "@/content/fullstack-roadmap";
import { learningSteps } from "@/content/curriculum";
import { lessons } from "@/content/lessons";
import type { AppData } from "@/types/domain";

type Props = {
  data: AppData;
  openStep: (id: string) => void;
  openLesson: (id: string) => void;
};

type NodeEvidence = ReturnType<typeof evidenceFor>;

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

function statusLabel(evidence: NodeEvidence) {
  if (evidence.status === "passed") return "ผ่านครบ";
  if (evidence.status === "active") return "กำลังทำ";
  if (evidence.status === "ready") return "พร้อมเรียน";
  return "วางแผนไว้";
}

function partitionNodes(nodes: RoadmapNode[]) {
  const left: RoadmapNode[] = [];
  const right: RoadmapNode[] = [];
  for (const node of nodes) {
    if (node.lane === "frontend" || node.lane === "data") left.push(node);
    else if (node.lane === "backend" || node.lane === "quality" || node.lane === "java") right.push(node);
    else (left.length <= right.length ? left : right).push(node);
  }
  return { left, right };
}

export function FullStackRoadmap({ data, openStep, openLesson }: Props) {
  const [lane, setLane] = useState<RoadmapLane | "all">("all");
  const [selectedId, setSelectedId] = useState<string>();
  const allNodes = useMemo(() => fullstackRoadmap.flatMap((stage) => stage.nodes), []);
  const selected = allNodes.find((node) => node.id === selectedId);
  const selectedEvidence = selected ? evidenceFor(selected, data) : undefined;
  const visibleStages = fullstackRoadmap
    .map((stage) => ({ ...stage, nodes: stage.nodes.filter((node) => lane === "all" || node.lane === lane) }))
    .filter((stage) => stage.nodes.length);
  const passed = allNodes.filter((node) => evidenceFor(node, data).status === "passed").length;
  const active = allNodes.filter((node) => evidenceFor(node, data).status === "active").length;
  const available = allNodes.filter((node) => evidenceFor(node, data).total > 0).length;

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(undefined);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedId]);

  function startNode(node: RoadmapNode) {
    const evidence = evidenceFor(node, data);
    const nextStep = evidence.steps.find((step) => !data.stepProgress[step.id]?.completed) ?? evidence.steps[0];
    if (nextStep) return openStep(nextStep.id);
    const nextLesson = evidence.relatedLessons.find((lesson) => data.progress[lesson.id]?.status !== "passed") ?? evidence.relatedLessons[0];
    if (nextLesson) openLesson(nextLesson.id);
  }

  function renderNode(node: RoadmapNode, side: "left" | "right") {
    const Icon = laneIcons[node.lane];
    const evidence = evidenceFor(node, data);
    return (
      <button key={node.id} className={`quest-map-node ${node.lane} ${evidence.status} ${side}`} aria-label={`${node.title} — ${statusLabel(evidence)}`} onClick={() => setSelectedId(node.id)}>
        <span className="quest-node-topline">
          <span className="quest-node-lane"><Icon aria-hidden="true"/>{laneLabels[node.lane]}</span>
          <span className="quest-node-status">{evidence.status === "passed" && <Check aria-hidden="true"/>}{statusLabel(evidence)}</span>
        </span>
        <strong>{node.title}</strong>
        <span className="quest-node-description">{node.description}</span>
        <span className="quest-node-foot">
          <span>{node.optional ? "เลือกเรียน" : "เส้นทางหลัก"}</span>
          <span>{evidence.total ? `${evidence.done}/${evidence.total} หลักฐาน` : "รอเนื้อหาเต็ม"}</span>
        </span>
        {evidence.total > 0 && <span className="quest-node-progress" aria-hidden="true"><i style={{ width: `${evidence.done / evidence.total * 100}%` }}/></span>}
      </button>
    );
  }

  return (
    <div className="page quest-map-page">
      <header className="quest-map-hero">
        <div>
          <span className="eyebrow">SEA’S PERSONAL FULL-STACK ROUTE</span>
          <h1>จากศูนย์ สู่การส่งระบบจริง</h1>
          <p>ไล่ตามแกนกลางทีละด่าน แล้วแตกแขนงไปฝึก Front-end, Back-end, Database และ Java ทุกสถานะอิงจากงานที่ซีบันทึกจริง</p>
        </div>
        <div className="quest-map-stats" aria-label="สรุปความคืบหน้า roadmap">
          <span><strong>{passed}</strong><small>ผ่านครบ</small></span>
          <span><strong>{active}</strong><small>กำลังสำรวจ</small></span>
          <span><strong>{available}</strong><small>มีบทเรียนแล้ว</small></span>
        </div>
      </header>

      <div className="quest-map-toolbar">
        <div className="quest-map-filters" aria-label="กรองสายทักษะ">
          <button aria-pressed={lane === "all"} onClick={() => setLane("all")}>ภาพรวม</button>
          {(Object.keys(laneLabels) as RoadmapLane[]).map((key) => <button key={key} aria-pressed={lane === key} onClick={() => setLane(key)}>{laneLabels[key]}</button>)}
        </div>
        <div className="quest-map-key" aria-label="คำอธิบายสถานะ"><span className="ready"/>พร้อมเรียน <span className="active"/>กำลังทำ <span className="passed"/>ผ่านครบ <span className="planned"/>วางแผนไว้</div>
      </div>

      <main className="quest-map-journey">
        <div className="quest-map-start"><CircleDot aria-hidden="true"/><span>START HERE</span></div>
        {visibleStages.map((stage, stageIndex) => {
          const { left, right } = partitionNodes(stage.nodes);
          return (
            <section className="quest-map-stage" key={stage.id} aria-labelledby={`quest-stage-${stage.id}`}>
              <div className="quest-map-stage-heading">
                <span className="quest-stage-number">{stage.number}</span>
                <div><span>CHECKPOINT {stage.number}</span><h2 id={`quest-stage-${stage.id}`}>{stage.title}</h2><p>{stage.outcome}</p></div>
              </div>
              <div className="quest-map-branches">
                <div className="quest-map-column left">{left.map((node) => renderNode(node, "left"))}</div>
                <div className="quest-map-spine"><i/><span>{stage.nodes.length}</span><i/></div>
                <div className="quest-map-column right">{right.map((node) => renderNode(node, "right"))}</div>
              </div>
              {stageIndex < visibleStages.length - 1 && <div className="quest-map-next" aria-hidden="true"><ArrowDown/></div>}
            </section>
          );
        })}
        <div className="quest-map-finish"><Check aria-hidden="true"/><span>BUILD · EXPLAIN · SHIP · IMPROVE</span></div>
      </main>

      {selected && selectedEvidence && <>
        <button className="quest-drawer-backdrop" aria-label="ปิดรายละเอียดหัวข้อ" onClick={() => setSelectedId(undefined)}/>
        <aside className={`quest-map-drawer ${selected.lane}`} role="dialog" aria-modal="true" aria-labelledby="quest-drawer-title">
          <button autoFocus className="quest-drawer-close" onClick={() => setSelectedId(undefined)} aria-label="ปิดรายละเอียด"><X/></button>
          <span className="quest-drawer-lane">{laneLabels[selected.lane]}{selected.optional ? " · เลือกเรียน" : " · เส้นทางหลัก"}</span>
          <h2 id="quest-drawer-title">{selected.title}</h2>
          <p className="quest-drawer-description">{selected.description}</p>
          <div className={`quest-drawer-status ${selectedEvidence.status}`}><CircleDot/>{statusLabel(selectedEvidence)}{selectedEvidence.total > 0 && <span>{selectedEvidence.done}/{selectedEvidence.total} หลักฐาน</span>}</div>
          <section><span>WHY IT MATTERS</span><h3>ทำไมต้องเรียน</h3><p>{selected.why}</p></section>
          <section><span>PROOF OF WORK</span><h3>เมื่อเข้าใจแล้วควรทำอะไรได้</h3><p>{selected.evidence}</p></section>
          {selectedEvidence.total > 0
            ? <button className="primary quest-drawer-action" onClick={() => startNode(selected)}>{selectedEvidence.status === "passed" ? "กลับไปทบทวน" : selectedEvidence.status === "active" ? "เรียนต่อจากหลักฐานล่าสุด" : "เริ่มหัวข้อนี้"}<ArrowRight/></button>
            : <div className="quest-drawer-planned"><LockKeyhole/><div><strong>ยังไม่เปิดให้เริ่ม</strong><p>จะแสดงในแผนที่เพื่อเห็นภาพรวม แต่จะไม่มีหน้าว่างจนกว่าเนื้อหาและ feedback พร้อมจริง</p></div></div>}
          <p className="quest-drawer-note">Roadmap เป็นเข็มทิศ ไม่ใช่รายการที่ต้องรีบติ๊กทุกช่อง ใช้โปรเจกต์จริงบอกว่าควรย้อนเสริมพื้นฐานตรงไหน</p>
        </aside>
      </>}
    </div>
  );
}
