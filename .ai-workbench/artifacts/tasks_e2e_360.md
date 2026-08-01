# Canvas UI: Backlog Canônico de Tasks E2E 360°

> **Projeto:** Canvas UI  
> **Repositório:** `boldfernando/canvas-ui`  
> **Versão do backlog:** 3.0 auditável  
> **Status global:** 🟡 `AMBER`  
> **Objetivo:** transformar a cobertura E2E existente em um sistema reproduzível, rastreável e capaz de provar o Green Status por commit.

---

## 1. Diagnóstico atual

A infraestrutura inicial já existe:

* scripts para Playwright, Registry e consumidor CLI;
* projetos Playwright separados para funcional, visual, performance e Firefox fallback;
* servidor E2E configurado na porta `3099`;
* pipeline com lint, typecheck, registry, build e quatro shards;
* testes iniciais de tema, fallback, Registry, performance, memória e Playground.

Porém, a implementação atual ainda não comprova cobertura 360°:

* a regressão visual cobre apenas Landing Page e Playground, não todo o inventário de componentes;
* o fallback ainda é inferido por `drawFocusIfNeeded`, que não representa uma capability real da aplicação;
* o teste de Registry HTTP não instala realmente um componente pelo CLI;
* o teste de URL não altera nem valida parâmetros da URL;
* a troca de framework é opcional e pode passar sem executar nenhuma ação;
* o benchmark possui valores sintéticos de sucesso quando nenhuma amostra de frame é coletada;
* a memória cobre somente JS Heap, três ciclos de navegação e nenhum recurso GPU;
* o CI executa build novamente em cada shard e não consolida os relatórios;
* não existe Green Gate final nem Evidence Pack unificado;
* o arquivo de estado da conversa foi versionado e os artefatos apresentam sinais de codificação corrompida;
* não há execução remota de CI comprovada para o commit atual auditado.

### Status canônicos

| Status              | Significado                                  |
| ------------------- | -------------------------------------------- |
| `PLANNED`           | Escopo e aceite documentados                 |
| `IMPLEMENTED`       | Código presente e revisável                  |
| `LOCALLY_VERIFIED`  | Execução reproduzida localmente              |
| `CI_VERIFIED`       | Pipeline verde no mesmo commit               |
| `EVIDENCE_ATTACHED` | Reports, logs, traces e screenshots anexados |
| `ACCEPTED`          | Todos os critérios comprovados               |
| `BLOCKED`           | Existe impedimento registrado                |

Nenhuma task deve saltar diretamente de `IMPLEMENTED` para `ACCEPTED`.

---

# EPIC 0: Verdade operacional, baseline e governança

## TSK-E2E-000: Capturar baseline canônico
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-001: Corrigir higiene do `.ai-workbench`
**Prioridade:** P0 | **Status:** `IMPLEMENTED_WITH_DEFECT`

## TSK-E2E-002: Corrigir encoding dos artefatos Markdown
**Prioridade:** P0 | **Status:** `BLOCKED_BY_ENCODING`

## TSK-E2E-003: Criar manifesto de evidências
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-004: Implementar máquina de estados do Green Status
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-005: Criar matriz de rastreabilidade
**Prioridade:** P0 | **Status:** `PLANNED`

---

# EPIC 1: Runtime Playwright e ambientes determinísticos

## TSK-E2E-010: Executar E2E contra build de produção
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-011: Criar projetos Playwright especializados
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-012: Isolar performance e memória
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-013: Fixar propriedades do ambiente visual
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-014: Instrumentar renderer gráfico
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-015: Criar health check do servidor E2E
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 2: CI/CD, sharding e Evidence Pack

## TSK-E2E-020: Produzir build único reutilizável
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-021: Aplicar sharding somente à suíte funcional
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-022: Consolidar Blob Reports
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-023: Publicar artefatos mesmo em falha
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-024: Implementar Green Gate final
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-025: Fortalecer cache do Playwright
**Prioridade:** P1 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-026: Configurar proteção da branch
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-027: Criar resumo executivo do workflow
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 3: Regressão visual completa

## TSK-E2E-030: Inventariar todos os componentes visuais
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-031: Criar Visual Test Harness
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-032: Gerar baselines por matriz visual
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-033: Tornar animações determinísticas
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-034: Substituir threshold global de 8%
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-035: Cobrir estados funcionais visuais
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-036: Criar governança de snapshots
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 4: Fallback, Canvas e resiliência WebGL

## TSK-E2E-040: Criar adapter real de capability
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-041: Validar interatividade sob Canvas
**Prioridade:** P1 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-042: Tornar context loss obrigatório e explícito
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-043: Verificar recuperação gráfica real
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-044: Capturar erros antes da navegação
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-045: Testar degradação total
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 5: Registry, CLI e consumidores

## TSK-E2E-050: Versionar schema do Registry
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-051: Validar todos os endpoints HTTP
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-052: Executar instalação real via CLI
**Prioridade:** P0 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-053: Validar imports e aliases do consumidor
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-054: Criar seis fixtures de framework (React, Vue, Svelte, Solid, Preact, Vanilla)
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-055: Validar paridade de contratos
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-056: Auditar package metadata
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 6: Playground, rotas e estado

## TSK-E2E-060: Cobrir rotas críticas
**Prioridade:** P1 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-061: Validar alteração real da URL
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-062: Validar parâmetros inválidos
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-063: Validar snippets de código
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-064: Validar clipboard
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-065: Validar persistência de tema
**Prioridade:** P1 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-066: Detectar hydration mismatch
**Prioridade:** P0 | **Status:** `PLANNED`

---

# EPIC 7: Acessibilidade

## TSK-E2E-070: Integrar `@axe-core/playwright`
**Prioridade:** P0 | **Status:** `NOT_IMPLEMENTED`

## TSK-E2E-071: Testar navegação por teclado
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-072: Validar foco visível
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-073: Auditar árvore acessível
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-074: Validar contraste nos dois temas
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-075: Testar `prefers-reduced-motion`
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-076: Testar aplicação sem Canvas
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 8: Performance e frame budget

## TSK-E2E-080: Remover métricas sintéticas de sucesso
**Prioridade:** P0 | **Status:** `DEFECT_CONFIRMED`

## TSK-E2E-081: Criar warm-up e janela de medição
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-082: Ampliar métricas (P50, P75, P95, P99)
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-083: Criar cenários de carga
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-084: Calibrar budgets por classe de runner
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-085: Criar histórico de regressão
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 9: Memória, DOM e recursos GPU

## TSK-E2E-090: Criar lifecycle stress test
**Prioridade:** P0 | **Status:** `REWORK_REQUIRED`

## TSK-E2E-091: Instrumentar recursos WebGL
**Prioridade:** P0 | **Status:** `NOT_IMPLEMENTED`

## TSK-E2E-092: Instrumentar recursos JavaScript e DOM
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-093: Validar descarte explícito
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-094: Criar assertions por browser
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-095: Avaliar tendência, não zero absoluto
**Prioridade:** P0 | **Status:** `PLANNED`

---

# EPIC 10: Console, rede e falhas silenciosas

## TSK-E2E-100: Criar fixture global de erros
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-101: Criar allowlist mínima
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-102: Validar assets críticos
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-103: Criar relatório de rede
**Prioridade:** P1 | **Status:** `PLANNED`

---

# EPIC 11: Flakiness e confiabilidade

## TSK-E2E-110: Medir flakiness por teste
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-111: Criar quarantine formal
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-112: Executar estabilidade programada
**Prioridade:** P1 | **Status:** `PLANNED`

## TSK-E2E-113: Definir SLOs da suíte
**Prioridade:** P2 | **Status:** `PLANNED`

---

# EPIC 12: Segurança e integridade dos artefatos do agente

## TSK-E2E-120: Bloquear estado operacional no Git
**Prioridade:** P0 | **Status:** `DEFECT_CONFIRMED`

## TSK-E2E-121: Implementar scanner de segredos
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-122: Adicionar hashes aos clones Markdown
**Prioridade:** P1 | **Status:** `PARTIALLY_IMPLEMENTED`

## TSK-E2E-123: Redigir IDs de conversa
**Prioridade:** P0 | **Status:** `PLANNED`

## TSK-E2E-124: Definir retenção dos artefatos
**Prioridade:** P1 | **Status:** `PLANNED`

---

# 13. Sequência de execução recomendada

## NOW: tornar a base verdadeira
1. TSK-E2E-000: baseline canônico.
2. TSK-E2E-001: remover `.state` do Git.
3. TSK-E2E-002: corrigir encoding.
4. TSK-E2E-003: manifesto de evidências.
5. TSK-E2E-010: usar build de produção.
6. TSK-E2E-012: isolar performance e memória.
7. TSK-E2E-020: build único.
8. TSK-E2E-021: sharding funcional.
9. TSK-E2E-022: merge reports.
10. TSK-E2E-024: Green Gate.
11. TSK-E2E-034: remover threshold visual global de 8%.
12. TSK-E2E-040: capability adapter.
13. TSK-E2E-044: captura global de erros.
14. TSK-E2E-080: remover FPS sintético.
15. TSK-E2E-120: bloquear estado operacional.

---

# 14. Definition of Done por task

Uma task só recebe `ACCEPTED` quando:
* código versionado;
* teste automatizado;
* execução local reproduzida;
* CI verde no mesmo SHA;
* evidências anexadas;
* nenhum skip relevante;
* nenhuma assertion opcional;
* documentação atualizada;
* owner identificado;
* status registrado no manifesto.

---

# 15. Definition of Green global

O programa recebe `GREEN` somente quando:
* todos os P0 estão `ACCEPTED`;
* o CI está vinculado ao SHA avaliado;
* build de produção foi testado;
* reports dos shards foram consolidados;
* Registry foi consumido por aplicação limpa;
* componentes visuais possuem inventário e cobertura;
* Dark e Light possuem baselines aprovadas;
* acessibilidade crítica está limpa;
* context loss possui recuperação funcional;
* FPS não utiliza resultado sintético;
* memória inclui recursos GPU e lifecycle;
* Evidence Pack está completo;
* `.ai-workbench` não expõe estado operacional;
* os artefatos estão íntegros e em UTF-8.

Até lá:

> 🟡 **AMBER: infraestrutura implementada, cobertura parcial e evidências incompletas.**
