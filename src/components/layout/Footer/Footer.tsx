import React from "react"
import { Link } from "react-router"

import "./styles.scss"
import { useTranslation } from "@/features/translation"

type Props = {}

export default function Footer({ }: Props) {
	const t = useTranslation(["footer"])

	return (
		<footer className="footer">
			<p>{t("inquiry", {
				"Builderment Discord server": <a href="https://discord.gg/builderment-618226575652945941" target="_blank">Builderment Discord server</a>
			})}</p>
			<p><Link to="/versions">V2.0.0</Link></p>
		</footer>
	)
}