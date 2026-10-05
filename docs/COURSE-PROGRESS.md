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

## JavaScript Foundations

| Topic | Inventory | เขียน | เทคนิค | UI |
|---|---|---|---|---|
| js-runtime | บาง | – | – | – |
| js-errors | ใหม่ | – | – | – |
| js-values | บาง | – | – | – |
| js-variables | บาง | – | – | – |
| js-strings | ใหม่ | – | – | – |
| js-numbers | ใหม่ | – | – | – |
| js-conditions | ใหม่ | – | – | – |
| js-functions | บาง (บทมาตรฐาน B1) | – | – | – |
| js-scope | บาง | – | – | – |
| js-loops | ใหม่ | – | – | – |
| js-arrays | บาง | – | – | – |
| js-objects | บาง | – | – | – |
| js-references | ใหม่ | – | – | – |
| js-callbacks | ใหม่ | – | – | – |
| js-project-planner-1 | ใหม่ | – | – | – |
| js-exceptions | ใหม่ | – | – | – |
| js-modules-json | ใหม่ | – | – | – |
| js-promises | ใหม่ | – | – | – |
| js-async | บาง | – | – | – |
| js-project-planner-2 | ใหม่ | – | – | – |

## TypeScript (`typescript`, เดิม writing ไม่มีหัวข้อ)

ts-why, ts-basic-types, ts-functions, ts-object-types, ts-arrays-tuples, ts-unions-literals, ts-narrowing, ts-null-safety, ts-generics, ts-utility-types, ts-classes, ts-config, ts-async-types, ts-project-planner — ทั้งหมด **ใหม่** ยังไม่เขียน

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
