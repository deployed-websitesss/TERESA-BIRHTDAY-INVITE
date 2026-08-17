import { useEffect } from "react"
import { loadMotionRuntime, revealEverything } from "../lib/motionRuntime.js"

/**
 * All scroll choreography, in one place, scoped to a gsap.context so that
 * every tween and ScrollTrigger is reverted cleanly on unmount.
 *
 *  · [data-reveal]        → single, calm fade + rise on entry (never repeats)
 *  · [data-parallax]      → slow drift inside [data-parallax-scope]
 *  · [data-draw]          → gold hairline draws itself as you pass
 *  · [data-progress]      → plumb line down the left folio rail
 *  · [data-masthead]      → hairline rule appears once you leave the hero
 */
export function useScrollScenes({ enabled, rootRef }) {
	useEffect(() => {
		const root = rootRef.current
		if (!root) return undefined

		// The masthead backdrop is legibility, not decoration: without it, text
		// scrolls under a transparent fixed header. It stays on even when the
		// rest of the choreography is switched off.
		const masthead = root.querySelector("[data-masthead]")
		const syncMasthead = () => {
			if (masthead) masthead.classList.toggle("is-stuck", window.scrollY > 80)
		}

		if (!enabled) {
			revealEverything(root)
			syncMasthead()
			window.addEventListener("scroll", syncMasthead, { passive: true })
			return () => window.removeEventListener("scroll", syncMasthead)
		}

		let cancelled = false
		let context = null

		loadMotionRuntime()
			.then(({ gsap, ScrollTrigger }) => {
				if (cancelled) return

				context = gsap.context(() => {
					gsap.utils.toArray("[data-reveal]").forEach((el) => {
						gsap.to(el, {
							opacity: 1,
							y: 0,
							duration: 1.1,
							ease: "power2.out",
							delay: Number(el.dataset.revealDelay || 0),
							scrollTrigger: { trigger: el, start: "top 86%", once: true },
						})
					})

					gsap.utils.toArray("[data-parallax]").forEach((el) => {
						const depth = Number(el.dataset.parallax || 0.15)
						const scope = el.closest("[data-parallax-scope]") || el
						gsap.fromTo(
							el,
							{ yPercent: -depth * 50 },
							{
								yPercent: depth * 50,
								ease: "none",
								scrollTrigger: {
									trigger: scope,
									start: "top bottom",
									end: "bottom top",
									scrub: true,
									invalidateOnRefresh: true,
								},
							},
						)
					})

					gsap.utils.toArray("[data-draw]").forEach((path) => {
						gsap.fromTo(
							path,
							{ strokeDashoffset: 1 },
							{
								strokeDashoffset: 0,
								ease: "none",
								scrollTrigger: {
									trigger: path,
									start: "top 92%",
									end: "bottom 55%",
									scrub: 0.6,
								},
							},
						)
					})

					const progress = root.querySelector("[data-progress]")
					if (progress) {
						gsap.fromTo(
							progress,
							{ scaleY: 0 },
							{
								scaleY: 1,
								ease: "none",
								scrollTrigger: {
									trigger: root,
									start: "top top",
									end: "bottom bottom",
									scrub: 0.4,
								},
							},
						)
					}

					if (masthead) {
						ScrollTrigger.create({
							trigger: root,
							start: "top top-=80",
							end: "bottom bottom",
							onToggle: (self) =>
								masthead.classList.toggle("is-stuck", self.isActive),
						})
					}
				}, root)
			})
			.catch(() => revealEverything(root))

		return () => {
			cancelled = true
			if (context) context.revert()
		}
	}, [enabled, rootRef])
}
