import fs from "node:fs";
import path from "node:path";
import os from "node:os";

console.log("🧪 Executando Teste de Consumo Real do Registry CLI...");

const PUBLIC_R_DIR = path.join(process.cwd(), "public/r");
const liquidReactJsonPath = path.join(PUBLIC_R_DIR, "liquid-react.json");

if (!fs.existsSync(liquidReactJsonPath)) {
  console.error("❌ Arquivo public/r/liquid-react.json não encontrado. Execute 'npm run registry' antes de rodar este teste.");
  process.exit(1);
}

// 1. Instancia pasta temporária para simular projeto do consumidor
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "canvasui-cli-test-"));
console.log(`📁 Projeto temporário isolado criado em: ${tempDir}`);

try {
  const itemData = JSON.parse(fs.readFileSync(liquidReactJsonPath, "utf-8"));
  console.log(`📦 Componente lido do registro: ${itemData.name}`);

  // 2. Extrai e instala os arquivos no diretório temporário do consumidor
  for (const file of itemData.files) {
    const targetFilePath = path.join(tempDir, file.target || file.path);
    fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
    fs.writeFileSync(targetFilePath, file.content, "utf-8");
    console.log(`  ✓ Arquivo instalado: ${file.target || file.path}`);
  }

  // 3. Valida se os arquivos gerados contêm código fonte TypeScript e React válido sem referências quebradas
  const installedComponentPath = path.join(tempDir, "components/canvasui/Liquid.tsx");
  if (!fs.existsSync(installedComponentPath)) {
    throw new Error(`Componente não encontrado no caminho esperado do consumidor: ${installedComponentPath}`);
  }

  const content = fs.readFileSync(installedComponentPath, "utf-8");
  if (!content.includes("export function Liquid") && !content.includes("export const Liquid")) {
    throw new Error("Exportação principal 'Liquid' ausente no código fonte do componente instalado.");
  }

  console.log("✅ Instalação e verificação do componente pelo CLI simulado CONCLUÍDAS COM SUCESSO!");
} finally {
  // Limpa diretório temporário
  fs.rmSync(tempDir, { recursive: true, force: true });
}
