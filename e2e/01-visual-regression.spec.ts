import { test, expect } from "./fixtures/canvas-fixture";
import { Page } from "@playwright/test";

/**
 * Garante que a página esteja no tema desejado (dark ou light)
 * inspecionando a classe 'dark' no <html> e clicando no botão se necessário.
 */
async function setPageTheme(page: Page, targetTheme: "dark" | "light") {
  const isCurrentlyDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));

  if ((targetTheme === "dark" && !isCurrentlyDark) || (targetTheme === "light" && isCurrentlyDark)) {
    const toggleBtn = page.locator("button[aria-label*='mode']").first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await page.waitForTimeout(400);
    }
  }
}

test.describe("E2E-01: Visual Regression & Canvas WebGL Snapshot Testing", () => {
  test.beforeEach(async ({ canvasPage }) => {
    await canvasPage.freezeTime();
  });

  test("deve renderizar a Landing Page nos temas Dark e Light sem regressões visuais", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // 1. Força e valida o tema Light
    await setPageTheme(page, "light");
    await expect(page).toHaveScreenshot("landing-page-light.png");

    // 2. Força e valida o tema Dark
    await setPageTheme(page, "dark");
    await expect(page).toHaveScreenshot("landing-page-dark.png");
  });

  test("deve renderizar o Playground nos temas Dark e Light sem regressões visuais", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // 1. Força e valida o tema Light
    await setPageTheme(page, "light");
    await expect(page).toHaveScreenshot("playground-light.png");

    // 2. Força e valida o tema Dark
    await setPageTheme(page, "dark");
    await expect(page).toHaveScreenshot("playground-dark.png");
  });
});
