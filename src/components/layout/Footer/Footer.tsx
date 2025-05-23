import React from "react"
import { Link } from "react-router"

import "./styles.scss"

type Props = {}

export default function Footer({ }: Props) {
	return (
		<footer className="footer">
			<p>For any inquiries, ask on the <a href="https://discord.gg/builderment-618226575652945941" target="_blank">Builderment Discord server</a> :D</p>
			<p><Link to="/versions">V2.0.0</Link></p>
		</footer>
	)
}