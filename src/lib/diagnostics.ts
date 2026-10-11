import { diagnosticPracticeStepId, diagnosticQuestions, diagnosticVersion } from "@/content/diagnostics";

export type DiagnosticResult = {
  schemaVersion: 1;
  answers: Record<string, string>;
  completedAt: string;
  recommendedStepId: string;
};

export function completeDiagnostic(answers: Record<string, string>, completedAt = new Date().toISOString()): DiagnosticResult | null {
  if (!diagnosticQuestions.every(question => Object.hasOwn(answers, question.id) && (answers[question.id] === "unsure" || question.options.some(option => option.id === answers[question.id])))) return null;
  if (!isCanonicalTimestamp(completedAt)) return null;
  const snapshot = Object.fromEntries(diagnosticQuestions.map(question => [question.id, answers[question.id]]));
  const gap = diagnosticQuestions.find(question => snapshot[question.id] !== question.correctOptionId);
  return { schemaVersion: diagnosticVersion, answers: snapshot, completedAt, recommendedStepId: gap?.reviewStepId ?? diagnosticPracticeStepId };
}

function isCanonicalTimestamp(value: string): boolean {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}

export function isDiagnosticResult(value: unknown): value is DiagnosticResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const result = value as Record<string, unknown>;
  if (result.schemaVersion !== diagnosticVersion || typeof result.completedAt !== "string" || typeof result.recommendedStepId !== "string") return false;
  if (!result.answers || typeof result.answers !== "object" || Array.isArray(result.answers)) return false;
  const entries = Object.entries(result.answers);
  if (entries.length !== diagnosticQuestions.length || entries.some(([, answer]) => typeof answer !== "string")) return false;
  const rebuilt = completeDiagnostic(result.answers as Record<string, string>, result.completedAt);
  return rebuilt !== null && rebuilt.recommendedStepId === result.recommendedStepId;
}

export function diagnosticScore(result: DiagnosticResult): number {
  return diagnosticQuestions.filter(question => result.answers[question.id] === question.correctOptionId).length;
}
