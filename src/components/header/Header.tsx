'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import DarkModeToggle from './DarkModeToggle'
import LanguageDropdown from './LanguageDropdown'
import Logo from './Logo'
import Navbar from './Navbar'
import MobileMenu from './MobileMenu'

export default function Header({
    lang,
    dict,
}: {
    lang: string
    dict: { nav: { projects: string; inicio: string; contact: string } }
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

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
            <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between relative">
                {/* Logo + Navbar en md */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Logo />
                    {/* Navbar al lado del logo en md, oculto en sm, centrado en lg */}
                    <div className="hidden md:block lg:hidden">
                        <Navbar dict={dict.nav} lang={lang}/>
                    </div>
                </div>

                {/* Navbar centrado absoluto en lg */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Navbar dict={dict.nav} lang={lang}/>
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
                <MobileMenu
                    lang={lang}
                    dict={dict.nav}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </header>
    )
}