"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{
  theme: Theme | null;
  toggleTheme: () => void;
}>({ theme: null, toggleTheme: () => {} });

export function Providers({
  children,
  initialTheme, // Theme | undefined — undefined = ไม่มี cookie, ให้ CSS จัดการเอง
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme | null>(initialTheme ?? null);

 useEffect(() => {
  if (theme === null) return; 
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  document.cookie = `theme=${theme}; path=/; max-age=31536000`;
}, [theme]);

  const toggleTheme = () => {
    const current =
      theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);