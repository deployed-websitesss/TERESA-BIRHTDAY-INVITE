import { useEffect, useRef } from "react"
import { loadMotionRuntime } from "../lib/motionRuntime.js"

/**
 * Lenis smooth scroll, driven by the GSAP ticker so that Lenis and
 * ScrollTrigger never fight over the same frame.
 *
 * Returns a ref holding a `scrollTo(target)` function that anchor links can
 * use. When motion is disabled the ref stays null and native anchors take over.
 */
export function useSmoothScroll(enabled) {
	const scrollToRef = useRef(null)

	useEffect(() => {
		if (!enabled) return undefined

		let cancelled = false
		let lenis = null
		let gsap = null
		let tick = null

		loadMotionRuntime()
			.then((runtime) => {
				if (cancelled) return
				gsap = runtime.gsap

				lenis = new runtime.Lenis({
					duration: 1.15,
					// Long, decelerating glide — cinematic rather than springy.
					easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					smoothWheel: true,
					syncTouch: false, // native momentum on phones feels better
				})

				lenis.on("scroll", runtime.ScrollTrigger.update)

				tick = (time) => lenis.raf(time * 1000)
				gsap.ticker.add(tick)
				gsap.ticker.lagSmoothing(0)

				scrollToRef.current = (target) =>
					lenis.scrollTo(target, { offset: -8, duration: 1.4 })
			})
			.catch(() => {
				/* Native scrolling is a perfectly good fallback. */
			})

		return () => {
			cancelled = true
			scrollToRef.current = null
			if (gsap && tick) gsap.ticker.remove(tick)
			if (lenis) lenis.destroy()
		}
	}, [enabled])

	return scrollToRef
}
