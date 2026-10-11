export type DiagnosticQuestion = {
  id: string;
  area: "พื้นฐานนักพัฒนา" | "เว็บ" | "JavaScript" | "Java";
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  reviewStepId: string;
};

export const diagnosticVersion = 1 as const;
export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "dev-save", area: "พื้นฐานนักพัฒนา", prompt: "แก้ source code ใน editor แล้วกด Save สิ่งใดเกิดขึ้นแน่นอน?",
    options: [{ id: "saved", text: "ไฟล์บนดิสก์ถูกบันทึก แต่ยังต้องสั่งรันโปรแกรม" }, { id: "run", text: "โปรแกรมรันทันทีทุกครั้ง" }, { id: "commit", text: "Git สร้าง commit ให้ทันที" }],
    correctOptionId: "saved", explanation: "Save, run และ commit เป็นคนละการกระทำ", reviewStepId: "dev-editor-concept",
  },
  {
    id: "dev-path", area: "พื้นฐานนักพัฒนา", prompt: "คำสั่งที่ใช้ relative path จะหาไฟล์โดยเริ่มจากที่ใด?",
    options: [{ id: "desktop", text: "Desktop เสมอ" }, { id: "cwd", text: "current working directory ของคำสั่ง" }, { id: "editor", text: "โฟลเดอร์ที่ติดตั้ง editor เสมอ" }],
    correctOptionId: "cwd", explanation: "Relative path อ้างอิงตำแหน่งทำงานปัจจุบัน จึงควรตรวจ directory ก่อนรัน", reviewStepId: "dev-terminal-concept",
  },
  {
    id: "web-response", area: "เว็บ", prompt: "Browser ส่ง HTTP request แล้ว server ตอบ 404 หมายถึงอะไร?",
    options: [{ id: "offline", text: "Browser ไม่มีอินเทอร์เน็ตแน่นอน" }, { id: "missing", text: "Server ตอบกลับว่าไม่พบ resource ที่ร้องขอ" }, { id: "success", text: "ส่งข้อมูลสำเร็จและสร้าง resource ใหม่" }],
    correctOptionId: "missing", explanation: "404 เป็น HTTP response จาก server ที่บอกว่าไม่พบ resource", reviewStepId: "web-request-concept",
  },
  {
    id: "web-label", area: "เว็บ", prompt: "ควรเชื่อม label กับช่องกรอกข้อมูลด้วยอะไร?",
    options: [{ id: "color", text: "ใช้สีเดียวกันก็เพียงพอ" }, { id: "placeholder", text: "ใส่ placeholder อย่างเดียว" }, { id: "for", text: "ให้ htmlFor ของ label ตรงกับ id ของ input" }],
    correctOptionId: "for", explanation: "ความสัมพันธ์ label และ input ช่วยให้ผู้ใช้และเทคโนโลยีช่วยเหลือรู้ชื่อช่องกรอก", reviewStepId: "web-forms-concept",
  },
  {
    id: "js-values", area: "JavaScript", prompt: 'console.log(2 + "3") แสดงค่าใด?',
    options: [{ id: "five", text: "5" }, { id: "text", text: '"23" (ข้อความ)' }, { id: "error", text: "เกิด error เสมอ" }],
    correctOptionId: "text", explanation: "+ เมื่อมี string จะต่อข้อความ ในกรณีนี้ได้ string 23", reviewStepId: "js-values-concept",
  },
  {
    id: "js-return", area: "JavaScript", prompt: "function ที่ไม่ใช้ return จะคืนค่าใดตามปกติ?",
    options: [{ id: "zero", text: "0" }, { id: "last", text: "ค่าของบรรทัดสุดท้าย" }, { id: "undefined", text: "undefined" }],
    correctOptionId: "undefined", explanation: "Function ที่จบโดยไม่มี return พร้อมค่าจะคืน undefined", reviewStepId: "js-functions-concept",
  },
  {
    id: "java-compile", area: "Java", prompt: "javac ทำหน้าที่ใดในเส้นทางรัน Java แบบพื้นฐาน?",
    options: [{ id: "compile", text: "คอมไพล์ source code เป็น bytecode" }, { id: "browser", text: "เปิด source code ใน browser" }, { id: "git", text: "บันทึก source code ลง Git" }],
    correctOptionId: "compile", explanation: "javac คอมไพล์ไฟล์ .java จากนั้น java ใช้ JVM รัน class", reviewStepId: "java-jdk-concept",
  },
  {
    id: "java-division", area: "Java", prompt: "ใน Java นิพจน์ 5 / 2 เมื่อทั้งสองค่าเป็น int ให้ผลเท่าใด?",
    options: [{ id: "decimal", text: "2.5" }, { id: "integer", text: "2" }, { id: "round", text: "3" }],
    correctOptionId: "integer", explanation: "การหารจำนวนเต็มตัดส่วนเศษ จึงได้ 2 หากต้องการทศนิยมต้องใช้ชนิดทศนิยม", reviewStepId: "java-expressions-concept",
  },
];

export const diagnosticPracticeStepId = "js-functions-practice";
