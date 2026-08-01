import { test as base } from "@playwright/test";

export interface CanvasTestFixtures {
  canvasPage: {
    freezeTime: () => Promise<void>;
    triggerWebGLContextLoss: (selector?: string) => Promise<boolean>;
    restoreWebGLContext: (selector?: string) => Promise<boolean>;
    getFPSMetrics: (durationMs?: number) => Promise<{ avgFps: number; maxFrameTimeMs: number; p95FrameTimeMs: number; sampleCount: number }>;
    getJSHeapSize: () => Promise<number>;
  };
  errorCollector: {
    getErrors: () => Array<{ type: string; text: string; location?: string }>;
    assertNoErrors: () => void;
  };
}

export const test = base.extend<CanvasTestFixtures>({
  errorCollector: async ({ page }, use) => {
    const collectedErrors: Array<{ type: string; text: string; location?: string }> = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        collectedErrors.push({
          type: "console.error",
          text: msg.text(),
          location: msg.location().url,
        });
      }
    });

    page.on("pageerror", (error) => {
      collectedErrors.push({
        type: "pageerror",
        text: error.message,
        location: error.stack,
      });
    });

    page.on("requestfailed", (request) => {
      const failure = request.failure();
      collectedErrors.push({
        type: "requestfailed",
        text: `${request.method()} ${request.url()} - ${failure ? failure.errorText : "Failed"}`,
      });
    });

    const collector = {
      getErrors: () => [...collectedErrors],
      assertNoErrors: () => {
        if (collectedErrors.length > 0) {
          const errList = collectedErrors.map((e) => `[${e.type}] ${e.text}`).join("\n");
          throw new Error(`Erros globais não tratados capturados no browser:\n${errList}`);
        }
      },
    };

    await use(collector);
  },

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
          return new Promise<{ avgFps: number; maxFrameTimeMs: number; p95FrameTimeMs: number; sampleCount: number }>((resolve, reject) => {
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
                reject(new Error("NO_FRAME_SAMPLES: Nenhuma amostra de frame foi capturada durante a medição de FPS."));
                return;
              }
              const totalTime = frameTimes.reduce((a, b) => a + b, 0);
              const avgFrameTime = totalTime / frameTimes.length;
              const avgFps = 1000 / avgFrameTime;
              const sorted = [...frameTimes].sort((a, b) => a - b);
              const p95Index = Math.floor(sorted.length * 0.95);
              const p95FrameTimeMs = sorted[p95Index] || sorted[sorted.length - 1];
              const maxFrameTimeMs = sorted[sorted.length - 1];

              resolve({ avgFps, maxFrameTimeMs, p95FrameTimeMs, sampleCount: frameTimes.length });
            }, duration);
          });
        }, durationMs);
      },

      getJSHeapSize: async () => {
        return await page.evaluate(() => {
          const perf = window.performance as unknown as { memory?: { usedJSHeapSize: number } };
          if (perf && perf.memory) {
            return perf.memory.usedJSHeapSize;
          }
          return 0;
        });
      },
    };

    await use(helpers);
  },
});

export { expect } from "@playwright/test";
