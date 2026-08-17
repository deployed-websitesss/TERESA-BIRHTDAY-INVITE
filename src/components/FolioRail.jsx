/**
 * A plumb line down the left margin: hairline rule, gold thread that grows
 * with reading progress, and a rotated folio mark. Purely decorative, so it
 * is hidden from assistive technology and from narrow viewports.
 */
export default function FolioRail({ label }) {
	return (
		<div className="folio-rail" aria-hidden="true">
			<span className="folio-rail__progress" data-progress />
			<span className="folio-rail__mark">{label}</span>
		</div>
	)
}
