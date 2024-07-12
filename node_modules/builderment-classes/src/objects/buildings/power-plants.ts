/**
 * @author Space.yg
 */

import { PowerPlant } from "../../classes/buildings/PowerPlant.js"

export const coalPowerPlant = new PowerPlant({
	name: "Coal Power Plant",
	price: { gold: 2000 },
	duration: 15,
	speed: 1.2,
	region: {
		width: 12,
		height: 12,
	},
})
export const nuclearPowerPlant = new PowerPlant({
	name: "Nuclear Power Plant",
	price: { gold: 500000 },
	duration: 60,
	speed: 1.4,
	region: {
		width: 21,
		height: 22,
	},
})