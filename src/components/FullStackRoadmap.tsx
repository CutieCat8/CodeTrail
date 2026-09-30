"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, CircleDot, Clock, LocateFixed, LockKeyhole, RotateCcw, SkipForward, X } from "lucide-react";
import { fullstackRoadmap, laneLabels, type RoadmapLane, type RoadmapNode } from "@/content/fullstack-roadmap";
import { learningSteps } from "@/content/curriculum";
import { lessons } from "@/content/lessons";
import type { AppData, RoadmapMark } from "@/types/domain";
import "./roadmap.css";

type Props = {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  openStep: (id: string) => void;
  openLesson: (id: string) => void;
};

type Evidence = ReturnType<typeof evidenceFor>;
type NodeStatus = RoadmapMark | "none";

const markOptions = [
  { id: "learning", label: "Learning", Icon: Clock },
  { id: "done", label: "Done", Icon: Check },
  { id: "skip", label: "Skip", Icon: SkipForward },
] as const satisfies readonly { id: RoadmapMark; label: string; Icon: typeof Clock }[];

function evidenceFor(node: RoadmapNode, data: AppData) {
  const steps = learningSteps.filter((step) => node.topicIds?.includes(step.topicId));
  const relatedLessons = lessons.filter((lesson) => node.lessonIds?.includes(lesson.id));
  const doneSteps = steps.filter((step) => data.stepProgress[step.id]?.completed).length;
  const doneLessons = relatedLessons.filter((lesson) => data.progress[lesson.id]?.status === "passed").length;
  const total = steps.length + relatedLessons.length;
  const done = doneSteps + doneLessons;
  const started = steps.some((step) => data.stepProgress[step.id]) || relatedLessons.some((lesson) => data.progress[lesson.id]);
  return { steps, relatedLessons, total, done, started } as const;
}

// A mark the user set by hand always wins; otherwise progress recorded in lessons/steps suggests one.
function statusFor(node: RoadmapNode, data: AppData, evidence: Evidence): NodeStatus {
  const manual = data.roadmapMarks?.[node.id];
  if (manual) return manual;
  if (evidence.total > 0 && evidence.done === evidence.total) return "done";
  if (evidence.started) return "learning";
  return "none";
}

// Alternate sides so each checkpoint fans out evenly around the central journey.
function partitionNodes(nodes: RoadmapNode[]) {
  const left: RoadmapNode[] = [];
  const right: RoadmapNode[] = [];
  nodes.forEach((node, index) => (index % 2 === 0 ? left : right).push(node));
  return { left, right };
}

export function FullStackRoadmap({ data, setData, openStep, openLesson }: Props) {
  const [lane, setLane] = useState<RoadmapLane | "all">("all");
  const [selectedId, setSelectedId] = useState<string>();
  const drawerRef = useRef<HTMLElement>(null);
  const allNodes = useMemo(() => fullstackRoadmap.flatMap((stage) => stage.nodes), []);
  const selected = allNodes.find((node) => node.id === selectedId);
  const selectedEvidence = selected ? evidenceFor(selected, data) : undefined;
  const selectedStatus = selected && selectedEvidence ? statusFor(selected, data, selectedEvidence) : "none";
  const visibleStages = fullstackRoadmap
    .map((stage) => ({ ...stage, nodes: stage.nodes.filter((node) => lane === "all" || node.lane === lane) }))
    .filter((stage) => stage.nodes.length);

  const counts = { done: 0, learning: 0, skip: 0 };
  for (const node of allNodes) {
    const status = statusFor(node, data, evidenceFor(node, data));
    if (status !== "none") counts[status] += 1;
  }
  const settled = counts.done + counts.skip;
  const currentNode = allNodes.find((node) => statusFor(node, data, evidenceFor(node, data)) === "learning")
    ?? allNodes.find((node) => evidenceFor(node, data).started)
    ?? allNodes.find((node) => evidenceFor(node, data).total > 0);

  const closeDrawer = useCallback(() => {
    const previousId = selectedId;
    setSelectedId(undefined);
    if (previousId) requestAnimationFrame(() => document.getElementById(`rm-node-${previousId}`)?.focus());
  }, [selectedId]);

  useEffect(() => {
    function handleDrawerKeys(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
      if (event.key !== "Tab" || !selectedId) return;
      const controls = [...(drawerRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? [])];
      if (!controls.length) return;
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    window.addEventListener("keydown", handleDrawerKeys);
    return () => window.removeEventListener("keydown", handleDrawerKeys);
  }, [selectedId, closeDrawer]);

  useEffect(() => {
    if (!selectedId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedId]);

  function setMark(nodeId: string, mark: RoadmapMark | undefined) {
    setData((current) => {
      const roadmapMarks = { ...current.roadmapMarks };
      if (mark) roadmapMarks[nodeId] = mark;
      else delete roadmapMarks[nodeId];
      return { ...current, roadmapMarks };
    });
  }

  function startNode(node: RoadmapNode) {
    const evidence = evidenceFor(node, data);
    const nextStep = evidence.steps.find((step) => !data.stepProgress[step.id]?.completed) ?? evidence.steps[0];
    if (nextStep) return openStep(nextStep.id);
    const nextLesson = evidence.relatedLessons.find((lesson) => data.progress[lesson.id]?.status !== "passed") ?? evidence.relatedLessons[0];
    if (nextLesson) openLesson(nextLesson.id);
  }

  function renderNode(node: RoadmapNode, side: "left" | "right") {
    const status = statusFor(node, data, evidenceFor(node, data));
    const statusText = markOptions.find((option) => option.id === status)?.label ?? "ยังไม่เริ่ม";
    return (
      <button
        id={`rm-node-${node.id}`}
        key={node.id}
        className={`rm-node ${node.lane} ${status} ${side}${node.optional ? " optional" : ""}${node.id === selectedId ? " selected" : ""}${node.id === currentNode?.id ? " current" : ""}`}
        aria-label={`${node.title} — ${statusText}`}
        onClick={() => setSelectedId(node.id)}
      >
        <span className="rm-node-title">{node.title}</span>
        {status === "done" && <Check aria-hidden="true"/>}
        {status === "learning" && <Clock aria-hidden="true"/>}
      </button>
    );
  }

  return (
    <div className="page rm-page">
      <header className="rm-hero">
        <div>
          <span className="eyebrow">SEA’S PERSONAL FULL-STACK ROUTE</span>
          <h1>Full-stack Developer Roadmap</h1>
          <p>ไล่ตามเส้นหลักทีละด่าน แล้วแตกแขนงไปฝึก Front-end, Back-end, Database และ Java คลิกหัวข้อเพื่อทำเครื่องหมาย Learning / Done / Skip</p>
        </div>
        <div className="rm-stats" aria-label="สรุปความคืบหน้า roadmap">
          <span><strong>{counts.done}</strong><small>Done</small></span>
          <span><strong>{counts.learning}</strong><small>Learning</small></span>
          <span><strong>{counts.skip}</strong><small>Skip</small></span>
          <span><strong>{settled}/{allNodes.length}</strong><small>ทั้งหมด</small></span>
        </div>
      </header>

      <div className="rm-filters" aria-label="กรองสายทักษะ">
        <div><button aria-pressed={lane === "all"} onClick={() => setLane("all")}>ภาพรวม</button>
          {(Object.keys(laneLabels) as RoadmapLane[]).map((key) => <button key={key} aria-pressed={lane === key} onClick={() => setLane(key)}>{laneLabels[key]}</button>)}</div>
        <button className="rm-current-button" disabled={!currentNode} onClick={() => { setLane("all"); requestAnimationFrame(() => document.getElementById(`rm-node-${currentNode?.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })); }}><LocateFixed/>กลับไปตำแหน่งปัจจุบัน</button>
      </div>

      <main className="rm-canvas">
        <div className="rm-legend" aria-label="คำอธิบายสี">
          <span><i className="rm-swatch topic"/>ด่านหลัก</span>
          <span><i className="rm-swatch sub"/>หัวข้อที่ต้องรู้</span>
          <span><i className="rm-swatch check"/>Checkpoint · โปรเจกต์ฝึก</span>
          <span><i className="rm-swatch optional"/>เลือกเรียน</span>
        </div>
        <div className="rm-journey">
          <div className="rm-pill"><CircleDot aria-hidden="true"/>Full Stack</div>
          {visibleStages.map((stage) => {
            const { left, right } = partitionNodes(stage.nodes);
            return (
              <section className="rm-stage" key={stage.id} aria-labelledby={`rm-stage-${stage.id}`}>
                <div className="rm-topic"><span>{stage.number}</span><h2 id={`rm-stage-${stage.id}`}>{stage.title}</h2></div>
                <div className="rm-branches">
                  <div className="rm-column left">{left.map((node) => renderNode(node, "left"))}</div>
                  <div className="rm-column right">{right.map((node) => renderNode(node, "right"))}</div>
                </div>
                <div className="rm-checkpoint"><strong>Checkpoint · {stage.number}</strong><span>{stage.outcome}</span></div>
              </section>
            );
          })}
          <div className="rm-pill rm-finish"><Check aria-hidden="true"/>Build · Explain · Ship · Improve</div>
        </div>
      </main>

      {selected && selectedEvidence && <>
        <button className="rm-backdrop" aria-label="ปิดรายละเอียดหัวข้อ" onClick={closeDrawer}/>
        <aside ref={drawerRef} className="rm-drawer" role="dialog" aria-modal="true" aria-labelledby="rm-drawer-title">
          <button autoFocus className="rm-drawer-close" onClick={closeDrawer} aria-label="ปิดรายละเอียด"><X/></button>
          <span className="rm-drawer-lane">{laneLabels[selected.lane]}{selected.optional ? " · เลือกเรียน" : " · เส้นทางหลัก"}</span>
          <h2 id="rm-drawer-title">{selected.title}</h2>
          <p className="rm-drawer-description">{selected.description}</p>

          <div className="rm-marks" role="group" aria-label="สถานะหัวข้อ">
            {markOptions.map(({ id, label, Icon }) => (
              <button key={id} className={id} aria-pressed={data.roadmapMarks?.[selected.id] === id} onClick={() => setMark(selected.id, data.roadmapMarks?.[selected.id] === id ? undefined : id)}>
                <Icon aria-hidden="true"/>{label}
              </button>
            ))}
          </div>
          {data.roadmapMarks?.[selected.id]
            ? <button className="rm-reset" onClick={() => setMark(selected.id, undefined)}><RotateCcw aria-hidden="true"/>ล้างเครื่องหมาย</button>
            : selectedStatus !== "none" && <p className="rm-auto">สถานะ {selectedStatus === "done" ? "Done" : "Learning"} มาจากความคืบหน้าในบทเรียนที่บันทึกไว้ กดปุ่มด้านบนเพื่อกำหนดเอง</p>}

          <section><span>WHY IT MATTERS</span><h3>ทำไมต้องเรียน</h3><p>{selected.why}</p></section>
          <section><span>PROOF OF WORK</span><h3>เมื่อเข้าใจแล้วควรทำอะไรได้</h3><p>{selected.evidence}</p></section>
          {selectedEvidence.total > 0
            ? <button className="rm-drawer-action" onClick={() => startNode(selected)}>
                {selectedEvidence.done === selectedEvidence.total ? "กลับไปทบทวน" : selectedEvidence.started ? "เรียนต่อจากหลักฐานล่าสุด" : "เริ่มหัวข้อนี้"}
                <small>{selectedEvidence.done}/{selectedEvidence.total} หลักฐาน</small><ArrowRight/>
              </button>
            : <div className="rm-drawer-planned"><LockKeyhole/><div><strong>ยังไม่มีบทเรียนให้เริ่ม</strong><p>ยังทำเครื่องหมายสถานะเองได้ เมื่อเนื้อหาพร้อมจะมีปุ่มเริ่มเรียนที่นี่</p></div></div>}
        </aside>
      </>}
    </div>
  );
}
