import { useEffect } from "react"
import { loadMotionRuntime, revealEverything } from "../lib/motionRuntime.js"

/**
 * The opening beat, handled by Motion rather than GSAP: a slow, staggered
 * rise of the hero lines. Deliberately unhurried — roughly 1.4s per line —
 * so the page feels like a card being lifted rather than a slide deck.
 */
export function useHeroEntrance({ enabled, heroRef }) {
	useEffect(() => {
		const hero = heroRef.current
		if (!hero) return undefined

		const lines = hero.querySelectorAll("[data-hero-line]")
		if (!lines.length) return undefined

		if (!enabled) {
			lines.forEach((el) => el.classList.add("is-revealed"))
			return undefined
		}

		let cancelled = false
		let controls = null

		loadMotionRuntime()
			.then(({ animate, stagger }) => {
				if (cancelled) return
				controls = animate(
					lines,
					{ opacity: [0, 1], transform: ["translateY(26px)", "translateY(0px)"] },
					{
						duration: 1.4,
						delay: stagger(0.16, { startDelay: 0.2 }),
						ease: [0.22, 0.61, 0.36, 1],
					},
				)
			})
			.catch(() => revealEverything(hero))

		return () => {
			cancelled = true
			if (controls && typeof controls.stop === "function") controls.stop()
		}
	}, [enabled, heroRef])
}
