export type Track = "web" | "java";
export type StudyMode = "fullstack" | "java" | "mixed";
export type CheckMode = "auto" | "self" | "local-java";
export type LessonStatus = "not-started" | "in-progress" | "passed" | "review";

export type TestSpec = {
  name: string;
  args: unknown[];
  expected: unknown;
};

export type Lesson = {
  id: string;
  order: number;
  track: Track;
  module: string;
  title: string;
  minutes: number;
  xp: number;
  skillIds: string[];
  objective: string;
  realWorld: string;
  prerequisites: string[];
  concepts: string[];
  explanation: string[];
  example: string;
  exampleNotes: string[];
  commonMistakes: string[];
  prompt: string;
  acceptance: string[];
  starterCode: string;
  expectedOutput?: string;
  hints: [string, string, string];
  solution: string;
  reflection: string;
  bonus: string;
  checkMode: CheckMode;
  functionName?: string;
  tests?: TestSpec[];
};

export type LessonProgress = {
  lessonId: string;
  code: string;
  notes: string;
  reflection: string;
  checklist: boolean[];
  status: LessonStatus;
  attempts: number;
  lastResult?: { passed: boolean; at: string; details: TestResult[] };
  updatedAt: string;
  completedAt?: string;
  solutionViewed?: boolean;
};

export type TestResult = {
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  learned: string;
  bug: string;
  fix: string;
  unclear: string;
  link: string;
  lessonId?: string;
  updatedAt: string;
};

export type RoadmapMark = "learning" | "done" | "skip";

export type ProjectProgress = {
  repositoryUrl: string;
  demoUrl: string;
  checklist: boolean[];
  updatedAt: string;
};

export type AppData = {
  version: 1;
  mode: StudyMode;
  weeklyGoal: number;
  progress: Record<string, LessonProgress>;
  journal: JournalEntry[];
  lastLessonId?: string;
  stepProgress: Record<string, import("./curriculum").StepProgress>;
  lastStepId?: string;
  roadmapMarks?: Record<string, RoadmapMark>;
  projectProgress?: Record<string, ProjectProgress>;
};
