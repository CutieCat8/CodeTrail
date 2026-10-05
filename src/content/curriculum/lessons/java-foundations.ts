import type { RichLesson } from "@/types/curriculum";

const local = "ตรวจเองในเครื่อง: ใช้ JDK21 เว็บไซต์ไม่ได้ compile/run Java ให้ บันทึกใน workspace ตามชื่อ // File: ถ้าไม่มีป้ายใช้ Main.java; สำหรับไฟล์เดียว PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main (แทน Main ด้วยชื่อ class จริงเมื่อมีป้ายไฟล์) บทหลายไฟล์ใช้คำสั่งเฉพาะบท เก็บ output/error แล้วเทียบค่าที่คาด ไม่ติ๊กแทนการทดลอง";
const java = String.raw;

export const javaFoundationLessons: Record<string, RichLesson> = {
  "java-jdk": {
    hook: "ซีติดตั้ง Java ตามคลิปเก่า พิมพ์ java QuestStart แล้วได้ “Could not find or load main class” ทั้งที่เปิดไฟล์ .java อยู่ตรงหน้า ปัญหาไม่ได้อยู่ในโค้ด แต่อยู่ที่ยังไม่รู้ว่า Java มีสองขั้น: แปลกับรัน",
    analogy: {
      title: "javac กับ JVM เหมือนนักแปลกับนักแสดง",
      text: [
        "บทละครภาษาไทย (.java) ต้องให้นักแปลแปลเป็นภาษากลางที่นักแสดงทุกโรงอ่านได้ (bytecode ใน .class) นักแปลตรวจไวยากรณ์ให้ระหว่างแปล ถ้าบทผิดไวยากรณ์ก็ไม่ได้ฉบับแปล",
        "นักแสดง (JVM) อ่านฉบับแปลแล้วแสดงจริง ปัญหาบางอย่างจะเห็นตอนแสดงเท่านั้น เช่นฉากที่ต้องใช้อุปกรณ์ที่ไม่มีอยู่",
      ],
      mapping: [
        ["บทละครต้นฉบับ", "ไฟล์ .java"],
        ["นักแปลที่ตรวจไวยากรณ์", "javac (compile error)"],
        ["ฉบับแปลภาษากลาง", "bytecode ในไฟล์ .class"],
        ["นักแสดงบนเวที", "JVM ที่สั่งด้วยคำสั่ง java (runtime error)"],
      ],
      limits: "นักแปลจริงแปลครั้งเดียวจบ แต่ JVM ยังแปล bytecode เป็นคำสั่งเครื่องอีกชั้นระหว่างทำงาน (JIT) และ java File.java (single-file) ทำทั้งสองขั้นต่อกันในคำสั่งเดียวโดยไม่เก็บฉบับแปลไว้",
    },
    explain: [
      { heading: "อ่านโครงไฟล์แรกก่อนคัดลอก", text: ["public class QuestStart { ... } ตั้งชื่อโปรแกรมต้องตรง QuestStart.java; public static void main(String[] args) { ... } คือจุดเริ่มที่ launcher เรียก คอร์สนี้ใช้โครงนี้ก่อนแล้วอ่านทีละคำใน java-main ยังไม่ต้องออกแบบ class เอง", "System.out.println(...) แสดงค่าแล้วขึ้นบรรทัดใหม่ ข้อความคร่อม doublequote; + ต่อข้อความกับค่าที่อ่านมา Runtime.version().feature() คือการถาม library ว่ารุ่นหลักของ Java ที่กำลังรันคืออะไร ใช้เพื่อยืนยันเครื่องมือ ตัวอย่างนี้ยังไม่มีตัวแปร/function ที่ต้องเขียนเพิ่มเอง"] },
      { heading: "0) เตรียม editor/workspace ก่อน Java", text: ["เส้นทาง Java เริ่มจากศูนย์ได้โดยไม่เรียนเว็บ: ถ้ายังไม่เคยเปิด editor หรือ terminal ให้ทบทวน dev-files, dev-terminal และ dev-editor ก่อน บันทึกไฟล์ source ให้ชื่อตรง public class ในพื้นที่ java-lab ของตัวเอง ไม่ใช้ scratchpad ของผู้สอน", "โค้ดตรวจรุ่นในบทนี้ให้คัดลอกทั้งไฟล์เป็นเครื่องมือวัดก่อน: System.out.println แสดงข้อความ; Runtime.version().feature() ถามรุ่นหลักของ JVM ที่กำลังรัน โครง main/วงเล็บปีกกาเรียนแยกใน java-main ไม่ต้องออกแบบ class เองก่อนบทนั้น"] },
      { heading: "ติดตั้ง JDK 21: Windows PowerShell", text: ["เปิด https://adoptium.net/temurin/releases เลือก Version 21, OS Windows, architecture ให้ตรงเครื่อง และ Package Type JDK ไม่ใช่ JRE สำหรับ Windows x64 ดาวน์โหลด .msi เปิด installer เลือกเพิ่ม PATH และ JAVA_HOME แล้ว Finish; ดู https://adoptium.net/installation/windows", "เปิด PowerShell ใหม่ ใช้ java --version และ javac --version ทั้งคู่ต้องเริ่มรุ่น 21 (patch ไม่ต้องตรงตัวเลขตัวอย่าง) ตรวจ Get-Command java และ Get-Command javac ว่ามาจาก JDK ที่ตั้งใจ", "ถ้า is not recognized ให้ดูว่าโฟลเดอร์ JDK มี bin/java.exe และ bin/javac.exe จริง จาก Settings ค้น Environment Variables เพิ่มโฟลเดอร์ bin นั้นใน User Path โดยเก็บค่าอื่นไว้ ตั้ง JAVA_HOME เป็นโฟลเดอร์ JDK ที่อยู่เหนือ bin เปิด terminal ใหม่แล้วตรวจสองคำสั่งซ้ำ", "หาก java กับ javac คนละรุ่น ไม่แก้ source ให้ตรวจ path ของทั้งคู่และจัดลำดับ JDK 21 bin ก่อนรุ่นอื่น JAVA_HOME อย่างเดียวไม่ได้บังคับ shell ให้เลือก java ตัวนั้น"] },
      { heading: "ติดตั้ง JDK 21: Linux/WSL Bash แบบ archive", text: ["บนหน้า releases เลือก Version 21, Linux, JDK, architecture ตรง uname -m (x86_64 ใช้ x64; aarch64 ใช้ aarch64) ดาวน์โหลด tar.gz บันทึกชื่อ jdk21.tar.gz ในโฟลเดอร์ java-tools ว่าง; Windows installer ไม่ใช่การติดตั้งใน WSL", "ชุดคำสั่งต่อไปนี้ทำใน java-tools ที่มี archive แล้ว แตกไฟล์ลง jdk21 และเลือก JDK นั้นใน shell นี้ ถ้ามี jdk21 อยู่แล้วให้ใช้พื้นที่ใหม่ก่อน ไม่เขียนทับ", "เก็บถาวรได้โดยเพิ่ม export JAVA_HOME เป็น path เต็มที่แตกไฟล์จริง และ export PATH บรรทัดเดิมใน ~/.bashrc ผ่าน editor; เปิด Bash ใหม่แล้วตรวจ หาก command not found ตรวจ command -v java/javac, ไฟล์ bin และ environment ก่อนแก้โค้ด", "macOS: เลือก Version 21/macOS/JDK และ architecture ให้ตรง ดาวน์โหลด .pkg ตาม https://adoptium.net/installation/macOS เปิด terminal ใหม่ ตรวจ java/javac --version; ถ้ามีหลายรุ่นใช้ /usr/libexec/java_home -v 21 หา path แล้วตั้ง JAVA_HOME และ PATH ตาม JDK ที่พบ"], language: "shell", code: `uname -m
mkdir jdk21
tar -xf jdk21.tar.gz -C jdk21 --strip-components=1
export JAVA_HOME="$PWD/jdk21"
export PATH="$JAVA_HOME/bin:$PATH"
java --version
javac --version
command -v java
command -v javac`, output: "java แสดง openjdk 21...; javac แสดง javac 21...; path สองคำสั่งอยู่ใต้ java-tools/jdk21/bin" },

      {
        heading: "1) JDK คืออะไร และต้องเป็นเวอร์ชันไหน",
        text: [
          "JDK = เครื่องมือพัฒนา (javac, java, jshell) + library มาตรฐาน คอร์สนี้ใช้ JDK 21 ซึ่งเป็น LTS (รองรับระยะยาว) เช่น Eclipse Temurin 21",
          "ตรวจด้วย java --version และ javac --version ทั้งสองต้องขึ้น 21 ถ้า javac ไม่พบ แปลว่าติดตั้งแค่ runtime หรือ PATH ยังไม่ชี้ไปที่ JDK",
        ],
      },
      {
        heading: "2) สองวิธีรันโปรแกรม",
        text: [
          "วิธีเต็ม: javac QuestStart.java (ได้ QuestStart.class) แล้ว java QuestStart (ชื่อ class ไม่ใส่ .class)",
          "วิธีลัดสำหรับไฟล์เดียว: java QuestStart.java — compile ในหน่วยความจำแล้วรันทันที ไม่มีไฟล์ .class เหลือ ใช้ได้เมื่อโปรแกรมมีไฟล์เดียว",
        ],
      },
      {
        heading: "3) อ่าน error ให้ถูกขั้น",
        text: [
          "ข้อความที่ขึ้นต้นด้วยชื่อไฟล์และเลขบรรทัด เช่น QuestStart.java:3: error: ... มาจาก javac (compile error) โปรแกรมยังไม่ได้เริ่ม",
          "ข้อความแบบ Exception in thread \"main\" ... มาจาก JVM ระหว่างรัน (runtime error) โค้ดผ่าน compile แล้วแต่พฤติกรรมผิด",
        ],
      },
    ],
    walkthrough: [
      "ไฟล์มี public class QuestStart ชื่อตรงกับไฟล์ QuestStart.java",
      "บรรทัดแรกของ main พิมพ์ Ready",
      "Runtime.version().feature() ถาม JVM ที่กำลังรันว่าเป็นเวอร์ชันหลักอะไร ได้ 21 แล้วต่อข้อความ",
    ],
    pitfalls: [
      "สั่ง java QuestStart.class: ต้องใช้ชื่อ class ไม่ใช่ชื่อไฟล์",
      "java กับ javac คนละเวอร์ชัน: ตรวจทั้งสองคำสั่ง",
      "ชื่อ public class ไม่ตรงกับชื่อไฟล์ หรือตัวพิมพ์ไม่ตรง",
      "อ่าน error ไม่ดูว่ามาจากขั้น compile หรือ run",
    ],
    checks: [
      { question: "javac Hello.java ผ่าน แต่ java Hello ได้ Exception in thread \"main\" ... เป็นปัญหาขั้นไหน", answer: "ขั้น run (runtime) โค้ดผ่านการตรวจของ javac แล้ว ต้องดูพฤติกรรมของโปรแกรมตามบรรทัดใน stack trace" },
      { question: "java Hello.java (single-file) สร้างไฟล์ Hello.class ไหม", answer: "ไม่สร้าง มัน compile ในหน่วยความจำแล้วรันทันที" },
    ],
    recap: [
      ".java → javac → .class (bytecode) → java → JVM",
      "compile error = แก้ source; runtime error = ดูพฤติกรรม",
      "JDK 21: ตรวจ java และ javac --version",
    ],
    traceHint: "แยกสองคอลัมน์: “ไฟล์ที่มีอยู่หลังคำสั่ง” และ “มีโปรแกรมทำงานไหม” แล้วไล่ javac, java, การลบ .class ทีละขั้น",
    practiceHints: [
      "ตรวจ java --version และ javac --version ก่อน ถ้ายังไม่ใช่ 21 แก้การติดตั้งก่อนเขียนโค้ด",
      "บรรทัดที่สองต่อข้อความ \"Java \" กับผลของ Runtime.version().feature()",
      "วิธีที่ 1 จะเห็น QuestStart.class ในโฟลเดอร์ (ls/dir) ส่วนวิธีที่ 2 ไม่เห็น",
    ],
    acceptance: [
      local,
      "ตรวจเอง: java --version และ javac --version แสดง 21",
      "ตรวจเอง: ทั้งสองวิธีพิมพ์ Ready และ Java 21",
      "ตรวจเอง: อธิบายได้ว่าวิธีไหนสร้าง .class",
    ],
    solutionNotes: [
      "Runtime.version().feature() คืนเวอร์ชันหลักของ JVM ที่รันอยู่ ถ้าได้ 17 แปลว่าเครื่องเรียก java ตัวอื่นที่อยู่ก่อนใน PATH",
      "ไม่ต้องใส่ --release 21 เมื่อ JDK ที่ใช้คือ 21 อยู่แล้ว (ใช้เมื่อ JDK ใหม่กว่าแต่ต้องการผลลัพธ์ที่รันบน 21 ได้)",
    ],
    reflection: [
      "error ครั้งล่าสุดที่เจอใน Java (หรือภาษาอื่น) เกิดขั้น compile หรือ run และรู้ได้จากอะไร",
    ],
    extension: "ลองเปิด jshell (มากับ JDK) พิมพ์ 7 / 2 และ \"Java\".length() เพื่อทดลอง expression โดยไม่ต้องสร้างไฟล์",
  },
  "java-main": {
    hook: "โปรแกรมแรกของซี compile ไม่ผ่านเพราะ semicolon ตัวเดียว และอีกครั้งเพราะพิมพ์ system ตัวเล็ก Java เข้มงวดกับรูปแบบมาก แต่กติกามีไม่กี่ข้อ เมื่อรู้แล้วจะอ่าน error ออกทันที",
    explain: [
      {
        heading: "1) โครงที่ทุกโปรแกรมมี",
        text: [
          "public class Main { ... } ห่อทุกอย่าง ข้างในมี method main ที่ JVM เรียกเป็นจุดเริ่ม",
          "public static void main(String[] args) — ตอนนี้จำเป็นรูปแบบตายตัวก่อน ความหมายของ static และ void จะชัดในบท methods และ OOP",
        ],
      },
      {
        heading: "2) statement, block และ comment",
        text: [
          "statement หนึ่งคำสั่งจบด้วย ; ทำงานจากบนลงล่าง ปีกกา { } รวม statement เป็น block",
          "// comment บรรทัดเดียว และ /* ... */ หลายบรรทัด compiler ข้ามไป ใช้อธิบายเหตุผล ไม่ใช่ทวนโค้ด",
        ],
      },
      {
        heading: "3) ชื่อแยกตัวพิมพ์",
        text: [
          "System, String, Main ขึ้นต้นตัวใหญ่ (ชื่อ class) ส่วน println, main ขึ้นต้นตัวเล็ก (ชื่อ method)",
          "พิมพ์ผิดแค่ตัวพิมพ์ javac ก็หาไม่เจอ ได้ “cannot find symbol” หรือ “package ... does not exist”",
        ],
      },
    ],
    walkthrough: [
      "JVM เรียก main",
      "พิมพ์สามบรรทัดตามลำดับใน source",
      "args.length เป็น 0 เพราะรันโดยไม่มีคำตามหลังชื่อไฟล์",
    ],
    pitfalls: [
      "ลืม ; ท้าย statement",
      "พิมพ์ system / string ตัวเล็ก",
      "ปีกกาไม่ครบคู่: error ไปโผล่ที่บรรทัดท้ายไฟล์",
      "เขียน statement นอก method",
    ],
    checks: [
      { question: "ถ้าลบ static ออกจาก main แล้วรันด้วย java Main.java ใน JDK 21 จะเกิดอะไร", answer: "รันไม่ได้ JDK 21 แจ้ง Error: 'main' method is not declared 'public static' (main แบบไม่ static ใน Java 21 ยังเป็นฟีเจอร์ preview ที่ต้องเปิดด้วย --enable-preview ซึ่งคอร์สนี้ไม่ใช้)" },
      { question: "javac รายงาน error ที่บรรทัดท้ายไฟล์ว่า reached end of file while parsing หมายถึงอะไร", answer: "มีปีกกาปิดไม่ครบ ตรวจคู่ { } ย้อนขึ้นไป" },
    ],
    recap: [
      "ทุกโค้ดอยู่ใน class; main คือจุดเริ่ม",
      "statement จบด้วย ; ทำงานบนลงล่าง",
      "Java แยกตัวพิมพ์เล็ก/ใหญ่",
    ],
    traceHint: "args คือรายการคำที่ตามหลังชื่อไฟล์ในคำสั่ง นับจำนวนคำเหล่านั้น",
    practiceHints: [
      "เริ่มจากโครง class Main และ main ที่ว่างแล้ว compile ให้ผ่านก่อน",
      "ใช้ System.out.println หนึ่งครั้งต่อหนึ่งบรรทัด ข้อความอยู่ใน \" \"",
      "comment ใส่เหนือ main อธิบายว่า JVM เรียก method นี้เป็นอันดับแรก",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ผลมีสามบรรทัดตรงตามโจทย์ทุกตัวอักษร",
      "ตรวจเอง: มี comment อธิบาย main หนึ่งบรรทัด",
    ],
    solutionNotes: [
      "ข้อความภาษาไทยใน println ใช้ได้เมื่อไฟล์บันทึกเป็น UTF-8 (ค่าเริ่มต้นของ JDK 18 ขึ้นไป)",
    ],
    reflection: [
      "กติกาข้อไหนของ Java ที่ต่างจากภาษาที่เคยเขียน และทำให้พลาดบ่อยที่สุด",
    ],
    extension: "รันด้วย java Main.java เช้า บ่าย แล้วเพิ่มบรรทัดที่พิมพ์ args[0] สังเกตว่าเกิดอะไรเมื่อรันโดยไม่มีคำตามหลัง",
  },
  "java-output": {
    hook: "ใบเสร็จค่าปรับแสดง 12.345000000000001 บาท และตารางคอลัมน์เบี้ยวทุกแถว ข้อมูลถูกแต่คนอ่านสับสน การจัดรูปแบบผลลัพธ์เป็นส่วนหนึ่งของความถูกต้องของโปรแกรม CLI",
    explain: [
      {
        heading: "1) print vs println vs printf",
        text: [
          "println ขึ้นบรรทัดให้ print ไม่ขึ้น printf ทำตาม format และไม่ขึ้นบรรทัดจนกว่าจะเจอ %n",
          "String.format ใช้ format เดียวกันแต่คืนข้อความ เก็บไว้ใช้ต่อหรือทดสอบได้",
        ],
      },
      {
        heading: "2) specifier ที่ใช้บ่อย",
        text: [
          "%s ข้อความ, %d จำนวนเต็ม, %.2f ทศนิยม 2 ตำแหน่ง (ปัด), %,d ใส่จุลภาคหลักพัน, %n ขึ้นบรรทัด, %% เครื่องหมาย %",
          "ความกว้าง: %8s ชิดขวา 8 ช่อง, %-8s ชิดซ้าย 8 ช่อง ใช้จัดตารางให้คอลัมน์ตรงกัน (นับเป็นจำนวนตัวอักษร ภาษาไทยที่มีสระบน/ล่างอาจดูไม่ตรงบนจอ)",
        ],
        code: java`public class Main {
    public static void main(String[] args) {
        System.out.printf("[%6.1f] [%-6s] [%,d] [%d%%]%n", 3.14159, "ab", 1234567, 50);
    }
}`,
        output: "[   3.1] [ab    ] [1,234,567] [50%]",
      },
      {
        heading: "3) ชนิดต้องตรง specifier",
        text: [
          "javac ไม่ตรวจ format string ถ้าส่ง double ให้ %d จะได้ IllegalFormatConversionException ตอนรัน",
          "ส่งค่าไม่ครบจำนวน specifier ได้ MissingFormatArgumentException ตอนรันเช่นกัน",
        ],
      },
    ],
    walkthrough: [
      "print สองครั้งต่อกันบนบรรทัดเดียว แล้ว println ปิดบรรทัด",
      "หัวตารางและแถวใช้ %-12s|%5s ความกว้างเดียวกัน คอลัมน์จึงตรง",
      "12.345 กับ %.2f ปัดเป็น 12.35",
      "String.format คืนข้อความให้ println พิมพ์",
    ],
    pitfalls: [
      "ลืม %n ใน printf บรรทัดต่อไปจึงติดกัน",
      "ใช้ %d กับ double",
      "ใช้ \\n แทน %n: ใช้ได้แต่ %n ตรงกับระบบปฏิบัติการ",
      "จำนวน argument ไม่ตรงจำนวน specifier",
    ],
    checks: [
      { question: "printf(\"%5d|%-5d|\", 42, 42) ได้อะไร", answer: "\"   42|42   |\" ซ้ายชิดขวากว้าง 5 ขวาชิดซ้ายกว้าง 5" },
      { question: "printf(\"%.2f\", 2.675) ได้ 2.68 แสดงว่า double เก็บ 2.675 ได้พอดีใช่ไหม", answer: "ไม่ใช่ ค่าที่เก็บจริงคือ 2.674999999999999822... แต่ Formatter ของ Java ปัดจากเลขฐานสิบที่สั้นที่สุดที่แทน double นั้น (2.675) ด้วย HALF_UP จึงได้ 2.68 — ผลที่แสดงสวยไม่ได้พิสูจน์ว่าค่าข้างในแม่นยำ งานเงินจึงใช้จำนวนเต็มหรือ BigDecimal" },
    ],
    recap: [
      "println/print/printf/String.format",
      "%s %d %.2f %n และความกว้าง %-8s %8d",
      "ชนิดไม่ตรง specifier = error ตอนรัน",
    ],
    traceHint: "เขียนทีละช่องตามความกว้าง: นับตัวอักษรของค่า แล้วเติมช่องว่างด้านซ้าย (ชิดขวา) หรือด้านขวา (ชิดซ้าย) ให้ครบ",
    practiceHints: [
      "ใช้ format string เดียวกันทุกแถวเพื่อให้ความกว้างเท่ากัน",
      "หัวตารางทุกคอลัมน์เป็น %s แต่ใช้ความกว้างเท่ากับแถวข้อมูล: %-14s%4s%8s%n",
      "แถวข้อมูล %-14s%4d%8.2f%n และบรรทัดสุดท้าย Total: %.2f%n",
    ],
    acceptance: [
      local,
      "ตรวจเอง: คอลัมน์ Days และ Fine ชิดขวาตรงกันทุกแถว",
      "ตรวจเอง: ทุกจำนวนเงินมีทศนิยม 2 ตำแหน่งและใช้ printf ทั้งหมด",
    ],
    solutionNotes: [
      "format string ซ้ำในสองแถว ถ้าตารางยาวขึ้นควรเก็บไว้ในค่าคงที่ final String ROW = \"%-14s%4d%8.2f%n\";",
    ],
    reflection: [
      "ข้อความ output ของโปรแกรมที่เคยเขียน มีจุดไหนที่ผู้ใช้อาจอ่านผิดได้",
    ],
    extension: "เพิ่มคอลัมน์ Due (วันที่) ด้วย %-10s และพิมพ์เส้นคั่นที่ยาวเท่าความกว้างตารางด้วย \"-\".repeat(n)",
  },
  "java-expressions": {
    hook: "แอปอ่านหนังสือแสดงความคืบหน้า 0% ตลอดจนอ่านจบ ทั้งที่สูตรดูถูกต้อง สาเหตุคือการหารสองจำนวนเต็มใน Java ตัดเศษทิ้งก่อนจะถึงการคูณ 100",
    explain: [
      {
        heading: "1) ลำดับการคำนวณ",
        text: [
          "* / % ก่อน + - และซ้ายไปขวาเมื่อระดับเท่ากัน วงเล็บบังคับลำดับได้และช่วยให้อ่านง่าย",
          "เขียนวงเล็บเพิ่มเมื่อไม่แน่ใจ ไม่มีต้นทุนด้านความเร็ว",
        ],
      },
      {
        heading: "2) การหารจำนวนเต็มและ %",
        text: [
          "int / int ได้ int (ตัดเศษไปทางศูนย์: -7 / 2 คือ -3) และ % ให้เศษที่มีเครื่องหมายตามตัวตั้ง (-7 % 2 คือ -1)",
          "ใช้ / กับ % คู่กันแปลงหน่วย: นาที → วัน + นาทีที่เหลือ",
        ],
        code: java`public class Main {
    public static void main(String[] args) {
        System.out.println(-7 / 2 + " " + -7 % 2 + " " + 7 / 2.0);
    }
}`,
        output: "-3 -1 3.5",
      },
      {
        heading: "3) + กับ String",
        text: [
          "ถ้าฝั่งใดของ + เป็น String จะเป็นการต่อข้อความ และทำจากซ้ายไปขวา ตัวเลขที่ต่อหลังข้อความจึงไม่ถูกบวกกันก่อน",
          "ใส่วงเล็บรอบการคำนวณที่ต้องทำก่อนต่อข้อความ",
        ],
      },
    ],
    walkthrough: [
      "7 / 2 ได้ 3, 7 % 2 ได้ 1, 7 / 2.0 ได้ 3.5",
      "2 + 3 * 4 คูณก่อนได้ 14 ส่วน (2 + 3) * 4 ได้ 20",
      "\"Total: \" + 1 + 2 ต่อทีละตัวได้ Total: 12 ส่วน (1 + 2) คำนวณก่อนได้ Total: 3",
      "45 วัน = 6 สัปดาห์ (45 / 7) และเหลือ 3 วัน (45 % 7)",
    ],
    pitfalls: [
      "หารจำนวนเต็มแล้วคาดหวังทศนิยม",
      "ต่อข้อความกับตัวเลขโดยไม่ใส่วงเล็บ",
      "หารด้วยศูนย์: int ได้ ArithmeticException ส่วน double ได้ Infinity หรือ NaN",
      "คิดว่าการเก็บผลใน double ทำให้การคำนวณฝั่งขวาเป็นทศนิยม",
    ],
    checks: [
      { question: "System.out.println(\"Sum: \" + 2 * 3 + 1) ได้อะไร", answer: "Sum: 61 — คูณก่อนได้ 6 แล้วต่อข้อความซ้ายไปขวา \"Sum: 6\" + 1" },
      { question: "10 / 4 * 4 ได้เท่าไร", answer: "8 เพราะ 10 / 4 = 2 (ตัดเศษ) แล้ว 2 * 4" },
    ],
    recap: [
      "* / % ก่อน + -; ซ้ายไปขวา",
      "int / int ตัดเศษ; ใช้ 2.0 เพื่อได้ทศนิยม",
      "+ กับ String = ต่อข้อความ ใส่วงเล็บรอบการคำนวณ",
    ],
    traceHint: "ใส่วงเล็บให้ทุกการคำนวณตามลำดับที่ Java ทำจริงก่อน แล้วค่อยคำนวณทีละวงเล็บ พร้อมเขียนชนิดของผลแต่ละขั้น (int/double/String)",
    practiceHints: [
      "จำนวนวันเต็มคือ minutesLate / minutesPerDay (int / int ตัดเศษให้อยู่แล้ว)",
      "นาทีที่เหลือคือ minutesLate % minutesPerDay",
      "ค่าปรับคือ days * 5 แล้วต่อข้อความทั้งหมดใน println เดียว",
    ],
    acceptance: [
      local,
      "ตรวจเอง: พิมพ์ 2 วัน 120 นาที ค่าปรับ 10 บาท",
      "ตรวจเอง: เปลี่ยน minutesLate เป็น 1439 แล้วได้ 0 วัน 1439 นาที ค่าปรับ 0 บาท โดยไม่แก้สูตร",
    ],
    solutionNotes: [
      "ตั้งชื่อตัวแปรกลาง (days, restMinutes, fine) ทำให้ println สั้นและตรวจทีละค่าได้",
    ],
    reflection: [
      "เคยเจอผลคำนวณที่ “เกือบถูก” ไหม ลองคิดว่ามาจากชนิดข้อมูลหรือลำดับการคำนวณ",
    ],
    extension: "คิดค่าปรับแบบเศษวันนับเป็นหนึ่งวัน (ปัดขึ้น) โดยใช้แค่จำนวนเต็ม: (minutesLate + minutesPerDay - 1) / minutesPerDay แล้วอธิบายว่าทำไมสูตรนี้ปัดขึ้น",
  },
  "java-variables": {
    hook: "ซีประกาศค่าปรับต่อวันไว้ห้าที่ในโปรแกรม พอกติกาเปลี่ยนก็แก้ครบแค่สี่ที่ ค่าคงที่ที่มีชื่อเดียวและแก้ที่เดียวป้องกันปัญหานี้ และ final ทำให้ compiler ช่วยกันการเปลี่ยนโดยไม่ตั้งใจ",
    explain: [
      {
        heading: "1) ชนิดอยู่กับตัวแปรตลอดชีวิต",
        text: [
          "int copies = 3; ตัวแปร copies เก็บได้เฉพาะ int เปลี่ยนค่าได้ เปลี่ยนชนิดไม่ได้",
          "var title = \"Clean Code\"; compiler อนุมานว่าเป็น String และเป็น String ตลอดไป ใช้ var เมื่อชนิดชัดจากค่าเริ่มต้น",
        ],
      },
      {
        heading: "2) กำหนดค่าก่อนใช้",
        text: [
          "ตัวแปรใน method ไม่มีค่าเริ่มต้นอัตโนมัติ อ่านก่อนกำหนดค่าเป็น compile error — Java ป้องกัน bug จากค่าขยะตั้งแต่ก่อนรัน",
          "x += 2, x -= 3, x++ เป็นรูปย่อของ x = x + 2 ฯลฯ",
        ],
      },
      {
        heading: "3) final และชื่อที่ดี",
        text: [
          "final int MAX_LOANS = 3; กำหนดได้ครั้งเดียว ใช้กับค่าที่เป็นกติกา ชื่อค่าคงที่ใช้ UPPER_SNAKE_CASE",
          "ชื่อตัวแปรใช้ camelCase และบอกความหมาย: lateDays ดีกว่า d หรือ x",
        ],
      },
    ],
    walkthrough: [
      "loans เริ่ม 0 แล้ว ++ และ += 1 ได้ 2",
      "title ต่อข้อความแล้วกำหนดกลับ ได้ Clean Code (2nd)",
      "left = 3 - 2 = 1 แล้ว loans = 2 + 1 = 3",
    ],
    pitfalls: [
      "ใช้ตัวแปรก่อนกำหนดค่า",
      "ประกาศชื่อเดิมซ้ำใน method เดียวกัน",
      "เปลี่ยนค่า final",
      "ใช้เลขเวทมนตร์ (เช่น 3, 5) กระจายแทนค่าคงที่ที่มีชื่อ",
    ],
    checks: [
      { question: "var x = 5; x = 2.5; compile ผ่านไหม", answer: "ไม่ผ่าน x ถูกอนุมานเป็น int ตั้งแต่ประกาศ จึงรับ double ไม่ได้ (incompatible types: possible lossy conversion)" },
      { question: "ทำไม int b = a; แล้วเปลี่ยน a ภายหลังจึงไม่กระทบ b", answer: "การกำหนด primitive คัดลอกค่า b เก็บสำเนาของค่าในขณะนั้น ไม่ได้ผูกกับ a" },
    ],
    recap: [
      "ชนิด ชื่อ = ค่า; ชนิดคงที่",
      "กำหนดค่าก่อนใช้; += ++",
      "final สำหรับค่าคงที่ที่มีชื่อ",
    ],
    traceHint: "ทำตารางสองคอลัมน์ (a, b) เขียนค่าหลังทุกบรรทัด ไม่ข้ามบรรทัดที่ดูเหมือนไม่เกี่ยว",
    practiceHints: [
      "ประกาศ final int SHELF_CAPACITY = 20; และ int stock = 12;",
      "ใช้ += 5, -= 3, ++ ตามลำดับเหตุการณ์",
      "บรรทัดที่สองคำนวณที่ว่างจาก SHELF_CAPACITY - stock ในวงเล็บ",
    ],
    acceptance: [
      local,
      "ตรวจเอง: พิมพ์ stock: 15/20 และ space: 5",
      "ตรวจเอง: ตัวเลข 20 ปรากฏในโค้ดครั้งเดียว (ที่ค่าคงที่)",
    ],
    solutionNotes: [
      "วงเล็บรอบ SHELF_CAPACITY - stock จำเป็น ไม่งั้นจะต่อข้อความก่อนแล้ว compile ไม่ผ่าน (String ลบ int ไม่ได้)",
    ],
    reflection: [
      "ในโปรแกรมที่เคยเขียน มีตัวเลขกติกาไหนที่ควรตั้งเป็นค่าคงที่มีชื่อ",
    ],
    extension: "เพิ่มการตรวจว่ารับเข้าเกินความจุไหม (ใช้ if หลังเรียนบท java-branch) แล้วพิมพ์ over capacity by N",
  },
  "java-primitives": {
    hook: "ระบบนับยอดยืมทำงานดีมาสามปี จนวันหนึ่งยอดรวมกลายเป็นเลขติดลบ ไม่มี error ไม่มี log เพราะ int เต็มแล้ววนกลับเงียบ ๆ การเลือกชนิดข้อมูลคือการตัดสินใจเรื่องขอบเขตของค่า",
    analogy: {
      title: "int เหมือนมาตรวัดระยะทางรถที่มีจำนวนหลักจำกัด",
      text: [
        "มาตรวัด 6 หลักแสดงได้ถึง 999999 เมื่อวิ่งต่ออีกหนึ่งกิโลเมตร ตัวเลขวนกลับเป็น 000000 โดยรถยังวิ่งปกติ ไม่มีไฟเตือน",
        "int มี 32 bit แสดงได้ถึง 2147483647 บวกอีกหนึ่งก็วนไปที่ค่าลบสุด -2147483648",
      ],
      mapping: [
        ["จำนวนหลักของมาตรวัด", "จำนวน bit ของชนิด (int 32, long 64)"],
        ["วนกลับเป็นศูนย์", "overflow วนไปอีกฝั่ง"],
        ["ไม่มีไฟเตือน", "Java ไม่ throw error สำหรับ + - * ของ int/long"],
        ["มาตรวัดที่มีหลักมากขึ้น", "เปลี่ยนเป็น long"],
      ],
      limits: "มาตรวัดวนกลับเป็นศูนย์ แต่ int เป็นเลขมีเครื่องหมายจึงวนไปค่าลบสุด และถ้าต้องการไฟเตือนก็มีให้ใช้: Math.addExact/multiplyExact throw ArithmeticException เมื่อ overflow",
    },
    explain: [
      {
        heading: "1) ชนิดที่ใช้บ่อยและช่วงค่า",
        text: [
          "int ±2.1 พันล้าน (ค่าเริ่มต้นของจำนวนเต็ม), long ±9.2 ล้านล้านล้าน (literal ใส่ L), double ทศนิยม ~15–16 หลักที่มีนัยสำคัญ, boolean, char",
          "byte/short/float มีอยู่แต่ใช้เฉพาะงานที่มีเหตุผลด้านหน่วยความจำหรือรูปแบบข้อมูล",
        ],
      },
      {
        heading: "2) ทศนิยมฐานสอง",
        text: [
          "double เก็บเลขฐานสอง 0.1 จึงเป็นค่าประมาณ ผลบวกสะสมความคลาดเคลื่อนเล็ก ๆ และ == กับทศนิยมเชื่อไม่ได้",
          "เงิน: เก็บเป็นจำนวนเต็มของหน่วยเล็กสุด (สตางค์) ด้วย long หรือใช้ java.math.BigDecimal",
        ],
      },
      {
        heading: "3) overflow ที่ต้นทาง",
        text: [
          "การคำนวณใช้ชนิดของตัวถูกดำเนินการ ไม่ใช่ชนิดของตัวแปรที่รับผล long x = a * b; ยัง overflow ถ้า a และ b เป็น int",
          "แก้ที่ต้นทาง: ใส่ L ที่ตัวแรกของการคำนวณ เช่น 1L * a * b (การแปลงชนิดด้วย (long) จะเรียนในบท java-casting)",
        ],
        code: java`public class Main {
    public static void main(String[] args) {
        int a = 100_000;
        long wrong = a * a;
        long right = 1L * a * a;
        System.out.println(wrong + " " + right);
    }
}`,
        output: "1410065408 10000000000",
      },
    ],
    walkthrough: [
      "Integer.MAX_VALUE + 1 วนไปเป็น -2147483648",
      "3_000_000_000L เกิน int จึงต้องเป็น long",
      "0.1 + 0.2 ได้ 0.30000000000000004 ส่วนสตางค์ 10 + 20 ได้ 30 พอดี",
      "ถ้าต้องการให้ overflow ไม่เงียบ ใช้ Math.addExact ซึ่งโยน ArithmeticException (บท java-exceptions-basic สอนการจับ)",
    ],
    pitfalls: [
      "ใช้ int กับยอดสะสมที่โตได้ไม่จำกัด",
      "ใช้ double กับเงินแล้วเทียบด้วย ==",
      "ลืม L ที่ literal ใหญ่: integer number too large",
      "แก้ overflow ด้วยการเปลี่ยนชนิดตัวแปรรับผลอย่างเดียว",
    ],
    checks: [
      { question: "long total = Integer.MAX_VALUE + 1; ได้ค่าอะไร", answer: "-2147483648 เพราะบวกกันแบบ int และ overflow ก่อนจะถูกแปลงเป็น long" },
      { question: "ทำไมยอดเงินควรเก็บเป็นสตางค์แบบ long แทนบาทแบบ double", answer: "จำนวนเต็มแทนค่าได้พอดีทุกค่า บวกลบไม่มีความคลาดเคลื่อน ส่วน double แทน 0.1 บาทได้ไม่พอดี" },
    ],
    recap: [
      "int/long/double/boolean/char และช่วงค่า",
      "overflow เงียบ; Math.*Exact ให้ error",
      "เงิน = long (หน่วยย่อย) หรือ BigDecimal",
    ],
    traceHint: "คำนวณค่าจริงทางคณิตศาสตร์ก่อน แล้วเทียบกับ 2,147,483,647 ถ้าเกินและทุกตัวเป็น int ผลจะผิด",
    practiceHints: [
      "ยอด 2,500,000,000 เกิน int ต้องประกาศเป็น long พร้อม L ที่ literal",
      "10.10 บาท = 1010 สตางค์ เก็บสามรายการเป็น long แล้วบวก",
      "หาร 100.0 เฉพาะตอนพิมพ์ด้วย printf(\"%.2f บาท%n\", ...)",
    ],
    acceptance: [
      local,
      "ตรวจเอง: บรรทัดแรก 2500000001",
      "ตรวจเอง: บรรทัดที่สอง 60.60 บาท และในโค้ดไม่มี double ระหว่างการบวก",
    ],
    solutionNotes: [
      "การหาร 100.0 ตอนแสดงผลอาจมีความคลาดเคลื่อนของ double แต่ %.2f ปัดให้ตรงสำหรับค่าระดับนี้ การคำนวณสะสมทั้งหมดเป็นจำนวนเต็มจึงไม่สะสมความคลาดเคลื่อน",
    ],
    reflection: [
      "ข้อมูลไหนในระบบที่เคยทำมีโอกาสโตเกิน int หรือเป็นเงินที่ไม่ควรเก็บเป็น double",
    ],
    extension: "ลองใช้ java.math.BigDecimal: new BigDecimal(\"10.10\").add(new BigDecimal(\"20.20\")) แล้วเทียบกับการใช้ new BigDecimal(10.10) (constructor จาก double) ว่าต่างกันอย่างไร",
  },
  "java-string": {
    hook: "คำสั่ง help ของซีใช้ได้ตอนทดสอบด้วยค่าที่เขียนในโค้ด แต่พอรับจากผู้ใช้จริงกลับ “ไม่รู้จักคำสั่ง” ทุกครั้ง เพราะ == เทียบว่าเป็น object เดียวกัน ไม่ใช่ข้อความเดียวกัน",
    analogy: {
      title: "String กับ == เหมือนเทียบที่อยู่บ้านแทนเทียบหน้าตาบ้าน",
      text: [
        "บ้านสองหลังหน้าตาเหมือนกันทุกอย่าง แต่อยู่คนละที่อยู่ ถ้าถามว่า “ที่อยู่เดียวกันไหม” คำตอบคือไม่ แม้หน้าตาจะเหมือน",
        "ตัวแปร String เก็บ “ที่อยู่” ของ object ข้อความ == เทียบที่อยู่ ส่วน equals เปิดดูว่าข้างในตัวอักษรเหมือนกันไหม",
      ],
      mapping: [
        ["ที่อยู่บ้าน", "reference ที่ตัวแปรเก็บ"],
        ["หน้าตาบ้าน", "ตัวอักษรใน String"],
        ["ถามว่าที่อยู่เดียวกันไหม", "a == b"],
        ["เทียบหน้าตา", "a.equals(b)"],
      ],
      limits: "Java เก็บ literal ที่เหมือนกันไว้ที่เดียว (string pool) \"help\" == \"help\" จึงอาจเป็น true ทำให้ bug ซ่อนตัวตอนทดสอบด้วยค่าคงที่ — แต่ข้อความจาก input หรือการต่อข้อความตอนรันเป็น object ใหม่ ห้ามพึ่งพฤติกรรมนี้",
    },
    explain: [
      {
        heading: "1) method ไม่แก้ตัวเดิม",
        text: [
          "String เปลี่ยนไม่ได้ (immutable) strip/toUpperCase/replace ไม่แก้ตัวเดิมแต่คืนผลออกมา (ถ้าไม่มีอะไรต้องเปลี่ยนอาจคืน object เดิม) ต้องรับผลไว้เสมอ",
          "ข้อดี: ส่ง String ไปที่ไหนก็ไม่มีใครแก้ของเราได้",
        ],
      },
      {
        heading: "2) ตำแหน่งและการตัด",
        text: [
          "charAt(i), substring(begin, end) (ไม่รวม end), indexOf(x) (-1 ถ้าไม่พบ), length()",
          "สำหรับคำสั่งสองส่วน ให้หา index ช่องว่างด้วย indexOf แล้ว substring ก่อน/หลังตำแหน่งนั้น strip ส่วนรหัสซ้ำเพื่อรับช่องว่างซ้อน กิจกรรมนี้ยังไม่ใช้ split/array/regex",
        ],
      },
      {
        heading: "3) เทียบข้อความ",
        text: [
          "equals ตรงทุกตัวอักษร, equalsIgnoreCase ไม่สนตัวพิมพ์, compareTo เรียงตามพจนานุกรม (ค่าลบ/0/บวก)",
          "ถ้าตัวแปรอาจเป็น null ให้เขียนค่าคงที่ไว้หน้า: \"help\".equals(command) ไม่ล่มแม้ command เป็น null",
        ],
        code: java`public class Main {
    public static void main(String[] args) {
        String command = null;
        System.out.println("help".equals(command));
        System.out.println("apple".compareTo("banana") < 0);
    }
}`,
        output: "false\ntrue",
      },
    ],
    walkthrough: [
      "raw.strip(); ไม่ได้เก็บผล raw จึงยังมีช่องว่าง",
      "title = raw.strip() ได้ข้อความยาว 10 ตัว",
      "substring(0, 5) ได้ Clean, indexOf(\"Code\") ได้ 6, indexOf(\"Java\") ได้ -1",
      "new String(...) สร้าง object ใหม่ == จึงเป็น false แต่ equals เป็น true",
      "indexOf(\",\") ใน a,b,c ได้ 1 เพราะ comma แรกอยู่ตำแหน่ง 1",
    ],
    pitfalls: [
      "เทียบ String ด้วย ==",
      "เรียก method แล้วไม่เก็บผล",
      "เรียก method บนตัวแปรที่เป็น null: NullPointerException",
      "indexOf ไม่พบได้ -1 ต้องกำหนดสัญญาของข้อมูลก่อนใช้เป็นขอบ substring กิจกรรมนี้รับคำสั่งและรหัสที่มีช่องว่างคั่นแน่นอน",
    ],
    checks: [
      { question: "\"a,b,c\".indexOf(\",\") ได้เท่าไร?", answer: "1 เพราะ index เริ่ม 0 และ comma แรกอยู่หลังa" },
      { question: "ทำไม \"help\".equals(command) ปลอดภัยกว่า command.equals(\"help\")", answer: "ถ้า command เป็น null แบบแรกได้ false ส่วนแบบหลังได้ NullPointerException" },
    ],
    recap: [
      "String immutable: รับผลของ method ไว้เสมอ",
      "equals/equalsIgnoreCase ไม่ใช่ ==",
      "index เริ่ม 0 substring ไม่รวม end; indexOf หาไม่พบได้ -1",
    ],
    traceHint: "เขียนค่าของแต่ละตัวแปรหลังทุกบรรทัด สังเกตบรรทัดที่เรียก method แต่ไม่มี = รับผล — บรรทัดนั้นไม่เปลี่ยนอะไร",
    practiceHints: [
      "ตัดช่องว่างรอบนอกก่อน แล้วหาตำแหน่งของช่องว่างแรกในข้อความที่ตัดแล้ว คำสั่งคือส่วนก่อนตำแหน่งนั้น",
      "รหัสคือส่วนหลังตำแหน่งนั้น ตัดช่องว่างซ้อนอีกครั้ง แล้วแปลงตัวพิมพ์ตามโจทย์ ส่วน valid ใช้ equals เทียบกับ borrow",
      "ลำดับโค้ด: cleaned = line.strip(); space = cleaned.indexOf(\" \"); command = cleaned.substring(0, space).toLowerCase(); id = cleaned.substring(space + 1).strip().toUpperCase(); แล้วพิมพ์ valid= ตามด้วย command.equals(\"borrow\")",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ได้ command=borrow id=B001 และ valid=true",
      "ตรวจเอง: ลองเปลี่ยน line เป็น \"return   b002\" แล้วได้ valid=false โดยไม่ล่ม",
    ],
    solutionNotes: [
      "กิจกรรมนี้กำหนดว่ามีคำสั่งและรหัสคั่นด้วยช่องว่าง ถ้าไม่มีช่องว่าง indexOf ได้ -1 แล้ว substring ใช้ขอบนั้นไม่ได้ ต้องตรวจและกำหนดพฤติกรรมผิดข้อมูลใน java-branch/java-exceptions-basic ก่อนรองรับกรณีนี้",
    ],
    reflection: [
      "input แบบไหนจากผู้ใช้จริงที่โปรแกรมนี้ยังรับมือไม่ได้",
    ],
    extension: "หลังเรียน java-branch กลับมาตรวจกรณีไม่มีช่องว่างคั่น ให้แสดงข้อความระบุว่าขาดรหัสแทนพยายาม substring ด้วย index-1 เปรียบ expected/actual และอธิบายว่ากฎข้อมูลเปลี่ยนอย่างไร",
  },
  "java-casting": {
    hook: "ค่าเฉลี่ยรีวิว 4.5 ดาวกลายเป็น 22.0 ในหน้าจอ เพราะสองบรรทัดเล็ก ๆ: ต่อข้อความก่อนแปลงเป็นตัวเลข และหารจำนวนเต็มก่อนเก็บเป็นทศนิยม การแปลงชนิดต้องตั้งใจทุกครั้ง",
    explain: [
      {
        heading: "1) แปลงอัตโนมัติจากแคบไปกว้าง",
        text: [
          "int → long → double ทำให้อัตโนมัติ (widening) และใน expression ผสมชนิดค่าจะถูกยกเป็นชนิดที่กว้างกว่า ส่วนใหญ่ค่าไม่เปลี่ยน แต่ long ที่ใหญ่เกิน 2^53 เมื่อกลายเป็น double จะถูกปัด (double เก็บตัวเลขนัยสำคัญได้ประมาณ 15–16 หลัก)",
          "ถ้าอาจเสียข้อมูล (double → int, long → int) ต้อง cast เอง compiler บังคับให้ตั้งใจ",
        ],
      },
      {
        heading: "2) cast ตัด ไม่ใช่ปัด",
        text: [
          "(int) 2.99 ได้ 2 และ (int) -2.99 ได้ -2 (ตัดไปทางศูนย์) ใช้ Math.round เมื่อต้องการปัด (คืน long จาก double)",
          "cast มีลำดับสูงกว่า * / : (int) price * 3 คือ cast ก่อนคูณ",
        ],
      },
      {
        heading: "3) ข้อความ ↔ ตัวเลข",
        text: [
          "Integer.parseInt(\"42\") ต้องเป็นตัวเลขล้วน ช่องว่างรอบนอกก็ไม่ได้ ส่วน Double.parseDouble(\" 4.5 \") ยอมรับช่องว่างรอบนอก — strip() ก่อน parse ทุกครั้งเพื่อไม่ต้องจำความต่างนี้",
          "ข้อความผิดรูปแบบได้ NumberFormatException ตอนรัน บท java-exceptions-basic จะจับและขอ input ใหม่",
        ],
      },
    ],
    walkthrough: [
      "250 / 3 หารแบบ int ได้ 83 แล้วจึงเป็น 83.0 ส่วน 250 / 3.0 ได้ 83.333...",
      "(int) ตัดเศษ, Math.round ปัด (2.5 → 3)",
      "(int) ของ long ที่เกินช่วงได้เลขผิด",
      "parseInt/parseDouble แปลงข้อความ และ (char) ('A' + 2) ได้ C",
    ],
    pitfalls: [
      "หารก่อนแปลงเป็น double",
      "คิดว่า (int) ปัดเศษ",
      "ต่อข้อความก่อน parse",
      "parseInt ข้อความที่มีช่องว่างหรือหน่วย เช่น \"12 \" หรือ \"12 บาท\"",
    ],
    checks: [
      { question: "(int) 7.9 + (int) 0.5 ได้เท่าไร", answer: "7 เพราะ (int) 7.9 = 7 และ (int) 0.5 = 0" },
      { question: "double avg = (double) (sum / count); ถูกไหมเมื่อ sum, count เป็น int", answer: "ไม่ถูก การหารในวงเล็บทำแบบ int ก่อน cast ต้องเป็น (double) sum / count" },
    ],
    recap: [
      "widening อัตโนมัติ; narrowing ต้อง cast",
      "cast ตัดเศษ; Math.round ปัด",
      "parseInt/parseDouble กับข้อความที่ strip แล้ว",
    ],
    traceHint: "เขียนชนิดของทุกค่าย่อยใน expression ทีละขั้น จุดที่ int / int เกิดขึ้นคือจุดที่เศษหาย",
    practiceHints: [
      "parse แต่ละตัวแล้วบวก ไม่ต่อข้อความก่อน",
      "average = sum / 4.0 เพื่อให้หารแบบทศนิยม",
      "printf %.2f, Math.round(average) และ (int) average",
    ],
    acceptance: [
      local,
      "ตรวจเอง: พิมพ์ 4.25, 4, 4",
      "ตรวจเอง: เปลี่ยนคะแนนเป็น \"5\", \"5\", \"4\", \"5\" แล้วได้ 4.75, 5, 4",
    ],
    solutionNotes: [
      "Math.round(4.75) ได้ 5 แต่ (int) 4.75 ได้ 4 — สองบรรทัดสุดท้ายแสดงความต่างระหว่างปัดกับตัด",
    ],
    reflection: [
      "ในหน้าจอที่แสดงคะแนนเฉลี่ย ควรปัดหรือตัด และใครควรเป็นผู้ตัดสิน",
    ],
    extension: "แสดงดาวเป็นตัวอักษร: \"★\".repeat((int) average) + \"☆\".repeat(5 - (int) average)",
  },
  "java-scanner": {
    hook: "โปรแกรมถามชื่อหนังสือแล้วข้ามไปเฉย ๆ ทุกครั้งหลังถามจำนวน ผู้ใช้คิดว่าโปรแกรมพัง แต่ทุกบรรทัดทำตามที่เขียน — nextInt ทิ้งตัวขึ้นบรรทัดไว้ให้ nextLine อ่าน",
    analogy: {
      title: "Scanner เหมือนคนอ่านกระดาษม้วนยาวทีละส่วน",
      text: [
        "input ทั้งหมดคือกระดาษม้วนเดียวที่มีเครื่องหมาย “ขึ้นบรรทัด” คั่น nextLine ตัดตั้งแต่จุดที่อ่านค้างไว้ถึงเครื่องหมายถัดไปแล้วทิ้งเครื่องหมายนั้น",
        "nextInt ตัดแค่ตัวเลข แล้วหยุดอยู่หน้าเครื่องหมายขึ้นบรรทัด nextLine ครั้งต่อไปจึงเจอเครื่องหมายทันทีและได้ข้อความว่าง",
      ],
      mapping: [
        ["กระดาษม้วน", "stream ของ System.in"],
        ["ตำแหน่งที่อ่านค้าง", "ตำแหน่งปัจจุบันของ Scanner"],
        ["ตัดถึงเครื่องหมายขึ้นบรรทัด", "nextLine()"],
        ["ตัดแค่ตัวเลข", "nextInt()"],
      ],
      limits: "กระดาษจริงมีครบตั้งแต่ต้น แต่ input จากคีย์บอร์ดมาทีละบรรทัดเมื่อผู้ใช้กด Enter Scanner จึงรอ (block) จนกว่าจะมีข้อมูลหรือ input จบ",
    },
    explain: [
      {
        heading: "1) อ่านทีละบรรทัดแล้วแปลงเอง",
        text: [
          "String line = scanner.nextLine(); แล้ว Integer.parseInt(line.strip()) ทำให้ตำแหน่งการอ่านคาดเดาได้เสมอ",
          "ใช้ Scanner ตัวเดียวตลอดโปรแกรม",
        ],
      },
      {
        heading: "2) input หมดเมื่อไร",
        text: [
          "hasNextLine() เป็น false เมื่อไม่มีบรรทัดเหลือ (ปลายไฟล์ หรือกด Ctrl+D บน Linux/macOS, Ctrl+Z แล้ว Enter บน Windows)",
          "เรียก nextLine() ตอนไม่มีบรรทัดเหลือได้ NoSuchElementException",
        ],
      },
      {
        heading: "3) ทดสอบโดยไม่ต้องพิมพ์",
        text: [
          "บันทึก input ลงไฟล์ input.txt แล้วรัน (PowerShell: Get-Content input.txt | java Main.java ; Bash/WSL: java Main.java < input.txt) ได้ผลเหมือนเดิมทุกครั้ง",
          "เมื่อ input มาจากไฟล์ ข้อความคำถาม (print) จะอยู่ติดกันเพราะไม่มีการกด Enter ของผู้ใช้แทรก — expected output ของบทนี้จึงมี ชื่อ: จำนวนเล่ม: อยู่บรรทัดเดียว",
        ],
      },
    ],
    walkthrough: [
      "input คือ \"  Sea \" และ \"3\"",
      "บรรทัดแรก strip เหลือ Sea, บรรทัดที่สอง parse ได้ 3",
      "คำถามสองข้อพิมพ์ด้วย print จึงต่อกัน แล้ว println() ว่างขึ้นบรรทัดใหม่",
      "hasNextLine() เป็น false เพราะ input หมดแล้ว",
    ],
    pitfalls: [
      "ผสม nextInt กับ nextLine",
      "parse โดยไม่ strip",
      "สร้าง Scanner ใหม่ในทุก method",
      "เรียก nextLine ต่อหลัง input หมด",
    ],
    checks: [
      { question: "input คือ 5 ⏎ (บรรทัดเดียว) แล้วโปรแกรมเรียก nextLine สองครั้ง ครั้งที่สองเกิดอะไร", answer: "NoSuchElementException: No line found เพราะไม่มีบรรทัดเหลือ ควรตรวจ hasNextLine ก่อน" },
      { question: "ทำไมการทดสอบด้วยไฟล์ input.txt ดีกว่าพิมพ์เอง", answer: "รันซ้ำได้ผลเดิมทุกครั้ง เก็บกรณีทดสอบไว้ และเทียบ output กับไฟล์ที่คาดไว้ได้" },
    ],
    recap: [
      "nextLine ทุกครั้ง + parse เอง",
      "hasNextLine ตรวจว่า input หมดหรือยัง",
      "ทดสอบด้วย input redirection",
    ],
    traceHint: "เขียน input เป็นแถวตัวอักษรรวมเครื่องหมาย ⏎ แล้วขีดเส้นตำแหน่งที่ Scanner อ่านถึงหลังแต่ละคำสั่ง",
    practiceHints: [
      "อ่านสามครั้งด้วย nextLine().strip()",
      "บรรทัดที่สองใช้ Integer.parseInt บรรทัดที่สามใช้ Double.parseDouble",
      "พิมพ์ด้วย printf(\"%s: %d วัน ค่าปรับ %.2f บาท%n\", ...) และทดสอบด้วยไฟล์ input.txt สามบรรทัด (Clean Code, 3, 2.5) โดย PowerShell ใช้ Get-Content input.txt | java Main.java ส่วน Bash/WSL ใช้ java Main.java < input.txt",
    ],
    acceptance: [
      local,
      "ตรวจเอง: input Clean Code / 3 / 2.5 ได้ Clean Code: 3 วัน ค่าปรับ 7.50 บาท",
      "ตรวจเอง: ใส่ช่องว่างรอบตัวเลข (เช่น \" 3 \") แล้วยังได้ผลเดิม",
    ],
    solutionNotes: [
      "Double.parseDouble รับจุดทศนิยมเสมอ (ไม่ขึ้นกับ locale) ต่างจาก scanner.nextDouble ที่ขึ้นกับ locale ของเครื่อง",
    ],
    reflection: [
      "ถ้าผู้ใช้พิมพ์ \"สาม\" ในบรรทัดจำนวนวัน ตอนนี้โปรแกรมเป็นอย่างไร และควรเป็นอย่างไร",
    ],
    extension: "ให้โปรแกรมอ่านหลายรายการจนหมด input (บรรทัดละสามช่องคั่นด้วย ,) แล้วพิมพ์ยอดค่าปรับรวม",
  },
  "java-branch": {
    hook: "ระบบห้องสมุดคิดค่าปรับผู้สูงอายุเท่ากับคนทั่วไปมาตลอดหนึ่งเดือน เพราะเงื่อนไขทั่วไปถูกวางไว้ก่อนเงื่อนไขพิเศษ กิ่ง if แรกที่จริงชนะเสมอ",
    explain: [
      {
        heading: "1) ลำดับกิ่งคือส่วนหนึ่งของกติกา",
        text: [
          "if/else if ตรวจจากบนลงล่างและทำกิ่งแรกที่จริงเท่านั้น วางกรณีพิเศษหรือกรณีที่ต้องหยุดก่อน (guard) ไว้บนสุด",
          "กรณีที่ไม่มีอะไรต้องทำ (เช่น ไม่ได้คืนช้า) ตรวจแล้วจบก่อน ทำให้กิ่งที่เหลืออ่านง่าย",
        ],
      },
      {
        heading: "2) รวมเงื่อนไข",
        text: [
          "&& จริงเมื่อทั้งคู่จริง, || จริงเมื่ออย่างน้อยหนึ่งจริง, ! กลับค่า ใส่วงเล็บเมื่อผสม && กับ ||",
          "short-circuit: a != null && a.isEmpty() ปลอดภัยเพราะถ้า a เป็น null จะไม่เรียก isEmpty",
        ],
      },
      {
        heading: "3) ช่วงค่าและขอบ",
        text: [
          "“ต่ำกว่า 12” คือ age < 12, “60 ขึ้นไป” คือ age >= 60 ทดสอบค่าที่ขอบเสมอ: 11, 12, 59, 60",
          "ternary (cond ? a : b) เหมาะกับการเลือกค่าสั้น ๆ ไม่เหมาะกับกิ่งที่มีหลายขั้น",
        ],
      },
    ],
    walkthrough: [
      "member เป็น true จึงข้ามกิ่งแรก",
      "overdueDays เป็น 0 จึงข้ามกิ่งที่สอง",
      "loans 2 ไม่ถึง 3 จึงเข้า else ได้ยืมได้อีก 1 เล่ม",
      "title == null เป็นจริง || จึงไม่เรียก isBlank",
    ],
    pitfalls: [
      "วางเงื่อนไขทั่วไปก่อนเงื่อนไขเฉพาะ",
      "ไม่ใส่ { } แล้วเพิ่มบรรทัดภายหลัง",
      "ใช้ = แทน == ในเงื่อนไข (กับ int เป็น compile error แต่กับ boolean ผ่านและเป็น bug)",
      "ไม่ทดสอบค่าที่ขอบ",
    ],
    checks: [
      { question: "boolean done = false; if (done = true) { ... } เกิดอะไร", answer: "compile ผ่าน และกำหนด done เป็น true แล้วเข้ากิ่งเสมอ ต้องเขียน if (done) หรือ done == true" },
      { question: "age = 60 ควรได้อัตรากี่บาทตามโจทย์ และเงื่อนไขไหนตรวจขอบนี้", answer: "2 บาท ด้วย age >= 60 (ถ้าเขียน age > 60 จะได้ 5 บาทซึ่งผิด)" },
    ],
    recap: [
      "กิ่งแรกที่จริงชนะ: เฉพาะก่อนทั่วไป",
      "&& || ! พร้อม short-circuit",
      "ทดสอบค่าที่ขอบทุกเงื่อนไข",
    ],
    traceHint: "ไล่เงื่อนไขของแต่ละกิ่งจากบนลงล่าง เขียน true/false จนเจอกิ่งแรกที่ true แล้วหยุด",
    practiceHints: [
      "ตรวจ lateDays <= 0 ก่อนเป็นกิ่งแรก",
      "เลือกอัตราด้วย (age < 12 || age >= 60) ? 2 : 5",
      "ค่าปรับคือ Math.min(lateDays * perDay, 100)",
    ],
    acceptance: [
      local,
      "ตรวจเอง: 70 ปี 40 วัน → ค่าปรับ 80 บาท",
      "ตรวจเอง: 30 ปี 40 วัน → ค่าปรับ 100 บาท, 11 ปี 3 วัน → ค่าปรับ 6 บาท, 30 ปี 0 วัน → ไม่มีค่าปรับ",
    ],
    solutionNotes: [
      "Math.min ทำหน้าที่เพดานแทน if อีกชั้น ทำให้มีกิ่งเดียวที่คำนวณ",
    ],
    reflection: [
      "กติกาในชีวิตจริงที่มีข้อยกเว้นซ้อนกันหลายชั้น ลองเขียนเป็นลำดับ if ดูว่าข้อไหนต้องมาก่อน",
    ],
    extension: "เพิ่มกติกา “สมาชิกพรีเมียมไม่เสียค่าปรับ 3 วันแรก” โดยรับ input บรรทัดที่สามเป็น yes/no",
  },
  "java-switch": {
    hook: "เมนูคำสั่งเขียนด้วย if/else if สิบกิ่ง แต่ละกิ่งเรียก equals พอเพิ่มคำสั่งย่อ ls ให้ list ก็ต้องแก้หลายจุด switch แบบใหม่ของ Java รวมทุกตัวเลือกไว้ในที่เดียวและอ่านได้เหมือนตาราง",
    explain: [
      {
        heading: "1) switch แบบลูกศร",
        text: [
          "case \"list\", \"ls\" -> ... หลาย label ต่อหนึ่งเคส ฝั่งขวาเป็น expression, block { } หรือ throw",
          "ไม่ไหลต่อไปเคสถัดไป จึงไม่ต้องมี break",
        ],
      },
      {
        heading: "2) switch ที่คืนค่า",
        text: [
          "String reply = switch (command) { ... }; ทุกเคสต้องให้ค่า และต้องครอบคลุมทุกค่าที่เป็นไปได้ (มี default สำหรับ String/int)",
          "เคสที่ต้องหลายบรรทัดใช้ { ...; yield ค่า; }",
        ],
      },
      {
        heading: "3) switch แบบเก่า",
        text: [
          "case x: ... break; ยังพบในโค้ดเก่า ถ้าลืม break จะไหลไปทำเคสถัดไป (fall-through)",
          "โค้ดใหม่ในคอร์สนี้ใช้แบบลูกศรทั้งหมด",
        ],
      },
    ],
    walkthrough: [
      "input มาจาก stdin ทีละบรรทัด switch ใช้ตัวพิมพ์เล็ก LS จึงตรงเคส list/ls แต่ข้อความตอบกลับยังแสดง raw ตามที่พิมพ์",
      "help ใช้ block และ yield",
      "Dance ไม่ตรงเคสใดจึงเข้า default และแสดงตามตัวพิมพ์เดิม",
      "switch แบบเก่าของ day = 6 ไหลไปเคส 7 เพราะไม่มี break",
    ],
    pitfalls: [
      "switch expression ที่ไม่มี default",
      "switch บนค่าที่เป็น null โดยไม่มี case null: NullPointerException",
      "ลืม break ใน switch แบบเก่า",
      "ใส่ logic ยาวในเคสแทนการเรียก method",
    ],
    checks: [
      { question: "ทำไม switch expression บน String ต้องมี default แต่บน enum ที่ครบทุกค่าไม่ต้องมี", answer: "String มีค่าเป็นไปได้ไม่จำกัด compiler รู้ว่าเคสไม่ครบ ส่วน enum มีค่าจำกัด ถ้าระบุครบทุกค่า compiler ยอมรับว่าครอบคลุมแล้ว" },
      { question: "case \"add\" -> System.out.println(\"a\"); ทำงานแล้วไปต่อที่เคสถัดไปไหม", answer: "ไม่ เคสแบบ -> ทำแค่ฝั่งขวาแล้วออกจาก switch" },
    ],
    recap: [
      "case a, b -> ...; ไม่มี fall-through",
      "switch expression ต้องครอบคลุม + yield ใน block",
      "แบบเก่าต้องมี break",
    ],
    traceHint: "สำหรับแต่ละค่า หาเคสแรกที่ตรง (หรือ default) แล้วเขียนผล สำหรับแบบเก่า ไล่ต่อไปจนเจอ break",
    practiceHints: [
      "เก็บ raw = บรรทัดหลัง strip() ไว้แสดงผล และ command = raw.toLowerCase() ไว้เลือกเคส ตรวจบรรทัดว่างแล้ว continue ก่อนถึง switch",
      "switch expression มีสี่เคส: add, list/ls, quit, default",
      "หลังพิมพ์ผล ถ้าเป็น quit ให้ break ออกจาก while",
    ],
    acceptance: [
      local,
      "ตรวจเอง: input add / LS / (ว่าง) / Jump / quit / add ได้สี่บรรทัดตามโจทย์ (unknown: Jump คงตัวพิมพ์เดิม) และ add ตัวสุดท้ายไม่ถูกประมวลผล",
    ],
    solutionNotes: [
      "break ภายใน switch expression ใช้ไม่ได้ (ต้องคืนค่าด้วย yield) ส่วนใน switch statement แบบลูกศรใช้ break ได้และออกแค่จาก switch — break ในเฉลยจึงวางไว้หลัง switch expression เพื่อออกจาก while",
      "reply ของคำสั่งที่ไม่รู้จักใช้ raw (ข้อความที่พิมพ์ หลังตัดช่องว่าง) ส่วนการเลือกเคสใช้ตัวพิมพ์เล็ก ผู้ใช้จึงเห็นสิ่งที่ตัวเองพิมพ์จริง",
    ],
    reflection: [
      "ถ้าคำสั่งมีเพิ่มเป็น 20 คำสั่ง switch นี้ยังอ่านง่ายไหม และอะไรจะช่วยได้",
    ],
    extension: "เพิ่มคำสั่ง help ที่พิมพ์คำสั่งทั้งหมดจาก array String[] COMMANDS และใช้ array เดียวกันตรวจว่าเป็นคำสั่งที่รู้จักไหม",
  },
  "java-loops": {
    hook: "ค่าปรับขั้นบันไดคำนวณผิดไปหนึ่งวันทุกครั้ง ไม่มี error ไม่มีอะไรล่ม ผู้ใช้เพิ่งมาเห็นตอนเทียบกับใบเสร็จ การไล่ loop ทีละรอบบนกระดาษคือวิธีจับ off-by-one ก่อนผู้ใช้",
    explain: [
      {
        heading: "1) for หรือ while",
        text: [
          "for เมื่อรู้จำนวนรอบหรือไล่ตัวนับ (ทุกวันจาก 1 ถึง n) while เมื่อหยุดตามเงื่อนไขที่ไม่รู้ล่วงหน้า (อ่านจนหมด input, อ่านหนังสือจนจบ)",
          "ทุก loop ตอบให้ได้สามข้อ: เริ่มที่ค่าอะไร, หยุดเมื่อไร, อะไรเปลี่ยนในแต่ละรอบ",
        ],
      },
      {
        heading: "2) ตัวสะสมและเพดาน",
        text: [
          "ประกาศตัวสะสมนอก loop ถ้าประกาศข้างในจะเริ่มใหม่ทุกรอบ",
          "break เมื่อผลไม่เปลี่ยนแล้ว (ถึงเพดาน) ช่วยให้เห็นเจตนาและไม่ทำงานเกินจำเป็น",
        ],
      },
      {
        heading: "3) loop ซ้อน",
        text: [
          "loop ใน loop ทำ (รอบนอก × รอบใน) ครั้ง ใช้กับตาราง เช่น ชั้นหนังสือ × ช่อง",
          "break ออกได้แค่ loop ที่อยู่ข้างในสุด",
        ],
        code: java`public class Main {
    public static void main(String[] args) {
        for (int shelf = 1; shelf <= 2; shelf++) {
            for (int slot = 1; slot <= 3; slot++) {
                System.out.print(shelf + "-" + slot + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "1-1 1-2 1-3 \n2-1 2-2 2-3 ",
      },
    ],
    walkthrough: [
      "for บวก day * 2 ห้ารอบ: 2 + 4 + 6 + 8 + 10 = 30",
      "while ลด pages ครั้งละ 35 สี่รอบจน pages ≤ 0",
      "loop ชั้นข้ามเลขคู่ด้วย continue และหยุดที่ชั้น 5 ด้วย break จึงพิมพ์แค่ชั้น 1 และ 3",
    ],
    pitfalls: [
      "off-by-one: < กับ <= และเริ่มที่ 0 กับ 1",
      "เงื่อนไขหยุดใช้ != กับค่าที่อาจข้าม",
      "ประกาศตัวสะสมใน loop",
      "แก้ตัวนับของ for ภายใน body",
    ],
    checks: [
      { question: "for (int i = 0; i < 5; i += 2) ทำกี่รอบ และ i มีค่าอะไรบ้าง", answer: "3 รอบ: i = 0, 2, 4" },
      { question: "while (count < 3) { System.out.println(count); } เมื่อ count เริ่มที่ 0 เกิดอะไร", answer: "loop ไม่รู้จบ พิมพ์ 0 ไปเรื่อย ๆ เพราะไม่มีอะไรเปลี่ยน count" },
    ],
    recap: [
      "for = รู้รอบ; while = หยุดตามเงื่อนไข",
      "ตัวสะสมอยู่นอก loop; break/continue",
      "ไล่ทีละรอบเพื่อจับ off-by-one",
    ],
    traceHint: "ทำตาราง: รอบที่, ค่าตัวแปรก่อนรอบ, เงื่อนไขจริงไหม, ค่าหลังรอบ ไล่จนเงื่อนไขเป็นเท็จ",
    practiceHints: [
      "for (int day = 1; day <= lateDays; day++) แล้วเลือก rate ตามช่วงของ day",
      "สะสมด้วย fine = Math.min(fine + rate, CAP) และจด counted = day",
      "if (fine == CAP) break; — ไล่มือ: วัน 1–7 รวม 26 แล้วเพิ่มวันละ 10 ถึง 150 ที่วันที่ 20",
    ],
    acceptance: [
      local,
      "ตรวจเอง: 9 วัน → ค่าปรับ 46 บาท (คำนวณ 9 วัน)",
      "ตรวจเอง: 30 วัน → ค่าปรับ 150 บาท (คำนวณ 20 วัน) และ 0 วัน → ค่าปรับ 0 บาท (คำนวณ 0 วัน)",
    ],
    solutionNotes: [
      "Math.min ทำให้วันที่ข้ามเพดาน (146 + 10) ถูกตัดที่ 150 ไม่ใช่ 156",
      "ternary ซ้อน day <= 3 ? 2 : day <= 7 ? 5 : 10 อ่านจากซ้ายไปขวา บท java-methods จะแยกเป็น method ที่อ่านง่ายกว่า",
    ],
    reflection: [
      "ครั้งล่าสุดที่เจอ loop ผิด ผิดที่เงื่อนไขเริ่ม หยุด หรือการเปลี่ยนค่า",
    ],
    extension: "พิมพ์ตารางรายวัน (วันที่, อัตรา, ยอดสะสม) ด้วย printf ให้คอลัมน์ตรงกัน จนถึงวันที่หยุด",
  },
  "java-methods": {
    hook: "โปรแกรมค่าปรับมีสูตรเดียวกันสามที่ในไฟล์ พอแก้อัตราวันที่ 4–7 ต้องตามหาทุกที่ method ทำให้แต่ละกติกามีชื่อและมีที่อยู่เดียว",
    explain: [
      {
        heading: "1) method คือคำสัญญา",
        text: [
          "signature static int fineFor(int lateDays, int cap) บอกว่าต้องส่งอะไรเข้าและจะได้อะไรออก ผู้เรียกไม่ต้องรู้ว่าข้างในทำอย่างไร",
          "ตั้งชื่อตามผลลัพธ์หรือการกระทำ (fineFor, rateForDay, receipt) และให้แต่ละ method ทำงานเดียว",
        ],
      },
      {
        heading: "2) return และ void",
        text: [
          "return ส่งค่าออกและจบ method ทันที ทุกเส้นทางต้อง return ถ้าไม่ใช่ void",
          "method ที่คืนค่าแทนการพิมพ์เองใช้ซ้ำและทดสอบได้ง่ายกว่า — ให้ main เป็นคนพิมพ์",
        ],
      },
      {
        heading: "3) scope และ pass-by-value",
        text: [
          "ตัวแปรใน method เป็นของ method นั้น ชื่อซ้ำกับ method อื่นได้โดยไม่เกี่ยวกัน",
          "ค่าที่ส่งเข้าไปเป็นสำเนา การกำหนดค่าใหม่ให้ parameter ไม่กระทบผู้เรียก (บท arrays จะเห็นว่า object/array ต่างออกไปเล็กน้อย)",
        ],
      },
    ],
    walkthrough: [
      "describe(\"Clean Code\", 3) เรียก fineFor(3) ได้ 15",
      "fineFor(40) ได้ 200 แต่ Math.min ตัดที่ 100",
      "describe(\"Java 21\") เรียก overload สองพารามิเตอร์ด้วย 0",
      "tryToReset เปลี่ยนแค่สำเนา late จึงยังเป็น 9",
    ],
    pitfalls: [
      "method ที่ทั้งคำนวณและพิมพ์: ใช้ซ้ำยาก",
      "ลืม return ในบางเส้นทาง",
      "คาดว่าการแก้ parameter จะเปลี่ยนตัวแปรของผู้เรียก",
      "method ยาวที่ทำหลายเรื่อง",
    ],
    checks: [
      { question: "static void add(int x) { x = x + 1; } แล้วเรียก add(n) เมื่อ n = 5 ค่า n หลังเรียกคือเท่าไร", answer: "5 เพราะ method ได้สำเนาของค่า ถ้าต้องการผลให้คืนค่า: n = plusOne(n);" },
      { question: "ทำไม receipt คืน String แทนการพิมพ์เอง", answer: "ผู้เรียกเลือกได้ว่าจะพิมพ์ เก็บ หรือทดสอบเทียบข้อความ method จึงใช้ได้หลายบริบท" },
    ],
    recap: [
      "signature = ชนิดที่คืน + ชื่อ + parameter",
      "return ทุกเส้นทาง; คืนค่าดีกว่าพิมพ์เอง",
      "scope ของ method; pass-by-value",
    ],
    traceHint: "วาด stack ของการเรียก: กล่องหนึ่งต่อหนึ่งการเรียก method พร้อมค่าของ parameter แล้วปิดกล่องเมื่อ return",
    practiceHints: [
      "rateForDay ใช้ if สองชั้น return 2, 5, 10",
      "fineFor ใช้ for สะสม Math.min(fine + rateForDay(day), cap) และหยุดเมื่อถึง cap",
      "receipt ต่อข้อความจาก fineFor(lateDays, 150) แล้ว main แค่พิมพ์สามบรรทัด",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ได้ Clean Code: 46 บาท / Refactoring: 150 บาท / Java 21: 0 บาท",
      "ตรวจเอง: main ไม่มีตัวเลขอัตราหรือ loop",
    ],
    solutionNotes: [
      "เงื่อนไข day <= lateDays && fine < cap ใน for รวมการหยุดสองแบบไว้ที่เดียวแทน break",
      "cap เป็น parameter ทำให้ fineFor ใช้กับกติกาอื่น (เช่นเพดานของสมาชิกพรีเมียม) ได้",
    ],
    reflection: [
      "method ไหนในเฉลยที่น่าจะต้องแก้บ่อยที่สุดเมื่อกติกาเปลี่ยน และการแยกช่วยตรงนั้นอย่างไร",
    ],
    extension: "เพิ่ม overload static String receipt(String title, int lateDays, boolean premium) ที่ไม่คิด 3 วันแรกสำหรับ premium โดยเรียก method เดิมซ้ำ",
  },
  "java-arrays": {
    hook: "ซีเรียงคะแนนรีวิวเพื่อหาค่ามัธยฐาน แล้วพบว่าลำดับเวลาที่รีวิวเข้ามาหายไปด้วย ทั้งที่ “คัดลอก” array ไว้แล้ว — b = a ไม่ได้คัดลอกข้อมูล",
    analogy: {
      title: "ตัวแปร array เหมือนกุญแจห้องเก็บของ",
      text: [
        "ห้องเก็บของ (array) มีช่องเรียงกันจำนวนตายตัว ตัวแปรไม่ได้เก็บห้อง แต่เก็บกุญแจที่เปิดห้องได้",
        "b = a คือปั๊มกุญแจเพิ่มอีกดอก ทั้งสองคนเข้าห้องเดียวกัน ใครย้ายของ อีกคนก็เห็น ถ้าต้องการห้องใหม่ต้องสร้างห้องแล้วขนของไปใส่ (Arrays.copyOf)",
      ],
      mapping: [
        ["ห้องที่มีช่องเรียงกัน", "array ในหน่วยความจำ"],
        ["กุญแจ", "reference ที่ตัวแปรเก็บ"],
        ["ปั๊มกุญแจเพิ่ม", "int[] b = a;"],
        ["สร้างห้องใหม่แล้วขนของ", "Arrays.copyOf(a, a.length)"],
        ["ยื่นกุญแจให้ method", "ส่ง array เป็น argument"],
      ],
      limits: "ห้องจริงขยายได้ด้วยการต่อเติม แต่ array ขนาดตายตัวตลอดชีวิต การ “เพิ่มช่อง” ต้องสร้าง array ใหม่ (หรือใช้ ArrayList ในบทถัดไป) และ copyOf คัดลอกเฉพาะชั้นนอก: ถ้าช่องเก็บ object การคัดลอกได้กุญแจของ object เดิม",
    },
    explain: [
      {
        heading: "1) สร้างและอ่าน",
        text: [
          "int[] a = {4, 5, 3}; หรือ new int[n] (ค่าเริ่มต้น 0/false/null) index 0 ถึง length - 1",
          "อ่านเกินขอบได้ ArrayIndexOutOfBoundsException ตอนรัน (Java ตรวจทุกครั้ง ไม่อ่านหน่วยความจำมั่ว)",
        ],
      },
      {
        heading: "2) วนอ่าน",
        text: [
          "for (int x : a) เมื่อต้องการแค่ค่า for (int i = 0; i < a.length; i++) เมื่อต้องการตำแหน่งหรือแก้ค่า",
          "Arrays.toString(a) สำหรับพิมพ์ดูเนื้อหา",
        ],
      },
      {
        heading: "3) reference และการคัดลอก",
        text: [
          "การกำหนด array ให้ตัวแปรอื่นและการส่งเข้า method ส่ง reference (สำเนาของกุญแจ) method จึงแก้ข้อมูลใน array ของผู้เรียกได้",
          "ถ้าไม่ต้องการแก้ของผู้เรียก ให้สร้าง array ใหม่แล้วคืนค่า",
        ],
      },
    ],
    walkthrough: [
      "ratings มี 3 ช่อง ตัวแรก 4 ตัวสุดท้าย 3; titles ใหม่เป็น null ทุกช่อง",
      "enhanced for รวมได้ 12 เฉลี่ย 4.0",
      "alias ชี้ array เดียวกับ ratings การแก้ alias[0] จึงเห็นใน ratings",
      "copy เป็น array ใหม่ addBonus แก้เฉพาะ copy",
    ],
    pitfalls: [
      "คิดว่า b = a คือการคัดลอก",
      "ใช้ <= length ใน loop",
      "พิมพ์ array ด้วย println ตรง ๆ",
      "แก้ค่าผ่านตัวแปรของ enhanced for แล้วคาดว่า array เปลี่ยน",
    ],
    checks: [
      { question: "for (int x : a) { x = 0; } ทำให้ทุกช่องของ a เป็น 0 ไหม", answer: "ไม่ x เป็นสำเนาของค่าในแต่ละช่อง ต้องใช้ for แบบ index: a[i] = 0" },
      { question: "method ที่รับ int[] แล้วทำ arr = new int[3]; ผู้เรียกเห็น array ใหม่ไหม", answer: "ไม่เห็น การกำหนดใหม่เปลี่ยนแค่กุญแจที่ method ถืออยู่ แต่ถ้าแก้ arr[0] = 9 ก่อนกำหนดใหม่ ผู้เรียกจะเห็นการแก้นั้น" },
    ],
    recap: [
      "ขนาดคงที่; index 0..length-1",
      "enhanced for สำหรับอ่าน; index สำหรับแก้",
      "ตัวแปรเก็บ reference: คัดลอกด้วย Arrays.copyOf",
    ],
    traceHint: "วาดกล่อง array หนึ่งกล่องต่อหนึ่ง new หรือ copyOf แล้วลากลูกศรจากชื่อตัวแปรไปที่กล่อง การแก้ผ่านชื่อใดก็แก้กล่องที่ลูกศรชี้",
    practiceHints: [
      "average: ตรวจ length == 0 ก่อน แล้วรวมด้วย enhanced for และหารด้วย (double)",
      "withoutLowest: หา index ของค่าต่ำสุดก่อน แล้วสร้าง array ใหม่ขนาด length - 1",
      "คัดลอกทุกช่องยกเว้น lowestIndex ด้วยตัวนับ next แยกจาก i",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ได้ 3.80, 3, [4, 5, 5, 3] และ array เดิมยังเป็น [4, 2, 5, 5, 3]",
      "ตรวจเอง: average(new int[0]) ได้ 0.0 โดยไม่ล่ม",
    ],
    solutionNotes: [
      "ถ้าค่าต่ำสุดมีหลายตัว เฉลยตัดตัวแรกที่พบ (เทียบด้วย < ไม่ใช่ <=)",
      "withoutLowest ไม่แก้ array ที่รับมา ผู้เรียกจึงใช้ array เดิมต่อได้อย่างมั่นใจ",
    ],
    reflection: [
      "method ไหนที่เคยเขียนแล้วแก้ข้อมูลของผู้เรียกโดยไม่ตั้งใจ",
    ],
    extension: "เขียน median(int[]) ที่คืนค่ามัธยฐานโดยเรียงสำเนา (Arrays.copyOf + Arrays.sort) ไม่แตะ array เดิม",
  },
  "java-arraylist": {
    hook: "รายการหนังสือที่อยากอ่านของซีเพิ่มทุกสัปดาห์ แต่ array ต้องรู้ขนาดตั้งแต่แรก ArrayList ขยายเองได้ — แลกกับกับดักใหม่: remove(1) ใน list ของตัวเลขลบตำแหน่ง ไม่ใช่ลบเลข 1",
    explain: [
      {
        heading: "1) method หลัก",
        text: [
          "add/get/set/remove/size/isEmpty/contains/indexOf — contains และ indexOf ใช้ equals เทียบ",
          "ประกาศด้วยชนิดสมาชิกเสมอ ArrayList<String> ไม่ใช้ ArrayList เปล่า (raw type)",
        ],
      },
      {
        heading: "2) wrapper และ autoboxing",
        text: [
          "ArrayList<int> ใช้ไม่ได้ ต้องเป็น ArrayList<Integer> Java แปลง int ↔ Integer ให้เอง",
          "Integer เป็น object: เทียบค่าสองตัวด้วย equals เสมอ == เทียบว่าเป็น object เดียวกัน ซึ่งบางครั้งดูเหมือนถูกเพราะ Java เก็บ Integer ของค่าเล็ก ๆ (อย่างน้อย −128 ถึง 127) ไว้ใช้ซ้ำ — อย่าพึ่งพฤติกรรมนี้",
        ],
        code: java`public class Main {
    public static void main(String[] args) {
        Integer a = 1000;
        Integer b = 1000;
        System.out.println((a == b) + " " + a.equals(b));
    }
}`,
        output: "false true",
      },
      {
        heading: "3) แก้ list อย่างปลอดภัย",
        text: [
          "ห้าม add/remove ระหว่าง for-each ของ list เดียวกัน ใช้ removeIf หรือ loop index จากท้ายไปหน้า",
          "List.of(...) แก้ไม่ได้ (UnsupportedOperationException) ถ้าต้องแก้ให้ห่อด้วย new ArrayList<>(List.of(...))",
        ],
      },
    ],
    walkthrough: [
      "add สองครั้งแล้ว add(0, ...) แทรกหน้าสุด",
      "set แทนที่ index 1, indexOf ของสิ่งที่ไม่มีได้ -1",
      "remove(\"Refactoring\") ลบตามค่า",
      "ids.remove(1) ลบ index 1 (เลข 1) ส่วน remove(Integer.valueOf(10)) ลบค่า 10",
      "removeIf ลบทุกชื่อที่ลงท้าย -old",
    ],
    pitfalls: [
      "remove(int) กับ remove(Object) ใน list ของ Integer",
      "แก้ list ระหว่าง for-each",
      "เทียบ Integer ด้วย ==",
      "พยายามแก้ List.of",
    ],
    checks: [
      { question: "list.add(5); list.get(list.size()) ได้อะไร", answer: "IndexOutOfBoundsException เพราะ index สุดท้ายคือ size() - 1" },
      { question: "เมื่อไรควรใช้ array แทน ArrayList", answer: "เมื่อขนาดคงที่และรู้ล่วงหน้า หรือเป็นข้อมูล primitive จำนวนมากที่ต้องการประสิทธิภาพ งานทั่วไปที่จำนวนเปลี่ยนได้ใช้ ArrayList" },
    ],
    recap: [
      "ArrayList<T> ขยายได้; ใช้ wrapper กับ primitive",
      "remove(index) ≠ remove(value)",
      "removeIf แทนการลบระหว่าง for-each",
    ],
    traceHint: "เขียน list เป็น [a, b, c] พร้อมเลข index ใต้แต่ละตัวหลังทุกคำสั่ง และระวังว่า index เลื่อนหลัง add(0, x) หรือ remove",
    practiceHints: [
      "split(\" \", 2) แยกคำสั่งกับส่วนที่เหลือ ชื่อหนังสือที่มีช่องว่างจึงอยู่ครบ",
      "add ตรวจ contains ก่อนเพิ่ม; done แปลงเลขแล้วตรวจช่วง 1..size()",
      "ลบด้วย remove(position - 1) ซึ่งเป็น int จึงลบตาม index ตามที่ต้องการ",
    ],
    acceptance: [
      local,
      "ตรวจเอง: input ตัวอย่างได้ duplicate: Clean Code / no such item / 1. Java 21",
      "ตรวจเอง: list ตอนว่างพิมพ์ (empty)",
    ],
    solutionNotes: [
      "done ที่ตามด้วยข้อความไม่ใช่ตัวเลขจะทำให้ parseInt โยน exception — บท java-exceptions-basic จะแก้",
      "ลำดับใน list คือลำดับที่เพิ่ม หลังลบรายการ ลำดับของรายการถัดไปจะเลื่อนขึ้น",
    ],
    reflection: [
      "ผู้ใช้จะสับสนไหมที่ลำดับของหนังสือเปลี่ยนหลังลบ มีทางออกแบบไหนที่ไม่ต้องพึ่งลำดับ (คำใบ้: id ในบท project)",
    ],
    extension: "เพิ่มคำสั่ง top <n> ที่ย้ายรายการลำดับ n ไปไว้บนสุดด้วย remove แล้ว add(0, ...)",
  },
  "java-exceptions-basic": {
    hook: "พิมพ์ \"สาม\" แทน 3 เพียงครั้งเดียว โปรแกรมห้องสมุดทั้งตัวปิดพร้อมข้อความภาษาอังกฤษยาวสิบบรรทัด และรายการที่ผู้ใช้พิมพ์มาครึ่งชั่วโมงหายหมด input ผิดเป็นเรื่องปกติ โปรแกรมต้องรับมือได้",
    analogy: {
      title: "exception เหมือนการส่งเรื่องขึ้นไปตามสายบังคับบัญชา",
      text: [
        "พนักงานที่เจอปัญหาเกินอำนาจไม่ได้ทำต่อแบบเดา แต่หยุดงานนั้นแล้วส่งเรื่องขึ้นไปหาหัวหน้า หัวหน้าที่รู้วิธีจัดการรับเรื่องไว้ ถ้าไม่มีใครรับเลย เรื่องไปถึงผู้บริหารสูงสุดและงานทั้งหมดหยุด",
        "throw คือการส่งเรื่องขึ้นไป catch คือคนที่รับเรื่องและรู้วิธีแก้ ถ้าไม่มี catch เลย JVM หยุดโปรแกรมและพิมพ์ stack trace",
      ],
      mapping: [
        ["เรื่องที่ส่งขึ้นไป", "exception object (ชนิด + ข้อความ)"],
        ["ส่งเรื่อง", "throw หรือ error จาก library"],
        ["สายบังคับบัญชา", "ลำดับการเรียก method (stack)"],
        ["หัวหน้าที่รับเรื่อง", "catch ที่ตรงชนิด"],
        ["ไม่มีใครรับจนถึงบนสุด", "โปรแกรมหยุดพร้อม stack trace"],
      ],
      limits: "ในองค์กรจริงหัวหน้าอาจส่งงานกลับลงไปให้ทำต่อจากจุดเดิม แต่ใน Java เมื่อ exception ถูกโยน งานที่เหลือใน method ที่โยนและ method ระหว่างทางถูกยกเลิกทั้งหมด โปรแกรมทำต่อจากหลัง catch ไม่ใช่จากจุดที่เกิดปัญหา",
    },
    explain: [
      {
        heading: "1) อ่าน stack trace",
        text: [
          "บรรทัดแรก: ชนิดและข้อความ เช่น java.lang.NumberFormatException: For input string: \"สาม\"",
          "บรรทัด at ... (Main.java:12) เรียงจากจุดที่เกิดขึ้นไปหาผู้เรียก มองหาบรรทัดแรกที่เป็นไฟล์ของเรา",
        ],
      },
      {
        heading: "2) catch เมื่อรู้วิธีแก้",
        text: [
          "จับเฉพาะชนิดที่คาดไว้ ในจุดที่ทำอะไรได้จริง (ขอ input ใหม่, ข้ามรายการ, แจ้งผู้ใช้)",
          "catch หลายอันเรียงจากชนิดเฉพาะไปทั่วไป catch ว่างหรือ catch (Exception e) ที่คืนค่าปลอมซ่อน bug",
        ],
      },
      {
        heading: "3) throw เมื่อได้ค่าที่ผิดกติกา",
        text: [
          "method ที่ได้ค่าที่ทำงานต่อไม่ได้ควรโยน exception พร้อมข้อความที่บอกค่าที่ผิด แทนการคืน -1 หรือ 0 ที่ผู้เรียกอาจลืมตรวจ",
          "IllegalArgumentException สำหรับ argument ผิด, IllegalStateException สำหรับสถานะที่ทำสิ่งนั้นไม่ได้ (เช่น input หมด)",
        ],
      },
    ],
    walkthrough: [
      "\"สาม\" ทำให้ parseInt โยน NumberFormatException catch แรกรับไว้",
      "\"3\" ผ่าน parse และ fineFor ได้ 15",
      "\"-2\" parse ได้ แต่ fineFor โยน IllegalArgumentException catch ที่สองรับไว้",
      "input หมด loop จบ พิมพ์ จบ — โปรแกรมไม่ล่มเลย",
    ],
    pitfalls: [
      "catch (Exception e) {} ว่าง ๆ",
      "คืนค่าปลอม (0, -1, null) แทนการแจ้งปัญหา",
      "จับ exception ไกลจากจุดที่รู้วิธีแก้ หรือใกล้เกินไปจนแก้ไม่ได้",
      "ใช้ exception แทน if สำหรับกรณีปกติที่ตรวจได้ล่วงหน้า",
    ],
    checks: [
      { question: "ใน stack trace มี at java.lang.Integer.parseInt(...) อยู่บนสุดและ at Main.main(Main.java:12) ด้านล่าง ควรเริ่มแก้ที่ไหน", answer: "Main.java บรรทัด 12 ซึ่งเป็นโค้ดของเราที่ส่งข้อความผิดให้ parseInt บรรทัดใน library คือที่ที่ตรวจพบ ไม่ใช่ต้นเหตุ" },
      { question: "fineFor(-2) ควร return 0 หรือ throw", answer: "throw เพราะวันติดลบแปลว่ามี bug หรือข้อมูลผิดต้นทาง การคืน 0 ทำให้ปัญหาเงียบและข้อมูลดูถูกต้อง" },
    ],
    recap: [
      "stack trace: ชนิด + ข้อความ + บรรทัดของเรา",
      "catch เฉพาะชนิด ในจุดที่แก้ได้",
      "throw IllegalArgumentException เมื่อค่าผิดกติกา",
    ],
    traceHint: "สำหรับแต่ละบรรทัด input เขียนว่า exception เกิดที่บรรทัดไหน (หรือไม่เกิด) ถูก catch อันไหนรับ และโปรแกรมทำต่อจากตรงไหน",
    practiceHints: [
      "readChoice: while (scanner.hasNextLine()) แล้ว try { parse; ตรวจช่วง; return } catch (NumberFormatException e) { พิมพ์ }",
      "ค่านอกช่วงไม่ใช่ exception — ตรวจด้วย if แล้วพิมพ์ เลือก min-max",
      "หลัง loop (input หมด) throw new IllegalStateException(\"ไม่มี input\")",
    ],
    acceptance: [
      local,
      "ตรวจเอง: input x / 9 / 2 ได้ ต้องเป็นตัวเลข / เลือก 1-3 / เลือก 2",
      "ตรวจเอง: input ว่างทั้งหมดทำให้เห็น IllegalStateException: ไม่มี input (ไม่ใช่ NoSuchElementException)",
      "ตรวจเอง: fineFor(-1) โยน IllegalArgumentException ที่มีค่า -1 ในข้อความ",
    ],
    solutionNotes: [
      "return อยู่ใน try ได้: เมื่อ parse และตรวจช่วงผ่านก็ออกจาก method ทันที",
      "การตรวจช่วงด้วย if แทน exception เพราะค่านอกช่วงเป็นกรณีปกติที่คาดได้ ไม่ใช่ความผิดปกติของโปรแกรม",
    ],
    reflection: [
      "ใน Library CLI ข้อผิดพลาดไหนควรแจ้งผู้ใช้แล้วทำต่อ และข้อไหนควรหยุดโปรแกรม",
    ],
    extension: "ใช้ readChoice ในบท java-arraylist แทน parseInt ตรง ๆ ของคำสั่ง done และเพิ่ม finally ที่พิมพ์ (บันทึกคำสั่งแล้ว) ทุกครั้ง แล้วสังเกตลำดับการพิมพ์",
  },
  "java-multi-file": {
    hook: "ไฟล์ Main.java ของ Library CLI ยาวสี่ร้อยบรรทัด หาฟังก์ชันค่าปรับต้องเลื่อนนาน พอแยกเป็นหลายไฟล์กลับเจอ “cannot find symbol” และ “Could not find or load main class” ทั้งที่โค้ดไม่ได้เปลี่ยน ปัญหาอยู่ที่ package, โฟลเดอร์ และ classpath",
    explain: [
      {
        heading: "1) package = ชื่อ + โฟลเดอร์",
        text: [
          "บรรทัด package library; ต้องอยู่บนสุดของไฟล์ และไฟล์ควรอยู่ในโฟลเดอร์ library/ ชื่อเต็มของ class คือ library.Main",
          "class ใน package เดียวกันใช้กันได้ทันที class ต่าง package ต้อง import และต้องเป็น public",
        ],
      },
      {
        heading: "2) compile และ run",
        text: [
          "javac -d out src/library/*.java compile ทุกไฟล์พร้อมกัน (ไฟล์อ้างถึงกัน) แล้ววาง .class ตามโครง package ใน out/",
          "java -cp out library.Main บอก JVM ว่าหา class ที่ out และเริ่มที่ class ชื่อเต็ม library.Main",
        ],
      },
      {
        heading: "3) access modifier เบื้องต้น",
        text: [
          "public: เห็นได้ทุกที่ ไม่ใส่อะไร (package-private): เห็นได้ใน package เดียวกัน private: เห็นได้ใน class เดียวกัน",
          "เริ่มจากเปิดเท่าที่จำเป็น ค่าคงที่ CAP ในตัวอย่างเป็น package-private จึงใช้ได้จาก Main ใน package เดียวกัน คอร์ส OOP จะใช้เรื่องนี้ออกแบบ class",
        ],
      },
    ],
    walkthrough: [
      "สามไฟล์อยู่ใน package library",
      "Main เรียก Fines.fineFor และ Format.baht ข้าม class ได้เพราะอยู่ package เดียวกัน",
      "%,d ใส่จุลภาคหลักพัน (ค่าน้อยจึงไม่เห็น) และ Fines.CAP อ่านได้เพราะเป็น package-private ใน package เดียวกัน",
    ],
    pitfalls: [
      "java -cp out Main แทน library.Main",
      "compile ทีละไฟล์จนไฟล์ที่อ้างถึงกันหาไม่เจอ",
      "บรรทัด package ไม่ตรงกับโฟลเดอร์",
      "ลืม import เมื่อใช้ class ต่าง package",
    ],
    checks: [
      { question: "javac -d out src/library/Main.java (ไฟล์เดียว) ทั้งที่ Main ใช้ Fines ผ่านไหม", answer: "ไม่ผ่านถ้า javac หา source ของ Fines ไม่เจอ (cannot find symbol) วิธีที่ชัดเจนคือ compile ทุกไฟล์พร้อมกันด้วย src/library/*.java หรือบอกที่อยู่ source ด้วย -sourcepath src" },
      { question: "ทำไมต้องใช้ชื่อ library.Main ตอนรัน", answer: "class ที่อยู่ใน package มีชื่อเต็มรวม package JVM หา library/Main.class ภายใต้ classpath จากชื่อนี้" },
    ],
    recap: [
      "package ↔ โฟลเดอร์; import ข้าม package",
      "javac -d out ทุกไฟล์; java -cp out package.Main",
      "public / package-private / private",
    ],
    traceHint: "เขียนโครงโฟลเดอร์ของ out/ หลัง javac -d out แล้วแปลงชื่อเต็มของ class เป็น path (จุดเป็น /) เพื่อดูว่า JVM จะหาไฟล์ไหน",
    practiceHints: [
      "ย้ายการตรวจ add/done และการสร้างบรรทัดของ list ไปที่ Wishlist ให้ทุก method รับ list เป็น parameter",
      "Commands.run แยกคำสั่งด้วย split(\" \", 2) แล้วใช้ switch expression ที่คืนข้อความ (\"\" เมื่อไม่ต้องพิมพ์)",
      "Main แค่วน nextLine เรียก Commands.run และพิมพ์ถ้าไม่ว่าง จากนั้น javac -d out src/wishlist/*.java และ java -cp out wishlist.Main โดยป้อน input.txt (PowerShell: Get-Content input.txt | java -cp out wishlist.Main ; Bash/WSL: java -cp out wishlist.Main < input.txt)",
    ],
    acceptance: [
      local,
      "ตรวจเอง: compile ด้วย javac -d out และรันด้วย java -cp out wishlist.Main ได้",
      "ตรวจเอง: input ของบท java-arraylist ได้ผลเหมือนเดิม และ done x ได้ข้อความแจ้งแทนการล่ม",
      "ตรวจเอง: Main ไม่มี logic ของรายการ (มีแค่อ่าน/พิมพ์)",
    ],
    solutionNotes: [
      "Commands.run คืน String แทนการพิมพ์ จึงทดสอบเทียบข้อความได้ใน JUnit (คอร์ส OOP) โดยไม่ต้องจับ System.out",
      "list ยังส่งผ่าน parameter ทุก method ซึ่งยุ่งยาก — นี่คือแรงจูงใจของ object ที่เก็บ state ไว้เองในคอร์ส OOP",
    ],
    reflection: [
      "การแบ่งไฟล์แบบนี้ทำให้แก้อะไรง่ายขึ้น และอะไรยังไม่สะดวก",
    ],
    extension: "ย้าย Format ไปไว้ใน package อื่น (library.util) แล้วแก้ import และ access modifier ให้ compile ผ่าน",
  },
  "java-project-library-0": {
    hook: "ห้องสมุดชุมชนจดการยืมด้วยสมุด ซีเสนอทำโปรแกรม CLI แทน M0 คือเวอร์ชันแรกที่ใช้ได้จริง: เพิ่มหนังสือ ดูรายการ ยืม และคืน โดยไม่ล่มแม้พิมพ์ผิด",
    explain: [
      {
        heading: "1) ทำให้ผลทดสอบได้ก่อนเขียนโค้ด",
        text: [
          "ข้อความตอบกลับทุกแบบถูกกำหนดไว้ตายตัวในคำอธิบายบท จึงเขียน test-input.txt และ expected-output.txt ได้ตั้งแต่ก่อนเขียนโค้ด",
          "รันซ้ำแล้วเทียบ — PowerShell: Get-Content test-input.txt | java -cp out library.Main | Set-Content -Encoding utf8 actual.txt แล้ว Compare-Object (Get-Content expected-output.txt) (Get-Content actual.txt) (ไม่มีผลลัพธ์ = ตรงกัน); Bash/WSL: java -cp out library.Main < test-input.txt > actual.txt แล้ว diff expected-output.txt actual.txt (ไม่มีผลลัพธ์ = ตรงกัน)",
        ],
      },
      {
        heading: "2) id ไม่ใช่ index",
        text: [
          "id คือชื่อถาวรของหนังสือที่ผู้ใช้อ้างถึง ส่วน index คือตำแหน่งใน list ที่อาจเลื่อนเมื่อมีการลบ",
          "แปลง id → index ด้วย ids.indexOf(id) และตรวจ -1 เสมอ",
        ],
      },
      {
        heading: "3) แยกการตัดสินใจออกจาก input/output",
        text: [
          "Catalog คืนข้อความผลลัพธ์ ไม่อ่าน input และไม่พิมพ์เอง Main อ่าน แยกคำสั่ง แล้วพิมพ์",
          "เมื่อถึง M1 จะแทน ArrayList คู่ขนานด้วย class Book และเพิ่ม Member คำสั่ง/ข้อความเปลี่ยน เช่น added #1 เป็น added book #1 จึงสร้าง fixtures ตาม contract ของ M1 ไม่ใช้ expected-output ของ M0 ตรวจ M1 ตรง ๆ",
        ],
      },
    ],
    walkthrough: [
      "list ตอนเริ่มได้ (no books)",
      "add สองเล่มได้ id 1 และ 2",
      "ตั้ง borrowed ของ index 0 เป็น true",
      "list แสดงสถานะของแต่ละเล่มจาก index เดียวกันในสาม list",
    ],
    pitfalls: [
      "ใช้ id เป็น index",
      "แก้ ArrayList คู่ขนานไม่ครบทุก list",
      "ข้อความตอบกลับไม่ตรงข้อกำหนด (เทียบกับ expected-output ไม่ผ่าน)",
      "parseInt โดยไม่จับ NumberFormatException",
    ],
    checks: [
      { question: "ถ้าในอนาคตมีคำสั่ง remove 1 แล้ว add เล่มใหม่ เล่มใหม่ควรได้ id อะไร เพราะอะไร", answer: "id ถัดจากเลขที่เคยใช้มากที่สุด (เช่น 3) ไม่ใช่ 1 ซ้ำ เพราะ id ต้องไม่ซ้ำกับของเก่าที่อาจยังถูกอ้างถึงในบันทึกการยืม" },
      { question: "ทำไม handle ใน Main คืน String แทนการพิมพ์", answer: "ให้ main เป็นจุดเดียวที่พิมพ์ และ handle ทดสอบได้โดยเทียบข้อความ" },
    ],
    recap: [
      "ข้อกำหนดข้อความชัด → ทดสอบด้วยไฟล์ input + diff",
      "id ≠ index",
      "แยกการตัดสินใจ (Catalog) ออกจาก I/O (Main)",
    ],
    traceHint: "ทำตารางสามคอลัมน์ ids, titles, borrowed แล้วเขียนค่าหลังแต่ละคำสั่ง ตรวจว่าทั้งสามยาวเท่ากันเสมอ",
    practiceHints: [
      "เขียน test-input.txt และ expected-output.txt จากข้อกำหนดก่อน ให้ครอบคลุมทุกข้อความตอบกลับ",
      "Catalog: add/list/borrow/giveBack คืน String; หา index ด้วย ids.indexOf(id) แล้วตรวจ -1 (return เป็นคำสงวน จึงตั้งชื่อ method ว่า giveBack)",
      "Main: ข้ามบรรทัดว่าง, quit พิมพ์ bye แล้ว break, borrow/return parse id ใน try/catch แล้วส่งต่อ",
    ],
    acceptance: [
      local,
      "ตรวจเอง: รันด้วย test-input.txt (วิธีตาม shell ของคุณ: PowerShell ใช้ Get-Content ... | java ; Bash/WSL ใช้ < test-input.txt) แล้วผลตรงกับ expected-output.txt ทุกบรรทัด (Compare-Object หรือ diff ไม่มีความต่าง)",
      "ตรวจเอง: ทุกข้อความตอบกลับในข้อกำหนดปรากฏอย่างน้อยหนึ่งครั้งใน test-input",
      "ตรวจเอง: compile/run แบบหลายไฟล์ด้วย javac -d out และ java -cp out library.Main",
    ],
    solutionNotes: [
      "Integer.valueOf ไม่จำเป็นใน ids.indexOf(id) เพราะ id เป็น int ที่ถูก autobox เป็น Integer และ indexOf ใช้ equals เทียบค่า",
      "test-input.txt ในเฉลยมีทุกข้อความตอบกลับของข้อกำหนดอย่างน้อยหนึ่งครั้ง และบรรทัดหลัง quit (add ignored) ไม่ถูกประมวลผล ยืนยันว่า break ออกจาก loop ทันที",
      "ตัวแปร static ใน Catalog ทำให้มี catalog ได้แค่ชุดเดียวทั้งโปรแกรม — M1 จะแก้ด้วยการสร้าง object",
    ],
    reflection: [
      "ถ้าต้องเพิ่มชื่อผู้แต่งและวันครบกำหนดคืน ต้องแก้กี่จุด และอะไรทำให้ยาก",
    ],
    extension: "เพิ่มคำสั่ง find <คำค้น> ที่แสดงหนังสือที่ชื่อมีคำค้น (ไม่สนตัวพิมพ์) ในรูปแบบเดียวกับ list หรือ (no match)",
  },
};
