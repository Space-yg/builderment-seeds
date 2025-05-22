import { Filter, Resources, Seed } from "!/types"
import { filterInPlace, replaceInPlace } from "./helpers"

/**
 * Gets a filter group by deep diving into the `filters` group using the IDs from `groupIds`
 * @param filterGroup The filter group to search in (usually a `draft` or the main filter group)
 * @param groupIds The IDs to get to the filter group
 * @returns A filter group
 */
export function getGroup(filterGroup: Filter.FilterGroup, groupIds: number[]): Filter.FilterGroup | null {
	console.assert(groupIds.length > 0, "groupIds must have at least one ID")

	if (groupIds.length === 1) {
		if (filterGroup.id === groupIds[0]) return filterGroup
		else return null
	}

	let group = filterGroup
	for (let i = 1; i < groupIds.length; i++) {
		const found = group.group.find(g => g.id === groupIds[i]) as Filter.FilterGroup
		if (typeof found === "undefined") return null
		group = found
	}

	return group
}

/**
 * Get the filter group that a filter belongs to
 * @param filterGroup The filter group to search in
 * @param id The ID of the filter to find the group of
 * @returns The filter group the filter with ID `id` is in
 */
export function getGroupOf(filterGroup: Filter.FilterGroup, id: number): Filter.FilterGroup | null
/**
 * Get the filter group that a filter belongs to
 * @param filterGroup The filter group to search in
 * @param filter The filter to find the group of
 * @returns The filter group the `filter` is in
 */
export function getGroupOf(filterGroup: Filter.FilterGroup, filter: Filter.Filter): Filter.FilterGroup | null
/**
 * Get the filter group that a filter belongs to
 * @param filterGroup The filter group to search in
 * @param filterOrId The filter or ID of the filter to find the group of
 * @returns The filter group the filter is in
 */
export function getGroupOf(filterGroup: Filter.FilterGroup, filterOrId: Filter.Filter | number): Filter.FilterGroup | null {
	// Get the ID of the filter
	let id
	if (typeof filterOrId === "object") id = filterOrId.id
	else id = filterOrId

	// Check filter group
	if (filterGroup.id === id) return filterGroup

	// Check every group in filter group
	for (const filter of filterGroup.group) {
		if (filter.id === id) return filterGroup
		if (filter.filter === "group") {
			const tempGroup = getGroupOf(filter, id)
			if (tempGroup) return tempGroup
		}
	}

	// Not found
	return null
}

/**
 * Get a filter that exists in a filter group using `groupIds` and `filterId`
 * @param filters The filter group to search in (usually a `draft` or the main filter group)
 * @param groupIds The IDs to get to the filer group that this filter belongs to
 * @param filterId The filter ID we are trying to get
 * @returns A filter if exists; `null` otherwise
 */
export function getFilter<T extends Filter.Filter = Filter.Filter>(filters: Filter.FilterGroup, groupIds: number[], filterId: number): T | null {
	return getGroup(filters, groupIds)?.group?.find(filter => filter.id === filterId) as T ?? null
}

export function findFilter(filterGroup: Filter.FilterGroup, id: number): Filter.Filter | null {
	for (const filter of filterGroup.group) {
		if (filter.id === id) return filter
		if (filter.filter === "group") {
			const found = findFilter(filter, id)
			if (found) return found
		}
	}
	return null
}

/**
 * Move a filter
 * @param filterGroup The filter group the filter is in and will be moved to
 * @param moveId The filter to move
 * @param toId The filter to move to
 * @param position The way to move the filter
 */
export function moveFilter(filterGroup: Filter.FilterGroup, moveId: number, toId: number, position: "before" | "after" | "inside"): void {
	// If the moveId and the toId are equal, then do nothing because the filter is in the correct place
	if (moveId === toId) return

	// Get filter groups and check they exist
	const moveFilterGroup = getGroupOf(filterGroup, moveId)
	if (moveFilterGroup === null) throw new Error("Could not find the filter with ID moveId of \"" + moveId + "\"")
	const toFilterGroup = getGroupOf(filterGroup, toId)
	if (toFilterGroup === null) throw new Error("Could not find the filter with ID toId of \"" + moveId + "\"")

	// Remove the moveFilter filter from the moveFilterGroup
	const moveFilter = moveFilterGroup.group.splice(moveFilterGroup.group.findIndex(filter => filter.id === moveId), 1)[0]

	// Add the moveFilter to the toFilterGroup
	const toFilterIndex = toFilterGroup.group.findIndex(filter => filter.id === toId)
	if (position === "before") toFilterGroup.group.splice(toFilterIndex, 0, moveFilter)
	else if (position === "after") toFilterGroup.group.splice(toFilterIndex + 1, 0, moveFilter)
	else if (position === "inside") {
		const toFilter = toFilterGroup.group[toFilterIndex]
		if (toFilter.filter !== "group") throw new Error("Cannot insert a filter inside a non-filter group")
		toFilter.group.push(moveFilter)
	}
}

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