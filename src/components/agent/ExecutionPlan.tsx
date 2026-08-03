"use client";

import React from "react";
import { CanonicalPlan } from "@jules-halls/contracts";
import { CanonicalCard } from "../primitives/CanonicalCard";
import { StatusIndicator } from "../primitives/StatusIndicator";

export interface ExecutionPlanProps {
  plan: CanonicalPlan;
  onApprovePlan?: () => void;
  onRejectPlan?: () => void;
  className?: string;
}

export const ExecutionPlan: React.FC<ExecutionPlanProps> = ({
  plan,
  onApprovePlan,
  onRejectPlan,
  className = ""
}) => {
  return (
    <CanonicalCard variant="surface" className={`w-full max-w-4xl border-purple-500/20 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-white">Plano de Execução Proposto</h3>
          <p className="text-xs text-gray-400">Versão {plan.version} — {plan.steps.length} etapas planejadas</p>
        </div>
        <StatusIndicator
          state={plan.status === "approved" ? "plan_approved" : plan.status === "rejected" ? "failed" : "awaiting_approval"}
          size="sm"
        />
      </div>

      {/* Lista de Passos */}
      <div className="space-y-2 mb-4">
        {plan.steps.map((step: any, idx: number) => (
          <div
            key={step.id}
            className="p-3 rounded-lg bg-[#0B0F19] border border-white/5 flex flex-col gap-1 text-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-purple-400">Etapa {idx + 1}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 capitalize">{step.status}</span>
            </div>
            <span className="font-medium text-gray-200">{step.title}</span>
            {step.description && <p className="text-xs text-gray-400">{step.description}</p>}
          </div>
        ))}
      </div>

      {/* Ações de Aprovação */}
      {plan.status === "submitted" || plan.status === "draft" ? (
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onRejectPlan}
            className="px-4 py-1.5 rounded-lg border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs font-medium hover:bg-rose-900/50 transition-colors"
          >
            Recusar Plano
          </button>
          <button
            type="button"
            onClick={onApprovePlan}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
          >
            Aprovar e Executar 🚀
          </button>
        </div>
      ) : null}
    </CanonicalCard>
  );
};
