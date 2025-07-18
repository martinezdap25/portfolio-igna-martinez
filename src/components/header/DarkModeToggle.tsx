/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useTheme } from 'next-themes'
import { TbSun, TbMoon } from 'react-icons/tb'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // 💡 Evita parpadeos de hidración

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle Dark Mode"
            className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300
        ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-indigo-100 hover:bg-indigo-300'}`}
        >
            <span
                className="absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                style={{
                    backgroundColor: isDark ? 'white' : '#4F46E5',
                    transform: isDark ? 'translateX(32px)' : 'translateX(0px)',
                }}
            />
            <TbMoon className={`absolute top-1.5 left-2 w-5 h-5 text-white transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
            <TbSun className={`absolute top-1.5 right-2 w-5 h-5 text-yellow-500 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
        </button>
    )
}
