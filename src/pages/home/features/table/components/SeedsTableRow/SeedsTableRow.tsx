import React, { memo, useState } from "react"
import { Seed } from "!/types"

import "./styles.scss"

type Props = {
	seed: Seed
	openResourcesText: string
}

const SeedsTableRow = memo(function SeedsTableRow({ seed, openResourcesText }: Props) {
	const [longResource, setLongResource] = useState(false)

	return (
		<tr>
			<td>{seed.sd}</td>
			<td>{seed.w}</td>
			<td>{seed.s}</td>
			<td>{seed.i}</td>
			<td>{seed.cp}</td>
			<td>{seed.cl}</td>
			<td>{seed.wl}</td>
			<td>{seed.u}</td>
			<td>{seed.ws}%</td>
			<td>{seed.ra}%</td>
			<td onClick={e => setLongResource(!longResource)} className="seed-resource">
				{longResource ? Math.round(seed.r * 100_000) / 100_000 : Math.round(seed.r * 1000) / 1000}
				<a title={openResourcesText} href={`https://human-crow.github.io/alt_calculator/?st=${seed.s}&ir=${seed.i}&cp=${seed.cp}&cl=${seed.cl}&wr=${seed.wl}&ur=${seed.u}&wd=${seed.w}`} target="_blank"></a>
			</td>
		</tr>
	)
})

export default SeedsTableRow