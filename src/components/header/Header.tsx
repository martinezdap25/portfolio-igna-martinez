'use client'

import DarkModeToggle from './DarkModeToggle'
import LanguageDropdown from './LanguageDropdown'
import Logo from './Logo'
import Navbar from './Navbar'

export default function Header({
    lang,
    dict,
}: {
    lang: string
    dict: { nav: { projects: string; about: string; contact: string } }
}) {
    return (
        <header className="h-24 bg-indigo-600 dark:bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
                {/* Logo a la izquierda */}
                <Logo />

                {/* Navbar centrado */}
                <div className="flex-1 flex justify-center">
                    <Navbar dict={dict.nav} />
                </div>

                {/* Controles a la derecha */}
                <div className="flex items-center gap-4">
                    <DarkModeToggle />
                    <LanguageDropdown currentLang={lang} />
                </div>
            </div>
        </header>
    )
}