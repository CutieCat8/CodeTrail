# แผนปรับหลักสูตรหลัง audit

ฐาน: faa1de2 · branch งาน: feat/curriculum-learning-repair · เจ้าของการเขียนรอบนี้: Codex
คำสั่งผู้ใช้ล่าสุดให้ทำเองแทน Claude ที่ติด usage limit; ไม่เรียก Claude และไม่อ้าง independent review ที่ไม่ได้เกิดขึ้น

## ผลลัพธ์และลำดับงาน

ผู้เรียนเริ่มจากศูนย์ได้; เวลาวันละประมาณหนึ่งชั่วโมงใช้แบ่งกิจกรรม ไม่ใช่กำหนดแปดสัปดาห์
หลักฐานที่ต้องเก็บ: ทำนายและไล่ค่า → เติมส่วนย่อย → เขียนโดยลดตัวช่วย → ตั้งสมมติฐานแก้บั๊ก → ประกอบโปรแกรม → ประเมิน requirements ใหม่
การตรวจโครงสร้างและ tests ไม่ใช่หลักฐานผลสัมฤทธิ์ ต้องทดลองกับผู้เริ่มต้นภายหลัง

| ชุด | เจ้าของไฟล์ | ส่งมอบ | สถานะ |
|---|---|---|---|
| R1 เครื่องมือ | Codex: developer-foundations topics/lessons, prerequisites ของ ts-why; docs | workspace/save/terminal ก่อนรัน, Node/npm ขั้นขั้นต่ำไม่วน prerequisite, Git setup | implemented; pending independent review |
| R2 ภาษาเริ่มต้น | Codex: JavaScript และ Java Foundations topics/lessons | ลำดับ syntax, loop/function/array ฝึกแยก, checkpoint และ assessment | JavaScript + Java Foundations implemented; independent review pending |
| R3 ต่อยอด | Codex: TypeScript/Node/Back-end/Java OOP topics/lessons | แยกแนวคิดหนาแน่น, SQL พื้นฐาน, file I/O/JUnit, acceptance ตรงเฉลย | planned |
| R4 ประกอบทักษะ | Codex: projects, lessons.ts | milestones ลดตัวช่วย, 22 labs ครบ contract และตรวจซ้ำได้ | planned |
| R5 ตรวจส่งมอบ | Codex: UI ที่จำเป็น, verification/docs | browser routes/interaction/focus/mobile/TypeScript illustration, checks, local production preview | planned |

แต่ละชุด: implement → ตรวจเทคนิค/การสอน → บันทึก review ที่เกิดขึ้นจริง → แก้ข้อสำคัญ → commit → handoff
Independent review รอบใหม่: ยังไม่มีทุกชุด ไม่ถือว่าการอ่าน audit เก่าคือ review ของงานเขียนใหม่
IDs/hash/storage เดิมต้องคงอยู่ ไม่ reset งาน ไม่ push/merge/deploy และไม่แตะ /mnt/c
Import/XP/streak/AI assistant เป็น backlog; React/Next.js/PostgreSQL เต็มคอร์สยัง planned

## แผนผลลัพธ์รายคอร์ส

| คอร์ส | จุดเริ่ม/prerequisite | ทำได้เมื่อจบและกิจกรรมรองรับ | ประเมินบริบทใหม่ | ขอบเขตที่ยังไม่สอน |
|---|---|---|---|---|
| Developer Foundations | ไม่เคยเขียนโค้ด; files → terminal → tools → editor | เลือกไฟล์/save/run, อ่าน error ทดลองทีละเหตุ, commit; ฝึก log คำสั่งและ output | โฟลเดอร์ชื่อซ้ำและคู่มือคำสั่งใหม่ | branching/rebase/CI |
| JavaScript | ทางเริ่มของตนเองผ่านเครื่องมือที่ลิงก์; values → variables → conditions → functions → loops/arrays → objects → async | ไล่ค่า/คืนค่า/debug/pure functions; Activity Planner M1–M2 | โปรแกรมคิดค่าบริการและจัดข้อมูลโดเมนใหม่ | DOM เต็มคอร์ส, recursion/algorithms ขั้นสูง |
| Java Foundations | เครื่องมือ editor/terminal; JDK setup ของตนเอง → declaration → expression → branch → loop → method → array/list | โปรแกรม input/output/error และ Library M0 | CLI รายการอุปกรณ์ไม่กำหนด method/collection | JVM ลึก, streams, framework |
| TypeScript | JavaScript + npm ขั้นต่ำจาก Foundations | types → union → narrowing → generics ทีละส่วน; Planner M3 | ตรวจข้อมูลการจองอุปกรณ์จาก unknown | advanced mapped/conditional types |
| Node | JavaScript modules/async + terminal/tools | CLI → files → async → HTTP → tests; Planner M4 | CLI สรุปค่าใช้จ่ายจากไฟล์ | cluster/workers/production hosting |
| Back-end | Node + HTTP | routes → validation → middleware/errors → SQL rows/CRUD/keys/JOIN/aggregation → database/auth/tests; Planner M5–M7 | API โดเมนใหม่กำหนด behavior ไม่บังคับ architecture | PostgreSQL Deep Dive, distributed systems |
| Java OOP | Java Foundations; ไม่บังคับผ่านเว็บ | state/behavior/references → encapsulation/composition/interfaces → collections/exceptions → I/O/JUnit; Library M1–M3/RPG | ออกแบบระบบจองอุปกรณ์จาก use case | concurrency/reflection/advanced patterns |

ตารางนี้เป็นแผน ไม่ได้ปิด coverage เพียงเพราะมีชื่อกิจกรรม ต้องเชื่อมบท/กิจกรรม/ผลตรวจจริงก่อนเปลี่ยนสถานะ

## R2-JS: ลำดับและการตรวจทักษะที่ลงมือแล้ว

เจ้าของ Codex: javascript-foundations.ts, lessons/javascript-foundations.ts, javascript-start.ts, javascript-bridges.ts, javascript-checkpoints.ts; test โครงสร้างปรับเฉพาะข้อบังคับจำนวนส่วนสอน
ทางเริ่ม: js-start → values → variables → strings/numbers → conditions → function-basics → functions → runtime; จากนั้น loop-basics → accumulator → array-basics → function-values/scope/objects → loop-control → loops/nested-loops → arrays → errors/references/callbacks → Planner/exception/modules/async
คง IDs เดิมทั้ง20บท/100steps; บทใหม่ไม่แทนชื่อเดิม เปลี่ยน prerequisite พร้อมลำดับจริง
การประเมินเป็น manual: เก็บคำตอบ/โค้ด/ผลทดลองแล้วเปิด rubric/model answer หลังส่ง ไม่ให้คะแนนจากข้อความไม่ว่าง; เปิด documentation ได้ วัดการประยุกต์และอธิบาย ไม่วัดจำ syntax
Independent review จาก Claude: pending; Codex เขียน ตรวจกลไกและทบทวนการสอนเองเท่านั้น

R2-Java: Codexเพิ่มdeclarations/for/sum/method/array/minimum/copyก่อนบทประกอบ คง18IDsเดิม เพิ่มcheckpointเฉพาะเรื่องและequipmentCLIassessmentพร้อมเฉลย/fixtures
หยุดเริ่มR3ตามคำสั่งผู้ใช้เรื่องโควตา; งานส่งต่อและreviewอยู่COURSE-REPAIR-HANDOFF.md
