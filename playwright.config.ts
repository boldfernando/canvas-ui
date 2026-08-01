import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ["html", { open: "never" }],
    ["list"]
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3099",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.08,
      threshold: 0.2,
      animations: "disabled",
    },
  },
  projects: [
    {
      name: "chromium-webgl",
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
      name: "firefox-fallback",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
  ],
  webServer: {
    command: "npx next dev -p 3099",
    url: "http://localhost:3099",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
