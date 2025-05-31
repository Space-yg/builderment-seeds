import React, { createContext, useContext } from "react"
import { Info } from "../types"

/** The translations information context */
export const TranslationsInfoContext = createContext<Info>({ path: "", lang: "", namespaces: [], fallbackLang: null })

/** Get the translationsInfo */
export function useTranslationsInfo() {
	return useContext(TranslationsInfoContext)
}