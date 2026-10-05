# Course progress

## รอบแก้หลัง curriculum audit (Codex ลงมือหลัก)

ฐาน faa1de2 → branch `feat/curriculum-learning-repair` · 2026-10-05
สถานะทั้งรอบ: **in progress**; บันทึก B0–B8 ด้านล่างเป็นประวัติการเขียน ไม่ใช่การผ่านเกณฑ์คุณภาพรอบใหม่
แผนล่าสุด: [COURSE-REPAIR-PLAN.md](COURSE-REPAIR-PLAN.md) · coverage/หลักฐาน: [COURSE-REPAIR-EVIDENCE.md](COURSE-REPAIR-EVIDENCE.md)
Claude ติด usage limit ตามผู้ใช้; Codex เขียนและตรวจเองในรอบนี้ ยังไม่มี independent review ของ diff ใหม่ ไม่อ้างว่าทั้งสอง AI ตรวจแล้ว

R1 implement แล้ว: ลำดับ files → terminal → Node/npm tools → editor → program → process → errors → Git → docs; คง IDs เดิมและเพิ่ม dev-runtime-tools
เพิ่ม checkpoint เฉพาะเรื่องใน Developer Foundations พร้อม rubric/model answer หลังส่ง ไม่มี starter algorithm; การส่งข้อความบันทึกความพยายาม ไม่ใช่ยืนยันถูก
แก้ความขัดกัน oop-constructor / oop-polymorphism / M0→M1; เพิ่ม JDK setup และ prerequisite npm ของ ts-why
R2-JS implement และตรวจแล้ว: ทางเริ่มจากศูนย์/สะพาน function-loop-array/28 checkpoint เฉพาะเรื่อง; IDs เดิมคงอยู่ รายละเอียดใน COURSE-REPAIR-EVIDENCE
R2-Java และ R3–R4 ยัง planned: Java Foundations, TypeScript/Node/Back-end/OOP, SQL, projects และ 22 labs ยังไม่ปิด
R5 ตรวจ baseline ชุดแรกแล้ว: build Webpack ผ่าน; browser เปิด 7 courses/545 steps/22 labs และตรวจ interaction ตัวแทน/TypeScript/mobile ผ่าน ต้องรันใหม่หลัง R2–R4; ไม่ใช่ final acceptance ทั้งรอบ


อัปเดต: 2026-10-05 · branch `feat/curriculum-expansion` · แผน: `docs/COURSE-PLAN.md`

สถานะ inventory (ก่อนเริ่มงาน, ฐาน `57e1cd2`):
- **rich-ต้องเติม** = เนื้อหาครบแต่ยังขาด checks/acceptance/hint 3 ระดับตามมาตรฐานใหม่
- **บาง** = สร้างจาก template: คำอธิบาย 140–220 ตัวอักษร ตัวอย่าง/โจทย์สั้น ไม่มี analogy, checks, hints หรือ prerequisite links
- **planned** = ยังไม่มีเนื้อหา

คอลัมน์: เขียน (มาตรฐานใหม่) · เทคนิค (test/compiler/Codex) · UI (แสดงผล/ลิงก์/ลำดับในเว็บ)

## Developer Foundations (8)

| Topic | Inventory | เขียน | เทคนิค | UI |
|---|---|---|---|---|
| dev-program, dev-files, dev-terminal, dev-process, dev-errors, dev-editor, dev-git, dev-docs | rich-ต้องเติม | – | – | ✓ เดิม |

## JavaScript Foundations — ชุด B2 เสร็จ (20 หัวข้อ, 100 steps)

ลำดับจริงในคอร์ส: js-runtime → js-values → js-variables → js-strings → js-numbers → js-conditions → js-functions → js-scope → js-loops → js-arrays → js-objects → js-errors → js-references → js-callbacks → js-project-planner-1 → js-exceptions → js-modules-json → js-promises → js-async → js-project-planner-2

| สถานะ | รายละเอียด |
|---|---|
| เขียน | ทุกหัวข้อ `standard: "v3"` (8 หัวข้อเดิมเขียนใหม่ทั้งหมด ID เดิม + 12 หัวข้อใหม่) |
| ตรวจเทคนิค | tests: ตัวอย่างทุกหัวข้อ + code ใน explain รันผ่าน snippet worker จริงและตรง expectedOutput; autoCheck 11 หัวข้อ (solution ผ่าน/starter และ wrongAnswers ไม่ผ่าน); outputCheck 5 หัวข้อ (values, variables, strings, numbers, conditions) · Codex audit รอบ 1 พบ 12 ข้อ แก้ครบ (ดูบันทึกชุดงาน) |
| ตรวจเชื่อม UI | build ผ่าน; ยังไม่ได้ตรวจใน browser (รอตรวจ) |
| หมายเหตุ ID | ไม่มี ID เปลี่ยน; ตำแหน่ง (position) ของ step ในคอร์สเปลี่ยนเพราะเพิ่มหัวข้อและย้าย js-errors ไปหลัง js-objects |
| ตรวจเองในเครื่อง | js-modules-json (import/export ต้องรันหลายไฟล์), js-promises/js-async (runner ตรวจอัตโนมัติไม่ได้สำหรับ Promise จึงใช้ checklist + output) |

## TypeScript Foundations → Intermediate — ชุด B3 เขียนแล้ว (14 หัวข้อ, 70 steps) · โลก “Type Observatory”

ลำดับ: ts-why → ts-basic-types → ts-functions → ts-object-types → ts-arrays-tuples → ts-unions-literals → ts-narrowing → ts-null-safety → ts-generics → ts-utility-types → ts-classes → ts-config → ts-async-types → ts-project-planner (Planner M3)

| สถานะ | รายละเอียด |
|---|---|
| เขียน | ทุกหัวข้อ `standard: "v3"`, คอร์ส `typescript` เปลี่ยนเป็น live |
| ตรวจเทคนิค | tests: example, solution และ code ใน explain ทุกหัวข้อ type-check ผ่านด้วย TypeScript 5.9.2 (strict); example ที่ transpile แล้วรันผ่าน snippet worker ตรง expectedOutput; ขั้นแก้บั๊กที่อ้างว่า “tsc แจ้ง/ผ่าน” ตรงกับ diagnostics จริง · Codex review: ดูบันทึกชุดงาน |
| ตรวจเชื่อม UI | ภาพโลกใหม่ `public/art/typescript-observatory.svg` (pixel art 32×32 วาดด้วย script) ผูกกับคอร์สในหน้า Curriculum; build ผ่าน; ยังไม่ได้ตรวจใน browser |
| ข้อจำกัด | เว็บรัน TypeScript ไม่ได้ (runner เป็น JavaScript) practice ทุกบทตรวจในเครื่องด้วย `npx tsc --noEmit` ตาม checklist; เนื้อหาหลีกเลี่ยง enum/parameter properties เพราะ Node type stripping ไม่รองรับ |

## Node.js Fundamentals (`node-foundations`) — ชุด B4 เขียนแล้ว (10 หัวข้อ)

ลำดับ: node-runtime → node-process-cli → node-modules → node-npm → node-fs → node-event-loop → node-events-streams → node-http → node-test → node-project-planner-cli (Planner M4) · หัวข้อ Express 4 อันย้ายไป `backend` แล้วใน B5 (ID เดิม)

| สถานะ | รายละเอียด |
|---|---|
| เขียน | 10 หัวข้อ `standard: "v3"` (4 เดิม ID เดิม + 6 ใหม่) ภาษาใหม่ `node` ในเว็บกด Run แล้วบอกให้รันในเครื่อง |
| ตรวจเทคนิค | tests รัน example และ code ใน explain ทุกหัวข้อด้วย Node 24.21 จริงในโฟลเดอร์ชั่วคราว ได้ output ตรง (รูปแบบ console.log ของ Node) · ลำดับ event loop ตรวจซ้ำ 30 รอบให้ผลเดียวกัน · `import.meta.main` (24.2+/22.18+) ตรวจกับเอกสาร Node · Codex review: ดูบันทึกชุดงาน |
| ตรวจเชื่อม UI | build ผ่าน; ยังไม่ได้ตรวจใน browser |
| ข้อจำกัด | practice ทุกบทรันในเครื่อง (checklist) เพราะต้องใช้ fs/process/http |

## Back-end Development (`backend`) — ชุด B5 เขียนแล้ว (17 หัวข้อ)

ลำดับ: be-rest-design → node-express-route → node-input → node-middleware → node-errors → be-project-planner-api-1 (M5) → be-sql-basics → be-sql-joins → be-db-node → be-transactions → be-project-planner-api-2 (M6) → be-auth → be-authorization → be-security-basics → be-testing-api → be-architecture → be-project-planner-capstone

| สถานะ | รายละเอียด |
|---|---|
| เขียน | 17 หัวข้อ `standard: "v3"` · 4 หัวข้อ Express ย้ายจาก node-foundations โดยคง topic/step ID เดิม (hash URL และ progress เดิมใช้ได้) · ภาษาใหม่ `sql` และ field `requires` (express / pglite) |
| ตรวจเทคนิค | `scripts/verify-lesson-deps.ts` รัน example + code ใน explain ที่มี output กับ Express 5.2.1 และ PGlite 0.5.8 (PostgreSQL 18.3 WASM) ในโฟลเดอร์นอก repo: 14/14 ตรง · เฉลย SQL และ transferSeat (4 กรณีรวม rollback) รันจริง · เฉลยของ M5, M6, be-auth, be-authorization, be-security-basics, be-testing-api, be-architecture มาจากโปรเจกต์อ้างอิงที่ test ผ่าน (ดูบันทึกชุดงาน) · be-auth / be-rest-design / be-architecture / capstone รันใน test ของ repo · Codex review: ดูบันทึกชุดงาน |
| ตรวจเชื่อม UI | build ผ่าน; ยังไม่ได้ตรวจใน browser |
| ข้อจำกัด | เว็บไม่รันหรือตรวจ Express/SQL — ทุกบทที่ต้องใช้ package มีข้อความ "ตรวจเองในเครื่อง" ใน acceptance · package.json ของแอปไม่เพิ่ม dependency |

## Java Foundations (`java-foundations`) — ชุด B6 เขียนแล้ว (18 หัวข้อ)

ลำดับ: java-jdk → java-main → java-output → java-expressions → java-variables → java-primitives → java-string → java-casting → java-scanner → java-branch → java-switch → java-loops → java-methods → java-arrays → java-arraylist → java-exceptions-basic → java-multi-file → java-project-library-0 (Library CLI M0)

| สถานะ | รายละเอียด |
|---|---|
| เขียน | 18 หัวข้อ `standard: "v3"` (14 เดิม ID เดิม + 4 ใหม่) · field ใหม่ `stdin` (input ของตัวอย่าง Scanner) และ `solutionCheck` (input + output ที่เฉลยต้องได้) · โค้ดหลายไฟล์คั่นด้วย `// File: path` |
| ตรวจเทคนิค | `scripts/verify-java-lessons.ts` ใช้ JDK 21 จริง (Temurin 21.0.12 แบบ portable นอก repo): example + code ใน explain ที่มี output ตรงทุกตัวอักษร, starter compile ได้, เฉลยรันกับ input ของ solutionCheck ได้ output ตรงกับที่โจทย์สัญญา (18/18), buggy ทุกตัวทำงานตรงกับ bugCheck (compile error พร้อมข้อความ / runtime error พร้อมข้อความ / output ผิดตามที่อธิบาย) · ตัวตรวจจับเลขผิดในโจทย์ java-loops (เพดานถึงวันที่ 20 ไม่ใช่ 19) และข้ออ้างสองข้อที่ไม่ตรงกับ JDK จริง (ข้อความ error ของ main ที่ไม่ static, การปัดของ printf กับ 2.675) แก้แล้ว · Codex review: ดูบันทึกชุดงาน |
| ตรวจเชื่อม UI | build ผ่าน; ยังไม่ได้ตรวจใน browser |
| ข้อจำกัด | เว็บไม่ compile/รัน Java — ทุกบทมี "ตรวจเองในเครื่อง" ใน acceptance · ยังไม่ใช้ JUnit (เริ่มในคอร์ส OOP) |

## Java OOP (`java-oop`) — ชุด B7 เขียนแล้ว (21 หัวข้อ)

ลำดับ: oop-responsibility → oop-class-object → oop-fields-methods → oop-constructor → oop-identity → oop-static → oop-encapsulation → ★ oop-project-library-1 (M1) → oop-composition → oop-collaboration → ★ oop-project-library-2 (M2) → oop-interfaces → oop-polymorphism → oop-inheritance → oop-abstract → ★ oop-project-rpg → oop-collections → oop-exceptions → oop-refactor-main → oop-junit → ★ oop-project-library-3 (M3 capstone)

| สถานะ | รายละเอียด |
|---|---|
| เขียน | 21 หัวข้อ `standard: "v3"` (8 เดิม ID เดิม + 13 ใหม่) · composition และ interfaces มาก่อน inheritance ตามแผน · โปรเจกต์ Library CLI M1–M3 และ RPG Battle CLI มี test-input.txt/expected-output.txt ครบทุกข้อความ |
| ตรวจเทคนิค | `scripts/verify-java-lessons.ts` กับ JDK 21 + JUnit 6.1.3 (junit-platform-console-standalone, SHA-1 ตรงกับ Maven Central): ตัวอย่าง/เฉลย/buggy ทุกหัวข้อ, fixture ของ M1/M2/M3/RPG/refactor ตรงทุกบรรทัด, เฉลย oop-junit ผ่าน 6 test และ M3 ผ่าน 11 test · ตรวจเพิ่มด้วยมือ: โปรแกรม legacy ของ oop-refactor-main ให้ผลตรง golden master จริง และ mutation (ลบการตั้ง id ต่อเนื่องใน restore) ทำให้ test ของ M3 ล้ม · Codex review: ดูบันทึกชุดงาน |
| ตรวจเชื่อม UI | build ผ่าน; ยังไม่ได้ตรวจใน browser |
| ข้อจำกัด | เว็บไม่รัน Java/JUnit — acceptance ทุกบทระบุ "ตรวจเองในเครื่อง" · ไม่ใช้ Maven/Gradle (สอนผ่าน console launcher) |

## Labs (`src/content/lessons.ts`, 22 บท) — ชุด B8

| สถานะ | รายละเอียด |
|---|---|
| ผูกกับคอร์ส | ทุก lab มี `relatedTopics` ชี้ไปยังหัวข้อ v3 ที่สอนพื้นฐาน แสดงในหน้า lab เป็นปุ่ม “ทบทวนก่อนทำ” (test ตรวจว่ามีครบและทุก ID มีอยู่จริง) |
| แก้เนื้อหา | web-express-post เลิกใช้ zod ที่ไม่ได้สอน (ใช้ validateActivity จาก node-input), web-errors/web-testing ใช้ error code และ node:test + fetch แบบเดียวกับคอร์ส Back-end, java-scanner ใช้ nextLine + parseInt ตามคอร์ส Java, java-constructors เลิกใช้ static counter (ขัดกับบท oop-static), java-composition ชี้ไป Library CLI M1–M2 · เฉลย Java ที่เขียนใหม่สองบท compile และรันจริงกับ JDK 21 |
| plannedJava | ว่างแล้ว เพราะทุกหัวข้อที่เคยวางแผน (inheritance, polymorphism, interfaces, exceptions, collections, JUnit, RPG) อยู่ในคอร์ส Java OOP · ส่วน “Java next horizon” ซ่อนเมื่อไม่มีรายการ |
| ข้อจำกัด | lab ยังเป็นรูปแบบ Lesson เดิม (ไม่ใช่ v3 เต็ม) ตั้งใจเก็บไว้เป็นแบบฝึกเสริมหลังเรียนคอร์ส · ยังไม่ได้ตรวจใน browser |

## Developer Foundations — ชุด B8

8 หัวข้อเป็น `standard: "v3"` แล้ว: เพิ่ม mapping/limits ของ analogy, checks, acceptance (ตรวจเอง — หัวข้อเหล่านี้ไม่มีการตรวจอัตโนมัติ จึงไม่อ้างว่าระบบตรวจ), solution notes, reflection และ extension

## คอร์ส planned

react, nextjs, postgres ยัง planned · คำอธิบายบอกว่าต่อจากคอร์สไหน และ postgres เปลี่ยนเป็น “PostgreSQL Deep Dive” เพราะ SQL พื้นฐาน, JOIN และ transaction อยู่ใน Back-end Development แล้ว

## บันทึกชุดงาน

หมายเหตุการแก้บันทึก (2026-10-05): บันทึกเดิมของ B5–B8 เขียนว่า Codex “ไม่ใช้ web search” เพราะ Claude นับคำว่า `web_search` ใน stderr ซึ่งไม่ใช่ป้ายที่ Codex ใช้ ป้ายจริงคือบรรทัด `web search:` นับใหม่แล้ว: B1, B1 re-review และ B2 = 0 · B3 = 6 · B4 = 6 · B5 = 12 · B5 re-review = 6 · B6 = 4 · B7 = 4 · B8 = 2 (นับบรรทัด ไม่ได้ตรวจว่าแต่ละครั้งได้ผลอะไร)

| ชุด | ผู้ทำ | ผล | หลักฐาน |
|---|---|---|---|
| B0 research | Codex (JS/Java/OOP, web tool) + Claude (TS/Node/Back-end, WebFetch + GitHub) | เสร็จ | `docs/COURSE-RESEARCH.md` |
| B1 มาตรฐาน + js-functions | Claude เขียน; Codex review 2 รอบ (รอบ 1: 7 ข้อ เช่น Submit ข้าม tests, editor แก้ระหว่างรัน; รอบ 2: 4 ข้อใน snippet runner ใหม่) | เสร็จ แก้ครบ | commit `01f6048` |
| B4 Node.js | Claude เขียน; Codex audit 1 รอบ (commit `1a90cfd`): 14 ข้อ เช่น M4 CLI พังเมื่อรายการไม่ใช่ object, Node 24 ตรวจ ESM จาก syntax เมื่อไม่ตั้ง type, assert.equal ใช้ Object.is, เฉลยไม่ครบไฟล์, ข้ออ้างหน่วยความจำของ stream | แก้ครบ; เฉลย M4 รันจริงพร้อม test 6/6 ผ่านในโฟลเดอร์ชั่วคราว | commit `1a90cfd` + commit แก้ |
| B3 TypeScript | Claude เขียน; Codex audit 1 รอบ (commit `80d905e`): 14 ข้อ เช่นคำสั่ง tsc ไม่ใช้ tsconfig/strict, npx tsc อาจดึง package ผิด, Planner M3 ลืมตรวจวัน, groupBy กับ key \"constructor\", Partial ยอม undefined, ความหมายของ NodeNext | แก้ครบ — ตั้ง ts-lab (tsconfig strict) ในบท ts-why แล้วทุกบทใช้ `npx tsc -p .` | commit `80d905e` + commit แก้ |
| B8 Labs + Developer Foundations | Claude แก้และตรวจ (test, JDK 21 สำหรับเฉลย Java ที่เขียนใหม่); Codex review 1 รอบ (commit `a67f44a`, read-only; stderr มี `web search:` 2 ครั้ง): 6 ข้อ — ตัวอย่าง web-testing ไม่ login จึงได้ 401 ไม่ใช่ 400, เฉลย web-express-post ยังใช้ parseActivity และไม่มี 409, lab Next.js ลิงก์ไปบท JS ที่ไม่ได้สอน framework, .gitignore ไม่มีผลกับไฟล์ที่ track แล้ว, macOS ค่าเริ่มต้นไม่แยกตัวพิมพ์, ลิงก์ทบทวนทำ focus หาย (PLAUSIBLE) | แก้ครบ — ตัวอย่าง login ก่อน, เฉลยใช้ validateActivity + 409 DUPLICATE_TITLE, lab Next.js แจ้งว่าคอร์ส framework ยังไม่มีและชี้เอกสาร Next.js, แก้สองข้ออ้าง, ลิงก์เป็น <a href="#step/..."> และ focus หัวข้อของบทที่เปิด (ยังต้องตรวจลำดับ Tab ใน browser) | commit `a67f44a` + commit แก้ |
| B7 Java OOP | Claude เขียนและตรวจด้วย JDK 21 + JUnit 6.1.3; Codex audit 1 รอบ (commit `47627d0`, codex exec read-only; stderr มี `web search:` 4 ครั้ง; Codex รัน JDK ผ่าน JShell เพราะ sandbox เขียน /tmp ไม่ได้): 11 ข้อ (Medium 6, Low 5) — M3 บันทึก loan ตามลำดับหนังสือไม่ใช่ลำดับที่ยืม, restore รับค่าที่ใช้งานปกติสร้างไม่ได้, ค่าปรับ overflow เมื่อวันมาก, Main อยู่ package เดียวกับ Book จึงเรียก detach ข้ามผู้ประสานได้, ตัวตรวจ JUnit ไม่นับ container ที่ล้ม (@AfterAll), fixture ของ refactor ไม่ได้ query top ตอนเท่ากันจริง, CLI cannot load ไม่มี test, draw ของ RPG เกิดไม่ได้, คำอธิบาย interface/record และ extension ที่ใช้ record ก่อนสอน | แก้ครบ — Main ของ M2/M3 ย้ายไป package library.cli (ลองเรียก detach จากนอก package แล้ว compile error จริง), ค่าปรับคำนวณด้วย long และวันไม่เกิน 1000000, snapshot ตามลำดับการยืมของสมาชิก, restore ตรวจค่าบวก/ซ้ำ/ช่วง, M3 มี JUnit 11 test (mutation ลำดับ snapshot แบบเดิมทำให้ test ล้ม), ตัวตรวจ JUnit ต้อง exit 0 และไม่มี test/container ที่ล้ม/ยกเลิก/ข้าม (ตรวจกับ probe @AfterAll แล้ว), fixture refactor query top ตอนเท่ากันและ mutation > เป็น >= ถูกจับได้ | commit `47627d0` + commit แก้ |
| B6 Java Foundations | Claude เขียนและตรวจด้วย JDK 21; Codex audit 1 รอบ (commit `0bf59f8`, codex exec read-only; stderr มี `web search:` 4 ครั้ง และ Codex รัน JDK 21 ใน sandbox เองเพื่อพิสูจน์): 14 ข้อ (Medium 9, Low 5) เช่น java-switch ใช้ loop/array ก่อนสอน, unknown แสดงตัวพิมพ์ที่แปลงแล้ว, break ใน switch แบบลูกศรใช้ได้ใน statement, case null มีใน Java 21, widening long→double ปัดได้, parseDouble ยอมรับช่องว่าง, Integer cache อธิบายเป็นขอบเขตตายตัว, M0 ไม่มีไฟล์ test-input/expected-output, ตัวตรวจทิ้งข้อความก่อน marker แรก, เดาชื่อไฟล์จาก class และจัดประเภท buggy ด้วยข้อความ | แก้ครบ — ย้าย java-switch ไปหลัง java-loops (ตัวอย่างอ่าน stdin แทน array), เพิ่มคำอธิบาย array/lambda ตรงจุดที่ใช้, ตัด try/catch และ StringBuilder ที่ยังไม่สอน, เฉลย M0 มี test-input.txt/expected-output.txt ครบทุกข้อความ (รวม title required) · ตัวตรวจใหม่: โค้ดไม่มี marker บันทึกเป็น Main.java ตามที่ UI แสดง, ปฏิเสธข้อความก่อน marker, แยกความล้มเหลวของ JDK ออกจาก compile error, และทุกหัวข้อมี `bugCheck` (compile + ข้อความ error / runtime + ข้อความ / logic + output ผิดที่อธิบาย) ที่รันจริง | commit `0bf59f8` + commit แก้ |
| B5 Back-end | Claude เขียน; Codex audit 1 รอบ (commit `20001ba`, codex exec read-only; stderr มีบรรทัด `web search:` 12 ครั้ง): 16 ข้อ (High 1, Medium 11, Low 4) เช่น repository ของ M6 เรียก db.transaction ซึ่ง pg.Pool ไม่มี, เฉลย M5/auth/testing ไม่ครบตามโจทย์, scrypt ใช้ cost เริ่มต้นต่ำกว่า OWASP, อีเมลที่ไม่มีข้าม scrypt (timing enumeration), 401 ไม่มี WWW-Authenticate, error ของ express.json กลายเป็น 500, Vary: Origin ไม่ครบทุก response, service ใน be-architecture นำ race condition กลับมา, ชื่อหมวด OWASP ไม่ระบุฉบับ, CHECK กับ NULL | แก้ครบ 16 ข้อ — สร้างโปรเจกต์อ้างอิง planner-api สามระยะนอก repo (M5 in-memory 9 test, M6 PGlite 11 test, final auth/authz/security/service 16 test) แล้วนำไฟล์จริงไปเป็นเฉลย; adapter ของ pg ทดสอบกับ node-postgres จริงผ่าน PGlite socket server (join/update/rollback/remove); mutation 3 แบบ (ลบการตรวจสิทธิ์, Vary เฉพาะ origin ที่อนุญาต, ตอบอีเมลที่ไม่มีต่างออกไป) ทำให้ test ล้มทุกแบบ; transferSeat 4 กรณีรันจริง · Codex re-review (commit `11fb970`; stderr มี `web search:` 6 ครั้ง): 15 FIXED, 1 PARTIAL (test ไม่ assert login 200) และพบ 5 ข้อใหม่จากการตัดตอนโค้ดเป็นเฉลย (forbidden ไม่ถูกนิยาม, บรรทัด limit 10kb ถูกตัด, ไม่แสดง signature ใหม่ของ createApp, helper ปิดวงเล็บไม่ครบ, จำนวน test ไม่ตรง) — แก้ครบ โดย be-architecture แสดง app.mjs ทั้งไฟล์และ be-testing-api รวม test ทั้ง 12 กรณี | commit `20001ba` + commit แก้ |
| B2 JavaScript Foundations | Claude เขียน; Codex audit 1 รอบ: 12 ข้อ (prerequisite ใช้ก่อนสอน, Infinity ในราคา, ลำดับ microtask, สาเหตุ fetch reject, การตรวจ non-mutation, key "constructor", hint ที่เฉลยเร็ว ฯลฯ) | เสร็จ แก้ครบ — เพิ่ม outputCheck สำหรับโจทย์แบบสคริปต์ช่วงต้น | commit ชุด B2 |
