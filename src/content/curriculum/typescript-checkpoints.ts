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
  "ts-arrays-tuples": {
    prompt: [
      "โรงอาหารรับรายการสั่งอาหารเป็น tuple ชื่อเมนูกับจำนวนจาน นิยาม Order = [name: string, quantity: number] และเขียน orderSummary รับ readonly Order[] คืน tuple [จำนวนจานรวม, จำนวนรายการที่มีอย่างน้อย 1 จาน] โดยไม่แก้รายการหรือตัว tuple ข้างใน กำหนดให้จำนวนจานเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไปอยู่แล้ว",
      "ทดสอบ [[ข้าว, 2], [น้ำ, 0], [ข้าว, 3]] ได้ [5, 2] (เมนูชื่อซ้ำยังนับเป็นคนละรายการ), รายการว่างได้ [0, 0] และ [[น้ำ, 0]] ได้ [0, 0] destructure ผลเพื่อพิมพ์ และแสดงหลักฐานว่าข้อมูลต้นฉบับเหมือนเดิม ทดลองสลับชนิดช่องของ Order เพื่อดู error แล้วนำออกก่อนตรวจฉบับสุดท้าย อธิบายว่า readonly Order[] ป้องกันการแก้ tuple ข้างในหรือไม่",
      submit,
    ].join("\n"),
    rubric: [
      "กำหนด Order และ parameter/return tuple ตามสัญญา ตรวจ strict ผ่าน และ destructure ผลลัพธ์ก่อนพิมพ์",
      "กรณีปกติ ชื่อซ้ำ ว่าง และจำนวน 0 ได้ผล 5 2, 0 0, 0 0 พร้อมหลักฐานว่าต้นฉบับไม่เปลี่ยน",
      "tsc ปฏิเสธ tuple ที่สลับชนิด และอธิบายว่า readonly ของ array ชั้นนอกไม่ป้องกันการแก้ tuple ข้างใน จึงต้องรักษาสัญญานั้นด้วยโค้ด",
    ],
    modelAnswer: `\`\`\`ts
type Order = [name: string, quantity: number];

function orderSummary(orders: readonly Order[]): [plates: number, active: number] {
  let plates = 0;
  let active = 0;
  for (const [, quantity] of orders) {
    plates += quantity;
    if (quantity > 0) {
      active += 1;
    }
  }
  return [plates, active];
}

const orders: Order[] = [["ข้าว", 2], ["น้ำ", 0], ["ข้าว", 3]];
const before = JSON.stringify(orders);
const [plates, active] = orderSummary(orders);
console.log(plates, active);
const [emptyPlates, emptyActive] = orderSummary([]);
console.log(emptyPlates, emptyActive);
const [zeroPlates, zeroActive] = orderSummary([["น้ำ", 0]]);
console.log(zeroPlates, zeroActive);
console.log(JSON.stringify(orders) === before);
// ทดลองแล้ว comment กลับก่อนรัน:
// const wrong: Order = [2, "ข้าว"];

// ผลรัน: 5 2 / 0 0 / 0 0 / true
// [, quantity] ข้ามช่องชื่อและอ่านช่องจำนวนด้วย destructuring
// readonly Order[] ห้ามแก้ array ชั้นนอก แต่ Order ข้างในยังแก้ได้
// function นี้อ่านอย่างเดียวจึงรักษาทั้งสองชั้น ไม่รวมชื่อซ้ำเป็นรายการเดียว
// ใช้ reduce แทน loop ก็ได้ ถ้าไม่แก้ input และได้ tuple ตามสัญญา
\`\`\``,
  },
  "ts-unions-literals": {
    prompt: [
      "ประตูตู้เก็บอุปกรณ์มีสถานะ DoorState = closed | open | locked และคำสั่ง DoorAction = open | close | lock (ทุกค่าเป็น string literal) เขียน nextDoor(state, action): DoorState ตามกติกา: closed เปิดหรือใส่ล็อกได้, open ปิดได้, locked ไม่รับคำสั่งใด คำสั่งอื่นในสถานะนั้นให้คงสถานะเดิม",
      "ทดสอบครบทั้ง 9 คู่สถานะ/คำสั่ง และลองส่งสถานะ broken กับคำสั่ง unlock แยกทีละครั้งเพื่อบันทึก error แล้วนำออกก่อนตรวจฉบับสุดท้าย อธิบายว่า union ช่วยตรวจชุดคำศัพท์อย่างไร และทำไมยังต้องมีโค้ดบังคับกติกาการเปลี่ยนสถานะ",
      submit,
    ].join("\n"),
    rubric: [
      "ใช้ union ของ string literal ทั้งสองชุด กำหนด parameter/return ตรวจ strict ผ่าน โดยไม่มี any หรือ assertion",
      "ทดสอบทั้ง 9 คู่: closed ได้ open/closed/locked, open ได้ open/closed/open, locked ได้ locked ทั้งสามคำสั่ง ตามลำดับ open/close/lock",
      "มีหลักฐาน tsc ปฏิเสธ broken และ unlock พร้อมอธิบายว่าชนิดไม่ได้บังคับกติกาเปลี่ยนสถานะให้อัตโนมัติ",
    ],
    modelAnswer: `\`\`\`ts
type DoorState = "closed" | "open" | "locked";
type DoorAction = "open" | "close" | "lock";

function nextDoor(state: DoorState, action: DoorAction): DoorState {
  if (state === "closed" && action === "open") {
    return "open";
  }
  if (state === "closed" && action === "lock") {
    return "locked";
  }
  if (state === "open" && action === "close") {
    return "closed";
  }
  return state;
}

const states: DoorState[] = ["closed", "open", "locked"];
const actions: DoorAction[] = ["open", "close", "lock"];
for (const state of states) {
  for (const action of actions) {
    console.log(state, action, nextDoor(state, action));
  }
}
// ทดลองทีละบรรทัดแล้ว comment กลับก่อนรัน:
// nextDoor("broken", "open");
// nextDoor("closed", "unlock");

// ผลรันเป็น 9 บรรทัด ตามลำดับ states และ actions ด้านบน
// union ปฏิเสธคำที่อยู่นอกชุด; เงื่อนไขใน function บังคับกติกาการเปลี่ยน
// เช่น lock ขณะ open คง open และ locked คงเดิมทุกคำสั่ง
// ใช้ switch แทน if ก็ได้ ถ้าทั้ง 9 คู่ได้ผลเหมือนกัน
\`\`\``,
  },
  "ts-narrowing": {
    prompt: [
      "จอคิวงานพิมพ์รับ PrintJob เป็น union สามแบบ: queued มี position: number, done มี pages: number และ failed มี reason: string โดยใช้ kind เป็นตัวแยก เขียน jobMessage คืน คิว N, พิมพ์ N หน้า หรือ ผิดพลาด: เหตุผล ตามแต่ละแบบ ห้ามใช้ any หรือ assertion และต้องมี exhaustive check ด้วย never",
      "เขียน isDone เป็น type predicate แล้วใช้คัดงานที่เสร็จเพื่อรวมจำนวนหน้า ทดสอบ queued ตำแหน่ง 0, done 3 หน้า, done 0 หน้า และ failed เหตุผลกระดาษหมด ได้ข้อความครบและรวม 3 หน้า; รายการว่างรวม 0 จากนั้นทดลองเพิ่มชนิด cancelled มี kind: cancelled ใน union แต่ยังไม่เพิ่มกิ่งจัดการ บันทึก error ที่ exhaustive check แล้วนำชนิดทดลองออกก่อนตรวจฉบับสุดท้าย",
      submit,
    ].join("\n"),
    rubric: [
      "union ใช้ field เฉพาะแบบหลัง narrow และ jobMessage มี never ตรวจครบทุกกรณี; ฉบับสุดท้าย strict ผ่านโดยไม่มี any/assertion",
      "ได้ คิว 0, พิมพ์ 3 หน้า, พิมพ์ 0 หน้า, ผิดพลาด: กระดาษหมด และใช้ isDone คัดเพื่อรวมได้ 3 กับ 0 เมื่อรายการว่าง",
      "มีผล tsc ปฏิเสธ cancelled ที่กิ่ง never พร้อมอธิบายว่าการเพิ่ม union ต้องเพิ่มการจัดการด้วย",
    ],
    modelAnswer: `\`\`\`ts
type Queued = { kind: "queued"; position: number };
type Done = { kind: "done"; pages: number };
type Failed = { kind: "failed"; reason: string };
type PrintJob = Queued | Done | Failed;

function jobMessage(job: PrintJob): string {
  switch (job.kind) {
    case "queued":
      return "คิว " + job.position;
    case "done":
      return "พิมพ์ " + job.pages + " หน้า";
    case "failed":
      return "ผิดพลาด: " + job.reason;
    default: {
      const unreachable: never = job;
      return unreachable;
    }
  }
}

function isDone(job: PrintJob): job is Done {
  return job.kind === "done";
}

function printedPages(jobs: PrintJob[]): number {
  let pages = 0;
  for (const job of jobs.filter(isDone)) {
    pages += job.pages;
  }
  return pages;
}

const jobs: PrintJob[] = [
  { kind: "queued", position: 0 },
  { kind: "done", pages: 3 },
  { kind: "done", pages: 0 },
  { kind: "failed", reason: "กระดาษหมด" },
];
for (const job of jobs) {
  console.log(jobMessage(job));
}
console.log(printedPages(jobs));
console.log(printedPages([]));
// ทดลองแก้ PrintJob เป็น Queued | Done | Failed | { kind: "cancelled" }
// tsc จะปฏิเสธการ assign cancelled ให้ never แล้วแก้ union กลับก่อนรัน

// ผลรัน: คิว 0 / พิมพ์ 3 หน้า / พิมพ์ 0 หน้า / ผิดพลาด: กระดาษหมด / 3 / 0
// kind ทำให้แต่ละกิ่งอ่าน field ที่มีจริง; isDone ทำให้ filter ได้ Done[]
// never บังคับตรวจซ้ำเมื่อเพิ่มแบบใหม่ ใช้ if ที่จัดการครบแทน switch ก็ได้
\`\`\``,
  },
  "ts-null-safety": {
    prompt: [
      "ตู้ข้อมูลมี Kiosk ที่มี id: string และ settings เป็น optional object ซึ่งมี title?: string | null กับ volume?: number | null เขียน kioskSummary(kiosks: Kiosk[], id: string): string ค้นหาตู้ด้วย id ถ้าไม่พบคืน ไม่พบตู้ ถ้าพบคืน title ตามด้วย | และ volume โดย title ที่ขาดหรือ null ใช้ จุดบริการ และ volume ที่ขาดหรือ null ใช้ 50 ต้องคง title ข้อความว่างและ volume 0 ไว้ ห้ามใช้ any, as หรือ non-null assertion",
      "ทดสอบตู้ชื่อ ทางเข้า เสียง 20, ตู้ที่มี title ว่างและเสียง 0, ตู้ไม่มี settings, ตู้มี settings ว่าง, ตู้มีค่าทั้งสองเป็น null และ id ที่ไม่พบ อธิบายว่า ?. กับ ?? รับผิดชอบคนละส่วนอย่างไร และทดลองอ่าน title จากผล find โดยไม่จัดการ undefined เพื่อบันทึก error แล้วนำออกก่อนตรวจฉบับสุดท้าย",
      submit,
    ].join("\n"),
    rubric: [
      "ชนิด Kiosk และ kioskSummary ตรงสัญญา strict ผ่าน และไม่มี any/as/non-null assertion",
      "ผลครบหกกรณี: ทางเข้า|20, |0, จุดบริการ|50 สามครั้ง และ ไม่พบตู้ โดยรักษาข้อความว่างกับ 0",
      "มีผล tsc ปฏิเสธการอ่านจากผล find ที่อาจไม่มี และอธิบาย ?. ป้องกันการอ่านค่าที่ไม่มี ส่วน ?? ใส่ค่าแทนเฉพาะ null/undefined",
    ],
    modelAnswer: `\`\`\`ts
type Kiosk = {
  id: string;
  settings?: {
    title?: string | null;
    volume?: number | null;
  };
};

function kioskSummary(kiosks: Kiosk[], id: string): string {
  const kiosk = kiosks.find((item) => item.id === id);
  if (kiosk === undefined) {
    return "ไม่พบตู้";
  }
  const title = kiosk.settings?.title ?? "จุดบริการ";
  const volume = kiosk.settings?.volume ?? 50;
  return title + "|" + volume;
}

const kiosks: Kiosk[] = [
  { id: "a", settings: { title: "ทางเข้า", volume: 20 } },
  { id: "b", settings: { title: "", volume: 0 } },
  { id: "c" },
  { id: "d", settings: {} },
  { id: "e", settings: { title: null, volume: null } },
];
for (const id of ["a", "b", "c", "d", "e", "missing"]) {
  console.log(kioskSummary(kiosks, id));
}
// ทดลองแล้ว comment กลับก่อนรัน:
// const missing = kiosks.find((item) => item.id === "missing");
// console.log(missing.settings?.title);

// ผลรัน: ทางเข้า|20 / |0 / จุดบริการ|50 / จุดบริการ|50 / จุดบริการ|50 / ไม่พบตู้
// ตรวจผล find ก่อนจึงแยกไม่พบตู้จากตู้ที่ยังไม่มี settings ได้
// ?. ยอมให้ settings ไม่มี; ?? ใช้ค่าแทนเฉพาะ null/undefined จึงคง "" กับ 0
// ใช้การตรวจ null/undefined โดยตรงแทน ?. และ ?? ได้ ถ้าครบทุกกรณี
\`\`\``,
  },

};
