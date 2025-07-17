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
]

interface FloatingBox {
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

export default function TechnologiesAnimation() {
    const [boxes, setBoxes] = useState<FloatingBox[]>([])

    useEffect(() => {
        const newBoxes: FloatingBox[] = Array.from({ length: 15 }, () => {
            const tech = techs[Math.floor(Math.random() * techs.length)]
            return {
                ...tech,
                left: Math.random() * 100,
                delay: Math.random() * 5,
                size: 40 + Math.random() * 30,
                duration: 10 + Math.random() * 10,
                swayDuration: 3 + Math.random() * 3,
                // swayDistance va de 0 a 6px para variar intensidad, algunas sin movimiento horizontal
                swayDistance: Math.random() < 0.5 ? 0 : 2 + Math.random() * 4,
                swayDelay: Math.random() * 5,
            }
        })
        setBoxes(newBoxes)
    }, [])

    if (boxes.length === 0) return null

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {boxes.map((box, i) => {
                const Icon = box.Icon
                return (
                    <motion.div
                        key={i}
                        initial={{ y: '100vh', opacity: 0 }}
                        animate={{ y: '-20vh', opacity: 0.2 }}
                        transition={{
                            duration: box.duration,
                            delay: box.delay,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'linear',
                        }}
                        className="absolute"
                        style={{
                            left: `${box.left}%`,
                            width: box.size,
                            height: box.size,
                        }}
                    >
                        <motion.div
                            animate={{
                                x: [
                                    0,
                                    box.swayDistance,
                                    0,
                                    -box.swayDistance,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: box.swayDuration,
                                repeat: Infinity,
                                repeatType: 'loop',
                                ease: 'easeInOut',
                                delay: box.swayDelay,
                            }}
                            className="w-full h-full bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-lg flex items-center justify-center p-2"
                        >
                            <Icon className="w-full h-full opacity-60" />
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}