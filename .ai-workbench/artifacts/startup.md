# 🚀 Startup Artifact: Workspace & AI Workbench Inicializado

> **Projeto:** Canvas UI (`canvasui.dev`)  
> **Modelo Configurado:** `gemini-3.6-flash-high`  
> **Ambiente:** Google Antigravity CLI & PowerShell AI Workbench  
> **Data de Inicialização:** 2026-08-01

---

## 🛠️ 1. Configuração do AI Workbench (`.ai-workbench`)

O projeto foi configurado com a estrutura oficial do Google Antigravity Workbench:

- 📂 **`.ai-workbench/artifacts/`**: Relatórios, planos de execução e documentação persistente do projeto.
- 📂 **`.ai-workbench/scratch/`**: Experimentos temporários, investigações e logs de debug.
- 📂 **`.ai-workbench/scripts/`**: Scripts auxiliares e ferramentas de automação.

### 📜 Alias e Comandos PowerShell Registrados
- **`agyh`** (`Start-AntigravityHigh`): Executa o Antigravity CLI com o modelo `gemini-3.6-flash-high` e adiciona `--effort high` automaticamente em execuções headless (`-p`, `--print`, `--prompt`).

---

## 💻 2. Metadados do Repositório & Pilha Tecnológica

- **Projeto:** Canvas UI
- **Tecnologias Core:** Next.js 16.2 (Turbopack, App Router), React 19, TypeScript 5, Tailwind CSS v4.
- **Engine Gráfica & Componentes:** Three.js, HTML-in-Canvas, WebGL Overlays, Motion, Base UI, Geist Font.
- **Ecossistema Multi-Framework:** Registro `shadcn` integrado com suporte a 6 alvos (React, Vue, Svelte, Solid, Preact, Vanilla JS).
- **Alocação de Portas:**
  - 🌐 Dev Server (`npm run dev`): `http://localhost:3001` (ou `3000`).
  - 🧪 Playwright E2E Test Server: `http://localhost:3099`.

---

## 🧪 3. Matriz de Cobertura E2E 360° (Auditada 2.0)

- **Suíte de Testes Playwright (24/24 Aprovados em 19.4s):**
  - `chromium-functional`: Navegação Next.js, sincronização de URL (`nuqs`), alternância de código multi-framework.
  - `chromium-visual`: Snapshots visuais determinísticos em **Light Theme** e **Dark Theme** com verificação explícita da classe `html.dark`.
  - `chromium-perf`: Telemetria de 60 FPS (Avg 60.0 FPS, P95 16.8ms), recovery WebGL pós-perda de contexto (`WEBGL_lose_context`) e profiling de JS Heap (`Delta = 0.00 MB`).
  - `firefox-fallback`: Validação cross-browser e resiliência do DOM sobre o canvas.

- **Validação do Registry CLI (198/198 Itens Aprovados):**
  - Script autônomo `scripts/test-registry-e2e.mts` (validação de schemas JSON).
  - Script consumidor `scripts/test-cli-consumer-e2e.mts` (instalação e verificação de importações TypeScript em ambiente limpo `os.tmpdir()`).

- **Quality Gates:**
  - `npm run lint`: **0 erros / 0 avisos no ESLint**.
  - `npm run build`: **43 páginas estáticas geradas com sucesso**.

---

## 🎯 4. Próximas Ações e Guia de Execução

- **Para iniciar desenvolvimento:** `npm run dev`
- **Para executar a suíte E2E completa:** `npm run test:e2e`
- **Para abrir a UI interativa do Playwright:** `npm run test:e2e:ui`
- **Para validar o registry CLI:** `npm run test:registry` && `npm run test:cli-consumer`
- **Para chamar o Antigravity com raciocínio elevado:** `agyh -p "Seu prompt aqui"`
