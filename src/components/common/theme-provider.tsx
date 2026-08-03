"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ThemeHotkey } from "@/components/common/theme-hotkey";

/**
 * ThemeProvider Canônico — Jules Halls (T10)
 * Suporta: "light" | "dark" | "high-contrast" | "system"
 * O tema "high-contrast" aplica WCAG AAA (≥7:1) sobre fundo preto puro.
 */
export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "high-contrast"]}
      disableTransitionOnChange
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  );
}
