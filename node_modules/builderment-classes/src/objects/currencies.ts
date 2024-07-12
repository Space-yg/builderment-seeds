/**
 * @author Space.yg
 */

import { Currency } from "../classes/Currency.js"

/** Gold. */
export const gold = new Currency({
	name: "Gold",
	price: {
		gold: 1,
		gems: null,
	},
	image: "./resources/currencies/gold.png",
})

/** Gem. */
export const gem = new Currency({
	name: "Gem",
	price: {
		gold: null,
		gems: 1,
	},
	image: "./resources/currencies/gem.png",
})