import { createContext, useContext, useState } from "react";
import { THEMES, DEFAULT_THEME } from "../constants/themes";
import { STORAGE_KEYS } from "../constants/storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  const setTheme = (themeKey) => {
    const newTheme = THEMES[themeKey] || DEFAULT_THEME;
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
