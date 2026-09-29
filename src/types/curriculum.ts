export type StepKind = "concept" | "trace" | "practice" | "debug" | "checkpoint";

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
