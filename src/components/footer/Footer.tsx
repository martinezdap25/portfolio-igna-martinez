/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[lang]/components/Footer.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { sendEmail } from "@/services/resend";

type FooterProps = {
    dictionary: any
}

function FooterContactSection({ dictionary }: { dictionary: any }) {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError(dictionary.footer.invalid_email);
            return;
        }

        setIsLoading(true);
        setMessageSent(false);

        try {
            const result = await sendEmail(firstName, email);

            if (result.success) { // Ahora usamos 'success' que devuelve tu API
                setMessageSent(true);
                setFirstName("");
                setEmail("");
            } else {
                // Captura el mensaje de error
                const errorMessage =
                    result.error?.email?.[0] ||
                    result.error?.firstName?.[0] ||
                    result.error ||
                    dictionary.footer.send_error;
                setError(errorMessage);
            }
        } catch (err) {
            setError(dictionary.footer.network_error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
            {messageSent && (
                <div className="p-3 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {dictionary.footer.success_message}
                </div>
            )}
            {error && (
                <div className="p-3 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {error}
                </div>
            )}

            <input
                type="text"
                placeholder={dictionary.footer.name_placeholder}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
            />

            <input
                type="email"
                placeholder={dictionary.footer.email_placeholder}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
            />

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? dictionary.footer.sending : dictionary.footer.send}
            </button>
        </form>
    );
}

export default function Footer({ dictionary }: FooterProps) {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentTheme = theme === 'system' ? resolvedTheme : theme

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 px-6 py-8">

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                {/* Logo */}
                <div className="mb-10 flex items-center justify-center sm:justify-start gap-4">
                    <Image
                        src={
                            currentTheme === 'dark'
                                ? 'https://res.cloudinary.com/dsugc0qfa/image/upload/v1752616148/Logo---IM-Programador-2_u36swo.png'
                                : 'https://res.cloudinary.com/dsugc0qfa/image/upload/v1752650023/Logo---IM-Programador-3_olsiqw.png'
                        }
                        alt="Logo Ignacio Martinez"
                        width={60}
                        height={60}
                        className="h-15 w-auto"
                        priority
                    />
                </div>

                {/* Mensajes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-center sm:text-left">
                    <div className="group">
                        <h2 className="relative inline-block mb-4 font-semibold text-gray-700 dark:text-white transition-colors">
                            {dictionary.footer.work}
                            <span className="block h-0.5 w-0 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full mt-1"></span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300">{dictionary.footer.work_desc}</p>
                    </div>
                    <div className="group">
                        <h2 className="relative inline-block mb-4 font-semibold text-gray-700 dark:text-white transition-colors">
                            {dictionary.footer.questions}
                            <span className="block h-0.5 w-0 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full mt-1"></span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300">{dictionary.footer.questions_desc}</p>
                    </div>
                </div>

                <div className="max-w-sm mx-auto sm:mx-0">
                    <FooterContactSection dictionary={dictionary} />
                </div>

                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                    <span>© 2025 Ignacio Martinez. {dictionary.footer.rights}</span>
                    <div className="flex justify-center space-x-6">
                        <div className="flex justify-center space-x-6">
                            <a
                                href="https://github.com/martinezdap25"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="transition duration-200 transform hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                <FaGithub size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ignacio-martinez-dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="transition duration-200 transform hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                <FaLinkedin size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/nachomartinezdap"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="transition duration-200 transform hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="mailto:martinezignaciodev@gmail.com"
                                aria-label="Email"
                                className="transition duration-200 transform hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                <FaEnvelope size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
