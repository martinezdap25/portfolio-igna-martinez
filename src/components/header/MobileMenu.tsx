"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import LanguageDropdown from "./LanguageDropdown";

const navLinks = [
    { href: "/", key: "inicio" },
    { href: "/projects", key: "projects" }
] as const;

type NavKey = typeof navLinks[number]["key"];
type NavDict = Record<NavKey, string>;

export default function MobileMenu({
    lang,
    dict,
    isOpen,
    onClose,
}: {
    lang: string;
    dict: NavDict;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <div
            className={`md:hidden w-full px-6 pb-6 bg-white dark:bg-gray-900 border-t border-indigo-700 dark:border-gray-700 mobile-menu ${isOpen ? "open" : ""
                }`}
        >
            <div className="flex justify-between items-center mt-4 mb-6">
                <DarkModeToggle />
                <LanguageDropdown currentLang={lang} />
            </div>
            <nav className="flex flex-col gap-4 items-start">
                {navLinks.map(({ href, key }) => {
                    const isAnchor = href.startsWith("#");
                    const url = isAnchor ? href : `/${lang}${href === "/" ? "" : href}`;

                    return (
                        <Link
                            key={href}
                            href={url}
                            onClick={onClose}
                            className="text-base font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                        >
                            {dict[key]}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
