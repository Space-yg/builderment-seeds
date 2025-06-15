import React from "react"
import { Link } from "react-router"
import { useTranslation } from "@/features/translation"

import "./styles.scss"

type Props = {
	versionsText: string
}

export default function Footer({ versionsText }: Props) {
	const t = useTranslation(["footer"])

	return (
		<footer className="footer">
			<p>{t("inquiry", {
				"Builderment Discord server": <a href="https://discord.gg/builderment-618226575652945941" target="_blank">Builderment Discord server</a>
			})}</p>
			<p><Link to="/versions">{versionsText.slice(3, versionsText.indexOf("\n"))}</Link></p>
		</footer>
	)
}