import type { TopicSource } from "@/types/curriculum";

const submit = "เปิด documentation ได้ ตรวจเองในเครื่อง: ใช้ ts-lab จาก ts-why วางโค้ดใน src/index.ts แล้วรัน npx tsc -p . และ node src/index.ts (Node 22.18+) ส่งโค้ด ผลตรวจ type ผลรันจริง และคำอธิบายสั้น ๆ ถ้ายังไม่สำเร็จ ส่งสิ่งที่ลองพร้อม error การส่งคำตอบบนเว็บไม่ใช่การยืนยันว่าผ่าน";

export const typescriptCheckpoints: Partial<Record<string, NonNullable<TopicSource["checkpoint"]>>> = {
  "ts-why": {
    prompt: [
      "ตู้ฝากของคิดค่าบริการชั่วโมงละ 12 บาท เขียน lockerFee รับจำนวนชั่วโมงเป็น number และคืน number ทดสอบ 3 ชั่วโมงได้ 36 และ 0 ชั่วโมงได้ 0",
      "ทดลองเรียกด้วยข้อความ \"3\" แยกอีกครั้ง บันทึกว่า tsc แจ้งอะไร แล้วลบการเรียกผิดชนิดก่อนรัน อธิบายว่าทำไมการรันด้วย Node เพียงอย่างเดียวจึงยังไม่ยืนยันว่า type ถูก",
      submit,
    ].join("\n"),
    rubric: [
      "parameter และ return เป็น number และผลรันของ 3 กับ 0 คือ 36 กับ 0",
      "มีหลักฐาน tsc ปฏิเสธ argument string และโค้ดฉบับสุดท้ายตรวจผ่าน",
      "อธิบายว่า Node ลบ type โดยไม่ตรวจ และแยกผลตรวจ type ออกจากผลรันได้",
    ],
    modelAnswer: `\`\`\`ts
function lockerFee(hours: number): number {
  return hours * 12;
}

console.log(lockerFee(3));
console.log(lockerFee(0));
// ทดลองเอา comment ออกเพื่อตรวจ error แล้วใส่กลับก่อนรัน:
// lockerFee("3");

// ผลรัน: 36 แล้ว 0 คนละบรรทัด
// tsc ผ่านเมื่อบรรทัดผิดถูก comment; ถ้าเปิดบรรทัดนั้นจะปฏิเสธ string
// Node ลบ type โดยไม่ตรวจ จึงต้องเก็บทั้งผล tsc และผลรัน
// เขียนสูตรผ่านตัวแปรเก็บค่าบริการก่อน return ก็ได้ ถ้าสัญญาเหมือนเดิม
\`\`\``,
  },
  "ts-basic-types": {
    prompt: [
      "ระบบแสดงข้อความจากข้อมูลที่ยังไม่รู้ชนิด เขียน displayValue(input: unknown): string รับ string แล้วคืนข้อความเดิม รับ number แล้วคืนข้อความขึ้นต้นว่า \"เลข: \" ตามด้วยค่านั้น และค่าชนิดอื่นคืน \"ไม่รองรับ\" ห้ามใช้ any หรือ as",
      "ทดสอบ \"พร้อม\", ข้อความว่าง, 0, 7, null และ false อธิบายว่าในแต่ละเส้นทางรู้ชนิดของ input ได้อย่างไร",
      submit,
    ].join("\n"),
    rubric: [
      "ตรวจผ่าน strict โดยรับ unknown และไม่มี any/as",
      "ได้ พร้อม, ข้อความว่าง, เลข: 0, เลข: 7, ไม่รองรับ, ไม่รองรับ ตามลำดับ",
      "อธิบายการตรวจชนิดก่อนใช้ค่า และไม่ทำให้ 0 หรือข้อความว่างหายไปเพราะตรวจ truthiness",
    ],
    modelAnswer: `\`\`\`ts
function displayValue(input: unknown): string {
  if (typeof input === "string") {
    return input;
  }
  if (typeof input === "number") {
    return "เลข: " + input;
  }
  return "ไม่รองรับ";
}

console.log(displayValue("พร้อม"));
console.log(displayValue(""));
console.log(displayValue(0));
console.log(displayValue(7));
console.log(displayValue(null));
console.log(displayValue(false));

// ผลรัน: พร้อม / บรรทัดว่าง / เลข: 0 / เลข: 7 / ไม่รองรับ / ไม่รองรับ
// typeof ทำให้แต่ละกิ่งรู้ชนิด; 0 กับข้อความว่างยังเป็นค่าที่รองรับ
// ใช้ if/else แทนการ return ออกจากแต่ละกิ่งก็ได้
\`\`\``,
  },
  "ts-functions": {
    prompt: [
      "เครื่องพิมพ์ป้ายต้องสร้างข้อความจากชื่อสินค้าและจำนวน เขียน makeLabel ที่รับชื่อเป็น string และจำนวนเป็น number ซึ่งละไว้ได้ เมื่อไม่ส่งจำนวนให้ใช้ 1 คืน string รูปแบบ \"สมุด x 1\"",
      "ทดสอบชื่อสมุดโดยไม่ส่งจำนวน ส่ง 3 และส่ง 0 (ต้องคง 0) จากนั้นเก็บ makeLabel ในตัวแปร labelOne ที่มี function type รับ string คืน string แล้วเรียก labelOne(\"ปากกา\") อธิบายเหตุผลที่ assign ได้",
      submit,
    ].join("\n"),
    rubric: [
      "ผลรันคือ สมุด x 1, สมุด x 3, สมุด x 0 และ ปากกา x 1",
      "กำหนด parameter/return และ function type ของ labelOne ชัดเจน ตรวจ strict ผ่าน",
      "อธิบายได้ว่า parameter จำนวนละไว้ได้ และ default ไม่แทนค่าจำนวน 0",
    ],
    modelAnswer: `\`\`\`ts
function makeLabel(name: string, quantity: number = 1): string {
  return name + " x " + quantity;
}

const labelOne: (name: string) => string = makeLabel;
console.log(makeLabel("สมุด"));
console.log(makeLabel("สมุด", 3));
console.log(makeLabel("สมุด", 0));
console.log(labelOne("ปากกา"));

// ผลรัน: สมุด x 1 / สมุด x 3 / สมุด x 0 / ปากกา x 1
// default ใช้เมื่อไม่ส่งหรือส่ง undefined; 0 เป็นค่าที่ส่งมาจริง
// parameter ตัวที่สองไม่บังคับส่ง จึงใช้เป็น function ที่รับชื่ออย่างเดียวได้
// ใช้ optional parameter แล้วตรวจ undefined โดยตรงก็ได้
\`\`\``,
  },
  "ts-object-types": {
    prompt: [
      "ระบบห้องสมุดเก็บ Book ที่มี id เป็น readonly number, title เป็น string และ shelf เป็น optional string เขียน assignShelf(book: Book, shelf?: string): Book ที่คืนหนังสือ object ใหม่ โดยคง id/title และใช้ shelf ที่ส่งมา ห้ามแก้ object เดิม ถ้าไม่ส่ง shelf ให้สำเนาไม่มีชั้นที่กำหนด (undefined); ข้อความว่างต้องคงไว้",
      "จากหนังสือ id 1 ชื่อสวน ชั้น A2 สร้างสำเนาที่ชั้น B3, ไม่ระบุชั้น และชั้นข้อความว่าง พิมพ์ id/title ของสำเนาแต่ละเล่ม ยืนยันว่าสำเนาเป็นคนละ object และต้นฉบับยังมีชั้น A2 แยกทดลองแก้ id และสร้าง Book ที่สะกด title เป็น titlle บันทึก error แล้วนำกรณีผิดออกก่อนตรวจฉบับสุดท้าย อธิบายข้อจำกัดของ readonly ตอน runtime",
      submit,
    ].join("\n"),
    rubric: [
      "Book มีชนิดและ modifier ตามสัญญา สำเนาทั้งสามคง id/title และมี shelf เป็น B3, undefined, ข้อความว่าง ตามลำดับ",
      "สำเนาแต่ละเล่มเป็น object ใหม่และต้นฉบับคง shelf A2; ฉบับสุดท้ายตรวจ strict ผ่าน",
      "มีผล tsc ปฏิเสธการแก้ id และ field titlle พร้อมอธิบายว่า readonly ไม่ได้แช่แข็ง object ตอน runtime",
    ],
    modelAnswer: `\`\`\`ts
type Book = {
  readonly id: number;
  title: string;
  shelf?: string;
};

function assignShelf(book: Book, shelf?: string): Book {
  return { id: book.id, title: book.title, shelf };
}

const book: Book = { id: 1, title: "สวน", shelf: "A2" };
const moved = assignShelf(book, "B3");
const unassigned = assignShelf(book);
const empty = assignShelf(book, "");
console.log(moved.id, moved.title, moved.shelf, moved !== book);
console.log(unassigned.id, unassigned.title, unassigned.shelf, unassigned !== book);
console.log(empty.id, empty.title, empty.shelf === "", empty !== book);
console.log(book.shelf);
// ทดลองทีละบรรทัดแล้ว comment กลับก่อนรัน:
// book.id = 4;
// const wrong: Book = { id: 5, titlle: "ฝน" };

// ผลรัน: 1 สวน B3 true / 1 สวน undefined true / 1 สวน true true / A2
// object literal สร้างสำเนาใหม่; optional parameter ได้ undefined เมื่อไม่ส่ง
// ค่าข้อความว่างยังคงอยู่ และต้นฉบับไม่เปลี่ยน
// tsc ปฏิเสธ readonly assignment และ field titlle; readonly ไม่มีผลแช่แข็งตอนรัน
// ใช้ interface หรือ object spread สร้างสำเนาก็ได้ ถ้าพฤติกรรมตรงสัญญา
\`\`\``,
  },
};
