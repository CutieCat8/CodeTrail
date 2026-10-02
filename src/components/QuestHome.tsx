"use client";

import type { Dispatch, SetStateAction } from "react";
import { BookOpen, ChevronRight, Clock3, Code2, Flame, FolderGit2, Layers3, Sparkles, Trophy } from "lucide-react";
import { curriculumCourses, learningSteps, stepById } from "@/content/curriculum";
import { lessonById, lessons } from "@/content/lessons";
import { stepRecommendation } from "@/lib/recommendation";
import { calculateStreak, xpTotal } from "@/lib/storage";
import { weeklyActivityCount } from "@/lib/activity";
import type { AppData, StudyMode } from "@/types/domain";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { ExpeditionBase } from "./ExpeditionArt";
import { PixelCat } from "./PixelCat";

type Props = {
  data: AppData;
  setData: Dispatch<SetStateAction<AppData>>;
  openLesson: (id: string) => void;
  openStep: (id: string) => void;
};

const modeOptions: [StudyMode, string][] = [["fullstack", "Full-stack"], ["java", "Java & OOP"], ["mixed", "ผสมสองเส้นทาง"]];
const fullstackCourseIds = new Set(["developer-foundations", "web-platform-foundations", "javascript-foundations", "node-foundations"]);
const javaCourseIds = new Set(["java-foundations", "java-oop"]);

export function QuestHome({ data, setData, openLesson, openStep }: Props) {
  const recommended = stepRecommendation(data);
  const passedLessons = Object.values(data.progress).filter((progress) => progress.status === "passed").length;
  const completedSteps = Object.values(data.stepProgress).filter((progress) => progress.completed).length;
  const streak = calculateStreak(data);
  const xpMap = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson.xp]));
  const xp = xpTotal(data, xpMap);
  const level = Math.floor(xp / 500) + 1;
  const lastStep = data.lastStepId ? stepById(data.lastStepId) : undefined;
  const lastLesson = data.lastLessonId ? lessonById(data.lastLessonId) : undefined;
  const isMixedMode = data.mode === "mixed";
  const resumableStep = lastStep && (data.mode === "fullstack" ? fullstackCourseIds : javaCourseIds).has(lastStep.courseId)
    ? lastStep
    : undefined;
  const resumableLesson = lastLesson && lastLesson.track === (data.mode === "java" ? "java" : "web")
    ? lastLesson
    : undefined;
  const isMixedMission = isMixedMode && recommended.companionStep;
  const continueTitle = isMixedMode
    ? `ภารกิจผสม: ${recommended.step.title}`
    : resumableStep?.title ?? resumableLesson?.title ?? recommended.step.title;
  const continueCourse = isMixedMission
    ? `เส้นทางผสม · ${recommended.course?.title} + ${recommended.companionCourse?.title}`
    : resumableStep
    ? curriculumCourses.find((course) => course.id === resumableStep.courseId)?.title
    : resumableLesson?.module ?? recommended.course?.title;
  const continueMinutes = isMixedMode
    ? recommended.step.minutes
    : resumableStep?.minutes ?? resumableLesson?.minutes ?? recommended.step.minutes;
  const openContinue = () => isMixedMode
    ? openStep(recommended.step.id)
    : resumableStep ? openStep(resumableStep.id) : resumableLesson ? openLesson(resumableLesson.id) : openStep(recommended.step.id);
  const totalLearningItems = lessons.length + learningSteps.length;
  const completedItems = passedLessons + completedSteps;
  const progressPercent = totalLearningItems ? Math.round((completedItems / totalLearningItems) * 100) : 0;
  const project = data.projectProgress?.["friends-activity-planner"];
  const projectChecks = project?.checklist.filter(Boolean).length ?? 0;
  const today = new Intl.DateTimeFormat("th-TH", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Bangkok" }).format(new Date());

  return <div className="page home-page">
    <section className="home-greeting">
      <PixelCat variant="welcome" decorative />
      <div className="home-speech"><span>{today}</span><strong>{streak ? `กลับมาเดินทางต่อเป็นวันที่ ${streak} แล้วนะ ซี` : "พร้อมเริ่มภารกิจแรกหรือยัง ซี?"}</strong><p>{streak ? "คำตอบและบันทึกครั้งล่าสุดยังอยู่ครบ เลือกภารกิจเดียวแล้วไปต่อได้เลย" : "เริ่มจากบทสั้นหนึ่งบท แล้วฐานฝึกจะจำจุดที่ค้างไว้ให้"}</p></div>
    </section>

    <div className="home-layout">
      <div className="home-main-column">
        <section className="continue-quest">
          <div className="continue-art"><ExpeditionBase /></div>
          <div className="continue-overlay" />
          <div className="continue-copy">
            <div className="continue-progress"><span><i style={{ width: `${progressPercent}%` }}/></span><b>{progressPercent}%</b></div>
            <span className={`track-tag ${recommended.course?.track === "java" ? "java" : ""}`}>กลับไปเรียนต่อ · {continueCourse}</span>
            <h1>{continueTitle}</h1>
            <p>{isMixedMode ? recommended.reason : resumableStep || resumableLesson ? "กลับไปยังคำตอบและ Field notes ที่บันทึกไว้" : recommended.reason}</p>
            <div className="continue-meta"><span><Clock3 /> ขั้นนี้ {continueMinutes} นาที</span><span><Layers3 /> {isMixedMission ? `ถัดไป ${recommended.companionCourse?.title}` : resumableStep ? "Micro-step" : resumableLesson ? "Lab" : recommended.step.kind}</span></div>
            <div className="continue-actions"><button className="primary" onClick={openContinue}>{isMixedMode ? "เริ่มขั้นนี้" : "เรียนต่อ"} <ChevronRight /></button>{!isMixedMode && <button className="home-quiet-action" onClick={() => openStep(recommended.step.id)}>ภารกิจแนะนำวันนี้</button>}</div>
          </div>
        </section>

        <ActivityHeatmap data={data} />
      </div>

      <aside className="home-side-column" aria-label="ข้อมูลผู้เรียน">
        <section className="profile-card">
          <div className="profile-identity"><div className="profile-avatar"><PixelCat variant="study" decorative /></div><div><span>DEVELOPER EXPLORER</span><h2>Sea</h2><p>Digital Industry Integration · CAMT</p></div></div>
          <div className="profile-stats">
            <div><Trophy /><span><strong>{xp}</strong><small>Total XP</small></span></div>
            <div><Sparkles /><span><strong>Level {level}</strong><small>Journey level</small></span></div>
            <div><BookOpen /><span><strong>{passedLessons}</strong><small>บท Lab ผ่านแล้ว</small></span></div>
            <div><Flame /><span><strong>{streak}</strong><small>Day streak</small></span></div>
          </div>
          <div className="profile-mode"><span>เส้นทางที่ใช้จัดภารกิจ</span><div>{modeOptions.map(([mode,label]) => <button key={mode} aria-pressed={data.mode === mode} onClick={() => setData((current) => ({ ...current, mode }))}>{label}</button>)}</div></div>
        </section>

        <section className="home-project-card">
          <div className="home-project-head"><FolderGit2 /><span><small>PROJECT IN PROGRESS</small><strong>Friends Activity Planner</strong></span></div>
          <p>{project ? "มีหลักฐานโปรเจกต์บันทึกอยู่ กลับไปต่อจาก milestone ล่าสุดได้" : "เชื่อมบทเว็บแต่ละบทเป็นระบบวางแผนกิจกรรมสำหรับเพื่อน 9 คน"}</p>
          <div className="home-project-progress"><span><i style={{ width: `${Math.round(projectChecks / 4 * 100)}%` }}/></span><small>{projectChecks}/4 milestones</small></div>
          <div className="home-project-links"><span className={project?.repositoryUrl ? "ready" : ""}><Code2 /> Repository {project?.repositoryUrl ? "แนบแล้ว" : "ยังไม่แนบ"}</span></div>
        </section>

        <section className="weekly-mini-card">
          <div><span className="eyebrow">Weekly target</span><strong>{Math.min(weeklyActivityCount(data), data.weeklyGoal)}/{data.weeklyGoal} กิจกรรมสัปดาห์นี้</strong></div>
          <input aria-label="เป้าหมายต่อสัปดาห์" type="range" min="1" max="14" value={data.weeklyGoal} onChange={(event) => setData((current) => ({ ...current, weeklyGoal: Number(event.target.value) }))}/>
        </section>
      </aside>
    </div>
  </div>;
}
