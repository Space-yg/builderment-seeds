/**
 * @author Space.yg
 */

import { Item } from "./Item.js"

/** The options of an input. */
export interface InputOptions {
	/** The item of the input. */
	item: Item
	/** The amount needed to make the parent. */
	amount: number
}

/**
 * The options of an input with input/min.
 * @extends {{@link InputOptions `InputOptions`}
 */
export interface InputPerMinOptions extends InputOptions {
	/** Total input/min in tier 1. */
	inputPerMin: number
}

/** The options of an input object. */
export interface InputOptionsObject {
	[/** The name of the input. */ name: string]: InputPerMinOptions
}