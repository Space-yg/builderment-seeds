import React from 'react'

import "./styles.scss"
import { Section } from '@/components/layout'

type Props = {}

export default function Header({ }: Props) {
	return (
		<Section tag="header" className="header">
			<h1>Builderment Seeds</h1>
			<p>Hello! Welcome to the Builderment Seeds! Here you can search for any seed you want! This website is made by Space.yg and Human-Crow.</p>
			<p>Tips:</p>
			<ul>
				<li>Click on a seed to copy.</li>
				<li>Click on a number at the Resource column to get an accurate amount.</li>
			</ul>
			<p>Notes:</p>
			<ul>
				<li>The World Size and Resource Amount are available only to people with advanced world settings. if you do not have advanced world settings, the default for both is 100%.</li>
				<li>Choose the resource and it will calculate the maximum amount of that resource at the Resource column.</li>
				<li>When filtering a raw resource, it gets calculated from that raw resource's column. Other resources get calculated from all the resources.</li>
			</ul>
		</Section>
	)
}