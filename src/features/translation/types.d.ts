/** Translation info */
export type Info = {
	/** The path to the localization folder */
	path: string
	/** The language to use */
	lang: string
	/** The namespaces to use */
	namespaces: string[]
	/** A fallback language to use */
	fallbackLang: string | null
}

/** The translations */
export type Translations = Record<any, any>