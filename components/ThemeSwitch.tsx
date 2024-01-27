'use client';
import { useThemeContext } from "@/hooks/useThemeContext";

const ThemeSwitch = () => {
    const { theme, setTheme } = useThemeContext();
    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`relative w-14 h-3 rounded-full ${theme === 'light' ? 'bg-gray-300' : 'bg-slate-300' } transition-all duration-300 ease-in-out`}
        >
                <span
                    className={`absolute w-7 h-7 rounded-full left-0 -top-2 ${theme === 'light' ? 'translate-x-0' : 'translate-x-full' } flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden`}>
                    {
                        theme === 'light'
                            ? (
                                <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                                    <iconify-icon
                                        width={18}
                                        icon="mdi:weather-sunny"
                                    />

                                </div>)
                            : (
                                <div className="w-full h-full bg-neutral-950 flex items-center justify-center">
                                    <iconify-icon
                                        width={18}
                                        icon="mdi:moon-and-stars"
                                        class="text-neutral-300"
                                    />
                                </div>
                            )
                    }
                </span>
        </button>
    );
};

export default ThemeSwitch;
