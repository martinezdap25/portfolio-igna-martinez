'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiNestjs,
    SiExpress,
    SiHtml5,
    SiCss3,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiDocker,
    SiGit,
    SiGithub,
    SiPhp,
    SiLaravel,
    SiVite,
    SiLivewire,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

const techs = [
    { name: 'React', Icon: SiReact },
    { name: 'Next.js', Icon: SiNextdotjs },
    { name: 'Tailwind', Icon: SiTailwindcss },
    { name: 'TypeScript', Icon: SiTypescript },
    { name: 'JavaScript', Icon: SiJavascript },
    { name: 'Node.js', Icon: SiNodedotjs },
    { name: 'Express', Icon: SiExpress },
    { name: 'NestJS', Icon: SiNestjs },
    { name: 'HTML5', Icon: SiHtml5 },
    { name: 'CSS3', Icon: SiCss3 },
    { name: 'MongoDB', Icon: SiMongodb },
    { name: 'PostgreSQL', Icon: SiPostgresql },
    { name: 'MySQL', Icon: SiMysql },
    { name: 'Docker', Icon: SiDocker },
    { name: 'Git', Icon: SiGit },
    { name: 'GitHub', Icon: SiGithub },
    { name: 'PHP', Icon: SiPhp },
    { name: 'Laravel', Icon: SiLaravel },
    { name: 'Vite', Icon: SiVite },
    { name: 'Livewire', Icon: SiLivewire },
]

interface FloatingIcon {
    name: string
    Icon: IconType
    left: number
    delay: number
    size: number
    duration: number
    swayDuration: number
    swayDistance: number
    swayDelay: number
}

interface TechnologiesAnimationProps {
    withBackground?: boolean
}

// Función simple para pseudo-random con semilla fija
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

const TOTAL_ICONS = 15

function generateIcons(): FloatingIcon[] {
    const icons: FloatingIcon[] = []

    for (let i = 0; i < TOTAL_ICONS; i++) {
        const seed = i + 1
        const tech = techs[i % techs.length]

        icons.push({
            ...tech,
            left: seededRandom(seed * 3) * 100,
            delay: seededRandom(seed * 7) * 25,
            size: 50 + seededRandom(seed * 11) * 30,
            duration: 12 + seededRandom(seed * 17) * 10,
            swayDuration: 3 + seededRandom(seed * 23) * 3,
            swayDistance: seededRandom(seed * 29) < 0.5 ? 0 : 2 + seededRandom(seed * 31) * 4,
            swayDelay: seededRandom(seed * 37) * 5,
        })
    }

    return icons
}

export default function TechnologiesAnimation({ withBackground = false }: TechnologiesAnimationProps) {
    const [icons, setIcons] = useState<FloatingIcon[]>([])
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024)

        checkIsDesktop()
        window.addEventListener('resize', checkIsDesktop)

        return () => window.removeEventListener('resize', checkIsDesktop)
    }, [])

    useEffect(() => {
        if (!isDesktop) {
            setIcons([])
            return
        }

        // Generar iconos con la misma animación fija
        setIcons(generateIcons())
    }, [isDesktop])

    if (!isDesktop || icons.length === 0) return null

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 -z-20 overflow-hidden pointer-events-none ${withBackground ? 'bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm' : ''
                }`}
        >
            {icons.map((icon, i) => {
                const Icon = icon.Icon
                return (
                    <motion.div
                        key={i}
                        initial={{ y: '100vh', opacity: 0 }}
                        animate={{ y: '-20vh', opacity: 0.3 }}
                        transition={{
                            duration: icon.duration,
                            delay: icon.delay,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'linear',
                        }}
                        className="absolute will-change-transform"
                        style={{
                            left: `${icon.left}%`,
                            width: icon.size,
                            height: icon.size,
                        }}
                    >
                        <motion.div
                            animate={{
                                x: [0, icon.swayDistance, 0, -icon.swayDistance, 0],
                            }}
                            transition={{
                                duration: icon.swayDuration,
                                repeat: Infinity,
                                repeatType: 'loop',
                                ease: 'easeInOut',
                                delay: icon.swayDelay,
                            }}
                            className="w-full h-full rounded-xl flex items-center justify-center p-2 backdrop-blur-md opacity-95 text-gray-800 dark:text-white"
                        >
                            <Icon className="w-full h-full" />
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}
