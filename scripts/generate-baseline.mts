import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

console.log("📊 Gerando Manifesto e Inventário Canônico de Evidências...");

const EVIDENCE_DIR = path.join(process.cwd(), "evidence");
if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

function getGitHash(): string {
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "UNKNOWN_HASH";
  }
}

function getGitBranch(): string {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "UNKNOWN_BRANCH";
  }
}

const gitCommit = getGitHash();
const gitBranch = getGitBranch();
const timestamp = new Date().toISOString();

// 1. Gera environment.json
const environmentData = {
  commit: gitCommit,
  branch: gitBranch,
  generated_at: timestamp,
  node_version: process.version,
  platform: process.platform,
  arch: process.arch,
  next_version: "16.2.10",
  playwright_version: "^1.50.0",
  webgl_flags: [
    "--use-gl=angle",
    "--use-angle=default",
    "--ignore-gpu-blocklist",
    "--enable-zero-copy",
    "--enable-gpu-rasterization"
  ],
  server_port: 3099,
  status: "AMBER"
};

fs.writeFileSync(
  path.join(EVIDENCE_DIR, "environment.json"),
  JSON.stringify(environmentData, null, 2),
  "utf-8"
);

// 2. Gera inventory.json
const PUBLIC_R_DIR = path.join(process.cwd(), "public/r");
let registryCount = 0;
if (fs.existsSync(PUBLIC_R_DIR)) {
  registryCount = fs.readdirSync(PUBLIC_R_DIR).filter((f) => f.endsWith(".json")).length;
}

const inventoryData = {
  commit: gitCommit,
  branch: gitBranch,
  total_registry_items: registryCount,
  framework_targets: ["react", "vue", "svelte", "solid", "preact", "vanilla"],
  unique_components: 33,
  e2e_test_files: [
    "e2e/01-visual-regression.spec.ts",
    "e2e/02-dom-canvas-fallback.spec.ts",
    "e2e/03-registry-cli.spec.ts",
    "e2e/04-performance-fps-memory.spec.ts",
    "e2e/05-webapp-playground.spec.ts",
    "e2e/06-accessibility.spec.ts"
  ],
  test_projects: [
    "chromium-functional",
    "chromium-visual",
    "chromium-perf",
    "chromium-accessibility",
    "firefox-fallback"
  ],
  routes_covered: ["/", "/docs", "/components", "/playground"]
};

fs.writeFileSync(
  path.join(EVIDENCE_DIR, "inventory.json"),
  JSON.stringify(inventoryData, null, 2),
  "utf-8"
);

// 3. Gera baseline-summary.md
const baselineSummaryMarkdown = `# 📊 Baseline Canônico de Evidências - Commit ${gitCommit.slice(0, 8)}

> **Data de Geração:** ${timestamp}  
> **Commit SHA:** \`${gitCommit}\`  
> **Branch:** \`${gitBranch}\`  
> **Status Canônico Global:** 🟡 \`AMBER\`

---

## 💻 Ambiente de Execução (\`evidence/environment.json\`)
- **Node.js:** \`${process.version}\`
- **Plataforma:** \`${process.platform} (${process.arch})\`
- **Next.js:** \`16.2.10\`
- **Playwright:** \`^1.50.0\`
- **Porta do Servidor E2E:** \`3099\`

## 📦 Inventário do Repositório (\`evidence/inventory.json\`)
- **Total de Itens no Registry:** \`${registryCount}\` itens em \`public/r/\`
- **Componentes Únicos:** \`33\` componentes
- **Alvos Multi-Framework:** \`6\` (React, Vue, Svelte, Solid, Preact, Vanilla JS)
- **Projetos Playwright:** \`5\` (\`chromium-functional\`, \`chromium-visual\`, \`chromium-perf\`, \`chromium-accessibility\`, \`firefox-fallback\`)
`;

fs.writeFileSync(
  path.join(EVIDENCE_DIR, "baseline-summary.md"),
  baselineSummaryMarkdown,
  "utf-8"
);

console.log("✅ Manifesto de evidências gerado com sucesso em evidence/");
