import React, { useCallback, useState } from "react"
import { Section } from "@components/layout"
import { Filter as FilterType } from "src/types"
import FilterGroup from "../FilterGroup/FilterGroup"
import { useFilteredSeeds, useFilteredSeedsDispatch } from "@context/FilteredSeedsContext"

import "./styles.scss"
import { useFilters, useFiltersDispatch } from "@context/FiltersContext"
import { useSorts } from "@context/SortContext"
import { useSeeds } from "@context/SeedsContext"

type Props = {}

function flatFilter(filterGroup: FilterType.FilterGroup): FilterType.FilterGroup {
	const flatGroup: FilterType.FilterGroup = {
		...filterGroup,
		operation: "and",
		group: []
	}

	// For each group
	const group = filterGroup.group
	for (const filter of group) {
		// Recursively flatten each group
		if (filter.filter === "group") flatGroup.group.push(...flatFilter(filter).group)
		else flatGroup.group.push(filter)
	}

	return flatGroup
}

/** Add and remove filters */
export default function Filter({ }: Props) {
	const seeds = useSeeds()

	const filters = useFilters()
	const filtersDispatch = useFiltersDispatch()

	const sorts = useSorts()

	// Do NOT move to FilterGroup. The currentId needs to
	// change on a global level, not a local level
	const [currentId, setCurrentId] = useState(0)

	const [usingAdvancedFilter, setUsingAdvancedFilter] = useState(false)

	const filteredSeeds = useFilteredSeeds()
	const filteredSeedsDispatch = useFilteredSeedsDispatch()

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUsingAdvancedFilter(e.target.checked)

		// If simple filter is on, flatten the filters
		if (e.target.checked === false) filtersDispatch({
			type: "set",
			filter: flatFilter(filters)
		})
	}, [setUsingAdvancedFilter, filters, filtersDispatch])

	return (
		<Section tag="aside" className="aside">
			<h1>Filter</h1>

			{/* Advanced filter checkbox */}
			<label className="advanced-filter-checkbox">
				{/* DO NOT CHANGE THE ORDER */}
				<div className="highlight"></div>
				<span className="tooltip"></span>
				<input type="checkbox" placeholder="test" checked={usingAdvancedFilter} onChange={handleChange} />
			</label>

			{/* Filters */}
			<FilterGroup
				currentId={currentId}
				setCurrentId={setCurrentId}
				usingAdvancedFilter={usingAdvancedFilter}
				removable={false}
				movable={false}
			/>

			{/* Total results */}
			<p>Total results: {filteredSeeds.length}</p>

			{/* Apply filter button */}
			<button type="button" onClick={e => filteredSeedsDispatch({ type: "filter", filters, sorts, seeds })}>Apply Filter</button>
		</Section>
	)
}