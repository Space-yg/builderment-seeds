import React, { Fragment } from "react"
import type { Translations } from "./types"

function parseTranslationFromTranslations(translations: Translations, translation: string): string | undefined {
	const translationSplit = translation.split(".")
	let t: any = translations
	for (const key of translationSplit) {
		t = t[key]
		if (typeof t === "undefined") break
	}
	return t
}

/**
 * Create the translation function from the translations object
 * @param translations The translations
 * @returns The translation function (`t`)
 */
export function CreateTranslation(translations: Translations) {
	return function t(translation: string, placeholders?: Record<any, string | React.JSX.Element>, key?: React.Key | null | undefined): React.JSX.Element | React.JSX.Element[] {
		let trans = parseTranslationFromTranslations(translations, translation)

		if (typeof trans === "undefined") {
			console.error(`Cannot find "${translation}" in translations`)
			return <Fragment key={key}>{translation}</Fragment>
		}

		// If there are no placeholders provided, then return the string as ut is
		if (!placeholders) return <Fragment key={key}>{trans}</Fragment>

		// Get and place every placeholder
		let texts = new String(trans).split("{{").flatMap(text => text.split("}}"))
		let i = 0
		let element = texts.map(text => <Fragment key={key?.toString() ?? "" + i++}>{text in placeholders ? placeholders[text] : text}</Fragment>)

		return element
	}
}