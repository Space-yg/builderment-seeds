/**
 * @author Space.yg
 */

import { ItemCollector } from "../../classes/buildings/ItemCollector.js"

/** Item sent into the Research Lab can be used to unlock technology. Items not used for research will give you gold instead. */
export const researchLab = new ItemCollector({
	name: "Research Lab",
	price: { gold: 1000 },
	description: "Item sent into the Research Lab can be used to unlock technology. Items not used for research will give you gold instead.",
	limit: 3,
	inputs: 4,
})

/** Item sent into the Gold Vault converted into gold that can be used to build your factory. */
export const goldVault = new ItemCollector({
	name: "Gold Vault",
	price: { gold: 100 },
	description: "Item sent into the Gold Vault converted into gold that can be used to build your factory.",
	limit: 3,
	inputs: 4,
})