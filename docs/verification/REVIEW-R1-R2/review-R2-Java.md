# Review: R2-Java (f79b9e2 vs 8ca15ac, plus the Java parts of b7f8aa5). Read-only.

Verdict: REQUEST CHANGES

## How I checked
- Ran `verify-java-lessons.ts` on all 25 topics: 0 failing checks. Ran `verify-java-repair.ts`: all PASS. I pointed TMPDIR at the scratchpad, and the repo has no new changes.
- Neither verifier compiles checkpoint model answers, except EquipmentMain. I compiled and ran all 17 of the other model answers myself (scratchpad/java-review/cp). Every one gives the output its rubric states (Headphone row, 2h15m, 3000000001/30.30, room/-1, 3.5/2/-2/NFE, Lamp: 7.50, 0:0/1:2/2:6, Q/N/L/unknown:Fast, [25,25]/[]/[20,30], [5,2,8]/[]/[]/[-1,-3], 2/-1/0, 2/0/2, [5,2,9,7]/[5,9,7]/[7], bad format/out of range/5, 0/0/22, Ticket 80/60/0, invalid/0/0/40/40/20, 480/400).
- All 18 original topic IDs from faa1de2/8ca15ac are still present. Every java-* prerequisite exists and comes earlier in the order array.

## CRITICAL
C1. Thai text with spaces stripped flips the meaning of some answers. The learner reads the opposite of the intended answer.
  - java-bridges.ts:368, java-method-basics checks[0]. Answer is "ไม่ต้องเรียกก่อน", which reads as "you don't need to call it first". Intended: "ไม่ — ต้องเรียกก่อน" ("No. It must be called first").
  - java-bridges.ts:470, java-array-basics checks[1]. Answer is "ไม่เป็นสำเนาค่า ต้องแก้ผ่านindex", which reads as "it is not a copy". Intended: "ไม่กระทบ — value เป็นสำเนาค่า ต้องแก้ผ่าน index" ("It does not affect the array. value is a copy; change it through the index").
  - Fix: put spaces back, as in R1. Then re-read every check answer that begins with ไม่.

C2. The audit's shell gap is still open in the topics. PowerShell vs Bash is only separated inside the new checkpoint model answers.
  - java-foundations.ts:477 (java-scanner explanation): `printf 'Sea\n3\n' | java Main.java หรือ java Main.java < input.txt`
  - lessons/java-foundations.ts:645, 664, 675 (java-scanner walkthrough, check, hint): `< input.txt` and `printf ... |`
  - lessons/java-foundations.ts:1249 (java-multi-file): `java -cp out wishlist.Main < input.txt`
  - java-foundations.ts:1514 (M0 practicePrompt), lessons/java-foundations.ts:1273 and :1320: `< test-input.txt > actual.txt`, `diff`, "(Windows ใช้ fc)"
  - All of these fail in PowerShell, which has no `<`. In PowerShell, `fc` is an alias of Format-Custom, not fc.exe. In Windows PowerShell 5.1, `>` writes UTF-16LE, so fc.exe/diff against a UTF-8 expected file reports false differences.
  - Fix: give each its own labelled lines.
    - PowerShell: `Get-Content input.txt | java Main`, `Get-Content test-input.txt | java -cp out library.Main | Set-Content -Encoding utf8 actual.txt`, `Compare-Object (Get-Content expected-output.txt) (Get-Content actual.txt)` (empty = same).
    - Bash/WSL: `java Main < input.txt`, `printf`, `diff`.

C3. Regression: `split` is no longer taught, but later topics still use it.
  - f79b9e2 removed split from java-string. java-string's objective still lists it (java-foundations.ts:353).
  - java-arraylist example and solution use `line.split(" ", 2)` (java-foundations.ts:1101, 1117).
  - Java OOP uses `split(":")` (java-oop.ts:3913) and `split("\t", -1)` (lessons/java-oop.ts:496).
  - Fix: teach `split(" ", 2)` → String[] (literal delimiter, limit, reading parts[0]/parts[1]) in java-array-basics or at the start of java-arraylist. Or remove "split" from the java-string objective and teach it before 1101.

## MAJOR
M1. Code is minified onto one line. 43 entries are unreadable for an absolute beginner. Reformat to 4-space indent, one statement per line, braces on every if/for.
- java-bridges.ts (26):
  - java-for-basics: checkpoint.modelAnswer (140). Also every code field uses no-space style `for(int i=1;i<=3;i=i+1){` (116, 121, 122, 126).
  - java-loop-sum: solution (220), checkpoint.modelAnswer (238), practiceHints[2] (283)
  - java-method-basics: example (312), starter (317), solution (318), buggy (322), checkpoint.modelAnswer (336: whole class on one line), practiceHints[2] (382)
  - java-array-basics: example (411), starter (416, 194 chars), solution (417), checkpoint.modelAnswer (435), practiceHints[2] (480)
  - java-array-minimum: starter (514: whole class, 285 chars), solution (515: whole class, 424 chars), buggy (519), checkpoint.modelAnswer (533), practiceHints[2] (578)
  - java-array-copy: example (607: whole class), starter (612), solution (613: 537 chars), buggy (617), checkpoint.modelAnswer (631), practiceHints[2] (677)
- java-checkpoints.ts: 17 of the 18 modelAnswers.
  - java-jdk 11 (commands chained with `;` while the text says to run them one at a time), java-main 20 (whole class), java-output 29, java-expressions 38, java-variables 47, java-primitives 56, java-string 65, java-casting 74, java-scanner 83 (whole class, 455 chars), java-branch 92, java-loops 101, java-switch 110, java-methods 119, java-arrays 128, java-arraylist 137, java-exceptions-basic 146, java-multi-file 155 (each file on one line).
  - Only java-project-library-0 (166) is formatted.
  - The UI shows `reveal` in `<pre>`, so these become horizontal-scroll lines.

M2. Thai prose has spaces stripped between Thai and Latin/digits (e.g. "ประกาศตัวแปรชนิดintชื่อcopiesเริ่มที่3"). Restore spacing everywhere listed.
- java-bridges.ts: 117 fields in 7 topics; my heuristic flagged almost every prose field.
  - java-declarations 21, java-for-basics 11, java-loop-sum 17, java-method-basics 19, java-array-basics 18, java-array-minimum 15, java-array-copy 16.
  - Affected fields: objective/why/explanation, tracePrompt/traceAnswer, practicePrompt, bugExplanation, checkpoint prompt/rubric, lesson hook/explain/walkthrough/pitfalls/checks/recap/practiceHints/acceptance/solutionNotes.
- java-checkpoints.ts: all 18 prompts (the shared prefix "ไม่เปิดrubric/เฉลยก่อนส่ง" plus each body), about 35 of 55 rubric lines, and the prose part of all 18 modelAnswers. Example: line 166 tail "takeซ้ำerroralreadyborrowed".
- lessons/java-foundations.ts: 3 (`local`), 24 (java-jdk new explain block), and java-string 486, 510, 516, 519, 525, 529, 539, 544.
- java-foundations.ts: 345 (java-primitives bugExplanation), 378 (java-string practicePrompt).

M3. Audit gaps the work was supposed to close are still open.
  - java-loops buggy still uses an array before java-array-basics: java-foundations.ts:689-700, `int[] fines = {10, 20, 30}` / `fines.length`. Fix: rewrite as an off-by-one over `for (int day = 1; day < 3; day++)` with an expected/actual sum.
  - java-primitives still casts before java-casting: lessons/java-foundations.ts:405 and :411, `long right = (long) a * a;`. Fix: use `long right = 1L * a * a;` or a `46_341L` literal, and move the cast to java-casting.

M4. Many checkpoints are renamed practice. The "new context" claim doesn't hold.
  - java-scanner (java-checkpoints.ts:77) = practice java-foundations.ts:499 with the same numbers (3 × 2.5 = 7.50, three-line input).
  - java-branch (:86) uses the practice's age thresholds (<12, ≥60; java-foundations.ts:570).
  - java-expressions (:32) = practice / and % plus the exact tracePrompt `1/2*4.0` (java-foundations.ts:191).
  - java-primitives (:50) = practice (large count + 1, satang sum) plus the exact tracePrompt `30*24*60*60*1000` (java-foundations.ts:315).
  - java-loop-sum checkpoint (java-bridges.ts:232) = the topic's own example (sum 1..n, java-bridges.ts:214).
  - java-array-basics checkpoint (java-bridges.ts:429) and java-arrays checkpoint (java-checkpoints.ts:122) use identical data ([18,25,25,31], 20..30, [20,30,19,31]).
  - java-array-copy checkpoint (java-bridges.ts:625) is withoutLowest with [2,5,2,8]. That is exactly the next topic's practice (java-arrays), and verify-java-repair uses the same fixture. So the learner is assessed on it, then practises it.
  - java-project-library-0 equipment CLI (:158) is M0 renamed: add / list / borrow→take / return / quit, numeric ids, error-and-continue.
  - Fix: change the domain and the shape of the task (e.g. frequency count, a max instead of a cap, or a different command grammar). Don't reuse practice or trace data.

M5. Assessments leak the answer.
  - java-variables prompt (java-checkpoints.ts:41) says "ราคาคงที่ ... เลือกfinal" ("the price is fixed ... choose final").
  - java-array-minimum checkpoint (java-bridges.ts:527) asks for the last max on ties. The lesson text (542) and checks[1] (567) already state "ถ้า<=จะเลือกตัวท้าย" ("with <= it picks the last one").
  - java-string practicePrompt (java-foundations.ts:378) prescribes indexOf+substring step by step, and hint 2 (lessons:530) is the full solution code.

M6. A checkpoint model answer doesn't meet its own prompt.
  - java-declarations (java-bridges.ts:35-41) asks "แล้วเปลี่ยนboxesเป็น0 อธิบายว่าบรรทัดไหนเปลี่ยน" ("then change boxes to 0 and explain which line changes"). Rubric item 2 expects B07/0/true.
  - The modelAnswer only prints B07/2/true, with no change step and no explanation.
  - Fix: add the second run (or the `boxes = 0;` variant, which needs java-variables) and the one-line explanation.

M7. Syntax used before it is taught (in new content).
  - `result[next++] = …`, i.e. post-increment used as an index value. java-variables only teaches `x++` as a statement. Seen in java-bridges.ts:631 and :677 (hint) and java-checkpoints.ts:128. Fix: use `result[next] = …; next++;` as in the example.
  - The bridges use `if(value>0)count++;` without braces (java-bridges.ts:417, 435, 480, 515). That contradicts the braces rule in java-branch.
  - `new int[]{…}` / `new int[0]` appear in the java-array-basics starter (416) but are only explained in solutionNotes (489).
  - The java-jdk checkpoint model answer uses `java -cp out` (java-checkpoints.ts:11) before java-multi-file.
  - java-switch bugExplanation uses `throw new IllegalArgumentException`, which comes before java-exceptions-basic.

## MINOR
- java-array-copy, copyExcept with skip out of range: I ran the solution with skip=3 and skip=-1 on [4,2,9]. Both throw `ArrayIndexOutOfBoundsException: Index 2 out of bounds for length 2`.
  - The behaviour is declared out of contract (practicePrompt 611, solutionNotes 687), so this is acceptable.
  - Better: guard `if (skip < 0 || skip >= values.length) throw new IllegalArgumentException(...)` once exceptions are taught, or add it to the java-arrays extension.
  - The starter main (612) doesn't call the skip-first or skip-last cases that acceptance (682) requires.
- java-loop-sum: "แจกคูปองวันแรก2ใบเพิ่มวันละ2ใบ" (java-bridges.ts:218) is ambiguous. It can be read as "+2 per day", total 6, instead of 2+4+6 = 12. Say "วันที่ d ได้ d*2 ใบ" ("day d gets d*2 coupons").
- java-for-basics:
  - checks[1] asks about `i++` but the loop uses `i=i+1` (java-bridges.ts:174).
  - bugExplanation "ตรวจปลาย1ได้1บรรทัด" is unclear (131).
- java-variables model answer: final constants named `first`/`second`, against the lesson's UPPER_SNAKE_CASE rule. It also has the garbled phrase "เปลี่ยนโครงเป็นconstไม่มีในJava" (java-checkpoints.ts:47).
- java-jdk rubric (java-checkpoints.ts:8) only accepts "javac then java ClassName". `java PackStart.java` (taught in the same topic) should also count.
- java-jdk prerequisites dropped dev-editor/dev-errors (java-foundations.ts:24), yet lessons/java-foundations.ts:25 tells learners to review dev-editor.
- Duplicate setup blocks: the new "อ่านโครงไฟล์แรกก่อนคัดลอก" block (lessons:24) repeats block "0)" (25), and an unnumbered block now comes before "0)".
- JDK setup:
  - The Windows advice to add bin to the *User* Path doesn't override an older Java on the *System* Path. Say "move JDK 21 above older entries in System Path, or remove the old javapath".
  - The WSL steps don't say how a tar.gz downloaded in a Windows browser reaches the WSL folder (`cp /mnt/c/Users/<you>/Downloads/…`). `sudo apt install openjdk-21-jdk` is simpler on Ubuntu WSL.
  - The PowerShell section has no code block with the commands (`java --version`, `Get-Command java`).
  - Low confidence: nothing covers Thai console output on non-Thai-locale Windows.
- Bridges are thin:
  - vocabulary is [] for all 7.
  - hook = why, explain[0] = explanation, walkthrough = traceAnswer split, pitfalls[0] = bugExplanation, recap = objective.
  - reflection and traceHint are the same generic text in all 7.
- java-method-basics example name `doubleValue` collides with the type word `double`. Rename it to `twice`.
- `explain[].language` is only read by the verifier. The UI (generate.ts:14) drops it, so it's harmless but undocumented.

## Verified OK
- Order array (java-foundations.ts:1688): declarations before output/expressions; for-basics/loop-sum before loops; method-basics before methods; array-basics/minimum/copy before arrays. All prerequisites point earlier. All 18 original IDs are kept, and progress keys are untouched.
- Java Foundations needs no JS/web: java-jdk prerequisites are dev-files and dev-terminal only.
- All 25 examples, starters, solutions and buggy bugChecks pass the JDK 21 verifier. Contract mutants in verify-java-repair are rejected. EquipmentMain behaves as specified and is readable.
- The java-string rewrite (indexOf/substring) is correct and compiles. Example output "1" for `"a,b,c".indexOf(",")` is correct.
- java-primitives bug now has no `if`. The M0→M1 note (lessons:1286) correctly says M0 fixtures can't check M1.
- Shell separation is correct inside the checkpoint answers for java-scanner (:83), java-multi-file (:155) and the library-0 checkpoint (:166). `Get-Content input.txt | java Main` is valid PowerShell.
- The Bash JDK archive commands are correct (`tar -xf … -C jdk21 --strip-components=1`, `export JAVA_HOME/PATH`, `command -v`). The Temurin URLs are right.
- `javac` then `java X.java` in the same folder works on this JDK 21.0.12 (I tested it), so the java-jdk practice of running both ways is fine.
