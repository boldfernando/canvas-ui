/**
 * Modelo de Domínio Canônico — Jules Halls (Épico 02)
 * Contratos universais, tipagem estrita, isolamento anticorrupção e validadores de runtime.
 */

// Global Entity IDs & Metadata (DOMAIN-001)
export type EntityId = string;

export interface TraceableEntity {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
  correlationId: string; // DOMAIN-023: Rastreamento distribuído
  causalityId?: string;  // DOMAIN-024: Cadeia de eventos
  version: number;
}

// 1. Produto (DOMAIN-002)
export interface CanonicalProduct extends TraceableEntity {
  name: string;
  slug: string;
  description: string;
  owner: string;
  repositories: string[];
}

// 2. Oportunidade (DOMAIN-003)
export interface CanonicalOpportunity extends TraceableEntity {
  productId: EntityId;
  title: string;
  problemStatement: string;
  impactScore: number;
  status: "discovered" | "validated" | "prioritized" | "rejected";
}

// 3. Iniciativa (DOMAIN-004)
export interface CanonicalInitiative extends TraceableEntity {
  opportunityId: EntityId;
  name: string;
  objective: string;
  targetQuarter: string;
  status: "planning" | "in_progress" | "completed" | "cancelled";
}

// 4. Documento de Requisitos de Produto (PRD) & Requisito (DOMAIN-005)
export interface CanonicalRequirement extends TraceableEntity {
  initiativeId: EntityId;
  title: string;
  userStory: string;
  acceptanceCriteria: string[];
  priority: "P0" | "P1" | "P2";
  status: "draft" | "approved" | "implemented" | "verified";
}

// 5. Tela (DOMAIN-006)
export interface CanonicalScreen extends TraceableEntity {
  requirementId?: EntityId;
  name: string;
  route: string;
  components: string[];
  stitchDesignId?: string;
}

// 6. Épico (DOMAIN-007)
export interface CanonicalEpic extends TraceableEntity {
  requirementId: EntityId;
  title: string;
  description: string;
  status: "backlog" | "in_progress" | "review" | "done";
}

// 7. Caso de Uso (DOMAIN-008)
export interface CanonicalCase extends TraceableEntity {
  epicId: EntityId;
  title: string;
  steps: string[];
  expectedOutcome: string;
}

// 8. Task / Tarefa (DOMAIN-009)
export type TaskPriority = "low" | "medium" | "high" | "critical";

export type TaskStatus =
  | "queued"
  | "scheduled"
  | "executing"
  | "paused"
  | "awaiting_user_input"
  | "awaiting_review"
  | "plan_approved"
  | "completed"
  | "archived"
  | "failed";

export interface RepositoryReference {
  owner: string;
  name: string;
  branch: string;
  commitHash?: string;
}

export interface CanonicalTask extends TraceableEntity {
  caseId?: EntityId;
  title: string;
  description?: string;
  repository: RepositoryReference;
  status: TaskStatus;
  priority: TaskPriority;
  sessionId?: string;
  scheduledTime?: string;
  tags?: string[];
}

// 9. Sessão de Agente (DOMAIN-010)
export interface PlanStep {
  id: EntityId;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "skipped";
  toolCalls?: Array<{
    toolName: string;
    arguments: Record<string, unknown>;
    result?: string;
  }>;
}

export interface CanonicalPlan {
  id: EntityId;
  taskId: EntityId;
  version: number;
  status: "draft" | "submitted" | "approved" | "rejected";
  steps: PlanStep[];
  criticFeedback?: string;
}

export interface CanonicalSession extends TraceableEntity {
  taskId: EntityId;
  provider: "jules" | "stitch" | "custom_agent";
  state: "active" | "paused" | "finished" | "error";
  plan?: CanonicalPlan;
}

// 10. Atividade de Sessão (DOMAIN-011)
export interface SessionActivity extends TraceableEntity {
  sessionId: EntityId;
  type: "human_message" | "agent_message" | "tool_call" | "plan_update" | "diff_applied" | "review_critic";
  content: string;
  sender?: "user" | "agent" | "system";
  metadata?: Record<string, unknown>;
}

// 11. Artifact / Envelope Universal (DOMAIN-012)
export interface CanonicalArtifact extends TraceableEntity {
  sessionId: EntityId;
  filename: string;
  filePath: string;
  mediaType: "markdown" | "code" | "image" | "json" | "diagram";
  checksum: string;
  content?: string;
}

// 12. Pull Request / Entrega (DOMAIN-013)
export interface CanonicalPullRequest extends TraceableEntity {
  taskId: EntityId;
  repository: RepositoryReference;
  number: number;
  title: string;
  url: string;
  status: "open" | "merged" | "closed";
  ciStatus: "passing" | "failing" | "pending";
}

// 13. Release (DOMAIN-014)
export interface CanonicalRelease extends TraceableEntity {
  version: string;
  pullRequestIds: EntityId[];
  changelog: string;
  publishedAt: string;
}

// 14. Deployment (DOMAIN-015)
export interface CanonicalDeployment extends TraceableEntity {
  releaseId: EntityId;
  environment: "staging" | "production";
  url: string;
  status: "deploying" | "live" | "failed" | "rolled_back";
}

// 15. Telemetria (DOMAIN-016)
export interface CanonicalTelemetry extends TraceableEntity {
  source: string;
  metricName: string;
  value: number;
  unit: string;
  labels?: Record<string, string>;
}

// 16. Feedback (DOMAIN-017)
export interface CanonicalFeedback extends TraceableEntity {
  targetId: EntityId;
  rating: "thumbs_up" | "thumbs_down";
  comment?: string;
}

// 17. Outcome (DOMAIN-018)
export interface CanonicalOutcome extends TraceableEntity {
  opportunityId: EntityId;
  measuredImpact: string;
  status: "achieved" | "partially_achieved" | "missed";
}

// 18. Retirement (DOMAIN-019)
export interface CanonicalRetirement extends TraceableEntity {
  entityType: "product" | "component" | "feature" | "api";
  targetId: EntityId;
  reason: string;
  deprecatedAt: string;
  sunsetAt: string;
}

// Status de Origens Upstream
export interface UpstreamStatus {
  sourceId: string;
  repository: string;
  ref: string;
  status: "supported" | "degraded" | "breaking_changes";
  lastChecked: string;
}

// Validadores de Runtime (DOMAIN-027)
export function validateCanonicalTask(task: Partial<CanonicalTask>): task is CanonicalTask {
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.correlationId === "string" &&
    task.repository !== undefined &&
    typeof task.repository.name === "string"
  );
}
