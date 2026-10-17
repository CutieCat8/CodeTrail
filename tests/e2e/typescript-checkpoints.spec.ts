import { expect, test } from "@playwright/test";

for (const topicId of ["ts-basic-types", "ts-arrays-tuples", "ts-unions-literals", "ts-narrowing", "ts-null-safety"]) {
  test(`${topicId} requires a response before revealing criteria and restores the saved answer`, async ({ page }) => {
    await page.goto(`/#step/${topicId}-checkpoint`);
    const editor = page.getByRole("textbox", { name: /^Code editor/ });
    const submit = page.getByRole("button", { name: "ส่งคำตอบเพื่อเทียบเกณฑ์" });
    const feedback = page.getByRole("button", { name: "Hint / Solution" });
    await expect(editor).toHaveValue("");
    await expect(submit).toBeDisabled();
    await expect(feedback).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Run", exact: true })).toHaveCount(0);
    const attempt = "ยังทำไม่สำเร็จ: ทดลองรับ unknown แล้วตรวจ typeof ก่อนใช้ค่า และจด error จาก tsc ไว้ตรวจเอง";
    await editor.fill(attempt);
    await submit.click();
    await feedback.click();
    await expect(page.locator(".reveal")).toContainText("เกณฑ์เทียบคำตอบ");
    await expect(page.getByText("บันทึกการส่งแล้ว — ยังต้องเทียบเกณฑ์ด้วยตนเอง", { exact: true })).toBeVisible();
    await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
    await page.reload();
    await expect(editor).toHaveValue(attempt);
    await expect(page.locator(".reveal")).toContainText("เกณฑ์เทียบคำตอบ");
    await editor.fill("กำลังแก้คำตอบใหม่");
    await expect(feedback).toHaveCount(0);
    await expect(page.locator(".reveal")).toHaveCount(0);
  });

}
