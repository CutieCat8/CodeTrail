import type { LearningStep, StepKind, StepSection, TopicSource } from "@/types/curriculum";

const kinds: StepKind[] = ["concept", "trace", "practice", "debug", "checkpoint"];
const labels: Record<StepKind, string> = { concept: "ทำความเข้าใจ", trace: "อ่านและทำนาย", practice: "ลงมือเขียน", debug: "ตามหาบั๊ก", checkpoint: "อธิบายโดยไม่ลอก" };
const hintLevels = ["ใบ้ระดับ 1 · ทิศทาง", "ใบ้ระดับ 2 · โครงสร้าง", "ใบ้ระดับ 3 · เกือบเฉลย"];

function conceptSections(topic: TopicSource): StepSection[] | undefined {
  const l = topic.lesson;
  if (!l) return undefined;
  const sections: StepSection[] = [];
  if (topic.prerequisites?.length) sections.push({ kind: "prereq", title: "ทบทวนก่อนเริ่ม", topicIds: topic.prerequisites });
  sections.push({ kind: "hook", title: "เริ่มจากสถานการณ์จริง", items: [l.hook] });
  if (l.analogy) sections.push({ kind: "analogy", title: l.analogy.title, items: l.analogy.text, mapping: l.analogy.mapping, limits: l.analogy.limits });
  sections.push(...l.explain.map((e): StepSection => ({ kind: "text", title: e.heading, items: e.text, code: e.code, output: e.output })));
  sections.push({ kind: "code", title: "ลองดูโค้ดจริง", output: topic.expectedOutput });
  sections.push({ kind: "walkthrough", title: "โค้ดทำงานตามลำดับอย่างไร", items: l.walkthrough });
  sections.push({ kind: "pitfall", title: "จุดที่คนเริ่มต้นมักเข้าใจผิด", items: l.pitfalls });
  if (l.checks?.length) sections.push({ kind: "checks", title: "เช็กความเข้าใจก่อนไปต่อ", checks: l.checks });
  sections.push({ kind: "recap", title: "จำแค่นี้ก่อน", items: l.recap });
  return sections;
}

function practiceSections(topic: TopicSource): StepSection[] | undefined {
  const l = topic.lesson;
  if (!l?.practiceHints && !l?.acceptance) return undefined;
  const sections: StepSection[] = [];
  if (l.acceptance?.length) sections.push({ kind: "acceptance", title: topic.autoCheck || topic.outputCheck ? "เกณฑ์ผ่าน (กด Run tests เพื่อตรวจ)" : "เกณฑ์ผ่าน (ตรวจเองตามรายการ)", items: l.acceptance });
  if (l.practiceHints?.length) sections.push({ kind: "hints", title: "ติดตรงไหน ค่อย ๆ เปิดดูทีละใบ้", items: l.practiceHints.map((hint, i) => l.practiceHints!.length === 3 ? `${hintLevels[i]} — ${hint}` : hint) });
  return sections;
}

function practiceReveal(topic: TopicSource) {
  const notes = topic.lesson?.solutionNotes;
  if (!notes?.length) return topic.solution;
  return `${topic.solution}\n\n/* ทำไมเฉลยนี้จึงถูก\n${notes.map((note) => ` * ${note}`).join("\n")}\n */`;
}

function checkpointSections(topic: TopicSource): StepSection[] | undefined {
  const l = topic.lesson;
  if (!l?.reflection?.length && !l?.extension) return undefined;
  return [
    ...(l.reflection?.length ? [{ kind: "reflection" as const, title: "สะท้อนความเข้าใจ", items: l.reflection }] : []),
    ...(l.extension ? [{ kind: "text" as const, title: "โจทย์ต่อยอด (ไม่บังคับ)", items: [l.extension] }] : []),
  ];
}

export function expandTopics(topics: TopicSource[]): LearningStep[] {
  const coursePositions = new Map<string, number>();
  return topics.flatMap((topic) => kinds.map((kind) => {
    const position = (coursePositions.get(topic.courseId) ?? 0) + 1;
    coursePositions.set(topic.courseId, position);
    const shared = { id: `${topic.id}-${kind}`, topicId: topic.id, courseId: topic.courseId, unit: topic.unit, position, kind, title: `${labels[kind]}: ${topic.title}`, objective: topic.objective, minutes: kind === "practice" || kind === "debug" ? 12 : 7, vocabulary: topic.vocabulary, language: topic.language };
    if (kind === "concept") return { ...shared, body: [topic.explanation, topic.why], code: topic.example, sections: conceptSections(topic) };
    if (kind === "trace") return { ...shared, body: ["อย่าเพิ่งรันโค้ด อ่านจากบนลงล่างและเขียนค่าที่เปลี่ยนในแต่ละบรรทัด การทำนายก่อนรันฝึก mental model ของภาษา"], code: topic.example, prompt: topic.tracePrompt, reveal: topic.traceAnswer, sections: topic.lesson?.traceHint ? [{ kind: "hints", title: "วิธีไล่ทีละบรรทัด", items: [topic.lesson.traceHint] }] : undefined };
    if (kind === "practice") return { ...shared, body: ["เขียนด้วยตัวเองจาก starter code ก่อนเปิดคำตอบ เป้าหมายคืออธิบายได้ว่าแต่ละบรรทัดมีหน้าที่อะไร"], starter: topic.starter, prompt: topic.practicePrompt, reveal: practiceReveal(topic), sections: practiceSections(topic), check: topic.autoCheck, outputCheck: topic.outputCheck };
    if (kind === "debug") return { ...shared, body: ["บั๊กเป็นข้อมูลเกี่ยวกับ mental model ที่ยังคลาดเคลื่อน อ่าน error หรือผลลัพธ์จริง แล้วตั้งสมมติฐานก่อนแก้"], code: topic.buggy, prompt: "ระบุสาเหตุ แก้ให้น้อยที่สุด แล้วอธิบายว่าทำไมการแก้นี้จึงถูก", reveal: topic.bugExplanation };
    return { ...shared, body: ["ปิดตัวอย่างก่อนตอบ แล้วอธิบายด้วยคำของตัวเอง หากอธิบายไม่ได้ให้กลับไป trace อีกครั้ง", `Checkpoint: ${topic.objective}`], prompt: `1) ${topic.title} แก้ปัญหาอะไร 2) มีกฎสำคัญอะไร 3) เขียนตัวอย่างใหม่ที่ไม่เหมือนตัวอย่างด้านบน`, reveal: `คำตอบที่ดีต้องเชื่อมกับเหตุผลนี้: ${topic.why}`, sections: checkpointSections(topic) };
  }));
}
