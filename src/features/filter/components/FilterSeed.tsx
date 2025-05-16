import React from "react"
import { Input, Select } from "@components/form"
import { seedOperations } from "@data/other"
import { Filter } from "src/types"
import FilterOption from "./FilterOption"
import { useFiltersDispatch } from "@context/FiltersContext"

type Props = {
	filterResource: Filter.FilterSeed
	groupIds: number[]
}

/** Filter a resource */
export default function FilterSeed({ filterResource, groupIds }: Props) {
	const filtersDispatch = useFiltersDispatch()

	return (
		<FilterOption
			id={filterResource.id}
			groupIds={groupIds}
			label="Filter Seed"
		>
			<span>Seed </span>
			<Select options={seedOperations} value={filterResource.operation} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterSeed) {
					draft.operation = e.target.value as Filter.SeedOperations
				},
			})} />
			<Input placeholder="Seed" value={filterResource.seed} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterSeed) {
					draft.seed = e.target.value
				},
			})} />
		</FilterOption>
	)
}