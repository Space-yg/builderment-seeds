import React from "react"
import { Section } from "@/components/layout"

import "./styles.scss"

type Props = {}

export default function Header({ }: Props) {
	return (
		<Section tag="header" className="header">
			<h1>Builderment Seeds</h1>
			<p>Hello! Welcome to the Builderment Seeds! Here you can search for any seed you want! This website is made by <a href="https://discordapp.com/users/710012954736590908" target="_blank">Space.yg</a> and <a href="https://discordapp.com/users/947807205028139018" target="_blank">Human-Crow</a>.</p>
			<p>Tips:</p>
			<ul>
				<li>Click on a seed to copy.</li>
				<li>Click on a number at the Resource column to get an accurate amount.</li>
			</ul>
			<p>Notes:</p>
			<ul>
				<li>The World Size and Resource Amount are available only to people with advanced world settings. if you do not have advanced world settings, the default for both is 100%.</li>
			</ul>
		</Section>
	)
}