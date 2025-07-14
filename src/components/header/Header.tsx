'use client'

import DarkModeToggle from './DarkModeToggle'
import LanguageDropdown from './LanguageDropdown'

export default function Header({ lang }: { lang: string }) {
    return (
        <header className="flex items-center justify-between p-4 bg-indigo-600 dark:bg-gray-900 text-white">
            <h1 className="font-bold">Mi Sitio</h1>
            <div className="flex items-center gap-4">
                <DarkModeToggle />
                <LanguageDropdown currentLang={lang} />
            </div>
        </header>
    )
}