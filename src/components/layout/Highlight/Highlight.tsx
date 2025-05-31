import React from "react"
import ReactDOMServer from "react-dom/server"
import { Link } from "react-router"
import { useTranslation } from "@/features/translation"

import "./styles.scss"

type Props = {}

export default function Highlight({ }: Props) {
	const t = useTranslation(["highlight"])

	return (
		<div className="highlight">
			<img src={import.meta.env.BASE_URL + "/images/palestinian-flag.png"} alt={ReactDOMServer.renderToStaticMarkup(t("Palestinian Flag"))} />
			<p>{t("Free Palestine")}. <Link to="/disclaimer">{t("Disclaimer")}</Link></p>
		</div>
	)
}