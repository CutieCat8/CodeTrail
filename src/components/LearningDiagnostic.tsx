"use client";

import { useState } from "react";
import { diagnosticQuestions } from "@/content/diagnostics";
import { stepById } from "@/content/curriculum";
import { completeDiagnostic, diagnosticScore, isDiagnosticResult, type DiagnosticResult } from "@/lib/diagnostics";

type Props = {
  result?: DiagnosticResult;
  onSave: (result: DiagnosticResult) => void;
  openStep: (id: string) => void;
};

export function LearningDiagnostic({ result: savedResult, onSave, openStep }: Props) {
  const initial = isDiagnosticResult(savedResult) ? savedResult : undefined;
  const [result, setResult] = useState<DiagnosticResult | undefined>(initial);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const answered = diagnosticQuestions.filter(question => Object.hasOwn(answers, question.id)).length;
  const recommended = result ? stepById(result.recommendedStepId) : undefined;
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = completeDiagnostic(answers);
    if (!next) { setNotice("ตอบให้ครบทุกข้อก่อนดูคำแนะนำ"); return; }
    onSave(next);
    setResult(next);
    setNotice("บันทึกผลและคำแนะนำแล้ว");
  };

  return <section className="page diagnostic-page" aria-labelledby="diagnostic-title">
    <h2 id="diagnostic-title">แบบประเมินก่อนเรียน</h2>
    <p>ตอบ 8 ข้อเพื่อหาจุดเริ่มทบทวน ผลนี้เป็นคำแนะนำเบื้องต้นจากคำถามชุดเล็ก ไม่ใช่การรับรองความชำนาญ และไม่เพิ่ม XP หรือทำให้บทเรียนผ่าน</p>
    {result ? <div>
      <h3>คำแนะนำจุดเริ่มเรียน</h3>
      <p>ตอบถูก {diagnosticScore(result)} / {diagnosticQuestions.length} ข้อ</p>
      <p>{diagnosticScore(result) === diagnosticQuestions.length ? "ลองลงมือเขียนเพื่อเช็กความเข้าใจต่อจากคำถามปรนัย" : "เริ่มทบทวนจากจุดที่ตอบคลาดเคลื่อนก่อน แล้วเลือกเรียนหัวข้ออื่นได้ตามต้องการ"}</p>
      {recommended ? <button className="primary" onClick={() => openStep(recommended.id)}>เริ่มเรียน: {recommended.title}</button> : <p role="status">ไม่พบหัวข้อแนะนำในหลักสูตรปัจจุบัน กรุณาเลือกจาก Topics</p>}
      <details><summary>ทบทวนคำตอบและเหตุผล</summary>{diagnosticQuestions.map(question => <div key={question.id}>
        <h4>{question.area} · {question.prompt}</h4>
        <p>คำตอบของคุณ: {question.options.find(option => option.id === result.answers[question.id])?.text ?? "ยังไม่แน่ใจ"}</p>
        <p>{result.answers[question.id] === question.correctOptionId ? "ถูกต้อง" : "ควรทบทวน"} · {question.explanation}</p>
      </div>)}</details>
      <button className="home-quiet-action" onClick={() => { setResult(undefined); setAnswers({}); setNotice("เริ่มทำใหม่ ผลเดิมจะถูกแทนที่เมื่อส่งคำตอบครบ"); }}>ทำแบบประเมินใหม่</button>
    </div> : <form onSubmit={submit}>
      <p aria-live="polite">ตอบแล้ว {answered} / {diagnosticQuestions.length} ข้อ</p>
      {diagnosticQuestions.map((question, index) => <fieldset key={question.id}>
        <legend>{index + 1}. {question.area} · {question.prompt}</legend>
        {question.options.map(option => <label key={option.id} >
          <input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} required onChange={() => { setAnswers(current => ({ ...current, [question.id]: option.id })); setNotice(""); }} /> {option.text}
        </label>)}
        <label ><input type="radio" name={question.id} value="unsure" checked={answers[question.id] === "unsure"} required onChange={() => { setAnswers(current => ({ ...current, [question.id]: "unsure" })); setNotice(""); }} /> ยังไม่แน่ใจ</label>
      </fieldset>)}
      <button className="primary" type="submit">ดูคำแนะนำ</button>
    </form>}
    <p role="status">{notice}</p>
  </section>;
}
