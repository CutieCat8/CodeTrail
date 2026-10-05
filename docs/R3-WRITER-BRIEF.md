# R3 writer brief (shared by every course batch)

This brief is the contract for each R3 batch (TypeScript, Node.js, Back-end/SQL, Java OOP).
Read it fully before editing. The learner is a Thai beginner who may never have coded before; all learner-facing text is Thai.

## Goal of each batch

A learner who has finished the prerequisite courses can, after this course:
read code and predict output · explain values/flow in their own words · write small programs from new requirements ·
debug from expected/actual evidence · combine concepts into a project and explain decisions.
Do not claim outcomes are guaranteed; content checks are not learner trials.

## How the content system works

- A course = `src/content/curriculum/<course>.ts` (TopicSource[]) + `lessons/<course>.ts` (RichLesson by topic id).
- `generate.ts` expands every topic into 5 steps: concept, trace, practice, debug, checkpoint. Step id = `<topicId>-<kind>`.
- If a topic has `checkpoint: { prompt, rubric, modelAnswer }`, the checkpoint step becomes an **assessment**: the learner submits first; the rubric + model answer are shown only after submission. Without it the step falls back to a generic template ("1) … แก้ปัญหาอะไร …" + `why` as the "answer") — the audit flagged this template as a defect. **Every topic in your course must get a topic-specific checkpoint.**
- Pattern to copy (already used for JavaScript): `javascript-foundations.ts` end — `const order = [...]`, `byId` map over original + bridge topics, then merge `<course>Checkpoints[id]`. Put new topics in `<course>-bridges.ts`, checkpoints in `<course>-checkpoints.ts`. See `javascript-bridges.ts`, `javascript-checkpoints.ts`, `java-checkpoints.ts` for the shape — but NOT for formatting (see Readability).
- `standard: "v3"` topics are tested to have: lesson.hook, explain[] (code+output where useful), walkthrough, pitfalls, checks (≥2 with answers), practiceHints (exactly 3: direction → structure → almost), acceptance, solutionNotes, reflection; runnable JS/Node needs expectedOutput; starter ≠ solution. New bridge topics must be v3.
- Tests (`tests/curriculum-quality.test.ts`): prerequisites must exist and come earlier in the same course order; TS example/solution/explain code type-check under strict; TS/JS/Node examples with expectedOutput really print it; TS bugExplanation starting `tsc แจ้ง` must really error, `tsc ผ่าน` must really pass. Node examples run in a temp dir with real Node 24.
- Express/SQL examples (`requires: ["express"]`/`["pglite"]` or language `sql`) are verified by `scripts/verify-lesson-deps.ts` (VERIFY_DIR=/tmp/lesson-verify already has express@5.2.1, @electric-sql/pglite@0.5.8, pg).
- Java is verified by `scripts/verify-java-lessons.ts` (JAVA_HOME=/tmp/sea-quest-java-tools/jdk21, JUNIT_JAR=/tmp/sea-quest-java-tools/junit-platform-console-standalone-6.1.3.jar, JAVA_TOPIC_IDS=a,b to limit). Read the script: it checks example output, starter compiles, solutionCheck (stdin/output/junitTests), bugCheck.

## Hard rules

1. **Never rename or delete an existing topic ID** (progress is stored by step id). Reordering is allowed through the order array; new topics get new ids with the course prefix (`ts-`, `node-`, `be-`, `oop-`).
2. Nothing used before it is taught: every syntax form, API, tool or command in example/starter/solution/buggy/explain code/checkpoint model answer must be taught in an earlier topic (this course or a declared prerequisite course) or explained right there in a short explain block. Update `prerequisites` (review links) when you move or add topics.
3. **Readability (major defect found in earlier batches):** code strings must be normally formatted multi-line code (2-space indent JS/TS/SQL, 4-space Java), never a whole program on one line. Thai prose keeps normal spacing (`ยอด 300 และ 0`, not `ยอด300และ0`). Model answers: readable code, then a short Thai explanation of why it meets the rubric and which alternatives are also acceptable.
4. Checkpoints (assessments) = new context, not the practice with renamed variables or numbers. State: what to build/answer, inputs/outputs or behaviour, normal + edge/error cases appropriate to level, what may be consulted (documentation allowed unless it's a recall check — say which), what to submit (code + real output/test result + short explanation; if not finished, submit attempt + error). Do **not** reveal the algorithm or code structure in the prompt. Rubric: 2–4 observable criteria. The model answer must really satisfy the prompt and every rubric number (run/type-check it).
5. Hints: three levels. In later topics and project milestones, reduce help: level 3 may point at the key line/idea but should not paste the full solution. Project milestones state required behaviour and acceptance; leave design choices to the learner where reasonable and ask them to justify decisions.
6. Practice progression inside each skill group: read & predict → fill a small part → write from reduced starter → debug from expected vs actual → combine → assessment in new context. Do not add exercises that only rename variables/numbers. Add a bridge topic only when a dense topic mixes several new ideas the learner must practise separately first.
7. Analogies only for hard ideas; include mapping (familiar ↔ concept) and limits; always connect back to real code. Do not replace mechanism explanations with analogies.
8. Shell commands: when PowerShell and Bash/WSL differ, give both, labelled. PowerShell has no `<` input redirection, no `printf`, `export`, `&&` only in PS7+; use `Get-Content file | cmd`, `$env:NAME="v"`.
9. Solutions/acceptance/fixtures are one contract: practicePrompt ↔ starter ↔ solution ↔ acceptance ↔ automated checks ↔ solutionNotes must agree. A solution must implement everything the prompt asks (e.g. every route), not just helpers. If a full solution is long, keep it complete anyway — but prefer scoping the task smaller.
10. Do not edit shared files: `src/types/*`, `src/content/curriculum/generate.ts`, `index.ts`, `courses.ts`, `src/components/*`, `src/lib/*`, `src/content/lessons.ts`, `tests/*`, `scripts/*`, `docs/*` (except your own report file below), or other courses' files. If you believe a shared-file change is required, stop and describe it in your report instead.
11. Truthful verification labels: manual (learner-run) checks must say "ตรวจเองในเครื่อง" with exact commands and expected output; never imply the website verified a text answer.
12. Don't copy text/exercises from Codecademy/freeCodeCamp/etc. Use official docs (MDN, TypeScript Handbook, Node.js docs, Express docs, PostgreSQL docs, dev.java/JDK docs, JUnit docs) for correctness only; list in your report which pages you actually opened (and whether you could read them) vs. what came from prior knowledge.

## Verification you must run before committing (in your worktree)

```bash
npx tsc --noEmit
npx vitest run tests/curriculum-quality.test.ts tests/content.test.ts tests/recommendation.test.ts
npm run lint
# Back-end/SQL:  VERIFY_DIR=/tmp/lesson-verify ./node_modules/.bin/vite-node --config vitest.config.ts scripts/verify-lesson-deps.ts
# Java OOP:      JAVA_HOME=/tmp/sea-quest-java-tools/jdk21 JUNIT_JAR=/tmp/sea-quest-java-tools/junit-platform-console-standalone-6.1.3.jar ./node_modules/.bin/vite-node --config vitest.config.ts scripts/verify-java-lessons.ts
```

Also verify every checkpoint model answer and any new solution that the automated scripts do not cover (type-check TS, run Node/Express/SQL against /tmp/lesson-verify, compile+run Java) using your own scratch dir outside the repo. Save the commands and summarized output to `docs/verification/R3-<course>/checks.md` (this is your report file; create the folder). Do not run `npm run build` (the coordinator does it).

## Report (in `docs/verification/R3-<course>/checks.md`)

1. Topic order before → after, new topic ids, prerequisite changes.
2. Coverage rows: learning outcome → topic(s) that teach → practice → assessment (checkpoint id) → evidence (which check).
3. Audit gaps for this course and how each was closed (or why not).
4. Verification commands + results (pass/fail counts), including model-answer checks.
5. Sources actually opened (URL + what part was readable) vs prior knowledge.
6. Open issues / what the reviewer should look at.

Commit on your branch with message `fix(curriculum): <course> R3 …` ending with
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push, merge, or deploy.
