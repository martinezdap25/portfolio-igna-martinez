'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
    {
        code: 'es',
        label: 'Español',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
    },
    {
        code: 'en',
        label: 'English',
        flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    },
];

export default function LanguageDropdown() {
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1];
    const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code: string) => {
        const segments = pathname.split('/');
        segments[1] = code;
        const newPath = segments.join('/') || '/';
        router.push(newPath);
        setLangOpen(false);
    };

    return (
        <div className="relative" ref={langRef}>
            <button
                onClick={() => setLangOpen(!langOpen)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-2 px-3 py-1 rounded-md font-semibold cursor-pointer select-none transition
        bg-white text-indigo-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-indigo-300 dark:hover:bg-gray-800"
            >
                <Image
                    src={currentLang.flag}
                    alt={currentLang.label}
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                />
                <span className="text-base font-normal">{currentLang.label}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${langOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {langOpen && (
                <ul
                    role="listbox"
                    className="absolute right-0 mt-1 w-40 rounded-md shadow-lg font-semibold overflow-hidden transition
          bg-white text-indigo-900 dark:bg-gray-800 dark:text-indigo-300"
                >
                    {languages.map(({ code, label, flag }) => (
                        <li
                            key={code}
                            role="option"
                            onClick={() => handleLanguageChange(code)}
                            className={`cursor-pointer flex items-center gap-2 px-3 py-2 transition
              ${currentLocale === code
                                    ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-white'
                                    : 'hover:bg-indigo-100 dark:hover:bg-gray-700'
                                }`}
                            aria-selected={currentLocale === code}
                        >
                            <Image
                                src={flag}
                                alt={label}
                                width={24}
                                height={24}
                                className="rounded-full object-cover border border-white"
                            />
                            <span className="text-base font-normal">{label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
