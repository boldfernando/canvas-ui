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
      await page.waitForFunction(
        (expected) => (expected === "dark" ? document.documentElement.classList.contains("dark") : !document.documentElement.classList.contains("dark")),
        targetTheme
      );
      await page.waitForTimeout(500);
    }
  }
}

test.describe("E2E-01: Visual Regression & Canvas WebGL Snapshot Testing", () => {
  test.beforeEach(async ({ canvasPage }) => {
    await canvasPage.freezeTime();
  });

  test("deve renderizar a Landing Page no tema Light sem regressões visuais", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvases = page.locator("canvas");
    await expect(canvases.first()).toBeAttached();

    await setPageTheme(page, "light");
    await expect(page).toHaveScreenshot("landing-page-light.png", { mask: [canvases] });
  });

  test("deve renderizar a Landing Page no tema Dark sem regressões visuais", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvases = page.locator("canvas");
    await expect(canvases.first()).toBeAttached();

    await setPageTheme(page, "dark");
    await expect(page).toHaveScreenshot("landing-page-dark.png", { mask: [canvases], maxDiffPixelRatio: 0.08 });
  });

  test("deve renderizar o Playground no tema Light sem regressões visuais", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvases = page.locator("canvas");
    await expect(canvases.first()).toBeAttached();

    await setPageTheme(page, "light");
    await expect(page).toHaveScreenshot("playground-light.png", { mask: [canvases] });
  });

  test("deve renderizar o Playground no tema Dark sem regressões visuais", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvases = page.locator("canvas");
    await expect(canvases.first()).toBeAttached();

    await setPageTheme(page, "dark");
    await expect(page).toHaveScreenshot("playground-dark.png", { mask: [canvases] });
  });
});
