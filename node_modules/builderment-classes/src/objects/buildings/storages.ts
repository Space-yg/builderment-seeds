/**
 * @author Space.yg
 */

import { Storage } from "../../classes/buildings/tiers/storage-tiers/Storage.js"

/** *Storage buildings can only store one type of item at a time. Max capacity can be upgraded.* */
export const storage = new Storage({
	name: "Storage",
	description: "Storage buildings can only store one type of item at a time. Max capacity can be upgraded.",
	tiers: {
		1: {
			price: { gold: 500 },
			storage: 250,
		},
		2: {
			price: { gold: 500 },
			storage: 500,
		},
		3: {
			price: { gold: 1000 },
			storage: 1000,
		},
		4: {
			price: { gold: 2000 },
			storage: 2000,
		},
	},
})