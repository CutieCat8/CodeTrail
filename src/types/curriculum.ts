export type StepKind = "concept" | "trace" | "practice" | "debug" | "checkpoint";

export type RichLesson = {
  hook: string;
  analogy: { title: string; text: string[] };
  explain: Array<{ heading: string; text: string[] }>;
  walkthrough: string[];
  pitfalls: string[];
  recap: string[];
  traceHint?: string;
  practiceHints?: string[];
};

export type StepSection =
  | { kind: "hook" | "recap" | "pitfall" | "walkthrough"; title: string; items: string[] }
  | { kind: "analogy" | "text"; title: string; items: string[] }
  | { kind: "code"; title: string }
  | { kind: "hints"; title: string; items: string[] };

export type TopicSource = {
  id: string;
  courseId: string;
  unit: string;
  title: string;
  objective: string;
  why: string;
  explanation: string;
  example: string;
  tracePrompt: string;
  traceAnswer: string;
  starter: string;
  practicePrompt: string;
  solution: string;
  buggy: string;
  bugExplanation: string;
  vocabulary: Array<[term: string, meaning: string]>;
  lesson?: RichLesson;
};

export type LearningStep = {
  id: string;
  topicId: string;
  courseId: string;
  unit: string;
  position: number;
  kind: StepKind;
  title: string;
  objective: string;
  minutes: number;
  body: string[];
  code?: string;
  prompt?: string;
  reveal?: string;
  starter?: string;
  sections?: StepSection[];
  vocabulary: Array<[term: string, meaning: string]>;
};

export type CurriculumCourse = {
  id: string;
  title: string;
  description: string;
  track: "foundation" | "web" | "java";
  status: "live" | "writing" | "planned";
  targetSteps: number;
};

export type StepProgress = {
  stepId: string;
  answer: string;
  notes: string;
  completed: boolean;
  updatedAt: string;
  answerRevealed?: boolean;
};
