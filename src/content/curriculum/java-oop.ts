import type { TopicSource } from "@/types/curriculum";

const courseId = "java-oop";
const v = (a: string, b: string): [string, string] => [a, b];
const java = String.raw;

// Order is the learning order. Topic IDs are stored in learner progress: never rename them.
// Examples and solutions are compiled and run with JDK 21 (and JUnit 6 for test topics) by scripts/verify-java-lessons.ts.
export const javaOopTopics: TopicSource[] = [
{
  id: "oop-responsibility",
  courseId,
  unit: "คิดเป็น object",
  title: "เริ่มจาก use case และความรับผิดชอบ ไม่ใช่จากคำนาม",
  objective: "อ่าน use case แล้วแยกว่าใครต้อง “รู้อะไร” และ “ทำอะไร” เขียนเป็น CRC (Class–Responsibility–Collaborator) แล้วแปลงเป็นโครง class ที่มี method signature ก่อนเขียนรายละเอียด",
  why: "Library CLI M0 เก็บทุกอย่างใน ArrayList คู่ขนานกับ static method เพิ่มกติกาทีไรต้องแก้หลายที่ การหยิบคำนามทุกคำมาเป็น class ก็ไม่ช่วย ถ้า class เป็นแค่ถุงข้อมูลที่ไม่มีใครรับผิดชอบกติกา จุดเริ่มที่ดีกว่าคือถามว่าแต่ละกติกาเป็นหน้าที่ของใคร",
  explanation: "use case คือเรื่องที่ผู้ใช้ทำให้สำเร็จ เช่น “สมาชิกยืมหนังสือ” ไล่ขั้นตอนแล้วถามสองคำถามกับแต่ละขั้น: ข้อมูลนี้ใครเป็นเจ้าของ (รู้อะไร) และใครควรตัดสินใจเรื่องนี้ (ทำอะไร) กติกาควรอยู่กับ object ที่มีข้อมูลที่ใช้ตัดสินใจ (information expert): หนังสือรู้ว่าตัวเองถูกยืมอยู่ไหม จึงควรตัดสินว่ายืมได้ไหม สมาชิกรู้ว่ายืมอยู่กี่เล่ม จึงควรตัดสินว่ายืมเพิ่มได้ไหม CRC card หนึ่งใบต่อหนึ่ง class: ชื่อ, ความรับผิดชอบ (คำกริยา), ผู้ร่วมงาน (class อื่นที่ต้องคุยด้วย) จากนั้นเขียนโครง class ที่มี method signature และ throw new UnsupportedOperationException() ไว้ก่อน — compile ผ่านและเห็นภาพรวมก่อนลงรายละเอียด",
  language: "java",
  standard: "v3",
  prerequisites: ["java-project-library-0"],
  example: java`public class Main {
    public static void main(String[] args) {
        String[] steps = {
            "สมาชิกขอยืมหนังสือ #1",
            "ตรวจว่าหนังสือ #1 ยังว่างอยู่",
            "ตรวจว่าสมาชิกยืมไม่เกินโควตา",
            "บันทึกว่าหนังสือถูกยืม",
            "บันทึกว่าสมาชิกยืมเพิ่มหนึ่งเล่ม",
        };
        String[] owners = { "Library", "Book", "Member", "Book", "Member" };
        for (int i = 0; i < steps.length; i++) {
            System.out.printf("%d. %s → %s%n", i + 1, steps[i], owners[i]);
        }
    }
}`,
  expectedOutput: "1. สมาชิกขอยืมหนังสือ #1 → Library\n2. ตรวจว่าหนังสือ #1 ยังว่างอยู่ → Book\n3. ตรวจว่าสมาชิกยืมไม่เกินโควตา → Member\n4. บันทึกว่าหนังสือถูกยืม → Book\n5. บันทึกว่าสมาชิกยืมเพิ่มหนึ่งเล่ม → Member",
  tracePrompt: "ใน M0 กติกา “หนังสือที่ถูกยืมอยู่ยืมซ้ำไม่ได้” อยู่ใน static method borrow ของ Catalog ซึ่งอ่าน ArrayList<Boolean> borrowed ถ้าแปลงเป็น object กติกานี้ควรย้ายไปอยู่ที่ไหน และ Library ยังต้องทำอะไรใน use case นี้",
  traceAnswer: "ย้ายไปที่ Book เพราะ Book เป็นเจ้าของข้อมูลว่าถูกยืมอยู่ไหม (book.checkOut() ปฏิเสธเมื่อถูกยืมแล้ว) Library ยังมีหน้าที่ประสานงาน: หาหนังสือและสมาชิกจาก id แล้วส่ง message ให้แต่ละ object ตามลำดับ แต่ไม่ต้องรู้รายละเอียดว่าแต่ละฝ่ายตัดสินใจอย่างไร",
  practicePrompt: "use case “สมาชิกคืนหนังสือ และถ้าคืนช้าต้องจ่ายค่าปรับวันละ 5 บาท” ให้เขียนโครง class สามตัวในไฟล์เดียว: Book, Member, Library แต่ละ class มี comment บรรทัดแรกว่า // รู้: ... และ // ทำ: ... (ความรับผิดชอบ) และมี method signature อย่างน้อยหนึ่งตัวต่อ class ที่สื่อความรับผิดชอบนั้น (ตัว method ใช้ throw new UnsupportedOperationException(\"todo\");) พร้อม class Main ที่พิมพ์ design ready โปรแกรมต้อง compile และรันได้",
  starter: java`public class Main {
    public static void main(String[] args) {
        System.out.println("design ready");
    }
}

class Book {
    // รู้: ...
    // ทำ: ...
}

class Member {
    // รู้: ...
    // ทำ: ...
}

class Library {
    // รู้: ...
    // ทำ: ...
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        System.out.println("design ready");
    }
}

class Book {
    // รู้: id, ชื่อ, ถูกยืมอยู่ไหม และวันครบกำหนดคืน
    // ทำ: รับคืน (เปลี่ยนสถานะเป็นว่าง) และบอกว่าคืนช้ากี่วัน
    int lateDaysOn(int returnDay) {
        throw new UnsupportedOperationException("todo");
    }

    void markReturned() {
        throw new UnsupportedOperationException("todo");
    }
}

class Member {
    // รู้: id, ชื่อ, หนังสือที่ยืมอยู่ และค่าปรับค้างจ่าย
    // ทำ: ลบหนังสือออกจากรายการที่ยืม และสะสมค่าปรับ
    void finishLoan(Book book, int fine) {
        throw new UnsupportedOperationException("todo");
    }
}

class Library {
    // รู้: หนังสือและสมาชิกทั้งหมด และอัตราค่าปรับ (5 บาท/วัน)
    // ทำ: ประสานการคืน: หา object จาก id, ถาม Book ว่าช้ากี่วัน, คำนวณค่าปรับ, แจ้ง Member และ Book
    String returnBook(int bookId, int memberId, int today) {
        throw new UnsupportedOperationException("todo");
    }
}`,
  solutionCheck: { output: "design ready" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        Book book = new Book();
        book.borrowed = true;
        System.out.println(LibraryUtils.canBorrow(book));
    }
}

class Book {
    boolean borrowed;
}

class LibraryUtils {
    static boolean canBorrow(Book book) {
        return !book.borrowed;
    }
}`,
  bugCheck: { kind: "logic", output: "false" },
  bugExplanation: "compile ผ่านและพิมพ์ false ถูกต้อง แต่การออกแบบผิด: Book เป็นแค่ถุงข้อมูลที่ใครก็แก้ borrowed ได้ ส่วนกติกาไปอยู่ใน LibraryUtils ซึ่งไม่ได้เป็นเจ้าของข้อมูล เมื่อมีกติกาเพิ่ม (เช่นหนังสืออ้างอิงห้ามยืม) จะต้องไล่แก้ทุก utility ที่อ่าน borrowed แก้โดยให้ Book มี method canBorrow() / checkOut() เองและซ่อน field (บท encapsulation)",
  vocabulary: [v("use case", "เรื่องที่ผู้ใช้ทำให้สำเร็จผ่านระบบ"), v("responsibility", "สิ่งที่ class รู้หรือทำ"), v("CRC card", "การ์ด Class–Responsibility–Collaborator"), v("information expert", "ให้ความรับผิดชอบกับ object ที่มีข้อมูลที่ใช้ตัดสินใจ"), v("collaborator", "object อื่นที่ต้องคุยด้วยเพื่อทำหน้าที่"), v("data bag", "class ที่มีแต่ข้อมูลแต่ไม่มีพฤติกรรม")],
},
{
  id: "oop-class-object",
  courseId,
  unit: "คิดเป็น object",
  title: "class, object และ instance: แบบแปลนกับของจริงแต่ละชิ้น",
  objective: "ประกาศ class ที่มี field สร้างหลาย object ด้วย new อธิบายว่าแต่ละ instance มี state ของตัวเอง ตัวแปรเก็บ reference และ field มีค่าเริ่มต้นเมื่อยังไม่กำหนด",
  why: "ใน M0 หนังสือหนึ่งเล่มกระจายอยู่สาม list การสร้าง object ทำให้ข้อมูลของหนังสือเล่มเดียวอยู่ด้วยกันเสมอ ไม่มีทางที่ชื่อจะอยู่ index 2 แต่สถานะอยู่ index 3",
  explanation: "class คือแบบแปลนที่บอกว่า object ชนิดนี้มี field (ข้อมูล) และ method (พฤติกรรม) อะไร new Book() สร้าง object ใหม่ (instance) ในหน่วยความจำและคืน reference ให้ตัวแปร แต่ละ instance มี field ชุดของตัวเอง แก้ field ของเล่มหนึ่งไม่กระทบอีกเล่ม field ที่ไม่ได้กำหนดค่ามีค่าเริ่มต้น (0, false, null) ต่างจากตัวแปรใน method ที่ต้องกำหนดก่อนใช้ อ่าน/เขียน field ด้วยจุด book.title บทนี้ยังให้ field เปิดเพื่อเห็นกลไก บทถัด ๆ ไปจะซ่อนไว้หลัง method การพิมพ์ object ตรง ๆ ได้ข้อความแบบ Book@1b6d3586 จนกว่าจะเขียน toString (บท constructor) ไฟล์ .java หนึ่งไฟล์มีได้หลาย class แต่ public ได้ตัวเดียว",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-responsibility", "java-arraylist"],
  example: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Book first = new Book();
        first.id = 1;
        first.title = "Clean Code";

        Book second = new Book();
        second.id = 2;
        second.title = "Java 21";
        second.borrowed = true;

        System.out.println(first.title + " borrowed=" + first.borrowed);
        System.out.println(second.title + " borrowed=" + second.borrowed);

        Book empty = new Book();
        System.out.println(empty.id + " " + empty.title + " " + empty.borrowed);

        ArrayList<Book> shelf = new ArrayList<>();
        shelf.add(first);
        shelf.add(second);
        int available = 0;
        for (Book book : shelf) {
            if (!book.borrowed) {
                available++;
            }
        }
        System.out.println("ว่าง " + available + "/" + shelf.size());
    }
}

class Book {
    int id;
    String title;
    boolean borrowed;
}`,
  expectedOutput: "Clean Code borrowed=false\nJava 21 borrowed=true\n0 null false\nว่าง 1/2",
  tracePrompt: "Book a = new Book(); Book b = new Book(); Book c = a; c.title = \"X\"; b.title = \"Y\"; มี object กี่ตัว และ a.title, b.title, c.title เป็นอะไร",
  traceAnswer: "มี object 2 ตัว (new สองครั้ง) a และ c ชี้ตัวเดียวกัน c.title = \"X\" จึงทำให้ a.title เป็น X ด้วย b เป็นอีกตัวที่มี title Y ผล: a=X, b=Y, c=X",
  practicePrompt: "สร้าง class Member ที่มี field id (int), name (String) และ loanCount (int) ใน main สร้างสมาชิกสองคน (1 Sea, 2 Ton) ใส่ใน ArrayList<Member> เพิ่ม loanCount ของ Sea สองครั้งผ่าน object ที่ดึงจาก list (ไม่ใช่ตัวแปรเดิม) แล้ววนพิมพ์ทุกคนเป็น #1 Sea ยืม 2 เล่ม / #2 Ton ยืม 0 เล่ม เพื่อพิสูจน์ว่า list เก็บ reference ของ object เดียวกัน",
  starter: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Member> members = new ArrayList<>();
        // สร้างสมาชิกสองคนแล้วใส่ใน list
        // ดึง Sea จาก list แล้วเพิ่ม loanCount สองครั้ง
        // วนพิมพ์ทุกคน
    }
}

class Member {
    // field id, name, loanCount
}`,
  solution: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Member> members = new ArrayList<>();
        Member sea = new Member();
        sea.id = 1;
        sea.name = "Sea";
        Member ton = new Member();
        ton.id = 2;
        ton.name = "Ton";
        members.add(sea);
        members.add(ton);

        Member fromList = members.get(0);
        fromList.loanCount++;
        fromList.loanCount++;

        for (Member member : members) {
            System.out.println("#" + member.id + " " + member.name + " ยืม " + member.loanCount + " เล่ม");
        }
    }
}

class Member {
    int id;
    String name;
    int loanCount;
}`,
  solutionCheck: { output: "#1 Sea ยืม 2 เล่ม\n#2 Ton ยืม 0 เล่ม" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        Book book;
        book.title = "Clean Code";
        System.out.println(book.title);
    }
}

class Book {
    String title;
}`,
  bugCheck: { kind: "compile", message: "variable book might not have been initialized" },
  bugExplanation: "compile error: “variable book might not have been initialized” การประกาศ Book book; สร้างแค่ตัวแปรที่จะเก็บ reference ยังไม่มี object ต้อง Book book = new Book(); ก่อนใช้ (ถ้ากำหนด book = null แล้วเรียก book.title จะ compile ผ่านแต่ได้ NullPointerException ตอนรัน)",
  vocabulary: [v("class", "แบบแปลนของ object: field + method"), v("object / instance", "ของจริงที่สร้างจาก class ด้วย new"), v("field", "ข้อมูลที่ object แต่ละตัวเก็บ"), v("new", "สร้าง object และคืน reference"), v("reference", "ค่าที่ชี้ไปยัง object"), v("default value", "ค่าเริ่มต้นของ field: 0, false, null")],
},
{
  id: "oop-fields-methods",
  courseId,
  unit: "สร้าง class",
  title: "instance methods: ให้ object ทำงานกับ state ของตัวเอง",
  objective: "เขียน instance method ที่อ่านและเปลี่ยน field ของ object ผ่าน this ตั้งชื่อ method ตามภาษาของโดเมน (checkOut, giveBack, isAvailable) แทนการให้ผู้อื่นแก้ field เอง และคืนผลที่บอกว่าทำสำเร็จไหม",
  why: "ถ้าทุกที่ในโปรแกรมเขียน book.borrowed = true เองได้ กติกาว่า “ยืมซ้ำไม่ได้” ต้องถูกตรวจซ้ำทุกจุด และลืมได้ง่าย method ที่ object เป็นเจ้าของรวมกติกากับข้อมูลไว้ที่เดียว",
  explanation: "instance method ไม่มี static เรียกผ่าน object: book.checkOut() ภายใน method ใช้ field ของ object ที่ถูกเรียกได้โดยตรง หรือเขียน this.borrowed เพื่อชัดเจน (this คือ reference ของ object ตัวที่ถูกเรียก) ชื่อ method บอกเจตนาในภาษาของงาน: checkOut()/giveBack() บอกเหตุการณ์ ดีกว่า setBorrowed(true) ที่บอกแค่การเปลี่ยน field method ที่อาจทำไม่สำเร็จคืน boolean (หรือ throw ในบทหลัง) ให้ผู้เรียกตัดสินใจต่อ method แบบถาม (query) เช่น isAvailable() ไม่เปลี่ยน state ส่วน method แบบสั่ง (command) เปลี่ยน state — แยกสองแบบนี้ทำให้อ่านง่าย instance method เรียก method อื่นของตัวเองได้ตรง ๆ",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-class-object", "java-methods"],
  example: java`public class Main {
    public static void main(String[] args) {
        Book book = new Book();
        book.title = "Clean Code";
        System.out.println(book.describe());
        System.out.println("checkOut: " + book.checkOut());
        System.out.println("checkOut again: " + book.checkOut());
        System.out.println(book.describe());
        System.out.println("giveBack: " + book.giveBack());
        System.out.println("giveBack again: " + book.giveBack());
        System.out.println(book.describe() + " times=" + book.timesBorrowed);
    }
}

class Book {
    String title;
    boolean borrowed;
    int timesBorrowed;

    boolean isAvailable() {
        return !borrowed;
    }

    boolean checkOut() {
        if (!isAvailable()) {
            return false;
        }
        this.borrowed = true;
        timesBorrowed++;
        return true;
    }

    boolean giveBack() {
        if (isAvailable()) {
            return false;
        }
        borrowed = false;
        return true;
    }

    String describe() {
        return title + (isAvailable() ? " [available]" : " [borrowed]");
    }
}`,
  expectedOutput: "Clean Code [available]\ncheckOut: true\ncheckOut again: false\nClean Code [borrowed]\ngiveBack: true\ngiveBack again: false\nClean Code [available] times=1",
  tracePrompt: "ใน checkOut ถ้าลบ this. ออกจาก this.borrowed = true; ผลเปลี่ยนไหม และเมื่อไรที่ this จำเป็นจริง ๆ",
  traceAnswer: "ไม่เปลี่ยน เพราะไม่มีตัวแปร local ชื่อ borrowed ชื่อจึงหมายถึง field อยู่แล้ว this จำเป็นเมื่อ parameter หรือตัวแปร local ชื่อซ้ำกับ field (เช่น constructor ที่รับ title แล้วต้องเขียน this.title = title) หรือเมื่อต้องส่ง object ตัวเองให้ method อื่น",
  practicePrompt: "สร้าง class Member ที่มี field name, loanCount และค่าคงที่ static final int MAX_LOANS = 3 พร้อม method: boolean canBorrow() (ยืมเพิ่มได้ไหม), boolean borrowOne() (เพิ่มเมื่อยังไม่เกินโควตา คืนว่าสำเร็จไหม), boolean returnOne() (ลดเมื่อมีที่ยืมอยู่), String summary() คืน <name>: <loanCount>/3 ใน main ให้ Sea ยืม 4 ครั้งและคืน 1 ครั้ง พิมพ์ผลของแต่ละครั้งบรรทัดเดียวคั่นด้วยช่องว่าง (true true true false true) แล้วพิมพ์ summary() ซึ่งต้องเป็น Sea: 2/3",
  starter: java`public class Main {
    public static void main(String[] args) {
        Member sea = new Member();
        sea.name = "Sea";
        // ยืม 4 ครั้ง คืน 1 ครั้ง พิมพ์ผลแต่ละครั้งในบรรทัดเดียว
        // พิมพ์ summary
    }
}

class Member {
    static final int MAX_LOANS = 3;
    String name;
    int loanCount;

    // canBorrow, borrowOne, returnOne, summary
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        Member sea = new Member();
        sea.name = "Sea";
        String results = "";
        for (int i = 0; i < 4; i++) {
            results = results + sea.borrowOne() + " ";
        }
        results = results + sea.returnOne();
        System.out.println(results);
        System.out.println(sea.summary());
    }
}

class Member {
    static final int MAX_LOANS = 3;
    String name;
    int loanCount;

    boolean canBorrow() {
        return loanCount < MAX_LOANS;
    }

    boolean borrowOne() {
        if (!canBorrow()) {
            return false;
        }
        loanCount++;
        return true;
    }

    boolean returnOne() {
        if (loanCount == 0) {
            return false;
        }
        loanCount--;
        return true;
    }

    String summary() {
        return name + ": " + loanCount + "/" + MAX_LOANS;
    }
}`,
  solutionCheck: { output: "true true true false true\nSea: 2/3" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        Book book = new Book();
        book.rename("Clean Code");
        System.out.println(book.title);
    }
}

class Book {
    String title;

    void rename(String title) {
        title = title.strip();
    }
}`,
  bugCheck: { kind: "logic", output: "null" },
  bugExplanation: "compile ผ่านแต่พิมพ์ null เพราะใน rename ชื่อ title หมายถึง parameter ไม่ใช่ field (ตัวแปรที่ใกล้กว่าบังทับ field — shadowing) การกำหนด title = title.strip() จึงเปลี่ยนแค่ parameter แก้เป็น this.title = title.strip();",
  vocabulary: [v("instance method", "method ที่ทำงานกับ object ตัวที่ถูกเรียก"), v("this", "reference ไปยัง object ปัจจุบัน"), v("query method", "method ที่ถามโดยไม่เปลี่ยน state"), v("command method", "method ที่เปลี่ยน state"), v("shadowing", "ตัวแปร local/parameter ชื่อซ้ำ field แล้วบังทับ"), v("domain language", "คำที่ผู้ใช้งานจริงใช้ เช่น checkOut, giveBack")],
},
{
  id: "oop-constructor",
  courseId,
  unit: "สร้าง class",
  title: "constructor: object ต้องถูกต้องตั้งแต่เกิด",
  objective: "เขียน constructor ที่รับข้อมูลจำเป็นทั้งหมด ตรวจและปฏิเสธค่าผิดด้วย IllegalArgumentException ใช้ final กับ field ที่ไม่ควรเปลี่ยน เรียก constructor อื่นด้วย this(...) และเขียน toString สำหรับแสดงผล",
  why: "ถ้าสร้าง Book แล้วค่อยกำหนด title ทีหลัง จะมีช่วงเวลาที่หนังสือไม่มีชื่อ และถ้ามีใครลืมกำหนด ข้อมูลเสียจะลามไปทั้งระบบ constructor ทำให้ “object ที่มีอยู่ทุกตัวถูกต้อง” เป็นสิ่งที่ compiler และ runtime ช่วยรับประกัน",
  explanation: "constructor ชื่อเดียวกับ class และไม่มีชนิดที่คืน ทำงานครั้งเดียวตอน new เมื่อประกาศ constructor ที่มี parameter แล้ว constructor เปล่า (default) จะไม่ถูกสร้างให้อัตโนมัติอีก ตรวจ argument ก่อนกำหนด field และ throw IllegalArgumentException เมื่อผิด — new จะไม่คืน object ใดเลย field ที่เป็น final ต้องถูกกำหนดค่าใน constructor ครั้งเดียวและเปลี่ยนไม่ได้อีก (เหมาะกับ id) this(...) เรียก constructor อื่นของ class เดียวกัน ต้องเป็นบรรทัดแรก ใช้ให้ค่าเริ่มต้นโดยไม่เขียนการตรวจซ้ำ @Override public String toString() กำหนดข้อความเมื่อพิมพ์ object (println เรียก toString ให้)",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-fields-methods", "java-exceptions-basic"],
  example: java`public class Main {
    public static void main(String[] args) {
        Book book = new Book(1, "  Clean Code ");
        Book reference = new Book(2, "Java Language Spec", false);
        System.out.println(book);
        System.out.println(reference);
        try {
            new Book(3, "   ");
        } catch (IllegalArgumentException e) {
            System.out.println("rejected: " + e.getMessage());
        }
        try {
            new Book(0, "Refactoring");
        } catch (IllegalArgumentException e) {
            System.out.println("rejected: " + e.getMessage());
        }
    }
}

class Book {
    private final int id;
    private final String title;
    private final boolean loanable;

    Book(int id, String title, boolean loanable) {
        if (id <= 0) {
            throw new IllegalArgumentException("id ต้องเป็นบวก: " + id);
        }
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title ต้องไม่ว่าง");
        }
        this.id = id;
        this.title = title.strip();
        this.loanable = loanable;
    }

    Book(int id, String title) {
        this(id, title, true);
    }

    @Override
    public String toString() {
        return "#" + id + " " + title + (loanable ? "" : " (อ่านในห้องสมุดเท่านั้น)");
    }
}`,
  expectedOutput: "#1 Clean Code\n#2 Java Language Spec (อ่านในห้องสมุดเท่านั้น)\nrejected: title ต้องไม่ว่าง\nrejected: id ต้องเป็นบวก: 0",
  tracePrompt: "ถ้าเพิ่มบรรทัด Book empty = new Book(); ใน main จะเกิดอะไร และถ้าใน constructor สามพารามิเตอร์ย้าย this.title = title.strip(); ไปไว้ก่อนการตรวจ title == null จะเกิดอะไรกับ new Book(3, null)",
  traceAnswer: "new Book() compile ไม่ผ่าน (constructor Book in class Book cannot be applied to given types) เพราะเมื่อมี constructor ที่มี parameter แล้ว Java ไม่สร้าง constructor เปล่าให้ ถ้าย้ายบรรทัด strip ขึ้นก่อน new Book(3, null) จะได้ NullPointerException แทน IllegalArgumentException ที่มีข้อความชัดเจน — ตรวจก่อนใช้เสมอ",
  practicePrompt: "สร้าง class Member ที่มี field final int id, final String name และ int maxLoans constructor หลัก Member(int id, String name, int maxLoans) ปฏิเสธ id ≤ 0, ชื่อว่าง/null และ maxLoans นอกช่วง 1–10 (ข้อความบอกค่าที่ผิด) และ constructor Member(int id, String name) ที่ใช้ maxLoans = 3 ผ่าน this(...) เขียน toString คืน #<id> <name> (max <maxLoans>) ใน main สร้าง new Member(1, \" Sea \") และ new Member(2, \"Ton\", 5) พิมพ์ทั้งคู่ แล้วลองสร้าง new Member(3, \"Fon\", 0) ใน try/catch พิมพ์ rejected: ตามด้วยข้อความ",
  starter: java`public class Main {
    public static void main(String[] args) {
        // สร้างสมาชิกสองคนและพิมพ์
        // ลองสร้างสมาชิกที่ maxLoans เป็น 0
    }
}

class Member {
    // เพิ่ม final ให้ทั้งสาม field เมื่อ constructor กำหนดค่าครบแล้ว
    private int id;
    private String name;
    private int maxLoans;

    // constructor หลักพร้อมการตรวจ
    // constructor สองพารามิเตอร์ที่เรียก this(...)
    // toString
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        System.out.println(new Member(1, " Sea "));
        System.out.println(new Member(2, "Ton", 5));
        try {
            new Member(3, "Fon", 0);
        } catch (IllegalArgumentException e) {
            System.out.println("rejected: " + e.getMessage());
        }
    }
}

class Member {
    private final int id;
    private final String name;
    private final int maxLoans;

    Member(int id, String name, int maxLoans) {
        if (id <= 0) {
            throw new IllegalArgumentException("id ต้องเป็นบวก: " + id);
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name ต้องไม่ว่าง");
        }
        if (maxLoans < 1 || maxLoans > 10) {
            throw new IllegalArgumentException("maxLoans ต้องอยู่ระหว่าง 1–10: " + maxLoans);
        }
        this.id = id;
        this.name = name.strip();
        this.maxLoans = maxLoans;
    }

    Member(int id, String name) {
        this(id, name, 3);
    }

    @Override
    public String toString() {
        return "#" + id + " " + name + " (max " + maxLoans + ")";
    }
}`,
  solutionCheck: { output: "#1 Sea (max 3)\n#2 Ton (max 5)\nrejected: maxLoans ต้องอยู่ระหว่าง 1–10: 0" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        System.out.println(new Book(1, "Clean Code"));
    }
}

class Book {
    private final int id;
    private final String title;

    Book(int id, String title) {
        this.id = id;
        if (title.isBlank()) {
            return;
        }
        this.title = title;
    }

    @Override
    public String toString() {
        return "#" + id + " " + title;
    }
}`,
  bugCheck: { kind: "compile", message: "variable title might not have been initialized" },
  bugExplanation: "compile error: “variable title might not have been initialized” เมื่อ title ว่าง constructor return ออกไปก่อนกำหนด final field title compiler จึงปฏิเสธ — และนั่นคือสิ่งที่ถูกต้อง เพราะ object ที่ไม่มีชื่อไม่ควรเกิดขึ้น แก้โดย throw new IllegalArgumentException(\"title ต้องไม่ว่าง\") แทน return",
  vocabulary: [v("constructor", "โค้ดที่ทำงานตอน new เพื่อให้ object เริ่มต้นถูกต้อง"), v("invariant", "เงื่อนไขที่ต้องจริงเสมอตลอดชีวิตของ object"), v("final field", "field ที่กำหนดค่าได้ครั้งเดียวใน constructor"), v("this(...)", "เรียก constructor อื่นของ class เดียวกัน"), v("toString", "ข้อความที่ใช้แสดง object"), v("@Override", "บอก compiler ว่ากำลังเขียนทับ method ของ class แม่/interface")],
},
{
  id: "oop-identity",
  courseId,
  unit: "สร้าง class",
  title: "identity กับ equality: == กับ equals/hashCode ของ object",
  objective: "แยก identity (object ตัวเดียวกัน, ==) กับ equality (มีความหมายเท่ากัน, equals) override equals และ hashCode ตามสิ่งที่ระบุตัวตนในโดเมน (เช่น id) และอธิบายผลต่อ ArrayList.contains, indexOf และ HashSet",
  why: "หนังสือที่โหลดจากไฟล์สองครั้งได้ object สองตัวที่เป็นเล่มเดียวกัน ถ้า equals ยังเป็นค่าเริ่มต้น list.contains จะตอบว่าไม่มี และ HashSet จะเก็บซ้ำ bug แบบนี้เกิดเงียบ ๆ ตอนรวมข้อมูล",
  explanation: "== กับ object เทียบ reference: เป็นตัวเดียวกันในหน่วยความจำไหม equals ค่าเริ่มต้น (จาก Object) ก็เทียบ reference แบบเดียวกัน ต้อง override เพื่อบอกว่าเมื่อไร “เท่ากันในความหมาย” สำหรับ entity ที่มี id (หนังสือ, สมาชิก) เทียบด้วย id เท่านั้น ไม่ใช่ทุก field เพราะสถานะ (ถูกยืมอยู่ไหม) เปลี่ยนได้แต่ยังเป็นเล่มเดิม รูปแบบ: ตรวจ this == other, ตรวจชนิดด้วย instanceof pattern (other instanceof Book book), แล้วเทียบ field กติกาสำคัญ: override equals ต้อง override hashCode ด้วย (object ที่ equals กันต้องได้ hashCode เท่ากัน) ไม่งั้น HashSet/HashMap หาไม่เจอ ใช้ Objects.hash(...) หรือ Integer.hashCode(id) ArrayList.contains/indexOf/remove(Object) ใช้ equals ส่วน HashSet ใช้ hashCode ก่อนแล้วจึง equals",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-constructor"],
  example: java`import java.util.ArrayList;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Book loaded = new Book(1, "Clean Code");
        Book loadedAgain = new Book(1, "Clean Code");
        Book same = loaded;
        System.out.println((loaded == same) + " " + (loaded == loadedAgain) + " " + loaded.equals(loadedAgain));

        ArrayList<Book> shelf = new ArrayList<>();
        shelf.add(loaded);
        System.out.println(shelf.contains(loadedAgain) + " " + shelf.indexOf(new Book(1, "ชื่อเปลี่ยนแล้ว")));

        HashSet<Book> unique = new HashSet<>();
        unique.add(loaded);
        unique.add(loadedAgain);
        unique.add(new Book(2, "Java 21"));
        System.out.println(unique.size());

        Note a = new Note("x");
        Note b = new Note("x");
        System.out.println(a.equals(b));
    }
}

class Book {
    private final int id;
    private final String title;

    Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        return other instanceof Book book && id == book.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

class Note {
    private final String text;

    Note(String text) {
        this.text = text;
    }
}`,
  expectedOutput: "true false true\ntrue 0\n2\nfalse",
  tracePrompt: "ถ้าลบ method hashCode ออกจาก Book (เหลือ equals ที่เทียบ id) unique.size() มีแนวโน้มเป็นเท่าไร และ shelf.contains(loadedAgain) ยังเป็น true ไหม เพราะอะไร",
  traceAnswer: "unique.size() มักเป็น 3 เพราะ hashCode ค่าเริ่มต้นต่างกันตาม object HashSet จึงวางสองเล่มที่ equals กันไว้คนละช่องและไม่เคยเรียก equals เทียบ ส่วน shelf.contains ยังเป็น true เพราะ ArrayList เทียบด้วย equals ไล่ทีละตัวโดยไม่ใช้ hashCode — bug จึงโผล่เฉพาะเมื่อใช้ HashSet/HashMap",
  practicePrompt: "สร้าง class Member (id, name, loanCount ที่เปลี่ยนได้) ที่ equals/hashCode ตาม id เท่านั้น ใน main: สร้าง ArrayList<Member> ที่มี #1 Sea และ #2 Ton แล้วจำลองการโหลดข้อมูลใหม่ด้วย new Member(1, \"Sea Wee\") ใช้ indexOf หา index ของสมาชิกที่โหลดมา แล้ว set แทนที่ object เดิมใน list พิมพ์ index และชื่อของทุกคนในบรรทัดเดียว (0 [Sea Wee, Ton]) จากนั้นใส่ทั้งสามตัว (#1 เดิม, #1 ใหม่, #2) ใน HashSet และพิมพ์ size ซึ่งต้องเป็น 2",
  starter: java`import java.util.ArrayList;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        // list ของ #1 Sea และ #2 Ton
        // สมาชิก #1 ที่โหลดใหม่ชื่อ Sea Wee: หา index แล้วแทนที่
        // พิมพ์ index และรายชื่อ
        // HashSet ของสามตัว แล้วพิมพ์ size
    }
}

class Member {
    private final int id;
    private final String name;
    private int loanCount;

    Member(int id, String name) {
        this.id = id;
        this.name = name;
    }

    String name() {
        return name;
    }

    // equals และ hashCode ตาม id
}`,
  solution: java`import java.util.ArrayList;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Member sea = new Member(1, "Sea");
        Member ton = new Member(2, "Ton");
        ArrayList<Member> members = new ArrayList<>();
        members.add(sea);
        members.add(ton);

        Member reloaded = new Member(1, "Sea Wee");
        int index = members.indexOf(reloaded);
        members.set(index, reloaded);
        ArrayList<String> names = new ArrayList<>();
        for (Member member : members) {
            names.add(member.name());
        }
        System.out.println(index + " " + names);

        HashSet<Member> unique = new HashSet<>();
        unique.add(sea);
        unique.add(reloaded);
        unique.add(ton);
        System.out.println(unique.size());
    }
}

class Member {
    private final int id;
    private final String name;
    private int loanCount;

    Member(int id, String name) {
        this.id = id;
        this.name = name;
    }

    String name() {
        return name;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        return other instanceof Member member && id == member.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}`,
  solutionCheck: { output: "0 [Sea Wee, Ton]\n2" },
  buggy: java`import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<Book> books = new HashSet<>();
        books.add(new Book(1));
        System.out.println(books.contains(new Book(1)));
    }
}

class Book {
    private final int id;

    Book(int id) {
        this.id = id;
    }

    public boolean equals(Book other) {
        return other != null && id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}`,
  bugCheck: { kind: "logic", output: "false" },
  bugExplanation: "compile ผ่านแต่พิมพ์ false เพราะ equals(Book other) เป็น overload ใหม่ ไม่ได้ override equals(Object) ที่ HashSet เรียก HashSet จึงใช้ equals ค่าเริ่มต้น (เทียบ reference) แก้เป็น public boolean equals(Object other) และใส่ @Override — ถ้าใส่ @Override ตั้งแต่แรก javac จะแจ้ง “method does not override or implement a method from a supertype” ทันที",
  vocabulary: [v("identity", "เป็น object ตัวเดียวกัน (==)"), v("equality", "เท่ากันตามความหมาย (equals)"), v("entity", "object ที่ระบุตัวตนด้วย id แม้ state เปลี่ยน"), v("hashCode", "ตัวเลขที่ HashSet/HashMap ใช้หาช่องเก็บ"), v("instanceof pattern", "other instanceof Book book ตรวจชนิดและตั้งชื่อในคำสั่งเดียว"), v("equals/hashCode contract", "object ที่ equals กันต้องมี hashCode เท่ากัน")],
},
{
  id: "oop-static",
  courseId,
  unit: "สร้าง class",
  title: "static กับ instance: อะไรเป็นของ class อะไรเป็นของแต่ละ object",
  objective: "แยกได้ว่าข้อมูล/พฤติกรรมใดเป็นของ class ทั้งหมด (static) หรือของแต่ละ object ใช้ static final กับค่าคงที่ และ static method กับงานที่ไม่ขึ้นกับ state ของ object พร้อมอธิบายปัญหาของ static field ที่เปลี่ยนค่าได้ (global state)",
  why: "M0 ใช้ static ทั้งหมด จึงมีห้องสมุดได้แค่หนึ่งแห่งในโปรแกรมและ test สองชุดชนกัน การรู้ว่าเมื่อไรควรใช้ static ช่วยให้ย้ายจาก M0 ไปเป็น object ได้ถูก",
  explanation: "field ที่เป็น static มีชุดเดียวต่อ class ทุก object ใช้ร่วมกัน field ไม่ static มีชุดของแต่ละ object static method เรียกผ่านชื่อ class (LoanPolicy.fineFor(3)) และไม่มี this จึงใช้ instance field โดยตรงไม่ได้ (compile error “non-static variable cannot be referenced from a static context”) ใช้ static เมื่อ: ค่าคงที่ (static final int MAX_LOANS = 3), function ที่คำนวณจาก parameter อย่างเดียว (Math.max, LoanPolicy.fineFor), factory method ที่สร้าง object (Book.of(...)) ระวัง static field ที่เปลี่ยนค่าได้ เช่นตัวนับ id แบบ static: ค่าค้างข้าม test, มีได้แค่ชุดเดียวทั้งโปรแกรม และทุกส่วนแก้ได้ ทางที่ดีกว่าคือให้ object ที่เป็นเจ้าของ (เช่น Catalog) ถือตัวนับเป็น instance field",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-identity"],
  example: java`public class Main {
    public static void main(String[] args) {
        System.out.println(LoanPolicy.fineFor(3) + " " + LoanPolicy.fineFor(40));

        GlobalIds.next();
        GlobalIds.next();
        Catalog a = new Catalog();
        Catalog b = new Catalog();
        System.out.println(a.addBook("Clean Code") + " " + a.addBook("Java 21") + " " + b.addBook("Refactoring"));
        System.out.println("global next = " + GlobalIds.next());
    }
}

class LoanPolicy {
    static final int FINE_PER_DAY = 5;
    static final int MAX_FINE = 100;

    static int fineFor(int lateDays) {
        return Math.min(Math.max(lateDays, 0) * FINE_PER_DAY, MAX_FINE);
    }
}

class GlobalIds {
    private static int nextId = 1;

    static int next() {
        return nextId++;
    }
}

class Catalog {
    private int nextId = 1;

    String addBook(String title) {
        int id = nextId++;
        return "#" + id + " " + title;
    }
}`,
  expectedOutput: "15 100\n#1 Clean Code #2 Java 21 #1 Refactoring\nglobal next = 3",
  tracePrompt: "ถ้าเปลี่ยน private int nextId = 1; ใน Catalog เป็น private static int nextId = 1; บรรทัดที่สองของผลจะเปลี่ยนเป็นอะไร และทำไมจึงเป็นปัญหาเมื่อเขียน test หลายชุด",
  traceAnswer: "เป็น #1 Clean Code #2 Java 21 #3 Refactoring เพราะทุก Catalog ใช้ตัวนับร่วมกัน catalog b จึงไม่ได้เริ่มที่ 1 ใน test แต่ละ test ที่สร้าง Catalog ใหม่จะได้ id ที่ขึ้นกับว่ามี test ไหนรันก่อน ผลจึงเปลี่ยนตามลำดับการรัน",
  practicePrompt: "แปลง M0 ส่วนตัวนับ id ให้เป็น instance: สร้าง class Catalog ที่มี instance field nextId และ ArrayList<String> titles, method int add(String title) คืน id ใหม่ และ String list() คืนแต่ละบรรทัด #<id> <title> (ใช้ String.join) และ class LoanPolicy ที่มีเฉพาะ static final MAX_LOANS = 2 กับ static boolean canBorrow(int currentLoans) ใน main สร้าง Catalog สองแห่ง เพิ่ม 2 เล่มในแห่งแรกและ 1 เล่มในแห่งที่สอง พิมพ์ list() ของทั้งสอง (แห่งละบรรทัดหรือหลายบรรทัด) และพิมพ์ LoanPolicy.canBorrow(1) กับ canBorrow(2)",
  starter: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // catalog สองแห่ง
        // พิมพ์ list ของทั้งสอง
        // พิมพ์ canBorrow(1) และ canBorrow(2)
    }
}

class Catalog {
    // instance field: nextId และ titles
}

class LoanPolicy {
    // static final MAX_LOANS และ static canBorrow
}`,
  solution: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Catalog central = new Catalog();
        Catalog branch = new Catalog();
        central.add("Clean Code");
        central.add("Java 21");
        branch.add("Refactoring");
        System.out.println(central.list());
        System.out.println(branch.list());
        System.out.println(LoanPolicy.canBorrow(1) + " " + LoanPolicy.canBorrow(2));
    }
}

class Catalog {
    private int nextId = 1;
    private final ArrayList<String> titles = new ArrayList<>();

    int add(String title) {
        titles.add("#" + nextId + " " + title);
        return nextId++;
    }

    String list() {
        return String.join("\n", titles);
    }
}

class LoanPolicy {
    static final int MAX_LOANS = 2;

    static boolean canBorrow(int currentLoans) {
        return currentLoans < MAX_LOANS;
    }
}`,
  solutionCheck: { output: "#1 Clean Code\n#2 Java 21\n#1 Refactoring\ntrue false" },
  buggy: java`public class Main {
    private int visits = 0;

    public static void main(String[] args) {
        visits++;
        System.out.println(visits);
    }
}`,
  bugCheck: { kind: "compile", message: "non-static variable visits cannot be referenced from a static context" },
  bugExplanation: "compile error: “non-static variable visits cannot be referenced from a static context” main เป็น static จึงไม่มี object (ไม่มี this) ที่จะเป็นเจ้าของ visits แก้โดยสร้าง object แล้วเรียกผ่าน object (เช่นย้าย logic ไป method ไม่ static แล้ว new Main().run()) — การแก้ด้วยการเติม static ให้ visits ทำให้ compile ผ่านแต่ได้ global state",
  vocabulary: [v("static field", "field ชุดเดียวที่ทุก object ของ class ใช้ร่วมกัน"), v("static method", "method ของ class ไม่มี this"), v("instance field", "field ที่แต่ละ object มีของตัวเอง"), v("constant", "static final ที่ไม่เปลี่ยน"), v("global state", "ข้อมูลที่ทุกส่วนของโปรแกรมแก้ได้ ทำให้ผลขึ้นกับลำดับ"), v("factory method", "static method ที่สร้างและคืน object")],
},
{
  id: "oop-encapsulation",
  courseId,
  unit: "รักษาสถานะ",
  title: "encapsulation: ซ่อน state และให้ object รักษากติกาเอง",
  objective: "ทำ field เป็น private เปิดเฉพาะ method ที่สื่อการกระทำในโดเมน ปฏิเสธ operation ที่ผิดกติกาด้วย exception ไม่สร้าง setter ให้ทุก field และไม่ปล่อย reference ของ collection ภายในออกไปให้ผู้อื่นแก้",
  why: "ถ้า loans ของ Member เป็น public หรือ getLoans() คืน list ตัวจริง ใครก็ add เล่มที่สี่เข้าไปได้โดยไม่ผ่านกติกาโควตา encapsulation ไม่ใช่แค่ใส่ private แล้วสร้าง getter/setter แต่คือการทำให้ทุกเส้นทางที่เปลี่ยน state ผ่านกติกา",
  explanation: "private ทำให้ field เข้าถึงได้เฉพาะใน class เดียวกัน การเปลี่ยน state ต้องผ่าน method ที่ตรวจกติกา (invariant) ทุกครั้ง setter ทั่วไป (setLoanCount(int)) เปิดช่องให้ข้ามกติกา ให้ใช้ method ที่บอกเหตุการณ์ (borrow, giveBack) แทน method ที่ทำไม่ได้ควร throw (IllegalStateException เมื่อสถานะไม่อนุญาต, IllegalArgumentException เมื่อ argument ผิด) แทนการเงียบ getter ที่คืน collection ต้องไม่คืนตัวจริง: คืน List.copyOf(loans) (สำเนาที่แก้ไม่ได้) หรือ Collections.unmodifiableList(loans) (มุมมองที่แก้ไม่ได้แต่เห็นการเปลี่ยนแปลงภายหลัง) object ที่รับเข้ามา (เช่น list ใน constructor) ก็ควรคัดลอกเก็บ เพื่อไม่ให้ผู้ส่งแก้ทีหลังได้",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-static"],
  example: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Member sea = new Member("Sea", 2);
        sea.borrow("Clean Code");
        sea.borrow("Java 21");
        try {
            sea.borrow("Refactoring");
        } catch (IllegalStateException e) {
            System.out.println("rejected: " + e.getMessage());
        }
        List<String> view = sea.loans();
        try {
            view.add("แอบเพิ่ม");
        } catch (UnsupportedOperationException e) {
            System.out.println("cannot modify loans from outside");
        }
        sea.giveBack("Clean Code");
        System.out.println(sea.loans() + " " + view);
    }
}

class Member {
    private final String name;
    private final int maxLoans;
    private final ArrayList<String> loans = new ArrayList<>();

    Member(String name, int maxLoans) {
        this.name = name;
        this.maxLoans = maxLoans;
    }

    void borrow(String title) {
        if (loans.size() >= maxLoans) {
            throw new IllegalStateException(name + " ยืมครบ " + maxLoans + " เล่มแล้ว");
        }
        loans.add(title);
    }

    void giveBack(String title) {
        if (!loans.remove(title)) {
            throw new IllegalArgumentException(name + " ไม่ได้ยืม " + title);
        }
    }

    List<String> loans() {
        return List.copyOf(loans);
    }
}`,
  expectedOutput: "rejected: Sea ยืมครบ 2 เล่มแล้ว\ncannot modify loans from outside\n[Java 21] [Clean Code, Java 21]",
  tracePrompt: "ทำไมในบรรทัดสุดท้าย view ยังเป็น [Clean Code, Java 21] ทั้งที่คืน Clean Code ไปแล้ว ถ้าเปลี่ยน loans() เป็น return Collections.unmodifiableList(loans); ผลจะเป็นอย่างไร",
  traceAnswer: "List.copyOf สร้างสำเนา ณ เวลาที่เรียก view จึงไม่เห็นการเปลี่ยนภายหลัง ถ้าใช้ unmodifiableList ผู้รับได้มุมมองที่แก้ไม่ได้แต่ชี้ list ตัวจริง view จะเห็นการคืนและพิมพ์ [Java 21] [Java 21] — เลือกตามความต้องการ: สำเนาปลอดภัยและคาดเดาได้กว่า มุมมองประหยัดกว่าแต่ผู้รับเห็นข้อมูลเปลี่ยนไปเรื่อย ๆ",
  practicePrompt: "สร้าง class Book (private: id, title, borrowedBy เป็น String หรือ null) ที่ไม่มี setter เลย มีเฉพาะ: void checkOut(String memberName) (throw IllegalStateException \"#<id> ถูกยืมโดย <ชื่อ> อยู่แล้ว\" ถ้าถูกยืมอยู่, IllegalArgumentException ถ้าชื่อว่าง), void giveBack() (throw IllegalStateException \"#<id> ไม่ได้ถูกยืม\" ถ้าว่างอยู่), boolean isAvailable(), String status() คืน #<id> <title> [available] หรือ [borrowed by <ชื่อ>] ใน main ทำตามลำดับ: status, Sea ยืม, status, Ton ยืม (จับ exception พิมพ์ข้อความ), คืน, คืนซ้ำ (จับ exception), status",
  starter: java`public class Main {
    public static void main(String[] args) {
        Book book = new Book(1, "Clean Code");
        // ทำตามลำดับในโจทย์ จับ exception แล้วพิมพ์ e.getMessage()
    }
}

class Book {
    private final int id;
    private final String title;
    private String borrowedBy;

    Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    // checkOut, giveBack, isAvailable, status
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        Book book = new Book(1, "Clean Code");
        System.out.println(book.status());
        book.checkOut("Sea");
        System.out.println(book.status());
        try {
            book.checkOut("Ton");
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
        book.giveBack();
        try {
            book.giveBack();
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
        System.out.println(book.status());
    }
}

class Book {
    private final int id;
    private final String title;
    private String borrowedBy;

    Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    boolean isAvailable() {
        return borrowedBy == null;
    }

    void checkOut(String memberName) {
        if (memberName == null || memberName.isBlank()) {
            throw new IllegalArgumentException("ต้องระบุชื่อผู้ยืม");
        }
        if (!isAvailable()) {
            throw new IllegalStateException("#" + id + " ถูกยืมโดย " + borrowedBy + " อยู่แล้ว");
        }
        borrowedBy = memberName;
    }

    void giveBack() {
        if (isAvailable()) {
            throw new IllegalStateException("#" + id + " ไม่ได้ถูกยืม");
        }
        borrowedBy = null;
    }

    String status() {
        return "#" + id + " " + title + (isAvailable() ? " [available]" : " [borrowed by " + borrowedBy + "]");
    }
}`,
  solutionCheck: { output: "#1 Clean Code [available]\n#1 Clean Code [borrowed by Sea]\n#1 ถูกยืมโดย Sea อยู่แล้ว\n#1 ไม่ได้ถูกยืม\n#1 Clean Code [available]" },
  buggy: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Member sea = new Member(2);
        sea.getLoans().add("A");
        sea.getLoans().add("B");
        sea.getLoans().add("C");
        System.out.println(sea.getLoans().size() + " เล่ม (โควตา 2)");
    }
}

class Member {
    private final int maxLoans;
    private final ArrayList<String> loans = new ArrayList<>();

    Member(int maxLoans) {
        this.maxLoans = maxLoans;
    }

    List<String> getLoans() {
        return loans;
    }
}`,
  bugCheck: { kind: "logic", output: "3 เล่ม (โควตา 2)" },
  bugExplanation: "compile ผ่านและพิมพ์ 3 เล่ม (โควตา 2) field เป็น private ก็จริง แต่ getLoans() คืน reference ของ list ตัวจริง ผู้เรียกจึงแก้ state ได้โดยไม่ผ่านกติกาโควตา private อย่างเดียวไม่ใช่ encapsulation แก้โดยคืน List.copyOf(loans) และเพิ่ม method borrow(String) ที่ตรวจโควตาเป็นทางเดียวที่เพิ่มรายการได้",
  vocabulary: [v("encapsulation", "ซ่อน state และให้ทุกการเปลี่ยนผ่านกติกาของ object"), v("private", "เข้าถึงได้เฉพาะใน class เดียวกัน"), v("invariant", "กติกาที่ต้องจริงเสมอ เช่น ยืมไม่เกินโควตา"), v("defensive copy", "คัดลอกข้อมูลก่อนเก็บหรือคืนเพื่อกันการแก้จากภายนอก"), v("IllegalStateException", "ทำสิ่งนี้ไม่ได้ในสถานะปัจจุบัน"), v("List.copyOf", "สำเนาที่แก้ไม่ได้ของ list")],
},
{
  id: "oop-project-library-1",
  courseId,
  unit: "Project: Library Management CLI",
  title: "★ Library CLI M1: แทน ArrayList คู่ขนานด้วย Book, Member และ Catalog",
  objective: "refactor Library CLI M0 ให้เป็น object: Book รักษาสถานะการยืมของตัวเอง, Member เก็บข้อมูลสมาชิก, Catalog (instance ไม่ใช่ static) ถือรายการและออก id และ Main แปลงคำสั่งเป็นการเรียก method — พร้อมไฟล์ test-input/expected-output ที่ครอบคลุมทุกข้อความ",
  why: "M0 ต้องแก้สาม list พร้อมกันทุกครั้งและมีห้องสมุดได้แห่งเดียวเพราะทุกอย่างเป็น static M1 พิสูจน์ว่า class ที่ออกแบบจากความรับผิดชอบทำให้กติกาอยู่ที่เดียว และโปรแกรมทดสอบซ้ำได้ด้วยไฟล์ input เดิม",
  explanation: "ข้อกำหนด M1 (ข้อความต้องตรงทุกตัวอักษร): add <title> → added book #<id> หรือ title required; member <name> → added member #<id> หรือ name required; list → แต่ละเล่ม #<id> <title> [available] หรือ [borrowed] หรือ (no books); members → แต่ละคน #<id> <name> หรือ (no members); borrow <id> → borrowed #<id> / already borrowed / no such book; return <id> → returned #<id> / not borrowed / no such book; id ที่ไม่ใช่ตัวเลข → id must be a number; บรรทัดว่างข้าม; quit → bye แล้วจบ; คำสั่งอื่น → unknown command: <คำสั่ง> การออกแบบ: Book ตรวจกติกาการยืม/คืนเองและ throw IllegalStateException ที่มีข้อความตรงตามข้อกำหนด, constructor ของ Book/Member throw IllegalArgumentException เมื่อชื่อว่าง (และไม่เสีย id), Catalog เป็น object ที่ Main สร้างขึ้น (จึงสร้างหลาย catalog ใน test ได้), Main เป็นผู้เดียวที่อ่าน input และพิมพ์ และแปลง exception เป็นข้อความ",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-encapsulation", "java-project-library-0"],
  example: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Book> books = new ArrayList<>();
        books.add(new Book(1, "Clean Code"));
        books.add(new Book(2, "Java 21"));
        books.get(0).checkOut();
        try {
            books.get(0).checkOut();
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
        for (Book book : books) {
            System.out.println(book);
        }
    }
}

class Book {
    private final int id;
    private final String title;
    private boolean borrowed;

    Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    void checkOut() {
        if (borrowed) {
            throw new IllegalStateException("already borrowed");
        }
        borrowed = true;
    }

    @Override
    public String toString() {
        return "#" + id + " " + title + (borrowed ? " [borrowed]" : " [available]");
    }
}`,
  expectedOutput: "already borrowed\n#1 Clean Code [borrowed]\n#2 Java 21 [available]",
  tracePrompt: "ใน M1 ถ้า add ได้รับชื่อว่าง Book constructor throw ก่อน Catalog จะเพิ่ม nextBookId ทำไมลำดับนี้สำคัญ ถ้า Catalog เพิ่ม nextBookId++ ก่อน new Book(...) จะเห็นอะไรผิดในข้อความ added book #...",
  traceAnswer: "ถ้าเพิ่ม id ก่อนแล้ว constructor throw id นั้นจะหายไปโดยไม่มีหนังสือ หนังสือเล่มถัดไปจะได้ #2 ทั้งที่มีเล่มเดียว (expected-output ที่ว่า added book #1 จะไม่ตรง) การสร้าง object ให้สำเร็จก่อนแล้วจึงเปลี่ยน state ของ Catalog ทำให้ความล้มเหลวไม่ทิ้งร่องรอย",
  practicePrompt: "สร้าง Library CLI M1 ตามข้อกำหนดในคำอธิบาย ใน package library อย่างน้อย 4 ไฟล์ (Book, Member, Catalog, Main) ห้ามใช้ static field ที่เปลี่ยนค่าได้ เขียน test-input.txt และ expected-output.txt ให้ครอบคลุมทุกข้อความตอบกลับ แล้วรัน javac -d out src/library/*.java และ java -cp out library.Main < test-input.txt เทียบกับ expected-output.txt",
  starter: java`// File: library/Book.java
package library;

public class Book {
    // id, title, borrowed + checkOut, giveBack, toString
}
// File: library/Member.java
package library;

public class Member {
    // id, name + toString
}
// File: library/Catalog.java
package library;

public class Catalog {
    // books, members, nextBookId, nextMemberId (instance fields)
    // addBook, addMember, findBook, listBooks, listMembers
}
// File: library/Main.java
package library;

import java.util.Scanner;

public class Main {
    private final Catalog catalog = new Catalog();

    String handle(String line) {
        return "";
    }

    public static void main(String[] args) {
        Main app = new Main();
        Scanner scanner = new Scanner(System.in);
        // อ่านทีละบรรทัด ส่งให้ app.handle แล้วพิมพ์ผลที่ไม่ว่าง หยุดเมื่อ quit
    }
}`,
  solution: java`// File: library/Book.java
package library;

public class Book {
    private final int id;
    private final String title;
    private boolean borrowed;

    Book(int id, String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title required");
        }
        this.id = id;
        this.title = title.strip();
    }

    int id() {
        return id;
    }

    void checkOut() {
        if (borrowed) {
            throw new IllegalStateException("already borrowed");
        }
        borrowed = true;
    }

    void giveBack() {
        if (!borrowed) {
            throw new IllegalStateException("not borrowed");
        }
        borrowed = false;
    }

    @Override
    public String toString() {
        return "#" + id + " " + title + (borrowed ? " [borrowed]" : " [available]");
    }
}
// File: library/Member.java
package library;

public class Member {
    private final int id;
    private final String name;

    Member(int id, String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name required");
        }
        this.id = id;
        this.name = name.strip();
    }

    int id() {
        return id;
    }

    @Override
    public String toString() {
        return "#" + id + " " + name;
    }
}
// File: library/Catalog.java
package library;

import java.util.ArrayList;

public class Catalog {
    private final ArrayList<Book> books = new ArrayList<>();
    private final ArrayList<Member> members = new ArrayList<>();
    private int nextBookId = 1;
    private int nextMemberId = 1;

    Book addBook(String title) {
        Book book = new Book(nextBookId, title);
        nextBookId++;
        books.add(book);
        return book;
    }

    Member addMember(String name) {
        Member member = new Member(nextMemberId, name);
        nextMemberId++;
        members.add(member);
        return member;
    }

    Book findBook(int id) {
        for (Book book : books) {
            if (book.id() == id) {
                return book;
            }
        }
        return null;
    }

    String listBooks() {
        return books.isEmpty() ? "(no books)" : joinLines(books);
    }

    String listMembers() {
        return members.isEmpty() ? "(no members)" : joinLines(members);
    }

    private static String joinLines(ArrayList<?> items) {
        ArrayList<String> lines = new ArrayList<>();
        for (Object item : items) {
            lines.add(item.toString());
        }
        return String.join("\n", lines);
    }
}
// File: library/Main.java
package library;

import java.util.Scanner;

public class Main {
    private final Catalog catalog = new Catalog();

    String handle(String line) {
        String[] parts = line.split(" ", 2);
        String command = parts[0].toLowerCase();
        String arg = parts.length > 1 ? parts[1].strip() : "";
        try {
            return switch (command) {
                case "add" -> "added book #" + catalog.addBook(arg).id();
                case "member" -> "added member #" + catalog.addMember(arg).id();
                case "list" -> catalog.listBooks();
                case "members" -> catalog.listMembers();
                case "borrow", "return" -> changeLoan(command, arg);
                default -> "unknown command: " + command;
            };
        } catch (IllegalArgumentException | IllegalStateException e) {
            return e.getMessage();
        }
    }

    private String changeLoan(String command, String arg) {
        int id;
        try {
            id = Integer.parseInt(arg);
        } catch (NumberFormatException e) {
            return "id must be a number";
        }
        Book book = catalog.findBook(id);
        if (book == null) {
            return "no such book";
        }
        if (command.equals("borrow")) {
            book.checkOut();
            return "borrowed #" + id;
        }
        book.giveBack();
        return "returned #" + id;
    }

    public static void main(String[] args) {
        Main app = new Main();
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;
            }
            if (line.equalsIgnoreCase("quit")) {
                System.out.println("bye");
                break;
            }
            System.out.println(app.handle(line));
        }
    }
}
// File: test-input.txt
list
members
add
add Clean Code
add Java 21
member
member Sea
members

borrow 1
borrow 1
borrow x
return 2
return 1
return 9
borrow 1
list
dance
quit
add ignored
// File: expected-output.txt
(no books)
(no members)
title required
added book #1
added book #2
name required
added member #1
#1 Sea
borrowed #1
already borrowed
id must be a number
not borrowed
returned #1
no such book
borrowed #1
#1 Clean Code [borrowed]
#2 Java 21 [available]
unknown command: dance
bye
`,
  bugCheck: { kind: "logic", output: "added book #2" },
  buggy: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Catalog catalog = new Catalog();
        try {
            catalog.addBook("   ");
        } catch (IllegalArgumentException e) {
            // ผู้ใช้พิมพ์ชื่อว่าง แล้วพิมพ์ใหม่
        }
        System.out.println(catalog.addBook("Clean Code"));
    }
}

class Catalog {
    private final ArrayList<String> titles = new ArrayList<>();
    private int nextId = 1;

    String addBook(String title) {
        int id = nextId++;
        if (title.isBlank()) {
            throw new IllegalArgumentException("title required");
        }
        titles.add(title);
        return "added book #" + id;
    }
}`,
  bugExplanation: "พิมพ์ added book #2 ทั้งที่เป็นหนังสือเล่มแรก เพราะ nextId++ ทำก่อนการตรวจชื่อ เมื่อ throw id 1 จึงถูกใช้ไปโดยไม่มีหนังสือ compile ผ่านเป็น logic bug แก้โดยตรวจ/สร้างให้สำเร็จก่อน (หรือให้ constructor ของ Book ตรวจ) แล้วจึงเพิ่ม nextId",
  vocabulary: [v("refactor", "ปรับโครงสร้างโค้ดโดยพฤติกรรมเดิม"), v("golden master", "ผลลัพธ์ที่ยืนยันแล้วซึ่งใช้เทียบหลังแก้โค้ด"), v("fixture", "ไฟล์ข้อมูลที่ใช้ทดสอบ เช่น test-input.txt"), v("instance state", "ข้อมูลที่ object แต่ละตัวถือไว้เอง"), v("multi-catch", "catch (A | B e) จับหลายชนิดด้วยบล็อกเดียว"), v("milestone", "ระยะของโปรเจกต์ที่ส่งมอบได้")],
},
{
  id: "oop-composition",
  courseId,
  unit: "ประกอบระบบ",
  title: "composition: สร้าง object ใหญ่จาก object เล็ก (has-a)",
  objective: "ออกแบบ class ที่ “มี” object อื่นเป็นส่วนประกอบ (Loan มี Book และ Member, Member มีรายการ Loan) ส่งต่องาน (delegate) ให้ส่วนประกอบที่รู้เรื่องนั้น และเลือก composition แทนการ extends class ที่ไม่ได้เป็น is-a จริง",
  why: "หลายคนใช้ inheritance เพื่อ “ได้ method มาฟรี” เช่น class Shelf extends ArrayList<Book> แล้วพบว่าผู้ใช้เรียก add ที่สืบทอดมาเพื่อข้ามกติกาความจุได้ composition ให้ควบคุมได้ว่าเปิดอะไรออกไปบ้าง และเปลี่ยนส่วนประกอบได้โดยไม่กระทบผู้ใช้",
  explanation: "composition คือ field ที่เป็น object อื่น: class Loan { private final Book book; private final Member member; private final int dueDay; } object ใหญ่ส่งต่องานให้ส่วนประกอบ (delegation) เช่น loan.describe() เรียก book.title() แทนการเก็บชื่อหนังสือซ้ำ object ใหญ่เลือกเปิดเฉพาะ method ที่เหมาะกับโดเมน (shelf.add(book) ที่ตรวจความจุ) ไม่ใช่ทุก method ของ ArrayList ทดสอบความสัมพันธ์ด้วยประโยค: “Loan มี Book” (has-a → composition) ส่วน “StudentMember เป็น Member” (is-a → อาจเป็น inheritance บทหลัง) เมื่อไม่แน่ใจ เลือก composition ก่อน ระวัง: ถ้าส่วนประกอบเปลี่ยนได้ (mutable) และถูกส่งออกไปตรง ๆ ผู้อื่นแก้มันได้ (บท encapsulation)",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-project-library-1"],
  example: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Member sea = new Member("Sea");
        Book clean = new Book("Clean Code");
        Book java = new Book("Java 21");
        sea.addLoan(new Loan(clean, 10));
        sea.addLoan(new Loan(java, 20));
        for (Loan loan : sea.loans()) {
            System.out.println(loan.describe(15));
        }
        System.out.println(sea.name() + " ช้ารวม " + sea.totalLateDays(15) + " วัน");
    }
}

class Book {
    private final String title;

    Book(String title) {
        this.title = title;
    }

    String title() {
        return title;
    }
}

class Loan {
    private final Book book;
    private final int dueDay;

    Loan(Book book, int dueDay) {
        this.book = book;
        this.dueDay = dueDay;
    }

    int lateDays(int today) {
        return Math.max(0, today - dueDay);
    }

    String describe(int today) {
        return book.title() + " ครบกำหนดวันที่ " + dueDay + (lateDays(today) > 0 ? " (ช้า " + lateDays(today) + " วัน)" : "");
    }
}

class Member {
    private final String name;
    private final ArrayList<Loan> loans = new ArrayList<>();

    Member(String name) {
        this.name = name;
    }

    String name() {
        return name;
    }

    void addLoan(Loan loan) {
        loans.add(loan);
    }

    ArrayList<Loan> loans() {
        return new ArrayList<>(loans);
    }

    int totalLateDays(int today) {
        int total = 0;
        for (Loan loan : loans) {
            total += loan.lateDays(today);
        }
        return total;
    }
}`,
  expectedOutput: "Clean Code ครบกำหนดวันที่ 10 (ช้า 5 วัน)\nJava 21 ครบกำหนดวันที่ 20\nSea ช้ารวม 5 วัน",
  tracePrompt: "member.totalLateDays(15) ทำงานโดยไม่ได้คำนวณวันช้าเองเลย ไล่ว่า message ถูกส่งต่อไปที่ object ไหนบ้าง และถ้ากติกาเปลี่ยนเป็น “วันหยุดไม่นับวันช้า” ต้องแก้ class ไหน",
  traceAnswer: "Member วนรายการ Loan แล้วเรียก loan.lateDays(15) ของแต่ละตัว Loan คำนวณจาก dueDay ของตัวเอง กติกาวันช้าอยู่ใน Loan ที่เดียว จึงแก้แค่ Loan (หรือ Loan ใช้ object ปฏิทินที่ส่งเข้ามา) Member ไม่ต้องรู้เลย",
  practicePrompt: "สร้าง class Shelf ที่ “มี” ArrayList<Book> และ capacity (ไม่ extends ArrayList) มี method: boolean add(Book book) (ปฏิเสธเมื่อเต็มหรือหนังสือเล่มเดียวกันอยู่แล้ว — ใช้ equals ตาม id), int size(), String titles() คืนชื่อเรียงตามลำดับที่ใส่คั่นด้วย \", \" ใน main สร้าง Shelf ความจุ 2 ใส่ Book(1, Clean Code), Book(1, Clean Code) อีกตัว, Book(2, Java 21), Book(3, Refactoring) พิมพ์ผลของ add แต่ละครั้งในบรรทัดเดียว (true false true false) แล้วพิมพ์ 2: Clean Code, Java 21",
  starter: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Shelf shelf = new Shelf(2);
        // add สี่ครั้ง พิมพ์ผลในบรรทัดเดียว
        // พิมพ์ size และ titles
    }
}

class Book {
    private final int id;
    private final String title;

    Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    String title() {
        return title;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof Book book && id == book.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

class Shelf {
    // ArrayList<Book> และ capacity

    Shelf(int capacity) {
        // เก็บ capacity
    }

    // add, size, titles
}`,
  solution: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Shelf shelf = new Shelf(2);
        boolean a = shelf.add(new Book(1, "Clean Code"));
        boolean b = shelf.add(new Book(1, "Clean Code"));
        boolean c = shelf.add(new Book(2, "Java 21"));
        boolean d = shelf.add(new Book(3, "Refactoring"));
        System.out.println(a + " " + b + " " + c + " " + d);
        System.out.println(shelf.size() + ": " + shelf.titles());
    }
}

class Book {
    private final int id;
    private final String title;

    Book(int id, String title) {
        this.id = id;
        this.title = title;
    }

    String title() {
        return title;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof Book book && id == book.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

class Shelf {
    private final ArrayList<Book> books = new ArrayList<>();
    private final int capacity;

    Shelf(int capacity) {
        this.capacity = capacity;
    }

    boolean add(Book book) {
        if (books.size() >= capacity || books.contains(book)) {
            return false;
        }
        books.add(book);
        return true;
    }

    int size() {
        return books.size();
    }

    String titles() {
        ArrayList<String> titles = new ArrayList<>();
        for (Book book : books) {
            titles.add(book.title());
        }
        return String.join(", ", titles);
    }
}`,
  solutionCheck: { output: "true false true false\n2: Clean Code, Java 21" },
  bugCheck: { kind: "logic", output: "3 เล่ม บนชั้นที่จุ 2" },
  buggy: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Shelf shelf = new Shelf(2);
        shelf.addChecked("Clean Code");
        shelf.addChecked("Java 21");
        shelf.add("Refactoring");
        System.out.println(shelf.size() + " เล่ม บนชั้นที่จุ 2");
    }
}

class Shelf extends ArrayList<String> {
    private final int capacity;

    Shelf(int capacity) {
        this.capacity = capacity;
    }

    boolean addChecked(String title) {
        return size() < capacity && add(title);
    }
}`,
  bugExplanation: "พิมพ์ 3 เล่ม บนชั้นที่จุ 2 เพราะ Shelf extends ArrayList จึงได้ method add, addAll, set ฯลฯ มาทั้งหมด ผู้ใช้เรียก add ที่สืบทอดมาเพื่อข้ามกติกาความจุได้ inheritance เปิดทุกอย่างของ class แม่ออกไปโดยไม่ได้ตั้งใจ แก้ด้วย composition: Shelf มี ArrayList เป็น private field และเปิดเฉพาะ add ที่ตรวจความจุ",
  vocabulary: [v("composition", "object มี object อื่นเป็นส่วนประกอบ (has-a)"), v("delegation", "ส่งต่องานให้ส่วนประกอบที่รู้เรื่องนั้น"), v("has-a", "ความสัมพันธ์แบบเป็นเจ้าของ/ประกอบด้วย"), v("is-a", "ความสัมพันธ์แบบเป็นชนิดย่อย"), v("aggregate", "object ที่ดูแลกลุ่มของ object อื่น"), v("leaky abstraction", "การเปิดรายละเอียดภายในออกไปจนผู้อื่นข้ามกติกาได้")],
},
{
  id: "oop-collaboration",
  courseId,
  unit: "ประกอบระบบ",
  title: "collaboration: ลำดับ message และความสอดคล้องระหว่างหลาย object",
  objective: "วาดลำดับ message ของ use case ที่มีหลาย object (Library → Member → Book → Loan) ตรวจเงื่อนไขทุกข้อก่อนเปลี่ยน state ของใครก็ตาม และทำให้ข้อมูลที่ซ้ำกันสองที่ (หนังสือรู้ว่าใครยืม, สมาชิกรู้ว่ายืมอะไร) สอดคล้องกันเสมอ",
  why: "use case ยืมหนังสือเปลี่ยน state สองฝ่าย ถ้าเปลี่ยน Book ไปแล้วจึงพบว่าสมาชิกยืมเกินโควตา หนังสือจะค้างสถานะ “ถูกยืม” โดยไม่มีผู้ยืม bug นี้ไม่ล่ม แต่ทำให้ข้อมูลเชื่อไม่ได้",
  explanation: "object หนึ่ง (ในที่นี้ Library) เป็นผู้ประสานงาน: หา object ที่เกี่ยวข้อง ถามเงื่อนไขของแต่ละฝ่าย แล้วจึงสั่งให้เปลี่ยน state ลำดับที่ปลอดภัยคือ “ตรวจทั้งหมดก่อน แล้วค่อยเปลี่ยนทั้งหมด” (check-then-act ภายในโปรแกรมเดียว เหมือน transaction ในฐานข้อมูลแบบย่อ) แต่ละฝ่ายยังป้องกันตัวเอง: book.checkOut() ยัง throw ถ้าถูกยืมแล้ว เป็นด่านสุดท้ายเผื่อผู้ประสานงานพลาด ข้อมูลที่ต้องอยู่สองที่ให้สร้างจาก object เดียวกัน (Loan หนึ่งตัวถูกเก็บทั้งใน Book และ Member) แทนการเก็บสำเนาแยก วาด sequence ง่าย ๆ: Library → member.canBorrow() → book.isAvailable() → new Loan(...) → book.attach(loan) → member.addLoan(loan)",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-composition"],
  example: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Library library = new Library();
        Member sea = new Member("Sea", 1);
        Book clean = new Book("Clean Code");
        Book java = new Book("Java 21");
        System.out.println(library.borrow(sea, clean, 1));
        System.out.println(library.borrow(sea, java, 1));
        System.out.println(library.borrow(new Member("Ton", 2), clean, 1));
        System.out.println(clean.status() + " | " + java.status() + " | Sea ยืม " + sea.loanCount());
    }
}

class Library {
    String borrow(Member member, Book book, int today) {
        if (!member.canBorrow()) {
            return member.name() + " ยืมครบโควตาแล้ว";
        }
        if (!book.isAvailable()) {
            return book.title() + " ถูกยืมอยู่";
        }
        Loan loan = new Loan(book, member, today + 14);
        book.attach(loan);
        member.addLoan(loan);
        return member.name() + " ยืม " + book.title() + " ครบกำหนดวันที่ " + loan.dueDay();
    }
}

class Loan {
    private final Book book;
    private final Member member;
    private final int dueDay;

    Loan(Book book, Member member, int dueDay) {
        this.book = book;
        this.member = member;
        this.dueDay = dueDay;
    }

    Member member() {
        return member;
    }

    int dueDay() {
        return dueDay;
    }
}

class Book {
    private final String title;
    private Loan currentLoan;

    Book(String title) {
        this.title = title;
    }

    String title() {
        return title;
    }

    boolean isAvailable() {
        return currentLoan == null;
    }

    void attach(Loan loan) {
        if (!isAvailable()) {
            throw new IllegalStateException(title + " ถูกยืมอยู่");
        }
        currentLoan = loan;
    }

    String status() {
        return title + (isAvailable() ? " ว่าง" : " ยืมโดย " + currentLoan.member().name());
    }
}

class Member {
    private final String name;
    private final int maxLoans;
    private final ArrayList<Loan> loans = new ArrayList<>();

    Member(String name, int maxLoans) {
        this.name = name;
        this.maxLoans = maxLoans;
    }

    String name() {
        return name;
    }

    boolean canBorrow() {
        return loans.size() < maxLoans;
    }

    void addLoan(Loan loan) {
        if (!canBorrow()) {
            throw new IllegalStateException(name + " ยืมครบโควตาแล้ว");
        }
        loans.add(loan);
    }

    int loanCount() {
        return loans.size();
    }
}`,
  expectedOutput: "Sea ยืม Clean Code ครบกำหนดวันที่ 15\nSea ยืมครบโควตาแล้ว\nClean Code ถูกยืมอยู่\nClean Code ยืมโดย Sea | Java 21 ว่าง | Sea ยืม 1",
  tracePrompt: "การเรียกครั้งที่สอง (Sea ยืม Java 21) ถูกปฏิเสธ ถ้าใน Library.borrow สลับให้ book.attach(loan) ทำก่อนการตรวจ member.canBorrow() บรรทัดสุดท้ายจะพิมพ์อะไรสำหรับ Java 21",
  traceAnswer: "Java 21 จะถูก attach กับ Loan ไปแล้วก่อนที่จะพบว่า Sea ยืมเต็ม ผลคือ Java 21 ยืมโดย Sea ทั้งที่ Sea มีแค่ 1 เล่มในรายการของตัวเอง ข้อมูลสองฝ่ายไม่ตรงกัน — ต้องตรวจทุกเงื่อนไขก่อนเปลี่ยน state ของฝ่ายใด",
  practicePrompt: "ต่อจากตัวอย่าง เพิ่มการคืนหนังสือ: Library.giveBack(Book book, int today) คืนข้อความ “<ชื่อหนังสือ> ไม่ได้ถูกยืม” ถ้าว่างอยู่ ไม่งั้นคำนวณวันช้า (today − dueDay ถ้าบวก) และค่าปรับวันละ 5 บาท แล้วถอด Loan ออกจากทั้ง Book (detach) และ Member (removeLoan) ให้ครบทั้งคู่ และคืน “<ชื่อผู้ยืม> คืน <ชื่อหนังสือ> ช้า <n> วัน ค่าปรับ <f> บาท” ใน main: Sea ยืม Clean Code วันที่ 1, คืนวันที่ 20 (ช้า 5 วัน ค่าปรับ 25), คืนซ้ำ, แล้ว Sea ยืม Java 21 ได้อีก (เพราะโควตาว่างแล้ว) พิมพ์ทุกผลลัพธ์และ status ของสองเล่มท้ายสุด",
  starter: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Library library = new Library();
        Member sea = new Member("Sea", 1);
        Book clean = new Book("Clean Code");
        Book java = new Book("Java 21");
        // ยืม คืน คืนซ้ำ ยืมใหม่ แล้วพิมพ์ status
    }
}

class Library {
    String borrow(Member member, Book book, int today) {
        if (!member.canBorrow()) {
            return member.name() + " ยืมครบโควตาแล้ว";
        }
        if (!book.isAvailable()) {
            return book.title() + " ถูกยืมอยู่";
        }
        Loan loan = new Loan(book, member, today + 14);
        book.attach(loan);
        member.addLoan(loan);
        return member.name() + " ยืม " + book.title() + " ครบกำหนดวันที่ " + loan.dueDay();
    }

    String giveBack(Book book, int today) {
        return "";
    }
}

class Loan {
    private final Book book;
    private final Member member;
    private final int dueDay;

    Loan(Book book, Member member, int dueDay) {
        this.book = book;
        this.member = member;
        this.dueDay = dueDay;
    }

    Member member() {
        return member;
    }

    int dueDay() {
        return dueDay;
    }
}

class Book {
    private final String title;
    private Loan currentLoan;

    Book(String title) {
        this.title = title;
    }

    String title() {
        return title;
    }

    boolean isAvailable() {
        return currentLoan == null;
    }

    void attach(Loan loan) {
        if (!isAvailable()) {
            throw new IllegalStateException(title + " ถูกยืมอยู่");
        }
        currentLoan = loan;
    }

    // currentLoan() และ detach()

    String status() {
        return title + (isAvailable() ? " ว่าง" : " ยืมโดย " + currentLoan.member().name());
    }
}

class Member {
    private final String name;
    private final int maxLoans;
    private final ArrayList<Loan> loans = new ArrayList<>();

    Member(String name, int maxLoans) {
        this.name = name;
        this.maxLoans = maxLoans;
    }

    String name() {
        return name;
    }

    boolean canBorrow() {
        return loans.size() < maxLoans;
    }

    void addLoan(Loan loan) {
        if (!canBorrow()) {
            throw new IllegalStateException(name + " ยืมครบโควตาแล้ว");
        }
        loans.add(loan);
    }

    // removeLoan(Loan)
}`,
  solution: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Library library = new Library();
        Member sea = new Member("Sea", 1);
        Book clean = new Book("Clean Code");
        Book java = new Book("Java 21");
        System.out.println(library.borrow(sea, clean, 1));
        System.out.println(library.giveBack(clean, 20));
        System.out.println(library.giveBack(clean, 21));
        System.out.println(library.borrow(sea, java, 21));
        System.out.println(clean.status() + " | " + java.status());
    }
}

class Library {
    static final int FINE_PER_DAY = 5;

    String borrow(Member member, Book book, int today) {
        if (!member.canBorrow()) {
            return member.name() + " ยืมครบโควตาแล้ว";
        }
        if (!book.isAvailable()) {
            return book.title() + " ถูกยืมอยู่";
        }
        Loan loan = new Loan(book, member, today + 14);
        book.attach(loan);
        member.addLoan(loan);
        return member.name() + " ยืม " + book.title() + " ครบกำหนดวันที่ " + loan.dueDay();
    }

    String giveBack(Book book, int today) {
        if (book.isAvailable()) {
            return book.title() + " ไม่ได้ถูกยืม";
        }
        Loan loan = book.currentLoan();
        int lateDays = Math.max(0, today - loan.dueDay());
        int fine = lateDays * FINE_PER_DAY;
        book.detach();
        loan.member().removeLoan(loan);
        return loan.member().name() + " คืน " + book.title() + " ช้า " + lateDays + " วัน ค่าปรับ " + fine + " บาท";
    }
}

class Loan {
    private final Book book;
    private final Member member;
    private final int dueDay;

    Loan(Book book, Member member, int dueDay) {
        this.book = book;
        this.member = member;
        this.dueDay = dueDay;
    }

    Member member() {
        return member;
    }

    int dueDay() {
        return dueDay;
    }
}

class Book {
    private final String title;
    private Loan currentLoan;

    Book(String title) {
        this.title = title;
    }

    String title() {
        return title;
    }

    boolean isAvailable() {
        return currentLoan == null;
    }

    void attach(Loan loan) {
        if (!isAvailable()) {
            throw new IllegalStateException(title + " ถูกยืมอยู่");
        }
        currentLoan = loan;
    }

    Loan currentLoan() {
        return currentLoan;
    }

    void detach() {
        currentLoan = null;
    }

    String status() {
        return title + (isAvailable() ? " ว่าง" : " ยืมโดย " + currentLoan.member().name());
    }
}

class Member {
    private final String name;
    private final int maxLoans;
    private final ArrayList<Loan> loans = new ArrayList<>();

    Member(String name, int maxLoans) {
        this.name = name;
        this.maxLoans = maxLoans;
    }

    String name() {
        return name;
    }

    boolean canBorrow() {
        return loans.size() < maxLoans;
    }

    void addLoan(Loan loan) {
        if (!canBorrow()) {
            throw new IllegalStateException(name + " ยืมครบโควตาแล้ว");
        }
        loans.add(loan);
    }

    void removeLoan(Loan loan) {
        if (!loans.remove(loan)) {
            throw new IllegalStateException(name + " ไม่ได้ยืมรายการนี้");
        }
    }
}`,
  solutionCheck: { output: "Sea ยืม Clean Code ครบกำหนดวันที่ 15\nSea คืน Clean Code ช้า 5 วัน ค่าปรับ 25 บาท\nClean Code ไม่ได้ถูกยืม\nSea ยืม Java 21 ครบกำหนดวันที่ 35\nClean Code ว่าง | Java 21 ยืมโดย Sea" },
  bugCheck: { kind: "logic", output: "Sea ยืมครบโควตาแล้ว\nJava 21 ยืมโดย Sea | Sea ยืม 1 เล่ม" },
  buggy: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Member sea = new Member("Sea", 1);
        sea.addLoan("Clean Code");
        Book java = new Book("Java 21");
        System.out.println(borrow(sea, java));
        System.out.println(java.status() + " | Sea ยืม " + sea.loanCount() + " เล่ม");
    }

    static String borrow(Member member, Book book) {
        book.markBorrowedBy(member.name());
        if (!member.canBorrow()) {
            return member.name() + " ยืมครบโควตาแล้ว";
        }
        member.addLoan(book.title());
        return "ok";
    }
}

class Book {
    private final String title;
    private String borrower;

    Book(String title) {
        this.title = title;
    }

    String title() {
        return title;
    }

    void markBorrowedBy(String name) {
        borrower = name;
    }

    String status() {
        return title + (borrower == null ? " ว่าง" : " ยืมโดย " + borrower);
    }
}

class Member {
    private final String name;
    private final int maxLoans;
    private final ArrayList<String> loans = new ArrayList<>();

    Member(String name, int maxLoans) {
        this.name = name;
        this.maxLoans = maxLoans;
    }

    String name() {
        return name;
    }

    boolean canBorrow() {
        return loans.size() < maxLoans;
    }

    void addLoan(String title) {
        loans.add(title);
    }

    int loanCount() {
        return loans.size();
    }
}`,
  bugExplanation: "พิมพ์ว่า Sea ยืมครบโควตาแล้ว แต่ Java 21 กลับแสดงว่ายืมโดย Sea และ Sea มีแค่ 1 เล่ม ข้อมูลสองฝ่ายขัดกัน เพราะ borrow เปลี่ยน state ของ Book ก่อนตรวจโควตาของ Member compile ผ่านเป็น logic bug แก้โดยตรวจ canBorrow (และหนังสือว่าง) ทั้งหมดก่อน แล้วจึงเปลี่ยน Book และ Member ตามลำดับ",
  vocabulary: [v("collaboration", "หลาย object ทำงานร่วมกันผ่าน message"), v("coordinator", "object ที่ประสานลำดับของ use case"), v("sequence", "ลำดับ message ระหว่าง object"), v("consistency", "ข้อมูลที่เกี่ยวข้องกันตรงกันทุกที่"), v("check-then-act", "ตรวจเงื่อนไขทั้งหมดก่อนเปลี่ยน state"), v("bidirectional link", "สองฝ่ายอ้างถึงกัน เช่น Book ↔ Loan ↔ Member")],
},
{
  id: "oop-project-library-2",
  courseId,
  unit: "Project: Library Management CLI",
  title: "★ Library CLI M2: ยืมโดยสมาชิก วันครบกำหนด และค่าปรับ",
  objective: "ต่อยอด M1 ให้สมาชิกยืมหนังสือผ่าน Library ที่ประสาน Book, Member และ Loan ตามกติกา (โควตา, วันครบกำหนด, ค่าปรับ) โดยข้อมูลสองฝ่ายสอดคล้องกันเสมอ และทดสอบครบทุกข้อความด้วยไฟล์ fixture",
  why: "M1 ยังไม่รู้ว่าใครยืม ระบบจริงต้องตอบได้ว่าเล่มนี้อยู่กับใคร ครบกำหนดเมื่อไร และค้างค่าปรับเท่าไร งานนี้ใช้ composition และ collaboration จากสองบทก่อนกับโจทย์ที่ใหญ่ขึ้น",
  explanation: "ข้อกำหนด M2: เริ่มที่วันที่ 1, ยืมได้ 14 วัน (ครบกำหนด = วันที่ยืม + 14), สมาชิกยืมพร้อมกันได้ไม่เกิน 2 เล่ม, ค่าปรับวันละ 5 บาทสูงสุด 100 บาท คำสั่ง (ข้อความต้องตรง): add <title> → added book #<id> | title required; member <name> → added member #<id> | name required; day <n> → today is day <n> | day must be a number | day cannot go back; borrow <bookId> <memberId> → borrowed #<b> by #<m>, due day <d> | usage: borrow <bookId> <memberId> (จำนวน argument ไม่ครบหรือไม่ใช่ตัวเลข) | no such book | no such member | already borrowed | loan limit reached (ตรวจตามลำดับนี้); return <bookId> → returned #<b>, late <n> days, fine <f> | usage: return <bookId> | no such book | not borrowed; loans <memberId> → แต่ละบรรทัด #<b> <title> due day <d> ตามลำดับที่ยืม | (no loans) | no such member | usage: loans <memberId>; list → #<id> <title> [available] หรือ [borrowed by #<m> <name>] | (no books); quit → bye; บรรทัดว่างข้าม; อื่น ๆ → unknown command: <คำสั่ง> การออกแบบ: Library เป็น coordinator (ถือรายการ, วันปัจจุบัน, ออก id) และ throw IllegalArgumentException/IllegalStateException ที่ข้อความตรงข้อกำหนด, Loan หนึ่งตัวถูกอ้างจากทั้ง Book และ Member, Main แปลง input เป็นการเรียก Library และ exception เป็นข้อความ",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-collaboration", "oop-project-library-1"],
  example: java`public class Main {
    public static void main(String[] args) {
        int borrowDay = 1;
        int dueDay = borrowDay + 14;
        for (int today : new int[] {10, 15, 20, 60}) {
            int late = Math.max(0, today - dueDay);
            int fine = Math.min(late * 5, 100);
            System.out.println("คืนวันที่ " + today + ": late " + late + " days, fine " + fine);
        }
    }
}`,
  expectedOutput: "คืนวันที่ 10: late 0 days, fine 0\nคืนวันที่ 15: late 0 days, fine 0\nคืนวันที่ 20: late 5 days, fine 25\nคืนวันที่ 60: late 45 days, fine 100",
  tracePrompt: "ตามข้อกำหนด borrow 3 9 เมื่อหนังสือ #3 ถูกยืมอยู่และไม่มีสมาชิก #9 ต้องตอบอะไร และทำไมลำดับการตรวจต้องถูกกำหนดไว้ในข้อกำหนด",
  traceAnswer: "ต้องตอบ no such member เพราะลำดับคือ book มีไหม → member มีไหม → book ว่างไหม → โควตา หนังสือ #3 มีอยู่จึงผ่านข้อแรก แล้วไปตกที่ข้อสอง ถ้าไม่กำหนดลำดับ แต่ละ implementation จะตอบต่างกันสำหรับ input ที่ผิดหลายข้อพร้อมกัน และไฟล์ expected-output ใช้ตรวจไม่ได้",
  practicePrompt: "สร้าง Library CLI M2 ตามข้อกำหนดในคำอธิบาย ใน package library (Book, Member, Loan, Library, Main) ใช้ Loan เป็นตัวเชื่อมเดียวระหว่าง Book กับ Member ห้ามใช้ static field ที่เปลี่ยนค่าได้ เขียน test-input.txt / expected-output.txt ที่ครอบคลุมทุกข้อความ แล้วรันเทียบด้วย java -cp out library.Main < test-input.txt",
  starter: java`// File: library/Loan.java
package library;

public class Loan {
    // book, member, dueDay + lateDays(today)
}
// File: library/Book.java
package library;

public class Book {
    // id, title, currentLoan + isAvailable, attach, detach, toString
}
// File: library/Member.java
package library;

public class Member {
    // id, name, loans (สูงสุด 2) + canBorrow, addLoan, removeLoan, loans
}
// File: library/Library.java
package library;

public class Library {
    // books, members, today, nextBookId, nextMemberId
    // addBook, addMember, setDay, borrow, giveBack, loansOf, listBooks
}
// File: library/Main.java
package library;

public class Main {
    public static void main(String[] args) {
        // อ่านคำสั่ง แปลง argument เรียก Library และพิมพ์ผล
    }
}`,
  solution: java`// File: library/Loan.java
package library;

public class Loan {
    private final Book book;
    private final Member member;
    private final int dueDay;

    Loan(Book book, Member member, int dueDay) {
        this.book = book;
        this.member = member;
        this.dueDay = dueDay;
    }

    Book book() {
        return book;
    }

    Member member() {
        return member;
    }

    int dueDay() {
        return dueDay;
    }

    int lateDays(int today) {
        return Math.max(0, today - dueDay);
    }
}
// File: library/Book.java
package library;

public class Book {
    private final int id;
    private final String title;
    private Loan currentLoan;

    Book(int id, String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title required");
        }
        this.id = id;
        this.title = title.strip();
    }

    int id() {
        return id;
    }

    String title() {
        return title;
    }

    boolean isAvailable() {
        return currentLoan == null;
    }

    Loan currentLoan() {
        return currentLoan;
    }

    void attach(Loan loan) {
        if (!isAvailable()) {
            throw new IllegalStateException("already borrowed");
        }
        currentLoan = loan;
    }

    void detach() {
        if (isAvailable()) {
            throw new IllegalStateException("not borrowed");
        }
        currentLoan = null;
    }

    @Override
    public String toString() {
        return "#" + id + " " + title + (isAvailable() ? " [available]" : " [borrowed by " + currentLoan.member() + "]");
    }
}
// File: library/Member.java
package library;

import java.util.ArrayList;
import java.util.List;

public class Member {
    static final int MAX_LOANS = 2;
    private final int id;
    private final String name;
    private final ArrayList<Loan> loans = new ArrayList<>();

    Member(int id, String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name required");
        }
        this.id = id;
        this.name = name.strip();
    }

    int id() {
        return id;
    }

    boolean canBorrow() {
        return loans.size() < MAX_LOANS;
    }

    void addLoan(Loan loan) {
        if (!canBorrow()) {
            throw new IllegalStateException("loan limit reached");
        }
        loans.add(loan);
    }

    void removeLoan(Loan loan) {
        loans.remove(loan);
    }

    List<Loan> loans() {
        return List.copyOf(loans);
    }

    @Override
    public String toString() {
        return "#" + id + " " + name;
    }
}
// File: library/Library.java
package library;

import java.util.ArrayList;

public class Library {
    static final int LOAN_DAYS = 14;
    static final int FINE_PER_DAY = 5;
    static final int MAX_FINE = 100;

    private final ArrayList<Book> books = new ArrayList<>();
    private final ArrayList<Member> members = new ArrayList<>();
    private int nextBookId = 1;
    private int nextMemberId = 1;
    private int today = 1;

    Book addBook(String title) {
        Book book = new Book(nextBookId, title);
        nextBookId++;
        books.add(book);
        return book;
    }

    Member addMember(String name) {
        Member member = new Member(nextMemberId, name);
        nextMemberId++;
        members.add(member);
        return member;
    }

    void setDay(int day) {
        if (day < today) {
            throw new IllegalArgumentException("day cannot go back");
        }
        today = day;
    }

    Loan borrow(int bookId, int memberId) {
        Book book = findBook(bookId);
        Member member = findMember(memberId);
        if (!book.isAvailable()) {
            throw new IllegalStateException("already borrowed");
        }
        if (!member.canBorrow()) {
            throw new IllegalStateException("loan limit reached");
        }
        Loan loan = new Loan(book, member, today + LOAN_DAYS);
        book.attach(loan);
        member.addLoan(loan);
        return loan;
    }

    // Returns the fine in baht.
    int giveBack(int bookId) {
        Book book = findBook(bookId);
        if (book.isAvailable()) {
            throw new IllegalStateException("not borrowed");
        }
        Loan loan = book.currentLoan();
        book.detach();
        loan.member().removeLoan(loan);
        return Math.min(loan.lateDays(today) * FINE_PER_DAY, MAX_FINE);
    }

    int lateDays(int bookId) {
        Book book = findBook(bookId);
        return book.isAvailable() ? 0 : book.currentLoan().lateDays(today);
    }

    String loansOf(int memberId) {
        Member member = findMember(memberId);
        ArrayList<String> lines = new ArrayList<>();
        for (Loan loan : member.loans()) {
            lines.add("#" + loan.book().id() + " " + loan.book().title() + " due day " + loan.dueDay());
        }
        return lines.isEmpty() ? "(no loans)" : String.join("\n", lines);
    }

    String listBooks() {
        ArrayList<String> lines = new ArrayList<>();
        for (Book book : books) {
            lines.add(book.toString());
        }
        return lines.isEmpty() ? "(no books)" : String.join("\n", lines);
    }

    private Book findBook(int id) {
        for (Book book : books) {
            if (book.id() == id) {
                return book;
            }
        }
        throw new IllegalArgumentException("no such book");
    }

    private Member findMember(int id) {
        for (Member member : members) {
            if (member.id() == id) {
                return member;
            }
        }
        throw new IllegalArgumentException("no such member");
    }
}
// File: library/Main.java
package library;

import java.util.Scanner;

public class Main {
    private final Library library = new Library();

    String handle(String line) {
        String[] words = line.split("\\s+");
        String command = words[0].toLowerCase();
        String rest = line.contains(" ") ? line.substring(line.indexOf(' ') + 1).strip() : "";
        try {
            return switch (command) {
                case "add" -> "added book #" + library.addBook(rest).id();
                case "member" -> "added member #" + library.addMember(rest).id();
                case "list" -> library.listBooks();
                case "day" -> setDay(words);
                case "borrow" -> borrow(words);
                case "return" -> giveBack(words);
                case "loans" -> loans(words);
                default -> "unknown command: " + command;
            };
        } catch (IllegalArgumentException | IllegalStateException e) {
            return e.getMessage();
        }
    }

    private String setDay(String[] words) {
        Integer day = words.length == 2 ? number(words[1]) : null;
        if (day == null) {
            return "day must be a number";
        }
        library.setDay(day);
        return "today is day " + day;
    }

    private String borrow(String[] words) {
        Integer bookId = words.length == 3 ? number(words[1]) : null;
        Integer memberId = words.length == 3 ? number(words[2]) : null;
        if (bookId == null || memberId == null) {
            return "usage: borrow <bookId> <memberId>";
        }
        Loan loan = library.borrow(bookId, memberId);
        return "borrowed #" + bookId + " by #" + memberId + ", due day " + loan.dueDay();
    }

    private String giveBack(String[] words) {
        Integer bookId = words.length == 2 ? number(words[1]) : null;
        if (bookId == null) {
            return "usage: return <bookId>";
        }
        int late = library.lateDays(bookId);
        int fine = library.giveBack(bookId);
        return "returned #" + bookId + ", late " + late + " days, fine " + fine;
    }

    private String loans(String[] words) {
        Integer memberId = words.length == 2 ? number(words[1]) : null;
        if (memberId == null) {
            return "usage: loans <memberId>";
        }
        return library.loansOf(memberId);
    }

    private static Integer number(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static void main(String[] args) {
        Main app = new Main();
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;
            }
            if (line.equalsIgnoreCase("quit")) {
                System.out.println("bye");
                break;
            }
            System.out.println(app.handle(line));
        }
    }
}
// File: test-input.txt
list
add
add Clean Code
add Java 21
add Refactoring
member
member Sea
member Ton
borrow 1 1
borrow 1 2
borrow 2 1
borrow 3 1
borrow 9 1
borrow 3 9
borrow x
loans 1
loans 2
loans 9
loans
day 20
day 5
day soon
return 1
return 1
return 7
return
list
borrow 3 1
loans 1
dance
quit
add ignored
// File: expected-output.txt
(no books)
title required
added book #1
added book #2
added book #3
name required
added member #1
added member #2
borrowed #1 by #1, due day 15
already borrowed
borrowed #2 by #1, due day 15
loan limit reached
no such book
no such member
usage: borrow <bookId> <memberId>
#1 Clean Code due day 15
#2 Java 21 due day 15
(no loans)
no such member
usage: loans <memberId>
today is day 20
day cannot go back
day must be a number
returned #1, late 5 days, fine 25
not borrowed
no such book
usage: return <bookId>
#1 Clean Code [available]
#2 Java 21 [borrowed by #1 Sea]
#3 Refactoring [available]
borrowed #3 by #1, due day 34
#2 Java 21 due day 15
#3 Refactoring due day 34
unknown command: dance
bye
`,
  bugCheck: { kind: "logic", output: "Ton: [Java 21]\nSea: [Clean Code, Java 21]" },
  buggy: java`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Member sea = new Member("Sea");
        Member ton = new Member("Ton");
        Book clean = new Book("Clean Code");
        Book java = new Book("Java 21");
        lend(clean, sea);
        lend(java, sea);
        java.borrower = ton;
        ton.titles.add(java.title);
        System.out.println("Ton: " + ton.titles);
        System.out.println("Sea: " + sea.titles);
    }

    static void lend(Book book, Member member) {
        book.borrower = member;
        member.titles.add(book.title);
    }
}

class Book {
    final String title;
    Member borrower;

    Book(String title) {
        this.title = title;
    }
}

class Member {
    final String name;
    final ArrayList<String> titles = new ArrayList<>();

    Member(String name) {
        this.name = name;
    }
}`,
  bugExplanation: "พิมพ์ Ton: [Java 21] และ Sea: [Clean Code, Java 21] — Java 21 ถูกยืมโดยสองคนในเวลาเดียวกัน เพราะ field เปิดให้แก้ตรง ๆ และข้อมูลการยืมถูกเก็บสองที่แยกกัน (Book.borrower กับ Member.titles) โดยไม่มีผู้ประสานที่ตรวจว่าหนังสือว่างไหม compile ผ่านเป็น logic bug แก้ด้วยการซ่อน field, ให้ Library เป็นทางเดียวที่ยืม/คืน และให้ Loan ตัวเดียวเป็นตัวเชื่อม Book กับ Member",
  vocabulary: [v("Loan", "object ที่แทนการยืมหนึ่งครั้ง เชื่อม Book กับ Member"), v("due day", "วันครบกำหนดคืน"), v("coordinator", "object ที่ประสาน use case หลายฝ่าย"), v("single source of truth", "ข้อมูลหนึ่งเรื่องมีที่เก็บหลักที่เดียว"), v("specification", "ข้อกำหนดที่ระบุพฤติกรรมและข้อความแน่นอน"), v("regression", "สิ่งที่เคยทำงานแล้วพังหลังแก้โค้ด")],
},
{
  id: "oop-interfaces",
  courseId,
  unit: "Interfaces และ polymorphism",
  title: "interface: สัญญาที่หลาย class ทำได้ต่างกัน",
  objective: "ประกาศ interface ที่บอกว่า “ทำอะไรได้” โดยไม่บอกว่าทำอย่างไร เขียน class หลายตัวที่ implements interface เดียวกัน ส่ง implementation เข้า object อื่นผ่าน constructor (dependency injection) และรู้ว่า interface ที่มี method เดียวเขียนด้วย lambda ได้",
  why: "ห้องสมุดคิดค่าปรับนักเรียนต่างจากบุคคลทั่วไป และช่วงสัปดาห์หนังสืออาจงดค่าปรับ ถ้าใส่ if ตามประเภทไว้ใน Library ทุกกติกาใหม่ต้องแก้ Library interface ทำให้เพิ่มกติกาใหม่ได้โดยไม่แตะโค้ดที่ใช้งานมันอยู่",
  explanation: "interface FinePolicy { int fineFor(int lateDays); } ประกาศ method ที่ไม่มีตัว (abstract) class StandardFine implements FinePolicy ต้องเขียนทุก method ใน interface (ไม่งั้น compile error) และใส่ public เพราะ method ใน interface เป็น public เสมอ ตัวแปรชนิด interface (FinePolicy policy = new StudentFine();) เก็บ object ของ class ใดก็ได้ที่ implements และเรียกได้เฉพาะ method ของ interface object ที่ต้องใช้กติกา (Checkout) รับ FinePolicy ใน constructor แทนการ new เอง — ผู้สร้างเลือก implementation ได้และ test ส่งกติกาง่าย ๆ เข้าไปได้ interface ที่มี abstract method เดียว (functional interface) สร้างด้วย lambda ได้: FinePolicy waived = lateDays -> 0; interface มี default method (มีตัวได้) และ static method ได้ แต่ไม่มี instance field (มีได้แค่ค่าคงที่)",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-project-library-2"],
  example: java`public class Main {
    public static void main(String[] args) {
        FinePolicy standard = new StandardFine();
        FinePolicy student = new StudentFine();
        FinePolicy bookWeek = lateDays -> 0;
        int[] samples = {0, 3, 30};
        for (int late : samples) {
            System.out.println(late + " วัน: ทั่วไป " + standard.fineFor(late) + " | นักเรียน " + student.fineFor(late) + " | สัปดาห์หนังสือ " + bookWeek.fineFor(late));
        }
        Checkout desk = new Checkout(student);
        System.out.println(desk.receipt("Clean Code", 4));
    }
}

interface FinePolicy {
    int fineFor(int lateDays);
}

class StandardFine implements FinePolicy {
    @Override
    public int fineFor(int lateDays) {
        return Math.min(Math.max(lateDays, 0) * 5, 100);
    }
}

class StudentFine implements FinePolicy {
    @Override
    public int fineFor(int lateDays) {
        return Math.min(Math.max(lateDays, 0) * 2, 40);
    }
}

class Checkout {
    private final FinePolicy policy;

    Checkout(FinePolicy policy) {
        this.policy = policy;
    }

    String receipt(String title, int lateDays) {
        return title + ": ช้า " + lateDays + " วัน ค่าปรับ " + policy.fineFor(lateDays) + " บาท";
    }
}`,
  expectedOutput: "0 วัน: ทั่วไป 0 | นักเรียน 0 | สัปดาห์หนังสือ 0\n3 วัน: ทั่วไป 15 | นักเรียน 6 | สัปดาห์หนังสือ 0\n30 วัน: ทั่วไป 100 | นักเรียน 40 | สัปดาห์หนังสือ 0\nClean Code: ช้า 4 วัน ค่าปรับ 8 บาท",
  tracePrompt: "Checkout ไม่รู้จัก StudentFine เลย ถ้าห้องสมุดเพิ่มกติกา “สมาชิกพรีเมียมไม่เสียค่าปรับ 3 วันแรก” ต้องแก้หรือเพิ่มไฟล์ไหนบ้าง และ Checkout ต้องเปลี่ยนไหม",
  traceAnswer: "เพิ่ม class PremiumFine implements FinePolicy (หรือ lambda) หนึ่งที่ แล้วส่งเข้า new Checkout(new PremiumFine()) ตรงที่สร้าง Checkout Checkout ไม่ต้องเปลี่ยนเลยเพราะมันขึ้นกับสัญญา FinePolicy ไม่ใช่ class ใด class หนึ่ง",
  practicePrompt: "สร้าง interface LoanRule ที่มี method String check(int currentLoans, int lateDaysOutstanding) คืน null ถ้าผ่าน หรือเหตุผลถ้าไม่ผ่าน เขียน implementation สองตัว: MaxLoansRule(int max) → \"loan limit reached\" เมื่อ currentLoans >= max และ NoOverdueRule → \"return overdue books first\" เมื่อ lateDaysOutstanding > 0 จากนั้น class BorrowGate รับ LoanRule สองตัวใน constructor และมี method String decide(int currentLoans, int lateDays) คืนเหตุผลแรกที่ไม่ผ่าน หรือ \"ok\" ใน main ใช้ new BorrowGate(new MaxLoansRule(2), new NoOverdueRule()) พิมพ์ผลของ (0,0), (2,0), (1,3), (2,3) บรรทัดละหนึ่งผล",
  starter: java`public class Main {
    public static void main(String[] args) {
        // สร้าง BorrowGate แล้วพิมพ์ผลสี่กรณี
    }
}

interface LoanRule {
    // check(currentLoans, lateDaysOutstanding): null = ผ่าน
}

class MaxLoansRule {
}

class NoOverdueRule {
}

class BorrowGate {
}`,
  solution: java`public class Main {
    public static void main(String[] args) {
        BorrowGate gate = new BorrowGate(new MaxLoansRule(2), new NoOverdueRule());
        System.out.println(gate.decide(0, 0));
        System.out.println(gate.decide(2, 0));
        System.out.println(gate.decide(1, 3));
        System.out.println(gate.decide(2, 3));
    }
}

interface LoanRule {
    String check(int currentLoans, int lateDaysOutstanding);
}

class MaxLoansRule implements LoanRule {
    private final int max;

    MaxLoansRule(int max) {
        this.max = max;
    }

    @Override
    public String check(int currentLoans, int lateDaysOutstanding) {
        return currentLoans >= max ? "loan limit reached" : null;
    }
}

class NoOverdueRule implements LoanRule {
    @Override
    public String check(int currentLoans, int lateDaysOutstanding) {
        return lateDaysOutstanding > 0 ? "return overdue books first" : null;
    }
}

class BorrowGate {
    private final LoanRule first;
    private final LoanRule second;

    BorrowGate(LoanRule first, LoanRule second) {
        this.first = first;
        this.second = second;
    }

    String decide(int currentLoans, int lateDays) {
        String reason = first.check(currentLoans, lateDays);
        if (reason != null) {
            return reason;
        }
        reason = second.check(currentLoans, lateDays);
        return reason != null ? reason : "ok";
    }
}`,
  solutionCheck: { output: "ok\nloan limit reached\nreturn overdue books first\nloan limit reached" },
  bugCheck: { kind: "compile", message: "StudentFine is not abstract and does not override abstract method fineFor(int) in FinePolicy" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        FinePolicy policy = new StudentFine();
        System.out.println(policy.fineFor(3));
    }
}

interface FinePolicy {
    int fineFor(int lateDays);
}

class StudentFine implements FinePolicy {
    public int fineFor(long lateDays) {
        return (int) lateDays * 2;
    }
}`,
  bugExplanation: "compile error: “StudentFine is not abstract and does not override abstract method fineFor(int) in FinePolicy” เพราะ fineFor(long) เป็น method คนละ signature กับ fineFor(int) ของ interface จึงไม่นับว่า implement ใส่ @Override ไว้เสมอเพื่อให้ compiler ชี้ปัญหาตรงจุด และแก้ parameter เป็น int",
  vocabulary: [v("interface", "สัญญาว่าต้องมี method อะไร โดยไม่บอกวิธีทำ"), v("implements", "ประกาศว่า class ทำตามสัญญาของ interface"), v("dependency injection", "ส่งสิ่งที่ object ต้องใช้เข้ามาแทนการสร้างเอง"), v("functional interface", "interface ที่มี abstract method เดียว เขียนด้วย lambda ได้"), v("default method", "method ใน interface ที่มีตัวพร้อมใช้"), v("program to an interface", "ให้ตัวแปร/parameter เป็นชนิด interface ไม่ใช่ class เฉพาะ")],
},
{
  id: "oop-polymorphism",
  courseId,
  unit: "Interfaces และ polymorphism",
  title: "polymorphism: เรียก method เดียว ได้พฤติกรรมตามชนิดจริงของ object",
  objective: "เก็บ object หลายชนิดไว้ใน List ของ interface เดียวกัน เรียก method ผ่าน interface แล้วได้พฤติกรรมของ class จริง (dynamic dispatch) แยก static type กับ runtime type และแทน if/instanceof ตามชนิดด้วย method ที่แต่ละ class ตอบเอง",
  why: "ห้องสมุดเพิ่ม DVD (ยืม 7 วัน) และนิตยสาร (3 วัน) ถ้าโค้ดคำนวณวันครบกำหนดใช้ if (item instanceof Book) ... else if (item instanceof Dvd) ... ทุกประเภทใหม่ต้องไล่แก้ทุกที่ที่มี if แบบนี้ และลืมสักที่ก็ได้ผลผิดเงียบ ๆ",
  explanation: "ตัวแปรมีสองชนิด: static type ที่ประกาศ (LibraryItem item) ซึ่ง compiler ใช้ตรวจว่าเรียก method อะไรได้ และ runtime type คือ class จริงของ object (Dvd) ที่ JVM ใช้เลือกว่าจะรัน method ตัวไหน — นี่คือ dynamic dispatch ทำให้ for (LibraryItem item : items) item.loanDays() ได้ 14, 7, 3 ตามชนิดจริงโดยไม่มี if interface มี default method ที่ class เลือก override ได้ (describe ของ Magazine) instanceof pattern (if (item instanceof Dvd dvd)) ใช้ได้เมื่อจำเป็นจริง ๆ เช่นต้องเรียก method ที่มีเฉพาะ class นั้น แต่ถ้าใช้เพื่อเลือกพฤติกรรมตามชนิด ให้ย้ายพฤติกรรมนั้นเข้าไปเป็น method ของ interface แทน — เพิ่มชนิดใหม่จะไม่ต้องแก้ loop เดิม",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-interfaces"],
  example: java`import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<LibraryItem> items = List.of(new Book("Clean Code"), new Dvd("Spirited Away", 125), new Magazine("Wired", 7));
        int today = 10;
        for (LibraryItem item : items) {
            System.out.println(item.describe() + " → คืนวันที่ " + (today + item.loanDays()));
        }
        LibraryItem first = items.get(1);
        if (first instanceof Dvd dvd) {
            System.out.println("ความยาว " + dvd.minutes() + " นาที");
        }
    }
}

interface LibraryItem {
    String title();

    int loanDays();

    default String describe() {
        return title() + " (" + loanDays() + " วัน)";
    }
}

class Book implements LibraryItem {
    private final String title;

    Book(String title) {
        this.title = title;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 14;
    }
}

class Dvd implements LibraryItem {
    private final String title;
    private final int minutes;

    Dvd(String title, int minutes) {
        this.title = title;
        this.minutes = minutes;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 7;
    }

    int minutes() {
        return minutes;
    }
}

class Magazine implements LibraryItem {
    private final String title;
    private final int issue;

    Magazine(String title, int issue) {
        this.title = title;
        this.issue = issue;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 3;
    }

    @Override
    public String describe() {
        return title + " ฉบับที่ " + issue + " (" + loanDays() + " วัน)";
    }
}`,
  expectedOutput: "Clean Code (14 วัน) → คืนวันที่ 24\nSpirited Away (7 วัน) → คืนวันที่ 17\nWired ฉบับที่ 7 (3 วัน) → คืนวันที่ 13\nความยาว 125 นาที",
  tracePrompt: "LibraryItem first = items.get(1); แล้วเรียก first.minutes() ตรง ๆ (ไม่ผ่าน instanceof) จะเกิดอะไร ทั้งที่ object จริงเป็น Dvd ที่มี minutes()",
  traceAnswer: "compile error “cannot find symbol: method minutes()” เพราะ compiler ตรวจจาก static type (LibraryItem) ซึ่งไม่มี minutes() การเลือก method ตาม runtime type เกิดเฉพาะกับ method ที่มีใน static type แล้วเท่านั้น instanceof pattern เปลี่ยน static type ของตัวแปรใหม่ (dvd) เป็น Dvd จึงเรียกได้",
  practicePrompt: "ต่อจากตัวอย่าง เพิ่ม class ReferenceBook implements LibraryItem ที่ loanDays() คืน 0 และ describe() คืน <title> (อ่านในห้องสมุดเท่านั้น) เพิ่ม default method boolean isLoanable() ใน interface (จริงเมื่อ loanDays() > 0) แล้วเขียน static method String loanablesDue(List<LibraryItem> items, int today) ที่คืนบรรทัดของรายการที่ยืมได้ในรูป <title> → <วันครบกำหนด> คั่นด้วย \\n โดยห้ามใช้ instanceof หรือ getClass ใน main ใช้ Book(Clean Code), ReferenceBook(Oxford Dictionary), Dvd(Spirited Away, 125) และ today = 1 พิมพ์ describe ของทุกชิ้น แล้วพิมพ์ผลของ loanablesDue",
  starter: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    static String loanablesDue(List<LibraryItem> items, int today) {
        return "";
    }

    public static void main(String[] args) {
        // สร้าง items สามชิ้น พิมพ์ describe ทุกชิ้น แล้วพิมพ์ loanablesDue
    }
}

interface LibraryItem {
    String title();

    int loanDays();

    default String describe() {
        return title() + " (" + loanDays() + " วัน)";
    }

    // isLoanable
}

class Book implements LibraryItem {
    private final String title;

    Book(String title) {
        this.title = title;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 14;
    }
}

class Dvd implements LibraryItem {
    private final String title;
    private final int minutes;

    Dvd(String title, int minutes) {
        this.title = title;
        this.minutes = minutes;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 7;
    }
}

// ReferenceBook`,
  solution: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    static String loanablesDue(List<LibraryItem> items, int today) {
        ArrayList<String> lines = new ArrayList<>();
        for (LibraryItem item : items) {
            if (item.isLoanable()) {
                lines.add(item.title() + " → " + (today + item.loanDays()));
            }
        }
        return String.join("\n", lines);
    }

    public static void main(String[] args) {
        List<LibraryItem> items = List.of(new Book("Clean Code"), new ReferenceBook("Oxford Dictionary"), new Dvd("Spirited Away", 125));
        for (LibraryItem item : items) {
            System.out.println(item.describe());
        }
        System.out.println(loanablesDue(items, 1));
    }
}

interface LibraryItem {
    String title();

    int loanDays();

    default String describe() {
        return title() + " (" + loanDays() + " วัน)";
    }

    default boolean isLoanable() {
        return loanDays() > 0;
    }
}

class Book implements LibraryItem {
    private final String title;

    Book(String title) {
        this.title = title;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 14;
    }
}

class Dvd implements LibraryItem {
    private final String title;
    private final int minutes;

    Dvd(String title, int minutes) {
        this.title = title;
        this.minutes = minutes;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 7;
    }
}

class ReferenceBook implements LibraryItem {
    private final String title;

    ReferenceBook(String title) {
        this.title = title;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public int loanDays() {
        return 0;
    }

    @Override
    public String describe() {
        return title + " (อ่านในห้องสมุดเท่านั้น)";
    }
}`,
  solutionCheck: { output: "Clean Code (14 วัน)\nOxford Dictionary (อ่านในห้องสมุดเท่านั้น)\nSpirited Away (7 วัน)\nClean Code → 15\nSpirited Away → 8" },
  bugCheck: { kind: "logic", output: "Clean Code → 15\nWired → 1\nSpirited Away → 8" },
  buggy: java`import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Object> items = List.of(new Book("Clean Code"), new Magazine("Wired"), new Dvd("Spirited Away"));
        for (Object item : items) {
            int days = 0;
            String title = "";
            if (item instanceof Book book) {
                days = 14;
                title = book.title;
            } else if (item instanceof Dvd dvd) {
                days = 7;
                title = dvd.title;
            } else if (item instanceof Magazine magazine) {
                title = magazine.title;
            }
            System.out.println(title + " → " + (1 + days));
        }
    }
}

class Book {
    final String title;

    Book(String title) {
        this.title = title;
    }
}

class Dvd {
    final String title;

    Dvd(String title) {
        this.title = title;
    }
}

class Magazine {
    final String title;

    Magazine(String title) {
        this.title = title;
    }
}`,
  bugExplanation: "พิมพ์ Wired → 1 คือนิตยสารต้องคืนวันเดียวกับที่ยืม เพราะเมื่อเพิ่ม Magazine เข้า if/else ผู้แก้ลืมตั้ง days และไม่มีอะไรบังคับให้จำ compile ผ่านเป็น logic bug แก้ด้วย polymorphism: ให้ทุกชนิด implements LibraryItem ที่มี loanDays() — compiler จะบังคับให้ class ใหม่ต้องตอบ loanDays() เอง และ loop ไม่ต้องมี if ตามชนิดอีก",
  vocabulary: [v("polymorphism", "เรียก method เดียวกันแล้วได้พฤติกรรมตามชนิดจริง"), v("dynamic dispatch", "JVM เลือก method ตาม runtime type ตอนรัน"), v("static type", "ชนิดที่ประกาศของตัวแปร ใช้ตรวจตอน compile"), v("runtime type", "class จริงของ object"), v("instanceof pattern", "ตรวจชนิดและได้ตัวแปรชนิดนั้นในคำสั่งเดียว"), v("open/closed", "เพิ่มพฤติกรรมใหม่ได้โดยไม่ต้องแก้โค้ดเดิม")],
},
{
  id: "oop-inheritance",
  courseId,
  unit: "Inheritance และ abstraction",
  title: "inheritance: extends, super และ override อย่างระวัง",
  objective: "สร้าง subclass ด้วย extends เรียก constructor ของ superclass ด้วย super(...) override method พร้อม @Override และเรียกของเดิมด้วย super.method() ใช้ protected อย่างประหยัด และตรวจว่า subclass แทน superclass ได้จริง (is-a, Liskov substitution)",
  why: "สมาชิกนักเรียนเหมือนสมาชิกทั่วไปทุกอย่าง ยกเว้นยืมได้มากกว่าและต้องแสดงชื่อโรงเรียน inheritance ให้ reuse ส่วนที่เหมือนได้ แต่ถ้าใช้ผิดที่ (เช่นให้ subclass ปฏิเสธพฤติกรรมของ class แม่) โค้ดที่ทำงานกับ Member จะพังเมื่อได้ subclass",
  explanation: "class StudentMember extends Member ได้ field/method ที่ไม่ private ของ Member มาทั้งหมด constructor ของ subclass ต้องเรียก constructor ของ superclass เป็นบรรทัดแรกด้วย super(...) (ถ้าไม่เขียน Java จะเติม super() ให้ ซึ่ง compile ไม่ผ่านถ้า Member ไม่มี constructor เปล่า) override คือเขียน method signature เดียวกันใหม่ ใส่ @Override เสมอเพื่อให้ compiler ตรวจ เรียกของ superclass ด้วย super.describe() Java มี single inheritance: extends ได้ class เดียว (แต่ implements interface ได้หลายตัว) protected ให้ subclass และ package เดียวกันเข้าถึง — มักดีกว่าที่จะให้ subclass ใช้ method ของ superclass แทนการแตะ field ตรง ๆ หลักสำคัญ: ทุกที่ที่ใช้ Member ได้ ต้องใช้ StudentMember ได้โดยไม่เซอร์ไพรส์ (Liskov) ถ้า subclass ต้องปิดหรือเปลี่ยนความหมายของ method แม่ แปลว่าไม่ใช่ is-a จริง ให้ใช้ composition หรือ interface แทน final class/method ห้ามสืบทอด/override",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-polymorphism", "oop-composition"],
  example: java`import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Member> members = List.of(new Member("Sea"), new StudentMember("Ton", "โรงเรียนริมทะเล"));
        for (Member member : members) {
            System.out.println(member.describe() + " | ยืมได้ " + member.maxLoans() + " เล่ม " + member.loanDays() + " วัน");
        }
    }
}

class Member {
    private final String name;

    Member(String name) {
        this.name = name;
    }

    String name() {
        return name;
    }

    int maxLoans() {
        return 2;
    }

    int loanDays() {
        return 14;
    }

    String describe() {
        return "สมาชิก " + name;
    }
}

class StudentMember extends Member {
    private final String school;

    StudentMember(String name, String school) {
        super(name);
        this.school = school;
    }

    @Override
    int maxLoans() {
        return 3;
    }

    @Override
    String describe() {
        return super.describe() + " (นักเรียน " + school + ")";
    }
}`,
  expectedOutput: "สมาชิก Sea | ยืมได้ 2 เล่ม 14 วัน\nสมาชิก Ton (นักเรียน โรงเรียนริมทะเล) | ยืมได้ 3 เล่ม 14 วัน",
  tracePrompt: "สำหรับ Ton บรรทัดที่สองเรียก describe(), maxLoans() และ loanDays() แต่ละ method ถูกรันจาก class ไหน และ super.describe() ใช้ name ที่ private ใน Member ได้อย่างไร",
  traceAnswer: "describe() และ maxLoans() มาจาก StudentMember (override) ส่วน loanDays() ไม่ได้ override จึงใช้ของ Member super.describe() รันโค้ดของ Member ซึ่งอยู่ภายใน class Member จึงอ่าน name ที่ private ได้ — subclass เองอ่าน name ตรง ๆ ไม่ได้ ต้องผ่าน name() หรือ super.describe()",
  practicePrompt: "เพิ่ม class StaffMember extends Member ที่รับ name และ department: maxLoans() คืน 5, loanDays() คืน 28 และ describe() ต่อท้ายของเดิมด้วย (เจ้าหน้าที่ <department>) จากนั้นเขียน static String dueSummary(Member member, int today) ใน Main ที่คืน <describe> ยืมได้ถึงวันที่ <today + loanDays> โดยไม่ใช้ instanceof ใน main วนสามคน: Member(Sea), StudentMember(Ton, โรงเรียนริมทะเล), StaffMember(Fon, งานบริการ) ด้วย today = 1",
  starter: java`import java.util.List;

public class Main {
    static String dueSummary(Member member, int today) {
        return "";
    }

    public static void main(String[] args) {
        // วนสามคนแล้วพิมพ์ dueSummary(member, 1)
    }
}

class Member {
    private final String name;

    Member(String name) {
        this.name = name;
    }

    String name() {
        return name;
    }

    int maxLoans() {
        return 2;
    }

    int loanDays() {
        return 14;
    }

    String describe() {
        return "สมาชิก " + name;
    }
}

class StudentMember extends Member {
    private final String school;

    StudentMember(String name, String school) {
        super(name);
        this.school = school;
    }

    @Override
    int maxLoans() {
        return 3;
    }

    @Override
    String describe() {
        return super.describe() + " (นักเรียน " + school + ")";
    }
}

// StaffMember`,
  solution: java`import java.util.List;

public class Main {
    static String dueSummary(Member member, int today) {
        return member.describe() + " ยืมได้ถึงวันที่ " + (today + member.loanDays());
    }

    public static void main(String[] args) {
        List<Member> members = List.of(new Member("Sea"), new StudentMember("Ton", "โรงเรียนริมทะเล"), new StaffMember("Fon", "งานบริการ"));
        for (Member member : members) {
            System.out.println(dueSummary(member, 1));
        }
    }
}

class Member {
    private final String name;

    Member(String name) {
        this.name = name;
    }

    String name() {
        return name;
    }

    int maxLoans() {
        return 2;
    }

    int loanDays() {
        return 14;
    }

    String describe() {
        return "สมาชิก " + name;
    }
}

class StudentMember extends Member {
    private final String school;

    StudentMember(String name, String school) {
        super(name);
        this.school = school;
    }

    @Override
    int maxLoans() {
        return 3;
    }

    @Override
    String describe() {
        return super.describe() + " (นักเรียน " + school + ")";
    }
}

class StaffMember extends Member {
    private final String department;

    StaffMember(String name, String department) {
        super(name);
        this.department = department;
    }

    @Override
    int maxLoans() {
        return 5;
    }

    @Override
    int loanDays() {
        return 28;
    }

    @Override
    String describe() {
        return super.describe() + " (เจ้าหน้าที่ " + department + ")";
    }
}`,
  solutionCheck: { output: "สมาชิก Sea ยืมได้ถึงวันที่ 15\nสมาชิก Ton (นักเรียน โรงเรียนริมทะเล) ยืมได้ถึงวันที่ 15\nสมาชิก Fon (เจ้าหน้าที่ งานบริการ) ยืมได้ถึงวันที่ 29" },
  bugCheck: { kind: "compile", message: "constructor Member in class Member cannot be applied to given types" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        System.out.println(new StudentMember("Ton", "โรงเรียนริมทะเล").describe());
    }
}

class Member {
    private final String name;

    Member(String name) {
        this.name = name;
    }

    String describe() {
        return "สมาชิก " + name;
    }
}

class StudentMember extends Member {
    private final String school;

    StudentMember(String name, String school) {
        this.school = school;
    }
}`,
  bugExplanation: "compile error: “constructor Member in class Member cannot be applied to given types” constructor ของ StudentMember ไม่ได้เรียก super(...) Java จึงเติม super() ให้อัตโนมัติ แต่ Member ไม่มี constructor เปล่า แก้โดยเรียก super(name); เป็นบรรทัดแรกของ constructor — ส่วนของ object ที่เป็น Member ต้องถูกสร้างให้ถูกต้องก่อนเสมอ",
  vocabulary: [v("inheritance", "สืบทอด field/method จาก class แม่ด้วย extends"), v("superclass / subclass", "class แม่ / class ลูก"), v("super(...)", "เรียก constructor ของ class แม่"), v("override", "เขียน method ของ class แม่ใหม่ใน class ลูก"), v("protected", "เข้าถึงได้จาก subclass และ package เดียวกัน"), v("Liskov substitution", "ใช้ subclass แทน superclass ได้โดยพฤติกรรมไม่ผิดคาด")],
},
{
  id: "oop-abstract",
  courseId,
  unit: "Inheritance และ abstraction",
  title: "abstract class: โครงร่วมที่บังคับให้ subclass เติมส่วนที่ต่าง",
  objective: "สร้าง abstract class ที่มีทั้ง state และ method ร่วม (รวมถึง template method ที่เป็น final) พร้อม abstract method ที่ subclass ต้องเขียนเอง อธิบายว่าเมื่อไรเลือก abstract class และเมื่อไรเลือก interface",
  why: "หนังสือแจ้งเตือนทุกแบบของห้องสมุดมีหัวและท้ายเหมือนกัน ต่างกันแค่เนื้อหา ถ้าให้แต่ละ class เขียนเองทั้งฉบับ วันหนึ่งที่ต้องเปลี่ยนคำลงท้าย จะต้องแก้ทุก class และอาจพลาดบางตัว abstract class รวมส่วนที่เหมือนไว้ที่เดียวและบังคับให้ส่วนที่ต่างต้องถูกเขียน",
  explanation: "abstract class สร้าง object ตรง ๆ ไม่ได้ (new Notice(...) compile error) มีได้ทั้ง field, constructor, method ปกติ และ abstract method (ไม่มีตัว) ที่ subclass ที่ไม่ abstract ต้อง override template method: method ปกติ (มักใส่ final เพื่อไม่ให้ override) ที่กำหนดลำดับขั้น แล้วเรียก abstract method ในขั้นที่ต่างกัน — render() = header + body() + footer constructor ของ abstract class ใช้ตรวจ state ร่วม (เช่นชื่อสมาชิกต้องไม่ว่าง) ให้ทุก subclass ได้ฟรี เลือกอะไร: interface เมื่อต้องการบอกแค่ว่า “ทำอะไรได้” และให้ class ที่ไม่เกี่ยวกันหลายแบบ implements ได้ (class หนึ่ง implements ได้หลาย interface) abstract class เมื่อชนิดย่อยเป็นครอบครัวเดียวกันจริง (is-a) และต้องแชร์ state/ขั้นตอน — แต่ extends ได้แค่ตัวเดียว งานจริงมักใช้คู่กัน: interface เป็นสัญญา และ abstract class เป็นฐานช่วยเขียน",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-inheritance"],
  example: java`import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Fighter> fighters = List.of(new Knight("Aria"), new Slime());
        Fighter knight = fighters.get(0);
        Fighter slime = fighters.get(1);
        System.out.println(knight.attack(slime));
        System.out.println(slime.attack(knight));
        System.out.println(knight.attack(slime));
        System.out.println(slime.name() + " alive: " + slime.isAlive());
    }
}

abstract class Fighter {
    private final String name;
    private int hp;

    protected Fighter(String name, int hp) {
        if (hp <= 0) {
            throw new IllegalArgumentException("hp ต้องเป็นบวก");
        }
        this.name = name;
        this.hp = hp;
    }

    String name() {
        return name;
    }

    boolean isAlive() {
        return hp > 0;
    }

    final void takeDamage(int damage) {
        hp = Math.max(0, hp - damage);
    }

    final String attack(Fighter target) {
        int damage = attackPower();
        target.takeDamage(damage);
        return name + " โจมตี " + target.name() + " " + damage + " (" + target.name() + " เหลือ " + target.hp + ")";
    }

    protected abstract int attackPower();
}

class Knight extends Fighter {
    Knight(String name) {
        super(name, 30);
    }

    @Override
    protected int attackPower() {
        return 7;
    }
}

class Slime extends Fighter {
    Slime() {
        super("Slime", 12);
    }

    @Override
    protected int attackPower() {
        return 2;
    }
}`,
  expectedOutput: "Aria โจมตี Slime 7 (Slime เหลือ 5)\nSlime โจมตี Aria 2 (Aria เหลือ 28)\nAria โจมตี Slime 7 (Slime เหลือ 0)\nSlime alive: false",
  tracePrompt: "ใน attack ของ Fighter มี target.hp ซึ่งเป็น private ทำไม compile ผ่าน และถ้า Knight พยายาม override attack(...) จะเกิดอะไร",
  traceAnswer: "private จำกัดที่ class ไม่ใช่ที่ object: โค้ดใน class Fighter อ่าน hp ของ Fighter ตัวอื่นได้ attack เป็น final จึงห้าม override — javac แจ้ง “attack(Fighter) in Knight cannot override attack(Fighter) in Fighter; overridden method is final” ลำดับขั้นของการโจมตีจึงเหมือนกันทุกชนิด ต่างกันแค่ attackPower()",
  practicePrompt: "สร้าง abstract class Notice ที่รับชื่อสมาชิกใน constructor (ปฏิเสธชื่อว่าง) และมี final String render() คืน 3 บรรทัด: เรียน <ชื่อ> / <body()> / — ห้องสมุดชุมชน โดย body() เป็น protected abstract แล้วเขียน DueSoonNotice(name, title, dueDay) ที่ body คือ <title> ครบกำหนดคืนวันที่ <dueDay> และ OverdueNotice(name, title, lateDays) ที่ body คือ <title> เลยกำหนด <lateDays> วัน ค่าปรับ <lateDays × 5> บาท ใน main พิมพ์ render() ของ new DueSoonNotice(\"Sea\", \"Clean Code\", 15) และ new OverdueNotice(\"Ton\", \"Java 21\", 3)",
  starter: java`public class Main {
    public static void main(String[] args) {
        // พิมพ์ render ของ notice สองแบบ
    }
}

abstract class Notice {
    // ชื่อสมาชิก + constructor ที่ตรวจชื่อ
    // final render() เรียก body()
    // protected abstract body()
}

// DueSoonNotice และ OverdueNotice`,
  solution: java`public class Main {
    public static void main(String[] args) {
        System.out.println(new DueSoonNotice("Sea", "Clean Code", 15).render());
        System.out.println(new OverdueNotice("Ton", "Java 21", 3).render());
    }
}

abstract class Notice {
    private final String memberName;

    protected Notice(String memberName) {
        if (memberName == null || memberName.isBlank()) {
            throw new IllegalArgumentException("ต้องมีชื่อสมาชิก");
        }
        this.memberName = memberName;
    }

    final String render() {
        return "เรียน " + memberName + "\n" + body() + "\n— ห้องสมุดชุมชน";
    }

    protected abstract String body();
}

class DueSoonNotice extends Notice {
    private final String title;
    private final int dueDay;

    DueSoonNotice(String memberName, String title, int dueDay) {
        super(memberName);
        this.title = title;
        this.dueDay = dueDay;
    }

    @Override
    protected String body() {
        return title + " ครบกำหนดคืนวันที่ " + dueDay;
    }
}

class OverdueNotice extends Notice {
    private final String title;
    private final int lateDays;

    OverdueNotice(String memberName, String title, int lateDays) {
        super(memberName);
        this.title = title;
        this.lateDays = lateDays;
    }

    @Override
    protected String body() {
        return title + " เลยกำหนด " + lateDays + " วัน ค่าปรับ " + lateDays * 5 + " บาท";
    }
}`,
  solutionCheck: { output: "เรียน Sea\nClean Code ครบกำหนดคืนวันที่ 15\n— ห้องสมุดชุมชน\nเรียน Ton\nJava 21 เลยกำหนด 3 วัน ค่าปรับ 15 บาท\n— ห้องสมุดชุมชน" },
  bugCheck: { kind: "compile", message: "Notice is abstract; cannot be instantiated" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        Notice notice = new Notice("Sea");
        System.out.println(notice.render());
    }
}

abstract class Notice {
    private final String memberName;

    Notice(String memberName) {
        this.memberName = memberName;
    }

    String render() {
        return "เรียน " + memberName + "\n" + body();
    }

    abstract String body();
}`,
  bugExplanation: "compile error: “Notice is abstract; cannot be instantiated” abstract class ยังไม่สมบูรณ์ (body() ไม่มีตัว) จึงสร้าง object ตรง ๆ ไม่ได้ ต้องสร้างจาก subclass ที่เขียน body() แล้ว เช่น new DueSoonNotice(...) — ตัวแปรยังประกาศเป็นชนิด Notice ได้",
  vocabulary: [v("abstract class", "class ที่สร้าง object ตรง ๆ ไม่ได้ ใช้เป็นฐานของ subclass"), v("abstract method", "method ที่ไม่มีตัว subclass ต้องเขียน"), v("template method", "method ที่กำหนดลำดับขั้นและเรียกส่วนที่ subclass เติม"), v("final method", "method ที่ห้าม override"), v("protected constructor", "constructor ที่ให้ subclass เรียกผ่าน super(...)"), v("interface vs abstract class", "สัญญาความสามารถ vs ฐานร่วมของครอบครัวเดียวกัน")],
},
{
  id: "oop-project-rpg",
  courseId,
  unit: "Project: RPG Battle CLI",
  title: "★ RPG Battle CLI: interfaces, composition และ polymorphism ในเกมต่อสู้",
  objective: "สร้างเกมต่อสู้แบบตาต่อตาที่ผลแน่นอน (ไม่สุ่ม) ซึ่งอาวุธเป็น interface ที่สลับได้ (composition), ผู้ต่อสู้มี abstract class ร่วม และการต่อสู้ทำงานผ่าน polymorphism — พร้อมไฟล์ fixture ที่ทดสอบทุกข้อความ",
  why: "เกมเป็นโจทย์ที่เห็นผลของการออกแบบชัดที่สุด: เพิ่มอาวุธใหม่ควรเพิ่มแค่ class เดียว ไม่ต้องแก้ Battle และการที่ผลไม่สุ่มทำให้ทดสอบด้วยไฟล์ input/expected ได้เหมือน Library CLI",
  explanation: "ข้อกำหนด (ข้อความต้องตรง): hero <name> <weapon> → hero <name> with <weapon> (hp 30) | unknown weapon: <weapon> | usage: hero <name> <weapon>; monster <name> <hp> <attack> → monster <name> (hp <hp>, attack <attack>) | usage: monster <name> <hp> <attack> (hp/attack ต้องเป็นจำนวนเต็มบวก); fight → ถ้ายังไม่มีทั้งสองฝ่าย: need a hero and a monster ไม่งั้นพิมพ์ทีละรอบ: round <n>: <hero> hits <monster> for <d> (<monster> hp <เหลือ>) แล้วถ้ามอนสเตอร์ยังอยู่: <monster> hits <hero> for <attack> (<hero> hp <เหลือ>) จนฝ่ายหนึ่ง hp เป็น 0 แล้วพิมพ์ <ผู้ชนะ> wins หลังจบ ฝ่ายที่แพ้ถูกนำออก (ผู้ชนะเก็บ hp ที่เหลือไว้สู้ต่อ) ถ้าครบ 50 รอบยังไม่จบพิมพ์ draw; quit → bye อาวุธ: sword ทำ 7 ทุกรอบ, bow ทำ 10 ในรอบแรก (ยิงก่อน) แล้ว 5 ในรอบต่อไป, staff ทำ 4 + เลขรอบ (5, 6, 7, ...) การออกแบบ: interface Weapon { String name(); int damage(int round); }, abstract class Fighter (ชื่อ, hp, takeDamage, isAlive, abstract attackDamage(round)), Hero มี Weapon (composition), Monster มีค่าโจมตีคงที่, Battle จัดลำดับรอบโดยรู้จักแค่ Fighter",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-abstract", "oop-interfaces", "oop-composition"],
  example: java`import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Weapon> weapons = List.of(new Sword(), new Bow(), new Staff());
        for (Weapon weapon : weapons) {
            System.out.println(weapon.name() + ": " + weapon.damage(1) + ", " + weapon.damage(2) + ", " + weapon.damage(3));
        }
    }
}

interface Weapon {
    String name();

    int damage(int round);
}

class Sword implements Weapon {
    @Override
    public String name() {
        return "sword";
    }

    @Override
    public int damage(int round) {
        return 7;
    }
}

class Bow implements Weapon {
    @Override
    public String name() {
        return "bow";
    }

    @Override
    public int damage(int round) {
        return round == 1 ? 10 : 5;
    }
}

class Staff implements Weapon {
    @Override
    public String name() {
        return "staff";
    }

    @Override
    public int damage(int round) {
        return 4 + round;
    }
}`,
  expectedOutput: "sword: 7, 7, 7\nbow: 10, 5, 5\nstaff: 5, 6, 7",
  tracePrompt: "ฮีโร่ถือ staff (hp 30) สู้กับ monster Troll 20 4 ไล่ทีละรอบว่าใครชนะในรอบไหน และ hp ของฮีโร่เหลือเท่าไร",
  traceAnswer: "รอบ 1: staff 5 → Troll 15, Troll ตี 4 → ฮีโร่ 26 · รอบ 2: 6 → 9, ฮีโร่ 22 · รอบ 3: 7 → 2, ฮีโร่ 18 · รอบ 4: 8 → Troll 0 ฮีโร่ชนะโดย Troll ไม่ได้ตีกลับในรอบนั้น hp ฮีโร่เหลือ 18",
  practicePrompt: "สร้าง RPG Battle CLI ตามข้อกำหนดในคำอธิบาย ในไฟล์ Main.java ไฟล์เดียวหรือหลายไฟล์ก็ได้ เขียน test-input.txt / expected-output.txt ที่ครอบคลุมทุกข้อความ (รวม need a hero and a monster, unknown weapon, usage ทั้งสองแบบ และการชนะด้วยอาวุธครบสามแบบ) จากนั้นเพิ่มอาวุธใหม่ dagger (3 ต่อรอบ) โดยแก้แค่สองที่: class ใหม่ และการเลือกอาวุธจากชื่อ — Battle ต้องไม่ถูกแก้",
  starter: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // อ่านคำสั่ง hero / monster / fight / quit
    }
}

interface Weapon {
    String name();

    int damage(int round);
}

abstract class Fighter {
    // name, hp, takeDamage, isAlive, abstract attackDamage(round)
}

// Sword, Bow, Staff, Hero, Monster, Battle`,
  solution: java`// File: Main.java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private Hero hero;
    private Monster monster;

    String handle(String line) {
        String[] words = line.split("\\s+");
        return switch (words[0]) {
            case "hero" -> createHero(words);
            case "monster" -> createMonster(words);
            case "fight" -> fight();
            default -> "unknown command: " + words[0];
        };
    }

    private String createHero(String[] words) {
        if (words.length != 3) {
            return "usage: hero <name> <weapon>";
        }
        Weapon weapon = Weapons.byName(words[2]);
        if (weapon == null) {
            return "unknown weapon: " + words[2];
        }
        hero = new Hero(words[1], weapon);
        return "hero " + hero.name() + " with " + weapon.name() + " (hp " + hero.hp() + ")";
    }

    private String createMonster(String[] words) {
        if (words.length != 4) {
            return "usage: monster <name> <hp> <attack>";
        }
        try {
            int hp = Integer.parseInt(words[2]);
            int attack = Integer.parseInt(words[3]);
            if (hp <= 0 || attack <= 0) {
                return "usage: monster <name> <hp> <attack>";
            }
            monster = new Monster(words[1], hp, attack);
            return "monster " + monster.name() + " (hp " + hp + ", attack " + attack + ")";
        } catch (NumberFormatException e) {
            return "usage: monster <name> <hp> <attack>";
        }
    }

    private String fight() {
        if (hero == null || monster == null) {
            return "need a hero and a monster";
        }
        Battle battle = new Battle(hero, monster);
        String log = battle.run();
        if (!hero.isAlive()) {
            hero = null;
        }
        if (!monster.isAlive()) {
            monster = null;
        }
        return log;
    }

    public static void main(String[] args) {
        Main game = new Main();
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;
            }
            if (line.equals("quit")) {
                System.out.println("bye");
                break;
            }
            System.out.println(game.handle(line));
        }
    }
}

interface Weapon {
    String name();

    int damage(int round);
}

class Sword implements Weapon {
    @Override
    public String name() {
        return "sword";
    }

    @Override
    public int damage(int round) {
        return 7;
    }
}

class Bow implements Weapon {
    @Override
    public String name() {
        return "bow";
    }

    @Override
    public int damage(int round) {
        return round == 1 ? 10 : 5;
    }
}

class Staff implements Weapon {
    @Override
    public String name() {
        return "staff";
    }

    @Override
    public int damage(int round) {
        return 4 + round;
    }
}

class Dagger implements Weapon {
    @Override
    public String name() {
        return "dagger";
    }

    @Override
    public int damage(int round) {
        return 3;
    }
}

class Weapons {
    static Weapon byName(String name) {
        return switch (name) {
            case "sword" -> new Sword();
            case "bow" -> new Bow();
            case "staff" -> new Staff();
            case "dagger" -> new Dagger();
            default -> null;
        };
    }
}

abstract class Fighter {
    private final String name;
    private int hp;

    protected Fighter(String name, int hp) {
        this.name = name;
        this.hp = hp;
    }

    String name() {
        return name;
    }

    int hp() {
        return hp;
    }

    boolean isAlive() {
        return hp > 0;
    }

    void takeDamage(int damage) {
        hp = Math.max(0, hp - damage);
    }

    abstract int attackDamage(int round);
}

class Hero extends Fighter {
    private final Weapon weapon;

    Hero(String name, Weapon weapon) {
        super(name, 30);
        this.weapon = weapon;
    }

    @Override
    int attackDamage(int round) {
        return weapon.damage(round);
    }
}

class Monster extends Fighter {
    private final int attack;

    Monster(String name, int hp, int attack) {
        super(name, hp);
        this.attack = attack;
    }

    @Override
    int attackDamage(int round) {
        return attack;
    }
}

class Battle {
    static final int MAX_ROUNDS = 50;
    private final Fighter first;
    private final Fighter second;

    Battle(Fighter first, Fighter second) {
        this.first = first;
        this.second = second;
    }

    String run() {
        List<String> log = new ArrayList<>();
        for (int round = 1; round <= MAX_ROUNDS; round++) {
            log.add("round " + round + ": " + strike(first, second, round));
            if (!second.isAlive()) {
                log.add(first.name() + " wins");
                return String.join("\n", log);
            }
            log.add(strike(second, first, round));
            if (!first.isAlive()) {
                log.add(second.name() + " wins");
                return String.join("\n", log);
            }
        }
        log.add("draw");
        return String.join("\n", log);
    }

    private static String strike(Fighter attacker, Fighter target, int round) {
        int damage = attacker.attackDamage(round);
        target.takeDamage(damage);
        return attacker.name() + " hits " + target.name() + " for " + damage + " (" + target.name() + " hp " + target.hp() + ")";
    }
}
// File: test-input.txt
fight
hero Aria axe
hero Aria
hero Aria sword
monster Slime 12 3
fight
fight
monster Goblin x 2
monster Goblin 0 2
monster Goblin 30 6
fight
hero Bran bow
monster Bat 9 2
fight
hero Cy staff
monster Troll 20 4
fight
monster Golem 99 1
hero Dee dagger
fight
jump
quit
fight
// File: expected-output.txt
need a hero and a monster
unknown weapon: axe
usage: hero <name> <weapon>
hero Aria with sword (hp 30)
monster Slime (hp 12, attack 3)
round 1: Aria hits Slime for 7 (Slime hp 5)
Slime hits Aria for 3 (Aria hp 27)
round 2: Aria hits Slime for 7 (Slime hp 0)
Aria wins
need a hero and a monster
usage: monster <name> <hp> <attack>
usage: monster <name> <hp> <attack>
monster Goblin (hp 30, attack 6)
round 1: Aria hits Goblin for 7 (Goblin hp 23)
Goblin hits Aria for 6 (Aria hp 21)
round 2: Aria hits Goblin for 7 (Goblin hp 16)
Goblin hits Aria for 6 (Aria hp 15)
round 3: Aria hits Goblin for 7 (Goblin hp 9)
Goblin hits Aria for 6 (Aria hp 9)
round 4: Aria hits Goblin for 7 (Goblin hp 2)
Goblin hits Aria for 6 (Aria hp 3)
round 5: Aria hits Goblin for 7 (Goblin hp 0)
Aria wins
hero Bran with bow (hp 30)
monster Bat (hp 9, attack 2)
round 1: Bran hits Bat for 10 (Bat hp 0)
Bran wins
hero Cy with staff (hp 30)
monster Troll (hp 20, attack 4)
round 1: Cy hits Troll for 5 (Troll hp 15)
Troll hits Cy for 4 (Cy hp 26)
round 2: Cy hits Troll for 6 (Troll hp 9)
Troll hits Cy for 4 (Cy hp 22)
round 3: Cy hits Troll for 7 (Troll hp 2)
Troll hits Cy for 4 (Cy hp 18)
round 4: Cy hits Troll for 8 (Troll hp 0)
Cy wins
monster Golem (hp 99, attack 1)
hero Dee with dagger (hp 30)
round 1: Dee hits Golem for 3 (Golem hp 96)
Golem hits Dee for 1 (Dee hp 29)
round 2: Dee hits Golem for 3 (Golem hp 93)
Golem hits Dee for 1 (Dee hp 28)
round 3: Dee hits Golem for 3 (Golem hp 90)
Golem hits Dee for 1 (Dee hp 27)
round 4: Dee hits Golem for 3 (Golem hp 87)
Golem hits Dee for 1 (Dee hp 26)
round 5: Dee hits Golem for 3 (Golem hp 84)
Golem hits Dee for 1 (Dee hp 25)
round 6: Dee hits Golem for 3 (Golem hp 81)
Golem hits Dee for 1 (Dee hp 24)
round 7: Dee hits Golem for 3 (Golem hp 78)
Golem hits Dee for 1 (Dee hp 23)
round 8: Dee hits Golem for 3 (Golem hp 75)
Golem hits Dee for 1 (Dee hp 22)
round 9: Dee hits Golem for 3 (Golem hp 72)
Golem hits Dee for 1 (Dee hp 21)
round 10: Dee hits Golem for 3 (Golem hp 69)
Golem hits Dee for 1 (Dee hp 20)
round 11: Dee hits Golem for 3 (Golem hp 66)
Golem hits Dee for 1 (Dee hp 19)
round 12: Dee hits Golem for 3 (Golem hp 63)
Golem hits Dee for 1 (Dee hp 18)
round 13: Dee hits Golem for 3 (Golem hp 60)
Golem hits Dee for 1 (Dee hp 17)
round 14: Dee hits Golem for 3 (Golem hp 57)
Golem hits Dee for 1 (Dee hp 16)
round 15: Dee hits Golem for 3 (Golem hp 54)
Golem hits Dee for 1 (Dee hp 15)
round 16: Dee hits Golem for 3 (Golem hp 51)
Golem hits Dee for 1 (Dee hp 14)
round 17: Dee hits Golem for 3 (Golem hp 48)
Golem hits Dee for 1 (Dee hp 13)
round 18: Dee hits Golem for 3 (Golem hp 45)
Golem hits Dee for 1 (Dee hp 12)
round 19: Dee hits Golem for 3 (Golem hp 42)
Golem hits Dee for 1 (Dee hp 11)
round 20: Dee hits Golem for 3 (Golem hp 39)
Golem hits Dee for 1 (Dee hp 10)
round 21: Dee hits Golem for 3 (Golem hp 36)
Golem hits Dee for 1 (Dee hp 9)
round 22: Dee hits Golem for 3 (Golem hp 33)
Golem hits Dee for 1 (Dee hp 8)
round 23: Dee hits Golem for 3 (Golem hp 30)
Golem hits Dee for 1 (Dee hp 7)
round 24: Dee hits Golem for 3 (Golem hp 27)
Golem hits Dee for 1 (Dee hp 6)
round 25: Dee hits Golem for 3 (Golem hp 24)
Golem hits Dee for 1 (Dee hp 5)
round 26: Dee hits Golem for 3 (Golem hp 21)
Golem hits Dee for 1 (Dee hp 4)
round 27: Dee hits Golem for 3 (Golem hp 18)
Golem hits Dee for 1 (Dee hp 3)
round 28: Dee hits Golem for 3 (Golem hp 15)
Golem hits Dee for 1 (Dee hp 2)
round 29: Dee hits Golem for 3 (Golem hp 12)
Golem hits Dee for 1 (Dee hp 1)
round 30: Dee hits Golem for 3 (Golem hp 9)
Golem hits Dee for 1 (Dee hp 0)
Golem wins
unknown command: jump
bye
`,
  bugCheck: { kind: "logic", output: "round 1: Aria hits Slime for 7 (Slime hp 0)\nSlime hits Aria for 3 (Aria hp 27)\nAria wins" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        Fighter aria = new Fighter("Aria", 30, 7);
        Fighter slime = new Fighter("Slime", 7, 3);
        int round = 1;
        while (aria.hp > 0 && slime.hp > 0) {
            slime.hp = Math.max(0, slime.hp - aria.attack);
            System.out.println("round " + round + ": Aria hits Slime for " + aria.attack + " (Slime hp " + slime.hp + ")");
            aria.hp = Math.max(0, aria.hp - slime.attack);
            System.out.println("Slime hits Aria for " + slime.attack + " (Aria hp " + aria.hp + ")");
            round++;
        }
        System.out.println(aria.hp > 0 ? "Aria wins" : "Slime wins");
    }
}

class Fighter {
    final String name;
    int hp;
    final int attack;

    Fighter(String name, int hp, int attack) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
    }
}`,
  bugExplanation: "พิมพ์ว่า Slime ตี Aria ทั้งที่ Slime hp เป็น 0 ไปแล้วในรอบเดียวกัน เพราะ loop ตรวจว่ายังมีชีวิตแค่ต้นรอบ ไม่ได้ตรวจหลังการโจมตีครั้งแรก ผลคือ Aria เสีย hp ที่ไม่ควรเสีย compile ผ่านเป็น logic bug แก้โดยตรวจ isAlive ของผู้ถูกโจมตีทันทีหลังแต่ละครั้ง (ตามที่ Battle.run ในเฉลยทำ)",
  vocabulary: [v("strategy", "พฤติกรรมที่สลับได้ผ่าน interface เช่น Weapon"), v("composition over inheritance", "ประกอบพฤติกรรมจาก object แทนการสร้าง subclass ทุกแบบ"), v("deterministic", "input เดิมได้ผลเดิมทุกครั้ง"), v("game loop", "ลำดับรอบที่ทำซ้ำจนเกมจบ"), v("factory", "ที่เดียวที่สร้าง object จากชื่อ เช่น Weapons.byName"), v("fixture", "ไฟล์ input/expected ใช้ทดสอบซ้ำ")],
},
{
  id: "oop-collections",
  courseId,
  unit: "Collections และ exceptions",
  title: "collections: List, Set, Map และการเรียงด้วย Comparator",
  objective: "เลือกโครงสร้างตามคำถามที่ต้องตอบ: List เมื่อสนลำดับและยอมซ้ำ, Set เมื่อห้ามซ้ำ, Map เมื่อต้องค้นด้วย key ใช้ HashMap/LinkedHashMap/TreeMap ตามลำดับที่ต้องการ นับด้วย merge/getOrDefault และเรียงด้วย Comparator.comparing พร้อม thenComparing",
  why: "Library M2 ค้นหนังสือด้วย loop ทุกครั้งและนับสถิติด้วย if ซ้อน เมื่อหนังสือมีหลายหมื่นเล่มหรือคำถามซับซ้อนขึ้น (ใครยืมบ่อยที่สุด, หมวดไหนไม่ซ้ำกี่หมวด) โครงสร้างที่ถูกทำให้โค้ดสั้นลงและเร็วขึ้น",
  explanation: "ประกาศด้วย interface: List<Book>, Set<String>, Map<Integer, Book> แล้วเลือก implementation: ArrayList (ลำดับตามที่ใส่), HashSet/HashMap (เร็ว ไม่รับประกันลำดับ), LinkedHashSet/LinkedHashMap (คงลำดับที่ใส่), TreeSet/TreeMap (เรียงตาม key) Set และ key ของ Map ใช้ equals/hashCode (Hash...) หรือ compareTo (Tree...) จึงต้องมีให้ถูก (บท identity) Map: put, get (null ถ้าไม่มี), getOrDefault, containsKey, merge(key, 1, Integer::sum) นับเพิ่ม, entrySet() วนคู่ key–value Comparator.comparing(Book::title) สร้างตัวเปรียบเทียบจาก getter (Book::title คือ method reference = book -> book.title()), .reversed() กลับลำดับ, .thenComparing(...) ใช้เมื่อเท่ากัน list.sort(comparator) เรียงในที่ ส่วน List.copyOf/Map.copyOf ทำสำเนาที่แก้ไม่ได้ (ไม่รับ null) ตัวอย่างใช้ record Book(int id, String title, String category) {} ซึ่งเป็น class สั้นสำหรับข้อมูลที่เปลี่ยนไม่ได้: Java สร้าง constructor, accessor (book.title()), equals/hashCode (เทียบทุก component) และ toString ให้เอง",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-identity", "oop-project-library-2"],
  example: java`import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

public class Main {
    record Book(int id, String title, String category) {
    }

    public static void main(String[] args) {
        List<Book> books = new ArrayList<>(List.of(
            new Book(3, "Refactoring", "craft"),
            new Book(1, "Clean Code", "craft"),
            new Book(2, "Java 21", "language")));

        Map<Integer, Book> byId = new HashMap<>();
        for (Book book : books) {
            byId.put(book.id(), book);
        }
        System.out.println(byId.get(2).title() + " " + byId.get(9) + " " + byId.containsKey(1));

        TreeSet<String> categories = new TreeSet<>();
        Map<String, Integer> perCategory = new LinkedHashMap<>();
        for (Book book : books) {
            categories.add(book.category());
            perCategory.merge(book.category(), 1, Integer::sum);
        }
        System.out.println(categories + " " + perCategory);

        books.sort(Comparator.comparing(Book::category).thenComparing(Book::title));
        for (Book book : books) {
            System.out.println(book.category() + " / " + book.title());
        }
        System.out.println(new TreeMap<>(Map.of("b", 2, "a", 1)));
    }
}`,
  expectedOutput: "Java 21 null true\n[craft, language] {craft=2, language=1}\ncraft / Clean Code\ncraft / Refactoring\nlanguage / Java 21\n{a=1, b=2}",
  tracePrompt: "ตัวอย่างใช้ record Book(...) ซึ่งสร้าง constructor, accessor (title()), equals, hashCode และ toString ให้อัตโนมัติ ถ้าใส่ new Book(1, \"Clean Code\", \"craft\") สองตัวลงใน HashSet<Book> จะได้ขนาดเท่าไร ต่างจาก class Book ที่ไม่ได้ override equals อย่างไร",
  traceAnswer: "ได้ 1 เพราะ equals/hashCode ของ record เทียบทุก component ที่ประกาศ (id, title, category) สองตัวนี้จึงเท่ากัน ส่วน class ที่ไม่ override equals จะได้ 2 เพราะเทียบ reference — record เหมาะกับข้อมูลที่ “ค่าเหมือน = เป็นสิ่งเดียวกัน” ส่วน entity ที่ระบุด้วย id และ state เปลี่ยนได้ยังควรเป็น class ที่ equals ตาม id",
  practicePrompt: "มีบันทึกการยืม String[] log = {\"Sea:Clean Code\", \"Ton:Java 21\", \"Sea:Java 21\", \"Fon:Clean Code\", \"Sea:Clean Code\", \"Ton:Refactoring\"} (ชื่อ:หนังสือ) ให้พิมพ์ (1) จำนวนครั้งที่แต่ละคนยืม เรียงตามชื่อ ใช้ TreeMap + merge: {Fon=1, Sea=3, Ton=2} (2) หนังสือที่ไม่ซ้ำเรียงตามชื่อ ใช้ TreeSet: [Clean Code, Java 21, Refactoring] (3) หนังสือที่ถูกยืมมากที่สุดพร้อมจำนวน ถ้าเท่ากันเลือกชื่อที่มาก่อนตามตัวอักษร: Clean Code 3 (4) ผู้ยืมของแต่ละเล่มแบบไม่ซ้ำ คงลำดับที่พบครั้งแรก ใช้ LinkedHashMap<String, LinkedHashSet<String>>: {Clean Code=[Sea, Fon], Java 21=[Ton, Sea], Refactoring=[Ton]}",
  starter: java`import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        String[] log = {"Sea:Clean Code", "Ton:Java 21", "Sea:Java 21", "Fon:Clean Code", "Sea:Clean Code", "Ton:Refactoring"};
        // แยกแต่ละรายการด้วย split(":") แล้วสร้างโครงสร้างทั้งสี่
    }
}`,
  solution: java`import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        String[] log = {"Sea:Clean Code", "Ton:Java 21", "Sea:Java 21", "Fon:Clean Code", "Sea:Clean Code", "Ton:Refactoring"};
        Map<String, Integer> perMember = new TreeMap<>();
        TreeSet<String> titles = new TreeSet<>();
        Map<String, Integer> perTitle = new TreeMap<>();
        Map<String, LinkedHashSet<String>> borrowers = new LinkedHashMap<>();
        for (String entry : log) {
            String[] parts = entry.split(":");
            String member = parts[0];
            String title = parts[1];
            perMember.merge(member, 1, Integer::sum);
            titles.add(title);
            perTitle.merge(title, 1, Integer::sum);
            borrowers.computeIfAbsent(title, key -> new LinkedHashSet<>()).add(member);
        }
        System.out.println(perMember);
        System.out.println(titles);
        String top = null;
        for (Map.Entry<String, Integer> entry : perTitle.entrySet()) {
            if (top == null || entry.getValue() > perTitle.get(top)) {
                top = entry.getKey();
            }
        }
        System.out.println(top + " " + perTitle.get(top));
        System.out.println(borrowers);
    }
}`,
  solutionCheck: { output: "{Fon=1, Sea=3, Ton=2}\n[Clean Code, Java 21, Refactoring]\nClean Code 3\n{Clean Code=[Sea, Fon], Java 21=[Ton, Sea], Refactoring=[Ton]}" },
  bugCheck: { kind: "logic", output: "2" },
  buggy: java`import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<Member> members = new HashSet<>();
        members.add(new Member(1, "Sea"));
        members.add(new Member(1, "Sea"));
        System.out.println(members.size());
    }
}

class Member {
    private final int id;
    private final String name;

    Member(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof Member member && id == member.id;
    }
}`,
  bugExplanation: "พิมพ์ 2 ทั้งที่สองตัว equals กัน เพราะ override equals แต่ไม่ได้ override hashCode HashSet จึงวางทั้งคู่ไว้คนละช่องตาม hashCode ค่าเริ่มต้นและไม่เคยเรียก equals เทียบ compile ผ่านเป็น logic bug แก้โดยเพิ่ม @Override public int hashCode() { return Integer.hashCode(id); }",
  vocabulary: [v("List / Set / Map", "ลำดับยอมซ้ำ / ห้ามซ้ำ / คู่ key–value"), v("HashMap / LinkedHashMap / TreeMap", "ไม่รับประกันลำดับ / คงลำดับที่ใส่ / เรียงตาม key"), v("merge", "รวมค่าใหม่กับค่าเดิมของ key เช่นนับเพิ่ม"), v("computeIfAbsent", "สร้างค่าเริ่มต้นให้ key ที่ยังไม่มีแล้วคืนค่านั้น"), v("Comparator", "ตัวกำหนดวิธีเรียง เช่น comparing(...).thenComparing(...)"), v("method reference", "Book::title คือการอ้างถึง method แทนการเขียน lambda")],
},
{
  id: "oop-exceptions",
  courseId,
  unit: "Collections และ exceptions",
  title: "exceptions ในการออกแบบ: checked vs unchecked, exception ของโดเมน และ try-with-resources",
  objective: "แยก checked exception (ต้องประกาศ throws หรือจับ เช่น IOException) กับ unchecked (RuntimeException) สร้าง exception ของโดเมนที่มีชื่อบอกความหมาย จับครั้งเดียวที่ขอบระบบ (CLI) เก็บสาเหตุเดิมด้วย cause และปิดทรัพยากรด้วย try-with-resources",
  why: "Library M2 ใช้ IllegalStateException สำหรับทุกอย่างและพึ่งข้อความเพื่อแยกกรณี ถ้าวันหนึ่งข้อความเปลี่ยน โค้ดที่ตรวจข้อความจะพังเงียบ ๆ exception ที่มีชนิดของตัวเองทำให้ compiler และผู้อ่านรู้ว่ามีความผิดพลาดแบบไหนบ้าง และการอ่านไฟล์ที่ลืมปิดทำให้ระบบหมดทรัพยากรได้",
  explanation: "checked exception (subclass ของ Exception ที่ไม่ใช่ RuntimeException) บังคับให้ผู้เรียกจัดการ: ประกาศ throws IOException หรือ catch — ใช้กับปัญหาจากภายนอกที่คาดได้และผู้เรียกควรตัดสินใจ (ไฟล์หาย, network) unchecked (RuntimeException) ไม่บังคับ ใช้กับการผิดกติกาหรือบั๊กของโปรแกรม exception ของโดเมน: class LibraryException extends RuntimeException และ subclass เช่น BookNotFoundException, LoanLimitException ทำให้ catch ได้ทั้งกลุ่มหรือเฉพาะชนิด จับที่ขอบระบบ (Main) ที่เดียวแล้วแปลงเป็นข้อความ ไม่ catch แล้วกลืนกลางทาง เมื่อแปลง exception หนึ่งเป็นอีกชนิด ส่ง cause ต่อ (new LibraryDataException(\"...\", e)) เพื่อให้ stack trace ยังเห็นต้นเหตุ try (BufferedReader reader = ...) { ... } ปิด reader ให้เสมอแม้มี exception (resource ต้อง implements AutoCloseable)",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-collections", "java-exceptions-basic"],
  example: java`import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        try {
            System.out.println(readTitles("Clean Code\n\nJava 21\n"));
            System.out.println(readTitles("Clean Code\n#broken\n"));
        } catch (LibraryException e) {
            System.out.println(e.getClass().getSimpleName() + ": " + e.getMessage() + " (cause: " + e.getCause().getClass().getSimpleName() + ")");
        }
        try {
            throw new LoanLimitException("Sea", 2);
        } catch (LibraryException e) {
            System.out.println(e.getMessage());
        }
    }

    static List<String> readTitles(String text) {
        List<String> titles = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new StringReader(text))) {
            String line;
            int number = 0;
            while ((line = reader.readLine()) != null) {
                number++;
                if (line.startsWith("#")) {
                    throw new IOException("บรรทัด " + number + " ขึ้นต้นด้วย #");
                }
                if (!line.isBlank()) {
                    titles.add(line);
                }
            }
        } catch (IOException e) {
            throw new LibraryDataException("อ่านรายชื่อหนังสือไม่ได้", e);
        }
        return titles;
    }
}

class LibraryException extends RuntimeException {
    LibraryException(String message) {
        super(message);
    }

    LibraryException(String message, Throwable cause) {
        super(message, cause);
    }
}

class LibraryDataException extends LibraryException {
    LibraryDataException(String message, Throwable cause) {
        super(message, cause);
    }
}

class LoanLimitException extends LibraryException {
    LoanLimitException(String member, int max) {
        super(member + " ยืมครบ " + max + " เล่มแล้ว");
    }
}`,
  expectedOutput: "[Clean Code, Java 21]\nLibraryDataException: อ่านรายชื่อหนังสือไม่ได้ (cause: IOException)\nSea ยืมครบ 2 เล่มแล้ว",
  tracePrompt: "ถ้าลบ catch (IOException e) ใน readTitles ออก (เหลือ try-with-resources เปล่า) จะ compile ผ่านไหม เพราะอะไร และ reader ถูกปิดเมื่อไรในกรณี #broken",
  traceAnswer: "ไม่ผ่าน: “unreported exception java.io.IOException; must be caught or declared to be thrown” เพราะ readLine, close และ throw new IOException เป็น checked ต้องจับหรือประกาศ throws IOException ที่ method ในกรณี #broken reader ถูกปิดอัตโนมัติก่อนเข้าบล็อก catch (try-with-resources ปิด resource ก่อนส่ง exception ออกไป)",
  practicePrompt: "สร้าง exception ของโดเมน: LibraryException (unchecked) และ subclass BookNotFoundException(int id) ข้อความ no such book #<id>, AlreadyBorrowedException(int id) ข้อความ #<id> already borrowed จากนั้น class Shelf ที่มี Map<Integer, Boolean> (id → ถูกยืมอยู่ไหม) และ method void borrow(int id) ที่ throw สอง exception นี้ตามกรณี ใน main: ใส่หนังสือ id 1 และ 2 แล้ววนคำสั่งยืม 1, 1, 3, 2 โดยจับ LibraryException ครั้งเดียวใน loop พิมพ์ ok #<id> เมื่อสำเร็จ หรือชื่อ class (getSimpleName) ตามด้วย : และข้อความ เมื่อผิด",
  starter: java`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Shelf shelf = new Shelf();
        shelf.add(1);
        shelf.add(2);
        int[] requests = {1, 1, 3, 2};
        // วนยืม จับ LibraryException ครั้งเดียว
    }
}

class Shelf {
    private final Map<Integer, Boolean> borrowed = new HashMap<>();

    void add(int id) {
        borrowed.put(id, false);
    }

    void borrow(int id) {
        // throw BookNotFoundException / AlreadyBorrowedException
    }
}

// LibraryException, BookNotFoundException, AlreadyBorrowedException`,
  solution: java`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Shelf shelf = new Shelf();
        shelf.add(1);
        shelf.add(2);
        int[] requests = {1, 1, 3, 2};
        for (int id : requests) {
            try {
                shelf.borrow(id);
                System.out.println("ok #" + id);
            } catch (LibraryException e) {
                System.out.println(e.getClass().getSimpleName() + ": " + e.getMessage());
            }
        }
    }
}

class Shelf {
    private final Map<Integer, Boolean> borrowed = new HashMap<>();

    void add(int id) {
        borrowed.put(id, false);
    }

    void borrow(int id) {
        Boolean isBorrowed = borrowed.get(id);
        if (isBorrowed == null) {
            throw new BookNotFoundException(id);
        }
        if (isBorrowed) {
            throw new AlreadyBorrowedException(id);
        }
        borrowed.put(id, true);
    }
}

class LibraryException extends RuntimeException {
    LibraryException(String message) {
        super(message);
    }
}

class BookNotFoundException extends LibraryException {
    BookNotFoundException(int id) {
        super("no such book #" + id);
    }
}

class AlreadyBorrowedException extends LibraryException {
    AlreadyBorrowedException(int id) {
        super("#" + id + " already borrowed");
    }
}`,
  solutionCheck: { output: "ok #1\nAlreadyBorrowedException: #1 already borrowed\nBookNotFoundException: no such book #3\nok #2" },
  bugCheck: { kind: "logic", output: "บันทึกไม่สำเร็จ: null" },
  buggy: java`public class Main {
    public static void main(String[] args) {
        try {
            save("Clean Code");
        } catch (RuntimeException e) {
            System.out.println("บันทึกไม่สำเร็จ: " + e.getMessage());
        }
    }

    static void save(String title) {
        try {
            writeToDisk(title);
        } catch (java.io.IOException e) {
            throw new RuntimeException();
        }
    }

    static void writeToDisk(String title) throws java.io.IOException {
        throw new java.io.IOException("disk full while writing " + title);
    }
}`,
  bugExplanation: "พิมพ์ บันทึกไม่สำเร็จ: null เพราะเมื่อแปลง IOException เป็น RuntimeException ไม่ได้ส่งทั้งข้อความและ cause ต่อ สาเหตุจริง (disk full) หายไปทั้งจากข้อความและ stack trace compile ผ่านเป็น logic bug แก้เป็น throw new LibraryDataException(\"บันทึก \" + title + \" ไม่สำเร็จ\", e) (หรืออย่างน้อย new RuntimeException(e.getMessage(), e))",
  vocabulary: [v("checked exception", "ต้องจับหรือประกาศ throws ตั้งแต่ตอน compile"), v("unchecked exception", "RuntimeException ไม่บังคับให้จัดการ"), v("domain exception", "exception ที่ชื่อบอกปัญหาของโดเมน"), v("cause", "exception ต้นเหตุที่ห่อไว้ใน exception ใหม่"), v("try-with-resources", "try (...) ที่ปิด resource ให้อัตโนมัติ"), v("AutoCloseable", "interface ของสิ่งที่ปิดได้ด้วย try-with-resources")],
},
{
  id: "oop-refactor-main",
  courseId,
  unit: "Collections และ exceptions",
  title: "refactor God main ทีละขั้น โดยพฤติกรรมเดิมไม่เปลี่ยน (golden master)",
  objective: "ระบุ code smell ใน main ที่ทำทุกอย่าง (ยาว, if ซ้อน, logic ปนกับ I/O, ตัวแปร state กระจาย) บันทึกพฤติกรรมเดิมเป็น golden master (ไฟล์ input + output) ก่อนแตะโค้ด แล้วแยกเป็น class ทีละขั้นโดยรันเทียบหลังทุกขั้น",
  why: "โค้ดที่ใช้งานจริงมักโตมาเป็น main ก้อนเดียว การเขียนใหม่ทั้งหมดเสี่ยงทำพฤติกรรมเล็ก ๆ หาย (เช่นการตัดช่องว่าง, ข้อความกรณีผิด) การ refactor ที่มี golden master ทำให้รู้ทันทีเมื่อพฤติกรรมเปลี่ยนแม้แค่ตัวอักษรเดียว",
  explanation: "refactor คือการเปลี่ยนโครงสร้างโดยพฤติกรรมภายนอกเหมือนเดิมทุกประการ ขั้นตอน: (1) เขียน test-input.txt ที่ครอบคลุมทุกเส้นทาง แล้วรันโปรแกรมเดิมเก็บผลเป็น expected-output.txt (golden master) — ถ้าเจอพฤติกรรมแปลก ๆ ให้เก็บไว้ตามเดิมก่อน การแก้บั๊กเป็นอีกงานหนึ่ง (2) แยกทีละชิ้นเล็ก: ย้าย state และกติกาไปอยู่ใน class โดเมน (ReadingLog), แยกการแปลงคำสั่ง (CommandHandler), ให้ main เหลือแค่อ่าน/พิมพ์ (3) หลังทุกขั้น compile และรันเทียบด้วย diff ถ้าต่างให้ย้อนขั้นล่าสุด code smell ที่พบบ่อย: method ยาว, if/else ตามชื่อคำสั่งที่ parse ซ้ำทุกกิ่ง, ตัวแปรหลายตัวที่ต้องแก้พร้อมกัน, ตัวเลขเวทมนตร์ และ logic ที่ปนกับ System.out จนทดสอบไม่ได้",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-exceptions", "oop-project-library-2"],
  example: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    static List<String> legacy(List<String> input) {
        List<String> out = new ArrayList<>();
        int total = 0;
        for (String line : input) {
            if (line.startsWith("read ")) {
                int pages = Integer.parseInt(line.substring(line.lastIndexOf(' ') + 1));
                total = total + pages;
                out.add("logged " + pages);
            } else if (line.equals("total")) {
                out.add("total " + total);
            } else {
                out.add("?");
            }
        }
        return out;
    }

    static List<String> refactored(List<String> input) {
        ReadingLog log = new ReadingLog();
        List<String> out = new ArrayList<>();
        for (String line : input) {
            out.add(log.handle(line));
        }
        return out;
    }

    public static void main(String[] args) {
        List<String> input = List.of("read Clean Code 120", "read Java 21 80", "total", "skip");
        List<String> expected = legacy(input);
        List<String> actual = refactored(input);
        System.out.println(expected);
        System.out.println("same output: " + expected.equals(actual));
    }
}

class ReadingLog {
    private int totalPages;

    String handle(String line) {
        if (line.startsWith("read ")) {
            return "logged " + add(line.substring(line.lastIndexOf(' ') + 1));
        }
        return line.equals("total") ? "total " + totalPages : "?";
    }

    private int add(String pagesText) {
        int pages = Integer.parseInt(pagesText);
        totalPages += pages;
        return pages;
    }
}`,
  expectedOutput: "[logged 120, logged 80, total 200, ?]\nsame output: true",
  tracePrompt: "ระหว่าง refactor ซีเห็นว่าโปรแกรมเดิมตอบ ? กับคำสั่ง TOTAL (ตัวพิมพ์ใหญ่) และอยากแก้ให้รับได้ ควรแก้ในขั้นไหน และทำไมไม่ควรแก้ไปพร้อมกับการย้ายโค้ด",
  traceAnswer: "แก้หลัง refactor เสร็จและ golden master ผ่านแล้ว เป็นการเปลี่ยนพฤติกรรมที่ตั้งใจ (อัปเดต expected-output พร้อมกัน) ถ้าแก้ระหว่างย้ายโค้ด เมื่อผลต่างจาก golden master จะแยกไม่ออกว่าความต่างมาจากการแก้ที่ตั้งใจหรือจากความผิดพลาดตอนย้าย",
  practicePrompt: "starter คือโปรแกรมติดตามการอ่านแบบ God main ที่ทำงานถูกแล้ว (คำสั่ง read <title> <pages>, goal <pages>, total, top, quit) ให้ (1) รัน starter กับ test-input.txt ในเฉลยแล้วเก็บผลเป็น golden master (2) refactor เป็นอย่างน้อยสาม class: ReadingLog (state และกติกา ไม่มี System.out), CommandHandler (แปลงบรรทัดเป็นการเรียก ReadingLog และคืนข้อความ), Main (อ่าน/พิมพ์เท่านั้น) (3) รันเทียบ golden master หลังทุกขั้นจนผลตรงทุกบรรทัด ห้ามเปลี่ยนข้อความใด ๆ แม้จะดูแปลก",
  starter: java`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        java.util.ArrayList<String> titles = new java.util.ArrayList<>();
        java.util.ArrayList<Integer> pages = new java.util.ArrayList<>();
        int goal = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.equals("quit")) {
                System.out.println("bye");
                break;
            } else if (line.startsWith("read ")) {
                String rest = line.substring(5).trim();
                int space = rest.lastIndexOf(' ');
                if (space < 0) {
                    System.out.println("usage: read <title> <pages>");
                    continue;
                }
                int p;
                try {
                    p = Integer.parseInt(rest.substring(space + 1));
                } catch (NumberFormatException e) {
                    System.out.println("usage: read <title> <pages>");
                    continue;
                }
                if (p <= 0) {
                    System.out.println("pages must be positive");
                    continue;
                }
                titles.add(rest.substring(0, space).trim());
                pages.add(p);
                System.out.println("logged " + p + " pages of " + rest.substring(0, space).trim());
            } else if (line.startsWith("goal ")) {
                try {
                    goal = Integer.parseInt(line.substring(5).trim());
                    System.out.println("goal " + goal + " pages");
                } catch (NumberFormatException e) {
                    System.out.println("usage: goal <pages>");
                }
            } else if (line.equals("total")) {
                int t = 0;
                for (int x : pages) {
                    t += x;
                }
                if (goal > 0) {
                    System.out.println("total " + t + "/" + goal + " pages (" + (t * 100 / goal) + "%)");
                } else {
                    System.out.println("total " + t + " pages");
                }
            } else if (line.equals("top")) {
                if (titles.isEmpty()) {
                    System.out.println("nothing read");
                } else {
                    int best = 0;
                    for (int i = 1; i < pages.size(); i++) {
                        if (pages.get(i) > pages.get(best)) {
                            best = i;
                        }
                    }
                    System.out.println("top: " + titles.get(best) + " (" + pages.get(best) + ")");
                }
            } else if (!line.isEmpty()) {
                System.out.println("unknown: " + line);
            }
        }
    }
}`,
  solution: java`// File: ReadingLog.java
import java.util.ArrayList;
import java.util.List;

// State and rules only: no input, no printing.
class ReadingLog {
    private record Entry(String title, int pages) {
    }

    private final List<Entry> entries = new ArrayList<>();
    private int goal;

    void read(String title, int pages) {
        if (pages <= 0) {
            throw new IllegalArgumentException("pages must be positive");
        }
        entries.add(new Entry(title, pages));
    }

    void setGoal(int goal) {
        this.goal = goal;
    }

    int goal() {
        return goal;
    }

    int totalPages() {
        int total = 0;
        for (Entry entry : entries) {
            total += entry.pages();
        }
        return total;
    }

    // First entry wins a tie, as in the original program.
    String top() {
        if (entries.isEmpty()) {
            return null;
        }
        Entry best = entries.get(0);
        for (Entry entry : entries) {
            if (entry.pages() > best.pages()) {
                best = entry;
            }
        }
        return best.title() + " (" + best.pages() + ")";
    }
}
// File: CommandHandler.java
class CommandHandler {
    private final ReadingLog log = new ReadingLog();

    // Returns the reply, or null when the line produces no output.
    String handle(String line) {
        if (line.startsWith("read ")) {
            return read(line.substring(5).trim());
        }
        if (line.startsWith("goal ")) {
            return goal(line.substring(5).trim());
        }
        if (line.equals("total")) {
            return total();
        }
        if (line.equals("top")) {
            String top = log.top();
            return top == null ? "nothing read" : "top: " + top;
        }
        return line.isEmpty() ? null : "unknown: " + line;
    }

    private String read(String rest) {
        int space = rest.lastIndexOf(' ');
        if (space < 0) {
            return "usage: read <title> <pages>";
        }
        int pages;
        try {
            pages = Integer.parseInt(rest.substring(space + 1));
        } catch (NumberFormatException e) {
            return "usage: read <title> <pages>";
        }
        String title = rest.substring(0, space).trim();
        try {
            log.read(title, pages);
        } catch (IllegalArgumentException e) {
            return e.getMessage();
        }
        return "logged " + pages + " pages of " + title;
    }

    private String goal(String text) {
        try {
            log.setGoal(Integer.parseInt(text));
            return "goal " + log.goal() + " pages";
        } catch (NumberFormatException e) {
            return "usage: goal <pages>";
        }
    }

    private String total() {
        int total = log.totalPages();
        if (log.goal() > 0) {
            return "total " + total + "/" + log.goal() + " pages (" + (total * 100 / log.goal()) + "%)";
        }
        return "total " + total + " pages";
    }
}
// File: Main.java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        CommandHandler handler = new CommandHandler();
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.equals("quit")) {
                System.out.println("bye");
                break;
            }
            String reply = handler.handle(line);
            if (reply != null) {
                System.out.println(reply);
            }
        }
    }
}
// File: test-input.txt
total
top
read Clean Code 120
read Java 21 x
read nopages
read Refactoring 0
read Java 21 120
read Effective Java 300
top
total
goal 1000
goal many
total

dance
quit
total
// File: expected-output.txt
total 0 pages
nothing read
logged 120 pages of Clean Code
usage: read <title> <pages>
usage: read <title> <pages>
pages must be positive
logged 120 pages of Java 21
logged 300 pages of Effective Java
top: Effective Java (300)
total 540 pages
goal 1000 pages
usage: goal <pages>
total 540/1000 pages (54%)
unknown: dance
bye
`,
  bugCheck: { kind: "logic", output: "top: Java 21 (120)" },
  buggy: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    record Entry(String title, int pages) {
    }

    public static void main(String[] args) {
        List<Entry> entries = new ArrayList<>(List.of(new Entry("Clean Code", 120), new Entry("Java 21", 120)));
        Entry best = entries.get(0);
        for (Entry entry : entries) {
            if (entry.pages() >= best.pages()) {
                best = entry;
            }
        }
        System.out.println("top: " + best.title() + " (" + best.pages() + ")");
    }
}`,
  bugExplanation: "พิมพ์ top: Java 21 (120) แต่โปรแกรมเดิมตอบ Clean Code เมื่อจำนวนหน้าเท่ากัน (ตัวที่มาก่อนชนะ) เพราะระหว่าง refactor เปลี่ยน > เป็น >= โดยไม่ตั้งใจ compile ผ่านและดูถูกต้อง แต่ golden master จับได้ทันทีเพราะ test-input มีกรณีจำนวนหน้าเท่ากัน — แก้กลับเป็น > ให้ตรงพฤติกรรมเดิม",
  vocabulary: [v("refactoring", "เปลี่ยนโครงสร้างโดยพฤติกรรมภายนอกเท่าเดิม"), v("golden master", "ผลลัพธ์ของโปรแกรมเดิมที่ใช้เทียบหลังแก้"), v("code smell", "ลักษณะของโค้ดที่บอกว่าน่าจะออกแบบใหม่"), v("God main", "main ที่รวมทุกหน้าที่ไว้ก้อนเดียว"), v("small steps", "แก้ทีละขั้นเล็กแล้วตรวจทุกครั้ง"), v("characterization test", "test ที่บันทึกพฤติกรรมปัจจุบันไว้ก่อนแก้")],
},
{
  id: "oop-junit",
  courseId,
  unit: "Testing",
  title: "JUnit: เขียน unit test ให้กติกาของ object",
  objective: "เขียน test ด้วย JUnit Jupiter (@Test, assertEquals, assertTrue/False, assertThrows, @BeforeEach) ตั้งชื่อ test ให้บอกพฤติกรรม ใช้รูปแบบ arrange–act–assert compile และรันด้วย JUnit console launcher (junit-platform-console-standalone) และพิสูจน์ว่า test จับบั๊กได้จริง",
  why: "golden master ตรวจทั้งโปรแกรมผ่านข้อความ แต่เมื่อกติกาของ Library ซับซ้อนขึ้น การรู้ว่ากติกาไหนพังต้องมี test ที่ชี้ตรงจุด JUnit เป็นเครื่องมือมาตรฐานของ Java และเป็นสิ่งที่ทีมจริงคาดหวัง",
  explanation: "test class ทั่วไป (ไม่ต้อง public) มี method ที่มี @Test ซึ่งรันแยกกันบน object ของ test class ตัวใหม่ทุกครั้ง @BeforeEach เตรียม object ใหม่ก่อนทุก test จึงไม่มี state ค้างข้าม test assertEquals(expected, actual) — ค่าที่คาดอยู่ก่อน, assertThrows(IllegalStateException.class, () -> code) คืน exception ให้ตรวจข้อความต่อ, assertTrue/assertFalse สำหรับ boolean ตั้งชื่อ method เป็นประโยคพฤติกรรม เช่น borrowingSecondCopyFailsWhenBorrowed หรือใช้ @DisplayName รูปแบบ arrange (เตรียม) – act (ทำหนึ่งอย่าง) – assert (ตรวจผล) รันโดยไม่ต้องมี build tool: ดาวน์โหลด junit-platform-console-standalone (บทเรียนนี้ตรวจกับ 6.1.3 ซึ่งต้องใช้ Java 17 ขึ้นไป; API org.junit.jupiter.api เดียวกับ JUnit 5) แล้ว javac -cp junit-platform-console-standalone-6.1.3.jar -d out *.java และ java -jar junit-platform-console-standalone-6.1.3.jar execute --class-path out --scan-class-path ทีมจริงมักใช้ Maven/Gradle ซึ่งทำสองขั้นนี้ให้ พิสูจน์ว่า test มีค่า: แก้โค้ดให้ผิดชั่วคราวแล้วดูว่า test ล้ม",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-refactor-main"],
  example: java`// File: FineCalculator.java
class FineCalculator {
    static final int PER_DAY = 5;
    static final int MAX = 100;

    int fineFor(int lateDays) {
        if (lateDays < 0) {
            throw new IllegalArgumentException("lateDays ต้องไม่ติดลบ: " + lateDays);
        }
        return Math.min(lateDays * PER_DAY, MAX);
    }
}
// File: FineCalculatorTest.java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FineCalculatorTest {
    private FineCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new FineCalculator();
    }

    @Test
    void noFineWhenReturnedOnTime() {
        assertEquals(0, calculator.fineFor(0));
    }

    @Test
    void chargesFiveBahtPerLateDay() {
        assertEquals(15, calculator.fineFor(3));
    }

    @Test
    void fineIsCappedAtOneHundred() {
        assertEquals(100, calculator.fineFor(40));
    }

    @Test
    void negativeLateDaysAreRejected() {
        IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () -> calculator.fineFor(-1));
        assertEquals("lateDays ต้องไม่ติดลบ: -1", error.getMessage());
    }
}`,
  tracePrompt: "ถ้ามีคนแก้ fineFor เป็น return lateDays * PER_DAY; (ลืมเพดาน) test ไหนจะล้ม และ JUnit จะรายงานค่า expected/actual เป็นอะไร",
  traceAnswer: "fineIsCappedAtOneHundred ล้ม รายงาน expected: <100> but was: <200> ส่วน test อื่นยังผ่าน (0, 15 และกรณีติดลบไม่ได้แตะเพดาน) การตั้งชื่อ test ตามพฤติกรรมจึงบอกได้ทันทีว่ากติกาไหนพัง",
  practicePrompt: "starter มี class Library แบบย่อจาก M2 (addBook, addMember, setDay, borrow, giveBack, loansCount) ที่ทำงานถูกแล้ว เขียน LibraryTest ให้มีอย่างน้อย 6 test ที่ผ่านทั้งหมด: ยืมสำเร็จได้วันครบกำหนดวันที่ 15 เมื่อยืมวันที่ 1, ยืมเล่มที่ถูกยืมอยู่ throw IllegalStateException ข้อความ already borrowed, ยืมเกิน 2 เล่ม throw loan limit reached, คืนช้า 5 วันได้ค่าปรับ 25, ย้อนวันไม่ได้ (IllegalArgumentException day cannot go back), หนังสือที่ไม่มี throw no such book ใช้ @BeforeEach สร้าง Library ใหม่ จากนั้นลองแก้ MAX_LOANS ใน Library เป็น 3 ชั่วคราวเพื่อดูว่า test โควตาล้ม",
  starter: java`// File: Library.java
import java.util.HashMap;
import java.util.Map;

class Library {
    static final int MAX_LOANS = 2;
    private final Map<Integer, Integer> dueDayByBook = new HashMap<>();
    private final Map<Integer, Integer> borrowerByBook = new HashMap<>();
    private final Map<Integer, Integer> loansByMember = new HashMap<>();
    private int nextBookId = 1;
    private int nextMemberId = 1;
    private int today = 1;

    int addBook() {
        dueDayByBook.put(nextBookId, null);
        return nextBookId++;
    }

    int addMember() {
        loansByMember.put(nextMemberId, 0);
        return nextMemberId++;
    }

    void setDay(int day) {
        if (day < today) {
            throw new IllegalArgumentException("day cannot go back");
        }
        today = day;
    }

    int borrow(int bookId, int memberId) {
        if (!dueDayByBook.containsKey(bookId)) {
            throw new IllegalArgumentException("no such book");
        }
        if (!loansByMember.containsKey(memberId)) {
            throw new IllegalArgumentException("no such member");
        }
        if (dueDayByBook.get(bookId) != null) {
            throw new IllegalStateException("already borrowed");
        }
        if (loansByMember.get(memberId) >= MAX_LOANS) {
            throw new IllegalStateException("loan limit reached");
        }
        int due = today + 14;
        dueDayByBook.put(bookId, due);
        borrowerByBook.put(bookId, memberId);
        loansByMember.merge(memberId, 1, Integer::sum);
        return due;
    }

    int giveBack(int bookId) {
        Integer due = dueDayByBook.get(bookId);
        if (due == null) {
            throw new IllegalStateException("not borrowed");
        }
        dueDayByBook.put(bookId, null);
        loansByMember.merge(borrowerByBook.remove(bookId), -1, Integer::sum);
        return Math.min(Math.max(0, today - due) * 5, 100);
    }

    int loansCount(int memberId) {
        return loansByMember.get(memberId);
    }
}
// File: LibraryTest.java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LibraryTest {
    private Library library;

    @BeforeEach
    void setUp() {
        library = new Library();
    }

    // เขียน test อย่างน้อย 6 ตัว
}`,
  solution: java`// File: Library.java
import java.util.HashMap;
import java.util.Map;

class Library {
    static final int MAX_LOANS = 2;
    private final Map<Integer, Integer> dueDayByBook = new HashMap<>();
    private final Map<Integer, Integer> borrowerByBook = new HashMap<>();
    private final Map<Integer, Integer> loansByMember = new HashMap<>();
    private int nextBookId = 1;
    private int nextMemberId = 1;
    private int today = 1;

    int addBook() {
        dueDayByBook.put(nextBookId, null);
        return nextBookId++;
    }

    int addMember() {
        loansByMember.put(nextMemberId, 0);
        return nextMemberId++;
    }

    void setDay(int day) {
        if (day < today) {
            throw new IllegalArgumentException("day cannot go back");
        }
        today = day;
    }

    int borrow(int bookId, int memberId) {
        if (!dueDayByBook.containsKey(bookId)) {
            throw new IllegalArgumentException("no such book");
        }
        if (!loansByMember.containsKey(memberId)) {
            throw new IllegalArgumentException("no such member");
        }
        if (dueDayByBook.get(bookId) != null) {
            throw new IllegalStateException("already borrowed");
        }
        if (loansByMember.get(memberId) >= MAX_LOANS) {
            throw new IllegalStateException("loan limit reached");
        }
        int due = today + 14;
        dueDayByBook.put(bookId, due);
        borrowerByBook.put(bookId, memberId);
        loansByMember.merge(memberId, 1, Integer::sum);
        return due;
    }

    int giveBack(int bookId) {
        Integer due = dueDayByBook.get(bookId);
        if (due == null) {
            throw new IllegalStateException("not borrowed");
        }
        dueDayByBook.put(bookId, null);
        loansByMember.merge(borrowerByBook.remove(bookId), -1, Integer::sum);
        return Math.min(Math.max(0, today - due) * 5, 100);
    }

    int loansCount(int memberId) {
        return loansByMember.get(memberId);
    }
}
// File: LibraryTest.java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LibraryTest {
    private Library library;
    private int book;
    private int member;

    @BeforeEach
    void setUp() {
        library = new Library();
        book = library.addBook();
        member = library.addMember();
    }

    @Test
    void borrowingOnDayOneIsDueOnDayFifteen() {
        assertEquals(15, library.borrow(book, member));
        assertEquals(1, library.loansCount(member));
    }

    @Test
    void borrowedBookCannotBeBorrowedAgain() {
        library.borrow(book, member);
        int other = library.addMember();
        IllegalStateException error = assertThrows(IllegalStateException.class, () -> library.borrow(book, other));
        assertEquals("already borrowed", error.getMessage());
    }

    @Test
    void memberCannotBorrowMoreThanTwoBooks() {
        library.borrow(book, member);
        library.borrow(library.addBook(), member);
        int third = library.addBook();
        IllegalStateException error = assertThrows(IllegalStateException.class, () -> library.borrow(third, member));
        assertEquals("loan limit reached", error.getMessage());
        assertEquals(2, library.loansCount(member));
    }

    @Test
    void returningFiveDaysLateCostsTwentyFive() {
        library.borrow(book, member);
        library.setDay(20);
        assertEquals(25, library.giveBack(book));
        assertEquals(0, library.loansCount(member));
    }

    @Test
    void dayCannotGoBack() {
        library.setDay(10);
        IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () -> library.setDay(5));
        assertEquals("day cannot go back", error.getMessage());
    }

    @Test
    void unknownBookIsRejected() {
        IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () -> library.borrow(99, member));
        assertEquals("no such book", error.getMessage());
    }
}`,
  solutionCheck: { junitTests: 6 },
  bugCheck: { kind: "compile", message: "cannot find symbol" },
  buggy: java`// File: Calculator.java
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}
// File: CalculatorTest.java
import org.junit.jupiter.api.Test;

class CalculatorTest {
    @Test
    void addsTwoNumbers() {
        assertEquals(5, new Calculator().add(2, 3));
    }
}`,
  bugExplanation: "compile error: “cannot find symbol: method assertEquals(int,int)” เพราะ assertEquals เป็น static method ของ org.junit.jupiter.api.Assertions ต้อง import static org.junit.jupiter.api.Assertions.assertEquals; (หรือเรียก Assertions.assertEquals พร้อม import class) — @Test อย่างเดียวไม่ได้นำ assertion มาให้",
  vocabulary: [v("unit test", "test ที่ตรวจพฤติกรรมของหน่วยเล็ก เช่น class เดียว"), v("@Test", "ทำเครื่องหมาย method ที่เป็น test"), v("@BeforeEach", "method ที่รันก่อนทุก test"), v("assertEquals(expected, actual)", "ตรวจว่าค่าจริงเท่ากับที่คาด"), v("assertThrows", "ตรวจว่าโค้ดโยน exception ชนิดที่คาด"), v("arrange–act–assert", "เตรียม – ทำหนึ่งอย่าง – ตรวจผล")],
},
{
  id: "oop-project-library-3",
  courseId,
  unit: "Project: Library Management CLI",
  title: "★ Library CLI M3 (capstone): บันทึก/โหลดไฟล์ และ test ด้วย JUnit",
  objective: "ต่อยอด M2 ให้บันทึกและโหลดข้อมูลทั้งหมด (วัน, หนังสือ, สมาชิก, การยืม) เป็นไฟล์ข้อความด้วย java.nio.file รายงานไฟล์เสียพร้อมเลขบรรทัด และมี JUnit test ที่ใช้ @TempDir ครอบคลุมการบันทึก/โหลด กรณีผิด และคำสั่ง save/load ของ CLI โดย golden master ของ M2 ยังผ่าน",
  why: "ระบบที่ปิดแล้วข้อมูลหายใช้งานจริงไม่ได้ การอ่านไฟล์ที่ผู้ใช้หรือโปรแกรมอื่นแก้ได้ต้องรับมือกับข้อมูลเสียอย่างชัดเจน และ capstone นี้รวมทุกอย่างของคอร์ส: object ที่รักษากติกา, exception ของโดเมน, collection, refactor อย่างปลอดภัย และ test",
  explanation: "รูปแบบไฟล์ (UTF-8 บรรทัดละหนึ่งรายการ คั่นด้วย tab): day<TAB><n> / book<TAB><id><TAB><title> / member<TAB><id><TAB><name> / loan<TAB><bookId><TAB><memberId><TAB><dueDay> ชื่อหนังสือและสมาชิกห้ามมี tab (ตรวจใน constructor) การออกแบบ: Library.snapshot() คืน List<String> ของบรรทัด (Library ไม่รู้จักไฟล์) และ Library.restore(List<String>) สร้าง Library ใหม่จากบรรทัด โดยใช้กติกาเดิมของ Book/Member/Loan และหลังโหลด id ถัดไปต้องต่อจากค่ามากที่สุด บรรทัดที่ผิดรูปแบบหรืออ้างถึงสิ่งที่ไม่มีให้ throw LibraryDataException (unchecked) ข้อความ line <n>: <เหตุผล> LibraryStore เป็นส่วนเดียวที่แตะไฟล์: save ด้วย Files.write, load ด้วย Files.readAllLines (ไฟล์ไม่มีอยู่ = ห้องสมุดว่าง) ทั้งคู่ประกาศ throws IOException (checked) CLI เพิ่ม save <path> → saved to <path> และ load <path> → loaded from <path> หรือ cannot load: <ข้อความ> โดยคำสั่งเดิมของ M2 ตอบเหมือนเดิมทุกตัวอักษร (golden master เดิมต้องผ่าน) test ใช้ @TempDir Path dir ที่ JUnit สร้างและลบให้ จึงไม่เขียนไฟล์ทิ้งไว้ในเครื่อง",
  language: "java",
  standard: "v3",
  prerequisites: ["oop-junit", "oop-project-library-2", "oop-exceptions"],
  example: java`// File: NotesStoreTest.java
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class NotesStoreTest {
    @TempDir
    Path dir;

    @Test
    void writesAndReadsLinesAsUtf8() throws IOException {
        Path file = dir.resolve("notes.txt");
        Files.write(file, List.of("book\t1\tClean Code", "member\t1\tซี"), StandardCharsets.UTF_8);
        List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);
        assertEquals("ซี", lines.get(1).split("\t")[2]);
        assertEquals(2, lines.size());
    }

    @Test
    void missingFileIsDetectedBeforeReading() {
        assertEquals(false, Files.exists(dir.resolve("missing.txt")));
    }
}`,
  tracePrompt: "ทำไม Library.snapshot() คืน List<String> แทนการเขียนไฟล์เอง และถ้าวันหนึ่งต้องบันทึกลงฐานข้อมูลแทนไฟล์ ต้องแก้ class ไหน",
  traceAnswer: "เพื่อให้ Library ไม่ผูกกับไฟล์: test ตรวจ snapshot/restore ได้โดยไม่แตะดิสก์ และกติกาการตีความข้อมูลอยู่ที่เดียว ถ้าย้ายไปฐานข้อมูล แก้หรือเพิ่มแค่ส่วนที่เทียบเท่า LibraryStore (เช่น DatabaseStore) ส่วน Library, Book, Member, Loan ไม่ต้องเปลี่ยน",
  practicePrompt: "สร้าง Library CLI M3 ตามข้อกำหนดในคำอธิบาย: เริ่มจากโค้ด M2 ที่ golden master ผ่าน, เพิ่ม snapshot/restore ใน Library, LibraryDataException, LibraryStore และคำสั่ง save/load ใน Main แล้วเขียน JUnit test อย่างน้อย 7 ตัว: บันทึกแล้วโหลดได้ครบ (วัน, หนังสือ, สมาชิก, การยืม), id ต่อจากเดิมหลังโหลด, ไฟล์ไม่มีอยู่ได้ห้องสมุดว่าง, บรรทัดเสียแจ้งเลขบรรทัด, การยืมที่อ้างหนังสือที่ไม่มีถูกปฏิเสธ, ชื่อที่มี tab ถูกปฏิเสธ และคำสั่ง save/load ของ CLI ทำงานกับไฟล์ใน @TempDir สุดท้ายรัน golden master ของ M2 ซ้ำให้ผ่าน",
  starter: java`// File: library/LibraryDataException.java
package library;

public class LibraryDataException extends RuntimeException {
    LibraryDataException(String message) {
        super(message);
    }
}
// File: library/LibraryStore.java
package library;

public class LibraryStore {
    // static void save(Library library, Path file) throws IOException
    // static Library load(Path file) throws IOException
}
// คัดลอก Book, Member, Loan, Library และ Main จาก M2 มาไว้ใน package เดียวกัน
// แล้วเพิ่ม snapshot/restore และคำสั่ง save/load`,
  solution: java`// File: library/Loan.java
package library;

public class Loan {
    private final Book book;
    private final Member member;
    private final int dueDay;

    Loan(Book book, Member member, int dueDay) {
        this.book = book;
        this.member = member;
        this.dueDay = dueDay;
    }

    Book book() {
        return book;
    }

    Member member() {
        return member;
    }

    int dueDay() {
        return dueDay;
    }

    int lateDays(int today) {
        return Math.max(0, today - dueDay);
    }
}
// File: library/Book.java
package library;

public class Book {
    private final int id;
    private final String title;
    private Loan currentLoan;

    Book(int id, String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title required");
        }
        if (title.contains("\t") || title.contains("\n")) {
            throw new IllegalArgumentException("title cannot contain tabs");
        }
        this.id = id;
        this.title = title.strip();
    }

    int id() {
        return id;
    }

    String title() {
        return title;
    }

    boolean isAvailable() {
        return currentLoan == null;
    }

    Loan currentLoan() {
        return currentLoan;
    }

    void attach(Loan loan) {
        if (!isAvailable()) {
            throw new IllegalStateException("already borrowed");
        }
        currentLoan = loan;
    }

    void detach() {
        if (isAvailable()) {
            throw new IllegalStateException("not borrowed");
        }
        currentLoan = null;
    }

    @Override
    public String toString() {
        return "#" + id + " " + title + (isAvailable() ? " [available]" : " [borrowed by " + currentLoan.member() + "]");
    }
}
// File: library/Member.java
package library;

import java.util.ArrayList;
import java.util.List;

public class Member {
    static final int MAX_LOANS = 2;
    private final int id;
    private final String name;
    private final ArrayList<Loan> loans = new ArrayList<>();

    Member(int id, String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name required");
        }
        if (name.contains("\t") || name.contains("\n")) {
            throw new IllegalArgumentException("name cannot contain tabs");
        }
        this.id = id;
        this.name = name.strip();
    }

    int id() {
        return id;
    }

    String name() {
        return name;
    }

    boolean canBorrow() {
        return loans.size() < MAX_LOANS;
    }

    void addLoan(Loan loan) {
        if (!canBorrow()) {
            throw new IllegalStateException("loan limit reached");
        }
        loans.add(loan);
    }

    void removeLoan(Loan loan) {
        loans.remove(loan);
    }

    List<Loan> loans() {
        return List.copyOf(loans);
    }

    @Override
    public String toString() {
        return "#" + id + " " + name;
    }
}
// File: library/Library.java
package library;

import java.util.ArrayList;
import java.util.List;

public class Library {
    static final int LOAN_DAYS = 14;
    static final int FINE_PER_DAY = 5;
    static final int MAX_FINE = 100;

    private final ArrayList<Book> books = new ArrayList<>();
    private final ArrayList<Member> members = new ArrayList<>();
    private int nextBookId = 1;
    private int nextMemberId = 1;
    private int today = 1;

    Book addBook(String title) {
        Book book = new Book(nextBookId, title);
        nextBookId++;
        books.add(book);
        return book;
    }

    Member addMember(String name) {
        Member member = new Member(nextMemberId, name);
        nextMemberId++;
        members.add(member);
        return member;
    }

    void setDay(int day) {
        if (day < today) {
            throw new IllegalArgumentException("day cannot go back");
        }
        today = day;
    }

    Loan borrow(int bookId, int memberId) {
        Book book = findBook(bookId);
        Member member = findMember(memberId);
        if (!book.isAvailable()) {
            throw new IllegalStateException("already borrowed");
        }
        if (!member.canBorrow()) {
            throw new IllegalStateException("loan limit reached");
        }
        Loan loan = new Loan(book, member, today + LOAN_DAYS);
        book.attach(loan);
        member.addLoan(loan);
        return loan;
    }

    // Returns the fine in baht.
    int giveBack(int bookId) {
        Book book = findBook(bookId);
        if (book.isAvailable()) {
            throw new IllegalStateException("not borrowed");
        }
        Loan loan = book.currentLoan();
        book.detach();
        loan.member().removeLoan(loan);
        return Math.min(loan.lateDays(today) * FINE_PER_DAY, MAX_FINE);
    }

    int lateDays(int bookId) {
        Book book = findBook(bookId);
        return book.isAvailable() ? 0 : book.currentLoan().lateDays(today);
    }

    String loansOf(int memberId) {
        Member member = findMember(memberId);
        ArrayList<String> lines = new ArrayList<>();
        for (Loan loan : member.loans()) {
            lines.add("#" + loan.book().id() + " " + loan.book().title() + " due day " + loan.dueDay());
        }
        return lines.isEmpty() ? "(no loans)" : String.join("\n", lines);
    }

    String listBooks() {
        ArrayList<String> lines = new ArrayList<>();
        for (Book book : books) {
            lines.add(book.toString());
        }
        return lines.isEmpty() ? "(no books)" : String.join("\n", lines);
    }

    // One line per record, tab-separated: day, book, member, loan. Library itself never touches files.
    List<String> snapshot() {
        List<String> lines = new ArrayList<>();
        lines.add("day\t" + today);
        for (Book book : books) {
            lines.add("book\t" + book.id() + "\t" + book.title());
        }
        for (Member member : members) {
            lines.add("member\t" + member.id() + "\t" + member.name());
        }
        for (Book book : books) {
            if (!book.isAvailable()) {
                Loan loan = book.currentLoan();
                lines.add("loan\t" + book.id() + "\t" + loan.member().id() + "\t" + loan.dueDay());
            }
        }
        return lines;
    }

    static Library restore(List<String> lines) {
        Library library = new Library();
        for (int i = 0; i < lines.size(); i++) {
            try {
                library.restoreLine(lines.get(i));
            } catch (RuntimeException e) {
                throw new LibraryDataException("line " + (i + 1) + ": " + e.getMessage(), e);
            }
        }
        return library;
    }

    // Rebuilds through the same constructors and rules as normal use, so a corrupt file cannot create an invalid library.
    private void restoreLine(String line) {
        if (line.isBlank()) {
            return;
        }
        String[] fields = line.split("\t", -1);
        switch (fields[0]) {
            case "day" -> {
                expectFields(fields, 2);
                today = Integer.parseInt(fields[1]);
            }
            case "book" -> {
                expectFields(fields, 3);
                int id = Integer.parseInt(fields[1]);
                if (hasBook(id)) {
                    throw new IllegalArgumentException("duplicate book #" + id);
                }
                books.add(new Book(id, fields[2]));
                nextBookId = Math.max(nextBookId, id + 1);
            }
            case "member" -> {
                expectFields(fields, 3);
                int id = Integer.parseInt(fields[1]);
                members.add(new Member(id, fields[2]));
                nextMemberId = Math.max(nextMemberId, id + 1);
            }
            case "loan" -> {
                expectFields(fields, 4);
                Book book = findBook(Integer.parseInt(fields[1]));
                Member member = findMember(Integer.parseInt(fields[2]));
                Loan loan = new Loan(book, member, Integer.parseInt(fields[3]));
                book.attach(loan);
                member.addLoan(loan);
            }
            default -> throw new IllegalArgumentException("unknown record " + fields[0]);
        }
    }

    private static void expectFields(String[] fields, int count) {
        if (fields.length != count) {
            throw new IllegalArgumentException(fields[0] + " needs " + count + " fields");
        }
    }

    private boolean hasBook(int id) {
        for (Book book : books) {
            if (book.id() == id) {
                return true;
            }
        }
        return false;
    }

    private Book findBook(int id) {
        for (Book book : books) {
            if (book.id() == id) {
                return book;
            }
        }
        throw new IllegalArgumentException("no such book");
    }

    private Member findMember(int id) {
        for (Member member : members) {
            if (member.id() == id) {
                return member;
            }
        }
        throw new IllegalArgumentException("no such member");
    }
}
// File: library/LibraryDataException.java
package library;

public class LibraryDataException extends RuntimeException {
    LibraryDataException(String message, Throwable cause) {
        super(message, cause);
    }
}
// File: library/LibraryStore.java
package library;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

// The only class that touches the file system.
public final class LibraryStore {
    private LibraryStore() {
    }

    static void save(Library library, Path file) throws IOException {
        Files.write(file, library.snapshot(), StandardCharsets.UTF_8);
    }

    static Library load(Path file) throws IOException {
        if (!Files.exists(file)) {
            return new Library();
        }
        return Library.restore(Files.readAllLines(file, StandardCharsets.UTF_8));
    }
}
// File: library/Main.java
package library;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Scanner;

public class Main {
    private Library library = new Library();

    String handle(String line) {
        String[] words = line.split("\\s+");
        String command = words[0].toLowerCase();
        String rest = line.contains(" ") ? line.substring(line.indexOf(' ') + 1).strip() : "";
        try {
            return switch (command) {
                case "add" -> "added book #" + library.addBook(rest).id();
                case "member" -> "added member #" + library.addMember(rest).id();
                case "list" -> library.listBooks();
                case "day" -> setDay(words);
                case "borrow" -> borrow(words);
                case "return" -> giveBack(words);
                case "loans" -> loans(words);
                case "save" -> save(rest);
                case "load" -> load(rest);
                default -> "unknown command: " + command;
            };
        } catch (IllegalArgumentException | IllegalStateException e) {
            return e.getMessage();
        }
    }

    private String setDay(String[] words) {
        Integer day = words.length == 2 ? number(words[1]) : null;
        if (day == null) {
            return "day must be a number";
        }
        library.setDay(day);
        return "today is day " + day;
    }

    private String borrow(String[] words) {
        Integer bookId = words.length == 3 ? number(words[1]) : null;
        Integer memberId = words.length == 3 ? number(words[2]) : null;
        if (bookId == null || memberId == null) {
            return "usage: borrow <bookId> <memberId>";
        }
        Loan loan = library.borrow(bookId, memberId);
        return "borrowed #" + bookId + " by #" + memberId + ", due day " + loan.dueDay();
    }

    private String giveBack(String[] words) {
        Integer bookId = words.length == 2 ? number(words[1]) : null;
        if (bookId == null) {
            return "usage: return <bookId>";
        }
        int late = library.lateDays(bookId);
        int fine = library.giveBack(bookId);
        return "returned #" + bookId + ", late " + late + " days, fine " + fine;
    }

    private String loans(String[] words) {
        Integer memberId = words.length == 2 ? number(words[1]) : null;
        if (memberId == null) {
            return "usage: loans <memberId>";
        }
        return library.loansOf(memberId);
    }

    private String save(String path) {
        if (path.isEmpty()) {
            return "usage: save <path>";
        }
        try {
            LibraryStore.save(library, Path.of(path));
            return "saved to " + path;
        } catch (IOException e) {
            return "cannot save: " + e.getMessage();
        }
    }

    private String load(String path) {
        if (path.isEmpty()) {
            return "usage: load <path>";
        }
        try {
            library = LibraryStore.load(Path.of(path));
            return "loaded from " + path;
        } catch (IOException | LibraryDataException e) {
            return "cannot load: " + e.getMessage();
        }
    }

    private static Integer number(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public static void main(String[] args) {
        Main app = new Main();
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;
            }
            if (line.equalsIgnoreCase("quit")) {
                System.out.println("bye");
                break;
            }
            System.out.println(app.handle(line));
        }
    }
}
// File: library/LibraryStoreTest.java
package library;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class LibraryStoreTest {
    @TempDir
    Path dir;

    private Library sample() {
        Library library = new Library();
        library.addBook("Clean Code");
        library.addBook("Java 21");
        library.addMember("Sea");
        library.addMember("Ton");
        library.borrow(2, 1);
        library.setDay(20);
        return library;
    }

    @Test
    void roundTripKeepsDayBooksMembersAndLoans() throws IOException {
        Path file = dir.resolve("library.txt");
        Library original = sample();
        LibraryStore.save(original, file);
        Library loaded = LibraryStore.load(file);
        assertEquals(original.snapshot(), loaded.snapshot());
        assertEquals("#1 Clean Code [available]\n#2 Java 21 [borrowed by #1 Sea]", loaded.listBooks());
        assertEquals(25, loaded.giveBack(2));
    }

    @Test
    void idsContinueAfterLoad() throws IOException {
        Path file = dir.resolve("library.txt");
        LibraryStore.save(sample(), file);
        Library loaded = LibraryStore.load(file);
        assertEquals(3, loaded.addBook("Refactoring").id());
        assertEquals(3, loaded.addMember("Fon").id());
    }

    @Test
    void missingFileGivesAnEmptyLibrary() throws IOException {
        assertEquals("(no books)", LibraryStore.load(dir.resolve("missing.txt")).listBooks());
    }

    @Test
    void corruptedLineReportsItsLineNumber() throws IOException {
        Path file = dir.resolve("broken.txt");
        Files.write(file, List.of("day\t1", "book\tx\tClean Code"), StandardCharsets.UTF_8);
        LibraryDataException error = assertThrows(LibraryDataException.class, () -> LibraryStore.load(file));
        assertEquals("line 2: For input string: \"x\"", error.getMessage());
    }

    @Test
    void loanForUnknownBookIsRejected() {
        LibraryDataException error = assertThrows(LibraryDataException.class,
            () -> Library.restore(List.of("day\t1", "member\t1\tSea", "loan\t9\t1\t15")));
        assertEquals("line 3: no such book", error.getMessage());
    }

    @Test
    void namesWithTabsAreRejected() {
        IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () -> new Library().addBook("Clean\tCode"));
        assertEquals("title cannot contain tabs", error.getMessage());
    }

    @Test
    void cliSavesAndLoadsThroughFiles() {
        Main first = new Main();
        first.handle("add Clean Code");
        first.handle("member Sea");
        first.handle("borrow 1 1");
        String path = dir.resolve("cli.txt").toString();
        assertEquals("saved to " + path, first.handle("save " + path));
        Main second = new Main();
        assertEquals("loaded from " + path, second.handle("load " + path));
        assertEquals("#1 Clean Code due day 15", second.handle("loans 1"));
    }
}
// File: test-input.txt
list
add
add Clean Code
add Java 21
add Refactoring
member
member Sea
member Ton
borrow 1 1
borrow 1 2
borrow 2 1
borrow 3 1
borrow 9 1
borrow 3 9
borrow x
loans 1
loans 2
loans 9
loans
day 20
day 5
day soon
return 1
return 1
return 7
return
list
borrow 3 1
loans 1
dance
quit
add ignored
// File: expected-output.txt
(no books)
title required
added book #1
added book #2
added book #3
name required
added member #1
added member #2
borrowed #1 by #1, due day 15
already borrowed
borrowed #2 by #1, due day 15
loan limit reached
no such book
no such member
usage: borrow <bookId> <memberId>
#1 Clean Code due day 15
#2 Java 21 due day 15
(no loans)
no such member
usage: loans <memberId>
today is day 20
day cannot go back
day must be a number
returned #1, late 5 days, fine 25
not borrowed
no such book
usage: return <bookId>
#1 Clean Code [available]
#2 Java 21 [borrowed by #1 Sea]
#3 Refactoring [available]
borrowed #3 by #1, due day 34
#2 Java 21 due day 15
#3 Refactoring due day 34
unknown command: dance
bye
`,
  solutionCheck: { junitTests: 7 },
  bugCheck: { kind: "logic", output: "added book #1" },
  buggy: java`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Library restored = Library.restore(List.of("book\t1\tClean Code", "book\t2\tJava 21"));
        System.out.println("added book #" + restored.addBook("Refactoring"));
    }
}

class Library {
    private final List<String> titles = new ArrayList<>();
    private int nextBookId = 1;

    int addBook(String title) {
        titles.add(title);
        return nextBookId++;
    }

    static Library restore(List<String> lines) {
        Library library = new Library();
        for (String line : lines) {
            String[] parts = line.split("\t");
            library.titles.add(parts[2]);
        }
        return library;
    }
}`,
  bugExplanation: "พิมพ์ added book #1 ทั้งที่ไฟล์มีหนังสือ #1 และ #2 อยู่แล้ว เพราะ restore ไม่ได้ตั้ง nextBookId ต่อจาก id ที่มากที่สุด หนังสือใหม่จึงได้ id ซ้ำกับของเดิม และการยืม/คืนตาม id จะไปโดนเล่มผิด compile ผ่านเป็น logic bug แก้โดยให้ restore ตั้ง nextBookId = (id มากที่สุดที่อ่านได้) + 1 และมี test ที่ addBook หลังโหลดแล้วตรวจ id",
  vocabulary: [v("persistence", "เก็บข้อมูลให้อยู่หลังโปรแกรมปิด"), v("serialization", "แปลง object เป็นข้อความ/ไบต์เพื่อเก็บหรือส่ง"), v("java.nio.file", "API มาตรฐานสำหรับทำงานกับไฟล์: Files, Path"), v("@TempDir", "โฟลเดอร์ชั่วคราวที่ JUnit สร้างและลบให้"), v("round trip", "บันทึกแล้วโหลดกลับได้ข้อมูลเท่าเดิม"), v("capstone", "งานรวมที่ใช้ทุกทักษะของคอร์ส")],
},
];
