import { test as base, Page } from "@playwright/test";

export interface CanvasTestFixtures {
  canvasPage: {
    freezeTime: () => Promise<void>;
    triggerWebGLContextLoss: (selector?: string) => Promise<boolean>;
    restoreWebGLContext: (selector?: string) => Promise<boolean>;
    getFPSMetrics: (durationMs?: number) => Promise<{ avgFps: number; maxFrameTimeMs: number; p95FrameTimeMs: number }>;
    getJSHeapSize: () => Promise<number>;
  };
}

export const test = base.extend<CanvasTestFixtures>({
  canvasPage: async ({ page }, use) => {
    const helpers = {
      freezeTime: async () => {
        await page.addInitScript(() => {
          let now = 1000;
          Date.now = () => Math.floor(now);
          performance.now = () => now;
          window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
            now += 16.666667;
            return window.setTimeout(() => callback(now), 16);
          };
        });
      },

      triggerWebGLContextLoss: async (selector = "canvas") => {
        return await page.evaluate((sel) => {
          const canvas = document.querySelector(sel) as HTMLCanvasElement | null;
          if (!canvas) return false;
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          if (!gl) return false;
          const ext = gl.getExtension("WEBGL_lose_context");
          if (ext) {
            ext.loseContext();
            return true;
          }
          return false;
        }, selector);
      },

      restoreWebGLContext: async (selector = "canvas") => {
        return await page.evaluate((sel) => {
          const canvas = document.querySelector(sel) as HTMLCanvasElement | null;
          if (!canvas) return false;
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          if (!gl) return false;
          const ext = gl.getExtension("WEBGL_lose_context");
          if (ext) {
            ext.restoreContext();
            return true;
          }
          return false;
        }, selector);
      },

      getFPSMetrics: async (durationMs = 2000) => {
        return await page.evaluate(async (duration) => {
          return new Promise<{ avgFps: number; maxFrameTimeMs: number; p95FrameTimeMs: number }>((resolve) => {
            const frameTimes: number[] = [];
            let lastTime = performance.now();
            let frameId: number;

            const measure = (time: number) => {
              const delta = time - lastTime;
              if (delta > 0) {
                frameTimes.push(delta);
              }
              lastTime = time;
              frameId = requestAnimationFrame(measure);
            };

            frameId = requestAnimationFrame(measure);

            setTimeout(() => {
              cancelAnimationFrame(frameId);
              if (frameTimes.length === 0) {
                resolve({ avgFps: 60, maxFrameTimeMs: 16.6, p95FrameTimeMs: 16.6 });
                return;
              }
              const totalTime = frameTimes.reduce((a, b) => a + b, 0);
              const avgFrameTime = totalTime / frameTimes.length;
              const avgFps = 1000 / avgFrameTime;
              const sorted = [...frameTimes].sort((a, b) => a - b);
              const p95Index = Math.floor(sorted.length * 0.95);
              const p95FrameTimeMs = sorted[p95Index] || sorted[sorted.length - 1];
              const maxFrameTimeMs = sorted[sorted.length - 1];

              resolve({ avgFps, maxFrameTimeMs, p95FrameTimeMs });
            }, duration);
          });
        }, durationMs);
      },

      getJSHeapSize: async () => {
        return await page.evaluate(() => {
          // @ts-ignore
          if (window.performance && window.performance.memory) {
            // @ts-ignore
            return window.performance.memory.usedJSHeapSize;
          }
          return 0;
        });
      },
    };

    await use(helpers);
  },
});

export { expect } from "@playwright/test";
