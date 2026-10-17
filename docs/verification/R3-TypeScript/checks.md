# R3 TypeScript — foundations checkpoint slice

Scope: four topic-specific assessments. This is a partial R3 delivery, not completion of the TypeScript writer brief or evidence of learner outcomes.

## Order and compatibility

Before and after: ts-why → ts-basic-types → ts-functions → ts-object-types → ts-arrays-tuples → ts-unions-literals → ts-narrowing → ts-null-safety → ts-generics → ts-utility-types → ts-classes → ts-config → ts-async-types → ts-project-planner.

No new IDs, reordering or prerequisite changes. Existing saved step IDs remain valid. `typescript-checkpoints.ts` supplies the first four topics; the remaining ten retain their existing fallback pending a later slice.

## Coverage

| Outcome | Teaching and practice | Assessment | Evidence |
| --- | --- | --- | --- |
| Distinguish compiler checks from runtime | ts-why: annotated functions and price formatter | ts-why-checkpoint: locker fee and rejected string input | Strict compile + 36/0 runtime + intentional argument rejection |
| Inspect unknown before using it, preserve falsy values | ts-basic-types: typeof and toCount | ts-basic-types-checkpoint: display strings/numbers and reject other types | Strict compile + six outputs, including empty string, zero, null and false |
| Define optional/default function contracts | ts-functions: greet, perPerson, discount callback | ts-functions-checkpoint: label factory and one-argument function variable | Strict compile + four outputs, including default and explicit zero |
| Model optional and readonly fields | ts-object-types: Activity, Member/displayName | ts-object-types-checkpoint: library shelf reassignment on a new object, preserving original and missing/empty distinction | Strict compile + four outputs + readonly and typo rejection |

## Changes and unresolved audit gaps

Replaced four generic recall prompts with new task contexts, observable rubrics, executable model answers, explicit submission requirements and local-check labels. Learners can consult documentation and submit unfinished attempts with actual errors. The website records an assessment submission; it does not certify its correctness.

The object assessment combines object construction with an optional parameter already taught in ts-functions: it returns a new Book rather than repeating the existing displayName property-selection exercise. Syntax is taught in the same topic or earlier prerequisites. Multi-line model answers include Thai explanations and valid alternatives as comments so the complete fenced block can be compiled directly.

Deferred: ten later topic-specific checkpoints, narrowing/generics density review, and the broader R3 practice/hint/readability audit. No claim that those defects are resolved by this slice.

## Verification

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `node /tmp/codetrail-ts-checkpoints/verify.cjs`: four model answers strictly type-checked and their complete stdout matched expected values; three intentional compile errors rejected. Scratch script extracts the actual model answers, writes independent `.ts` files, checks with project TypeScript (`--strict --noEmit --skipLibCheck --target es2022`), then runs with Node v24.19.0. The ts-why string call, Book readonly assignment and misspelled titlle literal were checked separately.
- Targeted curriculum/content/recommendation suite: first sandbox run hit an existing Node HTTP example's `listen EPERM`; unrestricted rerun after the revised object-copy assessment passed on 2026-10-17: 3 files, 327 tests (12.30 seconds). The scratch verifier was also rerun: all four answers and three intentional errors passed.
- Coordinator-reported validation: production build passed; dedicated browser assessment test passed (1), covering submit/gate/reload/edit and absence of JavaScript Run. Coordinator owns generated-step regression tests and final full delivery checks.

## Sources opened

- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html — readable official content for parameter/return annotations, inference, optional fields and unions.
- https://www.typescriptlang.org/docs/handbook/2/narrowing.html — readable official content for typeof guards and truthiness pitfalls.

These documents informed correctness, not exercise text. Task contexts and Thai wording are original. Existing course setup and Node execution instructions were reused from the repository; local execution verified this environment, not every supported Node release.

## Reviewer focus

Check prompts/rubrics/model outputs agree; empty string and zero stay observable; intentional errors remain commented in the runnable answer; generated checkpoint remains an assessment whose model is gated until submission. Assessments still require learner-run local checks.
