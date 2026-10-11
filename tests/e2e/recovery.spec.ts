import { expect, test } from "@playwright/test";
import { emptyData, REJECTED_STORAGE_KEY, STORAGE_KEY } from "../../src/lib/storage";
import AxeBuilder from "@axe-core/playwright";

test("local recovery previews, cancels, restores and keeps the prior data", async ({ page }) => {
  await page.goto("/#settings");
  await expect(page.locator(".loading-screen")).toHaveCount(0);
  const key = `${REJECTED_STORAGE_KEY}:2026-10-10T00:00:00.000Z`;
  const backup = { ...emptyData(), weeklyGoal: 9 };
  await page.evaluate(({ key, backup }) => localStorage.setItem(key, JSON.stringify(backup)), { key, backup });
  await page.getByRole("button", { name: "โหลดรายการสำรองใหม่" }).click();
  await page.getByRole("button", { name: "ดูก่อนกู้คืน" }).click();
  await expect(page.getByRole("region", { name: "ยืนยันกู้คืนข้อมูลสำรอง" })).toBeVisible();
  await page.getByRole("button", { name: "ยกเลิก", exact: true }).click();
  await expect(page.getByRole("region", { name: "ยืนยันกู้คืนข้อมูลสำรอง" })).toHaveCount(0);
  await expect(page.locator(".weekly-goal-setting")).toContainText("5 กิจกรรม");
  await page.getByRole("button", { name: "ดูก่อนกู้คืน" }).click();
  await page.getByRole("button", { name: "ยืนยันแทนข้อมูลและกู้คืน" }).click();
  await expect(page.locator(".weekly-goal-setting")).toContainText("9 กิจกรรม");
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? "{}").weeklyGoal, STORAGE_KEY)).toBe(9);
  const preserved = await page.evaluate(prefix => Object.keys(localStorage).filter(key => key.startsWith(prefix)).map(key => JSON.parse(localStorage.getItem(key)!)), `${REJECTED_STORAGE_KEY}:`);
  expect(preserved.some(data => data.weeklyGoal === 5)).toBe(true);
  await page.reload();
  await expect(page.locator(".weekly-goal-setting")).toContainText("9 กิจกรรม");
});

test("corrupt backups can be downloaded without changing data and fit mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#settings");
  await expect(page.locator(".loading-screen")).toHaveCount(0);
  await page.evaluate(key => localStorage.setItem(key, "{broken JSON"), `${REJECTED_STORAGE_KEY}:2026-10-10T00:00:00.000Z`);
  await page.getByRole("button", { name: "โหลดรายการสำรองใหม่" }).click();
  await expect(page.getByText("JSON อ่านไม่ได้", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "ดูก่อนกู้คืน" })).toHaveCount(0);
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "ดาวน์โหลดต้นฉบับ JSON" }).click();
  expect((await downloadEvent).suggestedFilename()).toMatch(/codetrail-backup.*json/);
  await expect(page.locator(".weekly-goal-setting")).toContainText("5 กิจกรรม");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations.filter(item => item.impact === "serious" || item.impact === "critical")).toEqual([]);
});
