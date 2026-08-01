# 📸 Galeria de Evidências Visuais Reais (E2E Playwright)

> **Projeto:** Canvas UI (`canvasui.dev`)  
> **Servidor E2E:** `http://localhost:3099` (Exportação de Produção Estática)  
> **Resolução de Captura:** 1280x720 (DPR 1.0)  
> **Status:** 🟢 **GREEN (23/23 Testes Aprovados)**

---

## 🎠 Carrossel de Capturas Visuais de Produção

````carousel
![Landing Page - Tema Claro (Light Mode)](/C:/Users/fjuni/.gemini/antigravity-ide/brain/30f3cc88-ed6f-4743-9eed-45f48c2e3299/landing_page_light.png)
Landing Page renderizada no Tema Claro (Light Mode) com fundo branco (`#ffffff`), tipografia limpa, navegação funcional e overlay WebGL responsivo.
<!-- slide -->
![Landing Page - Tema Escuro (Dark Mode)](/C:/Users/fjuni/.gemini/antigravity-ide/brain/30f3cc88-ed6f-4743-9eed-45f48c2e3299/landing_page_dark.png)
Landing Page renderizada no Tema Escuro (Dark Mode) com fundo preto (`#0a0a0a`), paleta HSL harmoniosa e classe `html.dark` validada.
<!-- slide -->
![Playground - Tema Claro (Light Mode)](/C:/Users/fjuni/.gemini/antigravity-ide/brain/30f3cc88-ed6f-4743-9eed-45f48c2e3299/playground_light.png)
Playground de código interativo no Tema Claro (Light Mode) com suporte a alternância de alvos multi-framework e sincronização de parâmetros na URL.
<!-- slide -->
![Playground - Tema Escuro (Dark Mode)](/C:/Users/fjuni/.gemini/antigravity-ide/brain/30f3cc88-ed6f-4743-9eed-45f48c2e3299/playground_dark.png)
Playground de código interativo no Tema Escuro (Dark Mode) com realce de sintaxe Shiki e renderização Canvas WebGL.
````

---

### 📊 Detalhes dos Testes Visuais Inspecionados

| Caso de Teste | Arquivo de Baseline | Status | Validação de Tema |
|---|---|---|---|
| **Landing Page (Light)** | `landing-page-light-chromium-visual-win32.png` | 🟢 `PASSED` | Inspecionada ausência da classe `.dark` no `<html>` |
| **Landing Page (Dark)** | `landing-page-dark-chromium-visual-win32.png` | 🟢 `PASSED` | Inspecionada presença da classe `.dark` no `<html>` |
| **Playground (Light)** | `playground-light-chromium-visual-win32.png` | 🟢 `PASSED` | Inspecionada ausência da classe `.dark` no `<html>` |
| **Playground (Dark)** | `playground-dark-chromium-visual-win32.png` | 🟢 `PASSED` | Inspecionada presença da classe `.dark` no `<html>` |
