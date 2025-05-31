import React, { useCallback } from "react"
import { useLanguageDispatch } from "@/contexts/Language"

import "./styles.scss"

type Props = {}

export default function TranslationSelect({ }: Props) {
	const languageDispatch = useLanguageDispatch()

	const languagesOptions = [
		{
			option: "English",
			value: "en"
		},
		{
			option: "Nederlands",
			value: "nl"
		}
	]
	const options = languagesOptions.map(language => <option key={language.value} value={language.value}>{language.option}</option>)

	/** Handle on change event */
	const handleOnChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		// Save to localStorage the language
		localStorage.setItem("language", event.currentTarget.value)

		// Change language
		languageDispatch({
			type: "set",
			language: event.currentTarget.value,
		})
	}, [])

	/** Handle on key down event */
	const handleOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLSelectElement>) => {
		// Prevent switching language using arrows
		if (event.key === "ArrowDown" || event.key === "ArrowRight") {
			event.preventDefault()
		}
	}, [])

	return (
		<select className="translation-select" value="" onChange={handleOnChange} onKeyDown={handleOnKeyDown}>
			<option hidden></option>
			{options}
		</select>
	)
}