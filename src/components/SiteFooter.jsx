import { Fragment } from "react"

export default function SiteFooter({ footer, monogram }) {
	return (
		<footer className="site-footer on-navy">
			<div className="shell">
				<p className="site-footer__ornament" aria-hidden="true">
					<span className="site-footer__diamond" />
				</p>

				<div className="site-footer__row">
					<p className="site-footer__monogram" aria-hidden="true">
						{monogram}
					</p>

					<p className="site-footer__lines">
						{footer.lines.map((line, index) => (
							<Fragment key={line}>
								{index > 0 && <span aria-hidden="true">·</span>}
								<span>{line}</span>
							</Fragment>
						))}
					</p>

					<p className="site-footer__closing">{footer.closing}</p>
				</div>
			</div>
		</footer>
	)
}
