# R2-Java fix: finding → fix → evidence

Self-check by Claude (Sonnet 5.5) on `r2/java-fix`. **Independent review still pending.**

## Group 1 (this commit): C2 shell separation, C3 split
| Finding | Fix | Evidence |
|---|---|---|
| C2 `<`, `printf \|`, `diff`, `fc` shown for PowerShell | java-scanner, java-multi-file, M0 and OOP acceptance now give PowerShell (`Get-Content … \| java`, `Set-Content -Encoding utf8`, `Compare-Object`) and Bash/WSL (`<`, `diff`) separately | text diff; verifier unchanged |
| C3 `split` untaught | already taught in java-array-basics (e8260d2, before java-arraylist); removed `split` from the java-string objective | order array: array-basics precedes arraylist |

Checks: tsc clean, eslint clean, `NO_COLOR=1 FORCE_COLOR=0 npx vitest run content curriculum-quality assessment-workspace` 307/307, `verify-java-lessons.ts` (java-string, java-scanner, java-multi-file, java-project-library-0) 0 failing checks.

## Open (from review-R2-Java.md)
- C1 verified fixed in e8260d2 only if spaces restored in java-bridges (not re-audited here)
- M1/M2 `java-checkpoints.ts`: 17 single-line model answers and glued Thai (largest remaining job)
- M3 array in java-loops buggy, cast in java-primitives; M4 checkpoint = practice; M5 leaks; M6 java-declarations model answer; M7 syntax-before-taught; minors
- java-oop `split(":")` / `split("\t", -1)` (java-oop.ts:3913, lessons/java-oop.ts:496) not checked
- e8260d2 itself: vitest/lint/verifier now pass at this commit (see above), but bridges content not independently reviewed

## Group 2 (Sonnet 5.5, this session): M1/M2 checkpoints, M3, M5, M7, minors
Evidence method: each model answer in `java-checkpoints.ts` (18) and the 7 bridge checkpoints is compiled with JDK 21 and run; output compared with rubric values (script kept outside repo: extract code block → javac → java, variants for 0/1/other inputs). All ok.

| Finding | Fix |
|---|---|
| M1 one-line model answers | all 18 `java-checkpoints.ts` answers are multi-line full programs + Thai explanation; library-0 keeps `EquipmentMain.java` verbatim (verify-java-repair checks it) |
| M2 glued Thai/Latin/digits | glue regex finds 0 hits in java-checkpoints, java-bridges; java-foundations + lessons spacing restored (Thai↔Latin ≥2, Thai↔digit) |
| M3 array in java-loops buggy, cast in java-primitives | loops buggy is `day < 3` off-by-one (logic bugCheck, output `fine for 3 days: 30`); primitives uses `1L * a * a`, cast deferred to java-casting |
| M4 checkpoint = practice | new shapes: expressions (queue round/slot), primitives (int overflow in sum, 0.1+0.2), scanner (start/end minutes), branch (parking tiers), arrays (compress adjacent duplicates); bridges already new in e8260d2 (verified compile/run); **library-0 is still the M0 task renamed — left as is, see open** |
| M5 leaks | java-variables prompt no longer names `final`; java-string practicePrompt no longer prescribes indexOf/substring, hints are 3-level |
| M6 java-declarations model answer | e8260d2 already has both runs (B07/2/true, B07/0/true) — verified |
| M7 | `result[next++]` gone; braces everywhere; `new int[]{}` explained in array-basics lesson; java-jdk no `-cp out`; java-switch bug text no longer uses `throw` |
| Minors | java-jdk rubric accepts `java PackStart.java`; Windows System Path/User Path advice, WSL archive copy + apt option, PowerShell command block; dev-editor wording; blocks reordered (0 before file-reading); oop-constructor "final" wording |
| split in OOP | `split("\\s+")` and `split("\t", -1)` get explain blocks at first use (oop-project-library-2 and -3); `split(":")` covered by array-basics (literal delimiters) |
| verify-java-repair mutants | updated to formatted solutions (they matched minified text and threw "mutation did not apply") |

Checks: tsc, eslint (src scripts tests), `NO_COLOR=1 FORCE_COLOR=0 vitest run content curriculum-quality assessment-workspace` 307/307, `verify-java-lessons.ts` all 46 Java topics 0 failing checks, `verify-java-repair.ts` PASS (incl. equipment fixtures and mutants).

Open: library-0 checkpoint repeats the M0 domain; java-array-copy `copyExcept` skip guard (declared out of contract); bridges thin-ness minors partly addressed in e8260d2 (vocabulary filled); full `npm test`/build not run; browser not checked; independent review pending.
