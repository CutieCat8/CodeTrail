import { emptyData, importAppData, normalizeAppData, serializeAppData } from "@/lib/storage";
import { describe, expect, it } from "vitest";
import { diagnosticPracticeStepId, diagnosticQuestions } from "@/content/diagnostics";
import { learningSteps } from "@/content/curriculum";
import { completeDiagnostic, diagnosticScore, isDiagnosticResult } from "@/lib/diagnostics";

const timestamp = "2026-10-11T12:00:00.000Z";
const correctAnswers = () => Object.fromEntries(diagnosticQuestions.map(question => [question.id, question.correctOptionId]));

describe("pre-learning diagnostic", () => {
  it("links every recommendation to existing authored content", () => {
    for (const id of [...diagnosticQuestions.map(question => question.reviewStepId), diagnosticPracticeStepId]) {
      expect(learningSteps.some(step => step.id === id), id).toBe(true);
    }
    expect(new Set(diagnosticQuestions.map(question => question.id)).size).toBe(diagnosticQuestions.length);
  });

  it("requires every known question and valid option before producing a result", () => {
    expect(completeDiagnostic({}, timestamp)).toBeNull();
    expect(completeDiagnostic({ ...correctAnswers(), "dev-save": "invented" }, timestamp)).toBeNull();
    expect(completeDiagnostic(correctAnswers(), "not-a-date")).toBeNull();
  });

  it("recommends the first gap and treats uncertainty as a review opportunity", () => {
    const answers = { ...correctAnswers(), "web-label": "unsure", "java-division": "decimal" };
    const result = completeDiagnostic(answers, timestamp)!;
    expect(result.recommendedStepId).toBe("web-forms-concept");
    expect(diagnosticScore(result)).toBe(6);
    expect(isDiagnosticResult(result)).toBe(true);
  });

  it("suggests practice for correct answers without granting completion or XP", () => {
    const answers = correctAnswers();
    const before = structuredClone(answers);
    const result = completeDiagnostic(answers, timestamp)!;
    expect(result.recommendedStepId).toBe(diagnosticPracticeStepId);
    expect(diagnosticScore(result)).toBe(8);
    expect(answers).toEqual(before);
    expect(Object.keys(result).sort()).toEqual(["answers", "completedAt", "recommendedStepId", "schemaVersion"]);
    answers["dev-save"] = "run";
    expect(result.answers["dev-save"]).toBe("saved");
  });

  it("round trips results without changing learning progress and rejects invalid imports before saving", () => {
    const data = { ...emptyData(), diagnosticResult: completeDiagnostic(correctAnswers(), timestamp)! };
    expect(normalizeAppData(JSON.parse(serializeAppData(data)))).toEqual({ ...data, projectProgress: {} });
    const previous = serializeAppData(data);
    let saved = false;
    const invalid = { ...data, diagnosticResult: { ...data.diagnosticResult, recommendedStepId: "missing" } };
    expect(importAppData(JSON.stringify(invalid), () => { saved = true; }).ok).toBe(false);
    expect(saved).toBe(false);
    expect(serializeAppData(data)).toBe(previous);
    expect(data.progress).toEqual({});
    expect(data.stepProgress).toEqual({});
    expect(data.activityEvents).toEqual([]);
  });

  it("rejects corrupt imports and forged recommendations", () => {
    const result = completeDiagnostic(correctAnswers(), timestamp)!;
    expect(isDiagnosticResult({ ...result, schemaVersion: 2 })).toBe(false);
    expect(isDiagnosticResult({ ...result, recommendedStepId: "java-jdk-concept" })).toBe(false);
    expect(isDiagnosticResult({ ...result, completedAt: "2026-02-30T12:00:00.000Z" })).toBe(false);
    expect(isDiagnosticResult({ ...result, answers: { ...result.answers, unknown: "yes" } })).toBe(false);
    expect(isDiagnosticResult({ ...result, answers: { ...result.answers, "dev-save": 2 } })).toBe(false);
    expect(isDiagnosticResult({ ...result, answers: { ...result.answers, "dev-save": "invented" } })).toBe(false);
    expect(isDiagnosticResult(null)).toBe(false);
  });
});
