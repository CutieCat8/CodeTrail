import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { emptyData, STORAGE_KEY } from "../../src/lib/storage";

test("search combines text, language and progress filters and opens a saved lesson", async ({ page }) => {
  const data = { ...emptyData(), stepProgress: { "js-functions-practice": { stepId: "js-functions-practice", answer: "saved draft", notes: "", completed: false, updatedAt: "2026-10-11T00:00:00.000Z" } } };
  await page.addInitScript(({ key, data }) => { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(data)); }, { key: STORAGE_KEY, data });
  await page.goto("/#curriculum");
  await page.getByText("ค้นหาและกรองบทเรียน", { exact: true }).click();
  const search = page.locator(".lesson-search");
  await search.getByLabel("คำค้น", { exact: true }).fill(" JavaScript functions ");
  await search.getByRole("combobox", { name: "คอร์ส", exact: true }).selectOption("javascript-foundations");
  await search.getByRole("combobox", { name: "ภาษา", exact: true }).selectOption("javascript");
  await search.getByRole("combobox", { name: "สถานะการเรียน", exact: true }).selectOption("in-progress");
  await expect(search.locator("li")).toHaveCount(1);
  await expect(search).toContainText("กำลังเรียน");
  await search.getByRole("button", { name: /^เปิดบทเรียน/ }).click();
  await expect(page).toHaveURL(/#step\/js-functions-practice$/);
  await expect(page.getByRole("textbox", { name: /^Code editor/ })).toHaveValue("saved draft");
});

test("search empty results, reset and pagination fit mobile and remain accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#curriculum");
  await page.getByText("ค้นหาและกรองบทเรียน", { exact: true }).click();
  const search = page.locator(".lesson-search");
  await expect(search.locator("li")).toHaveCount(30);
  await search.getByRole("button", { name: /^แสดงเพิ่มอีก/ }).click();
  await expect(search.locator("li")).toHaveCount(60);
  await search.getByLabel("คำค้น", { exact: true }).fill("zzzz-never-exists");
  await expect(search).toContainText("ไม่พบบทเรียนที่ตรงกับตัวกรอง");
  await search.getByRole("button", { name: "ล้างตัวกรอง" }).click();
  await expect(search.locator("li")).toHaveCount(30);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter(item => item.impact === "serious" || item.impact === "critical")).toEqual([]);
});
