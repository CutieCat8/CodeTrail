import type { TopicSource } from "@/types/curriculum";

export const javascriptCheckpoints: Record<string, NonNullable<TopicSource["checkpoint"]>> = {
  "js-values": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: รับค่าจำนวนบัตร \"4\" และราคาบัตร \"75\" ผ่านตัวแปร เขียนโปรแกรมแสดงชนิดหลังแปลงและยอดรวม เปลี่ยนจำนวนเป็น \"0\" อีกครั้ง อธิบายความต่างของ + ก่อนและหลังแปลง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ชนิดหลังแปลงเป็นnumber ยอด300และ0",
      "อ่านจากตัวแปรและอธิบายstring+numberได้"
    ],
    "modelAnswer": "const count=Number(\"4\"); const price=Number(\"75\"); console.log(typeof count); console.log(count*price); ผลnumber/300 ถ้าจำนวนเป็น0ยอด0; \"4\"+75ต่อเป็น\"475\" ส่วน4+75ได้79"
  },
  "js-variables": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: เครดิตเริ่ม500 ใช้ครั้งแรก120 ครั้งสอง80 แสดงค่าหลังใช้แต่ละครั้ง ก่อนรันเขียนค่าที่ทำนาย แล้วอธิบายชื่อใดเปลี่ยนและชื่อใดคงที่ ใช้วิธีที่เลือกเอง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ผล380,300พร้อมค่าที่ทำนาย",
      "อธิบายassignmentหรือค่าคำนวณใหม่ตรงกับโค้ด"
    ],
    "modelAnswer": "let credit=500; const first=120; const second=80; credit=credit-first; console.log(credit); credit=credit-second; console.log(credit); ผล380/300 creditเปลี่ยน ส่วนfirst/secondคงที่ ใช้constชื่อใหม่แต่ละขั้นก็ถูก"
  },
  "js-strings": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: ระบบรับรหัส \"  ROOM A  \" ต้องแสดง room-a และความยาว6 พร้อมแสดงค่าเดิมที่ยังมีช่องว่าง ลองค่า \"B\" ด้วย ระบุข้อจำกัดหากมีช่องว่างซ้อน\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ได้room-a/6และb/1",
      "ข้อมูลเดิมไม่เปลี่ยนและข้อจำกัดตรงวิธีที่ใช้"
    ],
    "modelAnswer": "const raw=\"  ROOM A  \";const code=raw.trim().toLowerCase().replaceAll(\" \",\"-\");console.log(code,code.length);console.log(raw); ผลroom-a 6 ค่าเดิมยังมีช่องว่าง \"B\"ได้b 1 ช่องว่างซ้อนกลายเป็น-ซ้อน ไม่ได้ยุบ"
  },
  "js-numbers": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: อ่านราคาผ่านตัวแปรจาก \"19.5\", \"สิบ\", \"Infinity\" แสดงค่าหลังแปลงกับผลตรวจจำนวนจำกัด อธิบายว่ากรณีใดนำไปคิดเงินได้ ห้ามตรวจด้วย NaN === NaN\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "19.5 true,NaN false,Infinity false",
      "อธิบายทำไมtypeofnumberอย่างเดียวไม่พอ"
    ],
    "modelAnswer": "const price=Number(\"19.5\");console.log(price,Number.isFinite(price)); ทำซ้ำกับอีกสองค่าได้NaN false/Infinity false; typeofทั้งสามเป็นnumber แต่สองค่าหลังไม่ใช่จำนวนจำกัดใช้คิดเงินจริงไม่ได้"
  },
  "js-conditions": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: ค่าที่จอดรถ: ชั่วโมงน้อยกว่า0แสดง ข้อมูลผิด, 0ถึง1รวมขอบฟรี, มากกว่า1คิด30บาทต่อชั่วโมงส่วนเกิน ไม่ปัดเศษ เขียนจากศูนย์และทดลอง -1,0,1,2,2.5 อธิบายการเลือกกิ่ง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ข้อมูลผิด,0,0,30,45ตามกรณี",
      "ลำดับกิ่งและขอบตรงrequirements"
    ],
    "modelAnswer": "const hours=2.5;if(hours<0){console.log(\"ข้อมูลผิด\");}else if(hours<=1){console.log(0);}else{console.log((hours-1)*30);} กรณีที่ตรวจได้ตามโจทย์ ตรวจลบก่อนแล้วช่วงฟรีไม่ทับกับกิ่งคิดเงิน"
  },
  "js-functions": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: เขียน function คิดค่าถ่ายเอกสาร รับจำนวนหน้าและราคาต่อหน้า คืนยอดเงิน หรือ null เมื่อหน้าติดลบ สมมติทั้งคู่เป็นตัวเลขและราคาต่อหน้าไม่ติดลบ เลือกชื่อและวิธีเอง ทดสอบ0หน้า,3หน้าราคา2.5,หน้าติดลบ และนำผลที่คืนไปบวกค่าซอง5บาท\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "คืน0,7.5,null",
      "ผู้เรียกใช้ค่าที่คืนต่อได้;กรณีผิดไม่นำnullไปคิดราคา",
      "คำอธิบายparameter/returnตรงโค้ด"
    ],
    "modelAnswer": "function copyCost(pages,price){if(pages<0)return null;return pages*price;} console.log(copyCost(0,2.5),copyCost(3,2.5),copyCost(-1,2.5)); ผล0 7.5 null; const cost=copyCost(3,2.5); if(cost!==null)console.log(cost+5); ได้12.5"
  },
  "js-runtime": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: function pack(){console.log(\"กล่อง\");seal();console.log(\"ส่ง\");} function seal(){console.log(\"ปิด\");} console.log(\"เริ่ม\");pack();console.log(\"จบ\"); ทำนายลำดับและ stack ขณะพิมพ์ ปิด ก่อนทดลอง ถ้าเรียก seal จากระดับบนสุดหลัง pack แทน จะเปลี่ยนอะไร?\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "เริ่ม,กล่อง,ปิด,ส่ง,จบ",
      "stackระดับบนสุด→pack→seal",
      "แบบย้ายsealได้เริ่ม,กล่อง,ส่ง,ปิด,จบ"
    ],
    "modelAnswer": "ลำดับตามrubric packค้างรอsealจบจึงพิมพ์ส่ง; เมื่อย้ายการเรียกsealออก packไม่รอsealและพิมพ์ส่งก่อนปิด ต้องลบseal()ในpackด้วยเพื่อไม่เรียกซ้ำ"
  },
  "js-scope": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: สร้างเครื่องนับเข้าชมสองเครื่อง แต่ละเครื่องเริ่ม0 เมื่อเรียกเพิ่มทีละ1แล้วคืนค่า เรียกเครื่องAสองครั้ง Bหนึ่งครั้ง Aอีกครั้ง ต้องได้1,2,1,3 อธิบายว่าอะไรแชร์และไม่แชร์ พร้อมทดลอง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ผล1,2,1,3",
      "ไม่มีglobalcountที่ทำให้สองเครื่องแชร์กัน",
      "อธิบายตัวแปรที่แต่ละclosureจำ"
    ],
    "modelAnswer": "function makeCounter(){let count=0;return function(){count=count+1;return count;};}const a=makeCounter();const b=makeCounter();console.log(a(),a(),b(),a()); แต่ละครั้งmakeCounterสร้างcountของตนเอง aจำชุดหนึ่ง bอีกชุด จึงไม่แชร์"
  },
  "js-loops": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: ร้านอ่านเวลางานแต่ละชิ้นตามลำดับ รับ [2,3,7,1] กับเวลาว่าง6 ทำชิ้นถัดไปได้เฉพาะเมื่อเวลาพอ ถ้าไม่พอหยุดเลย คืนจำนวนชิ้นที่ทำและเวลาที่เหลือ เลือกวิธีเอง ตรวจเวลาพอดี,รายการว่าง,ทำชิ้นแรกไม่ได้\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ตัวอย่างคืน2ชิ้นเหลือ1 ไม่ข้ามไปชิ้น1",
      "[2,3]กับ5ได้2เหลือ0;[]กับ6ได้0เหลือ6;[7,1]กับ6ได้0เหลือ6",
      "ผลรวมและทางหยุดอธิบายได้"
    ],
    "modelAnswer": "function completed(times,available){let count=0;let left=available;for(const time of times){if(time>left)break;left=left-time;count=count+1;}return {count,left};} ผล{count:2,left:1} ใช้whileก็ได้ สมมติเวลาทุกชิ้นเป็นจำนวนไม่ติดลบ"
  },
  "js-objects": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: ข้อมูลอุปกรณ์ {name:\"Lamp\",stock:3,location:{room:\"A\"}} สร้างผลใหม่ที่stockเป็น2แต่ชื่อ/ห้องเหมือนเดิม อธิบายว่าถ้าเปลี่ยนlocation.roomในผลใหม่กระทบต้นฉบับไหม แล้วทดลองยืนยัน\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ต้นฉบับstockยัง3ผลใหม่2",
      "อธิบายshallowcopyและการแชร์location",
      "หากต้องการห้องอิสระต้องcopyชั้นlocationด้วย"
    ],
    "modelAnswer": "const original={name:\"Lamp\",stock:3,location:{room:\"A\"}};const next={...original,stock:2}; next.location.room=\"B\";console.log(original.stock,original.location.room); ผล3 B เพราะspreadcopyตื้น locationยังแชร์; const isolated={...original,location:{...original.location}}; สร้างก่อนเปลี่ยนถ้าต้องเก็บห้องA"
  },
  "js-arrays": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: รายการพัสดุ [{code:\"a\",weight:2},{code:\"b\",weight:0},{code:\"c\",weight:5}] คืนรายการรหัสตัวพิมพ์ใหญ่เฉพาะน้ำหนักมากกว่า0 ห้ามแก้ต้นฉบับ ทดลองรายการว่างและน้ำหนัก0ทั้งหมด เลือกวิธีเอง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ได้[\"A\",\"C\"] และสองกรณีขอบได้[]",
      "ต้นฉบับและสมาชิกไม่ถูกแก้",
      "อธิบายการเลือกก่อนหรือหลังแปลงตามโค้ด"
    ],
    "modelAnswer": "function shipped(items){return items.filter(item=>item.weight>0).map(item=>item.code.toUpperCase());} ลูปกับpushก็ถูก ถ้าสร้างผลใหม่โดยไม่แก้itemsและเงื่อนไขตรง"
  },
  "js-errors": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: คาดผลรวม30 แต่ const prices=[10,20];let sum=0;for(let i=0;i<=prices.length;i++){sum+=prices[i];}console.log(sum); ได้NaN เขียนสมมติฐาน วิธีเก็บหลักฐาน แก้ให้น้อย แล้วตรวจ[]กับ[0] ห้ามตอบเพียงว่าเปลี่ยนเครื่องหมาย\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ระบุรอบเกินขอบอ่านundefinedแล้วNaN",
      "หลักฐานแสดงi/prices[i]ก่อนบวก",
      "หลังแก้ได้30,0,0ตามกรณี"
    ],
    "modelAnswer": "ใส่console.log(i,prices[i])ก่อนบวกเห็น0 10/1 20/2 undefined; sum30บวกundefinedได้NaN แก้ <=เป็น<;[]ไม่เข้าลูปได้0 [0]บวก0ได้0 ลบlogชั่วคราวเมื่อยืนยันแล้ว"
  },
  "js-references": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: state={book:{title:\"Old\"},tags:[\"read\"]} สร้างnextที่ชื่อหนังสือNewและtagsเพิ่มdoneโดยต้นฉบับทุกส่วนเหมือนเดิม ส่งผลทดลองและอธิบายว่าcopyส่วนใด\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "state.book.titleยังOldและtagsยัง[\"read\"]",
      "nextได้Newและ[\"read\",\"done\"]",
      "copyทุกชั้นที่แก้และไม่อ้างว่าspreaddeepcopy"
    ],
    "modelAnswer": "const next={...state,book:{...state.book,title:\"New\"},tags:[...state.tags,\"done\"]}; console.log(state,next); copyroot,book,tagsเพราะทั้งสองส่วนเปลี่ยน constอย่างเดียวไม่ทำให้immutable"
  },
  "js-callbacks": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: รายการเซสชัน [{name:\"B\",minutes:30},{name:\"A\",minutes:5},{name:\"C\",minutes:15}] สร้างรายงานยอดนาทีรวมและชื่อเรียงตามนาทีจากน้อยไปมาก โดยไม่แก้ลำดับต้นฉบับ ตรวจ[]และรายการเดียว\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "รวม50ชื่อA,C,B;[]รวม0ชื่อ[]",
      "ต้นฉบับB,A,Cคงเดิม",
      "อธิบายcomparatorหรือวิธีเรียงที่เลือกและค่าเริ่มผลรวม"
    ],
    "modelAnswer": "const total=sessions.reduce((sum,item)=>sum+item.minutes,0);const names=[...sessions].sort((a,b)=>a.minutes-b.minutes).map(item=>item.name); console.log(total,names); copyก่อนsortเพราะsortแก้arrayเดิม; ลูปสรุปและวิธีเรียงอื่นก็ใช้ได้"
  },
  "js-project-planner-1": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: เปลี่ยนบริบทเป็นรอบเวิร์กช็อป มี title,capacity,joined สร้างสรุปจำนวนรอบที่ยังว่างและรายชื่อรอบนั้นแบบชื่อเดิม ทดลองไม่มีรอบ,เต็มพอดี,ยังว่าง ไม่บังคับแยกhelperหรือใช้map เลือกวิธีและอธิบาย\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "รวมเฉพาะjoined<capacity",
      "กรณีว่างหรือเต็มทั้งหมดจำนวน0ชื่อ[]",
      "ผลรายชื่อและจำนวนสอดคล้อง ไม่แก้ข้อมูลตั้งต้น"
    ],
    "modelAnswer": "function summary(rounds){const titles=[];for(const round of rounds){if(round.joined<round.capacity)titles.push(round.title);}return {openCount:titles.length,titles};} []ได้0/[]; [{title:\"A\",capacity:2,joined:2},{title:\"B\",capacity:3,joined:1}]ได้1/[\"B\"] วิธีเดียวหรือหลายhelperถูกได้ตามbehavior"
  },
  "js-exceptions": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: เขียนตัวแปลงจำนวนชั่วโมงจากข้อความ รับเฉพาะจำนวนเต็ม1ถึง8 ข้อความว่างหรือไม่ใช่จำนวนเต็มให้ error \"รูปแบบผิด\" นอกช่วงให้ \"นอกช่วง\" ให้ผู้เรียกจับและแสดงข้อความ ตรวจ\"1\",\"8\",\"0\",\"9\",\"\",\"2.5\",\"abc\"\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "1และ8คืนตัวเลข;0และ9นอกช่วง;ที่เหลือรูปแบบผิด",
      "ไม่เปลี่ยนerrorเป็นค่าที่ถูกโดยเงียบ",
      "catchอยู่ในผู้เรียกและผลทดลองครบ"
    ],
    "modelAnswer": "function hours(text){const n=Number(text);if(text.trim()===\"\" || !Number.isInteger(n))throw new Error(\"รูปแบบผิด\");if(n<1 || n>8)throw new Error(\"นอกช่วง\");return n;} try{console.log(hours(\"0\"));}catch(error){console.log(error.message);} ใช้callerทดลองครบตามrubric"
  },
  "js-modules-json": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: สร้างสองไฟล์ .mjs: ไฟล์หนึ่งexportการคำนวณค่าซอง3บาทต่อชิ้น อีกไฟล์importและอ่าน JSONข้อความ {\"count\":4} แล้วแสดงยอด12 ทดลองJSONเสียและอธิบาย error พร้อมคำสั่งรันจากworkspace\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ไฟล์แยกจริงและimportตรงexport",
      "node main.mjsได้12;JSONเสียเกิดSyntaxErrorที่parse",
      "แยกJSONtextกับobjectและอธิบายตำแหน่งแก้"
    ],
    "modelAnswer": "cost.mjs: export function envelope(count){return count*3;}\nmain.mjs: import {envelope} from \"./cost.mjs\"; const data=JSON.parse('{\"count\":4}'); console.log(envelope(data.count));\nPowerShellและBashใช้node main.mjsจากโฟลเดอร์สองไฟล์ร่วมกัน; JSONเสียเช่น'{count:4}'parseไม่ได้เพราะkeyต้องมีdoublequote"
  },
  "js-promises": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: ทำนายก่อนทดลอง: console.log(\"A\");Promise.resolve(2).then(value=>console.log(value+1));console.log(\"B\"); จากนั้นสร้างPromiseที่rejectข้อความ \"หยุด\" และให้ผู้เรียกแสดงerror อธิบายว่าลำดับหมายถึงรอหรือยัง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "A,B,3ตามลำดับ",
      "rejectionมีcatchและแสดงข้อความหยุด",
      "thenลงทะเบียนงานหลังส่วนsynchronousไม่ใช่pauseทั้งไฟล์"
    ],
    "modelAnswer": "console.log(\"A\"); Promise.resolve(2).then(value=>console.log(value+1)); console.log(\"B\");ผลA/B/3; Promise.reject(new Error(\"หยุด\")).catch(error=>console.log(error.message)); ไม่มีcatchจะเป็นunhandledrejection"
  },
  "js-async": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: สร้างasync functionอ่านข้อมูลจำลองจากPromise.resolve({count:3}) คืนcount+2 แล้วให้ผู้เรียกแสดง5; อีกกรณีใช้Promise.reject(new Error(\"อ่านไม่ได้\"))ต้องแสดงerror อธิบายว่าทำไมtry/catchต้องawait ใช้IIFEหรือfunctionmainที่เรียกจริง\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "ผล5และอ่านไม่ได้ในสองกรณี",
      "awaitอยู่ในtryเมื่อจะจับrejection",
      "ไม่อ้างว่าasyncfunctionคืน5โดยตรงให้callerทันที"
    ],
    "modelAnswer": "async function main(){try{const data=await Promise.resolve({count:3});console.log(data.count+2);}catch(error){console.log(error.message);}} main(); เปลี่ยนPromiseเป็นrejectเพื่อทดสอบcatch; asyncfunctionคืนPromiseเสมอ awaitดึงผลหรือthrowเมื่อreject"
  },
  "js-project-planner-2": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามก่อนดู feedback/เฉลย: ประเมินท้ายคอร์สบริบทใหม่: รับรายการยืมอุปกรณ์ {name,day,units} nameต้องไม่ว่างหลังtrim, dayเป็นmonหรือtue, unitsเป็นจำนวนเต็มบวก คืนรายงานยอดunitsแยกวันและรายการตำแหน่งที่ผิดตามindex; ไม่หยุดทั้งรายการเมื่อพบข้อมูลผิด เปิดdocumentationได้ เลือกfunction/loop/arrayและโครงภายในเอง ทดสอบรายการว่าง,ข้อมูลถูกหลายรายการวันเดียว,ข้อมูลปนผิด,units0และ1 แนบเหตุผลการตัดสินใจและdebugหนึ่งกรณี ไม่ต้องทำเว็บ/API\nส่งโค้ด (ถ้ามี) ค่าที่ทำนาย ผลทดลอง และคำอธิบายด้วยคำของตัวเอง หากยังไม่สำเร็จส่ง error/สิ่งที่ลองเพื่อเทียบ rubric ได้ การบันทึกไม่ใช่การยืนยันว่าถูก",
    "rubric": [
      "[]ได้ยอดทั้งวัน0และinvalidIndexes[]",
      "[{name:\"Lamp\",day:\"mon\",units:2},{name:\"Cable\",day:\"mon\",units:1}]ยอดmon3tue0",
      "ข้อมูลผิดถูกรายงานและไม่รวมยอด แต่รายการถัดไปยังประมวลผล",
      "units1ถูกunits0ผิด;ไม่แก้ต้นฉบับ",
      "คำอธิบายการเลือกวิธีและexpected/actualก่อนแก้บั๊ก ไม่ถือว่าติ๊กแล้วผ่าน"
    ],
    "modelAnswer": "ตัวอย่างวิธีหนึ่ง ไม่บังคับโครงนี้:\nfunction report(rows){const totals={mon:0,tue:0};const invalidIndexes=[];for(let i=0;i<rows.length;i++){const row=rows[i];if(typeof row.name!==\"string\" || row.name.trim()===\"\" || (row.day!==\"mon\" && row.day!==\"tue\") || !Number.isInteger(row.units) || row.units<=0){invalidIndexes.push(i);continue;}totals[row.day]+=row.units;}return {totals,invalidIndexes};}\nทดสอบ[]ได้{totals:{mon:0,tue:0},invalidIndexes:[]}; [{name:\"Lamp\",day:\"mon\",units:2},{name:\"\",day:\"tue\",units:1},{name:\"Cable\",day:\"mon\",units:1}]ได้mon3,tue0,invalidIndexes[1] สมมติแต่ละrowเป็นobject; nullrowนอกขอบเขตที่กำหนด ต้องเพิ่มrequirementsก่อนรองรับ ใช้วิธีอื่นได้ถ้าbehaviorตรง"
  }
};
