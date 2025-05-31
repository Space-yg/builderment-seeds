import { Seed } from "!/types"
import { Item } from "builderment-classes"
import { getResourcesFromData } from "./dataReader"

export async function calculateResource(seeds: Seed[], resource: string, powerPlant: boolean = false, alt: boolean = false): Promise<Seed[]> {
	const item = Item.getItemsByName(resource)[0]
	if (typeof item === "undefined") throw new Error(`Item "${resource}" does not exist`)

	seeds = JSON.parse(JSON.stringify(seeds))

	// No power plant and alt
	if (!powerPlant && !alt) seeds.forEach(seed => {
		seed.r = item.getMaxAmount({
			"Wood Log": seed.w,
			Stone: seed.s,
			"Iron Ore": seed.i,
			"Copper Ore": seed.cp,
			Coal: seed.cl,
			Wolframite: seed.wl,
			"Uranium Ore": seed.u,
		})
	})
	// With power plant and/or alt
	else {
		const data = await (await fetch(import.meta.env.BASE_URL + `/${powerPlant && alt ? "powerPlant-and-alt" : powerPlant ? "powerPlant" : "alt"}/${item.name}.bin`)).arrayBuffer()
		const resources = getResourcesFromData(data)
		for (let i = 0; i < seeds.length; i++) seeds[i].r = resources[i]
	}

	return seeds
}