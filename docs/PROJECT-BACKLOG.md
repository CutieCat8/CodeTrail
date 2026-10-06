# CodeTrail (Sea's Full-stack Quest): backlog งานที่เหลือ

อัปเดต 2026-10-06 · โปรเจกต์ **PAUSED** ดูวิธีรับช่วงใน [COURSE-REPAIR-HANDOFF.md](COURSE-REPAIR-HANDOFF.md) ข้อ 0
backlog ระบบ/UI (Import, XP, streak, runner) อยู่ที่ [REDESIGN-HANDOFF.md](REDESIGN-HANDOFF.md) ส่วน "Backlog ระบบ" ไม่คัดลอกซ้ำที่นี่
งานที่ปิดแล้วและอยู่ใน main (`7714c96`): R1 Developer Foundations tools, R2 JavaScript + Developer Foundations (Gemini PASS), R2 Java Foundations (self-check) ไม่นับเป็นงานค้าง

สัญญาการเขียนทุกชุด: [R3-WRITER-BRIEF.md](R3-WRITER-BRIEF.md) · กฎร่วม: ไม่ rename/ลบ topic/step ID, ไม่ push/deploy โดยไม่ได้รับอนุญาต

## งานหลักสูตร (ลำดับที่แนะนำ)

| # | งาน | สถานะ | ร่าง/หลักฐานที่มี | เสร็จเมื่อ |
|---|---|---|---|---|
| 1 | **TypeScript** (R3) | ร่างค้าง ยังไม่ตรวจ ยังไม่ wire | branch `r3/typescript` @ `b1d76bf`: `typescript-bridges.ts` 617 บรรทัด (ts-discriminated-unions, ts-type-predicates, ts-exhaustive-never, ts-narrowing-review, ts-generic-constraints, ts-keyof-indexed) ไม่เข้า `typescript.ts` | บทใหม่ตามขอบเขต: narrowing basics→discriminated union→type predicate→exhaustive; generics basics→constraints→keyof/indexed access; checkpoints ทุกบท (บริบทใหม่); M3 ไวยากรณ์ก่อนสอน; prerequisites ถูกลำดับ; `tsc`/lint/vitest ผ่านด้วย `NO_COLOR=1 FORCE_COLOR=0`; model answer รันได้ตรง rubric; ID เดิมครบ; self-check บันทึกใน `docs/verification/R3-TypeScript/checks.md` |
| 2 | **Node.js** (R3) | ร่างค้าง compile ไม่ผ่าน | branch `r3/node` @ `fbf785c`: `node-foundations.ts` +907/−123 import `./node-bridges` และ `./node-checkpoints` ที่ยังไม่มี | ใช้ร่างเป็นฐานแต่ตรวจใหม่; สร้าง bridges/checkpoints; checkpoints ใหม่; M4; assessment แบบ CLI ใหม่; Node examples ผ่าน `curriculum-quality`; checks.md |
| 3 | **Back-end/SQL** (R3) | ยังไม่เริ่ม | branch `r3/backend` @ `0be1ffe` (ว่าง) | tables→CRUD/WHERE→constraints/keys→relationships→JOIN→aggregation; วิธีรัน SQL ในเครื่อง; auth แยกบท; เฉลย routes ครบ; M5–M7; `scripts/verify-lesson-deps.ts` 0 fail; checks.md |
| 4 | **Java OOP** (R3) | ยังไม่เริ่ม | branch `r3/oop` @ `0be1ffe` (ว่าง) | references ก่อน identity/override; file I/O + วิธีรัน JUnit ก่อน capstone; checkpoints; Library M1–M3/RPG สอดคล้อง prompt↔starter↔solution↔acceptance; `verify-java-lessons.ts` 0 fail; checks.md |
| 5 | **Projects/Labs** (R4) 22 บท | ยังไม่เริ่ม | branch `r4/labs` @ `0be1ffe`; untracked `scripts/_tmp_dump.ts`, `_tmp_dump2.ts` (ไฟล์ช่วย ไม่ใช่งานส่งมอบ) | solutionNotes ทุก lab; ขั้นตรวจแยกตาม shell; reflection เฉพาะ lab; `scripts/verify-labs.ts`; labs React/Next บอกตรงว่าคอร์สยัง planned |
| 6 | **R5 รวม** | รอ 1–5 | — | coverage ทั้ง 7 คอร์ส; tsc/lint/full vitest/build `--webpack`/verifiers; browser (routes, interaction, focus, mobile, TypeScript illustration) ใน context แยก; independent review |

## ข้อค้างเล็ก (ไม่บล็อกการใช้งาน)

| รายการ | สถานะ | หลักฐาน | เสร็จเมื่อ |
|---|---|---|---|
| M6 test guard | ยังไม่ทำ | review-R1-JS ข้อ M6; `tests/content.test.ts:54` ลดเป็น `explain.length > 0` | test ตรวจ walkthrough ≠ traceAnswer, pitfalls ไม่มี bugExplanation, ไม่มีบรรทัดโค้ด > 120, ไม่มี glue ไทย–Latin เกินเกณฑ์ และกำหนด `FORCE_COLOR=0` ใน `runNode` ของ `curriculum-quality` |
| JS m6: ชื่อไฟล์ editor `index.mjs` vs `process-lab.js` ใน dev-process | ยังไม่ทำ (Gemini: ไม่บล็อก) | `docs/verification/R2-JS-fix/checks.md` | หัวไฟล์ใน UI ตรงกับบทเรียน หรือบทระบุชัดว่าเป็นไฟล์ทดลอง |
| JS m8: dev-files checkpoint ใช้ทักษะ `../` ซ้ำ | ยอมรับได้ | review-R1-JS m8 | ตัดสินว่าจะเปลี่ยนโจทย์หรือไม่ |
| Java: checkpoint `java-project-library-0` ซ้ำโดเมน M0 | ตัดสินใจ | `java-checkpoints.ts`, `docs/verification/R2-Java/EquipmentMain.java` | เปลี่ยนโดเมนพร้อมแก้ EquipmentMain + fixtures ใน `verify-java-repair.ts` หรือบันทึกว่ารับได้ |
| Java: `copyExcept` ไม่มี skip guard | นอกสัญญา | review-R2-Java minor | เพิ่ม guard หลังสอน exceptions หรือบันทึกว่ารับได้ |
| Java: independent review หลังแก้ | รอ | `docs/verification/R2-Java-fix/checks.md`, branch `r2/java-fix` @ `baa8619` (เนื้อเดียวกับ main) | Gemini/Codex ตรวจแบบอ่านอย่างเดียว แล้วจัดการ findings |
| Browser mobile/a11y ทั้งคอร์ส | ยังไม่ตรวจ | ตรวจแล้วเฉพาะ flow เปิดบท/Run/เฉลย | อยู่ใน R5 |
| `js-runtime`, `js-modules-json` model answer รันเต็มด้วยสคริปต์ไม่ได้ | Gemini ตรวจมือแล้ว | `REVIEW_JS_DEV_FOUNDATIONS_SUMMARY.md` (Desktop ของผู้ใช้) | ไม่ต้องทำ เว้นแต่ทำสคริปต์หลายไฟล์ใน R5 |
