/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TbSun, TbMoon } from 'react-icons/tb'

export default function DarkModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // Evita problemas de hidratación

    const isDark = resolvedTheme === 'dark'

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className={`relative w-16 h-8 rounded-full cursor-pointer focus:outline-none transition-colors duration-300
        ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
            <span
                className="absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                style={{
                    backgroundColor: isDark ? 'white' : '#4F46E5',
                    transform: isDark ? 'translateX(32px)' : 'translateX(0)',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)',
                }}
            />
            <TbMoon
                className={`absolute top-1.5 left-2 w-5 h-5 text-white transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
            />
            <TbSun
                className={`absolute top-1.5 right-2 w-5 h-5 text-yellow-500 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
            />
        </button>
    )
}
