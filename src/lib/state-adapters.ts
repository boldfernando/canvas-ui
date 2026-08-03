/**
 * State Adapter Utilities — Jules Halls (T12)
 * Maps CanonicalState values to data-attributes, CSS classes, and ARIA properties.
 * Enables declarative state communication in components via [data-state="..."].
 */

import type { CanonicalState } from "@/lib/design-tokens";

// ─────────────────────────────────────────────────────────
// 1. data-attribute adapters
// ─────────────────────────────────────────────────────────

/** Returns a props object with `data-state` for spreading onto DOM elements */
export function stateToDataAttr(state: CanonicalState): { "data-state": CanonicalState } {
  return { "data-state": state };
}

/** Returns multiple data-* attributes for compound states */
export function statesToDataAttrs(
  states: Partial<Record<string, CanonicalState | boolean | string>>,
): Record<string, string | undefined> {
  const attrs: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(states)) {
    if (value === undefined || value === false) continue;
    if (value === true) {
      attrs[`data-${key}`] = "";
    } else {
      attrs[`data-${key}`] = String(value);
    }
  }
  return attrs;
}

// ─────────────────────────────────────────────────────────
// 2. ARIA mapping
// ─────────────────────────────────────────────────────────

/** State-to-ARIA mapping for accessibility compliance */
const STATE_ARIA_MAP: Partial<Record<CanonicalState, Record<string, string | boolean>>> = {
  disabled: { "aria-disabled": true },
  readonly: { "aria-readonly": true },
  loading: { "aria-busy": true },
  processing: { "aria-busy": true },
  expanded: { "aria-expanded": true },
  collapsed: { "aria-expanded": false },
  selected: { "aria-selected": true },
  active: { "aria-current": "true" },
  failed: { "aria-invalid": true },
  validation_error: { "aria-invalid": true },
};

/** Returns ARIA props corresponding to a canonical state */
export function stateToAria(
  state: CanonicalState,
): Record<string, string | boolean> {
  return STATE_ARIA_MAP[state] ?? {};
}

/** Returns combined data-state + ARIA props for a canonical state */
export function stateProps(state: CanonicalState) {
  return {
    ...stateToDataAttr(state),
    ...stateToAria(state),
  };
}

// ─────────────────────────────────────────────────────────
// 3. CSS class helpers
// ─────────────────────────────────────────────────────────

/** CSS selector for targeting a data-state in stylesheets: [data-state="queued"] */
export function stateSelector(state: CanonicalState): string {
  return `[data-state="${state}"]`;
}

/** Returns Tailwind-compatible class string for state-conditional styling */
export function stateClass(
  state: CanonicalState,
  currentState: CanonicalState,
  activeClass: string,
  inactiveClass = "",
): string {
  return currentState === state ? activeClass : inactiveClass;
}

// ─────────────────────────────────────────────────────────
// 4. State category helpers
// ─────────────────────────────────────────────────────────

const INTERACTION_STATES: CanonicalState[] = [
  "default", "focused", "selected", "active", "inactive",
  "keyboard_focused", "hovered", "pressed",
];

const LIFECYCLE_STATES: CanonicalState[] = [
  "awaiting_user", "awaiting_approval", "plan_approved",
  "needs_review", "ready_for_review", "completed", "archived",
  "failed", "validation_error", "success", "experimental", "new",
  "modified", "created", "deleted",
];

const PROCESSING_STATES: CanonicalState[] = [
  "loading", "processing", "indeterminate_progress", "determinate_progress",
];

const CONNECTIVITY_STATES: CanonicalState[] = [
  "connected", "disconnected", "on", "off", "scheduled",
  "queued", "executing", "paused",
];

export function isInteractionState(state: CanonicalState): boolean {
  return INTERACTION_STATES.includes(state);
}

export function isLifecycleState(state: CanonicalState): boolean {
  return LIFECYCLE_STATES.includes(state);
}

export function isProcessingState(state: CanonicalState): boolean {
  return PROCESSING_STATES.includes(state);
}

export function isConnectivityState(state: CanonicalState): boolean {
  return CONNECTIVITY_STATES.includes(state);
}

// ─────────────────────────────────────────────────────────
// 5. Semantic color mapping for states
// ─────────────────────────────────────────────────────────

/** Returns the canonical CSS variable color for a given state */
export function stateColor(state: CanonicalState): string {
  switch (state) {
    case "success":
    case "completed":
    case "connected":
    case "on":
      return "var(--operational-green)";
    case "failed":
    case "validation_error":
    case "deleted":
      return "var(--thermal-red)";
    case "loading":
    case "processing":
    case "executing":
    case "indeterminate_progress":
    case "determinate_progress":
      return "var(--jules-electric-violet)";
    case "awaiting_user":
    case "awaiting_approval":
    case "needs_review":
    case "ready_for_review":
      return "var(--luminous-amber)";
    case "paused":
    case "queued":
    case "scheduled":
      return "var(--stitch-spectral-cyan)";
    case "archived":
    case "disabled":
    case "readonly":
    case "inactive":
      return "var(--muted-foreground)";
    default:
      return "var(--foreground)";
  }
}
