# Independent review: R1 (b7f8aa5) + R2-JS (8ca15ac)

Scope: read-only. Diffs were read against faa1de2. The topic data was dumped with vite-node and 24 checkpoint model answers were run in Node. vitest: content + assessment-workspace pass. curriculum-quality has 1 failure, a 5 s timeout in `ts-why` tsc warm-up (environmental, not a content failure). Line numbers are from HEAD (2691362). The JS and dev content files have not changed since 8ca15ac.

Verdict: **REQUEST CHANGES**. Everything below has HIGH confidence unless it says otherwise.

## CRITICAL (learners will hit these)

C1. The concept step shows the trace answer and the debug fix before the learner reaches trace or debug. This affects all 7 new bridge topics.
- In `src/content/curriculum/javascript-bridges.ts`, every bridge copies its `traceAnswer` into `lesson.walkthrough` and its `bugExplanation` into `lesson.pitfalls`. Locations: js-function-basics :56/:62, js-loop-basics :170/:176, js-accumulator :267/:274, js-array-basics :389/:394, js-function-values :522/:528, js-loop-control :628/:635, js-nested-loops :719/:724.
- `generate.ts:16-17` renders walkthrough and pitfalls in the concept step, so the predict and diagnose activities are answered before they start. js-accumulator and js-array-basics also append the trace answer to an `explain` paragraph.
- Fix: write a walkthrough of the concept-step `lesson` example, not the trace example. Write pitfalls that describe a different mistake from `buggy`.

C2. JS assessments ask for "แนบ output จริง / ทดลอง", but the Run button is removed from assessment steps.
- `QuestApp.tsx:258` has `{!step.assessment&&<button className="run"…}` and `fileName="คำตอบและหลักฐาน"`, which makes `canRunInBrowser=false`.
- js-start (`javascript-start.ts`) tells learners that "บนเว็บไซต์กด Run code ได้โดยไม่ติดตั้ง Node". A browser-only learner therefore cannot produce the evidence that 28 JS rubrics require, such as "แนบผลรันเทียบคำทำนาย".
- Fix: keep Run (no tests) for assessment steps whose language is javascript. Model-answer gating can stay as it is.

C3. The js-errors checkpoint is the same bug as the js-array-basics debug step.
- `javascript-checkpoints.ts:98-106` uses `prices=[10,20]`, `i<=prices.length`, expects 30 and gets NaN.
- `javascript-bridges.ts:359` has the same code, numbers and fix. The concept-step pitfalls (C1) already show that fix.
- Fix: use a new bug class, for example a property-name typo in an object (reads undefined), a string/number concat, or an off-by-one on the first element.

C4. The js-async model answer does not meet its own prompt or rubric (`javascript-checkpoints.ts:161-169`).
- The prompt asks for an async function that returns `count+2` and a caller that shows 5. Rubric 3 says "ไม่อ้างว่า async function คืน 5 โดยตรง".
- The model answer's `main()` awaits and logs inside the function. No function returns a value to an awaiting caller, and the reject path is only described ("เปลี่ยน Promise เป็น reject").
- Fix: `async function readCount(source){ const d = await source; return d.count + 2; }` plus `async function main(){ try { console.log(await readCount(Promise.resolve({count:3}))); console.log(await readCount(Promise.reject(new Error("อ่านไม่ได้")))); } catch (e) { console.log(e.message); } } main();`.

C5. The dev-process trace step contradicts itself, and the example gives away the practice solution.
- At `developer-foundations.ts:37` the example is `process.exitCode = 0;`. The trace step renders `code: topic.example` (generate.ts:54). Its prompt is "เมื่อรัน starter … exit code เป็น 1", but the code on screen sets 0.
- The example is also byte-identical to `solution`.
- Fix: use a different program for the example (e.g. `console.log("saved"); process.exitCode = 2;`) and make the trace ask about the code that is displayed.

## MAJOR

M1. Checkpoints are often the practice or example with renamed values, not a new context. This affects 16 of 28 JS checkpoints. Lines are in `javascript-checkpoints.ts` unless noted.

| Checkpoint | Location | Matches |
|---|---|---|
| js-start | `javascript-start.ts:22` | the shop practice (3 logs plus change the value) |
| js-values | :4 | quantity×price with Number + typeof |
| js-variables | :12 | budget minus two costs. The new `extension` in `lessons/javascript-foundations.ts` (credit 800−120−450) is the same task a third time. |
| js-strings | :20 | trim→lower→replace spaces with "-" + length, identical pipeline. The extension `"  Ab C  "→ab-c` is the same again. |
| js-numbers | :28 | Number + isFinite on 3 strings; "Infinity" is reused verbatim |
| js-runtime | :53 | makeTea/pour renamed to pack/seal |
| js-scope | :62 | the practice is makeCounter with a(),a(),b(),a(); the checkpoint is makeCounter with a(),a(),b(),a() |
| js-loops | :71 | the example's while-budget loop "ซื้อได้ 2 ชิ้น เหลือ 50" |
| js-arrays | :89 | openActivityTitles filter+uppercase |
| js-exceptions | :134 | parseGuestCount 1–9 changed to 1–8 |
| js-planner-1 | :125 | same title/capacity/joined fields, subset of practice |
| js-array-basics | bridges :362 | countAbove vs count-in-range |
| js-function-values | bridges :495 | apply(value, transform) renamed applyPrice/rule |
| js-loop-control | bridges :593 | the example's skip-negative/break-at-0 + sum |
| js-nested-loops | bridges :699 | the example's days×slots renamed rooms×times |
| js-errors | — | see C3 |

Several prompts also give away the algorithm, for example js-loop-control's "ข้ามค่าติดลบ และหยุดอ่านเมื่อพบ0" maps 1:1 to continue/break.

Fix: change the problem shape, not just the nouns. For example, a min/max search instead of a sum, a counting task after a filtering practice, or combining two earlier topics. Avoid prompts that name the control-flow construct.

M2. Model answers, rubrics and prompts are unreadable: code is squashed onto one line, Thai is glued to Latin and digits, and a no-wrap box hides it.
- Model answers are code squashed onto one line with `;` (minified statements present): JS 24/28. Developer: 0/9.
- Model answers with no line break at all: JS 18/28 (js-values, js-variables, js-strings, js-numbers, js-conditions, js-functions, js-runtime, js-scope, js-objects, js-loops, js-arrays, js-errors, js-references, js-callbacks, js-planner-1, js-exceptions, js-promises, js-async). Developer: 9/9 (single-line prose of 150–316 characters).
- Thai prose glued to Latin or digits, counted as ≥3 junctions per field (heuristic):

| Field | JS (of 28) | Developer (of 9) |
|---|---|---|
| Model answers | 23 | 0 |
| Rubrics (≥2 junctions) | 25 | 2 |
| Prompt first lines | 18 | 0 |

- Examples:
  - `"ชนิดหลังแปลงเป็นnumber ยอด300และ0"` (:7)
  - `"ผล380,300พร้อมค่าที่ทำนาย"` (:15)
  - `"ได้room-a/6และb/1"` (:23)
  - `"stackระดับบนสุด→pack→seal"` (:57)
  - `"state.book.titleยังOldและtagsยัง[\"read\"]"` (:110)
  - model `"…ผลnumber/300 ถ้าจำนวนเป็น0ยอด0; \"4\"+75ต่อเป็น\"475\" ส่วน4+75ได้79"` (:10)
  - planner-2 prompt `"…unitsเป็นจำนวนเต็มบวก…units0และ1"` (:171)
- Bridges: 26 learner-facing fields are glued (traceAnswer, bugExplanation, checks, hints), e.g. js-array-basics trace `"index0คือ4 index1คือ7…"`, bug `"คาด30แต่actualNaN เพราะi=2…"`. Because of C1, the same glued text appears again in walkthrough and pitfalls.
- Level-3 hints are minified code, e.g. js-accumulator `let sum=0; for(let i=1;i<=n;i=i+1){sum=sum+i;} return sum;`.
- The js-runtime checkpoint asks the learner to trace a call stack through a one-line program: `function pack(){console.log("กล่อง");seal();…}` (:54).
- Rendering makes this worse. The reveal is `<pre><code>` (`QuestApp.tsx:259`) styled by `.micro-practice-pane pre{overflow:auto}` (`globals.css:136`), which has no `white-space:pre-wrap`. Every one-line answer becomes a single horizontally scrolling line.
- Fix:
  - Store modelAnswer as multi-line indented code, then a blank line, then Thai explanation with normal spacing.
  - Put spaces between Thai words and code, numbers or English terms.
  - Add `.reveal pre{white-space:pre-wrap;overflow-wrap:anywhere}`.
  - Add a test that rejects modelAnswer/rubric matching `/[฀-๿][A-Za-z0-9]{2,}|[A-Za-z0-9]{2,}[฀-๿]/` above a threshold and code lines with more than one statement.

M3. Syntax is used before it is taught, by learner order.
- js-numbers (#4): buggy `if (price === NaN) {…} else {…}` (`javascript-foundations.ts:145`), and the lesson check uses `n % 2 === 0`. `if`/`===` are taught in js-conditions (#5). Fix: move js-conditions before js-numbers, or rewrite the bug as `console.log(price === NaN)` with an explanation of `===` in the explanation text.
- js-function-values (`javascript-bridges.ts`, explain "function เป็นค่า"): introduces the word callback, and "arrow กับ function มี this ต่างกัน" mentions `this`, which is never taught. The audit asked to use "function ที่ส่งเข้าไป" until js-callbacks. Fix: drop the `this` sentence and defer the term.
- js-async (`javascript-foundations.ts:590`, example `.join(", ")`): `split`/`join` were removed from js-strings in this commit (replaced by replaceAll), so `join` is now used without being taught anywhere before js-async. Fix: add a one-line `join` note in js-async or js-arrays.
- js-objects (#14): starter/solution use `JSON.stringify` in the checker (JSON is taught at #24). This was already there; the checker is given to the learner, not written by them. Low impact, but say "เครื่องมือตรวจ อ่านไม่ต้องเข้าใจ".
- js-conditions (#5): starter gives the ternary `cond ? a : b` without explaining it (pre-existing). Explain it in one line.
- js-runtime (#8): buggy uses unbounded recursion (RangeError) without teaching recursion. Acceptable as a demo, but add one sentence saying a function can call itself.
- Developer Foundations:
  - dev-runtime-tools solution uses `Get-Content package.json` / `cat package.json` (`developer-tools.ts:16`); dev-terminal teaches only Get-Location, Get-ChildItem, Set-Location and New-Item/mkdir. Fix: add Get-Content/cat to the dev-terminal "0)" block, or say "เปิดใน editor".
  - The dev-runtime-tools Linux section says to edit `~/.bashrc` "ผ่าน editor" before dev-editor (dev-editor comes after it). Low.
  - The dev-git checkpoint rubric requires `git show HEAD:README.md` and `git show --stat` (`developer-checkpoints.ts:42`). Neither is taught; `git show` appears only in the analogy table and `git log --stat` only in an extension. Fix: teach both in the dev-git "0)" block, or accept any equivalent evidence (`git diff HEAD`, `git log --stat -1`).
  - dev-errors (#7, original content) uses `const`, string concatenation and `Number(price)`. dev-program teaches only `let`. Low.

M4. The js-function-basics rubric grades something the prompt never asks for (`javascript-bridges.ts:28-33`). Rubric 2, "ผู้เรียกใช้ค่าที่คืนได้ เช่นบวก 1", is not in the prompt and the model answer does not show it. Fix: add "นำผลไปคำนวณต่อหนึ่งครั้ง" to the prompt and the model.

M5. In the js-values model answer, the raw inputs are not in variables (`javascript-checkpoints.ts:10`). The prompt says "รับค่า … ผ่านตัวแปร" and rubric 2 says "อ่านจากตัวแปร", but the model uses `Number("4")` literals. It also never runs the "0" case; it only states the result. Fix: `const countText="4"; const priceText="75"; const count=Number(countText); …`.

M6. Some topic order is still pinned only by the hand-written order arrays, and the test was weakened. `tests/content.test.ts:54` changed `explain.length ≥ 3` to `> 0` with no replacement check. Fix: restore a minimum (e.g. ≥2) for new topics, or add a test that checks real quality, such as "walkthrough ≠ traceAnswer" and "pitfalls do not contain bugExplanation". That test would have caught C1.

## MINOR

- m1. The assessment reveal footer still says "ลองทำเองและรันก่อน" (`QuestApp.tsx:259`), but assessments have no Run button. Use assessment-specific text.
- m2. The gate opens after submitting any single character. This is honest (the body and console text say text is not verified), but say in the prompt that an empty-effort submission defeats the purpose.
- m3. Progress IDs are preserved, but an old `*-checkpoint` progress with `completed:true` (an answer to the old template prompt) now unlocks the new model answer immediately. Consider resetting `completed` when the stored answer predates the new checkpoint, or accept it as harmless.
- m4. `outputCheck` cannot detect hard-coded output.
  - js-start expects `เปิดร้าน\nร้านต้นไม้\nปิดร้าน`, so `console.log("ร้านต้นไม้")` passes.
  - js-loop-basics: printing three constant lines passes.
  - The practice prompts also tell learners to change values (js-start → "ร้านหนังสือ", js-loop-basics → start=5), which then fails Run tests. Acceptance mentions this, but the prompt order invites the failure.
- m5. dev-terminal practice and solution are PowerShell only ("เขียน PowerShell สามคำสั่ง"), but the new "0)" block lets learners pick Bash. Add a Bash solution line (`pwd; cd quest; ls`).
- m6. dev-process uses `language:"node"`, so the editor header shows `index.mjs`, while the lesson says to save `process-lab.js`. Align the names.
- m7. dev-process buggy still uses `npm start` and EADDRINUSE (server/port not taught). The lesson labels it illustrative, which is acceptable.
- m8. dev-files checkpoint (`developer-checkpoints.ts:5`) reuses the trace and practice skill (`../`). The new part is the cwd change. Acceptable, low priority.
- m9. dev-program checkpoint code is inline on one line in the prompt (`developer-checkpoints.ts:26`). Use line breaks.
- m10. In the oop-constructor acceptance "ทั้งสาม field เป็น final ตาม starter และเฉลย" (`lessons/java-oop.ts:110`), the starter fields are not final; only a comment tells the learner to add final. Reword to "ตามที่ starter สั่งให้เพิ่ม".
- m11. js-values practicePrompt says "ค่าทั้งสามด้านล่าง" but there are two values (pre-existing).

## Open questions (low confidence)

- Whether a 5 s timeout on ts-why tsc in curriculum-quality is flaky in CI. It failed once here.
- Whether Node `24.21.0` (hard-coded in the Linux archive URL, `developer-tools.ts:36`) exists at learner time. The evidence doc says the environment ran 24.21.0. The text tells learners to adapt it, which mitigates the risk.

## Verified OK

- **IDs:** all 28 faa1de2 JS/dev topic IDs still exist. Nine new IDs were added (`dev-runtime-tools`, 8 JS). Step IDs stay `${topicId}-${kind}`. Every prerequisite points to an earlier topic. `js-start → dev-editor` is a cross-course prerequisite.
- **Model answer numbers:** all 24 executable model answers produce exactly the numbers in their rubrics. This covers values, variables, strings, numbers, conditions, functions, scope, loops, objects, arrays, references, callbacks, planner-1, exceptions (all 7 inputs), promises, planner-2, accumulator, array-basics, function-values, loop-control, nested-loops, function-basics, loop-basics, and the js-errors fixed-loop reasoning.
- **Java contracts:** the oop-polymorphism acceptance now matches the solution (3 describe + 2 due lines). The oop-constructor prompt and solution agree that all fields are `final`. The M0→M1 text now states that messages change ("added #1"→"added book #1").
- **Developer shell commands:** commands are correct for their labelled shells:
  - `$LASTEXITCODE` (PowerShell) and `echo $?` (Bash)
  - `New-Item -ItemType Directory` and `mkdir`
  - `Get-Command` and `command -v`
  - `npm.cmd` as the execution-policy workaround
  - `export PATH` only under Bash
  - `node --print "(4 + 2) * 2"` works in both shells
  - No `printf` or `<` redirection is presented for PowerShell in R1 content.
- **Developer content facts:**
  - `git status --short` → `?? README.md` after init.
  - A/M column semantics.
  - `git diff` vs `--cached`.
  - Local `git config`.
  - Node `bad option` with non-zero exit.
  - `npx tsc` warning about the unrelated `tsc` package.
  - "Missing script ≠ command not found".
- **Assessment gating:**
  - The starter is blanked.
  - The model answer is hidden until `saved.completed`.
  - Editing hides it again.
  - A reveal from before submission stays gated.
  - The copy says the site records and does not verify ("เว็บบันทึกการส่ง ไม่ได้ยืนยันความถูกต้อง…").
  - `tests/assessment-workspace.test.tsx` covers all of this and passes.
- **Topic order:** js-runtime moved after functions; arrows, `for…of`, `while`/`break`/`continue` and `map`/`filter` are introduced in their own topics before use. ts-why now has dev-runtime-tools and dev-editor as prerequisites and pins typescript@5.9.2, consistent with dev-runtime-tools.
