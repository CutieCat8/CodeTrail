import { Lightbulb, ListChecks, MessageCircleQuestion, Puzzle, ScanLine, TriangleAlert, Compass } from "lucide-react";
import type { LearningStep } from "@/types/curriculum";

const icons = { hook: MessageCircleQuestion, analogy: Lightbulb, text: Compass, walkthrough: ScanLine, pitfall: TriangleAlert, recap: ListChecks, hints: Puzzle } as const;

export function StepSections({ step }: { step: LearningStep }) {
  if (!step.sections) return <>{step.body.map((paragraph) => <p className="teaching-copy" key={paragraph}>{paragraph}</p>)}</>;
  return <div className="rich-sections">{step.sections.map((section) => {
    if (section.kind === "code") return step.code ? <div className="micro-code" key="code"><span>{section.title}</span><pre><code>{step.code}</code></pre></div> : null;
    const Icon = icons[section.kind];
    if (section.kind === "hints") return <details className="rich-block hints" key={section.title}><summary><Icon />{section.title}</summary>{section.items.map((item, i) => <p key={item}><b>{i + 1}.</b> {item}</p>)}</details>;
    const list = section.kind === "walkthrough" || section.kind === "pitfall" || section.kind === "recap";
    return <section className={`rich-block ${section.kind}`} key={section.title}>
      <h3><Icon />{section.title}</h3>
      {list ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : section.items.map((item) => <p key={item}>{item}</p>)}
    </section>;
  })}</div>;
}
