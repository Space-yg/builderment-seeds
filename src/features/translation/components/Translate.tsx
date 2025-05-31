import React from "react"
import { TranslationsInfoContext, useTranslationsInfo } from "../context/TranslationsInfo"
import type { Info } from "../types"

type Props = Partial<Info> & {
	children?: React.ReactNode
}

/** Wrap around the components that want to use the translations */
export default function Translate({ children, path, lang, namespaces, fallbackLang }: Props) {
	const info = useTranslationsInfo()
	const newInfo: Info = {
		path: path ?? info.path,
		lang: lang ?? info.lang,
		namespaces: namespaces ?? info.namespaces,
		fallbackLang: typeof fallbackLang === "undefined" ? info.fallbackLang : fallbackLang
	}

	return (
		<TranslationsInfoContext value={newInfo}>
			{children}
		</TranslationsInfoContext>
	)
}