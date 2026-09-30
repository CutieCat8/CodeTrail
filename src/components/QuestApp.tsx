"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, BookOpen, Braces, Check, ChevronLeft, ChevronRight, CircleDot, Clock3, Code2, Download, FlaskConical, FolderGit2, Gauge, Layers3, LayoutDashboard, LockKeyhole, Map, Menu, NotebookPen, Play, Route, Search, Settings, ShieldCheck, Sparkles, Target, Trophy, Upload, X } from "lucide-react";
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
  return <div className="micro-workspace"><header className="micro-header"><button onClick={onExit}><ChevronLeft/>คอร์สทั้งหมด</button><div><span className="eyebrow">{course?.title} · {step.unit}</span><h1>{step.title}</h1><p>{step.objective}</p></div><div className="step-position"><strong>{step.position}</strong><span>/ {courseSteps.length}</span></div></header><div className="micro-layout"><aside className="micro-rail"><span className={`kind ${step.kind}`}>{step.kind}</span><strong>{step.minutes} นาที</strong><p>ทำความเข้าใจทีละหนึ่งเรื่อง ไม่ต้องรีบผ่าน</p><div className="rail-nav"><button disabled={!previous} onClick={()=>previous&&openStep(previous.id)}><ChevronLeft/>ก่อนหน้า</button><button disabled={!next} onClick={()=>next&&openStep(next.id)}>ถัดไป<ChevronRight/></button></div></aside><main className="micro-content">{step.body.map(p=><p className="teaching-copy" key={p}>{p}</p>)}{step.vocabulary.length>0&&<dl className="vocabulary">{step.vocabulary.map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>}{step.code&&<pre><code>{step.code}</code></pre>}{step.starter&&<><h2>Starter code</h2><pre><code>{step.starter}</code></pre></>}{step.prompt&&<section className="micro-task"><span className="eyebrow">YOUR TURN</span><h2>{step.prompt}</h2><textarea value={saved.answer} onChange={e=>update({answer:e.target.value})} placeholder={step.kind==='practice'||step.kind==='debug'?"เขียนโค้ดและเหตุผลของซีที่นี่…":"ตอบก่อนเปิดแนวทาง…"}/><div className="task-actions"><button className="secondary" onClick={()=>{setRevealed(true);update({answerRevealed:true})}}>เปิดแนวทางเมื่อพยายามแล้ว</button><button className="primary" onClick={()=>update({completed:true})} disabled={!saved.answer.trim()}>บันทึกและผ่าน step <Check/></button></div>{revealed&&<div className="reveal"><strong>แนวทางตรวจคำตอบ</strong><pre><code>{step.reveal}</code></pre><p>เทียบเหตุผลและ behavior ไม่จำเป็นต้องเขียนเหมือนตัวอย่างทุกตัวอักษร</p></div>}</section>}<section className="step-notes"><h2>Field notes</h2><textarea value={saved.notes} onChange={e=>update({notes:e.target.value})} placeholder="สิ่งที่เข้าใจ / จุดที่ยังสงสัย / error ที่พบ…"/></section>{saved.completed&&<div className="step-complete"><Check/><div><strong>บันทึกหลักฐานแล้ว</strong><p>ผ่านครั้งแรกเท่านั้นที่นับความคืบหน้า กลับมาแก้คำตอบได้เสมอ</p></div>{next&&<button className="primary" onClick={()=>openStep(next.id)}>ไป step ถัดไป<ChevronRight/></button>}</div>}</main></div></div>;
}

function LearningMap({ data, openLesson }: { data: AppData; openLesson: (id: string) => void }) {
  return <div className="page"><div className="page-heading"><span className="eyebrow">10 WORLDS · 22 LIVE LESSONS</span><h1>แผนที่การเรียน</h1><p>เส้นทาง Java เริ่มได้ทันทีโดยไม่ต้องผ่านเว็บ การล็อกเป็นคำแนะนำ—ซีข้ามได้เมื่อมีพื้นฐานแล้ว</p></div><div className="world-list">{modules.map(([name, track, desc], index) => { const moduleLessons = lessons.filter((l) => l.module === name); const passed = moduleLessons.filter((l) => data.progress[l.id]?.status === "passed").length; return <section className="world" key={name}><div className={`world-marker ${track}`}><span>{String(index+1).padStart(2,"0")}</span></div><div className="world-main"><div className="world-head"><div><span className="track-tag">{track === "java" ? "JAVA ROUTE" : "WEB ROUTE"}</span><h2>{name}</h2><p>{desc}</p></div><div className="world-stats"><strong>{moduleLessons.length ? `${passed}/${moduleLessons.length}` : "วางแผนไว้"}</strong><span>{moduleLessons.length ? `${moduleLessons.reduce((s,l)=>s+l.minutes,0)} นาที` : "ยังไม่มีปุ่มเริ่ม"}</span></div></div>{moduleLessons.length > 0 && <div className="lesson-road">{moduleLessons.map((lesson) => { const p=data.progress[lesson.id]; return <button key={lesson.id} onClick={() => openLesson(lesson.id)} className={p?.status === "passed" ? "passed" : p ? "active" : ""} title={accessReason(data,lesson)}><span>{p?.status === "passed" ? <Check /> : <CircleDot />}</span><div><strong>{lesson.order}. {lesson.title}</strong><small>{lesson.minutes} นาที · {lesson.checkMode === "auto" ? "ตรวจอัตโนมัติ" : lesson.checkMode === "local-java" ? "ตรวจในเครื่อง" : "เช็กลิสต์"}</small></div><ChevronRight /></button>;})}</div>}</div></section>})}</div><section className="planned"><span className="eyebrow">JAVA · PHASE 2</span><h2>วางแผนไว้</h2><div>{plannedJava.map((item) => <span key={item}><LockKeyhole size={14}/>{item}</span>)}</div></section></div>;
}

function ChallengeLibrary({ data, openLesson }: { data: AppData; openLesson: (id:string)=>void }) {
  const [query,setQuery]=useState(""); const [track,setTrack]=useState("all"); const [mode,setMode]=useState("all");
  const filtered=lessons.filter(l => (track==="all"||l.track===track)&&(mode==="all"||l.checkMode===mode)&&(l.title.toLowerCase().includes(query.toLowerCase())||l.concepts.join(" ").toLowerCase().includes(query.toLowerCase())));
  return <div className="page"><div className="page-heading"><span className="eyebrow">PRACTICE ARCHIVE</span><h1>คลังโจทย์</h1><p>ค้นจากชื่อหรือแนวคิด แล้วเลือกวิธีตรวจที่ตรงกับงานจริง</p></div><div className="filters"><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ค้นหา เช่น validation, class, JOIN" /></label><select aria-label="เส้นทาง" value={track} onChange={e=>setTrack(e.target.value)}><option value="all">ทุกเส้นทาง</option><option value="web">Full-stack</option><option value="java">Java</option></select><select aria-label="วิธีตรวจ" value={mode} onChange={e=>setMode(e.target.value)}><option value="all">ทุกวิธีตรวจ</option><option value="auto">ตรวจอัตโนมัติ</option><option value="self">เช็กลิสต์</option><option value="local-java">Java ในเครื่อง</option></select></div><div className="challenge-list">{filtered.map(l=><button key={l.id} onClick={()=>openLesson(l.id)}><span className={`challenge-glyph ${l.track}`}>{l.track==="java"?<Braces/>:<Code2/>}</span><div><div><span className={`track-tag ${l.track}`}>{l.module}</span>{data.progress[l.id]?.status==="passed"&&<span className="passed-label"><Check/> ผ่านแล้ว</span>}</div><h2>{l.title}</h2><p>{l.prompt}</p><small>{l.minutes} นาที · {l.checkMode==="auto"?"ระบบทดสอบพฤติกรรม":l.checkMode==="local-java"?"ตรวจในเครื่องด้วยตัวเอง":"ตรวจด้วยหลักฐานและเช็กลิสต์"}</small></div><ChevronRight/></button>)}</div>{filtered.length===0&&<div className="empty-search">ไม่พบโจทย์ ลองลดตัวกรองหรือใช้คำค้นอื่น</div>}</div>;
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
  const [tab,setTab]=useState<"lesson"|"task"|"code"|"result"|"notes">("lesson"); const [hintCount,setHintCount]=useState(0); const [showSolution,setShowSolution]=useState(false); const [running,setRunning]=useState(false);
  const progress=data.progress[lesson.id]??newProgress(lesson.id,lesson.starterCode);
  useEffect(()=>{if(!data.progress[lesson.id])setData(d=>({...d,lastLessonId:lesson.id,progress:{...d.progress,[lesson.id]:newProgress(lesson.id,lesson.starterCode)}}));},[lesson.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const patchProgress=(patch:Partial<LessonProgress>)=>setData(d=>{const current=d.progress[lesson.id]??newProgress(lesson.id,lesson.starterCode);return{...d,lastLessonId:lesson.id,progress:{...d.progress,[lesson.id]:{...current,...patch,updatedAt:new Date().toISOString()}}}});
  const run=async()=>{if(!lesson.tests||!lesson.functionName)return;setRunning(true);const results=await runIsolatedTests(progress.code,lesson.functionName,lesson.tests);const passed=results.every(r=>r.passed);patchProgress({attempts:progress.attempts+1,lastResult:{passed,at:new Date().toISOString(),details:results},status:passed?"passed":"in-progress",completedAt:passed?(progress.completedAt??new Date().toISOString()):undefined});setRunning(false);setTab("result");};
  const toggleCheck=(i:number)=>{const checks=lesson.acceptance.map((_,idx)=>idx===i?!progress.checklist[idx]:!!progress.checklist[idx]);patchProgress({checklist:checks});};
  const selfComplete=()=>{const all=lesson.acceptance.every((_,i)=>progress.checklist[i]); if(!all)return;patchProgress({status:"passed",completedAt:progress.completedAt??new Date().toISOString(),attempts:progress.attempts+1,lastResult:{passed:true,at:new Date().toISOString(),details:[]}});setTab("result");};
  const next=lessons.find(l=>l.track===lesson.track&&l.order===lesson.order+1);
  return <div className="lesson-page"><div className="lesson-header"><div><button className="back-link" onClick={onExit} aria-label="กลับไปแผนที่"><ChevronRight aria-hidden="true"/> แผนที่ / {lesson.module}</button><div><span className={`track-tag ${lesson.track}`}>{lesson.track==="java"?"JAVA & OOP":"FULL-STACK"}</span><span className="lesson-time">{lesson.minutes} นาที · {lesson.xp} XP ครั้งแรก</span></div><h1>{lesson.title}</h1><p>{lesson.objective}</p></div><div className="lesson-status" aria-live="polite">{progress.status==="passed"?<><Check aria-hidden="true"/> ผ่านแล้ว</>:<><CircleDot aria-hidden="true"/> {progress.attempts?`ลองแล้ว ${progress.attempts} ครั้ง`:"กำลังเรียน"}</>}</div></div>
    <div className="lesson-tabs" role="tablist">{([["lesson","บทเรียน"],["task","โจทย์"],["code","โค้ด"],["result","ผลทดสอบ"],["notes","บันทึก"]] as const).map(([id,label])=><button role="tab" aria-selected={tab===id} key={id} onClick={()=>setTab(id)}>{label}{id==="result"&&progress.lastResult?<i className={progress.lastResult.passed?"ok":"bad"}/>:null}</button>)}</div>
    <div className="workspace">
      <article className="lesson-reading">
        {tab==="lesson"&&<><section className="outcome"><Target/><div><strong>หลังบทนี้ ซีจะ…</strong><p>{lesson.objective}</p></div></section><section><h2>ทำไมใช้ในงานจริง</h2><p>{lesson.realWorld}</p></section><section><h2>Prerequisite</h2><p>{lesson.prerequisites.length?lesson.prerequisites.map(id=>lessonById(id)?.title).join(" → "):"เริ่มได้ทันที ไม่ต้องผ่านเส้นทางอื่น"}</p></section><section><h2>แนวคิดสำคัญ</h2><div className="concepts">{lesson.concepts.map(c=><span key={c}>{c}</span>)}</div>{lesson.explanation.map(p=><p key={p}>{p}</p>)}</section><section><h2>ตัวอย่างที่รันได้</h2><pre><code>{lesson.example}</code></pre><ul>{lesson.exampleNotes.map(n=><li key={n}>{n}</li>)}</ul></section><section className="mistakes"><h2>จุดที่มักพลาด</h2><ul>{lesson.commonMistakes.map(m=><li key={m}>{m}</li>)}</ul></section><button className="primary" onClick={()=>setTab("task")}>ไปที่โจทย์ <ChevronRight/></button></>}
        {tab==="task"&&<><span className="eyebrow">FIELD ASSIGNMENT</span><h2>{lesson.prompt}</h2><h3>Acceptance criteria</h3><div className="check-list">{lesson.acceptance.map((item,i)=><label key={item}><input type="checkbox" checked={!!progress.checklist[i]} onChange={()=>toggleCheck(i)}/><span>{item}</span></label>)}</div>{lesson.expectedOutput&&<><h3>ผลลัพธ์ที่คาดหวัง</h3><pre><code>{lesson.expectedOutput}</code></pre></>}<div className="hint-box"><div><strong>Hint {Math.min(hintCount+1,3)}/3</strong><button onClick={()=>setHintCount(c=>Math.min(3,c+1))}>{hintCount===0?"เปิด Hint แรก":"ช่วยเพิ่มอีกขั้น"}</button></div>{lesson.hints.slice(0,hintCount).map((h,i)=><p key={h}><b>{i+1}</b>{h}</p>)}</div><details open={showSolution} onToggle={e=>setShowSolution((e.currentTarget as HTMLDetailsElement).open)}><summary onClick={()=>patchProgress({solutionViewed:true})}>ดูตัวอย่างคำตอบ (เลือกเปิดเอง)</summary><pre><code>{lesson.solution}</code></pre><p className="muted">การเปิดคำตอบไม่ทำให้ได้ XP และการผ่านซ้ำไม่เพิ่ม XP</p></details><button className="primary" onClick={()=>setTab("code")}>ลงมือเขียน <Code2/></button></>}
        {tab==="code"&&<><div className="editor-head"><div><span className="dot red"/><span className="dot amber"/><span className="dot green"/><strong>{lesson.track==="java"?"Main.java":"solution.js"}</strong></div><span className={`save-inline ${saveState}`}>{saveState==="saving"?"กำลังบันทึก…":saveState==="error"?"บันทึกไม่สำเร็จ":"บันทึกแล้ว"}</span></div><textarea className="code-editor" aria-label="พื้นที่เขียนโค้ด" spellCheck={false} value={progress.code} onChange={e=>patchProgress({code:e.target.value})}/><div className="runner-note"><ShieldCheck/><p>{lesson.checkMode==="auto"?"รันใน Web Worker แยกจาก UI ปิด network/import และหยุดเมื่อเกิน 1.5 วินาที ระบบตรวจผลลัพธ์ของฟังก์ชันจริง":"ระบบไม่อ้างว่าคอมไพล์โค้ดนี้: ให้รันในเครื่องและยืนยันหลักฐานด้วย checklist"}</p></div><div className="editor-actions">{lesson.checkMode==="auto"?<button className="run" onClick={run} disabled={running}><Play/>{running?"กำลังทดสอบ":"Run tests"}</button>:<button className="run" onClick={selfComplete} disabled={!lesson.acceptance.every((_,i)=>progress.checklist[i])}><Check/>ยืนยันตรวจในเครื่อง</button>}<span>{lesson.checkMode==="local-java"?"javac Main.java  →  java Main":""}</span></div></>}
        {tab==="result"&&<><span className="eyebrow">LATEST EVIDENCE</span><h2>{progress.lastResult?.passed?"ผ่านเงื่อนไขรอบนี้":"ผลการตรวจ"}</h2>{progress.lastResult?.details.length? <div className="test-results">{progress.lastResult.details.map(r=><article className={r.passed?"pass":"fail"} key={r.name}><div>{r.passed?<Check/>:<X/>}<strong>{r.name}</strong></div><dl><dt>expected</dt><dd>{r.expected}</dd><dt>actual</dt><dd>{r.actual}</dd>{r.error&&<><dt>error</dt><dd>{r.error}</dd></>}</dl></article>)}</div>:progress.lastResult?.passed?<div className="self-proof"><Check/><h3>ซีตรวจตาม acceptance criteria ครบแล้ว</h3><p>สถานะนี้คือ “ตรวจด้วยตัวเอง” ไม่ใช่ผลยืนยันจาก runner ของเว็บไซต์</p></div>:<div className="empty-inline"><p>ยังไม่มีผลตรวจ ไปที่แท็บโค้ดเพื่อ Run tests หรือยืนยัน checklist</p></div>}<section><h3>สะท้อนความเข้าใจ</h3><p>{lesson.reflection}</p><textarea value={progress.reflection} onChange={e=>patchProgress({reflection:e.target.value})} placeholder="เขียนด้วยคำของซีเอง…"/></section><section className="bonus"><Sparkles/><div><strong>Bonus challenge</strong><p>{lesson.bonus}</p></div></section>{progress.status==="passed"&&next&&<button className="primary" onClick={()=>openLesson(next.id)}>ไปบทถัดไป <ChevronRight/></button>}</>}
        {tab==="notes"&&<><span className="eyebrow">PRIVATE FIELD NOTES</span><h2>บันทึกระหว่างเรียน</h2><p>จด hypothesis, error message หรือสิ่งที่จะกลับมาทดลอง ข้อมูลบันทึกอัตโนมัติใน browser นี้</p><textarea className="notes-editor" value={progress.notes} onChange={e=>patchProgress({notes:e.target.value})} placeholder="ฉันสังเกตว่า…"/></>}
      </article>
      <aside className="lesson-side"><div><span className="eyebrow">SESSION PLAN</span><ol><li><b>05</b> ทบทวน</li><li><b>15</b> เรียนแนวคิด</li><li><b>30</b> ลงมือเขียน</li><li><b>10</b> ทดสอบ + บันทึก</li></ol></div><div><span className="eyebrow">CHECK MODE</span><strong>{lesson.checkMode==="auto"?"ตรวจอัตโนมัติ":lesson.checkMode==="local-java"?"ตรวจ Java ในเครื่อง":"หลักฐาน + เช็กลิสต์"}</strong><p>{lesson.checkMode==="local-java"?"ใช้ JDK 21: javac แล้ว java เว็บไซต์เก็บโค้ดและผลที่ซีบันทึก แต่ไม่มี Java runner":"ผลจะระบุสิ่งที่ระบบตรวจได้จริง"}</p></div><div><span className="eyebrow">ATTEMPTS</span><strong>{progress.attempts}</strong><p>XP ให้ครั้งแรกที่ผ่านเท่านั้น</p></div></aside>
    </div></div>;
}
