import React, { useState } from "react"
import ReactDOMServer from "react-dom/server"
import FilterOption from "./FilterOption"
import { InputNumber, Select } from "@/components/form"
import { useTranslation } from "@/features/translation"
import { rawResources } from "!/data/resources"
import { signs } from "!/data/other"
import { useFiltersDispatch } from "!/contexts/Filters"

import type { Filter, Sign } from "!/types"

type Props = {
	filterResource: Filter.FilterResource
	groupIds: number[]
}

/** Filter a resource */
export default function FilterResource({ filterResource, groupIds }: Props) {
	const t = useTranslation(["filter", "resources", "glossary"])

	const filtersDispatch = useFiltersDispatch()

	const [amount, setAmount] = useState<string>("0")

	return (
		<FilterOption
			id={filterResource.id}
			groupIds={groupIds}
			label={ReactDOMServer.renderToStaticMarkup(t("Filter Resource"))}
		>
			<Select options={rawResources.concat(["Resource"]).map(resource => { return { option: ReactDOMServer.renderToStaticMarkup(t(resource)), value: resource } })} value={filterResource.resource} onChange={e => filtersDispatch({
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
			<InputNumber placeholder="Amount" min={0} decimals={5} value={amount} onChange={e => setAmount(e.target.value)} onBlur={e => {
				setAmount(e.target.value)
				filtersDispatch({
					type: "update",
					filterId: filterResource.id,
					groupIds,
					updater(draft: Filter.FilterResource) {
						draft.amount = +e.target.value
					},
				})
			}} />
		</FilterOption>
	)
}