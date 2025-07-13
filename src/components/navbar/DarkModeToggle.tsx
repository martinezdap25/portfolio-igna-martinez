'use client';

import { useEffect, useState } from 'react';
import { TbSun, TbMoon } from 'react-icons/tb';

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    // Set initial theme on mount (hydration-safe)
    useEffect(() => {
        const theme = localStorage.theme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = theme === 'dark' || (!theme && systemPrefersDark);
        setIsDark(dark);
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);

        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    const primaryColor = '#4F46E5'; // Indigo-600

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className={`relative w-16 h-8 rounded-full cursor-pointer focus:outline-none transition-colors duration-300 group
        ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}
      `}
        >
            {/* Thumb */}
            <span
                className="absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transform transition-all duration-300"
                style={{
                    backgroundColor: isDark ? 'white' : primaryColor,
                    transform: isDark ? 'translateX(32px)' : 'translateX(0)',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)',
                }}
            />

            {/* Moon Icon (dark mode) */}
            <TbMoon
                className={`absolute top-1.5 left-2 w-5 h-5 text-white transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Sun Icon (light mode) */}
            <TbSun
                className={`absolute top-1.5 right-2 w-5 h-5 text-yellow-500 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'
                    }`}
            />
        </button>
    );
}
