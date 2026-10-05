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
