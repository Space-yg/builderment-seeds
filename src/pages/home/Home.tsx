import React, { useEffect } from "react"
import Filter from "!/features/filter"
import SeedsTable from "!/features/table"
import Sort from "!/features/sort"
import Calculate from "!/features/calculate"
import Header from "!/features/header"
import { FiltersProvider } from "!/contexts/Filters"
import { SortsProvider } from "!/contexts/Sort"
import { useFilteredSeedsDispatch } from "./contexts/FilteredSeeds"

import type { Seed } from "!/types"

type Props = {
	progress: number
	progressText: string
	seeds: Seed[]
	seedsLoaded: boolean
	setSeeds: React.Dispatch<React.SetStateAction<Seed[]>>
}

/** The whole application */
export default function Home({ progress, progressText, seeds, seedsLoaded, setSeeds }: Props) {
	const filteredSeedsDispatch = useFilteredSeedsDispatch()

	useEffect(() => {
		filteredSeedsDispatch({
			type: "set",
			seeds: seeds,
		})
	}, [seedsLoaded])

	return (
		<>
			<Header />

			<div className="aside-wrapper">
				{/* Sorts */}
				<SortsProvider>

					{/* Filters */}
					<FiltersProvider>

						{/* Calculate resource */}
						<Calculate setSeeds={setSeeds} />

						{/* Filters */}
						<Filter />

					</FiltersProvider>

					{/* Sort */}
					<Sort />

				</SortsProvider>
			</div>

			{/* Seeds */}
			<SeedsTable progress={progress} progressText={progressText} seedsLoaded={seeds.length !== 0} />
		</>
	)
}