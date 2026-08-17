import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function readPreference() {
	if (typeof window === "undefined" || !window.matchMedia) return true
	return window.matchMedia(QUERY).matches
}

/**
 * Tracks the visitor's motion preference and keeps up with live changes
 * (macOS and Windows both allow toggling this without a reload).
 *
 * The initial value is read during the first render — not in an effect — so
 * the choreography hooks never briefly run with the wrong answer and flash
 * the content into view.
 */
export function usePrefersReducedMotion() {
	const [prefersReduced, setPrefersReduced] = useState(readPreference)

	useEffect(() => {
		const mediaQuery = window.matchMedia(QUERY)
		const sync = () => setPrefersReduced(mediaQuery.matches)
		sync()
		mediaQuery.addEventListener("change", sync)
		return () => mediaQuery.removeEventListener("change", sync)
	}, [])

	return prefersReduced
}
