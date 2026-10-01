import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["#dashboard", "#curriculum", "#roadmap", "#lesson/web-ts-narrowing"]) {
  test(`has no serious automated accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(`/${route}`);
    await expect(page.locator(".loading-screen")).toHaveCount(0);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(serious.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => node.target) }))).toEqual([]);
  });
}
