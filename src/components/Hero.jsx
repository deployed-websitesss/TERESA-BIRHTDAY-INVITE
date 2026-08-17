import { forwardRef, Fragment } from "react"

const Hero = forwardRef(function Hero({ hero, celebrant, onAnchor }, ref) {
	return (
		<section className="hero" id="top" ref={ref} data-parallax-scope>
			<div className="hero__media" aria-hidden="true">
				<img
					src={`${import.meta.env.BASE_URL}assets/hero-sea-1800.jpg`}
					srcSet={`${import.meta.env.BASE_URL}assets/hero-sea-1000.jpg 1000w, ${import.meta.env.BASE_URL}assets/hero-sea-1800.jpg 1800w`}
					sizes="100vw"
					width="1808"
					height="768"
					alt={hero.imageAlt}
					fetchPriority="high"
					decoding="async"
					data-parallax="0.16"
				/>
			</div>
			<div className="hero__scrim" aria-hidden="true" />
			<div className="hero__sheen" aria-hidden="true" />

			<p className="hero__folio shell" aria-hidden="true">
				<span>{hero.folioLeft}</span>
				<span className="hero__folio-rule" />
				<span>{hero.folioRight}</span>
			</p>

			<div className="hero__inner shell">
				<p className="hero__kicker" data-hero-line>
					{hero.kicker}
				</p>

				<h1 className="hero__name">
					<span className="hero__name-a" data-hero-line>
						{celebrant.first}
					</span>
					<span className="hero__name-b" data-hero-line>
						{celebrant.last}
					</span>
				</h1>

				<p className="hero__meta" data-hero-line>
					{hero.meta.map((item, index) => (
						<Fragment key={item}>
							{index > 0 && (
								<span className="hero__meta-sep" aria-hidden="true" />
							)}
							<span>{item}</span>
						</Fragment>
					))}
				</p>
			</div>

			<div className="hero__foot shell">
				<a
					className="hero__scroll"
					href="#details"
					data-hero-line
					onClick={(event) => onAnchor(event, "#details")}
				>
					<span>{hero.scrollLabel}</span>
					<span className="hero__scroll-line" aria-hidden="true" />
				</a>
			</div>
		</section>
	)
})

export default Hero
