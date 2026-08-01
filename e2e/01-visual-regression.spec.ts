import { test, expect } from "./fixtures/canvas-fixture";

test.describe("E2E-01: Visual Regression & Canvas WebGL Snapshot Testing", () => {
  test.beforeEach(async ({ canvasPage }) => {
    await canvasPage.freezeTime();
  });

  test("deve renderizar a Landing Page com Canvas sem regressão visual", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("landing-page-hero.png");
  });

  test("deve renderizar o Playground com componentes de canvas ativos", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("playground-canvas.png");
  });

  test("deve manter fidelidade visual nos temas Light e Dark", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Valida Dark Mode padrão
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot("theme-dark.png");

    // Alterna para Light Mode se o botão existir
    const themeToggle = page.locator("button[aria-label*='theme']").first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot("theme-light.png");
    }
  });
});
