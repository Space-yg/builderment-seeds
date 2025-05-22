import React, { Fragment, useCallback } from "react"
import FilterResource from "../FilterResource"
import FilterWorldSize from "../FilterWorldSize"
import FilterOption from "../FilterOption"
import FilterResourceAmount from "../FilterResourceAmount"
import FilterSeed from "../FilterSeed"
import { Select, CustomSelect } from "@/components/form"
import { groupOperationsOptions } from "!/data/other"
import { useFilters, useFiltersDispatch } from "!/context/FiltersContext"
import { getGroup } from "!/utils/filters"

import type { Filter } from "!/types"

import "./styles.scss"

type Props = {
	currentId: number
	setCurrentId: React.Dispatch<React.SetStateAction<number>>
	groupIds?: number[]
	usingAdvancedFilter: boolean
	removable?: boolean
	movable?: boolean
}

/** Represents a group of filters */
export default function FilterGroup({ currentId, setCurrentId, groupIds = [0], usingAdvancedFilter, removable = true, movable = true }: Props) {
	const filters = getGroup(useFilters(), groupIds)!
	const filtersDispatch = useFiltersDispatch()

	// Create all filter elements
	let filterTags: React.JSX.Element[] = filters.group.map((filter, index) => {
		// Add operation (and/or)
		let operationElement: React.JSX.Element | null = null
		if (usingAdvancedFilter && index !== 0) {
			if (index === 1) operationElement = <Select key={filter.id - .5} label="" options={groupOperationsOptions} value={filters.operation} onChange={e => filtersDispatch({
				type: "update",
				groupIds,
				updater(draft: Filter.FilterGroup) {
					draft.operation = e.target.value as Filter.GroupOperation
				},
			})} />
			else operationElement = <p key={filter.id - .5}>{filters.operation === "and" ? "And" : "Or"}</p>
		}

		let filterElement: React.JSX.Element = <></>
		switch (filter.filter) {
			case "resource":
				filterElement = <FilterResource key={filter.id} filterResource={filter} groupIds={groupIds} />
				break

			case "world size":
				filterElement = <FilterWorldSize key={filter.id} filterResource={filter} groupIds={groupIds} />
				break

			case "resource amount":
				filterElement = <FilterResourceAmount key={filter.id} filterResource={filter} groupIds={groupIds} />
				break

			case "seed":
				filterElement = <FilterSeed key={filter.id} filterResource={filter} groupIds={groupIds} />
				break

			case "group":
				const g = [...groupIds]
				g.push(filter.id)
				filterElement = (
					<FilterGroup
						key={filter.id}
						currentId={currentId}
						setCurrentId={setCurrentId}
						groupIds={g}
						usingAdvancedFilter={usingAdvancedFilter}
					/>
				)
				break
		}

		return (
			<Fragment key={filter.id}>
				{
					operationElement ?
						<li key={filter.id - .5}>
							{operationElement}
						</li>
						: ""
				}
				<li key={filter.id}>
					{filterElement}
				</li>
			</Fragment>
		)
	})

	/** Add a filter to the filters */
	const addFilter = useCallback((e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
		filtersDispatch({
			type: "add",
			currentId,
			groupIds,
			filter: e.currentTarget.value as Filter.FilterName,
		})
		setCurrentId(currentId + 1)
	}, [filtersDispatch, currentId, groupIds, setCurrentId])

	const filterOptions = [
		{
			option: "Filter resource",
			value: "resource",
		},
		{
			option: "Filter world size",
			value: "world size",
		},
		{
			option: "Filter resource amount",
			value: "resource amount",
		},
		{
			option: "Filter seed",
			value: "seed",
		},
	]
	if (usingAdvancedFilter) filterOptions.push({
		option: "Filter group",
		value: "group",
	})

	return (
		<FilterOption
			label="Filter Group"
			id={filters.id}
			groupIds={groupIds.slice(0, -1)}
			className="filter-group"
			removable={removable}
			movable={movable}
		>
			<ul>
				{filterTags}
			</ul>
			<CustomSelect
				label="+"
				onSelect={addFilter}
				options={filterOptions}
			/>
		</FilterOption>
	)
}