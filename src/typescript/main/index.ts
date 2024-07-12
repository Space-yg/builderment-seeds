import { Seed } from "./types"
import {
	resourceFilter,
	calculateWithPowerPlantsCheck,
	amountFilter,
	amount,
	order,
	filterSeed,
	Filter,
	worldSize,
	worldSizeCheck,
	resourceAmount,
	worldSizeRange,
	resourceAmountCheck,
	resourceAmountRange,
	progressBar,
} from "./filter.js"

/** Converts the slider value to world size and resource amount values */
export const sliderValueToSize: { [values: string]: string } = {
	"1": "50",
	"2": "75",
	"3": "100",
	"4": "150",
	"5": "200",
} as const

/**
 * Resources to add to each resource based on the resource amount
 * ```
 * World Resource | Wood | Stone | Iron | Copper | Coal | Wolframite | Uranium
 * ---------------|------|-------|------|--------|------|------------|--------
 *            50% |  170 |   130 |  170 |    130 |  170 |        70  |      10
 *            75% |  255 |   195 |  255 |    195 |  255 |        105 |      15
 *           100% |  340 |   260 |  340 |    260 |  340 |        140 |      20
 *           150% |  510 |   390 |  510 |    390 |  510 |        210 |      30
 *           200% |  680 |   520 |  680 |    520 |  680 |        280 |      40
 * ```
 */
const addResources: {
	[resourceAmount: number]: {
		[resource: string]: number
	}
} = {
	1: {
		wd: 170,
		s: 130,
		i: 170,
		cp: 130,
		cl: 170,
		wl: 70,
		u: 10,
	},
	2: {
		wd: 255,
		s: 195,
		i: 255,
		cp: 195,
		cl: 255,
		wl: 105,
		u: 15,
	},
	3: {
		wd: 340,
		s: 260,
		i: 340,
		cp: 260,
		cl: 340,
		wl: 140,
		u: 20,
	},
	4: {
		wd: 510,
		s: 390,
		i: 510,
		cp: 390,
		cl: 510,
		wl: 210,
		u: 30,
	},
	5: {
		wd: 680,
		s: 520,
		i: 680,
		cp: 520,
		cl: 680,
		wl: 280,
		u: 40,
	},
} as const

/** Base 62 */
export const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" as const

/** All resources */
// const resources = ["wd", "s", "i", "cp", "cl", "wl", "u"] as const

/** Test any functionality */
function test() { console.log("Test") }

/** Copy text */
function copy(event: PointerEvent) { navigator.clipboard.writeText((<HTMLTableCellElement> event.target!).innerHTML) }

/**
 * Convert a decimal number to base 62
 * @param n The number to convert
 */
function toBase62(n: number): string {
	if (n === 0) return "0"
	var result = []
	while (n > 0) {
		result.push(base62[n % base62.length])
		n = Math.floor(n / base62.length)
	}
	return result.reduce((pre, cur) => cur + pre)
}

/**
 * Add progress to an input elements.
 * @param input The input element to add the progress to.
 * @returns The input element.
 */
export function addProgress(input: HTMLInputElement): HTMLInputElement {
	const width = (+input.value - (+input.min || 0)) * input.clientWidth / ((+input.max || 100) - (+input.min || 0))
	input.style.background = `linear-gradient(to right, rgb(100, 206, 108) ${width}px, rgba(0, 0, 0, 0.1) ${width}px)`
	return input
}

/**
 * Add progress to all input elements with type range.
 * @param element The element to get all the input elements whose type is range from. Default is {@link document}.
 * @returns All input elements that has been modified.
 */
export function addProgressToAll(element: Document | Element = document): NodeListOf<HTMLInputElement> {
	const ranges = element.querySelectorAll<HTMLInputElement>("input[type='range']")
	for (const range of ranges) {
		range.addEventListener("input", () => addProgress(range))
		addProgress(range)
	}
	return ranges
}

const req = new XMLHttpRequest()
req.responseType = "arraybuffer"
req.addEventListener("loadstart", () => {
	(<HTMLDivElement> progressBar.parentElement).style.visibility = "visible"
})
req.addEventListener("progress", event => {
	if (event.lengthComputable) {
		(<HTMLSpanElement> progressBar.firstElementChild).innerHTML = `${Math.floor(event.loaded / 10_000) / 100}`;
		(<HTMLSpanElement> progressBar.lastElementChild).innerHTML = `MB / ${Math.floor(event.total / 10_000) / 100} MB`
		const percentComplete = event.loaded / event.total
		progressBar.style.width = 150 * percentComplete + "px"
	}
})
req.addEventListener("load", async function() {  // Do not change this to => function
	// Extract seed data
	let s: any = this.response
	s = new Uint8Array(s)

	// Put all seeds into an array
	const seeds: Seed[] = []
	const seedsUtf8: Uint8Array[] = []
	for (let i = 0; i < s.length; i += 12) seedsUtf8.push(s.slice(i, i + 12))

	// seed(ws,ra)(wd)si(cp)(cl)(wl)u
	for (const utf8 of seedsUtf8) {
		const wsOrRa = utf8[4].toString(2).padStart(8, "0")
		const r = parseInt(wsOrRa.slice(4), 2)
		seeds.push({
			sd: toBase62(utf8[0] + utf8[1] * 256 + utf8[2] * 256 ** 2 + utf8[3] * 256 ** 3),
			ws: parseInt(wsOrRa.slice(0, 4), 2),
			r: r,
			// Add extra resources
			wd: utf8[5] + addResources[r]["wd"],
			s: utf8[6] + addResources[r]["s"],
			i: utf8[7] + addResources[r]["i"],
			cp: utf8[8] + addResources[r]["cp"],
			cl: utf8[9] + addResources[r]["cl"],
			wl: utf8[10] + addResources[r]["wl"],
			u: utf8[11] + addResources[r]["u"],
			rf: 0,
			pp: 0,
		} as Seed)
	}

	// Amount Filter
	amountFilter.addEventListener("change", () => Filter(seeds))
	amount.addEventListener("change", () => Filter(seeds))
	order.addEventListener("change", () => Filter(seeds))
	filterSeed.addEventListener("change", () => {
		// TODO: Convert any inputted seed to builderment seed
		Filter(seeds)
	})
	// World Size Filter
	worldSize.addEventListener("mouseup", () => (worldSizeCheck.checked) ? Filter(seeds) : null) // For mouse
	worldSize.addEventListener("focusout", () => (worldSizeCheck.checked) ? Filter(seeds) : null) // For keyboard
	worldSize.addEventListener("input", () => worldSizeRange.innerHTML = sliderValueToSize[worldSize.value] + "%") // For sliding
	worldSizeCheck.addEventListener("click", () => Filter(seeds))
	// Resource Amount
	resourceAmount.addEventListener("mouseup", () => (resourceAmountCheck.checked) ? Filter(seeds) : null) // For mouse
	resourceAmount.addEventListener("focusout", () => (resourceAmountCheck.checked) ? Filter(seeds) : null) // For keyboard
	resourceAmount.addEventListener("input", () => resourceAmountRange.innerHTML = sliderValueToSize[resourceAmount.value] + "%") // For sliding
	resourceAmountCheck.addEventListener("click", () => Filter(seeds))
	// Calculate with Power Plants
	calculateWithPowerPlantsCheck.addEventListener("click", () => Filter(seeds))
	Filter(seeds)

	resourceFilter.addEventListener("change", () => {
		calculateWithPowerPlantsCheck.parentElement!.style.display = resourceFilter.value == "Earth Token" ? "inline-block" : "none"
		calculateWithPowerPlantsCheck.checked = false
		Filter(seeds)
	})
	addProgressToAll()
})
req.open("GET", "./pages/main/seeds.bin")
req.send()