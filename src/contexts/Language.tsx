import React, { createContext, ReactNode, useContext } from "react"
import { useImmerReducer } from "use-immer"

/** The type of the language context */
type LanguageContextType = string
/** The default value for the language context */
const defaultValue: LanguageContextType = localStorage.getItem("language") ?? navigator.language.split("-")[0]

/** All actions that can be done on language */
type Actions = {
	type: "set",
	language: LanguageContextType
}

/** The language context */
const languageContext = createContext<LanguageContextType>(defaultValue)
/** The language dispatch context */
const languageDispatchContext = createContext<React.ActionDispatch<[Actions]> | null>(null)

/**
 * Execute an action on the language
 * @param draft The current language
 * @param action The action to make on the language
 * @returns The new language
 */
function languageReducer(draft: LanguageContextType, action: Actions): LanguageContextType | void {
	switch (action.type) {
		case "set":
			return action.language
	}
}

type Props = {
	children: ReactNode
}

/** Provider for the language context */
export function LanguageProvider({ children }: Props) {
	const [language, dispatch] = useImmerReducer<LanguageContextType, Actions>(languageReducer, defaultValue)

	return (
		<languageDispatchContext.Provider value={dispatch}>
			<languageContext.Provider value={language}>
				{children}
			</languageContext.Provider>
		</languageDispatchContext.Provider>
	)
}

/** Get the language */
export function useLanguage() {
	return useContext(languageContext)
}

/** Execute an event on the language */
export function useLanguageDispatch() {
	return useContext(languageDispatchContext)!
}