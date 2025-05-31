import React from "react"
import ReactDOMServer from "react-dom/server"
import { Section } from "@/components/layout"
import { useTranslation } from "@/features/translation"
import TranslationSelect from "../TranslationSelect/TranslationSelect"

import "./styles.scss"

type Props = {}

export default function Header({ }: Props) {
	const t = useTranslation(["header"])

	return (
		<Section tag="header" className="header">
			<TranslationSelect />
			<h1>{t("Builderment Seeds")}</h1>
			<p>{t("welcome", {
				"Space.yg": <a href="https://discordapp.com/users/710012954736590908" target="_blank">Space.yg</a>,
				"Human-Crow": <a href="https://discordapp.com/users/947807205028139018" target="_blank">Human-Crow</a>,
			})}</p>
			<p>{t("tips")}:</p>
			<ul>
				<li>{t("tip1")}</li>
				<li>{t("tip2")}</li>
			</ul>
			<p>{t("notes")}</p>
			<ul>
				<li>{t("note1")}</li>
				<li>{t("note2", {
					"open new tab icon": <img style={{ width: ".75em" }} src={import.meta.env.BASE_URL + "/images/new-tab.svg"} alt={ReactDOMServer.renderToStaticMarkup(t("Open in new tab icon"))} />
				})}</li>
			</ul>
		</Section>
	)
}