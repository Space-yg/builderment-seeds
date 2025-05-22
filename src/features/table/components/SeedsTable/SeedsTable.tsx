import React, { useEffect, useRef, useState } from "react"
import SeedsTableRow from "../SeedsTableRow"
import { Section } from "@/components/layout"
import { useFilteredSeeds } from "@/context/FilteredSeedsContext"

import "./styles.scss"

type Props = {}

export default function SeedsTable({ }: Props) {
	const filteredSeeds = useFilteredSeeds()
	const table = useRef<HTMLTableElement>(null)
	const tableHead = useRef<HTMLTableSectionElement>(null)

	// Make all rows
	const defaultNumberOfSeedsToShow = 50
	const defaultNumberOfSeedsToAdd = 50
	const [numberOfSeedsToShow, setNumberOfSeedsToShow] = useState(defaultNumberOfSeedsToShow)
	const seedsToShow = filteredSeeds.slice(0, numberOfSeedsToShow)	// First numberOfSeedToShow only
	const trs: React.JSX.Element[] = seedsToShow.map(seed => <SeedsTableRow key={seed.sd + seed.ws.toString() + seed.ra.toString()} seed={seed} />)

	function scrollHandler(event: Event) {
		// Make the thead actually sticky
		tableHead.current!.style.top = Math.max(0, -table.current!.getBoundingClientRect().top) + "px"
	}

	useEffect(() => {
		document.removeEventListener("scroll", scrollHandler)
		document.addEventListener("scroll", scrollHandler)
	}, [])

	return (
		<Section tag="main" className="main">
			{/* This div is needed to make the vertical scrolling work */}
			<div className="table-wrapper">
				<table className="seeds-table" ref={table}>
					<thead ref={tableHead}>
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
					<tbody className="syncscroll">
						{trs}

						{filteredSeeds.length > defaultNumberOfSeedsToShow &&
							<tr className="show-more">
								{numberOfSeedsToShow > defaultNumberOfSeedsToShow &&
									<td colSpan={filteredSeeds.length > numberOfSeedsToShow ? 2 : 11}>
										<button type="button" onClick={e => setNumberOfSeedsToShow(numberOfSeedsToShow - defaultNumberOfSeedsToAdd)}>Show Less</button>
									</td>
								}

								{filteredSeeds.length > numberOfSeedsToShow &&
									<td colSpan={numberOfSeedsToShow > defaultNumberOfSeedsToShow ? 9 : 11}>
										<button type="button" onClick={e => setNumberOfSeedsToShow(numberOfSeedsToShow + defaultNumberOfSeedsToAdd)}>Show More</button>
									</td>
								}
							</tr>
						}
					</tbody>
				</table>
			</div>
		</Section>
	)
}