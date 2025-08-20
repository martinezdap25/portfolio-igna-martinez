'use client'
import { Attribute, ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'

export function ThemeProvider({ children, attribute = 'class' }: { children: ReactNode, attribute?: Attribute }) {
    const { setTheme } = useTheme()

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) {
            setTheme(storedTheme)
        } else {
            setTheme('system')
        }
    }, [setTheme])

    return (
        <NextThemesProvider attribute={attribute} defaultTheme="system" enableSystem={false} storageKey="theme">
            {children}
        </NextThemesProvider>
    )

}
