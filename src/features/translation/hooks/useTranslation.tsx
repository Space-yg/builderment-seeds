import { useTranslationsInfo } from '../context/TranslationsInfo'
import { CreateTranslation } from '../Translation'

import type { Info, Translations } from '../types'

const cache: Record<string, Translations> = {}
let fallbackLangPromises: Promise<any> | undefined = undefined
let langPromises: Promise<any> | undefined = undefined

let langFolderChecks: { [path: string]: boolean } = {}
let langFolderCheckPromise: Promise<any> | undefined = undefined

function useCheckFolder(path: string, promise: Promise<any> | undefined): boolean {
	if (typeof langFolderChecks[path] !== "undefined") return langFolderChecks[path]

	if (typeof promise !== "undefined") throw promise

	// Try to fetch the file
	promise = fetch(path)
		.then(res => res.text()) // Try to get the text
		.then(text => langFolderChecks[path] = true) // true if file found
		.catch(err => langFolderChecks[path] = false) // false if file is not found

	throw promise
}

/**
 * Gets the translations for a single language only.
 * @param info The translation info
 * @param promise The promise to check if this translation is resolved
 * @returns The translations
 */
function useCreateTranslation(info: Info, promise: Promise<any> | undefined): Translations {
	let translations: Translations = {}

	// Check if all needed information is there
	if (info.path && info.lang && info.namespaces.length !== 0) {
		// Check cache for each namespace
		let nonCachedNamespaces: string[] = []
		for (const namespace of info.namespaces) {
			if (!(`${info.path}/${info.lang}/${namespace}` in cache)) {
				nonCachedNamespaces.push(namespace)
			}
		}

		// All namespaces are in cache
		if (nonCachedNamespaces.length === 0) {
			for (const namespace of info.namespaces) {
				Object.assign(translations, cache[`${info.path}/${info.lang}/${namespace}`])
			}
		}
		// Some or all namespaces are NOT in cache
		else {
			if (typeof promise !== "undefined") throw promise

			let allLangPromises: Promise<any>[] = []
			for (const namespace of info.namespaces) {
				allLangPromises.push(
					fetch(`${info.path}/${info.lang}/${namespace}.json`)
						.then(res => res.json())
						.then(json => {
							cache[`${info.path}/${info.lang}/${namespace}`] = json
							Object.assign(translations, json)
						})
						.catch(() => {
							cache[`${info.path}/${info.lang}/${namespace}`] = {}
						})
				)
			}
			promise = Promise.all(allLangPromises)

			throw promise
		}
	}

	return translations
}

/**
 * Compare two translations objects with each other recursively
 * @param currentTranslation The current translation
 * @param nestedTranslation The current nested translation
 * @param lang The language of the translation
 * @param langTranslations The translation object of the language
 * @param fallbackLang The fallback language of the translation
 * @param fallbackTranslations The translation object of the fallback language
 */
function compareTranslationsRecursively(currentTranslation: string, nestedTranslation: string, lang: string, langTranslations: Translations, fallbackLang: string, fallbackTranslations: Translations): void {
	// Object
	if (typeof fallbackTranslations[currentTranslation] === "object") for (const innerFallbackTranslation in fallbackTranslations[currentTranslation]) {
		if (typeof langTranslations[currentTranslation] === "undefined") console.error(`Cannot find "${nestedTranslation}" from language ${fallbackLang} in language ${lang}`)
		else compareTranslationsRecursively(innerFallbackTranslation, `${nestedTranslation}.${innerFallbackTranslation}`, lang, langTranslations[currentTranslation], fallbackLang, fallbackTranslations[currentTranslation])
	}
	// NOT Object
	else if (!(currentTranslation in langTranslations)) console.error(`Cannot find "${nestedTranslation}" from language ${fallbackLang} in language ${lang}`)
}

/**
 * Compares two translations objects with each other
 * @param lang The language of the translation
 * @param langTranslations The translation object of the language
 * @param fallbackLang The fallback language of the translation
 * @param fallbackTranslations The translation object of the fallback language
 */
function compareTranslations(lang: string, langTranslations: Translations, fallbackLang: string, fallbackTranslations: Translations): void {
	for (const fallbackTranslation in fallbackTranslations) compareTranslationsRecursively(fallbackTranslation, fallbackTranslation, lang, langTranslations, fallbackLang, fallbackTranslations)
}

/**
 * Assign all key-value paris from an object to another object. It does it recursively.
 * @param from The object to get the key-value pairs from.
 * @param to The object to assign the key-value pairs to.
 */
function ObjectAssign(from: Record<any, any>, to: Record<any, any>) {
	for (const key in from) {
		if (typeof from[key] === "object") {
			if (typeof to[key] !== "object") to[key] = {}
			ObjectAssign(from[key], to[key])
		}
		else to[key] = from[key]
	}
}

/**
 * Get the translation
 * @param namespaces The namespaces to get
 * @param options Edit the info
 */
export function useTranslation(namespaces?: string[], options?: Omit<Partial<Info>, "namespaces">) {
	const currentInfo = useTranslationsInfo()
	const info: Info = {
		path: options?.path ?? currentInfo.path,
		lang: options?.lang ?? currentInfo.lang,
		namespaces: currentInfo.namespaces.concat(namespaces ?? []),
		fallbackLang: typeof options?.fallbackLang === "undefined" ? currentInfo.fallbackLang : options?.fallbackLang,
	}
	let translations: Translations = {}

	// Add fallback first, if there is
	if (info.fallbackLang && info.fallbackLang !== info.lang) {
		try {
			ObjectAssign(useCreateTranslation({ ...info, lang: info.fallbackLang }, fallbackLangPromises), translations)
		} catch (err) {
			// Promise error (expected)
			if (err instanceof Promise) {
				fallbackLangPromises = err
				throw fallbackLangPromises
			}
			// Any other error
			else {
				console.error(err)
				throw err
			}
		}
	}

	// Check if lang folder exists
	const folderToCheck = `${info.path}/${info.lang}/header.json`
	try {
		// Using an if condition to not repeatedly try to check if the file exists or not each render
		if (typeof langFolderChecks[folderToCheck] === "undefined") useCheckFolder(folderToCheck, langFolderCheckPromise)
	} catch (err) {
		// Promise error (expected)
		if (err instanceof Promise) {
			langFolderCheckPromise = err
			throw langFolderCheckPromise
		}
		// Any other error
		else {
			console.error(err)
			throw err
		}
	}

	// if lang folder exists
	if (langFolderChecks[folderToCheck]) {
		// Add lang translations
		try {
			let langTrans = useCreateTranslation(info, langPromises)

			// Display all missing translations from language compared to the fallback language
			if (info.fallbackLang && info.fallbackLang !== info.lang) compareTranslations(info.lang, langTrans, info.fallbackLang, translations)

			ObjectAssign(langTrans, translations)
		} catch (err) {
			// Promise error (expected)
			if (err instanceof Promise) {
				langPromises = err
				throw langPromises
			}
			// Any other error
			else {
				console.error(err)
				throw err
			}
		}
	}

	langFolderCheckPromise = undefined
	langPromises = undefined
	fallbackLangPromises = undefined

	return CreateTranslation(translations)
}