/**
 * @author Space.yg
 */

import { Factory } from "../../classes/buildings/tiers/output-tiers/Factory.js"

/** *Place on resource nodes to extract infinite resources.* */
export const extractor = new Factory({
	name: "Extractor",
	inputs: 0,
	description: "Place on resource nodes to extract infinite resources.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 10 },
		},
		2: {
			output: 1.5,
			price: { gold: 200 },
		},
		3: {
			output: 2,
			price: { gold: 1000 },
		},
		4: {
			output: 3,
			price: { gold: 5000 },
		},
		5: {
			output: 4,
			price: { gold: 20000 },
		},
	}
})
/** The output/min of {@link extractor Extractors}. */
export const extractorOutputPerMin = 7.5 as const

/** *Place on resource nodes to extract infinite resources.* */
export const uraniumExtractor = new Factory({
	name: "Uranium Extractor",
	inputs: 0,
	description: "Place on resource nodes to extract infinite resources.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 23500 },
		},
	},
})
/** The output/min of {@link uraniumExtractor Uranium Extractors}. */
export const uraniumExtractorOutputPerMin = 10 as const

/** *Used to craft items automatically, select a recipe after building.* */
export const workshop = new Factory({
	name: "Workshop",
	inputs: 1,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 10 },
		},
		2: {
			output: 1.5,
			price: { gold: 1000 },
		},
		3: {
			output: 2,
			price: { gold: 4000 },
		},
		4: {
			output: 3,
			price: { gold: 12000 },
		},
	},
})

/** *Used to craft items automatically, select a recipe after building.* */
export const furnace = new Factory({
	name: "Furnace",
	inputs: 1,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 30 },
		},
		2: {
			output: 1.5,
			price: { gold: 200 },
		},
		3: {
			output: 2,
			price: { gold: 800 },
		},
		4: {
			output: 3,
			price: { gold: 3200 },
		},
	},
})

/** *Used to craft items automatically, select a recipe after building.* */
export const machineShop = new Factory({
	name: "Machine Shop",
	inputs: 2,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 100 },
		},
		2: {
			output: 1.5,
			price: { gold: 500 },
		},
		3: {
			output: 2,
			price: { gold: 2000 },
		},
		4: {
			output: 3,
			price: { gold: 8000 },
		},
	},
})

/** *Used to craft items automatically, select a recipe after building.* */
export const forge = new Factory({
	name: "Forge",
	inputs: 2,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 100 },
		},
		2: {
			output: 1.5,
			price: { gold: 500 },
		},
		3: {
			output: 2,
			price: { gold: 2000 },
		},
		4: {
			output: 3,
			price: { gold: 10000 },
		},
	},
})

/** *Used to craft items automatically, select a recipe after building.* */
export const industrialFactory = new Factory({
	name: "Industrial Factory",
	inputs: 3,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 300 },
		},
		2: {
			output: 1.5,
			price: { gold: 1000 },
		},
		3: {
			output: 2,
			price: { gold: 4000 },
		},
		4: {
			output: 3,
			price: { gold: 16000 },
		},
	},
})

/** *Used to craft items automatically, select a recipe after building.* */
export const manufacturer = new Factory({
	name: "Manufacturer",
	inputs: 4,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 1000 },
		},
		2: {
			output: 1.5,
			price: { gold: 4000 },
		},
		3: {
			output: 2,
			price: { gold: 20000 },
		},
		4: {
			output: 3,
			price: { gold: 80000 },
		},
	},
})

/** *Used to craft items automatically, select a recipe after building.* */
export const earthTeleporter = new Factory({
	name: "Earth Teleporter",
	inputs: 1,
	description: "Used to craft items automatically, select a recipe after building.",
	tiers: {
		1: {
			output: 1,
			price: { gold: 100000 },
		},
	},
})

/** *Money might not grow on trees but Gems do. Gem Apples can be harvested using a Robotic Arm. Send Gem Apples into the Research Lab or Gold Vault to get Gems.* */
export const gemTree = new Factory({
	name: "Gem Tree",
	description: "Money might not grow on trees but Gems do. Gem Apples can be harvested using a Robotic Arm. Send Gem Apples into the Research Lab or Gold Vault to get Gems.",
	inputs: 0,
	tiers: {
		1: {
			output: 1,
			price: { gems: 250 },
		},
	},
})
/** The output/min of {@link gemTree Gem Trees}. */
export const gemTreeOutputPerMin = .2 as const