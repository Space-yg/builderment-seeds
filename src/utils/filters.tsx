import { Filter, Resources, Seed } from "@/types"
import { filterInPlace, replaceInPlace } from "./helpers"

/**
 * Convert a resource to an object key
 * @param resource The resource to convert
 * @returns the object key
 */
function resourceToKey(resource: string): keyof Resources {
	switch (resource) {
		case "Wood Log": return "w"
		case "Stone": return "s"
		case "Iron Ore": return "i"
		case "Copper Ore": return "cp"
		case "Coal": return "cl"
		case "Wolframite": return "wl"
		case "Uranium": return "u"
		case "Resource": return "r"
		default: throw new Error("Unknown resource \"" + resource + "\"")
	}
}

/**
 * Filter an array of seeds by a resource and return the filtered seeds
 * @param seeds The seeds to filter
 * @param filter The resource filter to apply on the seeds
 * @returns The filtered seeds
 */
function filterSeedsByResource(seeds: Seed[], filter: Filter.FilterResource, inPlace: boolean = false): Seed[] {
	function f(seed: Seed) {
		const compare = seed[resourceToKey(filter.resource)]
		switch (filter.sign) {
			case "≤": return compare <= filter.amount
			case "<": return compare < filter.amount
			case "=": return compare === filter.amount
			case ">": return compare > filter.amount
			case "≥": return compare >= filter.amount
			default: throw new Error("Unknown sign \"" + filter.sign + "\"")
		}
	}
	return inPlace ? filterInPlace(seeds, f) : seeds.filter(f)
}

/**
 * Filter an array of seeds by the world size and return the filtered seeds
 * @param seeds The seeds to filter
 * @param filter The world size filter to apply on the seeds
 * @returns The filtered seeds
 */
function filterSeedsByWorldSize(seeds: Seed[], filter: Filter.FilterWorldSize, inPlace: boolean = false): Seed[] {
	function f(seed: Seed) {
		switch (filter.sign) {
			case "≤": return seed.ws <= filter.size
			case "<": return seed.ws < filter.size
			case "=": return seed.ws === filter.size
			case ">": return seed.ws > filter.size
			case "≥": return seed.ws >= filter.size
			default: throw new Error("Unknown sign \"" + filter.sign + "\"")
		}
	}
	return inPlace ? filterInPlace(seeds, f) : seeds.filter(f)
}

/**
 * Filter an array of seeds by the resource amount and return the filtered seeds
 * @param seeds The seeds to filter
 * @param filter The resource amount filter to apply on the seeds
 * @returns The filtered seeds
 */
function filterSeedsByResourceAmount(seeds: Seed[], filter: Filter.FilterResourceAmount, inPlace: boolean = false): Seed[] {
	function f(seed: Seed) {
		switch (filter.sign) {
			case "≤": return seed.ra <= filter.amount
			case "<": return seed.ra < filter.amount
			case "=": return seed.ra === filter.amount
			case ">": return seed.ra > filter.amount
			case "≥": return seed.ra >= filter.amount
			default: throw new Error("Unknown sign \"" + filter.sign + "\"")
		}
	}
	return inPlace ? filterInPlace(seeds, f) : seeds.filter(f)
}

/**
 * Filter an array of seeds by a seed and return the filtered seeds
 * @param seeds The seeds to filter
 * @param filter The seed filter to apply on the seeds
 * @returns The filtered seeds
 */
function filterSeedsBySeed(seeds: Seed[], filter: Filter.FilterSeed, inPlace: boolean = false): Seed[] {
	return filter.operation === "is" ? inPlace ? filterInPlace(seeds, seed => seed.sd === filter.seed) : seeds.filter(seed => seed.sd === filter.seed)
		: inPlace ? filterInPlace(seeds, seed => seed.sd.includes(filter.seed)) : seeds.filter(seed => seed.sd.includes(filter.seed))
}

/**
 * Filter an array of seeds
 * @param seeds The seeds to filter
 * @param filters The filters to apply on the seeds
 * @param inPlace Filter the seeds in place or return a new array
 * @returns The new filtered seed (if not in place) or a reference to the seeds
 */
export function filterSeeds(seeds: Seed[], filters: Filter.FilterGroup, inPlace: boolean = false): Seed[] {
	let filteredSeeds: Seed[] = inPlace ? seeds : [...seeds]

	if (filters.group.length === 0) return filteredSeeds

	// AND
	if (filters.operation === "and") {
		for (const filter of filters.group) {
			// Does not work with a switch case
			if (filter.filter === "resource") filterSeedsByResource(filteredSeeds, filter, true)
			else if (filter.filter === "world size") filterSeedsByWorldSize(filteredSeeds, filter, true)
			else if (filter.filter === "resource amount") filterSeedsByResourceAmount(filteredSeeds, filter, true)
			else if (filter.filter === "seed") filterSeedsBySeed(filteredSeeds, filter, true)
			else if (filter.filter === "group") filterSeeds(filteredSeeds, filter)
		}
	}
	// OR
	else if (filters.operation === "or") {
		let seedsSet = new Set<Seed>()
		for (const filter of filters.group) {
			// Does not work with a switch case
			if (filter.filter === "resource") seedsSet = seedsSet.union(new Set(filterSeedsByResource(filteredSeeds, filter)))
			else if (filter.filter === "world size") seedsSet = seedsSet.union(new Set(filterSeedsByWorldSize(filteredSeeds, filter)))
			else if (filter.filter === "resource amount") seedsSet = seedsSet.union(new Set(filterSeedsByResourceAmount(filteredSeeds, filter)))
			else if (filter.filter === "seed") seedsSet = seedsSet.union(new Set(filterSeedsBySeed(filteredSeeds, filter)))
			else if (filter.filter === "group") seedsSet = seedsSet.union(new Set(filterSeeds(filteredSeeds, filter)))
		}
		if (inPlace) replaceInPlace([...seedsSet], filteredSeeds)
		else filteredSeeds = [...seedsSet]
	}

	return filteredSeeds
}