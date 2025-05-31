import { useTranslationsInfo } from '../context/TranslationsInfo'
import { CreateTranslation } from '../Translation'
import type { Info, Translations } from '../types'

const cache: Record<string, Translations> = {}
let fallbackLangPromises: Promise<any> | undefined = undefined
let langPromises: Promise<any> | undefined = undefined

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
		compareTranslationsRecursively(innerFallbackTranslation, `${nestedTranslation}.${innerFallbackTranslation}`, lang, langTranslations[currentTranslation], fallbackLang, fallbackTranslations[currentTranslation])
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

	// Add fallback first if there is
	if (info.fallbackLang && info.fallbackLang !== info.lang) {
		try {
			Object.assign(translations, useCreateTranslation({ ...info, lang: info.fallbackLang }, fallbackLangPromises))
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

	langPromises = undefined
	fallbackLangPromises = undefined

	return CreateTranslation(translations)
}