import React, { useEffect } from "react"
import { Link } from "react-router"
import { Section } from "@/components/layout"

import "./styles.scss"

type Props = {}

export default function Disclaimer({ }: Props) {
	useEffect(() => {
		// Add the .disclaimer class to the body
		document.body.className = "disclaimer"
		document.head.title = "Disclaimer - Builderment Seeds"
	}, [])

	return (
		<Section tag="main" className="main">
			<h1>Disclaimer</h1>
			<p>I, Space.yg, stand strongly with Palestine. I do not represent Builderment, the community, or the creator of Builderment.</p>
			<p><Link to="/">Go back to home page</Link></p>
		</Section>
	)
}