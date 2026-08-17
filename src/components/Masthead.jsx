export default function Masthead({
	monogram,
	celebrant,
	onAnchor,
	theme,
	onToggleTheme,
}) {
	const night = theme === "night"
	return (
		<header className="masthead" data-masthead>
			<div className="shell masthead__row">
				<a
					className="masthead__monogram"
					href="#top"
					aria-label={`${celebrant} — return to the top of the invitation`}
					onClick={(event) => onAnchor(event, "#top")}
				>
					{monogram}
				</a>

				<div className="masthead__aside">
					<button
						type="button"
						className="lamp"
						onClick={onToggleTheme}
						aria-pressed={night}
						aria-label={
							night ? "Switch to the daylight edition" : "Switch to the evening edition"
						}
					>
						<span className="lamp__dial" aria-hidden="true">
							<span className="lamp__bead" />
						</span>
						<span className="lamp__label">{night ? "Evening" : "Daylight"}</span>
					</button>

					<a
						className="masthead__cta"
						href="#rsvp"
						onClick={(event) => onAnchor(event, "#rsvp")}
					>
						R.S.V.P.
					</a>
				</div>
			</div>
		</header>
	)
}
