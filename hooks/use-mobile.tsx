"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)

        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }

        // Initial check
        checkIfMobile()

        // Add event listener
        window.addEventListener("resize", checkIfMobile)

        // Clean up
        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    // Return false during SSR to prevent hydration mismatch
    if (!isHydrated) {
        return false
    }

    return isMobile
}
