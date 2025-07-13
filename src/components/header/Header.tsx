'use client';

import Logo from './Logo';
import Navbar from './Navbar';
import DarkModeToggle from './DarkModeToggle';
import LanguageDropdown from './LanguageDropdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ dict }: { dict: any }) {
    return (
        <header className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-gray-100 dark:to-gray-200 dark:text-gray-900 text-white shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Logo />
                <Navbar dict={dict} />
                <div className="flex items-center gap-4">
                    <DarkModeToggle />
                    <LanguageDropdown />
                </div>
            </div>
        </header>
    );
}
