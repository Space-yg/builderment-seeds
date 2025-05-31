import React, { Suspense, useEffect, useState } from "react"
import Home from "./Home"
import { Loading } from "@/components/other"
import { FilteredSeedsProvider } from "!/contexts/FilteredSeeds"
import { SmallWorldSettingSizeToWorldSettingSize, toBase62 } from "./utils/helpers"
import { SeedsContext } from "./contexts/Seeds"

import type { RawResources, Seed, SmallWorldSettingSize } from "./types"

import "./styles.scss"

/**
 * Resources to add to each resource based on the resource amount
 * ```
 * Resource Amount | Wood | Stone | Iron | Copper | Coal | Wolframite | Uranium
 * ----------------|------|-------|------|--------|------|------------|--------
 *             50% |  170 |   130 |  170 |    130 |  170 |         70 |      10
 *             75% |  255 |   195 |  255 |    195 |  255 |        105 |      15
 *            100% |  340 |   260 |  340 |    260 |  340 |        140 |      20
 *            150% |  510 |   390 |  510 |    390 |  510 |        210 |      30
 *            200% |  680 |   520 |  680 |    520 |  680 |        280 |      40
 * ```
 */
const addResources: Record<SmallWorldSettingSize, RawResources> = {
	1: {
		w: 170,
		s: 130,
		i: 170,
		cp: 130,
		cl: 170,
		wl: 70,
		u: 10,
	},
	2: {
		w: 255,
		s: 195,
		i: 255,
		cp: 195,
		cl: 255,
		wl: 105,
		u: 15,
	},
	3: {
		w: 340,
		s: 260,
		i: 340,
		cp: 260,
		cl: 340,
		wl: 140,
		u: 20,
	},
	4: {
		w: 510,
		s: 390,
		i: 510,
		cp: 390,
		cl: 510,
		wl: 210,
		u: 30,
	},
	5: {
		w: 680,
		s: 520,
		i: 680,
		cp: 520,
		cl: 680,
		wl: 280,
		u: 40,
	},
} as const

/** The whole application */
export default function HomeWrapper() {
	// TODO Later: Add an option to see the boosted power planets and the used alt resources and a breakdown of all resources
	// https://human-crow.github.io/alt_calculator/?wd=740&st=656&ir=771&cp=645&cl=784&wr=367&ur=64
	// TODO Later: Add a way to filter by equal resources. E.g. Instead of Wood = 300, it would be Wood = Coal
	// I could make another option called "Text mode" which will allow the user to write an equation to filter by.
	// This equation can have the resources (wood, coal, etc.) in them and can use advanced operations
	// (+, -, *, /, &, |, ^, &&, ||, != (xor), etc.)
	// TODO Later: Change the layout of the website as follows:
	// width > 1400px:
	//   header  calculate
	//   main    filter
	//           sort
	// 1150px < width <= 1400px:
	//   header  calculate
	//   filter  sort
	//   main
	// width <= 1150px
	//   header
	//   calculate
	//   filter
	//   sort
	//   main
	// TODO Later: Custom scrollbar

	// Seeds
	const [s, setSeeds] = useState<Seed[]>([])
	const [seedsLoaded, setSeedsLoaded] = useState<boolean>(false)

	// Progress bar
	const [progress, setProgress] = useState<number>(0)
	const [progressText, setProgressText] = useState<string>("0.00 MB / 0.00 MB")

	useEffect(() => {
		// Add the .home class to the body
		document.body.className = "home"

		// Only execute if seeds is empty (a.k.a just the first time the website loads)
		// Any rerenders will not cause this to execute again
		if (s.length === 0) {
			const req = new XMLHttpRequest()
			req.responseType = "arraybuffer"
			req.addEventListener("progress", event => {
				if (event.lengthComputable) {
					setProgress(event.loaded / event.total)
					setProgressText(`${(Math.floor(event.loaded / 10_000) / 100).toFixed(2)} MB / ${(Math.floor(event.total / 10_000) / 100).toFixed(2)} MB`)
				}
			})
			req.addEventListener("load", async function(e) {  // Do not change this to => function
				const seeds: Seed[] = []

				// Extract seed data
				let s: any = this.response
				s = new Uint8Array(s)

				// Put all seeds into an array
				const seedsUtf8: Uint8Array[] = []
				for (let i = 0; i < s.length; i += 12) seedsUtf8.push(s.slice(i, i + 12))

				// seed(ws,ra)wsi(cp)(cl)(wl)u
				for (const utf8 of seedsUtf8) {
					const wsOrRa = utf8[4].toString(2).padStart(8, "0")
					const ra: SmallWorldSettingSize = parseInt(wsOrRa.slice(4), 2) as SmallWorldSettingSize
					seeds.push({
						sd: toBase62(utf8[0] + utf8[1] * 256 + utf8[2] * 256 ** 2 + utf8[3] * 256 ** 3),
						ws: SmallWorldSettingSizeToWorldSettingSize(parseInt(wsOrRa.slice(0, 4), 2) as SmallWorldSettingSize),
						ra: SmallWorldSettingSizeToWorldSettingSize(ra),
						w: utf8[5] + addResources[ra].w,
						s: utf8[6] + addResources[ra].s,
						i: utf8[7] + addResources[ra].i,
						cp: utf8[8] + addResources[ra].cp,
						cl: utf8[9] + addResources[ra].cl,
						wl: utf8[10] + addResources[ra].wl,
						u: utf8[11] + addResources[ra].u,
						r: 0,
					})
				}

				// Set the seeds
				setSeeds(seeds)
				setSeedsLoaded(true)
			})
			req.open("GET", import.meta.env.BASE_URL + "/seeds.bin")
			req.send()
		}
	}, [])

	return (
		<>
			{/* Suspense until all has finished loading */}
			<Suspense fallback={<Loading />}>
				{/* Set the seeds */}
				<SeedsContext.Provider value={s}>
					{/* Set the filtered seeds */}
					<FilteredSeedsProvider>
						<Home progress={progress} progressText={progressText} seeds={s} seedsLoaded={seedsLoaded} setSeeds={setSeeds} />
					</FilteredSeedsProvider>
				</SeedsContext.Provider>
			</Suspense>
		</>
	)
}