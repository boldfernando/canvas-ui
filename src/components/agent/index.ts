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

export { InteractionModeSelector } from "./InteractionModeSelector";
export type { InteractionModeSelectorProps, InteractionMode } from "./InteractionModeSelector";

export { HumanMessage } from "./HumanMessage";
export type { HumanMessageProps } from "./HumanMessage";

export { AgentMessage } from "./AgentMessage";
export type { AgentMessageProps } from "./AgentMessage";

export { ConversationInputBox } from "./ConversationInputBox";
export type { ConversationInputBoxProps } from "./ConversationInputBox";

export { MCPToolOutput } from "./MCPToolOutput";
export type { MCPToolOutputProps } from "./MCPToolOutput";

export { CriticReviewCard } from "./CriticReviewCard";
export type { CriticReviewCardProps } from "./CriticReviewCard";

export { FeedbackThumbsButton } from "./FeedbackThumbsButton";
export type { FeedbackThumbsButtonProps } from "./FeedbackThumbsButton";

export { MarkdownViewer } from "./MarkdownViewer";
export type { MarkdownViewerProps } from "./MarkdownViewer";

export { BannerAlert } from "./BannerAlert";
export type { BannerAlertProps } from "./BannerAlert";

export { ContinuousIntegrationFixerView } from "./ContinuousIntegrationFixerView";
export type { ContinuousIntegrationFixerViewProps } from "./ContinuousIntegrationFixerView";

export { MCPRegistryPage } from "./MCPRegistryPage";
export type { MCPRegistryPageProps, MCPServerRecord } from "./MCPRegistryPage";
