'use client'

import { useEffect, useRef } from 'react'

export default function BitsBackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationIdRef = useRef<number | null>(null)
    const blocksRef = useRef<number[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const blockSize = 16
        const blockGap = 6
        const totalBlock = blockSize + blockGap

        let width = window.innerWidth
        let height = window.innerHeight
        canvas.width = width
        canvas.height = height

        const cols = Math.floor(width / totalBlock)
        const rows = Math.floor(height / totalBlock)

        blocksRef.current = Array.from({ length: rows * cols }, () => (Math.random() > 0.5 ? 1 : 0))

        function draw() {
            if (!ctx) return

            ctx.clearRect(0, 0, width, height)

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const i = row * cols + col
                    const x = col * totalBlock
                    const y = row * totalBlock

                    const on = blocksRef.current[i] === 1
                    ctx.fillStyle = on ? 'rgba(200, 200, 200, 0.15)' : 'rgba(200, 200, 200, 0.08)'
                    ctx.fillRect(x, y, blockSize, blockSize)

                    // Animación aleatoria de encendido y apagado
                    if (Math.random() < 0.005) {
                        blocksRef.current[i] = blocksRef.current[i] === 1 ? 0 : 1
                    }
                }
            }

            animationIdRef.current = requestAnimationFrame(draw)
        }

        draw()

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (animationIdRef.current !== null) {
                cancelAnimationFrame(animationIdRef.current)
            }
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none select-none"
            aria-hidden="true"
        />
    )
}