export default function PullQuote({ quote }) {
	return (
		<section
			className="quote on-navy"
			aria-label="A word from the hosts"
			data-parallax-scope
		>
			<div className="quote__media" aria-hidden="true">
				<img
					src="/assets/water-1600.jpg"
					srcSet="/assets/water-900.jpg 900w, /assets/water-1600.jpg 1600w"
					sizes="100vw"
					width="1600"
					height="688"
					alt=""
					loading="lazy"
					decoding="async"
					data-parallax="0.12"
				/>
			</div>
			{/* Keeps the type on solid navy; the sea stays in the empty margin. */}
			<div className="quote__scrim" aria-hidden="true" />

			<div className="shell grid12">
				<blockquote className="quote__body">
					<p className="quote__mark" aria-hidden="true">
						“
					</p>
					<p className="quote__text" data-reveal>
						{quote.text}
					</p>
					<footer className="quote__attr" data-reveal data-reveal-delay="0.1">
						{quote.attribution}
					</footer>
				</blockquote>
			</div>
		</section>
	)
}
