import { Seed } from "./types";
import { sliderValueToSize } from "./index.js";
import { calculateWithPowerPlantsCheck } from "./filter.js";

//// Table
// Table data
const tableData = <HTMLDivElement> document.getElementById("data")!
// Add all resources to resourcesDivs
const resourcesDivs: {[name: string]: HTMLDivElement} = {}
for (const resourceDiv of <HTMLCollectionOf<HTMLDivElement>> tableData.children) resourcesDivs[resourceDiv.dataset["name"]!] = resourceDiv

/** Show More Button */
const showMore = <HTMLDivElement> document.getElementById("showMore")!

/**
 * Display data in table
 * @param seed The seed to add
 */
function addSeedTableRow(seed: Seed) {
	for (const k in seed) {
		const key = k as keyof Seed

		switch (key) {
			// Resource Filter
			case "rf": if (!calculateWithPowerPlantsCheck.checked) resourcesDivs[key].innerHTML += `<div class="entry" onclick="s(event)" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`; break
			// World Size and Resource Amount
			case "ws": case "r": resourcesDivs[key].innerHTML += `<div class="entry">${sliderValueToSize[seed[key]]}</div>`; break
			// Seed
			case "sd": resourcesDivs[key].innerHTML += `<div class="entry" onclick="c(event)">${seed[key]}</div>`; break
			// Power Plant
			case "pp": if (calculateWithPowerPlantsCheck.checked) resourcesDivs["rf"].innerHTML += `<div class="entry" onclick="s(event)" title="${Math.round(seed[key] * 100000) / 100000}">${Math.round(seed[key] * 1000) / 1000}</div>`; break
			// Other other
			default: resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`; break
		}
	}
}

/**
 * Add Show More button
 * @param data The data of the seeds
 * @param lastIndex The last index of the last seed
 */
function addShowMoreButton(data: Seed[], lastIndex: number) {
	showMore.hidden = false
	showMore.onclick = () => addData(data, lastIndex, 50)
}

/**
 * Add data to table
 * @param data The data of the seeds
 * @param lastIndex The last index of the last seed
 * @param amount The amount MORE to add
 */
function addData(data: Seed[], lastIndex: number, amount: number) {
	showMore.onclick = null

	// Add data to table
	for (let i = lastIndex; i < Math.min(lastIndex + amount, data.length); i++) addSeedTableRow(data[i])

	// Add Show More button
	if (data.length > lastIndex + amount) addShowMoreButton(data, lastIndex + amount)
	else showMore.hidden = true
}

/**
 * Reset data in table
 * @param data The data of the seeds
 * @param showLimit The limit of how many seeds to show
 */
export function setData(data: Seed[], showLimit: number = 50) {
	showMore.onclick = null

	// Clear All data
	for (const name in resourcesDivs) resourcesDivs[name].innerHTML = ""

	// Add data to table
	for (let i = 0; i < Math.min(showLimit, data.length); i++) addSeedTableRow(data[i])

	// Add Show More button
	if (data.length > showLimit) addShowMoreButton(data, showLimit)
	else showMore.hidden = true
}