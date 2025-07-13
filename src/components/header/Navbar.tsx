'use client';

const navLinks = [
    { href: '#projects', key: 'projects' },
    { href: '#about', key: 'about' },
    { href: '#contact', key: 'contact' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ dict }: { dict: any }) {
    return (
        <nav className="hidden md:flex gap-6">
            {navLinks.map(({ href, key }) => (
                <a
                    key={href}
                    href={href}
                    className={`relative cursor-pointer text-base font-medium transition-colors duration-300 group
            text-gray-200 hover:text-indigo-400 dark:text-gray-700 dark:hover:text-indigo-600
          `}
                >
                    {dict.nav[key]}
                    <span className="absolute left-0 -bottom-0.5 h-[2px] bg-indigo-500 w-0 group-hover:w-full transition-all duration-300" />
                </a>
            ))}
        </nav>
    );
}
