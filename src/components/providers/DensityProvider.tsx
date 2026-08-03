"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Density = "compact" | "comfortable" | "spacious";

interface DensityContextType {
  density: Density;
  setDensity: (density: Density) => void;
}

const DensityContext = createContext<DensityContextType | undefined>(undefined);

export const DensityProvider: React.FC<{ children: React.ReactNode; defaultDensity?: Density }> = ({ children, defaultDensity = "comfortable" }) => {
  const [density, setDensity] = useState<Density>(defaultDensity);

  useEffect(() => {
    document.documentElement.setAttribute("data-density", density);
  }, [density]);

  return (
    <DensityContext.Provider value={{ density, setDensity }}>
      {children}
    </DensityContext.Provider>
  );
};

export const useDensity = () => {
  const context = useContext(DensityContext);
  if (context === undefined) {
    throw new Error("useDensity must be used within a DensityProvider");
  }
  return context;
};
