import { cn } from "@/lib/utils";

/**
 * IntegrationsBoard — Jules Halls (T31)
 * Grid of integration cards showing connection status, health, and configuration.
 * Maps to the Jules Settings > Integrations surface.
 */

export interface Integration {
  id: string;
  name: string;
  provider: string;
  icon?: string;
  status: "connected" | "disconnected" | "error" | "pending";
  description?: string;
  lastSync?: string;
  capabilities?: string[];
}

interface IntegrationsBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  integrations: Integration[];
  onConnect?: (integration: Integration) => void;
  onDisconnect?: (integration: Integration) => void;
  onConfigure?: (integration: Integration) => void;
}

const STATUS_CONFIG: Record<Integration["status"], { dot: string; label: string }> = {
  connected: { dot: "bg-[var(--operational-green)]", label: "Connected" },
  disconnected: { dot: "bg-muted-foreground/40", label: "Disconnected" },
  error: { dot: "bg-[var(--thermal-red)]", label: "Error" },
  pending: { dot: "bg-[var(--luminous-amber)] animate-pulse", label: "Pending" },
};

function IntegrationsBoard({
  integrations,
  onConnect,
  onDisconnect,
  onConfigure,
  className,
  ...props
}: IntegrationsBoardProps) {
  return (
    <div
      data-slot="integrations-board"
      className={cn("rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          Integrations ({integrations.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((int) => {
          const status = STATUS_CONFIG[int.status];
          return (
            <div
              key={int.id}
              data-state={int.status}
              className="flex flex-col gap-3 rounded-lg border border-border p-4 transition-shadow hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {int.icon && <span className="text-lg">{int.icon}</span>}
                  <div>
                    <div className="text-sm font-semibold text-foreground">{int.name}</div>
                    <div className="text-[10px] text-muted-foreground">{int.provider}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-2 rounded-full", status.dot)} />
                  <span className="text-[10px] text-muted-foreground">{status.label}</span>
                </div>
              </div>

              {/* Description */}
              {int.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">{int.description}</p>
              )}

              {/* Capabilities */}
              {int.capabilities && int.capabilities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {int.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {cap}
                    </span>
                  ))}
                  {int.capabilities.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">
                      +{int.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex items-center gap-2 pt-1">
                {int.status === "disconnected" && onConnect && (
                  <button
                    type="button"
                    onClick={() => onConnect(int)}
                    className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Connect
                  </button>
                )}
                {int.status === "connected" && onConfigure && (
                  <button
                    type="button"
                    onClick={() => onConfigure(int)}
                    className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Configure
                  </button>
                )}
                {int.status === "connected" && onDisconnect && (
                  <button
                    type="button"
                    onClick={() => onDisconnect(int)}
                    className="text-xs text-muted-foreground hover:text-[var(--thermal-red)] transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { IntegrationsBoard };
export type { IntegrationsBoardProps };
