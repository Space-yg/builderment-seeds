/** A seed */
export interface Seed {
	/** Seed */
	sd: string
	/** Wood Log */
	wd: number
	/** Stone */
	s: number
	/** Iron */
	i: number
	/** Copper */
	cp: number
	/** Coal */
	cl: number
	/** Wolframite */
	wl: number
	/** Uranium */
	u: number
	/** World Size */
	ws: number
	/** Resource Amount */
	r: number
	/** Resource Filter */
	rf: number
	/** Power plant */
	pp: number
}

/** The filter signs */
export type FilterSigns = ">" | "≥" | "=" | "≤" | "<"

/** The filter order */
export type FilterOrder = "Ascending" | "Descending"

/** The filter min or max */
export type FilterMinMax = "Min" | "Max"

/** A resource filter that specifies how to filter the resources */
export type ResourceFilter = ["None"] | [string, FilterMinMax] | [string, FilterSigns, number, FilterOrder]