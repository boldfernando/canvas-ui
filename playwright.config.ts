import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ["html", { open: "never" }],
    ["list"],
    ["json", { outputFile: "playwright-report/results.json" }],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3099",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.1,
      animations: "disabled",
    },
  },
  projects: [
    {
      name: "chromium-functional",
      testMatch: /.*(dom-canvas-fallback|registry-cli|webapp-playground).spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--use-gl=angle",
            "--use-angle=default",
            "--ignore-gpu-blocklist",
            "--enable-zero-copy",
            "--enable-gpu-rasterization",
            "--no-sandbox",
          ],
        },
      },
    },
    {
      name: "chromium-visual",
      testMatch: /.*visual-regression.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--use-gl=angle",
            "--use-angle=default",
            "--ignore-gpu-blocklist",
            "--enable-zero-copy",
            "--enable-gpu-rasterization",
            "--no-sandbox",
          ],
        },
      },
    },
    {
      name: "chromium-perf",
      testMatch: /.*performance-fps-memory.spec.ts/,
      fullyParallel: false,
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--use-gl=angle",
            "--use-angle=default",
            "--ignore-gpu-blocklist",
            "--enable-zero-copy",
            "--enable-gpu-rasterization",
            "--no-sandbox",
          ],
        },
      },
    },
    {
      name: "chromium-accessibility",
      testMatch: /.*accessibility.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox-fallback",
      testMatch: /.*(dom-canvas-fallback|registry-cli|webapp-playground).spec.ts/,
      use: {
        ...devices["Desktop Firefox"],
      },
    },
  ],
  webServer: {
    command: process.env.CI ? "npx serve out -p 3099" : "npm run build && npx serve out -p 3099",
    url: "http://localhost:3099",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
