"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, BookOpen, Braces, Check, ChevronLeft, ChevronRight, CircleDot, Clock3, Code2, Copy, Download, FlaskConical, FolderGit2, Gauge, Layers3, LayoutDashboard, LockKeyhole, Map, Maximize2, Menu, Minimize2, NotebookPen, Play, Route, Search, Settings, ShieldCheck, Sparkles, Target, Trophy, Upload, X } from "lucide-react";
import { lessons, lessonById, plannedJava } from "@/content/lessons";
import { curriculumCourses, learningSteps, stepById } from "@/content/curriculum";
import { accessReason, recommendation, stepRecommendation } from "@/lib/recommendation";
import { calculateStreak, emptyData, isAppData, loadData, newProgress, saveData, xpTotal } from "@/lib/storage";
import { runIsolatedTests } from "@/lib/runner";
import type { AppData, JournalEntry, Lesson, LessonProgress, StudyMode } from "@/types/domain";
import { PixelCat } from "./PixelCat";
import { FullStackRoadmap } from "./FullStackRoadmap";
import { ExpeditionBase, WorldLandmark } from "./ExpeditionArt";

type View = "dashboard" | "curriculum" | "roadmap" | "map" | "challenges" | "skills" | "journal" | "projects" | "settings" | "lesson" | "step";
type SaveState = "idle" | "saving" | "saved" | "error";
type NavView = Exclude<View, "lesson" | "step">;
type NavItem = readonly [NavView, string, typeof LayoutDashboard];

const navGroups: readonly { label: string; items: readonly NavItem[] }[] = [
  { label: "เริ่มต้น", items: [["dashboard", "ฐานปฏิบัติการ", LayoutDashboard]] },
  { label: "เรียน", items: [["curriculum", "คอร์ส", Layers3], ["roadmap", "Roadmap", Route], ["map", "Lab", Map], ["challenges", "คลังโจทย์", FlaskConical]] },
  { label: "ผลงาน", items: [["skills", "หลักฐานทักษะ", Gauge], ["journal", "สมุดบันทึก", NotebookPen], ["projects", "โปรเจกต์", FolderGit2]] },
];
const settingsNav: NavItem = ["settings", "ตั้งค่า", Settings];
const nav: readonly NavItem[] = [...navGroups.flatMap((group) => group.items), settingsNav];

const modules = [
  ["Developer Foundations", "web", "Git, terminal และการคิดเป็นระบบ"],
  ["Java Foundations", "java", "JDK, syntax, control flow, methods และ collections"],
  ["Java OOP Lab", "java", "class, object, encapsulation และ composition"],
  ["TypeScript Workshop", "web", "types, unions, narrowing และ async/await"],
  ["React & Next.js Front-end", "web", "components, forms และ App Router"],
  ["Node.js & Express Back-end", "web", "REST API, validation และ error handling"],
  ["PostgreSQL & Data Modeling", "web", "constraints, JOIN และ transactions"],
  ["Full-stack Integration", "web", "เชื่อม UI, API, database และ testing"],
  ["Authentication & Reliability", "web", "วางแผนไว้: auth, authorization และ observability"],
  ["Portfolio Projects", "web", "สะสมหลักฐานการตัดสินใจและผลงาน"],
] as const;

const skills = [
  ["typescript", "TypeScript", "web"], ["react", "React state และ forms", "web"], ["nextjs", "Next.js rendering และ data fetching", "web"],
  ["api", "REST API", "web"], ["validation", "Validation และ error handling", "web"], ["database", "SQL และ relational modeling", "web"],
  ["auth", "Authentication", "web"], ["testing", "Testing", "web"], ["integration", "Integration", "web"],
  ["java-syntax", "Java syntax และ control flow", "java"], ["java-methods", "Methods และ collections", "java"],
  ["java-oop", "Class, object และ constructors", "java"], ["java-encapsulation", "Encapsulation และการตรวจสถานะของ object", "java"],
  ["java-composition", "Composition และการแบ่งความรับผิดชอบ", "java"], ["java-inheritance", "Inheritance และ polymorphism", "java"],
  ["java-interface", "Interfaces และ abstract classes", "java"], ["java-exceptions", "Exception handling", "java"], ["java-testing", "Java unit testing", "java"],
] as const;

function useQuestData() {
  const [data, setData] = useState<AppData>(emptyData);
  const [ready, setReady] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const timer = useRef<number | null>(null);
  useEffect(() => { queueMicrotask(() => { setData(loadData()); setReady(true); }); }, []);
  useEffect(() => {
    if (!ready) return;
    queueMicrotask(() => setSaveState("saving"));
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try { saveData(data); setSaveState("saved"); }
      catch { setSaveState("error"); }
    }, 650);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [data, ready]);
  return { data, setData, ready, saveState };
}

export function QuestApp() {
  const { data, setData, ready, saveState } = useQuestData();
  const [view, setView] = useState<View>("dashboard");
  const [activeLessonId, setActiveLessonId] = useState("web-ts-narrowing");
  const [activeStepId, setActiveStepId] = useState(learningSteps[0]?.id ?? "");
  const [mobileNav, setMobileNav] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const hadOpenNav = useRef(false);
  const xpMap = useMemo(() => Object.fromEntries(lessons.map((l) => [l.id, l.xp])), []);
  useEffect(() => {
    const restoreRoute = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("lesson/")) {
        const id = hash.slice(7);
        if (lessonById(id)) { setActiveLessonId(id); setView("lesson"); }
      } else if (hash.startsWith("step/")) {
        const id = hash.slice(5);
        if (stepById(id)) { setActiveStepId(id); setView("step"); }
      } else if (nav.some(([id]) => id === hash)) setView(hash as View);
    };
    restoreRoute(); window.addEventListener("hashchange", restoreRoute);
    return () => window.removeEventListener("hashchange", restoreRoute);
  }, []);
  useEffect(() => {
    if (!mobileNav) {
      if (hadOpenNav.current) menuButtonRef.current?.focus();
      hadOpenNav.current = false;
      return;
    }
    hadOpenNav.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => sidebarRef.current?.querySelector<HTMLElement>("button")?.focus());
    const handleDrawerKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNav(false);
      if (event.key !== "Tab") return;
      const controls = [...(sidebarRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? [])];
      if (!controls.length) return;
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleDrawerKeys);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleDrawerKeys); };
  }, [mobileNav]);
  const goView = (next: View) => { setView(next); setMobileNav(false); window.history.pushState(null, "", `#${next}`); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openLesson = (id: string) => { setActiveLessonId(id); setView("lesson"); setMobileNav(false); window.history.pushState(null, "", `#lesson/${id}`); setData((d) => ({ ...d, lastLessonId: id })); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openStep = (id: string) => { setActiveStepId(id); setView("step"); setMobileNav(false); window.history.pushState(null, "", `#step/${id}`); setData((d) => ({ ...d, lastStepId: id })); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (!ready) return <div className="loading-screen"><PixelCat /><p>กำลังเปิดสมุดภารกิจของซี…</p></div>;
  const completed = Object.values(data.progress).filter((p) => p.status === "passed").length;
  const rec = recommendation(data);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a>
      {mobileNav && <button className="nav-backdrop" aria-label="ปิดเมนู" onClick={() => setMobileNav(false)} />}
      <aside ref={sidebarRef} className={`sidebar ${mobileNav ? "open" : ""}`} aria-label="เมนูแอป">
        <div className="brand"><PixelCat small decorative /><div><strong>SEA’S QUEST</strong><span>FULL-STACK FIELD LOG</span></div><button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="ปิดเมนู"><X /></button></div>
        <div className="sidebar-progress"><span><Trophy size={15} aria-hidden="true" /> EXPEDITION LEVEL</span><strong>{xpTotal(data, xpMap)} XP</strong><small>{completed}/{lessons.length} บท Lab ผ่านแล้ว</small></div>
        <nav aria-label="เมนูหลัก">
          {navGroups.map((group) => <section key={group.label}><span>{group.label}</span>{group.items.map(([id, label, Icon]) => <button key={id} aria-current={view === id ? "page" : undefined} className={view === id ? "active" : ""} onClick={() => goView(id)}><Icon size={18} aria-hidden="true" />{label}</button>)}</section>)}
        </nav>
        <div className="sidebar-foot"><button aria-current={view === "settings" ? "page" : undefined} className={view === "settings" ? "active" : ""} onClick={() => goView("settings")}><Settings size={18} aria-hidden="true" />ตั้งค่า</button></div>
      </aside>
      <div className="content-shell">
        <header className="topbar"><button ref={menuButtonRef} className="menu-button" onClick={() => setMobileNav(true)} aria-label="เปิดเมนู" aria-expanded={mobileNav}><Menu aria-hidden="true" /></button><div className="breadcrumb"><span>Sea’s Full-stack Quest</span><strong>{view === "lesson" ? lessonById(activeLessonId)?.title : view === "step" ? stepById(activeStepId)?.title : nav.find(([id]) => id === view)?.[1]}</strong></div><div className={`save-pill ${saveState}`} aria-live="polite"><CircleDot size={12} aria-hidden="true" /> {saveState === "saving" ? "กำลังบันทึก" : saveState === "error" ? "บันทึกไม่สำเร็จ" : "บันทึกแล้ว"}</div></header>
        <main id="main">
          {view === "dashboard" && <Dashboard data={data} setData={setData} openLesson={openLesson} openStep={openStep} />}
          {view === "curriculum" && <CurriculumView data={data} openStep={openStep} />}
          {view === "roadmap" && <FullStackRoadmap data={data} setData={setData} openStep={openStep} openLesson={openLesson} />}
          {view === "map" && <LearningMap data={data} openLesson={openLesson} />}
          {view === "challenges" && <ChallengeLibrary data={data} openLesson={openLesson} />}
          {view === "skills" && <SkillSummary data={data} openLesson={openLesson} />}
          {view === "journal" && <Journal data={data} setData={setData} />}
          {view === "projects" && <Projects />}
          {view === "settings" && <SettingsView data={data} setData={setData} />}
          {view === "lesson" && <LessonWorkspace lesson={lessonById(activeLessonId) ?? rec.lesson} data={data} setData={setData} saveState={saveState} openLesson={openLesson} onExit={() => goView("map")} />}
          {view === "step" && stepById(activeStepId) && <MicroStepWorkspace stepId={activeStepId} data={data} setData={setData} openStep={openStep} onExit={() => goView("curriculum")} />}
        </main>
      </div>
    </div>
  );
}

function ModeSwitch({ data, setData }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>> }) {
  const options: [StudyMode, string][] = [["fullstack", "Full-stack"], ["java", "Java & OOP"], ["mixed", "ผสมสองเส้นทาง"]];
  return <div className="segmented" aria-label="โหมดการเรียน">{options.map(([id, label]) => <button key={id} aria-pressed={data.mode === id} onClick={() => setData((d) => ({ ...d, mode: id }))}>{label}</button>)}</div>;
}

function Dashboard({ data, setData, openLesson, openStep }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; openLesson: (id: string) => void; openStep: (id:string)=>void }) {
  const stepRec=stepRecommendation(data); const passed = Object.values(data.progress).filter((p) => p.status === "passed").length; const stepPassed=Object.values(data.stepProgress).filter(p=>p.completed).length; const streak = calculateStreak(data);
  const last = data.lastLessonId ? lessonById(data.lastLessonId) : undefined;
  const lastStep = data.lastStepId ? stepById(data.lastStepId) : undefined;
  const recent = Object.values(data.progress).sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  const recentLesson = recent ? lessonById(recent.lessonId) : undefined;
  const courseSteps = learningSteps.filter((step) => step.courseId === stepRec.step.courseId);
  const firstIndex = courseSteps.findIndex((step) => step.id === stepRec.step.id);
  const sessionSteps = courseSteps.slice(Math.max(0, firstIndex), firstIndex + 5);
  const sessionMinutes = sessionSteps.reduce((sum, step) => sum + step.minutes, 0);
  const reviewItems = Object.values(data.progress).filter((progress) => progress.attempts >= 3 && progress.status !== "passed");
  const webPassed = Object.values(data.progress).filter((progress) => progress.status === "passed" && progress.lessonId.startsWith("web-")).length;
  const bangkokDate = new Intl.DateTimeFormat("th-TH", { dateStyle: "full", timeZone: "Asia/Bangkok" }).format(new Date());
  return <div className="page dashboard-page">
    <section className="dashboard-intro">
      <div><span className="eyebrow">{bangkokDate} · ASIA/BANGKOK</span><h1>คืนนี้จะออกสำรวจอะไรต่อ ซี?</h1><p>เลือกหนึ่งเส้นทาง แล้วทำให้จบเป็นหลักฐานชิ้นเล็ก ๆ ที่อธิบายด้วยคำของตัวเองได้</p></div>
      <ModeSwitch data={data} setData={setData} />
    </section>

    <section className={`mission-hero ${stepRec.course?.track === "java" ? "java" : "web"}`}>
      <div className="mission-hero-art"><ExpeditionBase /></div>
      <div className="mission-hero-copy">
        <span className={`track-tag ${stepRec.course?.track === "java" ? "java" : ""}`}>ภารกิจแนะนำ · {stepRec.course?.title}</span>
        <h2>{stepRec.step.title}</h2>
        <p>{stepRec.reason}</p>
        <div className="mission-meta"><span><Clock3 /> เริ่มด้วยบทสั้น {stepRec.step.minutes} นาที</span><span><Layers3 /> {stepRec.step.kind}</span></div>
        <button className="primary mission-cta" onClick={() => openStep(stepRec.step.id)}>เริ่มภารกิจนี้ <ChevronRight /></button>
      </div>
      <div className="mission-session" aria-label="แผนฝึกประมาณหนึ่งชั่วโมง">
        <span>แผนฝึก 1 ชั่วโมง</span>
        <ol><li><b>05</b> ทบทวนโน้ตล่าสุด</li><li><b>{String(sessionMinutes).padStart(2,"0")}</b> เรียน {sessionSteps.length} micro-steps ต่อเนื่อง</li><li><b>{String(Math.max(10,55-sessionMinutes)).padStart(2,"0")}</b> ทดลองและจด Field notes</li></ol>
        <small>CTA เปิดบทแรก จากนั้นใช้ปุ่มถัดไปเดินต่อในคอร์สเดิม</small>
      </div>
    </section>

    <section className="week-brief" aria-label="ภาพรวมสัปดาห์นี้">
      <div><Activity /><span><strong>{streak} วัน</strong><small>ฝึกต่อเนื่อง</small></span></div>
      <div><BookOpen /><span><strong>{stepPassed} steps</strong><small>บันทึกหลักฐานแล้ว</small></span></div>
      <div><Sparkles /><span><strong>{recentLesson?.module ?? (stepPassed ? stepRec.course?.title : "ยังไม่มีทักษะล่าสุด")}</strong><small>เรื่องที่ฝึกล่าสุด</small></span></div>
      <div className="week-goal"><span><strong>{Math.min(stepPassed + passed, data.weeklyGoal)}/{data.weeklyGoal}</strong><small>เป้าหมายสัปดาห์</small></span><input aria-label="เป้าหมายต่อสัปดาห์" type="range" min="1" max="14" value={data.weeklyGoal} onChange={(event) => setData((current) => ({ ...current, weeklyGoal: Number(event.target.value) }))} /></div>
    </section>

    <div className="dashboard-columns">
      <section className="dashboard-section resume-section">
        <header><div><span className="eyebrow">เรียนต่อ</span><h2>{lastStep || last ? "กลับไปยังจุดล่าสุด" : "เริ่มบันทึกการเดินทาง"}</h2></div></header>
        {lastStep ? <button className="resume-card" onClick={() => openStep(lastStep.id)}><span className="resume-icon"><Layers3 /></span><span><small>{curriculumCourses.find((course) => course.id === lastStep.courseId)?.title}</small><strong>{lastStep.title}</strong><em>คำตอบและ Field notes ยังอยู่ครบ</em></span><ChevronRight /></button>
          : last ? <button className="resume-card" onClick={() => openLesson(last.id)}><span className="resume-icon"><Code2 /></span><span><small>{last.module}</small><strong>{last.title}</strong><em>คำตอบและ checklist ยังอยู่ครบ</em></span><ChevronRight /></button>
          : <div className="first-journey"><PixelCat variant="study" /><div><strong>ยังไม่มีประวัติการเรียน</strong><p>เริ่ม micro-step แรก แล้วฐานฝึกจะจำคำตอบและจุดล่าสุดไว้ใน browser นี้</p><button onClick={() => openStep(stepRec.step.id)}>เปิดจุดเริ่มต้น <ChevronRight /></button></div></div>}
      </section>

      <section className="dashboard-section review-section">
        <header><div><span className="eyebrow">ทบทวน</span><h2>สัญญาณที่ควรกลับไปดู</h2></div></header>
        {reviewItems.length ? reviewItems.map((progress) => <button className="review-row" key={progress.lessonId} onClick={() => openLesson(progress.lessonId)}><span><strong>{lessonById(progress.lessonId)?.title}</strong><small>ลองแล้ว {progress.attempts} ครั้ง · ยังไม่ผ่าน</small></span><ChevronRight /></button>) : <div className="quiet-empty"><PixelCat small variant="rest" decorative /><p>ยังไม่มีหัวข้อที่ต้องทบทวน เมื่อเจอโจทย์ที่ลองหลายครั้ง ระบบจะรวบรวมไว้ตรงนี้</p></div>}
      </section>

      <section className="dashboard-section project-brief">
        <div className="project-sigil"><FolderGit2 /></div><div><span className="eyebrow">Portfolio project</span><h2>Friends Activity Planner</h2><p>{webPassed ? `เชื่อมหลักฐาน ${webPassed}/12 บทเว็บเข้าสู่ระบบวางแผนกิจกรรมของเพื่อน 9 คน` : "โปรเจกต์นี้จะเริ่มสะสมหลักฐานเมื่อผ่าน Lab เว็บบทแรก"}</p><div className="project-progress"><i style={{ width: `${Math.round(webPassed / 12 * 100)}%` }} /></div></div>
      </section>
    </div>
  </div>;
}

function CurriculumView({ data, openStep }: { data: AppData; openStep: (id: string) => void }) {
  const [track, setTrack] = useState<"all" | "web" | "java" | "foundation">("all");
  const suggested = stepRecommendation(data);
  const [selectedCourseId, setSelectedCourseId] = useState(data.lastStepId ? stepById(data.lastStepId)?.courseId ?? suggested.step.courseId : suggested.step.courseId);
  const [openUnit, setOpenUnit] = useState("");
  const visible = curriculumCourses.filter((course) => track === "all" || course.track === track);
  const selectedCourse = visible.find((course) => course.id === selectedCourseId) ?? visible.find((course) => course.status === "live") ?? visible[0];
  const selectedSteps = learningSteps.filter((step) => step.courseId === selectedCourse?.id);
  const selectedUnits = [...new Set(selectedSteps.map((step) => step.unit))];
  const expandedUnit = selectedUnits.includes(openUnit) ? openUnit : selectedUnits[0];
  const selectedDone = selectedSteps.filter((step) => data.stepProgress[step.id]?.completed).length;
  const nextStep = selectedSteps.find((step) => !data.stepProgress[step.id]?.completed) ?? selectedSteps[0];
  const artFor = (courseId: string): Parameters<typeof WorldLandmark>[0]["world"] => courseId === "developer-foundations" ? "camp" : courseId === "java-foundations" ? "java" : courseId === "java-oop" ? "oop" : courseId === "javascript-foundations" || courseId === "typescript" || courseId === "react" || courseId === "nextjs" ? "frontend" : courseId === "postgres" ? "data" : "backend";
  const readyCourses = visible.filter((course) => learningSteps.some((step) => step.courseId === course.id));
  const plannedCourses = visible.filter((course) => !learningSteps.some((step) => step.courseId === course.id));
  return <div className="page curriculum-page curriculum-v2">
    <header className="curriculum-intro"><div><span className="eyebrow">{learningSteps.length} micro-steps · เริ่มจากศูนย์</span><h1>เลือกเส้นทางจากสิ่งที่อยากทำได้</h1><p>แต่ละหัวข้อแบ่งเป็นแนวคิด → ทำนายผล → ลงมือเขียน → แก้บั๊ก → อธิบาย เพื่อสร้าง mental model ก่อนพึ่ง framework</p></div><div className="curriculum-total"><strong>{readyCourses.length}</strong><span>คอร์สพร้อมเรียน</span></div></header>

    <div className="segmented curriculum-filter" aria-label="กรองเส้นทาง">{([['all','ทั้งหมด'],['foundation','พื้นฐานนักพัฒนา'],['java','Java & OOP'],['web','Web & Back-end']] as const).map(([id,label])=><button key={id} aria-pressed={track===id} onClick={()=>setTrack(id)}>{label}</button>)}</div>

    {selectedCourse && <section className={`featured-course ${selectedCourse.track}`}>
      <div className="featured-course-art"><WorldLandmark world={artFor(selectedCourse.id)} decorative /></div>
      <div className="featured-course-copy"><span className={`track-tag ${selectedCourse.track === "java" ? "java" : ""}`}>{selectedCourse.status === "live" ? "พร้อมเรียน" : selectedCourse.status === "writing" ? "กำลังเขียน" : "วางแผนไว้"}</span><h2>{selectedCourse.title}</h2><p>{selectedCourse.description}</p><div className="featured-facts"><span><strong>{selectedSteps.length || selectedCourse.targetSteps}</strong> steps</span><span><strong>{selectedUnits.length || "—"}</strong> chapters</span><span><strong>{selectedSteps.reduce((sum, step) => sum + step.minutes, 0) || "—"}</strong> นาที</span></div>{nextStep ? <button className="primary" onClick={() => openStep(nextStep.id)}>{selectedDone ? "เรียนต่อ" : "เริ่มคอร์สนี้"}<ChevronRight /></button> : <p className="planned-notice"><LockKeyhole />ยังไม่เปิดหน้าว่าง เนื้อหาเต็มกำลังวางแผน</p>}</div>
    </section>}

    <section className="course-picker"><header><div><span className="eyebrow">Course atlas</span><h2>คอร์สที่พร้อมสำรวจ</h2></div><span>{readyCourses.length} คอร์ส</span></header><div className="course-card-grid">{readyCourses.map((course) => { const steps=learningSteps.filter((step)=>step.courseId===course.id); const done=steps.filter((step)=>data.stepProgress[step.id]?.completed).length; return <button key={course.id} className={`course-card ${course.id === selectedCourse?.id ? "selected" : ""} ${course.track}`} aria-pressed={course.id === selectedCourse?.id} onClick={() => { setSelectedCourseId(course.id); setOpenUnit(""); }}><span className="course-card-art"><WorldLandmark world={artFor(course.id)} decorative /></span><span className="course-card-copy"><small>{course.track === "java" ? "JAVA & OOP" : course.track === "foundation" ? "FOUNDATIONS" : "WEB DEVELOPMENT"}</small><strong>{course.title}</strong><em>{done}/{steps.length} steps · {new Set(steps.map((step)=>step.unit)).size} chapters</em><i><b style={{width:`${steps.length ? done/steps.length*100 : 0}%`}} /></i></span></button>; })}</div></section>

    {selectedSteps.length > 0 && <section className="chapter-explorer"><header><div><span className="eyebrow">Course chapters</span><h2>{selectedCourse.title}</h2></div><span>{selectedDone}/{selectedSteps.length} ผ่านแล้ว</span></header><div className="chapter-list">{selectedUnits.map((unit,index)=>{const unitSteps=selectedSteps.filter((step)=>step.unit===unit);const unitDone=unitSteps.filter((step)=>data.stepProgress[step.id]?.completed).length;const isOpen=expandedUnit===unit;return <section key={unit} className={isOpen?"open":""}><button className="chapter-toggle" aria-expanded={isOpen} onClick={()=>setOpenUnit(isOpen?"__closed__":unit)}><span className="chapter-index">{String(index+1).padStart(2,"0")}</span><span><strong>{unit}</strong><small>{unitDone}/{unitSteps.length} steps · {unitSteps.reduce((sum,step)=>sum+step.minutes,0)} นาที</small></span><ChevronRight /></button>{isOpen&&<div className="chapter-steps">{unitSteps.map((step)=>{const saved=data.stepProgress[step.id];return <button key={step.id} className={saved?.completed?"done":saved?"started":""} onClick={()=>openStep(step.id)}><span className="step-state">{saved?.completed?<Check/>:<CircleDot/>}</span><span><strong>{step.title}</strong><small>{step.kind} · {step.minutes} นาที</small></span><ChevronRight /></button>})}</div>}</section>})}</div></section>}

    {plannedCourses.length > 0 && <section className="planned-courses"><header><span className="eyebrow">Next expeditions</span><h2>คอร์สที่วางแผนไว้</h2><p>แสดงให้เห็นภาพเส้นทาง แต่ไม่มีปุ่มเริ่มจนกว่าเนื้อหาและ feedback จะพร้อม</p></header><div>{plannedCourses.map((course)=><article key={course.id}><WorldLandmark world={artFor(course.id)} decorative /><span><small>{course.targetSteps} target steps</small><strong>{course.title}</strong><p>{course.description}</p></span><LockKeyhole /></article>)}</div></section>}
  </div>;
}

function MicroStepWorkspace({stepId,data,setData,openStep,onExit}:{stepId:string;data:AppData;setData:React.Dispatch<React.SetStateAction<AppData>>;openStep:(id:string)=>void;onExit:()=>void}) {
  const step=stepById(stepId)!; const courseSteps=learningSteps.filter(s=>s.courseId===step.courseId); const index=courseSteps.findIndex(s=>s.id===stepId); const course=curriculumCourses.find(c=>c.id===step.courseId); const saved=data.stepProgress[stepId]??{stepId,answer:"",notes:"",completed:false,updatedAt:new Date().toISOString()}; const [revealed,setRevealed]=useState(!!saved.answerRevealed);
  const update=(patch:Partial<typeof saved>)=>setData(d=>({...d,lastStepId:stepId,stepProgress:{...d.stepProgress,[stepId]:{...(d.stepProgress[stepId]??saved),...patch,updatedAt:new Date().toISOString()}}}));
  const next=courseSteps[index+1]; const previous=courseSteps[index-1];
  const kindCopy={concept:["ทำความเข้าใจ","สร้าง mental model ก่อนลงมือ"],trace:["อ่านและทำนาย","ไล่ค่าจากโค้ดโดยยังไม่รัน"],practice:["ลงมือเขียน","สร้างคำตอบจาก starter code"],debug:["ตามหาบั๊ก","ตั้งสมมติฐานแล้วแก้ให้น้อยที่สุด"],checkpoint:["อธิบายโดยไม่ลอก","ดึงความเข้าใจออกมาด้วยคำของตัวเอง"]} as const;
  const effectivePrompt=step.prompt??`อธิบายว่า “${step.title.replace(/^.*?:\s*/,"")}” ทำงานอย่างไรด้วยคำของซีเอง 1–2 ประโยค และยกตัวอย่างสั้น ๆ`;
  return <div className="micro-workspace micro-v2">
    <header className="micro-header-v2"><button onClick={onExit}><ChevronLeft/>คอร์ส</button><div className="micro-title"><span className="eyebrow">{course?.title} · {step.unit}</span><h1>{step.title}</h1><p>{step.objective}</p></div><div className="micro-position"><span>STEP</span><strong>{step.position}</strong><small>/ {courseSteps.length}</small></div></header>
    <div className="micro-progress" aria-label={`ผ่านตำแหน่ง ${step.position} จาก ${courseSteps.length}`}><i style={{width:`${step.position/courseSteps.length*100}%`}}/></div>
    <div className="micro-stagebar"><span className={`kind ${step.kind}`}>{kindCopy[step.kind][0]}</span><span><Clock3/>{step.minutes} นาที</span><p>{kindCopy[step.kind][1]}</p><div className="rail-nav"><button disabled={!previous} onClick={()=>previous&&openStep(previous.id)}><ChevronLeft/>ก่อนหน้า</button><button disabled={!next} onClick={()=>next&&openStep(next.id)}>ถัดไป<ChevronRight/></button></div></div>
    <main className="micro-content-v2">
      <section className="micro-learn"><div className="phase-label"><span>01</span><div><small>ทำความเข้าใจ</small><strong>อ่านหนึ่งแนวคิดให้เห็นภาพก่อน</strong></div></div>{step.body.map(paragraph=><p className="teaching-copy" key={paragraph}>{paragraph}</p>)}{step.vocabulary.length>0&&<dl className="vocabulary">{step.vocabulary.map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>}{step.code&&<div className="micro-code"><span>ตัวอย่างที่ใช้สังเกต</span><pre><code>{step.code}</code></pre></div>}{step.starter&&<div className="micro-code starter"><span>Starter code</span><pre><code>{step.starter}</code></pre></div>}</section>
      <section className="micro-task"><div className="phase-label"><span>02</span><div><small>ลองด้วยตัวเอง</small><strong>หยุดอ่านแล้วสร้างคำตอบ</strong></div></div><h2>{effectivePrompt}</h2><textarea value={saved.answer} onChange={event=>update({answer:event.target.value})} placeholder={step.kind==='practice'||step.kind==='debug'?"เขียนโค้ดและอธิบายเหตุผลของซีที่นี่…":"ตอบก่อนกลับไปดูตัวอย่าง…"}/><div className="task-actions">{step.reveal&&<button className="secondary" onClick={()=>{setRevealed(true);update({answerRevealed:true})}}>เปิดแนวทางทีละขั้น</button>}<button className="primary" onClick={()=>update({completed:true})} disabled={!saved.answer.trim()}>บันทึกหลักฐาน <Check/></button></div>{revealed&&step.reveal&&<div className="reveal"><strong>แนวทางตรวจคำตอบ</strong><pre><code>{step.reveal}</code></pre><p>เทียบเหตุผลและ behavior ไม่จำเป็นต้องเขียนเหมือนตัวอย่างทุกตัวอักษร</p></div>}</section>
      <section className="step-notes"><div className="phase-label"><span>03</span><div><small>ปิดรอบการเรียน</small><strong>เก็บสิ่งที่เพิ่งเข้าใจไว้กลับมาทบทวน</strong></div></div><label htmlFor={`notes-${step.id}`}>Field notes</label><textarea id={`notes-${step.id}`} value={saved.notes} onChange={event=>update({notes:event.target.value})} placeholder="สิ่งที่เข้าใจ / จุดที่ยังสงสัย / error ที่พบ…"/></section>
      {saved.completed&&<div className="step-complete"><PixelCat small variant="celebrate" decorative/><div><strong>บันทึกหลักฐานแล้ว</strong><p>ปุ่มถัดไปเป็นการนำทาง คำตอบเดิมยังกลับมาแก้ได้เสมอ</p></div>{next&&<button className="primary" onClick={()=>openStep(next.id)}>ไป step ถัดไป<ChevronRight/></button>}</div>}
      <nav className="micro-footer-nav" aria-label="นำทางระหว่าง micro-step"><button disabled={!previous} onClick={()=>previous&&openStep(previous.id)}><ChevronLeft/><span><small>ก่อนหน้า</small><strong>{previous?.title??"จุดเริ่มต้นคอร์ส"}</strong></span></button><button disabled={!next} onClick={()=>next&&openStep(next.id)}><span><small>ถัดไป</small><strong>{next?.title??"จบคอร์สนี้"}</strong></span><ChevronRight/></button></nav>
    </main>
  </div>;
}

function LearningMap({ data, openLesson }: { data: AppData; openLesson: (id: string) => void }) {
  const recommended = recommendation(data).lesson;
  const [selectedWorld, setSelectedWorld] = useState(data.lastLessonId ? lessonById(data.lastLessonId)?.module ?? recommended.module : recommended.module);
  const selectedModule = modules.find(([name]) => name === selectedWorld) ?? modules[0];
  const moduleLessons = lessons.filter((lesson) => lesson.module === selectedModule[0]);
  const modulePassed = moduleLessons.filter((lesson) => data.progress[lesson.id]?.status === "passed").length;
  const worldArt = (name:string): Parameters<typeof WorldLandmark>[0]["world"] => name === "Developer Foundations" ? "camp" : name === "Java Foundations" ? "java" : name === "Java OOP Lab" ? "oop" : name.includes("React") || name.includes("TypeScript") ? "frontend" : name.includes("Node") ? "backend" : name.includes("PostgreSQL") ? "data" : name.includes("Integration") ? "integration" : "quality";
  return <div className="page lab-page">
    <header className="lab-intro"><div><span className="eyebrow">10 worlds · {lessons.length} Lab missions</span><h1>แผนที่ Lab</h1><p>เลือกโลกเพื่อประกอบหลายแนวคิดเป็นงานจริง Java เริ่มได้ทันทีโดยไม่ต้องผ่านเส้นทางเว็บ และการล็อกเป็นเพียงคำแนะนำ ไม่ใช่กำแพงบังคับ</p></div><div className="lab-legend"><span><i className="ready"/>พร้อมทำ</span><span><i className="active"/>กำลังทำ</span><span><i className="done"/>ผ่านแล้ว</span></div></header>
    <div className="lab-layout">
      <section className="lab-world-map" aria-label="เลือกโลก Lab">
        <div className="lab-map-sky" aria-hidden="true"><i/><i/><i/></div>
        <div className="lab-route" aria-hidden="true"/>
        {modules.map(([name,track,desc],index)=>{const worldLessons=lessons.filter((lesson)=>lesson.module===name);const passed=worldLessons.filter((lesson)=>data.progress[lesson.id]?.status==="passed").length;const started=worldLessons.some((lesson)=>data.progress[lesson.id]);const selected=name===selectedModule[0];return <button key={name} className={`lab-world-node ${track} ${selected?"selected":""} ${worldLessons.length?passed===worldLessons.length?"done":started?"active":"ready":"planned"}`} aria-pressed={selected} onClick={()=>setSelectedWorld(name)}><span className="lab-world-number">{String(index+1).padStart(2,"0")}</span><span className="lab-world-art"><WorldLandmark world={worldArt(name)} decorative /></span><span className="lab-world-label"><small>{worldLessons.length?`${passed}/${worldLessons.length} missions`:"วางแผนไว้"}</small><strong>{name}</strong><em>{desc}</em></span>{selected&&<span className="current-pin"><Map/>ตำแหน่งปัจจุบัน</span>}</button>})}
      </section>

      <aside className={`lab-mission-panel ${selectedModule[1]}`} aria-live="polite">
        <div className="lab-panel-art"><WorldLandmark world={worldArt(selectedModule[0])} decorative /></div>
        <span className={`track-tag ${selectedModule[1] === "java" ? "java" : ""}`}>{selectedModule[1] === "java" ? "JAVA ROUTE" : "FULL-STACK ROUTE"}</span>
        <h2>{selectedModule[0]}</h2><p>{selectedModule[2]}</p>
        {moduleLessons.length ? <><div className="lab-panel-stats"><span><strong>{modulePassed}/{moduleLessons.length}</strong> missions</span><span><strong>{moduleLessons.reduce((sum,lesson)=>sum+lesson.minutes,0)}</strong> นาที</span></div><div className="lab-quest-list">{moduleLessons.map((lesson)=>{const progress=data.progress[lesson.id];return <button key={lesson.id} className={progress?.status==="passed"?"done":progress?"active":""} onClick={()=>openLesson(lesson.id)} title={accessReason(data,lesson)}><span className="quest-status">{progress?.status==="passed"?<Check/>:<CircleDot/>}</span><span><strong>{lesson.title}</strong><small>{lesson.minutes} นาที · {lesson.checkMode === "auto" ? "ระบบตรวจอัตโนมัติ" : lesson.checkMode === "local-java" ? "ตรวจ Java ในเครื่อง" : "หลักฐาน + เช็กลิสต์"}</small></span><ChevronRight/></button>})}</div></> : <div className="lab-planned-state"><PixelCat variant="rest"/><div><strong>โลกนี้ยังวางแผนอยู่</strong><p>แสดงไว้ให้เห็นภาพการเดินทาง แต่จะไม่มีปุ่มเริ่มจนกว่าเนื้อหาและ feedback พร้อมจริง</p></div></div>}
      </aside>
    </div>
    <section className="java-horizon"><div><span className="eyebrow">Java · next horizon</span><h2>ด่านถัดไปที่วางแผนไว้</h2><p>หัวข้อเหล่านี้จะเปิดหลังเนื้อหาเต็มและวิธีตรวจพร้อม ไม่ผูกกับวันปฏิทิน</p></div><div>{plannedJava.map((item)=><span key={item}><LockKeyhole size={14}/>{item}</span>)}</div></section>
  </div>;
}

function ChallengeLibrary({ data, openLesson }: { data: AppData; openLesson: (id:string)=>void }) {
  const [query,setQuery]=useState(""); const [track,setTrack]=useState("all"); const [mode,setMode]=useState("all");
  const filtered=lessons.filter(l => (track==="all"||l.track===track)&&(mode==="all"||l.checkMode===mode)&&(l.title.toLowerCase().includes(query.toLowerCase())||l.concepts.join(" ").toLowerCase().includes(query.toLowerCase())));
  const suggested=recommendation(data).lesson;
  const featured=filtered.find(lesson=>lesson.id===suggested.id)??filtered[0];
  const remaining=featured?filtered.filter(lesson=>lesson.id!==featured.id):[];
  const hasFilters=Boolean(query||track!=="all"||mode!=="all");
  const clearFilters=()=>{setQuery("");setTrack("all");setMode("all")};
  const checkLabel=(lesson:Lesson)=>lesson.checkMode==="auto"?"ระบบทดสอบพฤติกรรม":lesson.checkMode==="local-java"?"ตรวจ Java ในเครื่อง":"หลักฐาน + เช็กลิสต์";
  const statusLabel=(lesson:Lesson)=>data.progress[lesson.id]?.status==="passed"?"ผ่านแล้ว":data.progress[lesson.id]?"กำลังทำ":"ยังไม่เริ่ม";
  return <div className="page challenge-page">
    <header className="challenge-intro"><div><span className="eyebrow">PRACTICE ARCHIVE · {lessons.length} MISSIONS</span><h1>คลังโจทย์</h1><p>ค้นจากสิ่งที่อยากฝึก แล้วเลือกโจทย์จากเวลา วิธีตรวจ และหลักฐานที่ต้องส่ง ไม่ต้องเดาจากชื่อเพียงอย่างเดียว</p></div><div className="challenge-count" aria-live="polite"><strong>{filtered.length}</strong><span>โจทย์ที่ตรงเงื่อนไข</span></div></header>

    <form className="challenge-filters" role="search" onSubmit={event=>event.preventDefault()}>
      <label className="challenge-search"><Search aria-hidden="true"/><span className="sr-only">ค้นหาโจทย์</span><input aria-label="ค้นหาโจทย์จากชื่อหรือแนวคิด" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="ค้นหา เช่น validation, class, JOIN" /></label>
      <label><span>เส้นทาง</span><select value={track} onChange={event=>setTrack(event.target.value)}><option value="all">ทุกเส้นทาง</option><option value="web">Full-stack</option><option value="java">Java & OOP</option></select></label>
      <label><span>วิธีตรวจ</span><select value={mode} onChange={event=>setMode(event.target.value)}><option value="all">ทุกวิธีตรวจ</option><option value="auto">ตรวจอัตโนมัติ</option><option value="self">เช็กลิสต์</option><option value="local-java">Java ในเครื่อง</option></select></label>
      {hasFilters&&<button className="clear-filters" type="button" onClick={clearFilters}><X/>ล้างตัวกรอง</button>}
    </form>

    {featured?<>
      <section className={`featured-challenge ${featured.track}`} aria-labelledby="featured-challenge-title">
        <div className="featured-challenge-copy"><span className={`track-tag ${featured.track}`}>{hasFilters?"ตรงกับตัวกรอง":"แนะนำให้ฝึกต่อ"} · {featured.module}</span><h2 id="featured-challenge-title">{featured.title}</h2><p>{featured.objective}</p><div className="featured-challenge-facts"><span><Clock3/><b>{featured.minutes}</b> นาที</span><span><ShieldCheck/><b>{checkLabel(featured)}</b></span><span><Activity/><b>{statusLabel(featured)}</b></span></div><button className="primary" onClick={()=>openLesson(featured.id)}>เปิดโจทย์นี้ <ChevronRight/></button></div>
        <div className="featured-challenge-art" aria-hidden="true"><PixelCat variant="study" decorative/><div><span>MISSION BRIEF</span><p>{featured.prompt}</p></div></div>
      </section>

      <section className="challenge-archive" aria-labelledby="challenge-results-title"><header><div><span className="eyebrow">ALL MATCHES</span><h2 id="challenge-results-title">โจทย์ในผลการค้นหา</h2></div><span>{remaining.length} รายการเพิ่มเติม</span></header><div className="challenge-list-v2">{remaining.map(lesson=>{const progress=data.progress[lesson.id];return <button key={lesson.id} className={`${lesson.track} ${progress?.status==="passed"?"done":progress?"active":""}`} onClick={()=>openLesson(lesson.id)}><span className="challenge-state">{progress?.status==="passed"?<Check/>:lesson.track==="java"?<Braces/>:<Code2/>}</span><span className="challenge-row-copy"><small>{lesson.module}</small><strong>{lesson.title}</strong><em>{lesson.concepts.slice(0,3).join(" · ")}</em></span><span className="challenge-row-meta"><small><Clock3/>{lesson.minutes} นาที</small><small><ShieldCheck/>{checkLabel(lesson)}</small><b>{statusLabel(lesson)}</b></span><ChevronRight/></button>})}</div>{remaining.length===0&&<div className="challenge-single-result"><Check/><p>มีหนึ่งโจทย์ที่ตรงเงื่อนไข และแสดงเป็นภารกิจเด่นด้านบนแล้ว</p></div>}</section>
    </>:<section className="challenge-empty"><PixelCat variant="rest" decorative/><div><span className="eyebrow">NO MATCHING MISSION</span><h2>ยังไม่พบโจทย์ชุดนี้</h2><p>ลองตัดคำค้นให้สั้นลง หรือกลับไปดูทุกเส้นทางและทุกวิธีตรวจ</p><button className="primary" onClick={clearFilters}>ล้างตัวกรอง</button></div></section>}
  </div>;
}

function SkillSummary({ data, openLesson }: { data:AppData; openLesson:(id:string)=>void }) {
  return <div className="page"><div className="page-heading"><span className="eyebrow">EVIDENCE, NOT VANITY SCORES</span><h1>หลักฐานทักษะ</h1><p>แยกสิ่งที่ระบบตรวจผ่านจากงานที่ซีตรวจด้วยเช็กลิสต์ ไม่เรียกจำนวนนี้ว่า Mastery</p></div><div className="skill-groups"><h2>Full-stack</h2><div className="skill-grid">{skills.filter(s=>s[2]==="web").map(s=><SkillCard key={s[0]} skill={s} data={data} openLesson={openLesson}/>)}</div><h2>Java & OOP</h2><p className="muted">ความคืบหน้า Java แยกจากเส้นทางเว็บ พร้อมหลักฐานจากโจทย์และโปรเจกต์ที่ทำจริง</p><div className="skill-grid">{skills.filter(s=>s[2]==="java").map(s=><SkillCard key={s[0]} skill={s} data={data} openLesson={openLesson}/>)}</div></div></div>;
}
function SkillCard({skill,data,openLesson}:{skill:readonly[string,string,string];data:AppData;openLesson:(id:string)=>void}) { const related=lessons.filter(l=>l.skillIds.includes(skill[0])); const passed=related.filter(l=>data.progress[l.id]?.status==="passed"); const auto=passed.filter(l=>l.checkMode==="auto").length; const self=passed.filter(l=>l.checkMode!=="auto").length; return <article className="skill-card"><div className="skill-icon">{skill[2]==="java"?<Braces/>:<Code2/>}</div><h3>{skill[1]}</h3><div className="evidence"><span><b>{auto}</b> ระบบตรวจผ่าน</span><span><b>{self}</b> ตรวจด้วยเช็กลิสต์</span></div><div className="mini-progress"><i style={{width:`${related.length?passed.length/related.length*100:0}%`}}/></div>{related.length?<button onClick={()=>openLesson((related.find(l=>data.progress[l.id]?.status!=="passed")??related[0]).id)}>{passed.length}/{related.length} บทที่มีหลักฐาน <ChevronRight/></button>:<span className="planned-label">วางแผนไว้ — ยังไม่มีหลักฐาน</span>}</article> }

function Journal({data,setData}:{data:AppData;setData:React.Dispatch<React.SetStateAction<AppData>>}) {
  const blank={title:"",learned:"",bug:"",fix:"",unclear:"",link:"",lessonId:""}; const [form,setForm]=useState(blank); const [editing,setEditing]=useState<string|null>(null); const [query,setQuery]=useState("");
  const submit=(e:React.FormEvent)=>{e.preventDefault(); if(!form.title.trim())return; const now=new Date().toISOString(); const entry:JournalEntry={...form,id:editing??crypto.randomUUID(),lessonId:form.lessonId||undefined,date:now.slice(0,10),updatedAt:now}; setData(d=>({...d,journal:editing?d.journal.map(j=>j.id===editing?entry:j):[entry,...d.journal]})); setForm(blank);setEditing(null);};
  const edit=(j:JournalEntry)=>{setEditing(j.id);setForm({title:j.title,learned:j.learned,bug:j.bug,fix:j.fix,unclear:j.unclear,link:j.link,lessonId:j.lessonId??""});window.scrollTo({top:0,behavior:"smooth"});};
  const visible=data.journal.filter(j=>[j.title,j.learned,j.bug,j.fix,j.unclear].join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div className="page journal-layout"><section><div className="page-heading"><span className="eyebrow">LEARNING JOURNAL</span><h1>{editing?"แก้ไขบันทึก":"บันทึกการเดินทาง"}</h1><p>อธิบายเหตุผลของโค้ดและบั๊กด้วยภาษาของซีเอง</p></div><form className="journal-form" onSubmit={submit}><label>หัวข้อ<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="วันนี้ค้นพบอะไร"/></label><label>เชื่อมกับบท<select value={form.lessonId} onChange={e=>setForm({...form,lessonId:e.target.value})}><option value="">ไม่ระบุ</option>{lessons.map(l=><option key={l.id} value={l.id}>{l.title}</option>)}</select></label><label>แนวคิดที่เข้าใจเพิ่ม<textarea value={form.learned} onChange={e=>setForm({...form,learned:e.target.value})}/></label><div className="form-pair"><label>บั๊กที่เจอ<textarea value={form.bug} onChange={e=>setForm({...form,bug:e.target.value})}/></label><label>วิธีแก้และเหตุผล<textarea value={form.fix} onChange={e=>setForm({...form,fix:e.target.value})}/></label></div><label>สิ่งที่ยังไม่เข้าใจ<textarea value={form.unclear} onChange={e=>setForm({...form,unclear:e.target.value})}/></label><label>GitHub / Demo URL<input type="url" value={form.link} onChange={e=>setForm({...form,link:e.target.value})}/></label><div><button className="primary" type="submit">{editing?"บันทึกการแก้ไข":"เพิ่มบันทึก"}</button>{editing&&<button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(blank)}}>ยกเลิก</button>}</div></form></section><aside className="journal-archive"><label className="search-small"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ค้นบันทึก"/></label>{visible.length?visible.map(j=><article key={j.id}><small>{new Intl.DateTimeFormat("th-TH",{dateStyle:"medium"}).format(new Date(j.updatedAt))}</small><h3>{j.title}</h3><p>{j.learned||j.bug||"ยังไม่มีรายละเอียด"}</p><button onClick={()=>edit(j)}>แก้ไข</button></article>):<div className="empty-inline"><p>ยังไม่มีบันทึกจริง</p></div>}</aside></div>;
}

function Projects() { const items=[{title:"Friends Activity Planner",tag:"เส้นทางหลัก",brief:"ระบบสำหรับเพื่อน 9 คนเพื่อสร้างกิจกรรม เข้าร่วม และโหวตช่วงเวลา",stories:["ดูและกรองกิจกรรม","สร้างกิจกรรมโดยตรวจข้อมูล","เข้าร่วมโดยไม่ส่งซ้ำ","เห็นจำนวนคนที่สะดวก"],criteria:["API มี error contract","ฐานข้อมูลป้องกัน relation ซ้ำ","UI ครบ loading/empty/error","มี unit + integration + E2E"]},{title:"Personal Expense Tracker",tag:"ต่อยอด",brief:"ติดตามรายรับรายจ่ายและสรุปรายเดือน",stories:["เพิ่มรายการ","จัดหมวดหมู่","สรุปยอด"],criteria:["decimal ถูกต้อง","filter ตามเดือน","empty state ชัด"]},{title:"Mini Incident Dashboard",tag:"ต่อยอด",brief:"บันทึก incident และ timeline การแก้ปัญหา",stories:["สร้าง incident","อัปเดตสถานะ","เขียน postmortem"],criteria:["status transition ถูกต้อง","แสดง timeline","ค้นย้อนหลังได้"]},{title:"Booking API",tag:"ขั้นสูง",brief:"API จองที่มี authorization และ transaction",stories:["ดู slot","จอง","ยกเลิก"],criteria:["ตรวจสิทธิ์ฝั่ง server","ป้องกัน double booking","rollback เมื่อผิด"]}]; return <div className="page"><div className="page-heading"><span className="eyebrow">PORTFOLIO DOCK</span><h1>โปรเจกต์สะสม</h1><p>ทุกโปรเจกต์ให้หลักฐานจากการตัดสินใจ ไม่ใช่แค่ภาพหน้าจอ</p></div><div className="project-list">{items.map((p,i)=><article key={p.title}><div className="project-number">0{i+1}</div><div><span className="track-tag">{p.tag}</span><h2>{p.title}</h2><p>{p.brief}</p><div className="project-columns"><div><strong>User stories</strong>{p.stories.map(x=><span key={x}><Check/> {x}</span>)}</div><div><strong>Acceptance criteria</strong>{p.criteria.map(x=><span key={x}><CircleDot/> {x}</span>)}</div></div><label>Repository URL<input placeholder="https://github.com/..." aria-label={`${p.title} repository`}/></label><label>Demo URL<input placeholder="https://..." aria-label={`${p.title} demo`}/></label><details><summary>คำถามตัดสินใจทางเทคนิค</summary><p>อะไรคือ invariant สำคัญ? เหตุใดเลือกโครงสร้างข้อมูลนี้? failure case ใดเสี่ยงที่สุด และ test ใดพิสูจน์ได้?</p></details></div></article>)}</div></div> }

function SettingsView({data,setData}:{data:AppData;setData:React.Dispatch<React.SetStateAction<AppData>>}) {
  const [message,setMessage]=useState(""); const fileRef=useRef<HTMLInputElement>(null);
  const exportData=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`seas-quest-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);setMessage("ส่งออกข้อมูลแล้ว");};
  const importData=async(file?:File)=>{if(!file)return;try{const parsed:unknown=JSON.parse(await file.text());if(!isAppData(parsed))throw new Error("รูปแบบไม่ตรง schema v1");setData(parsed);setMessage("นำเข้าข้อมูลสำเร็จ");}catch(e){setMessage(`นำเข้าไม่สำเร็จ: ${e instanceof Error?e.message:"ไฟล์ไม่ถูกต้อง"}`)}};
  return <div className="page"><div className="page-heading"><span className="eyebrow">LOCAL DATA CONTROL</span><h1>ตั้งค่าและสำรองข้อมูล</h1><p>ข้อมูลอยู่ใน localStorage ของ browser นี้เท่านั้น ยังไม่ซิงก์ข้ามอุปกรณ์</p></div><section className="privacy-callout"><ShieldCheck/><div><h2>พื้นที่ส่วนตัวในเครื่องนี้</h2><p>คำตอบ ความคืบหน้า และ Journal ไม่ถูกส่งไป server แต่หายได้เมื่อล้างข้อมูล browser โปรด Export สำรองเป็นระยะ</p></div></section><section className="settings-section"><h2>โหมดภารกิจ</h2><ModeSwitch data={data} setData={setData}/></section><section className="settings-section"><h2>สำรองและย้ายข้อมูล</h2><div className="button-row"><button className="primary" onClick={exportData}><Download/> Export JSON</button><button className="secondary" onClick={()=>fileRef.current?.click()}><Upload/> Import JSON</button><input ref={fileRef} hidden type="file" accept="application/json" onChange={e=>importData(e.target.files?.[0])}/></div>{message&&<p className="status-message" role="status">{message}</p>}</section><section className="settings-section danger"><h2>เริ่มข้อมูลใหม่</h2><p>ลบคำตอบและความคืบหน้าเฉพาะใน browser นี้</p><button onClick={()=>{if(confirm("ล้างข้อมูลทั้งหมดใน browser นี้?")){setData(emptyData());setMessage("ล้างข้อมูลแล้ว")}}}>ล้างข้อมูล</button></section></div>;
}

function LessonWorkspace({lesson,data,setData,saveState,openLesson,onExit}:{lesson:Lesson;data:AppData;setData:React.Dispatch<React.SetStateAction<AppData>>;saveState:SaveState;openLesson:(id:string)=>void;onExit:()=>void}) {
  const [tab,setTab]=useState<"lesson"|"task"|"code"|"result"|"notes">("lesson"); const [hintCount,setHintCount]=useState(0); const [showSolution,setShowSolution]=useState(false); const [running,setRunning]=useState(false); const [focusMode,setFocusMode]=useState(false); const [copied,setCopied]=useState(false);
  const progress=data.progress[lesson.id]??newProgress(lesson.id,lesson.starterCode);
  useEffect(()=>{if(!data.progress[lesson.id])setData(d=>({...d,lastLessonId:lesson.id,progress:{...d.progress,[lesson.id]:newProgress(lesson.id,lesson.starterCode)}}));},[lesson.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const patchProgress=(patch:Partial<LessonProgress>)=>setData(d=>{const current=d.progress[lesson.id]??newProgress(lesson.id,lesson.starterCode);return{...d,lastLessonId:lesson.id,progress:{...d.progress,[lesson.id]:{...current,...patch,updatedAt:new Date().toISOString()}}}});
  const run=async()=>{if(!lesson.tests||!lesson.functionName)return;setRunning(true);const results=await runIsolatedTests(progress.code,lesson.functionName,lesson.tests);const passed=results.every(r=>r.passed);patchProgress({attempts:progress.attempts+1,lastResult:{passed,at:new Date().toISOString(),details:results},status:passed?"passed":"in-progress",completedAt:passed?(progress.completedAt??new Date().toISOString()):undefined});setRunning(false);setTab("result");};
  const toggleCheck=(i:number)=>{const checks=lesson.acceptance.map((_,idx)=>idx===i?!progress.checklist[idx]:!!progress.checklist[idx]);patchProgress({checklist:checks});};
  const selfComplete=()=>{const all=lesson.acceptance.every((_,i)=>progress.checklist[i]); if(!all)return;patchProgress({status:"passed",completedAt:progress.completedAt??new Date().toISOString(),attempts:progress.attempts+1,lastResult:{passed:true,at:new Date().toISOString(),details:[]}});setTab("result");};
  const next=lessons.find(l=>l.track===lesson.track&&l.order===lesson.order+1);
  const copyExample=async()=>{try{await navigator.clipboard.writeText(lesson.example);setCopied(true);window.setTimeout(()=>setCopied(false),1600);}catch{setCopied(false);}};
  const indent=(event:React.KeyboardEvent<HTMLTextAreaElement>)=>{if(event.key!=="Tab")return;event.preventDefault();const target=event.currentTarget;const start=target.selectionStart;const end=target.selectionEnd;const code=`${progress.code.slice(0,start)}  ${progress.code.slice(end)}`;patchProgress({code});requestAnimationFrame(()=>{target.selectionStart=target.selectionEnd=start+2;});};
  const lessonContent=<div className="lesson-content-block"><section className="outcome"><Target/><div><strong>หลังบทนี้ ซีจะ…</strong><p>{lesson.objective}</p></div></section><section><h2>ทำไมใช้ในงานจริง</h2><p>{lesson.realWorld}</p></section><section className="prerequisite-line"><span>Prerequisite</span><p>{lesson.prerequisites.length?lesson.prerequisites.map(id=>lessonById(id)?.title).join(" → "):"เริ่มได้ทันที ไม่ต้องผ่านเส้นทางอื่น"}</p></section><section><h2>แนวคิดสำคัญ</h2><div className="concepts">{lesson.concepts.map(c=><span key={c}>{c}</span>)}</div>{lesson.explanation.map(p=><p key={p}>{p}</p>)}</section><section><div className="reading-section-head"><h2>ตัวอย่างที่รันได้</h2><button onClick={copyExample}><Copy/>{copied?"คัดลอกแล้ว":"คัดลอก"}</button></div><pre><code>{lesson.example}</code></pre><ul>{lesson.exampleNotes.map(n=><li key={n}>{n}</li>)}</ul></section><section className="mistakes"><span>จุดที่มักพลาด</span><ul>{lesson.commonMistakes.map(m=><li key={m}>{m}</li>)}</ul></section></div>;
  const taskContent=<div className="task-content-block"><span className="eyebrow">Field assignment</span><h2>{lesson.prompt}</h2><h3>Acceptance criteria</h3><div className="check-list">{lesson.acceptance.map((item,i)=><label key={item}><input type="checkbox" checked={!!progress.checklist[i]} onChange={()=>toggleCheck(i)}/><span>{item}</span></label>)}</div>{lesson.expectedOutput&&<><h3>ผลลัพธ์ที่คาดหวัง</h3><pre><code>{lesson.expectedOutput}</code></pre></>}<div className="hint-box"><div><strong>Hint {Math.min(hintCount+1,3)}/3</strong><button onClick={()=>setHintCount(c=>Math.min(3,c+1))}>{hintCount===0?"เปิด Hint แรก":"ช่วยเพิ่มอีกขั้น"}</button></div>{lesson.hints.slice(0,hintCount).map((h,i)=><p key={h}><b>{i+1}</b>{h}</p>)}</div><details open={showSolution} onToggle={e=>setShowSolution((e.currentTarget as HTMLDetailsElement).open)}><summary onClick={()=>patchProgress({solutionViewed:true})}>ดูตัวอย่างคำตอบ (เลือกเปิดเอง)</summary><pre><code>{lesson.solution}</code></pre><p className="muted">การเปิดคำตอบไม่ทำให้ได้ XP และการผ่านซ้ำไม่เพิ่ม XP</p></details></div>;
  const editorContent=<div className="editor-block"><div className="editor-head"><div><span className="dot red"/><span className="dot amber"/><span className="dot green"/><strong>{lesson.track==="java"?"Main.java":"solution.js"}</strong><em>{lesson.track==="java"?"Java":"JavaScript"}</em></div><span className={`save-inline ${saveState}`}>{saveState==="saving"?"กำลังบันทึก…":saveState==="error"?"บันทึกไม่สำเร็จ":"บันทึกแล้ว"}</span></div><textarea className="code-editor" aria-label="พื้นที่เขียนโค้ด" spellCheck={false} value={progress.code} onKeyDown={indent} onChange={e=>patchProgress({code:e.target.value})}/><div className="runner-note"><ShieldCheck/><p>{lesson.checkMode==="auto"?"รันใน Web Worker แยกจาก UI ปิด network/import และหยุดเมื่อเกิน 1.5 วินาที ระบบตรวจ behavior ของฟังก์ชันจริง":"ระบบไม่อ้างว่าคอมไพล์โค้ดนี้ ให้รันในเครื่องและยืนยันหลักฐานด้วย checklist"}</p></div><div className="editor-actions">{lesson.checkMode==="auto"?<button className="run" onClick={run} disabled={running}><Play/>{running?"กำลังทดสอบ":"Run tests"}</button>:<button className="run" onClick={selfComplete} disabled={!lesson.acceptance.every((_,i)=>progress.checklist[i])}><Check/>ยืนยันตรวจในเครื่อง</button>}<span>{lesson.checkMode==="local-java"?"JDK 21 · javac Main.java → java Main":lesson.checkMode==="auto"?`${lesson.tests?.length??0} test cases · จำกัด 1.5s`:"ตรวจด้วยหลักฐาน"}</span></div></div>;
  const resultContent=<div className="result-block"><div className="panel-title"><div><span className="eyebrow">ผลตรวจล่าสุด</span><h2>{progress.lastResult?.passed?"ผ่านเงื่อนไขรอบนี้":progress.lastResult?"ยังมี test ที่ไม่ผ่าน":"พร้อมรับผลการทดสอบ"}</h2></div>{progress.lastResult?.details.length?<strong>{progress.lastResult.details.filter(result=>result.passed).length}/{progress.lastResult.details.length}</strong>:null}</div>{progress.lastResult?.details.length?<div className="test-results">{progress.lastResult.details.map(result=><article className={result.passed?"pass":"fail"} key={result.name}><div>{result.passed?<Check/>:<X/>}<strong>{result.name}</strong></div><dl><dt>expected</dt><dd>{result.expected}</dd><dt>actual</dt><dd>{result.actual}</dd>{result.error&&<><dt>error</dt><dd>{result.error}</dd></>}</dl></article>)}</div>:progress.lastResult?.passed?<div className="self-proof"><Check/><h3>ตรวจตาม acceptance criteria ครบแล้ว</h3><p>สถานะนี้คือ “ตรวจด้วยตัวเอง” ไม่ใช่ผลยืนยันจาก runner ของเว็บไซต์</p></div>:<div className="result-empty"><CircleDot/><p>ยังไม่มีผลตรวจ กด Run tests หรือยืนยัน checklist หลังทดลองในเครื่อง</p></div>}<section className="reflection"><h3>สะท้อนความเข้าใจ</h3><p>{lesson.reflection}</p><textarea value={progress.reflection} onChange={e=>patchProgress({reflection:e.target.value})} placeholder="เขียนด้วยคำของซีเอง…"/></section>{progress.status==="passed"&&<div className="completion-card"><PixelCat variant="celebrate"/><div><span className="eyebrow">Mission complete</span><h3>เพิ่มหลักฐานให้ {lesson.skillIds.length} ทักษะแล้ว</h3><p>{lesson.xp} XP ได้จากการผ่านครั้งแรก การรันซ้ำจะไม่เพิ่มรางวัล</p>{next&&<button className="primary" onClick={()=>openLesson(next.id)}>ไปบทถัดไป <ChevronRight/></button>}</div></div>}</div>;
  const notesContent=<div className="notes-block"><span className="eyebrow">Private field notes</span><h2>บันทึกระหว่างเรียน</h2><p>จด hypothesis, error message หรือสิ่งที่จะกลับมาทดลอง ข้อมูลบันทึกอัตโนมัติใน browser นี้</p><textarea className="notes-editor" value={progress.notes} onChange={e=>patchProgress({notes:e.target.value})} placeholder="ฉันสังเกตว่า…"/><div className="bonus"><Sparkles/><div><strong>Bonus challenge</strong><p>{lesson.bonus}</p></div></div></div>;
  const mobilePanel=tab==="lesson"?lessonContent:tab==="task"?taskContent:tab==="code"?editorContent:tab==="result"?resultContent:notesContent;
  return <div className={`lesson-page lesson-v2 ${focusMode?"focus-mode":""}`}><header className="lesson-header-v2"><div><button className="back-link" onClick={onExit} aria-label="กลับไปแผนที่"><ChevronLeft aria-hidden="true"/> Lab / {lesson.module}</button><div><span className={`track-tag ${lesson.track}`}>{lesson.track==="java"?"JAVA & OOP":"FULL-STACK"}</span><span className="lesson-time">{lesson.minutes} นาที · {lesson.xp} XP ครั้งแรก</span></div><h1>{lesson.title}</h1><p>{lesson.objective}</p></div><div className="lesson-header-actions"><div className="lesson-status" aria-live="polite">{progress.status==="passed"?<><Check aria-hidden="true"/> ผ่านแล้ว</>:<><CircleDot aria-hidden="true"/> {progress.attempts?`ลองแล้ว ${progress.attempts} ครั้ง`:"กำลังเรียน"}</>}</div><button className="focus-toggle" aria-pressed={focusMode} onClick={()=>setFocusMode(value=>!value)}>{focusMode?<Minimize2/>:<Maximize2/>}{focusMode?"ออกจาก Focus":"Focus mode"}</button></div></header>
    <div className="lesson-session-bar"><details><summary><Clock3/>แผนฝึก 60 นาที</summary><ol><li><b>05</b> ทบทวน</li><li><b>15</b> เรียนแนวคิด</li><li><b>30</b> ลงมือเขียน</li><li><b>10</b> ทดสอบ + บันทึก</li></ol></details><span><ShieldCheck/>{lesson.checkMode==="auto"?"ตรวจอัตโนมัติ":lesson.checkMode==="local-java"?"ตรวจ Java ในเครื่อง":"หลักฐาน + เช็กลิสต์"}</span><span>{progress.attempts} attempts</span></div>
    <div className="lesson-mobile-tabs" role="tablist">{([["lesson","บทเรียน"],["task","โจทย์"],["code","โค้ด"],["result","ผลตรวจ"],["notes","บันทึก"]] as const).map(([id,label])=><button role="tab" aria-selected={tab===id} key={id} onClick={()=>setTab(id)}>{label}{id==="result"&&progress.lastResult?<i className={progress.lastResult.passed?"ok":"bad"}/>:null}</button>)}</div>
    <div className="lesson-workbench"><article className="lesson-study-pane">{lessonContent}<hr/>{taskContent}</article><aside className="lesson-practice-pane">{editorContent}{resultContent}{notesContent}</aside></div>
    <article className="lesson-mobile-panel">{mobilePanel}</article>
  </div>;
}
