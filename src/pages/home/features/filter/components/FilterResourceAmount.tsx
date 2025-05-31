import React from "react"
import ReactDOMServer from "react-dom/server"
import FilterOption from "./FilterOption"
import { Select } from "@/components/form"
import { useTranslation } from "@/features/translation"
import { signs, filterWorldSettings } from "!/data/other"
import { useFiltersDispatch } from "!/contexts/Filters"

import type { Filter, Sign, WorldSettingSize } from "!/types"

type Props = {
	filterResource: Filter.FilterResourceAmount
	groupIds: number[]
}

/** Filter a resource */
export default function FilterResourceAmount({ filterResource, groupIds }: Props) {
	const t = useTranslation(["filter", "glossary"])

	const filtersDispatch = useFiltersDispatch()

	return (
		<FilterOption
			id={filterResource.id}
			groupIds={groupIds}
			label={ReactDOMServer.renderToStaticMarkup(t("Filter Resource Amount"))}
		>
			<span className="bm-span">{t("Resource Amount")}</span>
			<Select options={signs} value={filterResource.sign} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterResourceAmount) {
					draft.sign = e.target.value as Sign
				},
			})} />
			<Select options={filterWorldSettings.map(settings => { return { option: settings + "%", value: settings } })} value={filterResource.amount} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterResourceAmount) {
					draft.amount = +e.target.value as WorldSettingSize
				},
			})} />
		</FilterOption>
	)
}