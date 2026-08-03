import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography Primitive — Jules Halls (T13)
 * Renders semantic heading and body text with design-token sizes and weights.
 */

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-3xl font-bold tracking-tight",
      h2: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-lg font-semibold tracking-tight",
      body: "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      caption: "text-xs text-muted-foreground",
      code: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md",
      label: "text-sm font-medium leading-none",
      overline: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
    },
    color: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
      destructive: "text-destructive",
      success: "text-[var(--operational-green)]",
      warning: "text-[var(--luminous-amber)]",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
    align: "left",
    truncate: false,
  },
});

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "code" | "label" | "div";

const VARIANT_ELEMENT_MAP: Record<string, TypographyElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  "body-sm": "p",
  caption: "span",
  code: "code",
  label: "label",
  overline: "span",
};

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
}

function Typography({
  className,
  variant = "body",
  color,
  align,
  truncate,
  as,
  ...props
}: TypographyProps) {
  const Component = as ?? VARIANT_ELEMENT_MAP[variant ?? "body"] ?? "p";

  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant, color, align, truncate, className }))}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
export type { TypographyProps };
