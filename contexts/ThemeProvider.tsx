'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";

export type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
};
export const ThemeContext = createContext<{
    theme: 'light' | 'dark';
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
} | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const getTheme = (): 'light' | 'dark' => {
        if (typeof window !== 'undefined') {
            const themeCookie: string | undefined = Cookies.get('theme');
            const theme: string = themeCookie
                ? atob(themeCookie)
                : 'light';
            if (theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
                Cookies.set('theme', btoa('dark'), { expires: 365 });
                return 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                Cookies.set('theme', btoa('light'), { expires: 365 });
                return 'light';
            }
        }
        return 'light';
    };

    const [ theme, setTheme ] = useState<'light' | 'dark'>(getTheme);
    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            Cookies.set('theme', btoa('light'), { expires: 365 });
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            Cookies.set('theme', btoa('dark'), { expires: 365 });
        } else {
            document.documentElement.classList.remove('dark');
            Cookies.set('theme', btoa('light'), { expires: 365 });
        }
    }, [ theme ]);
    return (
        <>
            <ThemeContext.Provider value={{
                theme, setTheme
            }}>
                { children }
            </ThemeContext.Provider>
        </>
    );
};
export default ThemeProvider;
