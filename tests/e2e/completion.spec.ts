import { expect, test } from "@playwright/test";
import { learningSteps } from "../../src/content/curriculum";
import { emptyData, STORAGE_KEY } from "../../src/lib/storage";
import { routeCourseIds } from "../../src/lib/learning-route";
import AxeBuilder from "@axe-core/playwright";

for (const mode of ["fullstack", "java", "mixed"] as const) {
  test(`completed ${mode} path shows a summary and deliberate review without resetting data`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const steps = learningSteps.filter(step => routeCourseIds(mode).includes(step.courseId));
    const data = { ...emptyData(), mode, stepProgress: Object.fromEntries(steps.map(step => [step.id, { stepId: step.id, answer: "saved", notes: "", completed: true, updatedAt: "2026-10-11T00:00:00.000Z" }])) };
    await page.addInitScript(({ key, data }) => { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(data)); }, { key: STORAGE_KEY, data });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "เรียนครบขั้นที่เปิดแล้วในเส้นทางนี้" })).toBeVisible();
    await expect(page.locator(".continue-quest")).toHaveCount(0);
    await expect(page.locator(".route-completion")).toContainText(`${steps.length}/${steps.length}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations.filter(item => item.impact === "serious" || item.impact === "critical")).toEqual([]);
    await page.getByRole("button", { name: /^ทบทวน / }).first().click();
    await expect(page).toHaveURL(/#step\/.*-checkpoint$/);
    expect(await page.evaluate(key => Object.values(JSON.parse(localStorage.getItem(key)!).stepProgress).filter((step: unknown) => (step as { completed: boolean }).completed).length, STORAGE_KEY)).toBe(steps.length);
    await page.goto("/");
    await page.getByRole("button", { name: "ไปต่อยอดโปรเจกต์" }).click();
    await expect(page).toHaveURL(/#projects$/);
  });
}
