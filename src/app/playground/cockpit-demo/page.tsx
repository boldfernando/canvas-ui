"use client";

import React, { useState } from "react";
import { TaskComposer } from "@/components/agent/TaskComposer";
import { ExecutionPlan } from "@/components/agent/ExecutionPlan";
import { CodeDifferenceViewer } from "@/components/code/CodeDifferenceViewer";
import type { CanonicalPlan } from "@/lib/contracts";

/**
 * Cockpit Demo — Playground (COCKPIT-008)
 * Visual demonstration of agent components in isolation.
 * NOT an operational cockpit. For the real application, see apps/web-cockpit.
 */
export default function CockpitDemoPage() {
  const [activePlan, setActivePlan] = useState<CanonicalPlan>({
    id: "plan-demo-1",
    taskId: "task-demo-1",
    version: 1,
    status: "submitted",
    steps: [
      {
        id: "step-1",
        title: "Inspeção dos Design Tokens e Contratos Canônicos",
        description: "Validar Technical Noir e tipos isolados no canvas-ui.",
        status: "completed",
      },
      {
        id: "step-2",
        title: "Reconstrução dos Componentes de Domínio",
        description:
          "Substituir seletores swebot-* por TaskComposer, ExecutionPlan e CodeDifferenceViewer.",
        status: "in_progress",
      },
      {
        id: "step-3",
        title: "Validação E2E e Publicação no Registry",
        description: "Executar suíte de testes de 198 itens e publicar artefatos.",
        status: "pending",
      },
    ],
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Component Playground — Agent Cockpit Demo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Isolated demonstration of{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">
            @jules-halls/canvas-ui/agent
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">
            @jules-halls/canvas-ui/code
          </code>{" "}
          components. This is NOT an operational cockpit.
        </p>
      </div>

      {/* Section 1: Task Composer */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">TaskComposer</h2>
        <TaskComposer
          onStartTask={(data) => {
            console.log("Demo: Task started", data);
          }}
        />
      </section>

      {/* Section 2: Execution Plan */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">ExecutionPlan</h2>
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

      {/* Section 3: Code Difference Viewer */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">CodeDifferenceViewer</h2>
        <CodeDifferenceViewer filename="src/lib/design-tokens.ts" />
      </section>
    </div>
  );
}
