export type ProjectMilestone = {
  id: string;
  title: string;
  objective: string;
  tasks: string[];
  criteria: { id: string; label: string }[];
  artifacts: string[];
  lessonIds: string[];
  topicIds?: string[];
  reflection: string;
};

export const friendsActivityProjectId = "friends-activity-planner";

export const friendsActivityMilestones: ProjectMilestone[] = [
  {
    id: "repository", title: "ตั้งต้น repo และขอบเขตงาน",
    objective: "เริ่มระบบวางแผนกิจกรรมสำหรับเพื่อน 9 คนด้วย repository ที่คนอื่นเปิดมาทำต่อได้",
    tasks: ["สร้าง repo และ README อธิบายผู้ใช้กับ 4 user stories ของโปรเจกต์", "เขียนขั้นตอนติดตั้งและรัน พร้อมกำหนดไฟล์ที่ต้องอยู่ใน .gitignore", "แบ่งงานเป็นรายการเล็ก ๆ และ commit งานตั้งต้นด้วยข้อความที่อธิบายการเปลี่ยนแปลง"],
    criteria: [{ id: "scope", label: "README มีขอบเขต: ดูกิจกรรม สร้างกิจกรรม เข้าร่วม และโหวตเวลา" }, { id: "setup", label: "ทดลองทำตามขั้นตอนติดตั้งและรันจาก README แล้ว" }, { id: "history", label: "มี commit ตั้งต้นและไม่เก็บ secrets หรือ dependencies ใน repo" }],
    artifacts: ["README.md และ commit ตั้งต้น", "รายการงานใน issue หรือ docs/plan.md"],
    topicIds: ["dev-git", "dev-docs"], lessonIds: [],
    reflection: "คนที่ไม่เคยเห็นโปรเจกต์จะเริ่มรันและรู้ขอบเขตงานจาก README ได้อย่างไร?",
  },
  {
    id: "activity-model", title: "ออกแบบ Activity, Member และ Vote",
    objective: "ทำแบบข้อมูลและกฎของระบบให้ชัดก่อนสร้างหน้าจอหรือฐานข้อมูล",
    tasks: ["นิยามกิจกรรม online/onsite และข้อมูลที่ต้องมีของแต่ละชนิด", "สร้างตัวอย่างสมาชิก กิจกรรม ช่วงเวลาที่เสนอ และการโหวต พร้อมฟังก์ชันจัดรูปแบบกิจกรรม", "ระบุกฎว่า member เข้าร่วมกิจกรรมและโหวตช่วงเวลาเดิมได้เพียงครั้งเดียว", "ทางเลือก Java: สร้าง CLI แสดงรายการ Activity แล้วแบ่ง Activity / Member / Vote เป็น objects"],
    criteria: [{ id: "variants", label: "ตัวอย่างข้อมูลแยก online กับ onsite และตรวจ field ที่จำเป็น" }, { id: "invariants", label: "มีคำอธิบายกฎป้องกันการเข้าร่วมและโหวตซ้ำ" }, { id: "examples", label: "มีตัวอย่างผลลัพธ์ของฟังก์ชันหรือ Java CLI ที่ทดลองแล้ว" }],
    artifacts: ["src/domain หรือ Java CLI พร้อมข้อมูลตัวอย่าง", "docs/domain.md บันทึก entities และ invariants"],
    lessonIds: ["web-ts-narrowing", "java-types", "java-methods", "java-class", "java-composition"],
    reflection: "ถ้ากิจกรรมเปลี่ยนจาก online เป็น onsite ต้องตรวจข้อมูลและกฎอะไรใหม่?",
  },
  {
    id: "activity-ui", title: "สร้างรายการและฟอร์มกิจกรรม",
    objective: "ให้ผู้ใช้ดู กรอง และสร้างกิจกรรมได้ด้วยข้อมูลตัวอย่างก่อนเชื่อม API",
    tasks: ["ทำรายการกิจกรรมและตัวกรอง all/online/onsite", "ทำฟอร์มสร้างกิจกรรมพร้อม label และ error ใกล้ช่องที่ผิด", "ออกแบบ loading, empty, error และ success พร้อมปุ่มทำงานต่อ", "ทดลองใช้ด้วยคีย์บอร์ดและหน้าจอมือถือ"],
    criteria: [{ id: "filter", label: "กรองข้อมูลแล้วไม่แก้ไขรายการต้นฉบับ" }, { id: "validation", label: "ฟอร์มปฏิเสธข้อมูลไม่ครบและอธิบายวิธีแก้" }, { id: "states", label: "มี loading / empty / error / success ที่แยกกันชัด" }, { id: "accessible", label: "ใช้ keyboard และมือถือทำเส้นทางสร้างกิจกรรมได้" }],
    artifacts: ["หน้ารายการและฟอร์ม", "ภาพหรือวิดีโอแสดงทุกสถานะ พร้อม state matrix"],
    lessonIds: ["web-react-filter", "web-react-form", "web-next-boundary", "web-next-states"],
    reflection: "ผู้ใช้จะรู้ได้อย่างไรว่ารายการว่างเพราะยังไม่มีกิจกรรม หรือเพราะโหลดไม่สำเร็จ?",
  },
  {
    id: "activity-api", title: "สร้าง API และ error contract",
    objective: "ให้ frontend ใช้ GET/POST ที่มีรูปแบบ response และข้อผิดพลาดคงที่",
    tasks: ["ทำ GET /activities พร้อม kind filter และ POST /activities พร้อม input validation", "แยก route, กฎธุรกิจ และ data access", "กำหนด error code สำหรับข้อมูลผิด ไม่พบข้อมูล และ conflict", "เขียนคำสั่ง curl และผลลัพธ์ทั้ง request ที่ถูกและผิด"],
    criteria: [{ id: "get", label: "GET คืนรายการและกรอง kind ได้; kind ที่ผิดคืน 400" }, { id: "post", label: "POST ที่ถูกคืน 201; ข้อมูลไม่ครบคืน 400" }, { id: "errors", label: "error มี code/message คงที่ และไม่เปิดเผยข้อมูลภายใน" }],
    artifacts: ["API implementation", "docs/api.md หรือ collection พร้อม request/response ตัวอย่าง"],
    lessonIds: ["web-express-get", "web-express-post", "web-errors"],
    reflection: "frontend ควรตัดสินใจจาก HTTP status และ error code อย่างไรโดยไม่พึ่งข้อความอย่างเดียว?",
  },
  {
    id: "relational-data", title: "เก็บข้อมูลใน PostgreSQL",
    objective: "รักษาความสัมพันธ์และป้องกันข้อมูลซ้ำด้วย constraints ในฐานข้อมูล",
    tasks: ["ทำ schema สำหรับ activities, members, activity_members, availability และ votes", "กำหนด primary key, foreign key และ UNIQUE ของคู่ที่ห้ามซ้ำ", "เพิ่ม migration และ seed สำหรับการพัฒนา", "ใช้ JOIN สรุปจำนวนผู้เข้าร่วมและคะแนนช่วงเวลา โดยทดลองรวมกิจกรรมที่ยังไม่มีคนเข้าร่วม"],
    criteria: [{ id: "relations", label: "foreign key ป้องกันการอ้างกิจกรรมหรือสมาชิกที่ไม่มีจริง" }, { id: "duplicates", label: "ลอง insert การเข้าร่วมและ vote ซ้ำแล้วถูก UNIQUE ปฏิเสธ" }, { id: "aggregate", label: "query แสดงจำนวนถูกต้อง รวมกรณีจำนวนเป็นศูนย์" }, { id: "rebuild", label: "สร้างฐานข้อมูลใหม่จาก migration และ seed ได้" }],
    artifacts: ["migration, seed และ ER diagram", "SQL queries พร้อมผลการทดสอบ constraints"],
    lessonIds: ["web-postgres-schema", "web-postgres-join"],
    reflection: "เหตุใดการตรวจซ้ำใน application อย่างเดียวจึงไม่พอเมื่อ request มาพร้อมกัน?",
  },
  {
    id: "participation-votes", title: "เข้าร่วมและโหวตช่วงเวลา",
    objective: "สร้างพฤติกรรมหลักของกลุ่มเพื่อนโดยไม่ทำข้อมูลซ้ำหรือยอดโหวตคลาดเคลื่อน",
    tasks: ["เพิ่ม endpoint เข้าร่วมกิจกรรมและโหวตช่วงเวลาที่เสนอ", "ส่ง member identity ของข้อมูลทดสอบให้ชัด และระบุว่าการเลือกชื่อยังไม่ใช่ authentication", "จัดการ request ซ้ำด้วยผลลัพธ์ที่กำหนดไว้ เช่น 409 conflict", "สรุปคนที่สะดวกแต่ละช่วงเวลา และอธิบายวิธีจัดการเมื่อคะแนนเท่ากัน"],
    criteria: [{ id: "join", label: "เข้าร่วมกิจกรรมสำเร็จและยอดสมาชิกเพิ่มถูกต้อง" }, { id: "vote", label: "โหวตได้เฉพาะช่วงเวลาที่อยู่ในกิจกรรมนั้น" }, { id: "duplicate", label: "กดหรือส่งซ้ำไม่เพิ่ม relation และยอดคะแนนซ้ำ" }, { id: "identity", label: "ระบุข้อจำกัดของ identity ทดสอบ และยังไม่อ้างว่ารองรับผู้ใช้จริงอย่างปลอดภัย" }],
    artifacts: ["join/vote endpoints และ UI", "ผลการทดสอบ request ซ้ำและช่วงเวลาของกิจกรรมอื่น"],
    lessonIds: ["web-express-post", "web-errors", "web-postgres-schema", "web-postgres-join"],
    reflection: "ถ้าคำขอแรกสำเร็จแต่ client ไม่ได้รับ response การกดซ้ำควรให้ผลอย่างไร?",
  },
  {
    id: "integration", title: "เชื่อม UI กับ API จริง",
    objective: "ทำเส้นทางสร้างกิจกรรม เข้าร่วม และโหวตให้ทำงานครบตั้งแต่หน้าจอถึงฐานข้อมูล",
    tasks: ["แทนข้อมูลตัวอย่างด้วย API client และ mapping errors กลับไปยัง UI", "ป้องกัน submit ซ้ำขณะ request กำลังทำงานและเปิดให้ retry เมื่อผิดพลาด", "ทดสอบสร้างกิจกรรม → เข้าร่วม → โหวต → refresh", "จำลอง API ช้า ล้มเหลว และรายการว่าง"],
    criteria: [{ id: "end-to-end", label: "เส้นทางหลักทำงานกับ API และข้อมูลยังอยู่หลัง refresh" }, { id: "retry", label: "error มี retry และไม่เพิ่มข้อมูลซ้ำ" }, { id: "states", label: "UI แสดง loading / empty / error จากผล API จริง" }],
    artifacts: ["API client และ integrated feature", "วิดีโอเส้นทางหลักพร้อมตัวอย่าง error/retry"],
    lessonIds: ["web-integration", "web-next-states", "web-react-form"],
    reflection: "ข้อมูลที่ UI แสดงหลังส่งสำเร็จมาจาก server หรือการคาดเดาของ client และมีผลอย่างไร?",
  },
  {
    id: "quality", title: "พิสูจน์พฤติกรรมด้วย tests",
    objective: "ตรวจ happy path และ failure cases ของระบบด้วยหลักฐานที่ทำซ้ำได้",
    tasks: ["เพิ่ม unit tests สำหรับ validation, filtering และกฎ domain", "เพิ่ม integration tests ของ API/ฐานข้อมูลสำหรับ relation และ vote ซ้ำ", "เพิ่ม E2E สำหรับสร้างกิจกรรม เข้าร่วม และโหวต พร้อม failure/retry", "ทำ health endpoint และ logs ที่อธิบายข้อผิดพลาดโดยไม่บันทึก secrets"],
    criteria: [{ id: "unit", label: "unit tests ตรวจคำตอบถูกและข้อมูลผิดที่สำคัญ" }, { id: "integration", label: "integration tests ใช้ฐานข้อมูลทดสอบและพิสูจน์ constraints" }, { id: "e2e", label: "E2E ตรวจเส้นทางหลักและ failure/retry" }, { id: "reproduce", label: "มีคำสั่งรัน tests, ผลรันล่าสุด และวิธีตรวจ health/logs" }],
    artifacts: ["unit, integration และ E2E tests", "ผลรัน tests หรือ CI run และคู่มือ health/logs"],
    lessonIds: ["web-testing", "web-errors"],
    reflection: "test ใดจะจับข้อผิดพลาดที่ unit test ผ่านแต่ระบบจริงยังทำงานผิด?",
  },
  {
    id: "portfolio", title: "จัดชุดผลงานและสาธิต",
    objective: "ทำให้คนอื่นตรวจงาน รันซ้ำ และเข้าใจเหตุผลของการออกแบบได้",
    tasks: ["อัปเดต README ด้วย setup, architecture, schema, API และวิธีรัน tests", "บันทึกการตัดสินใจสำคัญอย่างน้อยหนึ่งเรื่อง พร้อมทางเลือกและข้อแลกเปลี่ยน", "ถ่าย screenshots และวิดีโอสาธิตด้วยข้อมูลทดสอบ", "ถ้ามี demo deployment ให้แนบลิงก์และระบุข้อจำกัด; ถ้ายังไม่มี ให้ใช้วิดีโอการรันในเครื่องแทน"],
    criteria: [{ id: "readme", label: "คนอื่นทำตาม README แล้วรันระบบและ tests ได้" }, { id: "decision", label: "มี architecture decision พร้อมเหตุผลและข้อจำกัด" }, { id: "demo", label: "มีภาพและ demo/video ของเส้นทางหลักโดยไม่ใช้ข้อมูลส่วนตัว" }],
    artifacts: ["README, screenshots และ architecture decision", "ลิงก์ demo หรือวิดีโอการรันในเครื่อง"],
    lessonIds: ["web-integration", "web-testing"],
    reflection: "ถ้าต้องปรับระบบสำหรับกลุ่มเพื่อนอีกกลุ่ม ส่วนใดนำกลับมาใช้ได้และส่วนใดต้องเปลี่ยน?",
  },
];
