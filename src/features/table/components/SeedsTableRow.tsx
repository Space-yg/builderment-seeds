import React, { memo, useState } from "react"
import { Seed } from "@/types"

type Props = {
	seed: Seed
}

const SeedsTableRow = memo(function SeedsTableRow({ seed }: Props) {
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
			<td>{seed.ws}</td>
			<td>{seed.ra}</td>
			<td onClick={e => setLongResource(!longResource)}>{longResource ? Math.round(seed.r * 100_000) / 100_000 : Math.round(seed.r * 1000) / 1000}</td>
		</tr>
	)
})

export default SeedsTableRow