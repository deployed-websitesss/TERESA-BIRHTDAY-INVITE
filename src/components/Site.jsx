import { useCallback, useRef } from "react"
import invitation from "../data/invitation.js"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js"
import { useTheme } from "../hooks/useTheme.js"
import { useSmoothScroll } from "../hooks/useSmoothScroll.js"
import { useScrollScenes } from "../hooks/useScrollScenes.js"
import { useHeroEntrance } from "../hooks/useHeroEntrance.js"
import Envelope from "./Envelope.jsx"
import Masthead from "./Masthead.jsx"
import FolioRail from "./FolioRail.jsx"
import Hero from "./Hero.jsx"
import WaveRule from "./WaveRule.jsx"
import Details from "./Details.jsx"
import PullQuote from "./PullQuote.jsx"
import Countdown from "./Countdown.jsx"
import Rsvp from "./Rsvp.jsx"
import SiteFooter from "./SiteFooter.jsx"

export default function Site() {
	const rootRef = useRef(null)
	const heroRef = useRef(null)

	const prefersReducedMotion = usePrefersReducedMotion()
	const motionEnabled = !prefersReducedMotion
	const { theme, toggleTheme } = useTheme()

	const scrollToRef = useSmoothScroll(motionEnabled)
	useScrollScenes({ enabled: motionEnabled, rootRef })
	useHeroEntrance({ enabled: motionEnabled, heroRef })

	const handleAnchor = useCallback(
		(event, selector) => {
			const scrollTo = scrollToRef.current
			if (!scrollTo || event.metaKey || event.ctrlKey || event.shiftKey) return
			const target = document.querySelector(selector)
			if (!target) return
			event.preventDefault()
			scrollTo(target)
		},
		[scrollToRef],
	)

	return (
		<div ref={rootRef}>
			<a className="skip-link" href="#details">
				Skip to the details
			</a>

			<Masthead
				monogram={invitation.celebrant.monogram}
				celebrant={invitation.celebrant.full}
				onAnchor={handleAnchor}
				theme={theme}
				onToggleTheme={toggleTheme}
			/>
			<FolioRail label={invitation.folioRail} />
			<Envelope celebrant={invitation.celebrant} copy={invitation.envelope} />

			<main id="invitation">
				<Hero
					ref={heroRef}
					hero={invitation.hero}
					celebrant={invitation.celebrant}
					onAnchor={handleAnchor}
				/>
				<WaveRule />
				<Details details={invitation.details} />
				<Countdown countdown={invitation.countdown} />
				<PullQuote quote={invitation.quote} />
				<Rsvp rsvp={invitation.rsvp} />
			</main>

			<SiteFooter
				footer={invitation.footer}
				monogram={invitation.celebrant.monogram}
			/>
		</div>
	)
}
