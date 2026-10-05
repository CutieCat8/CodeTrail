import type { TestSpec } from "@/types/domain";

export type StepKind = "concept" | "trace" | "practice" | "debug" | "checkpoint";

export type CodeLanguage = "javascript" | "typescript" | "node" | "java" | "shell" | "sql";

export type RichLesson = {
  hook: string;
  // Analogies are for hard ideas only: map each part to the real concept and say where the comparison breaks.
  analogy?: { title: string; text: string[]; mapping?: Array<[familiar: string, concept: string]>; limits?: string };
  explain: Array<{ heading: string; text: string[]; code?: string; output?: string }>;
  walkthrough: string[];
  pitfalls: string[];
  recap: string[];
  // Comprehension questions asked during the concept step, each with a model answer.
  checks?: Array<{ question: string; answer: string }>;
  traceHint?: string;
  // Three levels: direction → structure → almost the answer.
  practiceHints?: string[];
  acceptance?: string[];
  solutionNotes?: string[];
  reflection?: string[];
  extension?: string;
};

export type StepSection =
  | { kind: "hook" | "recap" | "pitfall" | "walkthrough" | "acceptance" | "reflection"; title: string; items: string[] }
  | { kind: "analogy" | "text"; title: string; items: string[]; mapping?: Array<[string, string]>; limits?: string; code?: string; output?: string }
  | { kind: "code"; title: string; output?: string }
  | { kind: "hints"; title: string; items: string[] }
  | { kind: "checks"; title: string; checks: Array<{ question: string; answer: string }> }
  | { kind: "prereq"; title: string; topicIds: string[] };

export type AutoCheck = {
  functionName: string;
  tests: TestSpec[];
  // Plausible wrong answers that the tests must reject; verified by tests/curriculum-quality.test.ts.
  wrongAnswers?: string[];
};

// For script-style practice (before functions are taught): Run tests compares the console output.
export type OutputCheck = {
  expected: string;
  // Plausible wrong scripts that must not produce the expected output.
  wrongAnswers?: string[];
};

export type TopicSource = {
  id: string;
  courseId: string;
  unit: string;
  title: string;
  objective: string;
  why: string;
  explanation: string;
  example: string;
  // Exact console output of `example`; checked by tests for JavaScript topics.
  expectedOutput?: string;
  tracePrompt: string;
  traceAnswer: string;
  starter: string;
  practicePrompt: string;
  solution: string;
  buggy: string;
  bugExplanation: string;
  vocabulary: Array<[term: string, meaning: string]>;
  language?: CodeLanguage;
  // npm packages the example/solution needs when run locally (verified outside the repo; see docs/COURSE-PROGRESS.md).
  requires?: string[];
  // Marks a topic rewritten to the lesson standard in docs/COURSE-PLAN.md; tests then require every part.
  standard?: "v3";
  // Topic IDs to review first; must exist and come earlier in the learning order.
  prerequisites?: string[];
  autoCheck?: AutoCheck;
  outputCheck?: OutputCheck;
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
  language?: CodeLanguage;
  check?: AutoCheck;
  outputCheck?: OutputCheck;
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
