# Curriculum research and v2 learning architecture

Updated: 2026-09-30

## Why the first curriculum is too shallow

The first version has 22 complete lessons, but each lesson combines too many ideas. It works as a guided review for a learner who has already built projects; it is not sufficient as a zero-to-programmer path. A beginner needs a much smaller instructional grain, frequent retrieval, and repeated application before a project asks them to combine concepts.

## Primary-source findings

### Codecademy

Codecademy's current Full-Stack Engineer path advertises **51 units, 161 lessons, 96 projects, and 141 quizzes** over about **150 hours**, with no prerequisites. It starts with web overview, HTML, CSS, local development, then progresses through front-end and back-end before integration.

Source: https://www.codecademy.com/learn/paths/full-stack-engineer-career-path

The current Learn Java course advertises **16 lessons, 14 projects, and 15 quizzes** over about **17 hours**. The Java catalog then continues with separate beginner or intermediate courses for OOP, loops and arrays, debugging, inheritance and polymorphism, input/output, generics and collections, JUnit, and developer tooling.

Sources:

- https://www.codecademy.com/learn/learn-java
- https://www.codecademy.com/catalog/language/java

The important pattern is not the exact lesson count. It is alternation: short instruction, guided practice, quiz/retrieval, project application, then revisit the concept in a later unit.

### freeCodeCamp

freeCodeCamp's current Back-End Development and APIs repository says it teaches concepts step by step and then asks learners to apply them in independent practice projects. Its project order starts below Express: Node REPL and CLI, built-in modules, npm modules, the Node HTTP server, then Express routing, middleware, modular routers, REST APIs, error handling, health checks, and graceful shutdown.

Source: https://github.com/freeCodeCamp/back-end-development-and-apis/

An individual legacy challenge also demonstrates the instructional grain: one challenge explains the terminal/server feedback loop and asks for one observable behavior, then tests that behavior. The useful idea to copy is the learning pattern, not its wording or exercise.

Source: https://github.com/freeCodeCamp/freeCodeCamp/blob/main/curriculum/challenges/english/blocks/basic-node-and-express/587d7fb0367417b2b2512bed.md

## Design decision

Sea's Full-stack Quest v2 uses:

```text
Course
└── Unit (60–180 minutes)
    ├── Micro-step: explain one idea (5–8 min)
    ├── Micro-step: trace or predict (5–8 min)
    ├── Micro-step: edit a small program (8–12 min)
    ├── Micro-step: fix a bug (8–12 min)
    ├── Checkpoint: recall without copying (10–15 min)
    └── Lab: combine the unit (30–60 min)
```

The existing 22 lessons become labs or unit checkpoints. They are no longer expected to carry an entire topic alone.

## Planned curriculum size

Counts are targets, not marketing numbers. A step is only counted as live when it has an explanation, example or trace, action, feedback contract, hints, and completion evidence.

| Course | Guided steps | Labs/projects | Approx. hours |
|---|---:|---:|---:|
| Developer Foundations | 48 | 6 | 12 |
| Java Foundations | 120 | 12 | 32 |
| Java OOP Lab | 96 | 10 | 30 |
| Java advanced foundations (planned phase 2) | 72 | 8 | 24 |
| JavaScript Foundations | 96 | 10 | 26 |
| TypeScript Workshop | 72 | 8 | 22 |
| React Foundations | 84 | 10 | 28 |
| Next.js App Router | 60 | 7 | 20 |
| Node.js & Express Back-end | 120 | 14 | 38 |
| PostgreSQL & Prisma | 84 | 10 | 28 |
| Integration, Auth & Reliability | 84 | 10 | 30 |
| Portfolio capstones | 36 | 6 | 40+ |
| **Total target** | **972** | **111** | **330+** |

The app should not pretend all 972 steps are already authored. The map must show separate states:

- **พร้อมเรียน** — complete content and feedback are available.
- **กำลังเขียน** — visible roadmap, no start button.
- **วางแผนไว้** — scope is named but content does not exist yet.

## Zero-beginner rules

1. Never require syntax that has not appeared in a previous step.
2. One new mental model per step; syntax variations may share a step only when the concept is unchanged.
3. Show the execution model: what the computer evaluates, in what order, and what value/state changes.
4. Use predict-before-run often. Reading and tracing code are distinct skills from typing it.
5. Include wrong examples and debugging. A beginner must learn how failure looks.
6. Use retrieval after spacing: ask again without showing the previous example.
7. A lab combines no more than 3–4 recently learned ideas; a project can combine more after checkpoints pass.
8. Explain technical English the first time, then keep the real term.
9. Keep Java standard library first. Spring starts only after language, OOP, exceptions, collections, and tests.
10. Distinguish system-verified results from learner-verified evidence at every level.

## First authoring sequence

1. Developer Foundations: files, folders, terminal, processes, editor, error messages, Git basics.
2. Java Foundations 1: compile/run, output, expressions, variables, primitive types, String.
3. Java Foundations 2: input, branching, loops, methods, arrays, ArrayList.
4. Java OOP: problem → responsibility → class/object → constructor → encapsulation → composition.
5. JavaScript Foundations: runtime, values, expressions, variables, control flow, functions, arrays, objects, async.
6. TypeScript: types after the learner understands JavaScript values and runtime behavior.
7. Web path: HTML/CSS fundamentals before React; HTTP/Node fundamentals before Express.

This order preserves the independent Java route while giving the web route a true zero-beginner entry point.
