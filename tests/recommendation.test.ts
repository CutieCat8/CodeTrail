import { describe, expect, it } from "vitest";
import { stepRecommendation } from "@/lib/recommendation";
import { emptyData } from "@/lib/storage";
import { learningSteps } from "@/content/curriculum";
import type { StepProgress } from "@/types/curriculum";

const completed = (stepId: string): StepProgress => ({
  stepId,
  answer: "",
  notes: "",
  completed: true,
  updatedAt: "2026-10-01T00:00:00.000Z",
});

function completeCourse(data: ReturnType<typeof emptyData>, courseId: string) {
  learningSteps
    .filter((step) => step.courseId === courseId)
    .forEach((step) => {
      data.stepProgress[step.id] = completed(step.id);
    });
}

describe("stepRecommendation", () => {
  it("starts Full-stack mode with Developer Foundations", () => {
    const data = emptyData();
    data.mode = "fullstack";

    expect(stepRecommendation(data).step.id).toBe("dev-program-concept");
  });

  it("starts Java mode with Java Foundations", () => {
    const data = emptyData();
    data.mode = "java";

    expect(stepRecommendation(data).step.id).toBe("java-jdk-concept");
  });

  it("starts mixed mode as a two-route mission", () => {
    const data = emptyData();
    data.mode = "mixed";

    const result = stepRecommendation(data);

    expect(result.step.id).toBe("dev-program-concept");
    expect(result.companionStep?.id).toBe("java-jdk-concept");
    expect(result.reason).toContain("Developer Foundations");
    expect(result.reason).toContain("Java Foundations");
  });

  it("balances mixed mode by choosing Java after one Developer Foundations step", () => {
    const data = emptyData();
    data.mode = "mixed";
    data.stepProgress["dev-program-concept"] = completed("dev-program-concept");

    expect(stepRecommendation(data).step.id).toBe("java-jdk-concept");
  });

  it("returns to Developer Foundations when both routes have equal completion", () => {
    const data = emptyData();
    data.mode = "mixed";
    data.stepProgress["dev-program-concept"] = completed("dev-program-concept");
    data.stepProgress["java-jdk-concept"] = completed("java-jdk-concept");

    expect(stepRecommendation(data).step.id).toBe("dev-program-trace");
  });

  it("resumes a mixed-route draft before selecting a different route", () => {
    const data = emptyData();
    data.mode = "mixed";
    data.stepProgress["dev-program-concept"] = {
      stepId: "dev-program-concept",
      answer: "source code คือข้อความที่ผู้พัฒนาเขียน",
      notes: "กลับมาอธิบาย instruction ต่อ",
      completed: false,
      updatedAt: "2026-10-01T00:00:00.000Z",
    };

    const result = stepRecommendation(data);

    expect(result.step.id).toBe("dev-program-concept");
    expect(result.reason).toMatch(/กลับมาทำต่อ/);
  });

  it("finishes both foundation routes before entering Web Platform and OOP", () => {
    const data = emptyData();
    data.mode = "mixed";
    completeCourse(data, "developer-foundations");

    expect(stepRecommendation(data).step.courseId).toBe("java-foundations");

    completeCourse(data, "java-foundations");

    expect(stepRecommendation(data).step.courseId).toBe("web-platform-foundations");
  });

  it("does not skip the longer Java route when Developer Foundations is complete", () => {
    const data = emptyData();
    data.mode = "mixed";
    completeCourse(data, "developer-foundations");
    learningSteps
      .filter((step) => step.courseId === "java-foundations")
      .slice(0, 41)
      .forEach((step) => {
        data.stepProgress[step.id] = completed(step.id);
      });

    expect(stepRecommendation(data).step.courseId).toBe("java-foundations");
  });

  it("does not jump to a later draft before the earliest incomplete step", () => {
    const data = emptyData();
    data.mode = "mixed";
    data.stepProgress["dev-program-practice"] = {
      stepId: "dev-program-practice",
      answer: "draft from a later step",
      notes: "",
      completed: false,
      updatedAt: "2026-10-01T00:00:00.000Z",
    };

    expect(stepRecommendation(data).step.id).toBe("dev-program-concept");
  });

  it("finishes Web Platform and OOP before JavaScript, then Node", () => {
    const data = emptyData();
    data.mode = "mixed";
    completeCourse(data, "developer-foundations");
    completeCourse(data, "java-foundations");
    completeCourse(data, "web-platform-foundations");

    expect(stepRecommendation(data).step.courseId).toBe("java-oop");

    completeCourse(data, "java-oop");

    expect(stepRecommendation(data).step.courseId).toBe("javascript-foundations");

    completeCourse(data, "javascript-foundations");

    expect(stepRecommendation(data).step.courseId).toBe("node-foundations");
  });
});
