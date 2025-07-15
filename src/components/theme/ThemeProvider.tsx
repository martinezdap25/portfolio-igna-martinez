'use client'
import { Attribute, ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

export function ThemeProvider({ children, attribute = 'class' }: { children: ReactNode, attribute?: Attribute }) {
  return (
    <NextThemesProvider attribute={attribute} defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
