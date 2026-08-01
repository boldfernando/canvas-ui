import fs from "node:fs";
import path from "node:path";
import { REGISTRY_ITEMS } from "../src/lib/registry.ts";

const PUBLIC_R_DIR = path.join(process.cwd(), "public/r");

console.log("🔍 Iniciando Validação E2E do Registry de Componentes...");

if (!fs.existsSync(PUBLIC_R_DIR)) {
  console.error("❌ Diretório public/r não encontrado. Execute 'npm run registry' antes de validar.");
  process.exit(1);
}

const mainRegistryPath = path.join(PUBLIC_R_DIR, "registry.json");
if (!fs.existsSync(mainRegistryPath)) {
  console.error("❌ Arquivo public/r/registry.json não encontrado.");
  process.exit(1);
}

const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, "utf-8"));
if (!mainRegistry.name || !Array.isArray(mainRegistry.items)) {
  console.error("❌ Formato inválido no registry.json principal.");
  process.exit(1);
}

console.log(`✅ Registro Principal Encontrado (${mainRegistry.items.length} itens registrados)`);

let errorsCount = 0;

for (const name of REGISTRY_ITEMS) {
  const itemPath = path.join(PUBLIC_R_DIR, `${name}.json`);
  if (!fs.existsSync(itemPath)) {
    console.error(`❌ Item do registry ausente no disco: public/r/${name}.json`);
    errorsCount++;
    continue;
  }

  try {
    const itemContent = JSON.parse(fs.readFileSync(itemPath, "utf-8"));

    if (itemContent.name !== name) {
      console.error(`❌ Mismatch de nome em public/r/${name}.json: ${itemContent.name} !== ${name}`);
      errorsCount++;
    }

    if (!Array.isArray(itemContent.files) || itemContent.files.length === 0) {
      console.error(`❌ Item public/r/${name}.json não possui arquivos associados.`);
      errorsCount++;
    } else {
      for (const file of itemContent.files) {
        if (!file.path || !file.content) {
          console.error(`❌ Arquivo malformado em public/r/${name}.json: ${file.path}`);
          errorsCount++;
        }
      }
    }
  } catch (err) {
    console.error(`❌ Erro ao analisar o JSON do item public/r/${name}.json:`, err);
    errorsCount++;
  }
}

if (errorsCount > 0) {
  console.error(`❌ Validação E2E do Registry falhou com ${errorsCount} erros.`);
  process.exit(1);
}

console.log(`✨ Validação E2E do Registry Concluída com Sucesso! (${REGISTRY_ITEMS.length}/${REGISTRY_ITEMS.length} itens totalmente válidos)`);
