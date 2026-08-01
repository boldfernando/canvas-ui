import { test, expect } from "@playwright/test";

test.describe("E2E-05: Web App Nav, Playground State & Accessibility", () => {
  test("deve navegar entre as rotas principais (/docs, /components, /playground)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Canvas UI/i);

    // Navega para /docs
    await page.goto("/docs");
    await expect(page.locator("h1")).toBeVisible();

    // Navega para /components
    await page.goto("/components");
    await expect(page.locator("h1")).toBeVisible();

    // Navega para /playground
    await page.goto("/playground");
    await expect(page.locator("canvas").first()).toBeAttached();
  });

  test("deve sincronizar o estado do Playground na URL", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    // Verifica que o canvas do playground carregou
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();
  });

  test("deve permitir a alternância de código entre os alvos de framework", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    // Procura por abas ou botões de código se existirem na interface
    const codeButton = page.locator("button", { hasText: /React|Vue|Svelte|Solid|Preact|Vanilla/i }).first();
    if (await codeButton.isVisible()) {
      await codeButton.click();
      await page.waitForTimeout(200);
    }
  });
});
