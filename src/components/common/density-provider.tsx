"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

/**
 * DensityProvider Canônico — Jules Halls (T11)
 * Injeta classes de densidade operacional (compact | comfortable | spacious)
 * mapeadas às CSS custom properties em globals.css.
 */

export type Density = "compact" | "comfortable" | "spacious";

interface DensityContextValue {
  density: Density;
  setDensity: (d: Density) => void;
  /** CSS class to apply to the density scope container */
  densityClass: string;
  /** Density-aware spacing values (read from CSS vars at runtime) */
  tokens: {
    paddingY: string;
    paddingX: string;
    gap: string;
    fontSize: string;
  };
}

const CSS_TOKENS: Record<Density, DensityContextValue["tokens"]> = {
  compact: {
    paddingY: "var(--density-padding-y, 0.25rem)",
    paddingX: "var(--density-padding-x, 0.5rem)",
    gap: "var(--density-gap, 0.375rem)",
    fontSize: "var(--density-font-size, 0.8125rem)",
  },
  comfortable: {
    paddingY: "var(--density-padding-y, 0.5rem)",
    paddingX: "var(--density-padding-x, 0.875rem)",
    gap: "var(--density-gap, 0.625rem)",
    fontSize: "var(--density-font-size, 0.875rem)",
  },
  spacious: {
    paddingY: "var(--density-padding-y, 0.75rem)",
    paddingX: "var(--density-padding-x, 1.25rem)",
    gap: "var(--density-gap, 1rem)",
    fontSize: "var(--density-font-size, 1rem)",
  },
};

const DensityContext = createContext<DensityContextValue | undefined>(undefined);

export function DensityProvider({
  children,
  defaultDensity = "comfortable",
}: {
  children: React.ReactNode;
  defaultDensity?: Density;
}) {
  const [density, setDensityState] = useState<Density>(defaultDensity);

  const setDensity = useCallback((d: Density) => {
    setDensityState(d);
  }, []);

  const value = useMemo<DensityContextValue>(
    () => ({
      density,
      setDensity,
      densityClass: `density-${density}`,
      tokens: CSS_TOKENS[density],
    }),
    [density, setDensity],
  );

  return (
    <DensityContext.Provider value={value}>
      <div className={`density-${density}`} data-density={density}>
        {children}
      </div>
    </DensityContext.Provider>
  );
}

export function useDensity(): DensityContextValue {
  const ctx = useContext(DensityContext);
  if (!ctx) {
    throw new Error("useDensity must be used within a <DensityProvider>");
  }
  return ctx;
}
