import {
	Seed,
	FilterMinMax,
	FilterOrder,
	FilterSigns,
	ResourceFilter,
} from "./types"
import { setData } from "./table.js"
import {
	calculateResources,
	calculateResourcesWithPowerPlant,
} from "./calculate.js"

//// Loading
const whiteBackground = <HTMLDivElement> document.getElementsByClassName("whiteBackground").item(0)
const loading = <HTMLDivElement> document.getElementsByClassName("lds-spinner").item(0)
export const progressBar = <HTMLDivElement> document.getElementById("progress-bar")

//// Filters
// Resource Filter
export const resourceFilter = <HTMLSelectElement> document.getElementById("resourceFilter")
// Amount Filter
export const amountFilter = <HTMLSelectElement> document.getElementById("amountFilter")
export const amount = <HTMLInputElement> document.getElementById("amount")
export const order = <HTMLSelectElement> document.getElementById("order")
export const filterSeed = <HTMLInputElement> document.getElementById("filterSeed")
// World Size Filter
export const worldSize = <HTMLInputElement> document.getElementById("worldSizeFilter")
export const worldSizeCheck = <HTMLInputElement> document.getElementById("worldSizeCheck")
export const worldSizeRange = <HTMLSpanElement> document.getElementById("worldSizeRange")
// Resource Amount Filter
export const resourceAmount = <HTMLInputElement> document.getElementById("resourceAmountFilter")
export const resourceAmountCheck = <HTMLInputElement> document.getElementById("resourceAmountCheck")
export const resourceAmountRange = <HTMLSpanElement> document.getElementById("resourceAmountRange")
// Calculate with Power Plants
export const calculateWithPowerPlantsCheck = <HTMLInputElement> document.getElementById("withPowerPlantsCheck")
// Total Results
const totalResults = <HTMLSpanElement> document.getElementById("totalResults")

/**
 * Filter seed data then set it to the table
 * @param resourceFilter [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or ["None"]
 * @param worldSize worldSize.value
 * @param resourceAmount resourceAmount.value
 */
function filter(seeds: Seed[], resourceFilter: ResourceFilter, worldSize: string, resourceAmount: string) {
	// Add all data to row
	let filteredSeeds = [...seeds]

	// Filter World Size
	let size = +worldSize
	if (!isNaN(size)) filteredSeeds = filteredSeeds.filter(seed => seed.ws === size)

	// Filter World Size
	let amount = +resourceAmount
	if (!isNaN(amount)) filteredSeeds = filteredSeeds.filter(seed => seed.r === amount)

	// Filter Seed
	if (amountFilter.value === "Seed") filteredSeeds = filteredSeeds.filter(seed => seed.sd === filterSeed.value)

	// Calculate Resources if it is Max or Min
	if (resourceFilter.length == 2) {
		if (calculateWithPowerPlantsCheck.checked) calculateResourcesWithPowerPlant(filteredSeeds)
		else calculateResources(filteredSeeds)
	}

	// Get resource to filter
	let resource: keyof Omit<Seed, "sd"> =
		(resourceFilter[0] === "Wood Log") ?
			"wd" :
			(resourceFilter[0] === "Stone") ?
				"s" :
				(resourceFilter[0] === "Iron Ore") ?
					"i" :
					(resourceFilter[0] === "Copper Ore") ?
						"cp" :
						(resourceFilter[0] === "Coal") ?
							"cl" :
							(resourceFilter[0] === "Wolframite") ?
								"wl" :
								(resourceFilter[0] === "Uranium Ore") ?
									"u" :
									(calculateWithPowerPlantsCheck.checked) ?
										"pp" :
										"rf"

	// Sort or Filter resources
	if (resourceFilter[0] !== "None") {
		switch (resourceFilter[1]) {
			case "Max": filteredSeeds.sort((a, b) => b[resource] - a[resource]); break
			case "Min": filteredSeeds.sort((a, b) => a[resource] - b[resource]); break
			case ">": filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]); break
			case "≥": filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]); break
			case "=": filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]); break
			case "≤": filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]); break
			case "<": filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]); break
		}
	}
	// Calculate Resources if it is NOT Max or Min
	if (resourceFilter.length != 2) {
		if (calculateWithPowerPlantsCheck.checked) calculateResourcesWithPowerPlant(filteredSeeds)
		else calculateResources(filteredSeeds)
	}

	// Filter Order
	if (resourceFilter.length == 4) {
		(resourceFilter[3] === "Descending") ? filteredSeeds.sort((a, b) => b[resource] - a[resource]) :
			(resourceFilter[3] === "Ascending") ? filteredSeeds.sort((a, b) => a[resource] - b[resource]) : null
	}

	// Total Results
	totalResults.innerHTML = filteredSeeds.length.toString()

	// Put data in table
	setData(filteredSeeds)
}

/** Main Filter function */
export function Filter(seeds: Seed[]) {
	// Show Loading
	whiteBackground.style.visibility = "visible"
	loading.style.visibility = "visible"

	setTimeout(() => {
		let resource: ResourceFilter =
			(resourceFilter.selectedIndex) ?
				(amountFilter.selectedIndex >= 2) ?
					[resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterSigns, +amount.value, order.value as FilterOrder] :
					[resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterMinMax] :
				["None"]

		// World Size
		if (worldSizeCheck.checked) {
			// Resource Amount
			if (resourceAmountCheck.checked) filter(seeds, resource, worldSize.value, resourceAmount.value)
			else filter(seeds, resource, worldSize.value, "None")
		} else {
			// Resource Amount
			if (resourceAmountCheck.checked) filter(seeds, resource, "None", resourceAmount.value)
			else filter(seeds, resource, "None", "None")
		}

		// Hide Loading
		whiteBackground.style.visibility = "hidden"
		loading.style.visibility = "hidden";
		(<HTMLDivElement> progressBar.parentElement).style.visibility = "hidden"
	}, 10)
}

/** Display filters based on value */
function filtersDisplay() {
	filterSeed.style.display = "none"
	amount.style.display = "none"
	order.style.display = "none"
	if (amountFilter.value === "Seed") {
		filterSeed.style.display = "inline-block"
	} else if (amountFilter.value !== "Max" && amountFilter.value !== "Min") {
		amount.style.display = "inline-block"
		order.style.display = "inline-block"
	}
}
amountFilter.addEventListener("change", filtersDisplay)
filtersDisplay()