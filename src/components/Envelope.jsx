import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js"
import ribbonBow from "../assets/ribbon-bow.png"
import ribbonBand from "../assets/ribbon-band.png"

/**
 * OVERTURE — a full-screen gatefold invitation.
 *
 * Two doors hinged at their outer edges meet at a centre seam, tied shut with
 * a hand-knotted satin ribbon. Click / tap / Enter / Space advances:
 *
 *   closed  → open      ribbon unties and falls, doors swing out, card revealed
 *   open    → entered   the overlay dissolves, page scroll is released
 *
 * "open" auto-advances after a beat so a visitor who simply watches still
 * gets in; a second click skips the wait.
 *
 * All texture is CSS/SVG so nothing has to load. To swap in your own artwork
 * later, override the custom properties declared at the top of envelope.css
 * (--paper-grain, --paper-fibre) or replace <RibbonBow /> below — nothing else
 * depends on their internals.
 */

const DEFAULT_COPY = {
	eyebrow: "You are cordially invited aboard",
	addressee: "To our cherished guest",
	lockup: "Birthday Invitation",
	occasion: "Her Forty-Ninth Year · A Day At Sea",
	date: "The Fourth of September",
	action: "Tap to open",
	continueAction: "Tap to enter",
}

const AUTO_ADVANCE_MS = 1500

export default function Envelope({ celebrant, copy }) {
	const text = { ...DEFAULT_COPY, ...copy }
	const reducedPreference = usePrefersReducedMotion()
	const [mounted, setMounted] = useState(false)
	// Only trust the motion query after hydration — the server has no matchMedia
	// and a mismatched class here would be baked in permanently.
	const reduced = mounted && reducedPreference
	const [stage, setStage] = useState("closed") // closed | open | entered
	const sectionRef = useRef(null)

	useEffect(() => setMounted(true), [])

	function advance() {
		setStage((current) =>
			current === "closed" ? "open" : current === "open" ? "entered" : current,
		)
	}

	// Scroll lock lives on <html>: the document is what's being held still.
	useEffect(() => {
		const root = document.documentElement
		if (stage === "entered") {
			root.classList.remove("is-overture-locked")
			return undefined
		}
		root.classList.add("is-overture-locked")
		return () => root.classList.remove("is-overture-locked")
	}, [stage])

	useEffect(() => {
		if (stage !== "open") return undefined
		const t = setTimeout(advance, reduced ? 600 : AUTO_ADVANCE_MS)
		return () => clearTimeout(t)
	}, [stage, reduced])

	// Once dismissed, hand focus back to the page instead of stranding it.
	useEffect(() => {
		if (stage !== "entered") return
		const hero = document.getElementById("top")
		if (hero) hero.setAttribute("tabindex", "-1")
		hero?.focus?.({ preventScroll: true })
	}, [stage])

	const dismissed = stage === "entered"
	const first = celebrant?.first ?? "Teresa"
	const last = celebrant?.last ?? "Calitis"
	const monogram = celebrant?.monogram ?? "TC"

	return (
		<section
			ref={sectionRef}
			className={`overture overture--${stage}${reduced ? " overture--still" : ""}`}
			data-overture
			aria-hidden={dismissed || undefined}
			inert={dismissed || undefined}
		>
			<PaperDefs />

			<div className="overture__room" aria-hidden="true">
				{/* the card, sitting in the gatefold well */}
				<article className="folio">
					<div className="folio__paper" />
					<div className="folio__inner">
						<p className="folio__eyebrow">{text.eyebrow}</p>
						<p className="folio__lockup">{text.lockup}</p>
						<span className="folio__rule" />
						<h2 className="folio__name">
							<span className="folio__given">{first}</span>
							<span className="folio__family">{last}</span>
						</h2>
						<span className="folio__rule folio__rule--short" />
						<p className="folio__occasion">{text.occasion}</p>
						<p className="folio__date">{text.date}</p>
					</div>
				</article>

				{/* the two doors */}
				<div className="gate">
					<div className="gate__door gate__door--left">
						<div className="gate__paper" />
						<div className="gate__light" />
						<p className="gate__addressee">{text.addressee}</p>
						<span className="gate__seam-edge" />
					</div>
					<div className="gate__door gate__door--right">
						<div className="gate__paper" />
						<div className="gate__light" />
						<p className="gate__monogram">{monogram}</p>
						<span className="gate__seam-edge" />
					</div>
				</div>

				{/* the ribbon that ties them shut */}
				<div className="ribbon">
					<span
						className="ribbon__band ribbon__band--up"
						style={{ backgroundImage: `url(${ribbonBand})` }}
					/>
					<span
						className="ribbon__band ribbon__band--down"
						style={{ backgroundImage: `url(${ribbonBand})` }}
					/>
					<div className="ribbon__knot">
						<img
							className="ribbon__bow"
							src={ribbonBow}
							alt=""
							width={1024}
							height={1024}
							draggable="false"
						/>
						<span className="ribbon__seal">
							<span className="ribbon__seal-face">{monogram}</span>
						</span>
					</div>
				</div>

				<span className="overture__vignette" />
			</div>

			<button
				type="button"
				className="overture__control"
				onClick={advance}
				aria-expanded={stage !== "closed"}
				aria-label={
					stage === "closed"
						? `Open ${first}'s invitation`
						: `Enter ${first}'s invitation`
				}
				tabIndex={dismissed ? -1 : 0}
			>
				<span className="overture__cue">
					{stage === "closed" ? text.action : text.continueAction}
				</span>
			</button>

			<noscript>
				<style>{`.overture{position:static!important;opacity:1}
				.gate,.ribbon,.overture__control{display:none!important}
				html.is-overture-locked,html.is-overture-locked body{overflow:auto!important}`}</style>
			</noscript>
		</section>
	)
}


/* Shared paper filters. Kept in one hidden <svg> so both doors and the card
   can reference them without duplicating turbulence work. */
function PaperDefs() {
	return (
		<svg className="overture__defs" aria-hidden="true" focusable="false">
			<filter id="paperFibre">
				<feTurbulence type="fractalNoise" baseFrequency="0.6 0.9" numOctaves="4" seed="3" />
				<feColorMatrix type="saturate" values="0" />
			</filter>
		</svg>
	)
}
