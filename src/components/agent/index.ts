/**
 * Agent Components — Public API
 * @packageDocumentation @module @jules-halls/canvas-ui/agent
 */

export { TaskComposer } from "./TaskComposer";
export type { TaskComposerProps } from "./TaskComposer";

export { ExecutionPlan } from "./ExecutionPlan";
export type { ExecutionPlanProps } from "./ExecutionPlan";

export { SessionTimeline } from "./SessionTimeline";
export type { SessionTimelineProps, TimelineEntry } from "./SessionTimeline";

export { ActivityStream } from "./ActivityStream";
export type { ActivityStreamProps, ActivityItem } from "./ActivityStream";

export { ArtifactGallery } from "./ArtifactGallery";
export type { ArtifactGalleryProps, ArtifactEntry } from "./ArtifactGallery";

export { PullRequestCard } from "./PullRequestCard";
export type { PullRequestCardProps, PullRequestData, PRStatus } from "./PullRequestCard";

export { PlanViewer } from "./PlanViewer";
export type { PlanViewerProps, PlanStep } from "./PlanViewer";

export { EnvironmentPanel } from "./EnvironmentPanel";
export type { EnvironmentPanelProps, EnvVariable } from "./EnvironmentPanel";

export { KnowledgeManager } from "./KnowledgeManager";
export type { KnowledgeManagerProps, SkillItem } from "./KnowledgeManager";

export { SettingsPanel } from "./SettingsPanel";
export type { SettingsPanelProps } from "./SettingsPanel";

export { APIKeyManager } from "./APIKeyManager";
export type { APIKeyManagerProps, APIKeyRecord } from "./APIKeyManager";

export { CIFixerPanel } from "./CIFixerPanel";
export type { CIFixerPanelProps, CIFailure } from "./CIFixerPanel";
