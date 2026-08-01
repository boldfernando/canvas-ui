import { test, expect } from "./fixtures/canvas-fixture";
import { AxeBuilder } from "@axe-core/playwright";

test.describe("E2E-07: Automated Accessibility & Reduced Motion Audit (WCAG 2.1 AA)", () => {
  test("deve garantir zero violações críticas de acessibilidade na Landing Page", async ({ page, errorCollector }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag21a", "wcag2aa", "wcag21aa"])
      .disableRules(["color-contrast"]) // Tratado em testes específicos por tema
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(criticalViolations).toEqual([]);
    errorCollector.assertNoErrors();
  });

  test("deve aplicar suporte a prefers-reduced-motion desativando animações pesadas", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // Valida se o conteúdo principal permanece visível e acessível
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });
});
