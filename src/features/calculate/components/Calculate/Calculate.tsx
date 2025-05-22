import React, { useCallback, useState } from "react"
import { Section } from "@/components/layout"
import { useSeeds } from "@/context/SeedsContext"
import { useFilteredSeedsDispatch } from "@/context/FilteredSeedsContext"
import { Checkbox, Select } from "@/components/form"
import { resourcesCategorized } from "@/data/resources"
import { calculateResource } from "../../utils/calculate"
import { useFilters } from "@/context/FiltersContext"
import { useSorts } from "@/context/SortContext"
import { Seed } from "@/types"

import "./styles.scss"

type Props = {
	setSeeds: React.Dispatch<React.SetStateAction<Seed[]>>
}

export default function Calculate({ setSeeds }: Props) {
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
			<h1>Calculate</h1>

			{/* Resource */}
			<Select options={resourcesCategorized} value={resource} onChange={handleSelectOnChange} />

			{/* Calculate with power plant */}
			<Checkbox label="Calculate with power plant" checked={withPowerPlant} onChange={handlePowerPlantCheckboxOnChange} />

			{/* Calculate with power plant */}
			<Checkbox label="Calculate with alt recipes" checked={withAlt} onChange={handleAltCheckboxOnChange} />

			{/* Calculate */}
			<button type="button" className="bm-button" onClick={handleButtonOnClick}>Calculate Resource</button>
		</Section>
	)
}