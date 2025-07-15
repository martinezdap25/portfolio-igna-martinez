'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
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
    const [isOpen, setIsOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const navLinks = [
        { href: '#projects', key: 'projects' },
        { href: '#about', key: 'about' },
        { href: '#contact', key: 'contact' },
    ] as const

    useEffect(() => {
        if (!isOpen && isAnimating) {
            const timeout = setTimeout(() => setIsAnimating(false), 250)
            return () => clearTimeout(timeout)
        }
    }, [isOpen, isAnimating])

    const handleToggleMenu = () => {
        if (isOpen) {
            setIsOpen(false)
            setIsAnimating(true)
        } else {
            setIsAnimating(true)
            setIsOpen(true)
        }
    }

    return (
        <header className="bg-indigo-600 dark:bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-24 flex items-center justify-between relative">
                {/* Logo + Navbar en md */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Logo />
                    {/* Navbar al lado del logo en md, oculto en sm, centrado en lg */}
                    <div className="hidden md:block lg:hidden">
                        <Navbar dict={dict.nav} />
                    </div>
                </div>

                {/* Navbar centrado absoluto en lg */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Navbar dict={dict.nav} />
                </div>

                {/* Controles de tema e idioma en md+ */}
                <div className="hidden md:flex items-center gap-4">
                    <DarkModeToggle />
                    <LanguageDropdown currentLang={lang} />
                </div>

                {/* Menú móvil */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={handleToggleMenu}
                        className="text-white"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FiX size={32} /> : <FiMenu size={32} />}
                    </button>
                </div>
            </div>

            {(isOpen || isAnimating) && (
                <div
                    className={`md:hidden w-full px-6 pb-6 transition-all duration-300 ${isOpen ? 'animate-slide-down' : 'animate-slide-up'
                        } bg-white dark:bg-gray-900 border-t border-indigo-700 dark:border-gray-700`}
                >
                    <div className="flex justify-between items-center mt-4 mb-6">
                        <LanguageDropdown currentLang={lang} menuOpen={isOpen} />
                        <DarkModeToggle />
                    </div>
                    <nav className="flex flex-col gap-4 items-start">
                        {navLinks.map(({ href, key }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={handleToggleMenu}
                                className="text-base font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
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
