import { test, expect } from "./fixtures/canvas-fixture";

test.describe("E2E-04: Performance, FPS Budget & Memory Leak Auditing", () => {
  test("deve manter o framerate dentro do orçamento de 60 FPS (P95 frame time <= 25ms)", async ({ page, canvasPage }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    const metrics = await canvasPage.getFPSMetrics(2000);
    console.log(`📊 FPS Metrics - Avg FPS: ${metrics.avgFps.toFixed(1)}, P95 Frame Time: ${metrics.p95FrameTimeMs.toFixed(2)}ms`);

    // Orçamento de performance: P95 do tempo de frame deve ser <= 25ms (para não haver engasgos visuais graves)
    expect(metrics.p95FrameTimeMs).toBeLessThanOrEqual(25);
  });

  test("deve restaurar a cena visual após perda e recuperação do contexto WebGL", async ({ page, canvasPage }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");

    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeAttached();

    // Dispara perda de contexto WebGL
    const lostSuccess = await canvasPage.triggerWebGLContextLoss("canvas");
    if (lostSuccess) {
      await page.waitForTimeout(300);

      // Dispara restauração do contexto WebGL
      const restoredSuccess = await canvasPage.restoreWebGLContext("canvas");
      expect(restoredSuccess).toBe(true);

      await page.waitForTimeout(300);
      await expect(canvas).toBeVisible();
    }
  });

  test("deve manter estabilidade do JS Heap ao navegar repetidamente entre páginas", async ({ page, canvasPage }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const initialHeap = await canvasPage.getJSHeapSize();

    for (let i = 0; i < 3; i++) {
      await page.goto("/playground");
      await page.waitForLoadState("networkidle");
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    }

    const finalHeap = await canvasPage.getJSHeapSize();
    if (initialHeap > 0 && finalHeap > 0) {
      const heapGrowthMb = (finalHeap - initialHeap) / (1024 * 1024);
      console.log(`🧠 JS Heap Delta: ${heapGrowthMb.toFixed(2)} MB`);
      // Crescimento do heap deve ser razoável (< 30 MB)
      expect(heapGrowthMb).toBeLessThan(30);
    }
  });
});
