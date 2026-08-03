import { cn } from "@/lib/utils";

/**
 * DataTable Primitive — Jules Halls (T19)
 * Semantic table with sorting, column sizing, density support, and ARIA grid pattern.
 */

interface Column<T> {
  key: keyof T & string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[];
  data: T[];
  /** Unique key field */
  keyField?: keyof T & string;
  /** Current sort column */
  sortColumn?: string;
  /** Sort direction */
  sortDirection?: "asc" | "desc";
  /** Sort handler */
  onSort?: (column: string) => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Selected row keys */
  selectedKeys?: Set<string>;
  /** Empty state message */
  emptyMessage?: string;
  /** Compact density */
  compact?: boolean;
  /** Striped rows */
  striped?: boolean;
}

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField = "id" as keyof T & string,
  sortColumn,
  sortDirection = "asc",
  onSort,
  onRowClick,
  selectedKeys,
  emptyMessage = "No data available",
  compact = false,
  striped = false,
  className,
  ...props
}: DataTableProps<T>) {
  const cellPadding = compact ? "px-3 py-1.5" : "px-4 py-3";

  return (
    <div
      data-slot="data-table"
      className={cn("w-full overflow-auto rounded-lg border border-border", className)}
      {...props}
    >
      <table className="w-full border-collapse text-sm" role="grid">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={cn(
                  cellPadding,
                  "text-left font-medium text-muted-foreground",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                )}
                onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                aria-sort={
                  sortColumn === col.key
                    ? sortDirection === "asc" ? "ascending" : "descending"
                    : undefined
                }
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortColumn === col.key && (
                    <span className="text-xs" aria-hidden="true">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(cellPadding, "text-center text-muted-foreground")}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = String(row[keyField] ?? rowIndex);
              const isSelected = selectedKeys?.has(rowKey);

              return (
                <tr
                  key={rowKey}
                  role="row"
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-selected={isSelected}
                  data-state={isSelected ? "selected" : undefined}
                  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  onKeyDown={onRowClick ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onRowClick(row, rowIndex);
                    }
                  } : undefined}
                  className={cn(
                    "border-b border-border/50 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                    isSelected && "bg-primary/5",
                    striped && rowIndex % 2 === 1 && "bg-muted/20",
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        cellPadding,
                        "text-foreground",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right",
                      )}
                    >
                      {col.render
                        ? col.render(row[col.key], row, rowIndex)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };
export type { DataTableProps, Column };
