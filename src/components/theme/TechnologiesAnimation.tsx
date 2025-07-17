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

export default function TechnologiesAnimation({ withBackground = false }: TechnologiesAnimationProps) {
    const [icons, setIcons] = useState<FloatingIcon[]>([])

    useEffect(() => {
        const newIcons: FloatingIcon[] = Array.from({ length: 15 }, () => {
            const tech = techs[Math.floor(Math.random() * techs.length)]
            return {
                ...tech,
                left: Math.random() * 100,
                delay: Math.random() * 25,
                size: 50 + Math.random() * 30,
                duration: 12 + Math.random() * 10,
                swayDuration: 3 + Math.random() * 3,
                swayDistance: Math.random() < 0.5 ? 0 : 2 + Math.random() * 4,
                swayDelay: Math.random() * 5,
            }
        })
        setIcons(newIcons)
    }, [])

    if (icons.length === 0) return null

    return (
        <div
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
                        className="absolute"
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
                            className="w-full h-full rounded-xl flex items-center justify-center p-2
                backdrop-blur-md
                opacity-95
                text-gray-800 dark:text-white"
                        >
                            <Icon className="w-full h-full" />
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}
