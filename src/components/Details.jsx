export default function Details({ details }) {
	return (
		<section className="details" id="details" aria-labelledby="details-title">
			<div className="shell grid12 details__grid">
				<div className="details__head">
					<p className="eyebrow details__index" data-reveal>
						{details.index} — {details.eyebrow}
					</p>
					<h2
						className="details__title"
						id="details-title"
						data-reveal
						data-reveal-delay="0.08"
					>
						{details.titleTop}
						<em>{details.titleEm}</em>
					</h2>
					<p className="details__intro" data-reveal data-reveal-delay="0.16">
						{details.intro}
					</p>
				</div>

				<figure className="details__figure" data-reveal>
					<div className="details__frame">
						<img
							src={`${import.meta.env.BASE_URL}assets/teak-cleat-900.jpg`}
							srcSet={`${import.meta.env.BASE_URL}assets/teak-cleat-560.jpg 560w, ${import.meta.env.BASE_URL}assets/teak-cleat-900.jpg 900w`}							
							sizes="(min-width: 960px) 30vw, 100vw"
							width="912"
							height="1344"
							alt={details.figureAlt}
							loading="lazy"
							decoding="async"
						/>
					</div>
					<figcaption className="details__caption">
						{details.figureCaption}
					</figcaption>
				</figure>

				<dl className="particulars">
					{details.entries.map((entry, index) => (
						<div
							className="particular"
							key={entry.term}
							data-reveal
							data-reveal-delay={index * 0.05}
						>
							<dt className="particular__term">{entry.term}</dt>
							<dd className="particular__body">
								<p className="particular__value">{entry.value}</p>
								<p className="particular__note">{entry.note}</p>
							</dd>
						</div>
					))}
				</dl>

				<div className="details__aside">
					<section className="ledger" aria-labelledby="order-title">
						<h3 className="ledger__title" id="order-title" data-reveal>
							{details.order.title}
						</h3>
						<ol className="ledger__list">
							{details.order.lines.map((line, index) => (
								<li
									className="ledger__row"
									key={line.event}
									data-reveal
									data-reveal-delay={index * 0.05}
								>
									<span className="ledger__time">{line.time}</span>
									<span className="ledger__event">{line.event}</span>
								</li>
							))}
						</ol>
					</section>

					<section className="arrival" aria-labelledby="arrival-title">
						<h3 className="ledger__title" id="arrival-title" data-reveal>
							{details.arrival.title}
						</h3>
						<p className="arrival__body" data-reveal data-reveal-delay="0.05">
							{details.arrival.body}
						</p>
					</section>
				</div>
			</div>
		</section>
	)
}
