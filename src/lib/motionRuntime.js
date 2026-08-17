/**
 * Lazily loads GSAP + ScrollTrigger + Lenis + Motion, once, on demand.
 *
 * Why dynamic import instead of a top-level import?
 *  1. Performance — the animation layer (~70kb gzipped) is code-split and is
 *     never requested at all by visitors who prefer reduced motion, or by
 *     anyone on a device where the load fails.
 *  2. Resilience — if the chunk fails, the invitation is still complete and
 *     readable; only the choreography is lost.
 */

let runtimePromise = null

export function loadMotionRuntime() {
	if (!runtimePromise) {
		runtimePromise = (async () => {
			const [lenisModule, gsapModule, scrollTriggerModule, motionModule] =
				await Promise.all([
					import("lenis"),
					import("gsap"),
					import("gsap/ScrollTrigger"),
					import("motion"),
				])

			const gsap = gsapModule.gsap ?? gsapModule.default
			const { ScrollTrigger } = scrollTriggerModule
			gsap.registerPlugin(ScrollTrigger)

			return {
				gsap,
				ScrollTrigger,
				Lenis: lenisModule.default ?? lenisModule.Lenis,
				animate: motionModule.animate,
				stagger: motionModule.stagger,
			}
		})()
	}
	return runtimePromise
}

/** Fallback used whenever choreography is unavailable: show everything. */
export function revealEverything(root = document) {
	document.documentElement.classList.remove("js-motion")
	root
		.querySelectorAll("[data-reveal], [data-hero-line]")
		.forEach((el) => el.classList.add("is-revealed"))
}
