import { test, expect } from "@playwright/test";

test.describe("E2E-03: Multi-Framework Registry & CLI Integrity", () => {
  test("deve servir o endpoint do registro principal public/r/registry.json com HTTP 200", async ({ request }) => {
    const response = await request.get("/r/registry.json");
    expect(response.status()).toBe(200);

    const registry = await response.json();
    expect(registry.name).toBe("canvasui");
    expect(Array.isArray(registry.items)).toBe(true);
    expect(registry.items.length).toBeGreaterThan(0);
  });

  test("deve servir arquivos de componentes individuais no registro (ex: liquid.json)", async ({ request }) => {
    const registryRes = await request.get("/r/registry.json");
    const registry = await registryRes.json();
    const firstItem = registry.items[0];

    const itemRes = await request.get(`/r/${firstItem.name}.json`);
    expect(itemRes.status()).toBe(200);

    const itemData = await itemRes.json();
    expect(itemData.name).toBe(firstItem.name);
    expect(Array.isArray(itemData.files)).toBe(true);
    expect(itemData.files.length).toBeGreaterThan(0);
  });
});
