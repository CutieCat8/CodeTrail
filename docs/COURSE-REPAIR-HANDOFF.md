# ส่งต่อ curriculum repair (สำหรับ session ใหม่)

อัปเดต 2026-10-06 โดย Claude (Opus 5.5) · ฉบับก่อนหน้าของ Codex ดูได้ที่ `git show 2691362:docs/COURSE-REPAIR-HANDOFF.md`
**รอบปรับหลักสูตรยังไม่จบ** เอกสารนี้แยกสิ่งที่ยืนยันแล้วกับสิ่งที่ยังไม่ได้ตรวจ อย่าถือว่า WIP ผ่าน

## 0. สถานะล่าสุด (2026-10-06, Sonnet 5.5): รวมรอบซ่อม R1/JS/Developer Foundations/Java เข้า main แล้ว

- main = `ce0f92c` (merge feat/curriculum-learning-repair); feat ผสม r2/js-fix (41b6341) และ r2/java-fix (2eeaf63) แบบ `--no-ff` ไม่มี conflict (commit Run button 1ff38b0 บน js-fix เป็น patch เดียวกับ 40f7646 ที่มีใน feat อยู่แล้ว)
- ตรวจบนผลรวมครั้งเดียว: `npx tsc --noEmit` ผ่าน, `npm run lint` ผ่าน, vitest 8 ไฟล์ 416/416 (ต้องตั้ง `NO_COLOR=1 FORCE_COLOR=0`), `verify-java-lessons` 46 บท 0 fail, `verify-java-repair` PASS, `npm run build -- --webpack` ผ่าน
- Browser (Playwright/Chromium, production build บน :3100, หยุด server แล้ว): เปิดบทเรียน JS, JS checkpoint มีปุ่ม Run และรันได้, ส่งคำตอบแล้วกด Hint / Solution เห็นเฉลย (pre-wrap), Java checkpoint ไม่มีปุ่ม Run แต่ส่งและเห็นเฉลยได้, practice มี Run tests, ไม่มี console/page error ไม่ได้ตรวจ mobile, a11y, หรือทุกบท
- ไม่ push/deploy; r3/*, r4/labs ไม่ถูกรวม (ร่าง TypeScript/Node ไม่พร้อม); worktrees ทั้งหมดยังอยู่ (`../sfq-main` เป็น worktree ของ main สำหรับการรวมครั้งนี้)
- Independent review JS + Developer Foundations: **Gemini (อ่านอย่างเดียว) ให้ PASS** ที่ snapshot f7b3873 และยืนยันที่ 1ff38b0 (C1–C5, M1–M5, m5, m9, dev-git ปิดครบ; M6/m6/m8 ไม่บล็อก; tsc/eslint ผ่าน, vitest 350/350 บนชุดที่เกี่ยวข้อง) ผลอยู่ที่ `C:\Users\Asus\Desktop\REVIEW_JS_DEV_FOUNDATIONS_SUMMARY.md` (ไม่ได้คัดลอกเข้า repo) ส่วน Java ยังเป็น self-check ไม่มี independent review หลังแก้

### Backlog (ไม่บล็อกการใช้งาน)
1. M6 test guard: walkthrough ไม่มี `traceAnswer.slice(0,40)`, pitfalls ไม่มี `bugExplanation.slice(0,40)`, code field ไม่มีบรรทัด > 120, glue Thai/Latin; test `curriculum-quality` ที่ล้มเมื่อไม่ตั้ง `FORCE_COLOR=0` ควรกำหนด env ใน runNode
2. JS: m6 (ชื่อไฟล์ใน editor `index.mjs` vs `process-lab.js`), m8, หมายเหตุ `JSON.stringify` ใน js-objects; checkpoint js-runtime และ js-modules-json รันเต็มไม่ได้ในสคริปต์ตรวจ (อ่านเทียบ rubric เอง)
3. Java: checkpoint `java-project-library-0` ซ้ำโดเมน M0 (เปลี่ยนต้องแก้ `docs/verification/R2-Java/EquipmentMain.java` และ fixture); `copyExcept` ไม่มี skip guard (อยู่นอกสัญญา); minors ที่ checks.md ระบุ
4. ยังไม่ทำ: R3 (TypeScript, Node, Back-end/SQL, Java OOP), R4 labs, R5 รวม; browser mobile/a11y ทั้งคอร์ส

## 1. สถานะ repo (ตรวจจริงตอนเขียน)

- Repo หลัก `/home/cnux/work/sea-fullstack-quest` · branch `feat/curriculum-learning-repair` · HEAD ก่อน commit เอกสารนี้ `c524f16`
- Working tree หลัก: ไม่มีไฟล์ tracked ค้าง; untracked เฉพาะ `.omc/` และ `src/content/curriculum/.omc/` (state ของเครื่องมือ OMC ห้าม commit ไม่ต้องลบ)
- Commit identity ที่ใช้: `Claude <claude@local.invalid>` ผ่าน env ต่อคำสั่ง (`GIT_AUTHOR_NAME=Claude GIT_AUTHOR_EMAIL=claude@local.invalid GIT_COMMITTER_NAME=Claude GIT_COMMITTER_EMAIL=claude@local.invalid git commit ...`) ไม่แก้ git config; Codex ใช้ `Codex <codex@local.invalid>` แบบเดียวกัน
- `/node_modules` ถูกเพิ่มใน `.git/info/exclude` เพราะทุก worktree ใช้ symlink `node_modules` → repo หลัก

Commits บน branch หลักหลัง Codex (2691362):

| commit | เนื้อหา |
|---|---|
| 08c79b4 | `docs/R3-WRITER-BRIEF.md` สัญญาการเขียนของทุกชุด |
| 68aa1fb, c524f16 | handoff ระหว่างทาง |
| f7bbe3a, ac46a7c | บันทึก independent review (ดูข้อ 3) |
| 40f7646 | UI: assessment ของ JavaScript มีปุ่ม Run (ไม่มี tests) เพื่อเก็บ output เป็นหลักฐาน; `.reveal pre` ตัดบรรทัด; ข้อความหลังส่งของ assessment; test ใหม่ใน `tests/assessment-workspace.test.tsx` |

## 2. Worktrees (ทั้งหมดยังไม่ merge เข้า branch หลัก)

| path | branch | HEAD | สถานะจริง |
|---|---|---|---|
| ../sfq-r2-javafix | r2/java-fix | 8d34e93 | e8260d2 + กลุ่ม 1–2 (self-check ครบ review Java ยกเว้นข้อค้างใน checks.md) บันทึกที่ `docs/verification/R2-Java-fix/checks.md` ในบรานช์นั้น; รอ independent review |
| ../sfq-r2-jsfix | r2/js-fix | f7b3873 | **ปิดแล้ว (self-check)**: 3f60427 + 86cf82b ตรวจแล้ว + 7b08748 + f7b3873 (Developer Foundations) บันทึกที่ `docs/verification/R2-JS-fix/checks.md` ในบรานช์นั้น; รอ independent review (Gemini อ่านอย่างเดียว) |
| ../sfq-r3-node | r3/node | e8c37e0 | WIP ร่าง `node-foundations.ts` (+907/−123) **compile ไม่ผ่าน**: import `./node-bridges` และ `./node-checkpoints` ที่ยังไม่ได้สร้าง |
| ../sfq-r3-typescript | r3/typescript | de9bb5c | WIP มีเพียง `typescript-bridges.ts` (617 บรรทัด) ร่าง ยังไม่ wire เข้า `typescript.ts` ไม่ได้ตรวจ |
| ../sfq-r3-backend | r3/backend | 08c79b4 | ยังไม่เริ่ม |
| ../sfq-r3-oop | r3/oop | 08c79b4 | ยังไม่เริ่ม |
| ../sfq-r4-labs | r4/labs | 08c79b4 | ยังไม่เริ่ม; untracked `scripts/_tmp_dump.ts`, `scripts/_tmp_dump2.ts` (ไฟล์ช่วยของ agent ที่หยุด ไม่ใช่งานส่งมอบ) |

Branch ทั้งหมดแยกจาก 08c79b4 ขึ้นไป; การรวมให้ทำทีละ branch ด้วย `git merge --no-ff <branch>` หลังตรวจผ่านเท่านั้น ห้ามลบ worktree ที่มีงาน

## 3. Independent review ของงาน Codex (เสร็จแล้ว, read-only, Claude)

- [review-R1-JS.md](verification/REVIEW-R1-R2/review-R1-JS.md): R1 b7f8aa5 + R2-JS 8ca15ac → **REQUEST CHANGES** (Critical 5 / Major 6 / Minor 11)
- [review-R2-Java.md](verification/REVIEW-R1-R2/review-R2-Java.md): R2-Java f79b9e2 (+ส่วน Java ของ b7f8aa5) → **REQUEST CHANGES**
- ผู้ review ยืนยันว่าถูกต้อง: IDs เดิมครบ, prerequisites มาก่อนตามลำดับ, model answer JS 24 ข้อและ Java 18 ข้อให้ตัวเลขตรง rubric, verifier Java 25 บท 0 fail, คำสั่ง shell ของ Developer Foundations ตรง shell ที่ระบุ, assessment gating ทำงาน
- ข้อค้นพบร่วมที่สำคัญ: concept step เผย trace/debug answer (walkthrough=traceAnswer, pitfalls=bugExplanation) ใน bridge 7 JS + 7 Java; code/model answer ถูกบีบบรรทัดเดียวและภาษาไทยถูกตัดช่องว่าง (Java 2 ประโยคความหมายกลับ); checkpoint หลายข้อแค่เปลี่ยนชื่อจาก practice

## 4. สถานะการแก้ตาม review

**e8260d2** (r2/java-fix) — แก้เฉพาะ `java-bridges.ts`: format Java หลายบรรทัด + braces, คืนช่องว่างภาษาไทย (รวม C1 สองประโยคที่ความหมายกลับ), walkthrough/pitfalls ไม่เผยคำตอบ, สอน `split` ใน java-array-basics, checkpoint ของ bridge เปลี่ยนรูปโจทย์
- ตรวจแล้ว: ไม่มีหลักฐาน — agent ถูกสั่งให้ผ่าน `tsc --noEmit` ก่อน commit แต่ไม่มี log/checks.md; **ยังไม่ได้รัน vitest, lint, Java verifier**
- ค้าง (Java review): C2 คำสั่ง Bash ใน PowerShell path (`java-foundations.ts`, `lessons/java-foundations.ts`), C3 ส่วนที่เหลือ (objective ของ java-string, ยืนยันว่า split สอนก่อน java-arraylist), M1/M2 ของ `java-checkpoints.ts` (model answer 17 ข้อบรรทัดเดียว + spacing) และ `lessons/java-foundations.ts`, M3 (array ใน java-loops buggy, cast ใน java-primitives), M4/M5 checkpoint ใน `java-checkpoints.ts`, M6 (java-declarations อยู่ใน bridges — ตรวจว่าแก้แล้วหรือยัง), M7, minors

**3f60427** (r2/js-fix) — แก้เฉพาะ `javascript-bridges.ts`: C1 leak, M1 checkpoint ใหม่ของ js-array-basics/js-function-values/js-loop-control/js-nested-loops, M2 readability ของ bridges, M3 ตัด callback/this ใน js-function-values, M4 js-function-basics, m4 wording ของ js-loop-basics
- ตรวจแล้ว: ไม่มีหลักฐานเช่นเดียวกัน; **ยังไม่ได้รัน vitest/lint/รัน model answer**

**86cf82b** (r2/js-fix) — **WIP ยังไม่ตรวจ** agent ถูกผู้ใช้หยุดกลางทาง: `javascript-checkpoints.ts` (+703 บรรทัด เขียน checkpoints ของ 20 บทเดิมใหม่ — ยังไม่รู้ว่าครบ/ถูกหรือไม่), `javascript-foundations.ts` (js-runtime bug อธิบาย recursion, js-values "ค่าทั้งสอง", js-numbers buggy ไม่ใช้ if/else, starter ของ js-conditions/js-objects เปลี่ยนเล็กน้อย), `lessons/javascript-foundations.ts` (อธิบาย % และ === ใน js-numbers)

ค้าง (R1+JS review) นอกจากที่ WIP อาจแตะ: C3 js-errors checkpoint ซ้ำ bug, C4 model answer js-async, C5 dev-process trace/example, M1 checkpoint ที่เปลี่ยนชื่อ 12 ข้อใน `javascript-checkpoints.ts`, M2 model answer dev 9 ข้อ, M3 ส่วน Developer Foundations (Get-Content/cat, ~/.bashrc ก่อน dev-editor, git show ใน dev-git rubric, const/Number ใน dev-errors) และ js-async `.join`, ternary ใน js-conditions, M5 js-values, minors m5 m6 m8 m9 (m10 เป็นของ OOP), M6 test guard (เป็นงาน coordinator — ข้อ 7)

## 5. Checks ที่ผ่านจริง (แยกจากงานที่ยังไม่ตรวจ)

| check | ผล | ขอบเขต/commit |
|---|---|---|
| Codex: lint, typecheck, Vitest 8 files/415 tests, build `--webpack`, Java verifier 25 บท, browser Java 125 steps | ผ่าน (รายงานของ Codex) | source f79b9e2 |
| Reviewer Java: `verify-java-lessons.ts` 25 บท 0 fail, `verify-java-repair.ts` PASS, compile/run model answer 18 ข้อ | ผ่าน | f79b9e2 (ก่อนแก้) |
| Reviewer JS: content + assessment-workspace tests ผ่าน; curriculum-quality 1 fail = timeout 5 s ของ tsc warm-up ใน ts-why (น่าจะเป็น environment) | ผ่านยกเว้น timeout | 2691362 |
| `scripts/verify-lesson-deps.ts` (Express/PGlite) | 13 topics, 0 fail | 2691362 (baseline) |
| `tsc --noEmit`, eslint ไฟล์ที่แก้, `tests/assessment-workspace.test.tsx` 4/4 | ผ่าน | 40f7646 |

**ยังไม่ได้ตรวจ:** e8260d2, 3f60427, 86cf82b, ร่าง Node/TS ทั้งหมด; full `npm test`/build หลัง 40f7646; browser หลัง R2
Preview :3100 **หยุดแล้ว** ต้อง build + start ใหม่ก่อนตรวจ browser

## 5.1 อัปเดต session Sonnet 5.5 (2026-10-06)

ปิดชุด JavaScript + Developer Foundations บน r2/js-fix: tsc/eslint ผ่าน, vitest 349/349 (ต้องใช้ `NO_COLOR=1 FORCE_COLOR=0` ไม่งั้น test ตัวอย่าง Node ล้มเพราะสี ANSI), model answer JS รันใน Node ตรง rubric. ไม่ได้ทำ: M6 test guard, m6, m8. Java ปิดตามขอบเขตแล้ว (self-check) ที่ r2/java-fix 8d34e93: checkpoints 18+7 ข้อ compile/run ตรง rubric, `verify-java-lessons` 46 บท 0 fail, `verify-java-repair` PASS, full vitest 415/415, `npm run lint` ผ่าน (build/browser ไม่ได้รัน)

**งานค้าง (ห้ามถือว่าปิดสมบูรณ์):** (1) JS: รอผล Gemini ที่ snapshot f7b3873 + M6 test guard (walkthrough/pitfalls ไม่เผยเฉลย, code ไม่มีบรรทัด >120) ทำหลัง merge r2/* ไม่ได้ merge ในรอบนี้, m6 ชื่อไฟล์ใน editor, m8; (2) Java: checkpoint library-0 ซ้ำโดเมน M0 (ตัดสินใจว่าจะเปลี่ยนโดเมนไหม), `copyExcept` skip guard, build + browser หลัง R2; (3) ยังไม่ merge r2/js-fix และ r2/java-fix เข้า feat/curriculum-learning-repair; (4) ทั้งหมดเป็นงาน Claude รอ independent review

## 6. งานแรกของ session ใหม่ (ทำเสร็จแล้วตามข้อ 5.1): ปิด JavaScript บน r2/js-fix ทีละกลุ่ม

ทำใน `../sfq-r2-jsfix` เท่านั้น ทีละกลุ่ม และ commit หลังแต่ละกลุ่มผ่าน:
1. ตรวจ 3f60427 (bridges): `npx tsc --noEmit`, `npx vitest run tests/curriculum-quality.test.ts tests/content.test.ts tests/runner-compare.test.ts`, อ่าน diff เทียบ review ข้อ C1/M1–M4 ของ bridges
2. ตรวจ WIP 86cf82b ส่วน `javascript-foundations.ts` + `lessons/javascript-foundations.ts` (diff เล็ก) แล้ว commit เป็น fix ที่ตรวจแล้ว
3. ตรวจ `javascript-checkpoints.ts` ใน WIP ทีละบท: model answer หลายบรรทัด, ภาษาไทยเว้นวรรค, รูปโจทย์ใหม่ไม่ใช่เปลี่ยนชื่อ, ไม่บอก algorithm, รัน model answer ใน Node ให้ตรง rubric; แก้ C3/C4/M5 ถ้ายังไม่ครบ
4. Developer Foundations (C5, M2, M3 ส่วน dev, m5 m6 m8 m9) — ถ้าเปลี่ยน checkpoint ของ dev-files ต้องแก้ `tests/assessment-workspace.test.tsx` ที่อ้าง heading `/ประเมินการอ่าน path/` และวลี `จาก club/src ใช้`
5. บันทึก `docs/verification/R2-JS-fix/checks.md` (finding → fix → evidence)
จากนั้นทำ Java ต่อบน r2/java-fix ตามรายการค้างข้อ 4 แล้วค่อย merge สอง branch นี้

## 7. ลำดับงานหลังจากนั้น

1. Coordinator หลัง merge r2/*: เพิ่ม test guard (walkthrough ไม่มี `traceAnswer.slice(0,40)`, pitfalls ไม่มี `bugExplanation.slice(0,40)`, code field ไม่มีบรรทัด > 120 ตัวอักษร) แล้วรัน tsc/lint/full test/build
2. R3 ตาม [R3-WRITER-BRIEF](R3-WRITER-BRIEF.md): TypeScript (narrowing basics→discriminated union→type predicate→exhaustive; generics basics→constraints→keyof/indexed access; checkpoints ทุกบท; M3) และ Node (ใช้ร่าง WIP ได้แต่ต้องตรวจใหม่; checkpoints; M4; assessment CLI ใหม่)
3. R3 Back-end/SQL (tables→CRUD/WHERE→constraints/keys→relationships→JOIN→aggregation, วิธีรัน SQL ในเครื่อง, auth แยก, เฉลย routes ครบ, M5–M7) และ Java OOP (references ก่อน identity/override, file I/O + วิธีรัน JUnit ก่อน capstone, checkpoints, Library M1–M3/RPG)
4. R4 labs 22 บท (solutionNotes, verify steps ต่อ shell, reflection เฉพาะ lab, `scripts/verify-labs.ts`) — React/Next labs ต้องบอกตรงว่าคอร์สยัง planned
5. R5 รวม: coverage ทั้ง 7 คอร์ส, full checks, browser (routes/interaction/focus/mobile/TypeScript illustration) ใน context แยก

ข้อจำกัดด้าน quota: 2026-10-05 รัน agents 7 ตัวพร้อมกันแล้วชน session limit ก่อน commit → ไม่เกิน 2 ตัวพร้อมกัน, commit ทีละส่วน

## 8. ข้อกำหนดและข้อห้ามที่ยังมีผล

- รักษา topic/step IDs, hash URL, storage และความคืบหน้าผู้เรียนเดิม ห้าม rename/ลบ ID; เพิ่มบทด้วย ID ใหม่และ order array
- ห้าม push, merge เข้า main, deploy หรือแตะ repo ต้นฉบับ `/mnt/c/...`; การ merge ระหว่าง branch งานกับ `feat/curriculum-learning-repair` ในเครื่องทำได้หลังตรวจ
- ห้าม reset/clean/ลบงานใน worktree ใดเพื่อให้สะอาด
- ไม่ใช้ OMC team ที่เปิด bypass, ไม่ใช้ `--dangerously-bypass-approvals-and-sandbox`, ไม่แก้ config เพื่อข้ามสิทธิ์
- Backlog: Import, XP, streak, AI assistant; React/Next.js/PostgreSQL เต็มคอร์สยัง planned (แต่ SQL ใน Back-end ต้องใช้เรียนต่อได้จริง)
- รายงานตรงความจริง: แยก implementation / checks / browser / independent review; งานที่ Claude เขียนยังรอ independent review จาก Codex
- ภาษาไทยอ่านง่าย, โค้ดหลายบรรทัด, PowerShell กับ Bash/WSL แยกชัด, ไม่คัดลอกเนื้อหาแพลตฟอร์มอื่น

## 9. เครื่องมือตรวจ

```bash
npx tsc --noEmit && npm run lint && npx vitest run
npm run build -- --webpack            # Turbopack เคยติด EPERM ใน sandbox
VERIFY_DIR=/tmp/lesson-verify ./node_modules/.bin/vite-node --config vitest.config.ts scripts/verify-lesson-deps.ts
JAVA_HOME=/tmp/sea-quest-java-tools/jdk21 JUNIT_JAR=/tmp/sea-quest-java-tools/junit-platform-console-standalone-6.1.3.jar \
  ./node_modules/.bin/vite-node --config vitest.config.ts scripts/verify-java-lessons.ts   # JAVA_TOPIC_IDS=a,b เลือกบท
npm run start -- --hostname 127.0.0.1 -p 3100   # preview หลัง build
```

เครื่องมืออยู่ใน /tmp (อาจถูกล้าง): JDK 21 + JUnit 6.1.3 ที่ `/tmp/sea-quest-java-tools`, Express 5.2.1/PGlite 0.5.8/pg ที่ `/tmp/lesson-verify` (สร้างใหม่: `mkdir -p /tmp/lesson-verify && cd /tmp/lesson-verify && npm init -y && npm pkg set type=module && npm install express@5.2.1 @electric-sql/pglite@0.5.8 pg`), Playwright/Chromium ที่ `/tmp/sea-quest-browser` (วิธีเตรียมใน [COURSE-REPAIR-EVIDENCE](COURSE-REPAIR-EVIDENCE.md) ส่วน R1)

## 10. Processes ตอนเขียน

ไม่มี worker ของงานนี้ทำงาน (ไม่มี vitest/vite-node/java/next-server/agent) ที่ยังเปิดอยู่: Codex CLI PID 236304 (cwd repo หลัก, ไม่เปิดไฟล์ใน repo), Codex app-server daemons, Claude PID 19402 (cwd `/mnt/c/...` session audit เดิม), Claude PID 260047 = terminal ของ session นี้
