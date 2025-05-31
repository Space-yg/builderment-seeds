import React, { useEffect, useRef, useState } from "react"
import ReactDOMServer from "react-dom/server"
import SeedsTableRow from "../SeedsTableRow/SeedsTableRow"
import { Section } from "@/components/layout"
import { Loading } from "@/components/other"
import { useTranslation } from "@/features/translation"
import { useFilteredSeeds } from "!/contexts/FilteredSeeds"
import { decode } from 'html-entities'

import "./styles.scss"

type Props = {
	progress: number
	progressText: string
	seedsLoaded: boolean
}

export default function SeedsTable({ progress, progressText, seedsLoaded }: Props) {
	const t = useTranslation(["table", "resources", "glossary"])

	const filteredSeeds = useFilteredSeeds()
	const table = useRef<HTMLTableElement>(null)
	const tableHead = useRef<HTMLTableSectionElement>(null)

	// Make all rows
	const defaultNumberOfSeedsToShow = 50
	const defaultNumberOfSeedsToAdd = 50
	const [numberOfSeedsToShow, setNumberOfSeedsToShow] = useState(defaultNumberOfSeedsToShow)
	const seedsToShow = filteredSeeds.slice(0, numberOfSeedsToShow)	// First numberOfSeedToShow only
	const openResourcesText = decode(ReactDOMServer.renderToStaticMarkup(t("See resources needed, alt ratios, and resource boosts")))
	const trs: React.JSX.Element[] = seedsToShow.map(seed => <SeedsTableRow key={seed.sd + seed.ws.toString() + seed.ra.toString()} seed={seed} openResourcesText={openResourcesText} />)

	function scrollHandler(event: Event) {
		// Make the thead actually sticky
		tableHead.current!.style.top = Math.max(0, -table.current!.getBoundingClientRect().top) + "px"
	}

	useEffect(() => {
		document.removeEventListener("scroll", scrollHandler)
		document.addEventListener("scroll", scrollHandler)

		// Remove event listener after destruction of table
		return () => document.removeEventListener("scroll", scrollHandler)
	}, [])

	return (
		<Section tag="main" className="main">
			{/* Loading animation */}
			{!seedsLoaded && <Loading progress={progress} progressText={progressText} />}

			{/* This div is needed to make the vertical scrolling work */}
			<div className="table-wrapper">
				<table className="seeds-table" ref={table}>
					<thead ref={tableHead}>
						<tr>
							<th>{t("Seed")}</th>
							<th>{t("Wood Log")}</th>
							<th>{t("Stone")}</th>
							<th>{t("Iron Ore")}</th>
							<th>{t("Copper Ore")}</th>
							<th>{t("Coal")}</th>
							<th>{t("Wolframite")}</th>
							<th>{t("Uranium Ore")}</th>
							<th>{t("World Size")}</th>
							<th>{t("Resource Amount")}</th>
							<th>{t("Resource")}</th>
						</tr>
					</thead>
					<tbody className="syncscroll">
						{trs}

						{filteredSeeds.length > defaultNumberOfSeedsToShow &&
							<tr className="show-more">
								{numberOfSeedsToShow > defaultNumberOfSeedsToShow &&
									<td colSpan={filteredSeeds.length > numberOfSeedsToShow ? 2 : 11}>
										<button type="button" onClick={e => setNumberOfSeedsToShow(numberOfSeedsToShow - defaultNumberOfSeedsToAdd)}>{t("Show Less")}</button>
									</td>
								}

								{filteredSeeds.length > numberOfSeedsToShow &&
									<td colSpan={numberOfSeedsToShow > defaultNumberOfSeedsToShow ? 9 : 11}>
										<button type="button" onClick={e => setNumberOfSeedsToShow(numberOfSeedsToShow + defaultNumberOfSeedsToAdd)}>{t("Show More")}</button>
									</td>
								}
							</tr>
						}
					</tbody>
				</table>
			</div>
		</Section>
	)
}