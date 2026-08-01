# 🤖 AI Workbench: Google Antigravity Agent Workspace

Este diretório contém a estrutura oficial de governança, auditoria e espelhamento determinístico do **Google Antigravity AI Agent Workbench**.

---

## 📂 Estrutura de Diretórios

```text
.ai-workbench/
├── README.md               # Documentação da arquitetura do workbench
├── .gitignore              # Ignora estados temporários e logs locais
├── .state/                 # [Ignore] Estado da sessão ativa e conversation_id
├── artifacts/
│   ├── chat/               # Espelhos determinísticos Markdown gerados via agymd
│   │   ├── latest.md       # Clone binário da última resposta
│   │   └── <conv_id>/      # Histórico de respostas imutáveis por conversa
│   ├── audit_governance_report.md
│   ├── building_blocks_e2e_360.md
│   ├── e2e_360_coverage_issues.md
│   ├── implementation_plan.md
│   ├── startup.md
│   ├── tasks_e2e_360.md
│   └── walkthrough.md
├── scripts/                # Scripts auxiliares e ferramentas de automação
├── scratch/                # [Ignore] Investigações e experimentos temporários
├── logs/                   # [Ignore] Logs de execução da CLI
└── tmp/                    # [Ignore] Dados efêmeros de trabalho
```

---

## 🔒 Regras de Governança & Hash Matching

1. Toda resposta gerada via `agymd` grava um arquivo imutável em `.ai-workbench/artifacts/chat/<conversation_id>/YYYY-MM-DD_HHmmss_<name>.md`.
2. Um clone binário idêntico é mantido em `.ai-workbench/artifacts/chat/latest.md`.
3. Os hashes SHA256 de ambos os arquivos devem ser **100% idênticos** (`Identical = True`), garantindo que nenhuma reescrita intermediária ocorreu.
