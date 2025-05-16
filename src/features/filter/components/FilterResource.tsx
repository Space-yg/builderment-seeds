import React from "react"
import { InputNumber, Select } from "@components/form"
import { rawResources } from "@data/resources"
import { signs } from "@data/other"
import { Filter, Sign } from "src/types"
import FilterOption from "./FilterOption"
import { useFiltersDispatch } from "@context/FiltersContext"

type Props = {
	filterResource: Filter.FilterResource
	groupIds: number[]
}

/** Filter a resource */
export default function FilterResource({ filterResource, groupIds }: Props) {
	const filtersDispatch = useFiltersDispatch()

	return (
		<FilterOption
			id={filterResource.id}
			groupIds={groupIds}
			label="Filter Resource"
		>
			<Select options={[...rawResources, "Resource"]} value={filterResource.resource} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterResource) {
					draft.resource = e.target.value
				},
			})} />
			<Select options={signs} value={filterResource.sign} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterResource) {
					draft.sign = e.target.value as Sign
				},
			})} />
			<InputNumber placeholder="Amount" value={filterResource.amount} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterResource) {
					draft.amount = +e.target.value
				},
			})} />
		</FilterOption>
	)
}