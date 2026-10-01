export type RoadmapLane = "core" | "frontend" | "backend" | "data" | "quality" | "java";

export type RoadmapNode = {
  id: string;
  title: string;
  lane: RoadmapLane;
  description: string;
  why: string;
  evidence: string;
  topicIds?: string[];
  lessonIds?: string[];
  optional?: boolean;
};

export type RoadmapStage = {
  id: string;
  number: string;
  title: string;
  outcome: string;
  nodes: RoadmapNode[];
};

export const laneLabels: Record<RoadmapLane, string> = {
  core: "พื้นฐานร่วม",
  frontend: "Front-end",
  backend: "Back-end",
  data: "Database",
  quality: "Quality & Delivery",
  java: "Java side route",
};

export const fullstackRoadmap: RoadmapStage[] = [
  {
    id: "developer-base", number: "01", title: "ใช้เครื่องมือให้เป็นก่อนเขียนระบบ", outcome: "เปิดโปรเจกต์ รันคำสั่ง อ่าน error และเก็บงานด้วย Git ได้โดยไม่ต้องเดาสุ่ม",
    nodes: [
      { id: "program-runtime", title: "Program & Runtime", lane: "core", description: "แยก source code, process และ runtime ที่กำลังทำงาน", why: "ช่วยหาว่าปัญหาเกิดตอนเขียน ตอนเริ่ม process หรือระหว่างรัน", evidence: "อธิบายวงจร save → run → output และอ่าน exit code", topicIds: ["dev-program", "dev-process"] },
      { id: "files-terminal", title: "Files, Paths & Terminal", lane: "core", description: "เข้าใจไฟล์ extension, absolute/relative path และ current directory", why: "คำสั่งจำนวนมากพังเพราะอยู่ผิดโฟลเดอร์หรือชี้ path ผิด", evidence: "สร้างโฟลเดอร์ ย้ายตำแหน่ง และรันไฟล์จาก terminal", topicIds: ["dev-files", "dev-terminal"] },
      { id: "debugging", title: "Debugging Fundamentals", lane: "core", description: "อ่านชนิด error ตำแหน่ง และข้อความก่อนแก้", why: "นักพัฒนาใช้เวลาส่วนใหญ่กับการหาสาเหตุ ไม่ใช่พิมพ์โค้ดอย่างเดียว", evidence: "สร้าง minimal reproduction และอธิบายสมมติฐานก่อนแก้", topicIds: ["dev-errors", "dev-docs"] },
      { id: "git", title: "Git & Small Commits", lane: "core", description: "ติดตาม working tree, stage และ commit ที่มีความหมาย", why: "ทำให้ย้อนกลับ รีวิว และอธิบายพัฒนาการของงานได้", evidence: "แยกงานหนึ่งเรื่องเป็น commit ที่รันได้", topicIds: ["dev-git", "dev-editor"] },
    ],
  },
  {
    id: "web-language", number: "02", title: "เข้าใจภาษาของเว็บ", outcome: "อธิบายได้ว่า browser ขอข้อมูลอย่างไร และสร้างหน้าเว็บด้วยพื้นฐานก่อนพึ่ง framework",
    nodes: [
      { id: "internet-http", title: "Internet, DNS & HTTP", lane: "core", description: "request/response, URL, method, headers, body และ status code", why: "ทุกหน้าเว็บและ API วิ่งผ่านสัญญา HTTP", evidence: "trace request ตั้งแต่ URL จน server จบ response", topicIds: ["web-request", "web-url", "node-http"] },
      { id: "html", title: "Semantic HTML", lane: "frontend", description: "โครงสร้างเอกสาร form, label, button และความหมายของ element", why: "React ยังสร้าง HTML; semantic ที่ดีช่วย keyboard และ screen reader", evidence: "สร้างหน้าที่ใช้งานได้โดยไม่พึ่ง div ทุกอย่าง", topicIds: ["web-semantics", "web-forms", "web-accessibility"] },
      { id: "css", title: "CSS Layout & Responsive", lane: "frontend", description: "cascade, box model, Flexbox, Grid และ responsive constraints", why: "UI ที่ทำงานจริงต้องอ่านได้หลายขนาดและไม่ล้น container", evidence: "สร้าง layout desktop/mobile โดยไม่ fix ขนาดตามหน้าจอเดียว", topicIds: ["web-selector", "web-box", "web-flex", "web-grid", "web-responsive"] },
      { id: "javascript-values", title: "JavaScript Values & Control Flow", lane: "frontend", description: "types, variables, condition, loop และการแปลงชนิด", why: "เป็นฐานของโค้ด React, Node และ TypeScript ตอน runtime", evidence: "ทำนาย output และเขียน branch โดยไม่พึ่ง trial-and-error", topicIds: ["js-runtime", "js-values", "js-variables"] },
    ],
  },
  {
    id: "programming-core", number: "03", title: "คิดเป็นฟังก์ชันและข้อมูล", outcome: "แยกปัญหาเป็น input, transformation, output และทดสอบส่วนเล็กได้",
    nodes: [
      { id: "functions-scope", title: "Functions & Scope", lane: "core", description: "parameters, return values, pure function และขอบเขตตัวแปร", why: "ฟังก์ชันงานเดียวทดสอบและประกอบเป็นระบบใหญ่ได้", evidence: "เขียนฟังก์ชันที่คืนค่าแทนซ่อนผลลัพธ์ใน global state", topicIds: ["js-functions", "js-scope"] },
      { id: "arrays-objects", title: "Arrays & Objects", lane: "core", description: "model ข้อมูลรายการและ entity พร้อม map/filter/find/reduce", why: "ข้อมูลจาก API และ database มักกลับมาเป็น object และ collection", evidence: "เลือก operation จากผลลัพธ์ที่ต้องการและไม่ mutate โดยไม่ตั้งใจ", topicIds: ["js-arrays", "js-objects"] },
      { id: "async", title: "Async JavaScript", lane: "core", description: "Promise, async/await และเส้นทาง success/failure", why: "network และ database ไม่ตอบทันที UI/API ต้องรับมือระหว่างรอ", evidence: "จัดการ fulfilled/rejected และไม่ลืม await", topicIds: ["js-async"] },
      { id: "typescript", title: "TypeScript & Narrowing", lane: "core", description: "types, unions และการตรวจค่าก่อนใช้งาน", why: "type ช่วยอธิบาย contract แต่ input ภายนอกยังต้องตรวจตอน runtime", evidence: "จัดรูปแบบข้อมูลกิจกรรมและ narrow union ได้", lessonIds: ["web-ts-narrowing"] },
    ],
  },
  {
    id: "application-branches", number: "04", title: "แยกสำรวจ Front-end และ Back-end", outcome: "เข้าใจความรับผิดชอบของ UI และ server ก่อนเชื่อมสองฝั่ง",
    nodes: [
      { id: "react-components", title: "React Components & Props", lane: "frontend", description: "แบ่ง UI ตามความรับผิดชอบและส่งข้อมูลผ่าน props", why: "component boundary ที่ดีทำให้แก้ UI โดยกระทบพื้นที่น้อย", evidence: "สร้างรายการกิจกรรมและแยกการแสดงผลออกจากการกรอง", lessonIds: ["web-react-filter"] },
      { id: "react-state-forms", title: "State, Events & Forms", lane: "frontend", description: "controlled input, state transition และ validation feedback", why: "ฟอร์มคือจุดที่ข้อมูลผู้ใช้เข้าสู่ระบบ", evidence: "สร้างกิจกรรมและป้องกันข้อมูลผิดก่อนส่ง", lessonIds: ["web-react-form"] },
      { id: "node-runtime", title: "Node.js, Modules & npm", lane: "backend", description: "process, module boundary, package scripts และ dependencies", why: "เป็น runtime และเครื่องมือหลักของ Express/Next.js ฝั่ง server", evidence: "แบ่ง module และรันโปรเจกต์ผ่าน script มาตรฐาน", topicIds: ["node-runtime", "node-modules", "node-npm"] },
      { id: "express", title: "Express Routes & Middleware", lane: "backend", description: "route, params/query/body และ request pipeline", why: "API ที่ดีต้องมี boundary ชัดและตอบหนึ่งครั้งต่อ request", evidence: "สร้าง GET/POST พร้อม validation และ middleware", topicIds: ["node-express-route", "node-input", "node-middleware"], lessonIds: ["web-express-get", "web-express-post"] },
    ],
  },
  {
    id: "data-modeling", number: "05", title: "ให้ข้อมูลมีโครงสร้างและกฎ", outcome: "ออกแบบข้อมูลที่ป้องกันสถานะผิดและตอบคำถามของระบบได้",
    nodes: [
      { id: "relational-model", title: "Relational Modeling", lane: "data", description: "table, row, primary key, foreign key และความสัมพันธ์", why: "schema คือกติกากลางของข้อมูล ไม่ใช่แค่ที่เก็บ object", evidence: "แปลง user stories เป็นตารางและความสัมพันธ์", lessonIds: ["web-postgres-schema"] },
      { id: "sql", title: "SQL, Constraints & JOIN", lane: "data", description: "SELECT, JOIN, aggregate และ constraints ที่ฐานข้อมูลบังคับ", why: "ต้องดึงข้อมูลข้ามความสัมพันธ์โดยยังรักษาความถูกต้อง", evidence: "สรุปจำนวนผู้เข้าร่วมและป้องกันการสมัครซ้ำ", lessonIds: ["web-postgres-schema", "web-postgres-join"] },
      { id: "transactions", title: "Transactions", lane: "data", description: "รวมหลายการเปลี่ยนให้สำเร็จทั้งหมดหรือย้อนทั้งหมด", why: "งานจองหรือชำระเงินห้ามค้างครึ่งทาง", evidence: "อธิบาย failure ระหว่างสองคำสั่งและวาง transaction boundary" },
      { id: "prisma", title: "Prisma Schema & Migrations", lane: "data", description: "เชื่อม model ในโค้ดกับ PostgreSQL และเปลี่ยน schema อย่างติดตามได้", why: "migration ทำให้ทีมและ environment ใช้โครงสร้างฐานข้อมูลตรงกัน", evidence: "สร้าง migration ตรวจ SQL และอธิบาย rollback risk" },
    ],
  },
  {
    id: "fullstack-integration", number: "06", title: "ประกอบเป็น Full-stack Feature", outcome: "ส่งข้อมูลจาก UI ผ่าน API ไปยังฐานข้อมูล พร้อม state และ error ที่ผู้ใช้เข้าใจ",
    nodes: [
      { id: "rest-contract", title: "REST API Contract", lane: "backend", description: "resource, method, status และ response/error shape ที่สม่ำเสมอ", why: "Front-end กับ Back-end ทำงานแยกกันได้เมื่อสัญญาชัด", evidence: "แยก 400, 404, 409, 500 และไม่ตอบ stack trace", topicIds: ["node-errors"], lessonIds: ["web-errors"] },
      { id: "next-boundaries", title: "Next.js Server/Client Boundaries", lane: "frontend", description: "เลือก Server หรือ Client Component ตาม data และ interaction", why: "boundary มีผลต่อ bundle, security และวิธี fetch ข้อมูล", evidence: "อธิบายเหตุผลของแต่ละ component boundary", lessonIds: ["web-next-boundary"] },
      { id: "ui-states", title: "Loading, Empty & Error States", lane: "frontend", description: "ทำให้ทุกสถานะของ async UI มีความหมาย", why: "happy path อย่างเดียวทำให้ผู้ใช้ไม่รู้ว่าระบบกำลังรอหรือพัง", evidence: "แสดงสี่สถานะโดยไม่ใช้ข้อมูลปลอม", lessonIds: ["web-next-states"] },
      { id: "integration", title: "Front-end → API Integration", lane: "core", description: "serialize input, submit, prevent duplicate และแสดง server feedback", why: "บั๊กจำนวนมากอยู่ตรงรอยต่อระหว่าง contract สองฝั่ง", evidence: "ส่งฟอร์มจริงและรับมือ network/server validation", lessonIds: ["web-integration"] },
    ],
  },
  {
    id: "reliability-security", number: "07", title: "ทำให้ระบบเชื่อถือได้", outcome: "พิสูจน์ behavior สำคัญ ปกป้องข้อมูล และวิเคราะห์ปัญหาได้",
    nodes: [
      { id: "testing", title: "Unit, Integration & E2E Tests", lane: "quality", description: "เลือก test boundary ตามความเสี่ยงและตรวจทั้ง happy/failure path", why: "test เป็นหลักฐานว่า behavior ยังอยู่เมื่อแก้โค้ด", evidence: "เขียน test กรณีปกติ ข้อมูลว่าง และ edge case", lessonIds: ["web-testing"] },
      { id: "auth", title: "Authentication & Authorization", lane: "quality", description: "แยกว่าใครเป็นใคร และเขามีสิทธิ์ทำอะไร", why: "การซ่อนปุ่มไม่ใช่การตรวจสิทธิ์; server ต้องป้องกันทุก protected action", evidence: "ออกแบบ session และ policy ที่ตรวจฝั่ง server" },
      { id: "web-security", title: "Web Security Basics", lane: "quality", description: "input trust boundary, XSS, CSRF, secrets, hashing และ secure cookies", why: "ระบบ full-stack รับข้อมูลจากภายนอกและถือข้อมูลส่วนตัว", evidence: "ทำ threat checklist และไม่ส่ง secret ไป client" },
      { id: "observability", title: "Logs & Observability", lane: "quality", description: "structured log, request id, metric และ error context", why: "production debug ด้วยสิ่งที่ระบบบันทึก ไม่ใช่เปิด debugger ในเครื่องผู้ใช้", evidence: "ตาม request ที่ล้มเหลวข้าม UI และ API ได้" },
    ],
  },
  {
    id: "delivery", number: "08", title: "ส่งงานขึ้นใช้งานจริง", outcome: "สร้าง build ที่ทำซ้ำได้ ตรวจอัตโนมัติ และ deploy โดยเข้าใจข้อจำกัด",
    nodes: [
      { id: "environment", title: "Environment & Configuration", lane: "quality", description: "แยก config ของ dev/test/production และจัดการ secret", why: "ค่าที่ hard-code ทำให้ deploy ผิด environment และเสี่ยงเปิด secret", evidence: "ระบุตัวแปรที่ public/server-only และ validate ตอน start" },
      { id: "docker", title: "Docker Fundamentals", lane: "quality", description: "image, container, port, volume และ multi-stage build", why: "ช่วยให้ runtime ใกล้เคียงกันและส่งมอบ dependency ชัด", evidence: "build image ขนาดเหมาะสมและรันด้วย config ภายนอก", optional: true },
      { id: "ci", title: "CI Quality Gates", lane: "quality", description: "รัน lint, type-check, tests และ build ทุกการเปลี่ยนแปลง", why: "ป้องกันงานที่พังเข้าสู่ branch หลักก่อน deploy", evidence: "pipeline ล้มเมื่อ test หรือ production build ล้ม" },
      { id: "deployment", title: "Private Deployment", lane: "quality", description: "hosting, database persistence, access control และ rollback", why: "URL ที่เดายากไม่ใช่ privacy; ต้องมีการตรวจสิทธิ์จริง", evidence: "ตรวจ unauthorized/authorized access และกู้คืนเวอร์ชันก่อนหน้าได้" },
    ],
  },
  {
    id: "java-side-route", number: "J", title: "Java & OOP — เส้นทางเสริมที่เริ่มแยกได้", outcome: "ใช้ Java ฝึก type discipline, object responsibility และการรักษาสถานะ แล้วนำแนวคิดกลับมาออกแบบ Back-end",
    nodes: [
      { id: "java-language", title: "Java Language Foundations", lane: "java", description: "JDK, compile/run, values, input, control flow, methods และ collections", why: "ภาษาแบบ static ช่วยให้เห็น contract และ compilation ชัด", evidence: "รัน CLI จาก command line และแบ่ง logic ออกจาก main", topicIds: ["java-jdk", "java-main", "java-output", "java-expressions", "java-variables", "java-primitives", "java-string", "java-casting", "java-scanner", "java-branch", "java-loops", "java-methods", "java-arrays", "java-arraylist"], lessonIds: ["java-run", "java-types", "java-scanner", "java-control", "java-methods", "java-collections"] },
      { id: "java-objects", title: "Class, Object & Constructor", lane: "java", description: "ออกแบบ object จาก behavior และสร้าง instance ที่พร้อมใช้", why: "class ที่ดีแทนแนวคิดใน domain ไม่ใช่ถุงรวม field", evidence: "แยก Book และ Member พร้อม constructor invariants", lessonIds: ["java-class", "java-constructors"] },
      { id: "java-encapsulation", title: "Encapsulation & Valid State", lane: "java", description: "ให้ object ปฏิเสธ transition ที่ผิดแทนเปิด setter ทุก field", why: "ระบบน่าเชื่อถือเมื่อ object ไม่ยอมอยู่ในสถานะเป็นไปไม่ได้", evidence: "ป้องกันคืนหนังสือที่ยังไม่ยืมและจำนวนติดลบ", lessonIds: ["java-encapsulation"] },
      { id: "java-composition", title: "Composition & Collaboration", lane: "java", description: "ประกอบ Book, Member, Library และลำดับ message ระหว่าง object", why: "ระบบจริงเกิดจากหลาย object รับผิดชอบคนละเรื่อง", evidence: "ทำ Library Management CLI หลาย class พร้อม edge cases", lessonIds: ["java-composition"] },
      { id: "java-polymorphism", title: "Interfaces & Polymorphism", lane: "java", description: "เปลี่ยน behavior ผ่าน contract โดยไม่บังคับ inheritance ทุกส่วน", why: "ช่วยขยายระบบโดยไม่แก้ conditional ก้อนใหญ่", evidence: "สร้าง RPG attack behavior หลายแบบผ่าน interface", optional: true },
      { id: "java-testing", title: "JUnit & Object Behavior", lane: "java", description: "ทดสอบ public behavior, exception และ edge case ของ object", why: "OOP ต้องพิสูจน์ state transition ไม่ใช่แค่ compile ผ่าน", evidence: "เขียน JUnit สำหรับยืม คืน และกรณีผิด", optional: true },
    ],
  },
  {
    id: "portfolio", number: "09", title: "พิสูจน์ด้วย Portfolio Projects", outcome: "รวมทักษะเป็นระบบที่อธิบาย trade-off, tests และการตัดสินใจทางเทคนิคได้",
    nodes: [
      { id: "activity-planner", title: "Friends Activity Planner", lane: "core", description: "รายการ กิจกรรม การเข้าร่วม โหวตเวลา และ error/duplicate handling", why: "เป็นเส้นเรื่องที่เชื่อมบทเว็บทั้งหมดเข้าด้วยกัน", evidence: "ส่ง feature end-to-end พร้อม tests และบันทึกการตัดสินใจ", lessonIds: ["web-ts-narrowing", "web-react-filter", "web-react-form", "web-next-boundary", "web-next-states", "web-express-get", "web-express-post", "web-errors", "web-postgres-schema", "web-postgres-join", "web-integration", "web-testing"] },
      { id: "expense-tracker", title: "Personal Expense Tracker", lane: "core", description: "CRUD, category, summary, validation และข้อมูลของเจ้าของเท่านั้น", why: "ฝึก data modeling และ auth กับข้อมูลส่วนตัว", evidence: "repository, demo, ERD, tests และ technical write-up", optional: true },
      { id: "incident-dashboard", title: "Mini Incident Dashboard", lane: "core", description: "สถานะ incident, timeline, filtering และ loading/error recovery", why: "ฝึก state, reliability และการสื่อสารสถานะระบบ", evidence: "จำลอง failure และอธิบาย observability choices", optional: true },
      { id: "booking-api", title: "Authorized Booking API", lane: "core", description: "สิทธิ์ การจองพร้อมกัน transaction และ conflict response", why: "รวม back-end, database, security และ concurrency", evidence: "integration tests ยืนยันว่าไม่เกิด double booking", optional: true },
    ],
  },
];

export const roadmapNodes = fullstackRoadmap.flatMap((stage) => stage.nodes);
