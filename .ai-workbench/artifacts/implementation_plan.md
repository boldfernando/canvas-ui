# 🛠️ Plano de Implementação: Cobertura 360° End-to-End (E2E) em Máxima Performance

Este plano detalha a implementação completa da infraestrutura de testes 360° E2E para o projeto **Canvas UI**, cobrindo desde a renderização gráfica Canvas/WebGL, fallbacks de navegador, CLI de registro multi-framework, até a auditoria de performance de FPS e vazamento de memória.

---

## ⚠️ User Review Required

> [!IMPORTANT]
> **Adição de Dependência Dev:**  
> Será adicionado `@playwright/test` ao `package.json` para orquestração E2E headless com aceleração WebGL habilitada.
>
> **Script de Validação E2E do Registry:**  
> Será criado um script autônomo `scripts/test-registry-e2e.mts` para validar a emissão de JSONs do `shadcn` registry e garantir que os componentes gerados podem ser instalados sem falhas de importação ou tipagem.

---

## ❓ Open Questions

1. **Snapshots Iniciais de Regressão Visual:**  
   Gostaria que gerássemos os snapshots visuais de referência (`--update-snapshots`) localmente na primeira execução dos testes Playwright, ou prefere apenas configurar o pipeline e fixtures determinísticos?

---

## 🎯 Proposed Changes

### Core Test Setup & Infrastructure

#### [MODIFY] [package.json](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/package.json)
- Adicionar `@playwright/test` às `devDependencies`.
- Adicionar scripts de teste: `"test:e2e"`, `"test:e2e:ui"`, `"test:e2e:debug"`, `"test:registry"`.

#### [NEW] [playwright.config.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/playwright.config.ts)
- Configuração do Playwright com webServer (`npm run dev`), flags Chromium para aceleração WebGL (`--use-gl=angle`, `--ignore-gpu-blocklist`), suporte a sharding e snapshot matching.

#### [NEW] [e2e/fixtures/canvas-fixture.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/e2e/fixtures/canvas-fixture.ts)
- Fixture customizada para controlar o relógio de animação (`requestAnimationFrame`), capturar métricas de `PerformanceObserver` (frame delta), injetar perda de contexto WebGL (`WEBGL_lose_context`), e medir variação do JS Heap.

---

### E2E Test Suites (360° Coverage)

#### [NEW] [e2e/01-visual-regression.spec.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/e2e/01-visual-regression.spec.ts)
- Testes de regressão visual para os componentes de canvas no Playground e landing page com congelamento de tempo determinístico.

#### [NEW] [e2e/02-dom-canvas-fallback.spec.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/e2e/02-dom-canvas-fallback.spec.ts)
- Validação do caminho de renderização `HTML-in-Canvas` e fallback WebGL overlay em navegadores com e sem a API experimental.

#### [NEW] [e2e/03-registry-cli.spec.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/e2e/03-registry-cli.spec.ts)
- Teste E2E da integridade do arquivo `public/r/registry.json` e verificação da estrutura de componentes gerados pelo script de build.

#### [NEW] [e2e/04-performance-fps-memory.spec.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/e2e/04-performance-fps-memory.spec.ts)
- Teste de orçamento de framerate (garantindo delta time <= 20ms) e teste de montagem/desmontagem 50x para prevenir vazamentos de textura/GPU.

#### [NEW] [e2e/05-webapp-playground.spec.ts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/e2e/05-webapp-playground.spec.ts)
- Validação das rotas `/playground`, `/docs`, `/components`, sincronização de parâmetros URL com `nuqs` e troca de código entre frameworks.

#### [NEW] [scripts/test-registry-e2e.mts](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/scripts/test-registry-e2e.mts)
- Script autônomo em TypeScript para inspecionar e validar todos os esquema de arquivos JSON do registry em `public/r/`.

---

### CI/CD Pipeline Update

#### [MODIFY] [.github/workflows/ci.yml](file:///c:/Users/fjuni/Documents/GitHub/Jules-halls/canvas-ui/.github/workflows/ci.yml)
- Atualizar o pipeline para incluir sharding de 4 workers em paralelo para os testes Playwright, download de navegadores Playwright com cache e upload de relatórios em caso de falha.

---

## 🧪 Verification Plan

### Automated Tests
- Executar `npm run registry` e validar geração do schema em `public/r/`.
- Executar `npm run test:registry` para verificação de schema dos 33+ componentes.
- Executar `npm run test:e2e` para rodar toda a suíte Playwright 360° em ambiente headless.
- Executar `npx tsc --noEmit` e `npm run lint` para garantir zero erros de tipagem/linter.

### Manual Verification
- Visualizar os relatórios do Playwright (`npx playwright show-report`) para checar a precisão das screenshots de regressão visual.
