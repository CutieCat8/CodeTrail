import type { CurriculumCourse } from "@/types/curriculum";

export const curriculumCourses: CurriculumCourse[] = [
  { id: "developer-foundations", title: "Developer Foundations", description: "เข้าใจคอมพิวเตอร์ ไฟล์ terminal process error และ Git ก่อนพึ่ง framework", track: "foundation", status: "live", targetSteps: 48 },
  { id: "java-foundations", title: "Java Foundations", description: "เริ่มจาก compile/run ไปถึง methods, arrays และ ArrayList แบบไม่สมมติพื้นฐาน", track: "java", status: "live", targetSteps: 120 },
  { id: "java-oop", title: "Java OOP Lab", description: "คิดจากปัญหาและความรับผิดชอบ แล้วจึงออกแบบ object ที่รักษาสถานะได้", track: "java", status: "live", targetSteps: 96 },
  { id: "javascript-foundations", title: "JavaScript Foundations", description: "ภาษาและการแก้ปัญหา: values, conditions, functions, loops, arrays/objects, references, callbacks, errors และ async พร้อม Activity Planner M1–M2", track: "web", status: "live", targetSteps: 100 },
  { id: "node-foundations", title: "Node.js Fundamentals", description: "runtime, process/CLI, modules, npm, files, event loop, streams, HTTP และ node:test พร้อม Activity Planner M4 ", track: "web", status: "live", targetSteps: 50 },
  { id: "backend", title: "Back-end Development", description: "REST design, Express 5, validation, middleware, error handling, SQL/PostgreSQL, transactions, authentication, authorization, security และ API testing พร้อม Activity Planner M5–M7", track: "web", status: "live", targetSteps: 85 },
  { id: "typescript", title: "TypeScript Foundations → Intermediate", description: "Type Observatory: types, functions, object types, unions, narrowing, null safety, generics, utility types, classes, tsconfig และข้อมูลจาก API พร้อม Activity Planner M3", track: "web", status: "live", targetSteps: 70 },
  { id: "react", title: "React Foundations", description: "วางแผนไว้: components, render, props, state, forms และ accessible UI", track: "web", status: "planned", targetSteps: 84 },
  { id: "nextjs", title: "Next.js App Router", description: "วางแผนไว้: Server/Client Components, data, cache และ route states", track: "web", status: "planned", targetSteps: 60 },
  { id: "postgres", title: "PostgreSQL & Prisma", description: "วางแผนไว้: relational thinking, SQL, constraints, joins, transactions และ migrations", track: "web", status: "planned", targetSteps: 84 },
];
