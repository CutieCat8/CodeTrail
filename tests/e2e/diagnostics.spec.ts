import { expect, test } from "@playwright/test";
import { diagnosticQuestions } from "../../src/content/diagnostics";
import AxeBuilder from "@axe-core/playwright";

test("diagnostic saves a recommendation without awarding progress and supports retake", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#diagnostic");
  await expect(page.getByRole("heading", { name: "แบบประเมินก่อนเรียน" })).toBeVisible();
  await page.getByRole("button", { name: "ดูคำแนะนำ", exact: true }).click();
  await expect(page.getByRole("heading", { name: "คำแนะนำจุดเริ่มเรียน" })).toHaveCount(0);
  for (const question of diagnosticQuestions) {
    await page.locator(`input[name="${question.id}"][value="unsure"]`).check();
  }
  await page.getByRole("button", { name: "ดูคำแนะนำ", exact: true }).click();
  await expect(page.getByText("ตอบถูก 0 / 8 ข้อ")).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem("seas-fullstack-quest:v1") ?? "{}");
    return { step: data.diagnosticResult?.recommendedStepId, progress: data.progress, steps: data.stepProgress, events: data.activityEvents };
  })).toEqual({ step: "dev-editor-concept", progress: {}, steps: {}, events: [] });
  await page.reload();
  await expect(page.getByText("ตอบถูก 0 / 8 ข้อ")).toBeVisible();
  await page.getByRole("button", { name: "ทำแบบประเมินใหม่" }).click();
  for (const question of diagnosticQuestions) {
    await page.locator(`input[name="${question.id}"][value="${question.correctOptionId}"]`).check();
  }
  await page.getByRole("button", { name: "ดูคำแนะนำ", exact: true }).click();
  await expect(page.getByText("ตอบถูก 8 / 8 ข้อ")).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("seas-fullstack-quest:v1") ?? "{}").diagnosticResult?.recommendedStepId)).toBe("js-functions-practice");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter(item => item.impact === "serious" || item.impact === "critical")).toEqual([]);
  await page.getByRole("button", { name: /^เริ่มเรียน:/ }).click();
  await expect(page).toHaveURL(/#step\/js-functions-practice$/);
});
