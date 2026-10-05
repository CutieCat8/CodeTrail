# Course progress

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

## Node.js Fundamentals (`node-foundations`)

| Topic | Inventory |
|---|---|
| node-runtime, node-modules, node-npm, node-http | บาง |
| node-process-cli, node-fs, node-event-loop, node-events-streams, node-test, node-project-planner-cli | ใหม่ |

## Back-end Development (`backend`, คอร์สใหม่)

| Topic | Inventory |
|---|---|
| node-express-route, node-input, node-middleware, node-errors | บาง (จะย้ายจาก node-foundations; step ID เดิม) |
| be-rest-design, be-project-planner-api-1, be-sql-basics, be-sql-joins, be-db-node, be-transactions, be-project-planner-api-2, be-auth, be-authorization, be-security-basics, be-testing-api, be-architecture, be-project-planner-capstone | ใหม่ |

## Java Foundations (`java-foundations`)

| Topic | Inventory |
|---|---|
| java-jdk, java-main, java-output, java-expressions, java-variables, java-primitives, java-string, java-casting, java-scanner, java-branch, java-loops, java-methods, java-arrays, java-arraylist | บาง (ไม่ได้ compile ตัวอย่าง; เครื่องนี้ยังไม่มี JDK) |
| java-switch, java-exceptions-basic, java-multi-file, java-project-library-0 | ใหม่ |

## Java OOP (`java-oop`)

| Topic | Inventory |
|---|---|
| oop-responsibility, oop-class-object, oop-fields-methods, oop-constructor, oop-encapsulation, oop-composition, oop-collaboration, oop-refactor-main | บาง |
| oop-identity, oop-static, oop-interfaces, oop-polymorphism, oop-inheritance, oop-abstract, oop-collections, oop-exceptions, oop-junit, oop-project-library-1/2/3, oop-project-rpg | ใหม่ |

## Labs (`src/content/lessons.ts`, 22 บท)

| กลุ่ม | Inventory |
|---|---|
| web-ts-narrowing, web-react-filter, web-react-form (auto 3 บท) | เนื้อหาครบแต่สั้น; runner ตรวจได้จริง |
| web-next-boundary, web-next-states, web-express-get, web-express-post, web-errors, web-postgres-schema, web-postgres-join, web-integration, web-testing (self) | เนื้อหาครบแต่สั้น ต้องปรับคำอธิบาย/acceptance และผูก prerequisite |
| java-run … java-composition (local-java 10 บท) | ต้องผูกกับ Library CLI milestones |
| plannedJava (inheritance, polymorphism/interfaces, exceptions, collections/generics, JUnit, RPG) | planned → จะมีหัวข้อจริงใน Java OOP |

## คอร์ส planned

react, nextjs, postgres — คง planned; ปรับคำอธิบายใน B8

## บันทึกชุดงาน

| ชุด | ผู้ทำ | ผล | หลักฐาน |
|---|---|---|---|
| B0 research | Codex (JS/Java/OOP, web tool) + Claude (TS/Node/Back-end, WebFetch + GitHub) | เสร็จ | `docs/COURSE-RESEARCH.md` |
| B1 มาตรฐาน + js-functions | Claude เขียน; Codex review 2 รอบ (รอบ 1: 7 ข้อ เช่น Submit ข้าม tests, editor แก้ระหว่างรัน; รอบ 2: 4 ข้อใน snippet runner ใหม่) | เสร็จ แก้ครบ | commit `01f6048` |
| B3 TypeScript | Claude เขียน; Codex audit 1 รอบ (commit `80d905e`): 14 ข้อ เช่นคำสั่ง tsc ไม่ใช้ tsconfig/strict, npx tsc อาจดึง package ผิด, Planner M3 ลืมตรวจวัน, groupBy กับ key \"constructor\", Partial ยอม undefined, ความหมายของ NodeNext | แก้ครบ — ตั้ง ts-lab (tsconfig strict) ในบท ts-why แล้วทุกบทใช้ `npx tsc -p .` | commit `80d905e` + commit แก้ |
| B2 JavaScript Foundations | Claude เขียน; Codex audit 1 รอบ: 12 ข้อ (prerequisite ใช้ก่อนสอน, Infinity ในราคา, ลำดับ microtask, สาเหตุ fetch reject, การตรวจ non-mutation, key "constructor", hint ที่เฉลยเร็ว ฯลฯ) | เสร็จ แก้ครบ — เพิ่ม outputCheck สำหรับโจทย์แบบสคริปต์ช่วงต้น | commit ชุด B2 |
