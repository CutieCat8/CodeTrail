import type { LearningStep, StepKind, TopicSource } from "@/types/curriculum";

const kinds: StepKind[] = ["concept", "trace", "practice", "debug", "checkpoint"];
const labels: Record<StepKind, string> = { concept: "ทำความเข้าใจ", trace: "อ่านและทำนาย", practice: "ลงมือเขียน", debug: "ตามหาบั๊ก", checkpoint: "อธิบายโดยไม่ลอก" };

export function expandTopics(topics: TopicSource[]): LearningStep[] {
  const coursePositions = new Map<string, number>();
  return topics.flatMap((topic) => kinds.map((kind) => {
    const position = (coursePositions.get(topic.courseId) ?? 0) + 1;
    coursePositions.set(topic.courseId, position);
    const shared = { id: `${topic.id}-${kind}`, topicId: topic.id, courseId: topic.courseId, unit: topic.unit, position, kind, title: `${labels[kind]}: ${topic.title}`, objective: topic.objective, minutes: kind === "practice" || kind === "debug" ? 12 : 7, vocabulary: topic.vocabulary };
    if (kind === "concept") return { ...shared, body: [topic.explanation, topic.why], code: topic.example };
    if (kind === "trace") return { ...shared, body: ["อย่าเพิ่งรันโค้ด อ่านจากบนลงล่างและเขียนค่าที่เปลี่ยนในแต่ละบรรทัด การทำนายก่อนรันฝึก mental model ของภาษา"], code: topic.example, prompt: topic.tracePrompt, reveal: topic.traceAnswer };
    if (kind === "practice") return { ...shared, body: ["เขียนด้วยตัวเองจาก starter code ก่อนเปิดคำตอบ เป้าหมายคืออธิบายได้ว่าแต่ละบรรทัดมีหน้าที่อะไร"], starter: topic.starter, prompt: topic.practicePrompt, reveal: topic.solution };
    if (kind === "debug") return { ...shared, body: ["บั๊กเป็นข้อมูลเกี่ยวกับ mental model ที่ยังคลาดเคลื่อน อ่าน error หรือผลลัพธ์จริง แล้วตั้งสมมติฐานก่อนแก้"], code: topic.buggy, prompt: "ระบุสาเหตุ แก้ให้น้อยที่สุด แล้วอธิบายว่าทำไมการแก้นี้จึงถูก", reveal: topic.bugExplanation };
    return { ...shared, body: ["ปิดตัวอย่างก่อนตอบ แล้วอธิบายด้วยคำของตัวเอง หากอธิบายไม่ได้ให้กลับไป trace อีกครั้ง", `Checkpoint: ${topic.objective}`], prompt: `1) ${topic.title} แก้ปัญหาอะไร 2) มีกฎสำคัญอะไร 3) เขียนตัวอย่างใหม่ที่ไม่เหมือนตัวอย่างด้านบน`, reveal: `คำตอบที่ดีต้องเชื่อมกับเหตุผลนี้: ${topic.why}` };
  }));
}
