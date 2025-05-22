import React, { useState } from "react"
import SortOption from "../SortOption"
import { Section } from "@/components/layout"
import { useFilteredSeedsDispatch } from "!/context/FilteredSeedsContext"
import { useSorts, useSortsDispatch } from "!/context/SortContext"

import "./styles.scss"

type Props = {}

export default function Sort({ }: Props) {
	const filteredSeedsDispatch = useFilteredSeedsDispatch()

	const sorts = useSorts()
	const sortsDispatch = useSortsDispatch()

	const [currentId, setCurrentId] = useState(0)

	const sortOptions = sorts.map(sort => <SortOption key={sort.id} id={sort.id} />)

	return (
		<Section tag="aside" className="aside sort">
			<h1>Sort</h1>

			{/* Sort options */}
			{sortOptions}

			{/* Add new sort option */}
			<button type="button" className="bm-button add-button" onClick={e => {
				sortsDispatch({
					type: "add",
					currentId,
					sort: {
						id: currentId,
						resource: "w",
						order: "ascending",
					}
				})
				setCurrentId(currentId + 1)
			}}>+</button>

			{/* Apply sort */}
			<button type="button" className="bm-button" onClick={e => filteredSeedsDispatch({ type: "sort", sorts })}>Apply Sort</button>
		</Section>
	)
}