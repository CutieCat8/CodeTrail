# R2-JS fix: finding → fix → evidence

Self-check by Claude (Sonnet 5.5) on branch `r2/js-fix`. **Independent review still pending** (Codex or Gemini read-only).

| Finding | Fix | Evidence |
|---|---|---|
| C1 walkthrough/pitfalls leak trace/debug answers | 3f60427 bridges rewritten | audit script: no `traceAnswer.slice(0,40)` / `bugExplanation.slice(0,40)` in any JS/dev walkthrough or pitfalls |
| C2 no Run on JS assessments | 40f7646 (main branch) | `tests/assessment-workspace.test.tsx` |
| C3 js-errors checkpoint = array-basics bug | 86cf82b new checkpoint | `prices`/`<=` bug appears only in bridges |
| C4 js-async model answer | 86cf82b | model answer run in Node: `true / 5 / อ่านไม่ได้` |
| C5 dev-process example = solution, trace contradicts code | example now prints `saved`; trace asks about reordered code | `curriculum-quality` runs the example (`saved`, exit 0) |
| M1 renamed checkpoints (JS) | 86cf82b rewrote 28 checkpoints | all model answers run in Node and match rubric values (js-runtime, js-modules-json need manual/multi-file run) |
| M2 unreadable model answers | JS: multi-line code + prose; dev 9/9 now multi-line with spacing | audit: no glued Thai/Latin >2, no code line >120 |
| M3 syntax before taught | `===` and recursion explained in place; ternary explained; `join` note added to js-async; dev-runtime-tools no Get-Content/cat; ~/.bashrc deferred to after editor; dev-errors uses `let` and string literal instead of `const`/`Number()` | diff review |
| M4 function-basics rubric | 3f60427 | prompt/model include using returned value (213) |
| M5 js-values raw inputs | 86cf82b | model answer uses `cupsText` variable |
| m5 dev-terminal Bash | solution has PowerShell and Bash | — |
| m9 dev-program inline code | prompt code on separate lines | — |
| dev-git rubric unteachable commands | accepts equivalent Git commands | — |

Not done: M6 test guard (coordinator task after merge), m6 (editor header shows index.mjs while the lesson says process-lab.js: UI change), m8, js-objects `JSON.stringify` note.

Checks (worktree `../sfq-r2-jsfix`): `npx tsc --noEmit` clean, `eslint src/content/curriculum` clean, `NO_COLOR=1 FORCE_COLOR=0 npx vitest run tests/content.test.ts tests/curriculum-quality.test.ts tests/assessment-workspace.test.tsx tests/runner-compare.test.ts` 349/349.
Note: without `FORCE_COLOR=0` the Node-example tests fail (ANSI colours in `node` stdout); that is an environment artefact, not content.
