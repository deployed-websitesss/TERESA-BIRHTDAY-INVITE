import { useEffect, useState } from "react"

/* Distance from now to the target, split into whole units.
   Server render and first client paint both use the same seed so
   hydration never mismatches; the ticking starts in an effect. */
function split(ms) {
	const total = Math.max(0, Math.floor(ms / 1000))
	return {
		days: Math.floor(total / 86400),
		hours: Math.floor((total % 86400) / 3600),
		minutes: Math.floor((total % 3600) / 60),
		seconds: total % 60,
		done: total === 0,
	}
}

const pad = (n, key) => (key === "days" ? String(n) : String(n).padStart(2, "0"))

export default function Countdown({ countdown }) {
	const target = new Date(countdown.target).getTime()
	const [now, setNow] = useState(null)

	useEffect(() => {
		setNow(Date.now())
		const id = setInterval(() => setNow(Date.now()), 1000)
		return () => clearInterval(id)
	}, [])

	const parts = split(target - (now ?? target))
	const started = now !== null
	const finished = started && parts.done

	return (
		<section className="countdown" id="countdown" aria-labelledby="countdown-title">
			<div className="countdown__grain" aria-hidden="true" />
			<div className="shell grid12">
				<div className="countdown__body">
					<p className="eyebrow countdown__eyebrow" data-reveal>
						{countdown.eyebrow}
					</p>
					<h2 className="countdown__title" id="countdown-title" data-reveal>
						{finished ? countdown.past : countdown.titleTop}
					</h2>

					{!finished && (
						<ol className="countdown__dials" data-reveal data-reveal-delay="0.1">
							{countdown.units.map((unit) => (
								<li className="dial" key={unit.key}>
									<span className="dial__value">
										{started ? pad(parts[unit.key], unit.key) : "—"}
									</span>
									<span className="dial__label">{unit.label}</span>
								</li>
							))}
						</ol>
					)}

					<p className="countdown__note" data-reveal data-reveal-delay="0.15">
						{countdown.note}
					</p>

					{/* Screen readers get one calm sentence, not a per-second stream. */}
					<p className="visually-hidden" aria-live="polite">
						{started && !finished
							? `${parts.days} days, ${parts.hours} hours and ${parts.minutes} minutes until boarding.`
							: ""}
					</p>
				</div>
			</div>
		</section>
	)
}
