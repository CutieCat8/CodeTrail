import { expect, test } from "@playwright/test";
import { STORAGE_KEY } from "../../src/lib/storage";

test("daily mission stays fixed after completion and refresh and fits mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#dashboard");
  const card = page.getByRole("region", { name: "ภารกิจวันนี้", exact: true });
  await expect(card).toBeVisible();
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  const original = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).dailyMissions.mixed, STORAGE_KEY);
  await card.getByRole("button", { name: "เปิดภารกิจวันนี้", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`#step/${original.stepId}$`));
  await page.getByRole("button", { name: "บันทึกการทำด้วยตนเอง" }).click();
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  await page.goto("/#dashboard");
  await page.reload();
  await expect(card).toContainText("บทนี้บันทึกว่าทำแล้ว");
  await card.getByRole("button", { name: "ทบทวนภารกิจวันนี้", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`#step/${original.stepId}$`));
  await page.goto("/#dashboard");
  await page.reload();
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
  expect(stored.dailyMissions.mixed).toEqual(original);
  expect(stored.progress).toEqual({});
  // Only the actual lesson completion creates an activity event.
  expect(stored.activityEvents.filter((event: { sourceId: string }) => event.sourceId !== original.stepId)).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
