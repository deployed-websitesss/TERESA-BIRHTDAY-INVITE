/**
 * A single hairline swell. `pathLength="1"` normalises the geometry so the
 * dash maths is a plain 1 → 0, and `non-scaling-stroke` keeps the line a true
 * hairline no matter how far the viewBox is stretched.
 */
export default function WaveRule() {
	return (
		<div className="waverule" aria-hidden="true">
			<svg
				viewBox="0 0 1200 40"
				preserveAspectRatio="none"
				role="presentation"
				focusable="false"
			>
				<path
					data-draw
					pathLength="1"
					d="M0 20C100 4 200 36 300 20S500 4 600 20 800 36 900 20 1100 4 1200 20"
				/>
			</svg>
		</div>
	)
}
