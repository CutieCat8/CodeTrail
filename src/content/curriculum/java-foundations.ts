import type { TopicSource } from "@/types/curriculum";

import { javaBridgeTopics } from "./java-bridges";
import { javaCheckpoints } from "./java-checkpoints";

const courseId = "java-foundations";
const v = (a: string, b: string): [string, string] => [a, b];
// Java code is written with String.raw so escapes such as \n stay exactly as the learner types them.
const java = String.raw;

// Order is the learning order. Topic IDs are stored in learner progress: never rename them.
// Examples and solutions are compiled and run with JDK 21 by scripts/verify-java-lessons.ts (outside the app).
const originalTopics: TopicSource[] = [
{
  id: "java-jdk",
  courseId,
  unit: "เริ่มต้น Java",
  title: "JDK, javac และ JVM: จาก source ถึงโปรแกรมที่รันได้",
  objective: "ติดตั้งและตรวจ JDK 21 อธิบายเส้นทาง .java → javac → .class → JVM และแยกได้ว่า error เกิดตอน compile หรือตอน run",
  why: "มือใหม่ Java มักติดตั้งแค่ JRE หรือใช้ version ไม่ตรงกับบทเรียน แล้วเจอ error ที่ไม่เข้าใจ การรู้ว่าแต่ละคำสั่งทำอะไรทำให้อ่าน error ได้ถูกที่: compile error แก้ source ส่วน runtime error ดูพฤติกรรมตอนโปรแกรมทำงาน",
  explanation: "JDK (Java Development Kit) มีเครื่องมือพัฒนา เช่น javac (compiler) และ java (launcher) javac อ่านไฟล์ .java ตรวจ syntax และชนิดข้อมูล แล้วสร้างไฟล์ .class ที่เก็บ bytecode คำสั่ง java เริ่ม JVM (Java Virtual Machine) ซึ่งโหลด .class แล้วเรียก method main ตั้งแต่ JDK 11 สั่ง java Hello.java ได้เลยสำหรับโปรแกรมไฟล์เดียว (compile ในหน่วยความจำแล้วรัน ไม่สร้าง .class) บทเรียนนี้ใช้ JDK 21 (LTS) ตรวจด้วย java --version และ javac --version ซึ่งต้องเป็น 21 ทั้งคู่",
  language: "java",
  standard: "v3",
  prerequisites: ["dev-files", "dev-terminal"],
  example: java`// File: QuestStart.java
public class QuestStart {
    public static void main(String[] args) {
        System.out.println("Ready");
        System.out.println("Java " + Runtime.version().feature());
    }
}`,
  expectedOutput: "Ready\nJava 21",
  solutionCheck: { output: "Ready\nJava 21" },
  tracePrompt: "สั่ง javac QuestStart.java แล้ว java QuestStart ไฟล์ไหนถูกสร้างขึ้น คำสั่งไหนเริ่ม JVM และถ้าลบ QuestStart.class ทิ้งก่อนสั่ง java QuestStart จะเกิดอะไร",
  traceAnswer: "javac สร้าง QuestStart.class (ไม่เริ่มโปรแกรม) java QuestStart เริ่ม JVM แล้วโหลด class ชื่อ QuestStart จาก classpath (โฟลเดอร์ปัจจุบัน) ถ้าลบ .class ทิ้ง JVM หา class ไม่เจอ ได้ “Error: Could not find or load main class QuestStart” ซึ่งเป็นปัญหาตอนรัน ไม่ใช่ปัญหาของ source",
  practicePrompt: "ในเครื่อง: ติดตั้ง JDK 21 (เช่น Eclipse Temurin 21) แล้วสร้าง QuestStart.java ที่พิมพ์สองบรรทัด: Ready และ Java ตามด้วย feature version (Runtime.version().feature()) ทำสองวิธี: (1) javac QuestStart.java แล้ว java QuestStart (2) java QuestStart.java แล้วเขียนว่าวิธีไหนสร้างไฟล์ .class",
  starter: java`// File: QuestStart.java
public class QuestStart {
    public static void main(String[] args) {
        // บรรทัดที่ 1: Ready
        // บรรทัดที่ 2: Java ตามด้วยเลข version จาก Runtime.version().feature()
    }
}`,
  solution: java`// File: QuestStart.java
public class QuestStart {
    public static void main(String[] args) {
        System.out.println("Ready");
        System.out.println("Java " + Runtime.version().feature());
    }
}`,
  buggy: java`// File: QuestStart.java
public class Start {
    public static void main(String[] args) {
        System.out.println("Ready");
    }
}`,
  bugCheck: {kind: "compile", message: "class Start is public, should be declared in a file named Start.java"},
  bugExplanation: "javac แจ้ง “class Start is public, should be declared in a file named Start.java” public class ต้องชื่อตรงกับชื่อไฟล์ (ตัวพิมพ์เล็ก/ใหญ่ต้องตรง) แก้โดยเปลี่ยนเป็น public class QuestStart หรือเปลี่ยนชื่อไฟล์เป็น Start.java นี่คือ compile error: โปรแกรมยังไม่ได้เริ่มเลย",
  vocabulary: [v("JDK", "ชุดเครื่องมือพัฒนา Java มี javac, java และ library มาตรฐาน"), v("javac", "compiler แปลง .java เป็น .class"), v("bytecode", "คำสั่งกลางในไฟล์ .class ที่ JVM เข้าใจ"), v("JVM", "โปรแกรมที่โหลดและทำงานตาม bytecode"), v("compile error", "ข้อผิดพลาดที่ javac พบก่อนโปรแกรมเริ่ม"), v("runtime error", "ข้อผิดพลาดที่เกิดระหว่างโปรแกรมทำงาน")],
},
{
  id: "java-main",
  courseId,
  unit: "เริ่มต้น Java",
  title: "class, main method และ statement",
  objective: "อ่านโครงของโปรแกรม Java ได้ทีละส่วน (class, method main, block, statement, semicolon) และเขียนโปรแกรมที่ทำงานตามลำดับบนลงล่าง",
  why: "ทุกโปรแกรม Java เริ่มจาก main ถ้าไม่เข้าใจว่าปีกกา semicolon และ signature ของ main มีหน้าที่อะไร จะติดอยู่กับ error เล็ก ๆ แทนที่จะได้คิดเรื่องปัญหา",
  explanation: "โค้ด Java ทุกบรรทัดอยู่ใน class main คือจุดเริ่ม signature มาตรฐานคือ public static void main(String[] args) (public: เรียกจากนอก class ได้, static: เรียกได้โดยไม่ต้องสร้าง object, void: ไม่คืนค่า, String[] args: ข้อความที่ส่งมาทาง command line) ปีกกา { } กำหนด block statement จบด้วย ; และทำงานจากบนลงล่าง comment เขียนด้วย // (บรรทัดเดียว) หรือ /* ... */ (หลายบรรทัด) Java แยกตัวพิมพ์เล็ก/ใหญ่: System กับ system เป็นคนละชื่อ",
  language: "java",
  standard: "v3",
  prerequisites: ["java-jdk"],
  example: java`public class Main {
    public static void main(String[] args) {
        // statement ทำงานจากบนลงล่าง
        System.out.println("1. เปิดห้องสมุด");
        System.out.println("2. ตรวจรายการหนังสือ");
        System.out.println("3. พร้อมให้บริการ");
        System.out.println("args: " + args.length);
    }
}`,
  expectedOutput: "1. เปิดห้องสมุด\n2. ตรวจรายการหนังสือ\n3. พร้อมให้บริการ\nargs: 0",
  solutionCheck: { output: "=== Sea Library ===\nเปิด 09:00-18:00\nพิมพ์ help เพื่อดูคำสั่ง" },
  tracePrompt: "ถ้ารันด้วย java Main.java เช้า บ่าย บรรทัดสุดท้ายจะพิมพ์อะไร และถ้าสลับบรรทัด 2 กับ 3 ใน source ผลจะเปลี่ยนไหม",
  traceAnswer: "args คือ array ของคำที่ตามหลังชื่อไฟล์ จึงมี 2 ค่า (\"เช้า\", \"บ่าย\") บรรทัดสุดท้ายพิมพ์ args: 2 และผลเปลี่ยนตามลำดับ source เพราะ statement ทำงานจากบนลงล่างทีละบรรทัด",
  practicePrompt: "เขียน Main.java ที่พิมพ์ป้ายต้อนรับของห้องสมุด 3 บรรทัดตามลำดับนี้พอดี: === Sea Library === / เปิด 09:00-18:00 / พิมพ์ help เพื่อดูคำสั่ง และใส่ comment หนึ่งบรรทัดอธิบายว่า main คืออะไร",
  starter: java`public class Main {
    // main คือ ...
    public static void main(String[] args) {
        // พิมพ์ 3 บรรทัด
    }
}`,
  solution: java`public class Main {
    // main คือจุดเริ่มของโปรแกรม JVM เรียก method นี้เป็นอันดับแรก
    public static void main(String[] args) {
        System.out.println("=== Sea Library ===");
        System.out.println("เปิด 09:00-18:00");
        System.out.println("พิมพ์ help เพื่อดูคำสั่ง");
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        System.out.println("=== Sea Library ===")
        system.out.println("เปิด 09:00-18:00");
    }
}`,
  bugCheck: {kind: "compile", message: "';' expected"},
  bugExplanation: "มีสอง compile error: บรรทัดแรกขาด ; (javac แจ้ง “';' expected”) และ system ต้องเป็น System (Java แยกตัวพิมพ์ ชื่อ system ไม่มีอยู่ javac แจ้ง “package system does not exist”) javac อาจรายงานทีละจุด แก้จุดแรกแล้ว compile ใหม่",
  vocabulary: [v("class", "หน่วยที่ใช้จัดกลุ่มโค้ด ทุกโค้ด Java อยู่ใน class"), v("main", "method ที่ JVM เรียกเป็นจุดเริ่ม"), v("statement", "คำสั่งหนึ่งหน่วย จบด้วย ;"), v("block", "กลุ่ม statement ใน { }"), v("args", "array ของข้อความจาก command line"), v("case-sensitive", "ตัวพิมพ์เล็ก/ใหญ่ต่างกันเป็นคนละชื่อ")],
},
{
  id: "java-output",
  courseId,
  unit: "ค่าและนิพจน์",
  title: "println, print และ printf: จัดรูปแบบผลลัพธ์",
  objective: "เลือกใช้ println, print และ printf ได้ตรงงาน ใช้ format specifier %s %d %.2f %n และจัดความกว้างคอลัมน์ได้",
  why: "โปรแกรม CLI สื่อสารกับผู้ใช้ผ่านข้อความทั้งหมด ราคาที่ทศนิยมยาวเหยียดหรือตารางที่คอลัมน์ไม่ตรงทำให้อ่านผิด printf ช่วยกำหนดรูปแบบได้แน่นอน",
  explanation: "System.out.println(x) พิมพ์แล้วขึ้นบรรทัดใหม่ print(x) พิมพ์โดยไม่ขึ้นบรรทัด printf(format, values...) แทนที่ specifier ใน format ตามลำดับ: %s ข้อความ (ใช้ได้กับทุกค่า), %d จำนวนเต็ม, %.2f ทศนิยม 2 ตำแหน่ง (ปัดเศษ), %n ขึ้นบรรทัดใหม่ตามระบบ ความกว้าง: %-12s ชิดซ้ายกว้าง 12 ตัวอักษร, %5d ชิดขวากว้าง 5 printf ไม่ขึ้นบรรทัดเองต้องใส่ %n ถ้าชนิดไม่ตรง specifier (เช่น %d กับ 2.5) จะเกิด IllegalFormatConversionException ตอนรัน String.format(...) คืนข้อความแทนการพิมพ์",
  language: "java",
  standard: "v3",
  prerequisites: ["java-declarations"],
  example: java`public class Main {
    public static void main(String[] args) {
        System.out.print("Loading");
        System.out.print("...");
        System.out.println(" done");
        System.out.printf("%-12s|%5s%n", "Title", "Days");
        System.out.printf("%-12s|%5d%n", "Clean Code", 14);
        System.out.printf("%-12s|%5d%n", "Java 21", 7);
        System.out.printf("ค่าปรับ %.2f บาท%n", 12.345);
        String line = String.format("%s มี %d เล่ม", "ชั้น A", 3);
        System.out.println(line);
    }
}`,
  expectedOutput: "Loading... done\nTitle       | Days\nClean Code  |   14\nJava 21     |    7\nค่าปรับ 12.35 บาท\nชั้น A มี 3 เล่ม",
  solutionCheck: { output: "Book          Days    Fine\nClean Code       3   15.00\nRefactoring     10   50.00\nTotal: 65.00" },
  tracePrompt: "System.out.printf(\"%5.1f|%-4d|%n\", 3.14159, 42) พิมพ์อะไร (นับช่องว่างด้วย)",
  traceAnswer: "%5.1f ปัดเป็น 3.1 แล้วชิดขวาในความกว้าง 5 ได้ \"  3.1\" ส่วน %-4d ได้ \"42  \" ชิดซ้ายกว้าง 4 ผลรวมคือ \"  3.1|42  |\" แล้วขึ้นบรรทัดใหม่",
  practicePrompt: "พิมพ์ใบเสร็จค่าปรับ: หัวตาราง Book กว้าง 14 ชิดซ้าย, Days กว้าง 4 ชิดขวา, Fine กว้าง 8 ชิดขวา ทศนิยม 2 ตำแหน่ง แล้วพิมพ์สองแถว: Clean Code 3 วัน 15.0 บาท และ Refactoring 10 วัน 50.0 บาท ปิดท้ายด้วยบรรทัด Total: 65.00 โดยใช้ printf ทั้งหมด",
  starter: java`public class Main {
    public static void main(String[] args) {
        // หัวตาราง: Book | Days | Fine
        // แถวข้อมูล 2 แถว
        // Total
    }
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        System.out.printf("%-14s%4s%8s%n", "Book", "Days", "Fine");
        System.out.printf("%-14s%4d%8.2f%n", "Clean Code", 3, 15.0);
        System.out.printf("%-14s%4d%8.2f%n", "Refactoring", 10, 50.0);
        System.out.printf("Total: %.2f%n", 15.0 + 50.0);
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        double fine = 15.0;
        System.out.printf("Fine: %d%n", fine);
    }
}`,
  bugCheck: {kind: "runtime", message: "IllegalFormatConversionException: d != java.lang.Double"},
  bugExplanation: "compile ผ่าน แต่ตอนรันได้ IllegalFormatConversionException: d != java.lang.Double เพราะ %d ใช้กับจำนวนเต็มเท่านั้น javac ไม่ได้ตรวจ format string ให้ แก้เป็น %.2f (หรือ %s ถ้าไม่สนรูปแบบ)",
  vocabulary: [v("println", "พิมพ์แล้วขึ้นบรรทัดใหม่"), v("print", "พิมพ์โดยไม่ขึ้นบรรทัดใหม่"), v("printf", "พิมพ์ตาม format string"), v("format specifier", "ตำแหน่งแทนค่าใน format เช่น %d %s %.2f"), v("%n", "ขึ้นบรรทัดใหม่ใน printf"), v("String.format", "สร้างข้อความตาม format โดยไม่พิมพ์")],
},
{
  id: "java-expressions",
  courseId,
  unit: "ค่าและนิพจน์",
  title: "literal, operator และลำดับการคำนวณ",
  objective: "คำนวณผลของ expression ที่มี + - * / % และวงเล็บได้ถูกต้อง รวมถึงการหารจำนวนเต็มและการต่อ String ด้วย +",
  why: "bug ที่พบบ่อยที่สุดของมือใหม่ Java คือ 7 / 2 ได้ 3 และ \"Total: \" + 1 + 2 ได้ \"Total: 12\" การทำนายผลของ expression ได้ก่อนรันคือทักษะพื้นฐานของการ debug",
  explanation: "literal คือค่าที่เขียนตรง ๆ: 42 (int), 3.5 (double), \"text\" (String), 'A' (char), true (boolean) operator * / % ทำก่อน + - และทำจากซ้ายไปขวาเมื่อระดับเท่ากัน วงเล็บบังคับลำดับได้ เมื่อทั้งสองฝั่งเป็นจำนวนเต็ม / ตัดเศษทิ้ง (7 / 2 คือ 3) และ % ให้เศษ (7 % 2 คือ 1) ถ้าฝั่งใดเป็น double ผลเป็น double (7 / 2.0 คือ 3.5) + กับ String คือการต่อข้อความ และทำจากซ้ายไปขวา: \"A\" + 1 + 2 ได้ \"A12\" แต่ 1 + 2 + \"A\" ได้ \"3A\" หารจำนวนเต็มด้วย 0 ได้ ArithmeticException ตอนรัน",
  language: "java",
  standard: "v3",
  prerequisites: ["java-output"],
  example: java`public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2);
        System.out.println(7 % 2);
        System.out.println(7 / 2.0);
        System.out.println(2 + 3 * 4);
        System.out.println((2 + 3) * 4);
        System.out.println("Total: " + 1 + 2);
        System.out.println("Total: " + (1 + 2));
        System.out.println(1 + 2 + " books");
        int days = 45;
        System.out.println(days / 7 + " สัปดาห์ " + days % 7 + " วัน");
    }
}`,
  expectedOutput: "3\n1\n3.5\n14\n20\nTotal: 12\nTotal: 3\n3 books\n6 สัปดาห์ 3 วัน",
  solutionCheck: { output: "2 วัน 120 นาที ค่าปรับ 10 บาท" },
  tracePrompt: "ทำนายผลทีละบรรทัด: System.out.println(10 - 4 / 3); System.out.println(\"x\" + 2 * 3); System.out.println(1 / 2 * 4.0);",
  traceAnswer: "10 - 4 / 3: หารก่อน 4 / 3 = 1 (ตัดเศษ) ได้ 9 · \"x\" + 2 * 3: คูณก่อนได้ 6 แล้วต่อข้อความ ได้ x6 · 1 / 2 * 4.0: ซ้ายไปขวา 1 / 2 = 0 (จำนวนเต็ม) แล้ว 0 * 4.0 = 0.0 พิมพ์ 0.0",
  practicePrompt: "ห้องสมุดคิดค่าปรับวันละ 5 บาทเมื่อคืนช้า มีตัวแปร int minutesLate = 3000 (นาที) ให้พิมพ์ (1) จำนวนวันเต็ม (2) จำนวนนาทีที่เหลือ (3) ค่าปรับ ถ้าคิดเฉพาะวันเต็ม รูปแบบ: 2 วัน 120 นาที ค่าปรับ 10 บาท ใช้ / และ % ห้ามเขียนตัวเลขผลลัพธ์ตรง ๆ",
  starter: java`public class Main {
    public static void main(String[] args) {
        int minutesLate = 3000;
        int minutesPerDay = 24 * 60;
        // คำนวณวันเต็ม นาทีที่เหลือ และค่าปรับ แล้วพิมพ์บรรทัดเดียว
    }
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        int minutesLate = 3000;
        int minutesPerDay = 24 * 60;
        int days = minutesLate / minutesPerDay;
        int restMinutes = minutesLate % minutesPerDay;
        int fine = days * 5;
        System.out.println(days + " วัน " + restMinutes + " นาที ค่าปรับ " + fine + " บาท");
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        int pages = 250;
        int pagesRead = 100;
        double percent = pagesRead / pages * 100;
        System.out.println("อ่านไปแล้ว " + percent + "%");
    }
}`,
  bugCheck: {kind: "logic", output: "อ่านไปแล้ว 0.0%"},
  bugExplanation: "พิมพ์ อ่านไปแล้ว 0.0% เพราะ pagesRead / pages เป็นการหารจำนวนเต็มได้ 0 ก่อนจะคูณ 100 และแปลงเป็น double ตอนเก็บ การประกาศ percent เป็น double ไม่ได้เปลี่ยนการคำนวณฝั่งขวา แก้โดยให้ฝั่งใดฝั่งหนึ่งเป็น double ก่อนหาร เช่น pagesRead * 100.0 / pages ได้ 40.0",
  vocabulary: [v("literal", "ค่าที่เขียนตรง ๆ ในโค้ด"), v("expression", "ส่วนของโค้ดที่คำนวณได้เป็นค่า"), v("operator precedence", "ลำดับว่า operator ใดทำก่อน"), v("integer division", "การหารจำนวนเต็มที่ตัดเศษทิ้ง"), v("%", "เศษจากการหาร"), v("string concatenation", "การต่อข้อความด้วย +")],
},
{
  id: "java-variables",
  courseId,
  unit: "ค่าและนิพจน์",
  title: "ตัวแปร: ประกาศ กำหนดค่า เปลี่ยนค่า และ final",
  objective: "ประกาศตัวแปรพร้อมชนิด กำหนดและเปลี่ยนค่า ใช้ += ++ ได้ถูกต้อง ใช้ final กับค่าที่ไม่ควรเปลี่ยน และรู้ว่า var อนุมานชนิดได้แต่ชนิดยังคงที่",
  why: "ตัวแปรคือสิ่งที่โปรแกรมจำไว้ระหว่างทำงาน Java บังคับชนิดตั้งแต่ประกาศ ทำให้ compiler จับ bug ได้ก่อนรัน แต่ต้องเข้าใจกติกา เช่นใช้ตัวแปรก่อนกำหนดค่าไม่ได้",
  explanation: "ประกาศด้วย ชนิด ชื่อ = ค่า; เช่น int copies = 3; หลังประกาศเปลี่ยนค่าได้ด้วย = แต่เปลี่ยนชนิดไม่ได้ ตัวแปรภายใน method ต้องกำหนดค่าก่อนอ่าน (ไม่งั้น compile error “might not have been initialized”) shorthand: กับตัวแปร int ในบทนี้ x += 2 ให้ผลเหมือน x = x + 2 และ x++ เพิ่ม 1 (ในภาษาจริง += ยังแปลงชนิดกลับให้อัตโนมัติด้วย เช่นกับ short จึงไม่ใช่การเขียนแทนกันแบบตรงตัวทุกกรณี) final ทำให้กำหนดค่าได้ครั้งเดียว (ใช้กับค่าคงที่ ตั้งชื่อแบบ UPPER_SNAKE_CASE) var (Java 10+) ให้ compiler อนุมานชนิดจากค่าเริ่มต้น var count = 3; คือ int ตลอดไป ไม่ใช่ตัวแปรไร้ชนิด ชื่อตัวแปรใช้ camelCase และสื่อความหมาย",
  language: "java",
  standard: "v3",
  prerequisites: ["java-expressions"],
  example: java`public class Main {
    public static void main(String[] args) {
        final int MAX_LOANS = 3;
        int loans = 0;
        loans++;
        loans += 1;
        System.out.println("ยืมอยู่ " + loans + "/" + MAX_LOANS);
        var title = "Clean Code";
        title = title + " (2nd)";
        System.out.println(title);
        int left = MAX_LOANS - loans;
        System.out.println("ยืมเพิ่มได้ " + left);
        loans = loans + left;
        System.out.println("ยืมอยู่ " + loans + "/" + MAX_LOANS);
    }
}`,
  expectedOutput: "ยืมอยู่ 2/3\nClean Code (2nd)\nยืมเพิ่มได้ 1\nยืมอยู่ 3/3",
  solutionCheck: { output: "stock: 15/20\nspace: 5" },
  tracePrompt: "ไล่ค่าทีละบรรทัด: int a = 5; int b = a; a = a * 2; b += a; a--; แล้วพิมพ์ a และ b",
  traceAnswer: "a=5 → b=5 (คัดลอกค่า ไม่ได้ผูกกัน) → a=10 → b=5+10=15 → a=9 ได้ a=9, b=15 การเปลี่ยน a หลังจากนั้นไม่กระทบ b",
  practicePrompt: "เขียนโปรแกรมนับสต็อกหนังสือ: ประกาศค่าคงที่ final int SHELF_CAPACITY = 20 ตัวแปร stock เริ่มที่ 12 จากนั้นรับเข้า 5 เล่ม (ใช้ +=) ยืมออก 3 เล่ม (ใช้ -=) และคืน 1 เล่ม (ใช้ ++) แล้วพิมพ์ stock: 15/20 และ space: 5",
  starter: java`public class Main {
    public static void main(String[] args) {
        // ค่าคงที่ความจุชั้น
        // stock เริ่มต้น
        // รับเข้า ยืมออก คืน
        // พิมพ์สองบรรทัด
    }
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        final int SHELF_CAPACITY = 20;
        int stock = 12;
        stock += 5;
        stock -= 3;
        stock++;
        System.out.println("stock: " + stock + "/" + SHELF_CAPACITY);
        System.out.println("space: " + (SHELF_CAPACITY - stock));
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        final int MAX_LOANS = 3;
        int fine;
        MAX_LOANS = 5;
        System.out.println(fine + MAX_LOANS);
    }
}`,
  bugCheck: {kind: "compile", message: "cannot assign a value to final variable MAX_LOANS"},
  bugExplanation: "compile error สองจุด: กำหนดค่าใหม่ให้ final (“cannot assign a value to final variable MAX_LOANS”) และอ่าน fine ก่อนกำหนดค่า (“variable fine might not have been initialized”) แก้โดยไม่เปลี่ยนค่าคงที่ (ถ้าต้องเปลี่ยนจริงให้เลิกใช้ final) และกำหนด int fine = 0; ก่อนใช้",
  vocabulary: [v("variable", "ชื่อที่ผูกกับที่เก็บค่า"), v("declaration", "การประกาศชนิดและชื่อ"), v("assignment", "การกำหนดค่าด้วย ="), v("final", "กำหนดค่าได้ครั้งเดียว"), v("var", "ให้ compiler อนุมานชนิดจากค่าเริ่มต้น"), v("camelCase", "รูปแบบชื่อ เช่น maxLoans")],
},
{
  id: "java-primitives",
  courseId,
  unit: "ชนิดข้อมูล",
  title: "primitive types: int, long, double, boolean, char และช่วงค่า",
  objective: "เลือก primitive type ให้เหมาะกับข้อมูล อธิบาย overflow ของ int และความคลาดเคลื่อนของ double ได้ และรู้ว่าเมื่อไรควรใช้ long หรือ BigDecimal",
  why: "ค่าที่เกินช่วงของ int ไม่ error แต่กลายเป็นเลขติดลบเงียบ ๆ และ 0.1 + 0.2 ไม่เท่ากับ 0.3 พอดี bug แบบนี้หายากเพราะโปรแกรมไม่ล่ม",
  explanation: "Java มี primitive 8 ชนิด ที่ใช้บ่อย: int (จำนวนเต็ม 32 bit ประมาณ ±2.1 พันล้าน), long (64 bit ใส่ L ท้าย literal เช่น 3_000_000_000L), double (ทศนิยม 64 bit), boolean (true/false), char (ตัวอักษรหนึ่งหน่วย UTF-16 ใน ' ') เกินช่วงของ int จะ overflow วนไปฝั่งลบโดยไม่มี error Math.addExact(a, b) โยน ArithmeticException แทนการวนเงียบ ๆ ถ้าต้องการให้รู้ตัว (การจับ exception อยู่ในบท java-exceptions-basic) double เก็บทศนิยมฐานสองจึงแทน 0.1 ได้ไม่พอดี เงินที่ต้องแม่นยำใช้หน่วยเล็กสุดเป็น long (สตางค์) หรือ BigDecimal ใช้ _ คั่นตัวเลขยาวให้อ่านง่ายได้ (1_000_000) ค่าสูงสุดดูได้จาก Integer.MAX_VALUE",
  language: "java",
  standard: "v3",
  prerequisites: ["java-variables"],
  example: java`public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE);
        int big = Integer.MAX_VALUE;
        big = big + 1;
        System.out.println(big);
        long visitors = 3_000_000_000L;
        System.out.println(visitors);
        System.out.println(0.1 + 0.2);
        long satang = 10 + 20;
        System.out.println(satang / 100.0 + " บาท");
        char grade = 'A';
        boolean member = true;
        System.out.println(grade + " " + member);
    }
}`,
  expectedOutput: "2147483647\n-2147483648\n3000000000\n0.30000000000000004\n0.3 บาท\nA true",
  solutionCheck: { output: "2500000001\n60.60 บาท" },
  tracePrompt: "int ms = 30 * 24 * 60 * 60 * 1000; คำนวณมิลลิวินาทีใน 30 วัน ผลถูกไหม และแก้ด้วยการเปลี่ยนเป็น long ms = 30 * 24 * 60 * 60 * 1000; ได้ไหม",
  traceAnswer: "ค่าจริงคือ 2,592,000,000 ซึ่งเกิน int จึง overflow ได้ค่าติดลบ (-1702967296) การเปลี่ยนชนิดตัวแปรฝั่งซ้ายเป็น long ไม่พอ เพราะฝั่งขวายังคูณแบบ int และ overflow ก่อนเก็บ ต้องให้ตัวแรกเป็น long: 30L * 24 * 60 * 60 * 1000",
  practicePrompt: "ระบบห้องสมุดนับยอดยืมสะสม 2,500,000,000 ครั้ง และคิดค่าปรับเป็นสตางค์ ให้: (1) เก็บยอดยืมในชนิดที่เหมาะและพิมพ์ยอด +1 ให้ถูก (2) ค่าปรับ 3 รายการคือ 10.10, 20.20, 30.30 บาท เก็บเป็นสตางค์ (long) รวมแล้วพิมพ์ 60.60 บาท ด้วย printf %.2f จากการหาร 100.0 ตอนแสดงผลเท่านั้น",
  starter: java`public class Main {
    public static void main(String[] args) {
        // ยอดยืมสะสม 2,500,000,000 แล้วเพิ่ม 1
        // ค่าปรับเป็นสตางค์ 3 รายการ แล้วพิมพ์ผลรวมเป็นบาท
    }
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        long totalLoans = 2_500_000_000L;
        totalLoans++;
        System.out.println(totalLoans);
        long fine1 = 1010;
        long fine2 = 2020;
        long fine3 = 3030;
        long totalSatang = fine1 + fine2 + fine3;
        System.out.printf("%.2f บาท%n", totalSatang / 100.0);
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        double balance = 0.0;
        balance = balance + 0.1;
        balance = balance + 0.2;
        System.out.println("ยอดไม่ตรง: " + balance);
    }
}`,
  bugCheck: {kind: "logic", output: "ยอดไม่ตรง: 0.30000000000000004"},
  bugExplanation: "คาดยอด0.3 แต่ actual ยอดไม่ตรง: 0.30000000000000004 เพราะ double แทน0.1และ0.2ในฐานสองไม่พอดี แก้สำหรับเงินโดยเก็บจำนวนเต็มหน่วยสตางค์ เช่น long totalSatang = 10 + 20; แล้วพิมพ์ totalSatang / 100.0 ได้0.3; อย่าแค่ปัดข้อความแล้วอ้างว่าค่าภายในแม่นยำ",
  vocabulary: [v("primitive type", "ชนิดพื้นฐาน 8 ชนิดที่เก็บค่าโดยตรง"), v("int / long", "จำนวนเต็ม 32 / 64 bit"), v("double", "ทศนิยมฐานสอง 64 bit มีความคลาดเคลื่อน"), v("overflow", "ค่าเกินช่วงแล้ววนไปอีกฝั่งโดยไม่มี error"), v("char", "ตัวอักษรหนึ่งหน่วยใน ' '"), v("BigDecimal", "ชนิดทศนิยมฐานสิบที่แม่นยำ เหมาะกับเงิน")],
},
{
  id: "java-string",
  courseId,
  unit: "ชนิดข้อมูล",
  title: "String: methods, equals และ immutability",
  objective: "ใช้ methods ที่พบบ่อยของ String (length, strip, toUpperCase, contains, substring, indexOf, isBlank) เทียบข้อความด้วย equals/equalsIgnoreCase และอธิบายว่า String เปลี่ยนค่าไม่ได้",
  why: "input จากผู้ใช้ทุกชิ้นเข้ามาเป็นข้อความ การเทียบ String ด้วย == เป็น bug คลาสสิกที่บางครั้งดูเหมือนทำงานได้ และการลืมว่า method ของ String คืนค่าใหม่ทำให้การแก้ข้อความหายไปเงียบ ๆ",
  explanation: "String เป็น object ไม่ใช่ primitive method อย่าง strip/toUpperCase ไม่แก้ตัวเดิม (immutable) แต่คืนผลออกมา (อาจเป็น object เดิมถ้าไม่มีอะไรเปลี่ยน): name.strip(); เฉย ๆ ไม่มีผล ต้องเขียน name = name.strip(); เทียบเนื้อหาด้วย a.equals(b) หรือ equalsIgnoreCase เพราะ == เทียบว่าเป็น object เดียวกันไหม (literal ที่เหมือนกันอาจถูกใช้ร่วมกันจนทำให้ == ดูเหมือนถูกในบางกรณี แต่ข้อความจาก input หรือการต่อข้อความตอนรันมักเป็นคนละ object) index เริ่มที่ 0, substring(begin, end) ไม่รวม end, indexOf คืน -1 เมื่อไม่พบ, strip() ตัดช่องว่างแบบ Unicode (Java 11+) isBlank() ว่างหรือมีแต่ช่องว่าง",
  language: "java",
  standard: "v3",
  prerequisites: ["java-primitives"],
  example: java`public class Main {
    public static void main(String[] args) {
        String raw = "  Clean Code  ";
        raw.strip();
        System.out.println("[" + raw + "]");
        String title = raw.strip();
        System.out.println("[" + title + "] " + title.length());
        System.out.println(title.toUpperCase() + " " + title.contains("Code"));
        System.out.println(title.substring(0, 5) + "|" + title.indexOf("Code") + "|" + title.indexOf("Java"));
        String typed = new String("clean code");
        System.out.println((typed == "clean code") + " " + typed.equals("clean code") + " " + typed.equalsIgnoreCase(title));
        System.out.println("a,b,c".indexOf(","));
        System.out.println("   ".isBlank() + " " + "".isEmpty());
    }
}`,
  expectedOutput: "[  Clean Code  ]\n[Clean Code] 10\nCLEAN CODE true\nClean|6|-1\nfalse true true\n1\ntrue true",
  solutionCheck: { output: "command=borrow id=B001\nvalid=true" },
  tracePrompt: "String s = \"Library\"; s.toLowerCase(); String t = s.substring(3); พิมพ์ s + \" \" + t + \" \" + t.charAt(0) ได้อะไร",
  traceAnswer: "s.toLowerCase(); คืนค่าใหม่ที่ไม่มีใครเก็บ s จึงยังเป็น Library substring(3) ตัดตั้งแต่ index 3 ได้ rary และ charAt(0) ของ t คือ r ผลคือ Library rary r",
  practicePrompt: "มีบรรทัดคำสั่ง String line = \"  BORROW  b001 \" ให้ตัดช่องว่างรอบนอก ใช้indexOfหาช่องว่างแรกหลังstrip แล้วsubstringแยกคำสั่งและรหัส ตัดช่องว่างรอบรหัสด้วยstrip (โจทย์รับสองส่วนนี้แน่นอน) แปลงคำสั่งเป็นตัวพิมพ์เล็กและรหัสเป็นตัวพิมพ์ใหญ่ แล้วพิมพ์ command=borrow id=B001 และพิมพ์ valid=true ถ้าคำสั่งเท่ากับ borrow (ใช้ equals)",
  starter: java`public class Main {
    public static void main(String[] args) {
        String line = "  BORROW  b001 ";
        // ตัดช่องว่าง แยกคำ แปลงตัวพิมพ์ แล้วพิมพ์สองบรรทัด
    }
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        String line = "  BORROW  b001 ";
        String cleaned = line.strip();
        int space = cleaned.indexOf(" ");
        String command = cleaned.substring(0, space).toLowerCase();
        String id = cleaned.substring(space + 1).strip().toUpperCase();
        System.out.println("command=" + command + " id=" + id);
        System.out.println("valid=" + command.equals("borrow"));
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        String command = "help";
        command.toUpperCase();
        System.out.println(command.equals("HELP"));
    }
}`,
  bugCheck: {kind: "logic", output: "false"},
  bugExplanation: "คาด true แต่ actual false เพราะ command.toUpperCase() คืนข้อความใหม่แต่ไม่ได้เก็บ จึงยังเป็น help แก้ด้วย String upper = command.toUpperCase(); แล้ว upper.equals(\"HELP\") ได้true หรือใช้ equalsIgnoreCase หากต้องการเทียบโดยไม่สนตัวพิมพ์",
  vocabulary: [v("immutable", "สร้างแล้วเปลี่ยนค่าไม่ได้ method คืนค่าใหม่"), v("equals", "เทียบเนื้อหาของ object"), v("==", "กับ object คือเทียบว่าเป็นตัวเดียวกัน"), v("index", "ตำแหน่งเริ่มที่ 0"), v("substring", "ตัดข้อความจาก begin ถึงก่อน end"), v("indexOf", "หาตำแหน่งข้อความแรก หรือ -1 เมื่อไม่พบ")],
},
{
  id: "java-casting",
  courseId,
  unit: "ชนิดข้อมูล",
  title: "type conversion: widening, casting และ parse ข้อความเป็นตัวเลข",
  objective: "อธิบายว่าเมื่อไร Java แปลงชนิดให้อัตโนมัติ (widening/promotion) เมื่อไรต้อง cast เอง และผลของการ cast (ตัดเศษ, overflow) รวมถึงแปลง String เป็นตัวเลขด้วย Integer.parseInt/Double.parseDouble และ Math.round",
  why: "การแปลง double เป็น int แบบไม่คิดทำให้ 2.99 กลายเป็น 2 และข้อความ \"12a\" ทำให้โปรแกรมล่มด้วย NumberFormatException การรู้กติกาช่วยเลือกระหว่างตัดเศษ ปัดเศษ หรือแจ้งผู้ใช้",
  explanation: "widening: แปลงจากชนิดแคบไปกว้างอัตโนมัติ (int → long → double) ส่วนใหญ่ไม่เสียค่า แต่ long → double อาจปัดเศษเมื่อเลขเกิน 2^53 (เช่น 9007199254740993L กลายเป็น 9007199254740992.0) และใน expression ที่ผสมชนิด ค่าจะถูก promote เป็นชนิดที่กว้างกว่า (int + double = double; byte/short/char ถูก promote เป็น int) narrowing: กว้างไปแคบต้อง cast เอง (int) 2.99 ได้ 2 (ตัดเศษไปทาง 0 ไม่ใช่ปัด) cast ค่าที่เกินช่วง (int) 3_000_000_000L ได้เลขผิด ถ้าต้องการปัดใช้ Math.round (คืน long สำหรับ double) แปลงข้อความ: Integer.parseInt(\"42\") (ห้ามมีช่องว่างแม้รอบนอก), Double.parseDouble(\"2.5\") (ยอมรับช่องว่างรอบนอก) — คอร์สนี้ strip() ก่อน parse เสมอเพื่อให้กติกาเดียวกัน ข้อความที่ไม่ใช่ตัวเลขทำให้เกิด NumberFormatException ตอนรัน (จะจัดการในบท java-exceptions-basic) แปลงตัวเลขเป็นข้อความด้วย String.valueOf(x) char กับ int แปลงกันได้: (char) ('A' + 1) คือ 'B'",
  language: "java",
  standard: "v3",
  prerequisites: ["java-string"],
  example: java`public class Main {
    public static void main(String[] args) {
        int pages = 250;
        double avg = pages / 3;
        double avg2 = pages / 3.0;
        System.out.println(avg + " " + avg2);
        System.out.println((int) 2.99 + " " + (int) -2.99 + " " + Math.round(2.5) + " " + Math.round(2.4));
        long huge = 3_000_000_000L;
        System.out.println((int) huge);
        int copies = Integer.parseInt("42");
        double rating = Double.parseDouble("4.5");
        System.out.println(copies + 1 + " " + rating * 2);
        System.out.println((char) ('A' + 2) + " " + (int) 'A');
        String text = String.valueOf(copies) + "7";
        System.out.println(text);
    }
}`,
  expectedOutput: "83.0 83.33333333333333\n2 -2 3 2\n-1294967296\n43 9.0\nC 65\n427",
  solutionCheck: { output: "4.25\n4\n4" },
  tracePrompt: "double price = 19.99; int baht = (int) price; long rounded = Math.round(price); int total = (int) (price * 3); ทำนาย baht, rounded และ total",
  traceAnswer: "(int) 19.99 ตัดเศษได้ 19 · Math.round(19.99) ได้ 20 · price * 3 = 59.97 (ประมาณ) แล้ว cast ได้ 59 ถ้าเขียน (int) price * 3 จะ cast ก่อนคูณได้ 57 วงเล็บจึงสำคัญ",
  practicePrompt: "ค่าเฉลี่ยคะแนนรีวิวหนังสือ: คะแนนเป็นข้อความ \"4\", \"5\", \"3\", \"5\" (ตัวแปร String สี่ตัว) แปลงเป็น int รวมกัน แล้วพิมพ์ (1) ค่าเฉลี่ยแบบทศนิยม 2 ตำแหน่ง (printf) (2) ค่าเฉลี่ยปัดเป็นจำนวนเต็มด้วย Math.round (3) จำนวนดาวเต็ม (cast ตัดเศษ) ผลต้องเป็น 4.25 / 4 / 4",
  starter: java`public class Main {
    public static void main(String[] args) {
        String r1 = "4", r2 = "5", r3 = "3", r4 = "5";
        // แปลงเป็น int รวม แล้วหาค่าเฉลี่ยแบบ double
        // พิมพ์สามบรรทัด
    }
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        String r1 = "4", r2 = "5", r3 = "3", r4 = "5";
        int sum = Integer.parseInt(r1) + Integer.parseInt(r2) + Integer.parseInt(r3) + Integer.parseInt(r4);
        double average = sum / 4.0;
        System.out.printf("%.2f%n", average);
        System.out.println(Math.round(average));
        System.out.println((int) average);
    }
}`,
  buggy: java`public class Main {
    public static void main(String[] args) {
        String a = "4";
        String b = "5";
        int sum = Integer.parseInt(a + b);
        double average = sum / 2;
        System.out.println(average);
    }
}`,
  bugCheck: {kind: "logic", output: "22.0"},
  bugExplanation: "พิมพ์ 22.0 แทน 4.5 มีสองจุด: a + b ต่อข้อความเป็น \"45\" ก่อนแปลง (ต้อง parse ทีละตัวแล้วค่อยบวก) และ sum / 2 เป็นการหารจำนวนเต็มก่อนเก็บเป็น double แก้เป็น int sum = Integer.parseInt(a) + Integer.parseInt(b); double average = sum / 2.0;",
  vocabulary: [v("widening", "แปลงจากชนิดแคบไปกว้างโดยอัตโนมัติ"), v("cast", "บังคับแปลงชนิด เช่น (int) x"), v("narrowing", "แปลงจากกว้างไปแคบ อาจเสียข้อมูล"), v("promotion", "ค่าใน expression ถูกแปลงเป็นชนิดที่กว้างกว่า"), v("parseInt", "แปลงข้อความเป็น int"), v("Math.round", "ปัดเป็นจำนวนเต็มที่ใกล้ที่สุด")],
},
{
  id: "java-scanner",
  courseId,
  unit: "Input และเงื่อนไข",
  title: "Scanner: อ่าน input ทีละบรรทัดอย่างปลอดภัย",
  objective: "อ่าน input จาก System.in ด้วย Scanner แบบทีละบรรทัด (nextLine) แล้วแปลงเป็นตัวเลขเอง อธิบายกับดักของ nextInt ตามด้วย nextLine และทดสอบโปรแกรมด้วยการส่ง input ผ่าน pipe",
  why: "โปรแกรม CLI ทุกตัวต้องรับ input จากผู้ใช้ กับดักเรื่องบรรทัดค้างทำให้โปรแกรม “ข้าม” คำถามไปเฉย ๆ และ input ที่ไม่ตรงชนิดทำให้โปรแกรมล่ม การวางแนวทางอ่านทีละบรรทัดตั้งแต่แรกช่วยให้ควบคุมได้ทุกกรณี",
  explanation: "Scanner scanner = new Scanner(System.in); (import java.util.Scanner;) scanner.nextLine() อ่านจนจบบรรทัดและคืนข้อความโดยไม่รวมตัวขึ้นบรรทัด nextInt() อ่านเฉพาะตัวเลขแล้วทิ้งตัวขึ้นบรรทัดไว้ nextLine() ถัดไปจึงได้ข้อความว่างทันที — วิธีที่คาดเดาได้กว่าคือใช้ nextLine() เสมอแล้วแปลงเอง Integer.parseInt(line.strip()) hasNextLine() บอกว่ายังมีบรรทัดให้อ่านไหม (false เมื่อ input จบ เช่น ปลายไฟล์ที่ pipe เข้ามา) การทดสอบโดยไม่ต้องพิมพ์เอง: เก็บ input ไว้ในไฟล์ input.txt แล้วป้อนเข้าโปรแกรม โดย PowerShell ใช้ Get-Content input.txt | java Main.java ส่วน Bash/WSL ใช้ java Main.java < input.txt (สองแบบนี้เป็นคนละ shell ห้ามปนกัน) ใช้ Scanner ตัวเดียวทั้งโปรแกรม (สร้างหลายตัวบน System.in แล้วข้อมูลที่ตัวแรกอ่านล่วงหน้าไว้อาจหาย)",
  language: "java",
  standard: "v3",
  prerequisites: ["java-casting"],
  example: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("ชื่อ: ");
        String name = scanner.nextLine().strip();
        System.out.print("จำนวนเล่ม: ");
        int books = Integer.parseInt(scanner.nextLine().strip());
        System.out.println();
        System.out.println(name + " ยืม " + books + " เล่ม ครบกำหนดใน " + books * 7 + " วัน");
        System.out.println("ยังมีบรรทัดอีกไหม: " + scanner.hasNextLine());
    }
}`,
  stdin: "  Sea \n3\n",
  expectedOutput: "ชื่อ: จำนวนเล่ม: \nSea ยืม 3 เล่ม ครบกำหนดใน 21 วัน\nยังมีบรรทัดอีกไหม: false",
  tracePrompt: "ถ้าโปรแกรมใช้ int age = scanner.nextInt(); แล้วตามด้วย String name = scanner.nextLine(); และผู้ใช้พิมพ์ 20 ⏎ Sea ⏎ ตัวแปร name จะได้อะไร เพราะอะไร",
  traceAnswer: "name ได้ข้อความว่าง \"\" เพราะ nextInt อ่านแค่ 20 แล้วทิ้งตัวขึ้นบรรทัดไว้ nextLine จึงอ่าน “ส่วนที่เหลือของบรรทัดแรก” ซึ่งว่าง ส่วน Sea ยังรออยู่ แก้โดยอ่านทุกอย่างด้วย nextLine แล้ว parse เอง",
  practicePrompt: "เขียนโปรแกรมรับ input สามบรรทัด: ชื่อหนังสือ, จำนวนวันที่ยืม, ค่าปรับต่อวัน (บาท ทศนิยมได้) แล้วพิมพ์บรรทัดเดียว เช่นเมื่อ input เป็น Clean Code / 3 / 2.5 ต้องพิมพ์ Clean Code: 3 วัน ค่าปรับ 7.50 บาท ใช้ nextLine ทุกครั้ง ตัดช่องว่างรอบนอก และทดสอบด้วยการ pipe input (ไม่พิมพ์คำถามเพื่อให้ผลตรวจง่าย)",
  starter: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // อ่านชื่อหนังสือ จำนวนวัน และค่าปรับต่อวัน (ทีละบรรทัด)
        // พิมพ์ผลบรรทัดเดียว
    }
}`,
  solution: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String title = scanner.nextLine().strip();
        int days = Integer.parseInt(scanner.nextLine().strip());
        double finePerDay = Double.parseDouble(scanner.nextLine().strip());
        System.out.printf("%s: %d วัน ค่าปรับ %.2f บาท%n", title, days, days * finePerDay);
    }
}`,
  solutionCheck: { stdin: "Clean Code\n 3 \n2.5\n", output: "Clean Code: 3 วัน ค่าปรับ 7.50 บาท" },
  buggy: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int days = scanner.nextInt();
        String title = scanner.nextLine();
        System.out.println("[" + title + "] " + days + " วัน");
    }
}`,
  bugCheck: {kind: "logic", stdin: "3\nClean Code\n", output: "[] 3 วัน"},
  bugExplanation: "เมื่อ input เป็น 3 ⏎ Clean Code ⏎ โปรแกรมพิมพ์ [] 3 วัน เพราะ nextInt ทิ้งตัวขึ้นบรรทัดไว้ nextLine จึงได้ข้อความว่าง compile ผ่านและไม่ล่ม เป็น logic bug แก้โดยอ่านด้วย nextLine ทั้งคู่: int days = Integer.parseInt(scanner.nextLine().strip()); String title = scanner.nextLine().strip();",
  vocabulary: [v("Scanner", "class สำหรับอ่าน input แบบแยกคำ/บรรทัด"), v("System.in", "standard input ของโปรแกรม"), v("nextLine", "อ่านจนจบบรรทัด ไม่รวมตัวขึ้นบรรทัด"), v("nextInt", "อ่านตัวเลขหนึ่งตัว ทิ้งตัวขึ้นบรรทัดไว้"), v("hasNextLine", "ยังมีบรรทัดให้อ่านไหม"), v("pipe", "ส่ง output ของคำสั่งหนึ่งเป็น input ของอีกคำสั่ง (|)")],
},
{
  id: "java-branch",
  courseId,
  unit: "Input และเงื่อนไข",
  title: "boolean, การเปรียบเทียบ และ if / else if / else",
  objective: "เขียนเงื่อนไขด้วย == != < > <= >= && || ! จัดลำดับกิ่ง if/else if ให้ถูก (เงื่อนไขเฉพาะก่อนทั่วไป) และใช้ short-circuit ป้องกัน error",
  why: "กติกาของระบบ เช่น “ยืมได้ไหม” คือชุดของเงื่อนไข ถ้าลำดับกิ่งผิด กรณีพิเศษจะถูกกรณีทั่วไปกลืนไปเงียบ ๆ และ bug แบบนี้ไม่มี error ให้เห็น",
  explanation: "if (เงื่อนไข) { ... } else if (...) { ... } else { ... } ทำกิ่งแรกที่จริงเพียงกิ่งเดียว เงื่อนไขต้องเป็น boolean (Java ไม่แปลงตัวเลขเป็น boolean ให้: if (count) compile ไม่ผ่าน) && (และ) || (หรือ) ! (ไม่) && และ || เป็น short-circuit: ถ้ารู้ผลจากฝั่งซ้ายแล้วจะไม่ประเมินฝั่งขวา จึงเขียน title != null && title.isBlank() ได้โดยไม่ล่ม เปรียบเทียบตัวเลขด้วย == ได้ แต่ String ต้องใช้ equals ใส่ { } ทุกครั้งแม้มีบรรทัดเดียว เพื่อกันการเพิ่มบรรทัดภายหลังแล้วหลุดจาก if ternary condition ? a : b ใช้เลือกค่าสั้น ๆ",
  language: "java",
  standard: "v3",
  prerequisites: ["java-scanner"],
  example: java`public class Main {
    public static void main(String[] args) {
        int loans = 2;
        int overdueDays = 0;
        boolean member = true;
        if (!member) {
            System.out.println("สมัครสมาชิกก่อน");
        } else if (overdueDays > 0) {
            System.out.println("คืนเล่มที่เลยกำหนดก่อน");
        } else if (loans >= 3) {
            System.out.println("ยืมครบโควตาแล้ว");
        } else {
            System.out.println("ยืมได้อีก " + (3 - loans) + " เล่ม");
        }
        String title = null;
        boolean blank = title == null || title.isBlank();
        System.out.println("ชื่อว่าง: " + blank);
        String label = loans == 1 ? "เล่ม" : "เล่ม (หลายเล่ม)";
        System.out.println(loans + " " + label);
    }
}`,
  expectedOutput: "ยืมได้อีก 1 เล่ม\nชื่อว่าง: true\n2 เล่ม (หลายเล่ม)",
  tracePrompt: "กำหนด int score = 85; โค้ด if (score >= 50) grade = \"C\"; else if (score >= 80) grade = \"A\"; else grade = \"F\"; ได้ grade อะไร และควรแก้อย่างไร",
  traceAnswer: "ได้ C เพราะ score >= 50 จริงก่อน กิ่ง >= 80 จึงไม่เคยถูกตรวจ ต้องเรียงจากเงื่อนไขที่เฉพาะกว่า (ช่วงสูงกว่า) ก่อน: >= 80 → A, >= 50 → C, ที่เหลือ → F",
  practicePrompt: "รับ input สองบรรทัด: อายุสมาชิก (ปี) และจำนวนวันที่คืนช้า แล้วพิมพ์ค่าปรับตามกติกา: คืนช้า 0 วัน → ไม่มีค่าปรับ; สมาชิกอายุต่ำกว่า 12 หรือ 60 ขึ้นไป → วันละ 2 บาท; คนอื่น → วันละ 5 บาท; ค่าปรับสูงสุด 100 บาท รูปแบบ: ค่าปรับ 15 บาท หรือ ไม่มีค่าปรับ (ทดสอบอย่างน้อย 4 กรณีรวม 70 ปี 40 วัน → ค่าปรับ 80 บาท และ 30 ปี 40 วัน → ค่าปรับ 100 บาท)",
  starter: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int age = Integer.parseInt(scanner.nextLine().strip());
        int lateDays = Integer.parseInt(scanner.nextLine().strip());
        // ตัดสินค่าปรับตามกติกา แล้วพิมพ์ผล
    }
}`,
  solution: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int age = Integer.parseInt(scanner.nextLine().strip());
        int lateDays = Integer.parseInt(scanner.nextLine().strip());
        if (lateDays <= 0) {
            System.out.println("ไม่มีค่าปรับ");
        } else {
            int perDay = (age < 12 || age >= 60) ? 2 : 5;
            int fine = Math.min(lateDays * perDay, 100);
            System.out.println("ค่าปรับ " + fine + " บาท");
        }
    }
}`,
  solutionCheck: { stdin: "70\n40\n", output: "ค่าปรับ 80 บาท" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        int lateDays = 0;
        String status = "ok";
        if (lateDays > 7)
            System.out.println("แจ้งเตือนแรง");
            status = "blocked";
        System.out.println(status);
    }
}`,
  bugCheck: {kind: "logic", output: "blocked"},
  bugExplanation: "พิมพ์ blocked ทั้งที่ไม่ได้คืนช้า เพราะไม่มี { } if ครอบแค่ statement ถัดไปบรรทัดเดียว (println) ส่วน status = \"blocked\" ทำงานเสมอ การย่อหน้าไม่ได้มีความหมายใน Java compile ผ่านเป็น logic bug แก้โดยใส่ { } ครอบทั้งสองบรรทัด",
  vocabulary: [v("boolean", "ค่า true/false"), v("comparison operator", "== != < > <= >= ให้ผลเป็น boolean"), v("&& / || / !", "และ / หรือ / ไม่"), v("short-circuit", "ไม่ประเมินฝั่งขวาเมื่อรู้ผลจากฝั่งซ้ายแล้ว"), v("else if", "กิ่งถัดไปที่ตรวจเมื่อกิ่งก่อนเป็นเท็จ"), v("ternary", "condition ? a : b เลือกค่า")],
},
{
  id: "java-loops",
  courseId,
  unit: "การทำซ้ำและเมนูคำสั่ง",
  title: "for, while, break/continue และเงื่อนไขหยุด",
  objective: "เลือกใช้ for (รู้จำนวนรอบ) หรือ while (หยุดตามเงื่อนไข) เขียนตัวสะสม (accumulator) ใช้ break/continue อย่างมีเหตุผล และตรวจ loop ด้วยการไล่ค่าตัวแปรทีละรอบเพื่อป้องกัน off-by-one และ loop ไม่รู้จบ",
  why: "งานจริงส่วนใหญ่คือทำสิ่งเดียวกันกับข้อมูลหลายชิ้น loop ที่หยุดผิดรอบหนึ่งรอบ (off-by-one) หรือไม่หยุดเลยเป็น bug ที่พบบ่อยมาก การไล่ค่าทีละรอบคือวิธีพิสูจน์ว่า loop ถูกก่อนรัน",
  explanation: "for (int day = 1; day <= 7; day++) { ... } มีสามส่วน: เริ่มต้น; เงื่อนไขที่ตรวจก่อนทุกรอบ; สิ่งที่ทำหลังทุกรอบ ตัวแปร day มีอยู่เฉพาะใน loop while (เงื่อนไข) { ... } ใช้เมื่อไม่รู้ล่วงหน้าว่ากี่รอบ ต้องมีบางอย่างใน loop ที่ทำให้เงื่อนไขเป็นเท็จในที่สุด do { ... } while (...); ทำอย่างน้อยหนึ่งรอบ break ออกจาก loop ทันที continue ข้ามไปรอบถัดไป ตัวสะสม: ประกาศนอก loop (int total = 0;) แล้วเพิ่มใน loop ขอบเขต: < n ทำ n รอบเมื่อเริ่มที่ 0 ส่วน <= n ทำ n รอบเมื่อเริ่มที่ 1",
  language: "java",
  standard: "v3",
  prerequisites: ["java-loop-sum"],
  example: java`public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int day = 1; day <= 5; day++) {
            total += day * 2;
        }
        System.out.println("ค่าปรับสะสม 5 วัน: " + total);

        int pages = 120;
        int days = 0;
        while (pages > 0) {
            pages -= 35;
            days++;
        }
        System.out.println("อ่านจบใน " + days + " วัน เหลือ " + pages);

        for (int shelf = 1; shelf <= 6; shelf++) {
            if (shelf % 2 == 0) {
                continue;
            }
            if (shelf > 4) {
                break;
            }
            System.out.print("ชั้น " + shelf + " ");
        }
        System.out.println();
    }
}`,
  expectedOutput: "ค่าปรับสะสม 5 วัน: 30\nอ่านจบใน 4 วัน เหลือ -20\nชั้น 1 ชั้น 3 ",
  tracePrompt: "ไล่ค่าทีละรอบของ while ในตัวอย่าง (pages, days หลังแต่ละรอบ) แล้วอธิบายว่าทำไม pages สุดท้ายเป็น -20 และถ้าเงื่อนไขเป็น pages != 0 จะเกิดอะไร",
  traceAnswer: "รอบ 1: 85, 1 · รอบ 2: 50, 2 · รอบ 3: 15, 3 · รอบ 4: -20, 4 แล้ว pages > 0 เป็นเท็จจึงหยุด pages ติดลบเพราะรอบสุดท้ายอ่านเกินที่เหลือ ถ้าใช้ pages != 0 จะไม่มีวันเท่ากับ 0 พอดี (85, 50, 15, -20, -55, ...) loop จึงไม่รู้จบ เงื่อนไขหยุดควรใช้ช่วง (> 0) ไม่ใช่ค่าตรงตัว",
  practicePrompt: "ค่าปรับคืนหนังสือช้าคิดแบบขั้นบันได: วันที่ 1–3 วันละ 2 บาท, วันที่ 4–7 วันละ 5 บาท, ตั้งแต่วันที่ 8 วันละ 10 บาท และค่าปรับรวมสูงสุด 150 บาท รับจำนวนวันที่คืนช้าหนึ่งบรรทัด ใช้ for ไล่ทีละวันสะสมค่าปรับ หยุดด้วย break ทันทีที่ถึงเพดาน แล้วพิมพ์ ค่าปรับ X บาท (คำนวณ Y วัน) โดย Y คือจำนวนวันที่ไล่จริงก่อนหยุด เช่น 9 วัน → ค่าปรับ 46 บาท (คำนวณ 9 วัน) และ 30 วัน → ค่าปรับ 150 บาท (คำนวณ 20 วัน)",
  starter: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int lateDays = Integer.parseInt(scanner.nextLine().strip());
        final int CAP = 150;
        int fine = 0;
        int counted = 0;
        // ไล่ทีละวัน: เลือกอัตราตามวันที่ สะสม และหยุดเมื่อถึงเพดาน
        System.out.println("ค่าปรับ " + fine + " บาท (คำนวณ " + counted + " วัน)");
    }
}`,
  solution: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int lateDays = Integer.parseInt(scanner.nextLine().strip());
        final int CAP = 150;
        int fine = 0;
        int counted = 0;
        for (int day = 1; day <= lateDays; day++) {
            int rate = day <= 3 ? 2 : day <= 7 ? 5 : 10;
            fine = Math.min(fine + rate, CAP);
            counted = day;
            if (fine == CAP) {
                break;
            }
        }
        System.out.println("ค่าปรับ " + fine + " บาท (คำนวณ " + counted + " วัน)");
    }
}`,
  solutionCheck: { stdin: "30\n", output: "ค่าปรับ 150 บาท (คำนวณ 20 วัน)" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        int[] fines = {10, 20, 30};
        int total = 0;
        for (int i = 0; i <= fines.length; i++) {
            total += fines[i];
        }
        System.out.println(total);
    }
}`,
  bugCheck: {kind: "runtime", message: "ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3"},
  bugExplanation: "compile ผ่าน แต่ตอนรันได้ ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3 เพราะ i <= fines.length ทำรอบที่ i = 3 ซึ่งไม่มีอยู่ (index สุดท้ายคือ length - 1) เป็น off-by-one แก้เป็น i < fines.length หรือใช้ for (int fine : fines)",
  vocabulary: [v("for loop", "loop ที่มีตัวนับ: เริ่มต้น; เงื่อนไข; ปรับค่า"), v("while loop", "ทำซ้ำตราบที่เงื่อนไขจริง"), v("accumulator", "ตัวแปรสะสมผลระหว่าง loop"), v("break / continue", "ออกจาก loop / ข้ามไปรอบถัดไป"), v("off-by-one", "ทำเกินหรือขาดไปหนึ่งรอบ"), v("infinite loop", "loop ที่เงื่อนไขไม่เคยเป็นเท็จ")],
},
{
  id: "java-switch",
  courseId,
  unit: "การทำซ้ำและเมนูคำสั่ง",
  title: "switch expression: เลือกตามค่าแบบไม่หลุดเคส",
  objective: "ใช้ switch แบบลูกศร (->) ทั้งแบบ statement และแบบ expression ที่คืนค่า รวมหลาย label ในเคสเดียว ใช้ default และ yield และอธิบายปัญหา fall-through ของ switch แบบเก่า",
  why: "เมนูคำสั่งของโปรแกรม CLI คือการเลือกตามค่าข้อความ if/else if ยาว ๆ อ่านยากและเขียน equals ผิดได้ง่าย switch แบบใหม่ (Java 14+) อ่านง่าย ไม่หลุดเคส และ compiler ช่วยเตือนเมื่อ switch expression ไม่ครบทุกกรณี",
  explanation: "switch (command) { case \"add\" -> ...; case \"list\", \"ls\" -> ...; default -> ...; } แต่ละเคสแบบ -> ทำแค่ฝั่งขวาของตัวเองแล้วจบ (ไม่ fall-through) switch ใช้กับ int, char, String และ enum ได้ ส่วน String ถูกเทียบด้วย equals ให้อัตโนมัติ switch expression คืนค่า: String label = switch (day) { case 6, 7 -> \"วันหยุด\"; default -> \"วันทำงาน\"; }; ต้องครอบคลุมทุกค่า (มักต้องมี default) ถ้าเคสต้องทำหลายบรรทัดใช้ { ... yield ค่า; } switch แบบเก่า (case \"add\": ... break;) จะไหลต่อไปเคสถัดไปถ้าลืม break ถ้าค่าที่ switch เป็น null และไม่มี case null (Java 21 เขียน case null -> ... ได้) จะเกิด NullPointerException",
  language: "java",
  standard: "v3",
  prerequisites: ["java-loops"],
  example: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String raw = scanner.nextLine().strip();
            String reply = switch (raw.toLowerCase()) {
                case "add" -> "เพิ่มหนังสือ";
                case "list", "ls" -> "แสดงรายการ";
                case "help" -> {
                    String commandsText = "add, list, quit";
                    yield "คำสั่ง: " + commandsText;
                }
                case "quit" -> "ลาก่อน";
                default -> "ไม่รู้จัก '" + raw + "'";
            };
            System.out.println(raw + " → " + reply);
        }

        int day = 6;
        switch (day) {
            case 6:
                System.out.println("old: เสาร์");
            case 7:
                System.out.println("old: อาทิตย์");
                break;
            default:
                System.out.println("old: วันทำงาน");
        }
    }
}`,
  stdin: "add\nLS\nhelp\nquit\nDance\n",
  expectedOutput: "add → เพิ่มหนังสือ\nLS → แสดงรายการ\nhelp → คำสั่ง: add, list, quit\nquit → ลาก่อน\nDance → ไม่รู้จัก 'Dance'\nold: เสาร์\nold: อาทิตย์",
  tracePrompt: "ใน switch แบบเก่าท้ายตัวอย่าง ถ้าเปลี่ยน day เป็น 7 จะพิมพ์อะไร และถ้าเป็น 3 จะพิมพ์อะไร ทำไม day = 6 จึงพิมพ์สองบรรทัด",
  traceAnswer: "day = 7 พิมพ์ old: อาทิตย์ แล้ว break ออก · day = 3 พิมพ์ old: วันทำงาน · day = 6 เข้า case 6 แต่ไม่มี break จึงไหล (fall-through) ไปทำ case 7 ต่อจนเจอ break — switch แบบ -> ไม่มีพฤติกรรมนี้",
  practicePrompt: "เขียนโปรแกรมอ่านคำสั่งทีละบรรทัดจนหมด input (while (scanner.hasNextLine())) แต่ละบรรทัดตัดช่องว่าง แล้วใช้ switch expression กับตัวพิมพ์เล็กของบรรทัดนั้นเพื่อเลือกข้อความ: add → ok: add, list หรือ ls → ok: list, quit → bye (แล้วหยุดอ่านทันที), บรรทัดว่าง → ข้ามโดยไม่พิมพ์อะไร, อื่น ๆ → unknown: <คำสั่งตามที่พิมพ์ (ตัดช่องว่างแล้ว ไม่แปลงตัวพิมพ์)> ตัวอย่าง input: add / LS / (ว่าง) / Jump / quit / add → พิมพ์ ok: add / ok: list / unknown: Jump / bye",
  starter: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String raw = scanner.nextLine().strip();
            String command = raw.toLowerCase();
            // ข้ามบรรทัดว่าง
            // เลือกข้อความด้วย switch expression แล้วพิมพ์
            // หยุดเมื่อเป็น quit
        }
    }
}`,
  solution: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String raw = scanner.nextLine().strip();
            String command = raw.toLowerCase();
            if (command.isEmpty()) {
                continue;
            }
            String reply = switch (command) {
                case "add" -> "ok: add";
                case "list", "ls" -> "ok: list";
                case "quit" -> "bye";
                default -> "unknown: " + raw;
            };
            System.out.println(reply);
            if (command.equals("quit")) {
                break;
            }
        }
    }
}`,
  solutionCheck: { stdin: "add\n LS \n\nJump\nquit\nadd\n", output: "ok: add\nok: list\nunknown: Jump\nbye" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        int day = 3;
        String kind = switch (day) {
            case 6, 7 -> "วันหยุด";
            case 1, 2, 3, 4, 5 -> "วันทำงาน";
        };
        System.out.println(kind);
    }
}`,
  bugCheck: {kind: "compile", message: "the switch expression does not cover all possible input values"},
  bugExplanation: "compile error: “the switch expression does not cover all possible input values” switch expression ต้องคืนค่าได้ทุกกรณี แต่ int มีค่าอื่นนอกจาก 1–7 (เช่น 0 หรือ 99) เพิ่ม default -> \"วันไม่ถูกต้อง\" หรือ default -> throw new IllegalArgumentException(\"day: \" + day); ถ้าค่าที่ไม่ถูกต้องควรถือว่าเป็นความผิดพลาด",
  vocabulary: [v("switch expression", "switch ที่คืนค่าได้"), v("arrow case (->)", "เคสที่ทำแค่ฝั่งขวาแล้วจบ ไม่ไหลต่อ"), v("fall-through", "การไหลไปทำเคสถัดไปเมื่อไม่มี break ใน switch แบบเก่า"), v("yield", "คืนค่าจากเคสแบบ block ใน switch expression"), v("default", "เคสสำหรับค่าที่ไม่ตรงเคสใด"), v("exhaustive", "ครอบคลุมทุกค่าที่เป็นไปได้")],
},
{
  id: "java-methods",
  courseId,
  unit: "Methods และ collections",
  title: "static methods: parameters, return และ scope",
  objective: "แยกงานเป็น static method ที่มีชื่อสื่อความหมาย รับ parameter และ return ค่าที่มีชนิดชัดเจน อธิบาย scope ของตัวแปร และพฤติกรรม pass-by-value ของ Java",
  why: "main ที่ยาวร้อยบรรทัดอ่านและทดสอบยาก method ทำให้ตั้งชื่อให้แต่ละขั้น เรียกซ้ำได้ และทดสอบทีละชิ้นได้ เป็นพื้นฐานของการออกแบบ class ในคอร์ส OOP",
  explanation: "static int fineFor(int lateDays) { return lateDays * 5; } ประกอบด้วย ชนิดที่คืน (int หรือ void ถ้าไม่คืน), ชื่อ (camelCase เป็นคำกริยา/คำนามที่สื่อผล), parameter พร้อมชนิด ทุกเส้นทางของ method ที่ไม่ใช่ void ต้อง return ค่า (ไม่งั้น compile error “missing return statement”) ตัวแปรที่ประกาศใน method มีอยู่เฉพาะใน method นั้น (scope) method อื่นมองไม่เห็น Java ส่งค่าแบบ pass-by-value: method ได้สำเนาของค่า การกำหนดค่าใหม่ให้ parameter ไม่กระทบตัวแปรของผู้เรียก overloading: method ชื่อเดียวกันได้ถ้าชนิด/จำนวน parameter ต่างกัน ในบทนี้ทุก method เป็น static เพราะยังไม่ได้สร้าง object",
  language: "java",
  standard: "v3",
  prerequisites: ["java-method-basics"],
  example: java`public class Main {
    static int fineFor(int lateDays) {
        if (lateDays <= 0) {
            return 0;
        }
        return Math.min(lateDays * 5, 100);
    }

    static String describe(String title, int lateDays) {
        return title + ": " + fineFor(lateDays) + " บาท";
    }

    static String describe(String title) {
        return describe(title, 0);
    }

    static void tryToReset(int days) {
        days = 0;
    }

    public static void main(String[] args) {
        System.out.println(describe("Clean Code", 3));
        System.out.println(describe("Refactoring", 40));
        System.out.println(describe("Java 21"));
        int late = 9;
        tryToReset(late);
        System.out.println("late ยังเป็น " + late);
    }
}`,
  expectedOutput: "Clean Code: 15 บาท\nRefactoring: 100 บาท\nJava 21: 0 บาท\nlate ยังเป็น 9",
  tracePrompt: "describe(\"Java 21\") เรียก method ใดบ้างตามลำดับ และทำไม tryToReset(late) ไม่ทำให้ late เป็น 0",
  traceAnswer: "describe(String) → describe(String, int) ด้วย 0 → fineFor(0) คืน 0 แล้วต่อข้อความกลับขึ้นมา tryToReset ได้สำเนาของค่า 9 ในตัวแปร days ของตัวเอง การกำหนด days = 0 เปลี่ยนแค่สำเนา late ใน main ไม่เปลี่ยน",
  practicePrompt: "แยกโปรแกรมค่าปรับขั้นบันไดจากบท java-loops เป็น method: static int rateForDay(int day) คืนอัตราของวันนั้น, static int fineFor(int lateDays, int cap) คืนค่าปรับรวมไม่เกิน cap, static String receipt(String title, int lateDays) คืนข้อความ <title>: <ค่าปรับ> บาท (cap 150) แล้วใน main พิมพ์ receipt ของ Clean Code 9 วัน, Refactoring 30 วัน และ Java 21 0 วัน โดย main ไม่มีการคำนวณเอง",
  starter: java`public class Main {
    static int rateForDay(int day) {
        return 0; // วันที่ 1–3: 2, 4–7: 5, ตั้งแต่ 8: 10
    }

    static int fineFor(int lateDays, int cap) {
        return 0;
    }

    static String receipt(String title, int lateDays) {
        return "";
    }

    public static void main(String[] args) {
        System.out.println(receipt("Clean Code", 9));
        System.out.println(receipt("Refactoring", 30));
        System.out.println(receipt("Java 21", 0));
    }
}`,
  solution: java`public class Main {
    static int rateForDay(int day) {
        if (day <= 3) {
            return 2;
        }
        if (day <= 7) {
            return 5;
        }
        return 10;
    }

    static int fineFor(int lateDays, int cap) {
        int fine = 0;
        for (int day = 1; day <= lateDays && fine < cap; day++) {
            fine = Math.min(fine + rateForDay(day), cap);
        }
        return fine;
    }

    static String receipt(String title, int lateDays) {
        return title + ": " + fineFor(lateDays, 150) + " บาท";
    }

    public static void main(String[] args) {
        System.out.println(receipt("Clean Code", 9));
        System.out.println(receipt("Refactoring", 30));
        System.out.println(receipt("Java 21", 0));
    }
}`,
  solutionCheck: { output: "Clean Code: 46 บาท\nRefactoring: 150 บาท\nJava 21: 0 บาท" },
  buggy: java`public class Main {
    static int fineFor(int lateDays) {
        if (lateDays > 0) {
            return lateDays * 5;
        }
    }

    public static void main(String[] args) {
        System.out.println(fineFor(3));
    }
}`,
  bugCheck: {kind: "compile", message: "missing return statement"},
  bugExplanation: "compile error: “missing return statement” เมื่อ lateDays <= 0 method ไม่มีค่าให้ return javac ตรวจว่าทุกเส้นทางของ method ที่คืน int ต้องจบด้วย return แก้โดยเพิ่ม return 0; ท้าย method",
  vocabulary: [v("method", "ชุดคำสั่งที่มีชื่อ เรียกใช้ซ้ำได้"), v("parameter", "ตัวแปรที่รับค่าตอนเรียก method"), v("return type", "ชนิดของค่าที่ method คืน (void = ไม่คืน)"), v("scope", "ขอบเขตที่ตัวแปรถูกมองเห็น"), v("pass-by-value", "method ได้สำเนาของค่าที่ส่งเข้าไป"), v("overloading", "method ชื่อเดียวกันแต่ parameter ต่างกัน")],
},
{
  id: "java-arrays",
  courseId,
  unit: "Methods และ collections",
  title: "array: index, length, enhanced for และการคัดลอก",
  objective: "สร้างและอ่าน array ด้วย index ใช้ length และ enhanced for รู้ค่าเริ่มต้นของ array แสดงผลด้วย Arrays.toString และแยกให้ออกว่าการกำหนด array ให้ตัวแปรใหม่ไม่ได้คัดลอกข้อมูล",
  why: "array คือโครงสร้างข้อมูลพื้นฐานของ Java ที่ขนาดคงที่ ความเข้าใจผิดว่า b = a คือการคัดลอกทำให้การแก้ข้อมูลชุดหนึ่งไปเปลี่ยนอีกชุดโดยไม่ตั้งใจ และ index ที่เกินขอบทำให้โปรแกรมล่ม",
  explanation: "int[] ratings = {4, 5, 3}; หรือ new int[5] (ทุกช่องเริ่มเป็น 0; String[] เริ่มเป็น null; boolean[] เริ่มเป็น false) ขนาดคงที่หลังสร้าง index เริ่มที่ 0 ถึง length - 1 (length ไม่มีวงเล็บ ต่างจาก String.length()) อ่าน index นอกช่วงได้ ArrayIndexOutOfBoundsException ตอนรัน for (int r : ratings) อ่านทุกช่องโดยไม่ต้องใช้ index (แต่แก้ค่าใน array ผ่านตัวแปร r ไม่ได้) Arrays.toString(a) แสดงเนื้อหา (println(a) ตรง ๆ ได้ข้อความแบบ [I@1b6d3586) ตัวแปร array เก็บ reference: int[] b = a; ทำให้สองชื่อชี้ array เดียวกัน คัดลอกจริงด้วย Arrays.copyOf(a, a.length) หรือ a.clone() method ที่รับ array แก้ข้อมูลในนั้นได้ (ส่งสำเนาของ reference ไม่ใช่สำเนาของข้อมูล)",
  language: "java",
  standard: "v3",
  prerequisites: ["java-array-copy", "java-casting"],
  example: java`import java.util.Arrays;

public class Main {
    static void addBonus(int[] scores) {
        for (int i = 0; i < scores.length; i++) {
            scores[i] += 1;
        }
    }

    public static void main(String[] args) {
        int[] ratings = {4, 5, 3};
        String[] titles = new String[2];
        System.out.println(ratings.length + " " + ratings[0] + " " + ratings[ratings.length - 1]);
        System.out.println(Arrays.toString(titles));

        int sum = 0;
        for (int rating : ratings) {
            sum += rating;
        }
        System.out.println("เฉลี่ย " + (double) sum / ratings.length);

        int[] alias = ratings;
        int[] copy = Arrays.copyOf(ratings, ratings.length);
        alias[0] = 1;
        addBonus(copy);
        System.out.println(Arrays.toString(ratings) + " " + Arrays.toString(copy));
    }
}`,
  expectedOutput: "3 4 3\n[null, null]\nเฉลี่ย 4.0\n[1, 5, 3] [5, 6, 4]",
  tracePrompt: "หลัง alias[0] = 1; ทำไม ratings[0] เปลี่ยนเป็น 1 ด้วย แต่ addBonus(copy) ไม่ทำให้ ratings เปลี่ยน",
  traceAnswer: "alias = ratings คัดลอกแค่ reference ทั้งสองชื่อชี้ array เดียวกัน การแก้ผ่านชื่อใดก็เห็นทั้งคู่ ส่วน copy เป็น array ใหม่จาก Arrays.copyOf addBonus ได้ reference ของ copy จึงแก้เฉพาะ copy",
  practicePrompt: "เขียน static method สามตัวที่ทำงานกับ int[] ratings (คะแนน 1–5): average(int[]) คืน double (array ว่างคืน 0.0), countAtLeast(int[], int min) คืนจำนวนที่ ≥ min, withoutLowest(int[]) คืน array ใหม่ที่ตัดคะแนนต่ำสุดออกหนึ่งตัว (ห้ามแก้ array เดิม) แล้วใน main ใช้ {4, 2, 5, 5, 3} พิมพ์ 3.80 (printf), 3 (≥ 4) และ [4, 5, 5, 3] พร้อมพิมพ์ array เดิมเพื่อยืนยันว่าไม่เปลี่ยน",
  starter: java`import java.util.Arrays;

public class Main {
    static double average(int[] ratings) {
        return 0.0;
    }

    static int countAtLeast(int[] ratings, int min) {
        return 0;
    }

    static int[] withoutLowest(int[] ratings) {
        return ratings;
    }

    public static void main(String[] args) {
        int[] ratings = {4, 2, 5, 5, 3};
        System.out.printf("%.2f%n", average(ratings));
        System.out.println(countAtLeast(ratings, 4));
        System.out.println(Arrays.toString(withoutLowest(ratings)));
        System.out.println(Arrays.toString(ratings));
    }
}`,
  solution: java`import java.util.Arrays;

public class Main {
    static double average(int[] ratings) {
        if (ratings.length == 0) {
            return 0.0;
        }
        int sum = 0;
        for (int rating : ratings) {
            sum += rating;
        }
        return (double) sum / ratings.length;
    }

    static int countAtLeast(int[] ratings, int min) {
        int count = 0;
        for (int rating : ratings) {
            if (rating >= min) {
                count++;
            }
        }
        return count;
    }

    static int[] withoutLowest(int[] ratings) {
        if (ratings.length == 0) {
            return new int[0];
        }
        int lowestIndex = 0;
        for (int i = 1; i < ratings.length; i++) {
            if (ratings[i] < ratings[lowestIndex]) {
                lowestIndex = i;
            }
        }
        int[] result = new int[ratings.length - 1];
        int next = 0;
        for (int i = 0; i < ratings.length; i++) {
            if (i != lowestIndex) {
                result[next] = ratings[i];
                next++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] ratings = {4, 2, 5, 5, 3};
        System.out.printf("%.2f%n", average(ratings));
        System.out.println(countAtLeast(ratings, 4));
        System.out.println(Arrays.toString(withoutLowest(ratings)));
        System.out.println(Arrays.toString(ratings));
    }
}`,
  solutionCheck: { output: "3.80\n3\n[4, 5, 5, 3]\n[4, 2, 5, 5, 3]" },
  buggy: java`import java.util.Arrays;

public class Main {
    static int[] sortedCopy(int[] values) {
        int[] copy = values;
        Arrays.sort(copy);
        return copy;
    }

    public static void main(String[] args) {
        int[] arrivalOrder = {3, 1, 2};
        int[] sorted = sortedCopy(arrivalOrder);
        System.out.println(Arrays.toString(sorted) + " " + Arrays.toString(arrivalOrder));
    }
}`,
  bugCheck: {kind: "logic", output: "[1, 2, 3] [1, 2, 3]"},
  bugExplanation: "พิมพ์ [1, 2, 3] [1, 2, 3] ลำดับการมาถึงเดิมหายไป เพราะ int[] copy = values; ไม่ได้คัดลอก แค่ให้อีกชื่อชี้ array เดิม Arrays.sort จึงเรียง array ของผู้เรียก compile ผ่านเป็น logic bug แก้เป็น int[] copy = Arrays.copyOf(values, values.length);",
  vocabulary: [v("array", "ชุดข้อมูลชนิดเดียวกันขนาดคงที่"), v("index", "ตำแหน่ง 0 ถึง length - 1"), v("length", "จำนวนช่องของ array (ไม่มีวงเล็บ)"), v("enhanced for", "for (T x : array) อ่านทุกช่อง"), v("reference", "ค่าที่ชี้ไปยัง object/array ในหน่วยความจำ"), v("Arrays.copyOf", "สร้าง array ใหม่ที่คัดลอกข้อมูล")],
},
{
  id: "java-arraylist",
  courseId,
  unit: "Methods และ collections",
  title: "ArrayList<T>: รายการที่ขยายได้ และ wrapper types",
  objective: "ใช้ ArrayList<String> และ ArrayList<Integer> (add, get, set, remove, size, contains, indexOf) อธิบายว่าทำไม generic ต้องใช้ Integer แทน int รู้กับดัก remove(int) กับ remove(Object) และการแก้ list ระหว่าง for-each",
  why: "ข้อมูลจริงมักไม่รู้จำนวนล่วงหน้า (หนังสือที่ผู้ใช้เพิ่มเรื่อย ๆ) ArrayList ขยายได้เองและมี method พร้อมใช้ แต่มีกับดักที่ทำให้ลบผิดตัวหรือโปรแกรมล่มได้ถ้าไม่รู้",
  explanation: "import java.util.ArrayList; ArrayList<String> titles = new ArrayList<>(); (<> ให้ compiler อนุมานชนิดจากฝั่งซ้าย) add(x) เพิ่มท้าย, add(i, x) แทรก, get(i) อ่าน, set(i, x) แทนที่, remove(i) ลบตาม index, remove(obj) ลบตัวแรกที่ equals, size() จำนวน, contains/indexOf ค้นหาด้วย equals generic ใช้ได้กับ object เท่านั้น จึงใช้ wrapper: Integer แทน int, Double แทน double, Boolean แทน boolean Java แปลงให้อัตโนมัติ (autoboxing) กับดัก: ใน ArrayList<Integer> list.remove(1) คือลบ index 1 ไม่ใช่ลบเลข 1 (ต้องใช้ list.remove(Integer.valueOf(1))) การ add/remove ระหว่าง for (String t : titles) ทำให้เกิด ConcurrentModificationException ใช้ removeIf หรือ loop ด้วย index ย้อนหลังแทน removeIf รับเงื่อนไขเป็น lambda: t -> t.endsWith(\"-old\") คือ function สั้น ๆ ที่รับสมาชิก t แล้วคืน true ถ้าต้องการลบ (ซ้ายของ -> คือ parameter ขวาคือค่าที่คืน) List.of(...) สร้าง list ที่แก้ไม่ได้",
  language: "java",
  standard: "v3",
  prerequisites: ["java-arrays"],
  example: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> titles = new ArrayList<>();
        titles.add("Clean Code");
        titles.add("Refactoring");
        titles.add(0, "Java 21");
        System.out.println(titles + " size=" + titles.size());
        titles.set(1, "Clean Code 2nd");
        System.out.println(titles.get(1) + " " + titles.contains("Refactoring") + " " + titles.indexOf("Missing"));
        titles.remove("Refactoring");
        System.out.println(titles);

        ArrayList<Integer> ids = new ArrayList<>(List.of(10, 1, 7));
        ids.remove(1);
        System.out.println("remove(1): " + ids);
        ids.remove(Integer.valueOf(10));
        System.out.println("remove(Integer 10): " + ids);

        ArrayList<String> shelf = new ArrayList<>(List.of("A-old", "B", "C-old"));
        shelf.removeIf(t -> t.endsWith("-old"));
        System.out.println(shelf);
    }
}`,
  expectedOutput: "[Java 21, Clean Code, Refactoring] size=3\nClean Code 2nd true -1\n[Java 21, Clean Code 2nd]\nremove(1): [10, 7]\nremove(Integer 10): [7]\n[B]",
  tracePrompt: "ArrayList<Integer> list = new ArrayList<>(List.of(5, 0, 3)); list.remove(0); list.remove(Integer.valueOf(0)); เหลืออะไรใน list และทำไมผลของสองคำสั่งต่างกัน",
  traceAnswer: "remove(0) รับ int จึงลบ index 0 (เลข 5) เหลือ [0, 3] ส่วน remove(Integer.valueOf(0)) รับ object จึงลบค่าที่ equals 0 ตัวแรก เหลือ [3] compiler เลือก method ตามชนิดของ argument: int → remove(int index), Integer → remove(Object)",
  practicePrompt: "เขียนโปรแกรมรายการหนังสือที่อยากอ่าน อ่านคำสั่งทีละบรรทัดจนหมด input: add <ชื่อ> (ไม่เพิ่มซ้ำ พิมพ์ duplicate: <ชื่อ>), done <ลำดับเริ่ม 1> (ลบตามลำดับ ถ้าลำดับไม่มีพิมพ์ no such item), list (พิมพ์แต่ละเล่มเป็น 1. ชื่อ หรือ (empty) ถ้าว่าง) ใช้ ArrayList<String> และ switch ตัวอย่าง input: add Clean Code / add Java 21 / add Clean Code / done 1 / done 5 / list ต้องพิมพ์ duplicate: Clean Code / no such item / 1. Java 21",
  starter: java`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> wishlist = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            String[] parts = line.split(" ", 2);
            String command = parts[0];
            String arg = parts.length > 1 ? parts[1].strip() : "";
            // switch ตาม command: add, done, list
        }
    }
}`,
  solution: java`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> wishlist = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            String[] parts = line.split(" ", 2);
            String command = parts[0];
            String arg = parts.length > 1 ? parts[1].strip() : "";
            switch (command) {
                case "add" -> {
                    if (wishlist.contains(arg)) {
                        System.out.println("duplicate: " + arg);
                    } else {
                        wishlist.add(arg);
                    }
                }
                case "done" -> {
                    int position = Integer.parseInt(arg);
                    if (position < 1 || position > wishlist.size()) {
                        System.out.println("no such item");
                    } else {
                        wishlist.remove(position - 1);
                    }
                }
                case "list" -> {
                    if (wishlist.isEmpty()) {
                        System.out.println("(empty)");
                    }
                    for (int i = 0; i < wishlist.size(); i++) {
                        System.out.println((i + 1) + ". " + wishlist.get(i));
                    }
                }
                default -> System.out.println("unknown: " + command);
            }
        }
    }
}`,
  solutionCheck: { stdin: "add Clean Code\nadd Java 21\nadd Clean Code\ndone 1\ndone 5\nlist\n", output: "duplicate: Clean Code\nno such item\n1. Java 21" },
  buggy: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> titles = new ArrayList<>(List.of("A-old", "B", "C-old"));
        for (String title : titles) {
            if (title.endsWith("-old")) {
                titles.remove(title);
            }
        }
        System.out.println(titles);
    }
}`,
  bugCheck: {kind: "runtime", message: "ConcurrentModificationException"},
  bugExplanation: "compile ผ่าน แต่ตอนรันได้ ConcurrentModificationException เพราะลบออกจาก list ระหว่างที่ for-each กำลังวนอยู่ (iterator ตรวจพบว่า list ถูกแก้นอกตัวมัน) แก้ด้วย titles.removeIf(title -> title.endsWith(\"-old\")); หรือวน index จากท้ายไปหน้าแล้ว remove(i)",
  vocabulary: [v("ArrayList", "list ที่ขยายขนาดได้"), v("generic", "การระบุชนิดของสมาชิก เช่น ArrayList<String>"), v("wrapper type", "class ที่ห่อ primitive เช่น Integer, Double"), v("autoboxing", "การแปลง int ↔ Integer อัตโนมัติ"), v("removeIf", "ลบสมาชิกที่ตรงเงื่อนไขอย่างปลอดภัย"), v("ConcurrentModificationException", "error เมื่อแก้ list ระหว่าง for-each")],
},
{
  id: "java-exceptions-basic",
  courseId,
  unit: "Methods และ collections",
  title: "exception เบื้องต้น: try/catch กับ input ที่ผิด และ throw เมื่อรับค่าที่ไม่ถูกต้อง",
  objective: "อ่าน stack trace หา exception ชนิดและบรรทัดต้นเหตุ ดัก NumberFormatException ด้วย try/catch เพื่อขอ input ใหม่แทนการล่ม และ throw IllegalArgumentException จาก method เมื่อได้รับค่าที่ผิดกติกา",
  why: "ผู้ใช้พิมพ์ \"สาม\" แทน 3 ได้เสมอ โปรแกรมที่ล่มทั้งตัวเพราะ input บรรทัดเดียวใช้งานจริงไม่ได้ ในทางกลับกัน method ที่รับค่าผิดแล้วทำงานต่อเงียบ ๆ ทำให้ข้อมูลเสียโดยไม่มีใครรู้ การแยกว่า error ไหนควรจับและไหนควรโยนคือหัวใจของบทนี้",
  explanation: "exception คือ object ที่บอกว่ามีปัญหาตอนรัน ถ้าไม่มีใครจับ โปรแกรมหยุดและพิมพ์ stack trace: บรรทัดแรกคือชนิดและข้อความ (java.lang.NumberFormatException: For input string: \"สาม\") บรรทัด at ... บอกเส้นทางการเรียก method บรรทัดบนสุดที่เป็นโค้ดของเราคือจุดเริ่มดู try { ... } catch (NumberFormatException e) { ... } จับเฉพาะชนิดที่คาดไว้และรู้วิธีแก้ (เช่นขอ input ใหม่) อย่าใช้ catch (Exception e) กว้าง ๆ เพราะจะกลืน bug อื่น throw new IllegalArgumentException(\"ข้อความ\") ใช้ใน method เมื่อผู้เรียกส่งค่าที่ผิดกติกา ผู้เรียกที่รับมือได้ค่อยจับ finally ทำงานเสมอไม่ว่าจะมี exception หรือไม่ Java มี checked exception (เช่น IOException ต้องประกาศ throws หรือจับ) และ unchecked (RuntimeException เช่น NumberFormatException, IllegalArgumentException ไม่บังคับ) ซึ่งจะลงลึกในคอร์ส OOP",
  language: "java",
  standard: "v3",
  prerequisites: ["java-arraylist", "java-casting"],
  example: java`import java.util.Scanner;

public class Main {
    static int fineFor(int lateDays) {
        if (lateDays < 0) {
            throw new IllegalArgumentException("lateDays ต้องไม่ติดลบ: " + lateDays);
        }
        return lateDays * 5;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            try {
                int days = Integer.parseInt(line);
                System.out.println(days + " วัน → " + fineFor(days) + " บาท");
            } catch (NumberFormatException e) {
                System.out.println("'" + line + "' ไม่ใช่ตัวเลข ลองใหม่");
            } catch (IllegalArgumentException e) {
                System.out.println("ข้อมูลผิด: " + e.getMessage());
            }
        }
        System.out.println("จบ");
    }
}`,
  stdin: "สาม\n3\n-2\n",
  expectedOutput: "'สาม' ไม่ใช่ตัวเลข ลองใหม่\n3 วัน → 15 บาท\nข้อมูลผิด: lateDays ต้องไม่ติดลบ: -2\nจบ",
  tracePrompt: "NumberFormatException เป็น subclass ของ IllegalArgumentException ถ้าสลับลำดับ catch สองอันในตัวอย่าง (IllegalArgumentException ก่อน) จะเกิดอะไร",
  traceAnswer: "javac แจ้ง compile error “exception NumberFormatException has already been caught” เพราะ catch แรกจับ IllegalArgumentException ซึ่งรวม NumberFormatException อยู่แล้ว catch ที่สองจึงไม่มีทางถูกเรียก Java จึงบังคับให้วาง catch ชนิดที่เฉพาะกว่าไว้ก่อน",
  practicePrompt: "เขียน static int readChoice(Scanner scanner, int min, int max) ที่อ่านบรรทัดซ้ำจนได้จำนวนเต็มในช่วง min–max: ถ้าไม่ใช่ตัวเลขพิมพ์ ต้องเป็นตัวเลข ถ้านอกช่วงพิมพ์ เลือก <min>-<max> แล้วอ่านใหม่ ถ้า input หมดก่อนได้ค่าที่ถูกต้องให้ throw IllegalStateException(\"ไม่มี input\") และ static int fineFor(int lateDays) ที่ throw IllegalArgumentException เมื่อติดลบ ใน main: อ่านเมนู 1–3 ด้วย readChoice แล้วพิมพ์ เลือก <n> เช่น input: x / 9 / 2 → ต้องเป็นตัวเลข / เลือก 1-3 / เลือก 2",
  starter: java`import java.util.Scanner;

public class Main {
    static int readChoice(Scanner scanner, int min, int max) {
        // วนอ่านจนได้ค่าที่ถูกต้อง หรือ input หมด
        return min;
    }

    static int fineFor(int lateDays) {
        return lateDays * 5;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice = readChoice(scanner, 1, 3);
        System.out.println("เลือก " + choice);
    }
}`,
  solution: java`import java.util.Scanner;

public class Main {
    static int readChoice(Scanner scanner, int min, int max) {
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            try {
                int value = Integer.parseInt(line);
                if (value >= min && value <= max) {
                    return value;
                }
                System.out.println("เลือก " + min + "-" + max);
            } catch (NumberFormatException e) {
                System.out.println("ต้องเป็นตัวเลข");
            }
        }
        throw new IllegalStateException("ไม่มี input");
    }

    static int fineFor(int lateDays) {
        if (lateDays < 0) {
            throw new IllegalArgumentException("lateDays ต้องไม่ติดลบ: " + lateDays);
        }
        return lateDays * 5;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice = readChoice(scanner, 1, 3);
        System.out.println("เลือก " + choice);
    }
}`,
  solutionCheck: { stdin: "x\n9\n2\n", output: "ต้องเป็นตัวเลข\nเลือก 1-3\nเลือก 2" },
  buggy: java`public class Main {
    static int parseDays(String text) {
        try {
            return Integer.parseInt(text);
        } catch (Exception e) {
            return 0;
        }
    }

    public static void main(String[] args) {
        String[] inputs = {"3", "สาม", null};
        int total = 0;
        for (String input : inputs) {
            total += parseDays(input);
        }
        System.out.println("รวม " + total + " วัน");
    }
}`,
  bugCheck: {kind: "logic", output: "รวม 3 วัน"},
  bugExplanation: "พิมพ์ รวม 3 วัน โดยไม่มีสัญญาณว่า \"สาม\" และ null ผิด catch (Exception e) กว้างเกินไปและคืน 0 แทนการแจ้งปัญหา ข้อมูลผิดจึงกลายเป็นข้อมูล “ถูก” ที่ผิดความจริง compile ผ่านเป็น logic bug แก้โดยจับเฉพาะ NumberFormatException ในจุดที่ขอ input ใหม่ได้ และให้ผู้เรียกตัดสินใจ (เช่นแจ้งผู้ใช้) แทนการแทนค่า 0 เงียบ ๆ",
  vocabulary: [v("exception", "object ที่แทนปัญหาตอนรัน"), v("stack trace", "รายการ method ที่เรียกต่อกันจนถึงจุดเกิด exception"), v("try / catch", "ลองทำและจับ exception ที่คาดไว้"), v("throw", "โยน exception เมื่อพบค่าที่ผิดกติกา"), v("NumberFormatException", "แปลงข้อความเป็นตัวเลขไม่ได้"), v("IllegalArgumentException", "argument ผิดกติกาของ method")],
},
{
  id: "java-multi-file",
  courseId,
  unit: "โปรแกรมหลายไฟล์",
  title: "หลายไฟล์และ package: javac -d out และ java -cp out",
  objective: "แยกโปรแกรมเป็นหลายไฟล์ใน package เดียวกัน เรียก static method ข้าม class compile ทุกไฟล์ด้วย javac -d out และรันด้วย java -cp out ชื่อเต็มของ class และอ่าน error ที่เกิดจาก package/โฟลเดอร์ไม่ตรงกันได้",
  why: "โปรแกรมจริงมีหลายสิบไฟล์ java Main.java แบบไฟล์เดียวใช้ไม่ได้อีกต่อไป และคอร์ส OOP กับ Library CLI ใช้หลายไฟล์ตั้งแต่แรก การเข้าใจ package, โฟลเดอร์ และ classpath ช่วยแก้ error อย่าง “cannot find symbol” หรือ “Could not find or load main class” ได้เอง",
  explanation: "package library; ที่บรรทัดแรกบอกว่า class อยู่ใน package library ไฟล์ควรอยู่ในโฟลเดอร์ library/ (โครงแบบมาตรฐาน: src/library/Main.java) class ใน package เดียวกันเรียกกันได้ตรง ๆ (Fines.fineFor(3)) class ใน package อื่นต้อง import compile ทุกไฟล์พร้อมกัน: javac -d out src/library/*.java (-d บอกโฟลเดอร์ output; javac สร้าง out/library/*.class ตาม package) รัน: java -cp out library.Main (-cp บอก classpath; ใช้ชื่อเต็ม package.Class ไม่ใช่ path ไฟล์) ชื่อ package ใช้ตัวพิมพ์เล็กทั้งหมด public class หนึ่งตัวต่อไฟล์และชื่อตรงกับไฟล์ method ที่ไม่ใส่ public/private (package-private) เรียกได้จาก class ใน package เดียวกันเท่านั้น ในบทเรียน ไฟล์หลายไฟล์แสดงในบล็อกเดียวคั่นด้วยบรรทัด // File: path",
  language: "java",
  standard: "v3",
  prerequisites: ["java-exceptions-basic"],
  example: java`// File: library/Fines.java
package library;

public class Fines {
    static final int CAP = 100;

    public static int fineFor(int lateDays) {
        if (lateDays < 0) {
            throw new IllegalArgumentException("lateDays ต้องไม่ติดลบ");
        }
        return Math.min(lateDays * 5, CAP);
    }
}
// File: library/Format.java
package library;

public class Format {
    public static String baht(int amount) {
        return String.format("%,d บาท", amount);
    }
}
// File: library/Main.java
package library;

public class Main {
    public static void main(String[] args) {
        System.out.println(Format.baht(Fines.fineFor(3)));
        System.out.println(Format.baht(Fines.fineFor(40)));
        System.out.println("cap = " + Fines.CAP);
    }
}`,
  expectedOutput: "15 บาท\n100 บาท\ncap = 100",
  tracePrompt: "โครงโฟลเดอร์คือ src/library/Fines.java, src/library/Format.java, src/library/Main.java ถ้าสั่ง javac -d out src/library/*.java แล้ว java -cp out Main จะเกิดอะไร คำสั่งที่ถูกคืออะไร และไฟล์ .class อยู่ที่ไหน",
  traceAnswer: "javac สร้าง out/library/Fines.class, Format.class, Main.class ตาม package แต่ java -cp out Main หา class ชื่อ Main ที่ไม่มี package ไม่เจอ ได้ “Could not find or load main class Main” ต้องใช้ชื่อเต็ม: java -cp out library.Main",
  practicePrompt: "แยกโปรแกรมรายการหนังสือที่อยากอ่าน (java-arraylist) เป็น 3 ไฟล์ใน package wishlist: Wishlist.java มี static method add(ArrayList<String>, String) คืน boolean (false ถ้าซ้ำ), done(ArrayList<String>, int position) คืน boolean (false ถ้าลำดับไม่มี), lines(ArrayList<String>) คืน ArrayList<String> ของบรรทัดที่จะพิมพ์; Commands.java มี static method run(String line, ArrayList<String> list) คืนข้อความที่ต้องพิมพ์ (หรือ \"\" ถ้าไม่ต้องพิมพ์); Main.java อ่าน input และพิมพ์เท่านั้น compile ด้วย javac -d out แล้วรันด้วย java -cp out wishlist.Main ผลต้องเหมือนบท java-arraylist ทุกบรรทัด",
  starter: java`// File: wishlist/Wishlist.java
package wishlist;

import java.util.ArrayList;

public class Wishlist {
    public static boolean add(ArrayList<String> list, String title) {
        return false;
    }

    public static boolean done(ArrayList<String> list, int position) {
        return false;
    }

    public static ArrayList<String> lines(ArrayList<String> list) {
        return new ArrayList<>();
    }
}
// File: wishlist/Commands.java
package wishlist;

import java.util.ArrayList;

public class Commands {
    public static String run(String line, ArrayList<String> list) {
        return "";
    }
}
// File: wishlist/Main.java
package wishlist;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> list = new ArrayList<>();
        // อ่านทีละบรรทัด เรียก Commands.run แล้วพิมพ์ถ้าไม่ว่าง
    }
}`,
  solution: java`// File: wishlist/Wishlist.java
package wishlist;

import java.util.ArrayList;

public class Wishlist {
    public static boolean add(ArrayList<String> list, String title) {
        if (list.contains(title)) {
            return false;
        }
        list.add(title);
        return true;
    }

    public static boolean done(ArrayList<String> list, int position) {
        if (position < 1 || position > list.size()) {
            return false;
        }
        list.remove(position - 1);
        return true;
    }

    public static ArrayList<String> lines(ArrayList<String> list) {
        ArrayList<String> lines = new ArrayList<>();
        if (list.isEmpty()) {
            lines.add("(empty)");
        }
        for (int i = 0; i < list.size(); i++) {
            lines.add((i + 1) + ". " + list.get(i));
        }
        return lines;
    }
}
// File: wishlist/Commands.java
package wishlist;

import java.util.ArrayList;

public class Commands {
    public static String run(String line, ArrayList<String> list) {
        String[] parts = line.strip().split(" ", 2);
        String arg = parts.length > 1 ? parts[1].strip() : "";
        return switch (parts[0]) {
            case "add" -> Wishlist.add(list, arg) ? "" : "duplicate: " + arg;
            case "done" -> {
                try {
                    yield Wishlist.done(list, Integer.parseInt(arg)) ? "" : "no such item";
                } catch (NumberFormatException e) {
                    yield "done ต้องตามด้วยตัวเลข";
                }
            }
            case "list" -> String.join("\n", Wishlist.lines(list));
            default -> "unknown: " + parts[0];
        };
    }
}
// File: wishlist/Main.java
package wishlist;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> list = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String output = Commands.run(scanner.nextLine(), list);
            if (!output.isEmpty()) {
                System.out.println(output);
            }
        }
    }
}`,
  solutionCheck: { stdin: "add Clean Code\nadd Java 21\nadd Clean Code\ndone 1\ndone 5\ndone x\nlist\n", output: "duplicate: Clean Code\nno such item\ndone ต้องตามด้วยตัวเลข\n1. Java 21" },
  buggy: java`// File: library/Fines.java
package library;

public class Fines {
    public static int fineFor(int lateDays) {
        return lateDays * 5;
    }
}
// File: app/Main.java
package app;

public class Main {
    public static void main(String[] args) {
        System.out.println(Fines.fineFor(3));
    }
}`,
  bugCheck: {kind: "compile", message: "cannot find symbol"},
  bugExplanation: "compile error: “cannot find symbol: variable Fines” เพราะ Main อยู่ใน package app ส่วน Fines อยู่ใน package library class ต่าง package มองไม่เห็นกันจนกว่าจะ import แก้โดยเพิ่ม import library.Fines; ใต้บรรทัด package app; (Fines และ fineFor เป็น public อยู่แล้วจึงเรียกข้าม package ได้)",
  vocabulary: [v("package", "กลุ่มของ class ที่เกี่ยวข้องกัน ตรงกับโครงโฟลเดอร์"), v("import", "อ้างถึง class จาก package อื่น"), v("classpath (-cp)", "ที่ที่ JVM ค้นหาไฟล์ .class"), v("javac -d", "กำหนดโฟลเดอร์ output ของ .class"), v("fully qualified name", "ชื่อเต็ม package.Class เช่น library.Main"), v("package-private", "ไม่ใส่ access modifier: เห็นได้เฉพาะใน package เดียวกัน")],
},
{
  id: "java-project-library-0",
  courseId,
  unit: "Project: Library Management CLI",
  title: "★ Library CLI M0: เมนูคำสั่ง หนังสือ และสถานะการยืม",
  objective: "รวมทุกบทของ Java Foundations สร้าง Library Management CLI ระยะแรก: อ่านคำสั่งจาก input, เก็บหนังสือและสถานะยืมด้วย ArrayList, ตรวจ input ที่ผิดโดยไม่ล่ม และแยกงานเป็น method/ไฟล์ พร้อมสคริปต์ input สำหรับทดสอบซ้ำ",
  why: "นี่คือฐานของโปรเจกต์ที่จะต่อยอดในคอร์ส Java OOP (M1 แยก Book/Member, M2 Library กับกติกาการยืม, M3 บันทึกไฟล์และ JUnit) M0 ตั้งใจใช้แค่สิ่งที่เรียนมา เพื่อให้เห็นภายหลังว่า object ช่วยแก้ปัญหาอะไรของโค้ดแบบนี้",
  explanation: "ข้อกำหนด M0 (ผลต้องตรงทุกตัวอักษร เพื่อทดสอบด้วยไฟล์ input ได้): คำสั่ง add <title> เพิ่มหนังสือ ตอบ added #<id> (id เริ่มที่ 1 เพิ่มทีละ 1 และไม่ใช้ซ้ำแม้ลบ) ถ้าไม่มีชื่อตอบ title required; list แสดงแต่ละเล่มเป็น #<id> <title> [available] หรือ [borrowed] หรือ (no books); borrow <id> ตอบ borrowed #<id>, already borrowed หรือ no such book; return <id> ตอบ returned #<id>, not borrowed หรือ no such book; quit ตอบ bye แล้วจบ; บรรทัดว่างข้าม; id ที่ไม่ใช่ตัวเลขตอบ id must be a number; คำสั่งอื่นตอบ unknown command: <คำสั่ง> เก็บข้อมูลด้วย ArrayList คู่ขนาน (ids, titles, borrowed) ที่ index เดียวกันคือหนังสือเล่มเดียวกัน — โครงสร้างนี้เปราะ (ต้องแก้สาม list พร้อมกันทุกครั้ง) และเป็นเหตุผลที่ M1 จะแทนด้วย class Book",
  language: "java",
  standard: "v3",
  prerequisites: ["java-multi-file", "java-switch"],
  example: java`import java.util.ArrayList;

public class Main {
    static ArrayList<Integer> ids = new ArrayList<>();
    static ArrayList<String> titles = new ArrayList<>();
    static ArrayList<Boolean> borrowed = new ArrayList<>();
    static int nextId = 1;

    static String add(String title) {
        ids.add(nextId);
        titles.add(title);
        borrowed.add(false);
        nextId++;
        return "added #" + ids.get(ids.size() - 1);
    }

    static String list() {
        if (ids.isEmpty()) {
            return "(no books)";
        }
        ArrayList<String> lines = new ArrayList<>();
        for (int i = 0; i < ids.size(); i++) {
            lines.add("#" + ids.get(i) + " " + titles.get(i) + (borrowed.get(i) ? " [borrowed]" : " [available]"));
        }
        return String.join("\n", lines);
    }

    public static void main(String[] args) {
        System.out.println(list());
        System.out.println(add("Clean Code"));
        System.out.println(add("Java 21"));
        borrowed.set(0, true);
        System.out.println(list());
    }
}`,
  expectedOutput: "(no books)\nadded #1\nadded #2\n#1 Clean Code [borrowed]\n#2 Java 21 [available]",
  tracePrompt: "ใน ArrayList คู่ขนาน ถ้าคำสั่ง remove ในอนาคตเขียน titles.remove(i) และ borrowed.remove(i) แต่ลืม ids.remove(i) แล้วสั่ง list จะเห็นอะไรผิด",
  traceAnswer: "ids จะยาวกว่าอีกสอง list และ index เดียวกันไม่ใช่หนังสือเล่มเดียวกันอีกต่อไป เช่นหลังลบเล่มแรกจาก [1,2]/[A,B] จะได้ ids [1,2] กับ titles [B] list แสดง #1 B ซึ่งผิด และ i = 1 จะได้ IndexOutOfBoundsException จาก titles.get(1) ข้อมูลที่ “เป็นของชิ้นเดียวกัน” ควรอยู่ใน object เดียว (M1)",
  practicePrompt: "สร้าง Library CLI M0 ตามข้อกำหนดในคำอธิบายให้ครบทุกคำสั่ง แยกเป็นอย่างน้อย 2 ไฟล์ใน package library (เช่น Catalog.java เก็บข้อมูลและกติกา, Main.java อ่าน input/พิมพ์) เขียนไฟล์ test-input.txt ที่ครอบคลุมทุกข้อความตอบกลับ แล้วรันโปรแกรมโดยป้อน test-input.txt (PowerShell: Get-Content test-input.txt | java -cp out library.Main ; Bash/WSL: java -cp out library.Main < test-input.txt) เทียบกับ expected-output.txt ที่เขียนเอง เฉลยมี test-input.txt และ expected-output.txt ที่ครอบคลุมทุกข้อความตอบกลับให้เทียบ",
  starter: java`// File: library/Catalog.java
package library;

import java.util.ArrayList;

public class Catalog {
    static ArrayList<Integer> ids = new ArrayList<>();
    static ArrayList<String> titles = new ArrayList<>();
    static ArrayList<Boolean> borrowed = new ArrayList<>();
    static int nextId = 1;

    // add, list, borrow, return
}
// File: library/Main.java
package library;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // อ่านคำสั่งทีละบรรทัด แยกคำสั่งกับ argument แล้วเรียก Catalog
    }
}`,
  solution: java`// File: library/Catalog.java
package library;

import java.util.ArrayList;

public class Catalog {
    static ArrayList<Integer> ids = new ArrayList<>();
    static ArrayList<String> titles = new ArrayList<>();
    static ArrayList<Boolean> borrowed = new ArrayList<>();
    static int nextId = 1;

    static String add(String title) {
        int id = nextId;
        nextId++;
        ids.add(id);
        titles.add(title);
        borrowed.add(false);
        return "added #" + id;
    }

    static String list() {
        if (ids.isEmpty()) {
            return "(no books)";
        }
        ArrayList<String> lines = new ArrayList<>();
        for (int i = 0; i < ids.size(); i++) {
            lines.add("#" + ids.get(i) + " " + titles.get(i) + (borrowed.get(i) ? " [borrowed]" : " [available]"));
        }
        return String.join("\n", lines);
    }

    static String borrow(int id) {
        int index = ids.indexOf(id);
        if (index == -1) {
            return "no such book";
        }
        if (borrowed.get(index)) {
            return "already borrowed";
        }
        borrowed.set(index, true);
        return "borrowed #" + id;
    }

    static String giveBack(int id) {
        int index = ids.indexOf(id);
        if (index == -1) {
            return "no such book";
        }
        if (!borrowed.get(index)) {
            return "not borrowed";
        }
        borrowed.set(index, false);
        return "returned #" + id;
    }
}
// File: library/Main.java
package library;

import java.util.Scanner;

public class Main {
    static String handle(String command, String arg) {
        return switch (command) {
            case "add" -> arg.isEmpty() ? "title required" : Catalog.add(arg);
            case "list" -> Catalog.list();
            case "borrow", "return" -> {
                int id;
                try {
                    id = Integer.parseInt(arg);
                } catch (NumberFormatException e) {
                    yield "id must be a number";
                }
                yield command.equals("borrow") ? Catalog.borrow(id) : Catalog.giveBack(id);
            }
            default -> "unknown command: " + command;
        };
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;
            }
            String[] parts = line.split(" ", 2);
            String command = parts[0].toLowerCase();
            String arg = parts.length > 1 ? parts[1].strip() : "";
            if (command.equals("quit")) {
                System.out.println("bye");
                break;
            }
            System.out.println(handle(command, arg));
        }
    }
}
// File: test-input.txt
list
add
add Clean Code
add Java 21

borrow 1
borrow 1
borrow x
return 2
return 1
return 9
borrow 1
list
fly
quit
add ignored
// File: expected-output.txt
(no books)
title required
added #1
added #2
borrowed #1
already borrowed
id must be a number
not borrowed
returned #1
no such book
borrowed #1
#1 Clean Code [borrowed]
#2 Java 21 [available]
unknown command: fly
bye
`,
  buggy: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> ids = new ArrayList<>(java.util.List.of(1, 2, 3));
        ArrayList<Boolean> borrowed = new ArrayList<>(java.util.List.of(false, false, false));
        int id = 3;
        int index = ids.indexOf(id);
        borrowed.set(id, true);
        System.out.println(index + " " + borrowed);
    }
}`,
  bugCheck: {kind: "runtime", message: "IndexOutOfBoundsException: Index 3 out of bounds for length 3"},
  bugExplanation: "compile ผ่าน แต่ตอนรันได้ IndexOutOfBoundsException: Index 3 out of bounds for length 3 เพราะใช้ id (3) เป็น index ทั้งที่ index ของหนังสือ id 3 คือ 2 (หาได้จาก ids.indexOf(id)) id กับ index เป็นคนละเรื่อง: id คงที่ตลอดชีวิตของหนังสือ ส่วน index เปลี่ยนได้เมื่อมีการลบ แก้เป็น borrowed.set(index, true) และตรวจ index == -1 ก่อนใช้",
  vocabulary: [v("CLI", "โปรแกรมที่ใช้งานผ่านข้อความใน terminal"), v("parallel lists", "หลาย list ที่ index เดียวกันหมายถึงสิ่งเดียวกัน"), v("id", "ตัวระบุถาวรของข้อมูล ไม่ใช่ตำแหน่งใน list"), v("input redirection", "java ... < input.txt ส่งไฟล์เป็น input"), v("expected output", "ผลลัพธ์ที่ต้องได้ ใช้เทียบด้วย diff"), v("milestone", "ระยะของโปรเจกต์ที่ส่งมอบได้")],
},
];

const order = ["java-jdk", "java-main", "java-declarations", "java-output", "java-expressions", "java-variables", "java-primitives", "java-string", "java-casting", "java-scanner", "java-branch", "java-for-basics", "java-loop-sum", "java-loops", "java-switch", "java-method-basics", "java-methods", "java-array-basics", "java-array-minimum", "java-array-copy", "java-arrays", "java-arraylist", "java-exceptions-basic", "java-multi-file", "java-project-library-0"];
const byId = new Map([...originalTopics, ...javaBridgeTopics].map(topic => [topic.id, topic]));
export const javaFoundationTopics: TopicSource[] = order.map(id => {
  const topic = byId.get(id)!;
  return javaCheckpoints[id] ? { ...topic, checkpoint: javaCheckpoints[id] } : topic;
});
