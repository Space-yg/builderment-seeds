/** All possible signs for filter options */
export type Sign = "≤" | "<" | "=" | ">" | "≥"

/** All possible world settings values */
export type WorldSettingSize = 50 | 75 | 100 | 150 | 200

/** All possible world settings values in smaller values */
export type SmallWorldSettingSize = 1 | 2 | 3 | 4 | 5

/** All filter types */
export namespace Filter {
	/** Filter a resource */
	export type FilterResource = {
		id: number
		filter: "resource"
		resource: string
		sign: Sign
		amount: number
	}

	/** Filter the world size */
	export type FilterWorldSize = {
		id: number
		filter: "world size"
		sign: Sign
		size: WorldSettingSize
	}

	/** Filter the resource amount */
	export type FilterResourceAmount = {
		id: number
		filter: "resource amount"
		sign: Sign
		amount: WorldSettingSize
	}

	/** Operations that can be used while filtering by seed */
	export type SeedOperations = "is" | "has"

	/** Filter the seed */
	export type FilterSeed = {
		id: number
		filter: "seed"
		operation: SeedOperations
		seed: string
	}

	/** Operations that can be used between groups */
	export type GroupOperation = "and" | "or"

	/** A collection of filters */
	export type FilterGroup = {
		id: number
		filter: "group"
		operation: GroupOperation
		group: Filter[]
	}

	/** A filter */
	export type Filter = (FilterResource | FilterWorldSize | FilterResourceAmount | FilterSeed | FilterGroup)

	export type FilterName = Filter["filter"]
}

/** Resources of a seed */
export type RawResources = {
	/** Wood Log */
	w: number
	/** Stone */
	s: number
	/** Iron Ore */
	i: number
	/** Copper Ore */
	cp: number
	/** Coal */
	cl: number
	/** Wolframite */
	wl: number
	/** Uranium */
	u: number
}

export type Resources = RawResources & {
	/** Resource Calculated */
	r: number
}

/** A seed */
export type Seed = Resources & {
	/** Seed */
	sd: string
	/** World Size */
	ws: WorldSettingSize
	/** Resource Amount */
	ra: WorldSettingSize
}

/** All sort types */
export namespace Sort {
	/** The sorting order */
	export type SortOrder = "ascending" | "descending"

	/** The resources that can be used to sort by */
	export type SortResource = keyof Seed

	/** A sort option */
	export type SortOption = {
		id: number
		resource: SortResource
		order: SortOrder
	}
}

/** Show all keys and values of any object type */
export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}