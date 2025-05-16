import React, { useState } from "react"
import SeedsTableRow from "../SeedsTableRow"
import { Section } from "@components/layout"
import { useFilteredSeeds } from "@context/FilteredSeedsContext"

import "./styles.scss"

type Props = {}

export default function SeedsTable({ }: Props) {
	const filteredSeeds = useFilteredSeeds()

	// Make all rows
	const [numberOfSeedToShow, setNumberOfSeedToShow] = useState(50)
	const trs: React.JSX.Element[] = filteredSeeds
		.slice(0, numberOfSeedToShow)	// First numberOfSeedToShow only
		.map(seed => {
			return (
				<SeedsTableRow key={seed.sd + seed.ws.toString() + seed.ra.toString()} seed={seed} />
			)
		})

	return (
		<Section tag="main">
			<table className="seeds-table">
				<thead>
					<tr>
						<th>Seed</th>
						<th>Wood Log</th>
						<th>Stone</th>
						<th>Iron Ore</th>
						<th>Copper Ore</th>
						<th>Coal</th>
						<th>Wolframite</th>
						<th>Uranium</th>
						<th>World Size</th>
						<th>Resource Amount</th>
						<th>Resource</th>
					</tr>
				</thead>
				<tbody>
					{trs}

					{filteredSeeds.length > numberOfSeedToShow &&
						<tr>
							<td colSpan={11}>
								<button type="button" onClick={e => setNumberOfSeedToShow(numberOfSeedToShow + 50)}>+</button>
							</td>
						</tr>
					}
				</tbody>
			</table>
		</Section>
	)
}