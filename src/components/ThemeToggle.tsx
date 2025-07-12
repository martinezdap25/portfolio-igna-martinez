"use client"

export default function ThemeToggle() {
    const toggleTheme = (theme: 'light' | 'dark' | 'system') => {
        if (typeof window === 'undefined') return

        if (theme === 'system') {
            localStorage.removeItem('theme')
        } else {
            localStorage.theme = theme
        }

        const isDark =
            theme === 'dark' ||
            (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)

        document.documentElement.classList.toggle('dark', isDark)
    }

    return (
        <div className="mb-4 flex gap-2">
            <button
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer text-sm rounded"
                onClick={() => toggleTheme('light')}
            >
                Claro
            </button>
            <button
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer text-sm rounded"
                onClick={() => toggleTheme('dark')}
            >
                Oscuro
            </button>
            <button
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer text-sm rounded"
                onClick={() => toggleTheme('system')}
            >
                Sistema
            </button>
        </div>
    )
}
