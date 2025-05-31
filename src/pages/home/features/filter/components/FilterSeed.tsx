import React from "react"
import ReactDOMServer from "react-dom/server"
import FilterOption from "./FilterOption"
import { Input, Select } from "@/components/form"
import { useTranslation } from "@/features/translation"
import { seedOperations } from "!/data/other"
import { useFiltersDispatch } from "!/contexts/Filters"

import type { Filter } from "!/types"

type Props = {
	filterResource: Filter.FilterSeed
	groupIds: number[]
}

/** Filter a resource */
export default function FilterSeed({ filterResource, groupIds }: Props) {
	const t = useTranslation(["filter", "glossary"])

	const filtersDispatch = useFiltersDispatch()

	return (
		<FilterOption
			id={filterResource.id}
			groupIds={groupIds}
			label={ReactDOMServer.renderToStaticMarkup(t("Filter Seed"))}
		>
			<span className="bm-span">{t("Seed")}</span>
			<Select options={seedOperations.map(operation => { return { option: ReactDOMServer.renderToStaticMarkup(t(`seed.${operation}`)), value: operation } })} value={filterResource.operation} onChange={e => filtersDispatch({
				type: "update",
				filterId: filterResource.id,
				groupIds,
				updater(draft: Filter.FilterSeed) {
					draft.operation = e.target.value as Filter.SeedOperations
				},
			})} />
			<Input placeholder={ReactDOMServer.renderToStaticMarkup(t("Seed"))} value={filterResource.seed} onChange={e => filtersDispatch({
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