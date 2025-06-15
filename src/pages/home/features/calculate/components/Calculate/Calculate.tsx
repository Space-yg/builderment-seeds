import React, { memo, useCallback, useState } from "react"
import ReactDOMServer from "react-dom/server"
import { Section } from "@/components/layout"
import { Checkbox, Select } from "@/components/form"
import { useTranslation } from "@/features/translation"
import { useSeeds } from "!/contexts/Seeds"
import { useFilteredSeedsDispatch } from "!/contexts/FilteredSeeds"
import { useFilters } from "!/contexts/Filters"
import { useSorts } from "!/contexts/Sort"
import { resourcesCategorized } from "!/data/resources"
import { calculateResource } from "../../utils/calculate"
import type { Seed } from "!/types"

import "./styles.scss"

type Props = {
	setSeeds: React.Dispatch<React.SetStateAction<Seed[]>>
}

const Calculate = memo(function({ setSeeds }: Props) {
	const t = useTranslation(["calculate", "resources", "glossary"])

	const seeds = useSeeds()

	const sorts = useSorts()

	const filters = useFilters()

	const filteredSeedsDispatch = useFilteredSeedsDispatch()

	const [resource, setResource] = useState("Earth Token")
	const [withPowerPlant, setWithPowerPlant] = useState(false)
	const [withAlt, setWithAlt] = useState(false)

	const handleButtonOnClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const s = await calculateResource(seeds, resource, withPowerPlant, withAlt)
		setSeeds(s) // Update the r in the seeds. If this is not here, then
		// when clicking filter will use the original seeds (with all r = 0)
		filteredSeedsDispatch({ type: "calculate", seeds: s, filters, sorts })
	}, [seeds, resource, withPowerPlant, withAlt, setSeeds, filteredSeedsDispatch, filters, sorts])

	const handleSelectOnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setResource(e.target.value), [setResource])
	const handlePowerPlantCheckboxOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setWithPowerPlant(e.target.checked), [setWithPowerPlant])
	const handleAltCheckboxOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setWithAlt(e.target.checked), [setWithAlt])

	return (
		<Section tag="aside" className="aside calculate">
			<h1>{t("Calculate")}</h1>

			{/* Resource */}
			<Select
				onChange={handleSelectOnChange}
				value={resource}
				options={resourcesCategorized.map<[string, { option: string, value: string }[]]>(optgroup => [
					ReactDOMServer.renderToStaticMarkup(t(optgroup[0])),
					optgroup[1].map(option => {
						return {
							option: ReactDOMServer.renderToStaticMarkup(t(option, {}, option)),
							value: option
						}
					}).sort((a, b) => -(a.option < b.option))
				])}
			/>
			{/* Calculate with power plant */}
			<Checkbox label={ReactDOMServer.renderToStaticMarkup(t("Calculate with power plant"))} checked={withPowerPlant} onChange={handlePowerPlantCheckboxOnChange} />

			{/* Calculate with power plant */}
			<Checkbox label={ReactDOMServer.renderToStaticMarkup(t("Calculate with alt recipes"))} checked={withAlt} onChange={handleAltCheckboxOnChange} />

			{/* Calculate */}
			<button type="button" className="bm-button" onClick={handleButtonOnClick}>{t("Calculate Resource")}</button>
		</Section>
	)
})

export default Calculate