import React from "react"
import { Select } from "@/components/form"
import { signs, filterWorldSettings } from "@/data/other"
import { Filter, Sign, WorldSettingSize } from "@/types"
import FilterOption from "./FilterOption"
import { useFiltersDispatch } from "@/context/FiltersContext"

type Props = {
	filterResource: Filter.FilterWorldSize
	groupIds: number[]
}

/** Filter a resource */
export default function FilterWorldSize({ filterResource, groupIds }: Props) {
	const filtersDispatch = useFiltersDispatch()

	return (
		<FilterOption
			id={filterResource.id}
			groupIds={groupIds}
			label="Filter World Size"
		>
			<span className="bm-span">World Size </span>
			<Select options={signs} value={filterResource.sign} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterWorldSize) {
					draft.sign = e.target.value as Sign
				},
			})} />
			<Select options={filterWorldSettings} value={filterResource.size} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterWorldSize) {
					draft.size = +e.target.value as WorldSettingSize
				},
			})} />
		</FilterOption>
	)
}