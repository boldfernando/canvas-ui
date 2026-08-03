/**
 * Design Tokens Canônicos — Jules Halls (Technical Noir Theme)
 * Fundação do Sistema Operacional Visual de Agentes
 */

export const technicalNoirTokens = {
  colors: {
    background: {
      deep: "#0B0F19",       // Preto grafite profundo
      surface: "#111827",    // Grafite elevação 1
      panel: "#1F2937",      // Grafite elevação 2
      overlay: "rgba(11, 15, 25, 0.85)",
      canvasBg: "#05070D",   // Fundo de viewport Canvas/WebGL
    },
    text: {
      primary: "#F9FAFB",    // Branco mineral
      secondary: "#9CA3AF",  // Cinza frio
      muted: "#6B7280",      // Cinza abafado
      code: "#E5E7EB",       // Branco técnico mono
      inverse: "#0B0F19"
    },
    brand: {
      julesElectricViolet: "#6366F1", // Ênfase Jules
      stitchSpectralCyan: "#06B6D4",   // Ênfase Stitch
      operationalGreen: "#10B981",    // Sucesso operacional
      luminousAmber: "#F59E0B",       // Atenção / Revisão
      thermalRed: "#EF4444",          // Erro térmico
      planningBlueViolet: "#8B5CF6",  // Planejamento
      humanInterventionCoral: "#F43F5E", // Intervenção humana
      artifactGlacialBlue: "#38BDF8"  // Blue glacial para artefatos
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.08)",
      default: "rgba(255, 255, 255, 0.15)",
      active: "#6366F1",
      focus: "#06B6D4"
    }
  },
  typography: {
    fontSans: "var(--font-geist-sans), system-ui, sans-serif",
    fontMono: "var(--font-geist-mono), 'JetBrains Mono', monospace",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    }
  },
  borders: {
    thin: "1px solid rgba(255, 255, 255, 0.1)",
    active: "1px solid #6366F1",
    radius: {
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px"
    }
  },
  shadows: {
    panel: "0 4px 20px rgba(0, 0, 0, 0.5)",
    glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    glowViolet: "0 0 20px rgba(99, 102, 241, 0.25)"
  }
} as const;

export type CanonicalState =
  // Interação
  | "default" | "focused" | "selected" | "active" | "inactive" | "keyboard_focused" | "hovered" | "pressed"
  // Permissão
  | "disabled" | "readonly" | "locked"
  // Processamento
  | "loading" | "processing" | "indeterminate_progress" | "determinate_progress"
  // Visibilidade
  | "empty" | "populated" | "expanded" | "collapsed" | "truncated" | "fully_visible"
  // Conectividade
  | "connected" | "disconnected" | "on" | "off" | "scheduled" | "queued" | "executing" | "paused"
  // Ciclo de Vida
  | "awaiting_user" | "awaiting_approval" | "plan_approved" | "needs_review" | "ready_for_review"
  | "completed" | "archived" | "failed" | "validation_error" | "success" | "experimental" | "new"
  | "modified" | "created" | "deleted" | "diff_added" | "diff_removed" | "transient_toast" | "persistent_alert";
