'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'
import DarkModeToggle from './DarkModeToggle'
import LanguageDropdown from './LanguageDropdown'
import Logo from './Logo'
import Navbar from './Navbar'

const navLinks = [
    { href: '#projects', key: 'projects' },
    { href: '#about', key: 'about' },
    { href: '#contact', key: 'contact' },
] as const

type NavKey = typeof navLinks[number]['key']
type NavDict = Record<NavKey, string>

export default function Header({
    lang,
    dict,
}: {
    lang: string
    dict: { nav: NavDict }
}) {
    const [isOpen, setIsOpen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pathname = usePathname()

    return (
        <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
                {/* Logo */}
                <Logo />

                {/* Navbar en desktop */}
                <div className="hidden md:block">
                    <Navbar dict={dict.nav} />
                </div>

                {/* Controles (tema e idioma) en desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <DarkModeToggle />
                    <LanguageDropdown currentLang={lang} />
                </div>

                {/* Botón hamburguesa mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-black dark:text-white"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Menú desplegable en mobile */}
            {isOpen && (
                <div className="md:hidden w-full px-4 pb-6 animate-slide-down bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center mt-4 mb-6">
                        <DarkModeToggle />
                        <LanguageDropdown currentLang={lang} />
                    </div>
                    <nav className="flex flex-col gap-4 items-start">
                        {navLinks.map(({ href, key }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {dict.nav[key]}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}
