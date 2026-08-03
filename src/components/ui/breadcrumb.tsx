import { cn } from "@/lib/utils";

/**
 * Breadcrumb Primitive — Jules Halls (T18)
 * Hierarchical navigation trail with semantic markup.
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

function Breadcrumb({
  items,
  separator = "/",
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" data-slot="breadcrumb" className={className} {...props}>
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/50 select-none">
                {separator}
              </span>
            )}
            {item.current ? (
              <span
                aria-current="page"
                className="font-medium text-foreground"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <a
                href={item.href}
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
              >
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export { Breadcrumb };
export type { BreadcrumbProps, BreadcrumbItem };
