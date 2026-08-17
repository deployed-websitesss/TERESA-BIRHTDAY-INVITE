import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "tc-theme"

/**
 * Day / night ground for the invitation. Defaults to "day" on the server,
 * on first paint, and for every new visitor. Only a previously stored
 * choice will switch to "night".
 */
export function useTheme() {
	const [theme, setTheme] = useState("day")

	useEffect(() => {
		let next = null
		try {
			next = window.localStorage.getItem(STORAGE_KEY)
		} catch {
			next = null
		}
		if (next !== "day" && next !== "night") {
			next = "day"
		}
		setTheme(next)
	}, [])

	useEffect(() => {
		const root = document.documentElement
		root.dataset.theme = theme
		root.style.colorScheme = theme === "night" ? "dark" : "light"
		try {
			window.localStorage.setItem(STORAGE_KEY, theme)
		} catch {
			/* private mode — the choice simply doesn't persist */
		}
	}, [theme])

	const toggleTheme = useCallback(
		() => setTheme((current) => (current === "night" ? "day" : "night")),
		[],
	)

	return { theme, toggleTheme }
}
