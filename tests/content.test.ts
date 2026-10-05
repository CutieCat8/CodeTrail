import { describe, expect, it } from "vitest";
import { lessons } from "../src/content/lessons";
import { emptyData, isAppData, normalizeAppData } from "../src/lib/storage";
import { recommendation } from "../src/lib/recommendation";
import { learningSteps, topicSources } from "../src/content/curriculum";
import { roadmapNodes } from "../src/content/fullstack-roadmap";

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

describe("zero-beginner micro curriculum", () => {
  it("ships five distinct interactions for every authored topic", () => {
    expect(topicSources.length).toBeGreaterThanOrEqual(40);
    expect(learningSteps).toHaveLength(topicSources.length * 5);
    for (const topic of topicSources) {
      const kinds = learningSteps.filter((step) => step.topicId === topic.id).map((step) => step.kind);
      expect(kinds).toEqual(["concept", "trace", "practice", "debug", "checkpoint"]);
    }
  });

  it("does not count empty roadmap items as live steps", () => {
    for (const step of learningSteps) {
      expect(step.body.join(" ").length).toBeGreaterThan(40);
      expect(step.objective.length).toBeGreaterThan(20);
    }
  });

  it("gives every rich topic a full plain-language concept step", () => {
    const rich = topicSources.filter((topic) => topic.lesson);
    expect(rich.length).toBeGreaterThanOrEqual(8);
    for (const topic of rich) {
      const concept = learningSteps.find((step) => step.id === `${topic.id}-concept`)!;
      const kinds = concept.sections!.map((section) => section.kind);
      expect(kinds).toEqual(expect.arrayContaining(["hook", "text", "code", "walkthrough", "pitfall", "recap"]));
      // Analogies are reserved for hard ideas (docs/COURSE-PLAN.md); when present they must be rendered.
      if (topic.lesson!.analogy) expect(kinds).toContain("analogy");
      expect(topic.lesson!.explain.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("numbers steps inside each course and never exceeds its course total", () => {
    for (const courseId of new Set(learningSteps.map((step) => step.courseId))) {
      const courseSteps = learningSteps.filter((step) => step.courseId === courseId);
      expect(courseSteps.map((step) => step.position)).toEqual(
        Array.from({ length: courseSteps.length }, (_, index) => index + 1),
      );
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

describe("personal full-stack roadmap", () => {
  it("accepts persisted roadmap marks without breaking schema v1", () => {
    const data = { ...emptyData(), roadmapMarks: { "web-foundations": "learning" as const } };
    expect(isAppData(data)).toBe(true);
    expect(isAppData({ ...data, roadmapMarks: { "web-foundations": "mastered" } })).toBe(false);
  });

  it("uses unique nodes with useful learning context", () => {
    expect(roadmapNodes.length).toBeGreaterThanOrEqual(35);
    expect(new Set(roadmapNodes.map((node) => node.id)).size).toBe(roadmapNodes.length);
    for (const node of roadmapNodes) {
      expect(node.description.length).toBeGreaterThan(25);
      expect(node.why.length).toBeGreaterThan(25);
      expect(node.evidence.length).toBeGreaterThan(20);
    }
  });

  it("only marks nodes available when referenced learning evidence exists", () => {
    const topicIds = new Set(topicSources.map((topic) => topic.id));
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    for (const node of roadmapNodes) {
      for (const id of node.topicIds ?? []) expect(topicIds.has(id), `missing topic ${id}`).toBe(true);
      for (const id of node.lessonIds ?? []) expect(lessonIds.has(id), `missing lesson ${id}`).toBe(true);
    }
  });
});

describe("project progress compatibility", () => {
  it("accepts old schema v1 data without project progress", () => {
    const data = emptyData();
    expect(isAppData(data)).toBe(true);
    expect(normalizeAppData(data)?.projectProgress).toEqual({});
  });

  it("validates persisted project links and checklist evidence", () => {
    const data = {
      ...emptyData(),
      projectProgress: {
        "friends-activity-planner": {
          repositoryUrl: "https://github.com/sea/activity-planner",
          demoUrl: "",
          checklist: [true, false],
          updatedAt: "2026-09-30T10:00:00.000Z",
        },
      },
    };
    expect(isAppData(data)).toBe(true);
    expect(isAppData({ ...data, projectProgress: { broken: { ...data.projectProgress["friends-activity-planner"], checklist: ["yes"] } } })).toBe(false);
  });

  it("rejects nested progress shapes that could crash imported data", () => {
    expect(isAppData({ ...emptyData(), progress: { broken: null } })).toBe(false);
    expect(isAppData({ ...emptyData(), stepProgress: { broken: { stepId: "x", answer: [], notes: "", completed: false, updatedAt: "now" } } })).toBe(false);
    expect(isAppData({ ...emptyData(), journal: [{ id: "x", title: "missing fields" }] })).toBe(false);
  });
});
