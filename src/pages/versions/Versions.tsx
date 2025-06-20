import React, { useEffect, useState } from "react"
import { Link } from "react-router"
import { Section } from "@/components/layout"
// import { Edit, Head, QueryElement } from "@/features/edit"
import md from "./markdown-it"
import "./markdown-it/heading_close"
import "./markdown-it/heading_open"
import "./markdown-it/link_open"

import "./styles.scss"

type Props = {
	versionsText: string
}

export default function Versions({ versionsText }: Props) {
	useEffect(() => {
		// Add the .versions class to the body
		document.body.className = "versions"
		// document.title = "Versions - Builderment Seeds"
	}, [])

	return (
		<>
			{/* <Head className="hi">
				<Edit>
					<title>hi</title>
					<meta name="viewport" />
					<QueryElement element={<meta name="viewport" />} />
				</Edit>
			</Head> */}
			<Section tag="header" className="header">
				<h1>Versions</h1>

				<p>Here are the versions of the Builderment Seeds website! If you have any suggestions, be sure to send on the Builderment Discord server.</p>
				<p>Click <Link to="/">here</Link> to go back to the main page.</p>
				<p>The dates on this page are in the format of "I'm not American."</p>
			</Section>
			<main className="collection main" dangerouslySetInnerHTML={{ __html: md.render(versionsText) }}></main>
		</>
	)
}