import { useState, useEffect } from 'react'

export function useIsDesktop(breakpoint = 1024): boolean {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const checkIsDesktop = () => setIsDesktop(window.innerWidth >= breakpoint)

        checkIsDesktop()
        window.addEventListener('resize', checkIsDesktop)

        return () => window.removeEventListener('resize', checkIsDesktop)
    }, [breakpoint])

    return isDesktop
}