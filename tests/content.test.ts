import { describe, expect, it } from "vitest";
import { lessons } from "../src/content/lessons";
import { emptyData } from "../src/lib/storage";
import { recommendation } from "../src/lib/recommendation";

describe("curriculum", () => {
  it("ships 12 full-stack and 10 Java lessons", () => {
    expect(lessons.filter((lesson) => lesson.track === "web")).toHaveLength(12);
    expect(lessons.filter((lesson) => lesson.track === "java")).toHaveLength(10);
  });

  it("has three real auto-checked challenges", () => {
    expect(lessons.filter((lesson) => lesson.checkMode === "auto" && lesson.tests?.length)).toHaveLength(3);
  });

  it("never exposes an empty starter or solution", () => {
    for (const lesson of lessons) {
      expect(lesson.starterCode.trim().length).toBeGreaterThan(10);
      expect(lesson.solution.trim().length).toBeGreaterThan(10);
      expect(lesson.hints).toHaveLength(3);
    }
  });
});

describe("daily recommendation", () => {
  it("respects Full-stack mode", () => {
    const result = recommendation({ ...emptyData(), mode: "fullstack" });
    expect(result.lesson.track).toBe("web");
  });

  it("lets Java begin independently", () => {
    const result = recommendation({ ...emptyData(), mode: "java" });
    expect(result.lesson.id).toBe("java-run");
  });

  it("recommends review after repeated failed attempts", () => {
    const data = emptyData();
    data.mode = "fullstack";
    data.progress["web-ts-narrowing"] = {
      lessonId: "web-ts-narrowing", code: "", notes: "", reflection: "", checklist: [],
      status: "in-progress", attempts: 3, updatedAt: new Date().toISOString(),
    };
    expect(recommendation(data).reason).toContain("ทบทวน");
  });
});
