import type { CurriculumCourse } from "@/types/curriculum";

export const curriculumCourses: CurriculumCourse[] = [
  { id: "developer-foundations", title: "Developer Foundations", description: "เข้าใจคอมพิวเตอร์ ไฟล์ terminal process error และ Git ก่อนพึ่ง framework", track: "foundation", status: "live", targetSteps: 48 },
  { id: "java-foundations", title: "Java Foundations", description: "เริ่มจาก compile/run ไปถึง methods, arrays และ ArrayList แบบไม่สมมติพื้นฐาน", track: "java", status: "live", targetSteps: 120 },
  { id: "java-oop", title: "Java OOP Lab", description: "คิดจากปัญหาและความรับผิดชอบ แล้วจึงออกแบบ object ที่รักษาสถานะได้", track: "java", status: "live", targetSteps: 96 },
  { id: "javascript-foundations", title: "JavaScript Foundations", description: "เข้าใจ runtime, values, functions, arrays, objects, scope และ async ก่อน TypeScript/React", track: "web", status: "live", targetSteps: 96 },
  { id: "node-foundations", title: "Node & HTTP Foundations", description: "เข้าใจ Node runtime, modules, npm, HTTP และ middleware ก่อนสร้าง REST API", track: "web", status: "live", targetSteps: 120 },
  { id: "typescript", title: "TypeScript Workshop", description: "กำลังแตกบทเดิมเป็น types, unions, narrowing, generics และ async ทีละแนวคิด", track: "web", status: "writing", targetSteps: 72 },
  { id: "react", title: "React Foundations", description: "วางแผนไว้: components, render, props, state, forms และ accessible UI", track: "web", status: "planned", targetSteps: 84 },
  { id: "nextjs", title: "Next.js App Router", description: "วางแผนไว้: Server/Client Components, data, cache และ route states", track: "web", status: "planned", targetSteps: 60 },
  { id: "postgres", title: "PostgreSQL & Prisma", description: "วางแผนไว้: relational thinking, SQL, constraints, joins, transactions และ migrations", track: "web", status: "planned", targetSteps: 84 },
];
