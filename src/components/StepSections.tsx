import { BookOpenCheck, CircleCheck, Compass, Lightbulb, ListChecks, MessageCircleQuestion, Puzzle, ScanLine, Sparkles, TriangleAlert } from "lucide-react";
import { topicSources } from "@/content/curriculum";
import type { LearningStep } from "@/types/curriculum";

const icons = { hook: MessageCircleQuestion, analogy: Lightbulb, text: Compass, walkthrough: ScanLine, pitfall: TriangleAlert, recap: ListChecks, hints: Puzzle, acceptance: CircleCheck, reflection: Sparkles, checks: BookOpenCheck, prereq: BookOpenCheck } as const;

const topicTitle = (id: string) => topicSources.find((topic) => topic.id === id)?.title ?? id;

function CodeSample({ title, code, output }: { title: string; code?: string; output?: string }) {
  if (!code) return null;
  return <div className="micro-code"><span>{title}</span><pre><code>{code}</code></pre>{output !== undefined && <div className="micro-output"><span>ผลลัพธ์ที่ควรเห็น</span><pre><code>{output}</code></pre></div>}</div>;
}

export function StepSections({ step, openStep }: { step: LearningStep; openStep?: (id: string) => void }) {
  if (!step.sections) return <>{step.body.map((paragraph) => <p className="teaching-copy" key={paragraph}>{paragraph}</p>)}</>;
  return <div className="rich-sections">{step.sections.map((section) => {
    if (section.kind === "code") return <CodeSample key="code" title={section.title} code={step.code} output={section.output} />;
    const Icon = icons[section.kind];
    if (section.kind === "prereq") return <nav className="rich-block prereq" key="prereq" aria-label={section.title}>
      <h3><Icon />{section.title}</h3>
      <ul>{section.topicIds.map((id) => <li key={id}>{openStep ? <button type="button" className="link-button" onClick={() => openStep(`${id}-concept`)}>{topicTitle(id)}</button> : topicTitle(id)}</li>)}</ul>
    </nav>;
    if (section.kind === "hints") return <details className="rich-block hints" key={section.title}><summary><Icon />{section.title}</summary>{section.items.map((item, i) => <details className="hint-level" key={item}><summary>เปิดใบ้ที่ {i + 1}</summary><p>{item}</p></details>)}</details>;
    if (section.kind === "checks") return <section className="rich-block checks" key={section.title}>
      <h3><Icon />{section.title}</h3>
      {section.checks.map((check, i) => <details key={check.question}><summary><b>{i + 1}.</b> {check.question}</summary><p>{check.answer}</p></details>)}
    </section>;
    const list = section.kind === "walkthrough" || section.kind === "pitfall" || section.kind === "recap" || section.kind === "acceptance" || section.kind === "reflection";
    return <section className={`rich-block ${section.kind}`} key={section.title}>
      <h3><Icon />{section.title}</h3>
      {list ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : section.items.map((item) => <p key={item}>{item}</p>)}
      {"mapping" in section && section.mapping && <table className="analogy-map"><thead><tr><th>ในสถานการณ์</th><th>ในโค้ดจริง</th></tr></thead><tbody>{section.mapping.map(([familiar, concept]) => <tr key={familiar}><td>{familiar}</td><td>{concept}</td></tr>)}</tbody></table>}
      {"limits" in section && section.limits && <p className="analogy-limits"><b>ข้อจำกัดของการเปรียบเทียบ:</b> {section.limits}</p>}
      {"code" in section && <CodeSample title="ตัวอย่าง" code={section.code} output={section.output} />}
    </section>;
  })}</div>;
}
