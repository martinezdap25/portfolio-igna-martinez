'use client'

import { ThemeProvider as NextThemesProvider, Attribute } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeProviderProps {
    children: ReactNode
    attribute?: Attribute | Attribute[]
    defaultTheme?: string
    enableSystem?: boolean
}

export function ThemeProvider({
    children,
    attribute = 'class', // aquí pasa 'class', que es válido
    defaultTheme = 'system',
    enableSystem = true,
}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
        >
            {children}
        </NextThemesProvider>
    )
}