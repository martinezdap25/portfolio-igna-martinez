'use client'

const navLinks = [
    { href: '#about', key: 'about' },
    { href: '#projects', key: 'projects' },
    { href: '#contact', key: 'contact' },
] as const

type NavKey = typeof navLinks[number]['key']
type NavDict = Record<NavKey, string>

export default function Navbar({ dict }: { dict: NavDict }) {
    return (
        <nav className="hidden md:flex gap-8">
            {navLinks.map(({ href, key }) => (
                <a
                    key={href}
                    href={href}
                    className="relative text-lg font-semibold transition-colors duration-300 group
                     text-indigo-100 hover:text-indigo-300
                     dark:text-white dark:hover:text-indigo-400"
                >
                    {dict[key]}
                    <span className="absolute left-0 -bottom-1 h-[2px] bg-indigo-400 dark:bg-indigo-300 w-0 group-hover:w-full transition-all duration-300" />
                </a>
            ))}
        </nav>
    )
}