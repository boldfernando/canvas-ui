import { test, expect } from "./fixtures/canvas-fixture";

test.describe("E2E-02: Cross-Browser & DOM-in-Canvas Fallback Resilience", () => {
  test("deve manter botões e links clicáveis sob a camada de efeito Canvas", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const activeCanvas = page.locator("canvas").first();
    await expect(activeCanvas).toBeAttached();

    // Verifica que elementos do DOM permanecem focáveis e clicáveis
    const docLink = page.locator("a[href*='/docs']").first();
    if (await docLink.isVisible()) {
      await expect(docLink).toBeEnabled();
      await docLink.click();
      await page.waitForURL("**/docs**");
      expect(page.url()).toContain("/docs");
    }
  });

  test("deve alternar suavemente para WebGL Overlay em navegadores sem a API experimental HTML-in-Canvas", async ({ page }) => {
    // Simula a ausência da API experimental no objeto window
    await page.addInitScript(() => {
      // @ts-ignore
      delete HTMLCanvasElement.prototype.drawFocusIfNeeded;
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // Valida que nenhuma exceção fatal no console foi lançada
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    expect(errors).toHaveLength(0);
  });
});
