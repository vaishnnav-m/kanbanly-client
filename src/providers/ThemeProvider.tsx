"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, ReactNode, useContext } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  attribute?: "class" | "data-theme";
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  attribute = "class",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      attribute={attribute}
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  );
}
