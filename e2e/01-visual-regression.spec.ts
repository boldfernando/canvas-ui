import { test, expect } from "./fixtures/canvas-fixture";

test.describe("E2E-01: Visual Regression & Canvas WebGL Snapshot Testing", () => {
  test.beforeEach(async ({ canvasPage }) => {
    await canvasPage.freezeTime();
  });

  test("deve renderizar a Landing Page nos temas Dark e Light sem regressões visuais", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // 1. Snapshot da Landing Page no Dark Theme (padrão)
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("landing-page-dark.png");

    // 2. Alterna para Light Theme
    const themeToggle = page.locator("button[aria-label*='mode']").first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("landing-page-light.png");

      // 3. Alterna de volta para Dark Theme para validar reversão
      await themeToggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("landing-page-dark-reverted.png");
    }
  });

  test("deve renderizar o Playground nos temas Dark e Light sem regressões visuais", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // 1. Snapshot do Playground no Dark Theme
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("playground-dark.png");

    // 2. Alterna para Light Theme
    const themeToggle = page.locator("button[aria-label*='mode']").first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot("playground-light.png");
    }
  });
});
