import { createContext, useContext } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface ThemeContextType {
  theme?: Theme;
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextType>({});

export const useThemeContext = () => useContext(ThemeContext);

export const LOCAL_STORAGE_THEME_KEY = "theme";
