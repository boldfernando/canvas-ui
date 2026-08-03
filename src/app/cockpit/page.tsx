"use client";

import React, { useState } from "react";
import { TaskComposer } from "@/components/agent/TaskComposer";
import { ExecutionPlan } from "@/components/agent/ExecutionPlan";
import { CodeDifferenceViewer } from "@/components/code/CodeDifferenceViewer";
import { CanonicalPlan } from "@/lib/contracts";

export default function CockpitDashboard() {
  const [activePlan, setActivePlan] = useState<CanonicalPlan>({
    id: "plan-1",
    taskId: "task-1",
    version: 1,
    status: "submitted",
    steps: [
      {
        id: "step-1",
        title: "Inspeção dos Design Tokens e Contratos Canônicos",
        description: "Validar Technical Noir e tipos isolados no canvas-ui.",
        status: "completed"
      },
      {
        id: "step-2",
        title: "Reconstrução dos Componentes de Domínio",
        description: "Substituir seletores swebot-* por TaskComposer, ExecutionPlan e CodeDifferenceViewer.",
        status: "in_progress"
      },
      {
        id: "step-3",
        title: "Validação E2E e Publicação no Registry",
        description: "Executar suíte de testes de 198 itens e publicar artefatos.",
        status: "pending"
      }
    ]
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Cockpit Operacional Jules Halls</h1>
        <p className="text-sm text-gray-400 mt-1">
          Fundação técnica e visual baseada em <code className="font-mono text-indigo-400">canvas-ui</code> com 100% de preservação dos comportamentos reais.
        </p>
      </div>

      {/* Seção 1: Criação de Tarefas */}
      <section>
        <TaskComposer
          onStartTask={(data) => {
            alert(`Iniciando tarefa no repositório ${data.repo} com modo ${data.mode}`);
          }}
        />
      </section>

      {/* Seção 2: Plano de Execução */}
      <section>
        <ExecutionPlan
          plan={activePlan}
          onApprovePlan={() => {
            setActivePlan((prev) => ({ ...prev, status: "approved" }));
          }}
          onRejectPlan={() => {
            setActivePlan((prev) => ({ ...prev, status: "rejected" }));
          }}
        />
      </section>

      {/* Seção 3: Visualizador de Diferenças de Código */}
      <section>
        <CodeDifferenceViewer filename="src/lib/design-tokens.ts" />
      </section>
    </div>
  );
}
