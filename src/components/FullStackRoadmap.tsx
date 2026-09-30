"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, CircleDot, Clock, Compass, Flag, LocateFixed, LockKeyhole, RotateCcw, SkipForward, X } from "lucide-react";
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

  function renderNode(node: RoadmapNode) {
    const evidence = evidenceFor(node, data);
    const status = statusFor(node, data, evidence);
    const statusText = markOptions.find((option) => option.id === status)?.label ?? "ยังไม่เริ่ม";
    return (
      <button
        id={`rm-node-${node.id}`}
        key={node.id}
        className={`rm-map-node ${node.lane} ${status}${node.optional ? " optional" : ""}${node.id === selectedId ? " selected" : ""}${node.id === currentNode?.id ? " current" : ""}`}
        aria-label={`${node.title} — ${statusText}`}
        onClick={() => setSelectedId(node.id)}
      >
        <span className="rm-map-node-top"><small>{node.optional ? "SIDE QUEST" : laneLabels[node.lane]}</small><i aria-hidden="true"/></span>
        <strong>{node.title}</strong>
        <span className="rm-map-node-meta">
          <em>{statusText}</em>
          {evidence.total > 0 && <small>{evidence.done}/{evidence.total} หลักฐาน</small>}
        </span>
        {status === "done" && <Check className="rm-map-node-status" aria-hidden="true"/>}
        {status === "learning" && <Clock className="rm-map-node-status" aria-hidden="true"/>}
      </button>
    );
  }

  function stageProgress(stage: (typeof visibleStages)[number]) {
    const evidence = stage.nodes.map((node) => ({ node, evidence: evidenceFor(node, data) }));
    const done = evidence.filter(({ node, evidence: item }) => statusFor(node, data, item) === "done").length;
    return { done, total: stage.nodes.length };
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

      <main className="rm-map-shell">
        <header className="rm-map-heading">
          <div><Compass aria-hidden="true"/><span><small>ROUTE OVERVIEW</small><strong>เลือกด่านเพื่อดูเส้นทางด้านล่าง</strong></span></div>
          <div className="rm-map-legend" aria-label="คำอธิบายสถานะ"><span className="learning">กำลังเรียน</span><span className="done">ผ่านแล้ว</span><span className="optional">Side quest</span></div>
        </header>

        <nav className="rm-overview" aria-label="ภาพรวมเส้นทาง Full-stack">
          <div className="rm-overview-line" aria-hidden="true"/>
          {visibleStages.map((stage) => {
            const progress = stageProgress(stage);
            const hasCurrent = stage.nodes.some((node) => node.id === currentNode?.id);
            return <button key={stage.id} className={hasCurrent ? "current" : progress.done === progress.total ? "done" : ""} onClick={() => document.getElementById(`rm-stage-${stage.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              <span className="rm-overview-marker">{progress.done === progress.total ? <Check aria-hidden="true"/> : stage.number}</span>
              <strong>{stage.title}</strong>
              <small>{progress.done}/{progress.total} หัวข้อ</small>
            </button>;
          })}
        </nav>

        <div className="rm-map-route">
          <div className="rm-map-start"><CircleDot aria-hidden="true"/><span><small>START HERE</small><strong>Full-stack Explorer</strong></span></div>
          {visibleStages.map((stage) => {
            const progress = stageProgress(stage);
            const laneGroups = (Object.keys(laneLabels) as RoadmapLane[])
              .map((laneId) => ({ laneId, nodes: stage.nodes.filter((node) => node.lane === laneId) }))
              .filter((group) => group.nodes.length);
            return (
              <section id={`rm-stage-${stage.id}`} className="rm-map-stage" key={stage.id} aria-labelledby={`rm-stage-title-${stage.id}`}>
                <div className="rm-stage-brief">
                  <span className="rm-stage-number">{stage.number}</span>
                  <small>CHAPTER {stage.number}</small>
                  <h2 id={`rm-stage-title-${stage.id}`}>{stage.title}</h2>
                  <p>{stage.outcome}</p>
                  <div className="rm-stage-progress"><span><i style={{ width: `${progress.total ? progress.done / progress.total * 100 : 0}%` }}/></span><small>{progress.done}/{progress.total}</small></div>
                </div>
                <div className="rm-stage-network">
                  <span className="rm-network-entry" aria-hidden="true"/>
                  <div className="rm-lane-groups">
                    {laneGroups.map((group) => <section className={`rm-lane-group ${group.laneId}`} key={group.laneId} aria-label={laneLabels[group.laneId]}>
                      <header><i aria-hidden="true"/><span>{laneLabels[group.laneId]}</span><small>{group.nodes.length} ด่าน</small></header>
                      <div>{group.nodes.map(renderNode)}</div>
                    </section>)}
                  </div>
                  <div className="rm-map-checkpoint"><Flag aria-hidden="true"/><span><small>CHECKPOINT {stage.number}</small><strong>{stage.outcome}</strong></span></div>
                </div>
              </section>
            );
          })}
          <div className="rm-map-finish"><Flag aria-hidden="true"/><span><small>THE JOURNEY CONTINUES</small><strong>Build · Explain · Ship · Improve</strong></span></div>
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
