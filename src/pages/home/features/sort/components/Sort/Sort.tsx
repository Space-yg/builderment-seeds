import React, { useState } from "react"
import SortOption from "../SortOption"
import { Section } from "@/components/layout"
import { useTranslation } from "@/features/translation"
import { useFilteredSeedsDispatch } from "!/contexts/FilteredSeeds"
import { useSorts, useSortsDispatch } from "!/contexts/Sort"

import "./styles.scss"

type Props = {}

export default function Sort({ }: Props) {
	const t = useTranslation(["sort"])

	const filteredSeedsDispatch = useFilteredSeedsDispatch()

	const sorts = useSorts()
	const sortsDispatch = useSortsDispatch()

	const [currentId, setCurrentId] = useState(0)

	const sortOptions = sorts.map(sort => <SortOption key={sort.id} id={sort.id} />)

	return (
		<Section tag="aside" className="aside sort">
			<h1>{t("Sort")}</h1>

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
			<button type="button" className="bm-button" onClick={e => filteredSeedsDispatch({ type: "sort", sorts })}>{t("Apply Sort")}</button>
		</Section>
	)
}