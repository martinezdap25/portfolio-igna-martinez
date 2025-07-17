'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

const languages = [
    { code: 'es', label: 'Español', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg' },
    { code: 'en', label: 'English', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
]

export default function LanguageDropdown({ currentLang, menuOpen = false }: { currentLang: string; menuOpen?: boolean }) {
    const [langOpen, setLangOpen] = useState(false)
    const langRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuOpen) return
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    const handleLanguageChange = (code: string) => {
        if (code === currentLang) return

        const segments = pathname.split('/')
        segments[1] = code
        router.push(segments.join('/'))
        setLangOpen(false)
    }

    const selectedLang = languages.find(l => l.code === currentLang) || languages[0]

    return (
        <div className="sticky top-0 z-10" ref={langRef}>
            <button
                onClick={() => setLangOpen(!langOpen)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold cursor-pointer bg-indigo-100 text-indigo-900 dark:bg-gray-700 dark:text-indigo-300"
            >
                <Image
                    src={selectedLang.flag}
                    alt={selectedLang.label}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover rounded-full border border-gray-300 dark:border-gray-500"
                />
                <span>{selectedLang.label}</span>
                <svg className={`w-4 h-4 transform transition-transform duration-300 ${langOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {langOpen && (
                <ul
                    role="listbox"
                    className="absolute right-0 mt-1 w-40 rounded-xl shadow-lg bg-white text-indigo-900 dark:bg-gray-800 dark:text-indigo-300 border border-gray-200 dark:border-gray-600 overflow-hidden"
                >
                    {languages.map(({ code, label, flag }) => (
                        <li
                            key={code}
                            role="option"
                            onClick={() => handleLanguageChange(code)}
                            className={`cursor-pointer flex items-center gap-2 px-3 py-2 transition-colors ${currentLang === code
                                    ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-white'
                                    : 'hover:bg-indigo-100 dark:hover:bg-gray-700 rounded-md'
                                }`}
                            aria-selected={currentLang === code}
                        >
                            <Image
                                src={flag}
                                alt={label}
                                width={24}
                                height={24}
                                className="w-6 h-6 object-cover rounded-full border border-gray-300 dark:border-gray-500"
                            />
                            <span>{label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}