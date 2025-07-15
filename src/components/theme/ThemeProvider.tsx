'use client'
import { Attribute, ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'

export function ThemeProvider({ children, attribute = 'class' }: { children: ReactNode, attribute?: Attribute }) {
    const { setTheme } = useTheme()

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) {
            setTheme(storedTheme)
            console.log('ThemeProvider: Applying theme from localStorage:', storedTheme)
        } else {
            setTheme('system') // O 'light' o 'dark', según tu preferencia por defecto
            console.log('ThemeProvider: Applying system theme (default)')
        }
    }, [setTheme])

    return (
        <NextThemesProvider attribute={attribute} defaultTheme="system" enableSystem={false} storageKey="theme">
            {children}
        </NextThemesProvider>
    )

}
