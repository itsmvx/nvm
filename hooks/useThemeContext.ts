import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeProvider";

export const useThemeContext = () => {
    const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;
    return { theme, setTheme };
};
