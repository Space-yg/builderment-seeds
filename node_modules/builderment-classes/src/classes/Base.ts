/**
 * @author Space.yg
 */

// Classes
import { Price } from "./Price.js"

// Functions
import { objToString } from "../helpers.js"

// Types
import { type PriceOptions } from "./Price.js"

/** The base options. */
export interface BaseOptions {
	/** The name. */
	name: string
	/** The price. */
	price: Price | PriceOptions
	/**
	 * URL or relative path to the image.
	 * @default "./resources/"
	 */
	image?: string
}

// TODO: class Recipe
/** The base of some classes. */
export class Base {

	//// Static properties
	//* Private
	/** Total bases that has been created. */
	static #amount: number = 0

	//* Public
	/**
	 * Total bases that has been created.
	 * @readonly
	 */
	static get amount() { return this.#amount }

	/**
	 * All the bases that has been created.
	 * @readonly
	 */
	static readonly bases: { [/** The name. */ name: string]: Base[] } = {}

	//// Object Properties
	/** The name. */
	name: BaseOptions["name"]
	/** The price. */
	price: Price
	/**
	 * URL or relative path to the image.
	 * @default "./resources/"
	 */
	image: NonNullable<BaseOptions["image"]>

	//// Constructors
	/**
	 * Constructs a {@link Base `Base`} object.
	 * @param options The base options.
	 */
	constructor(options: BaseOptions)
	/**
	 * Constructs a {@link Base `Base`} object.
	 * @param base A {@link Base `Base`} object.
	 * @param passByReference Whether to pass the objects in {@link base `base`} by reference or not. Default is `true`.
	 */
	constructor(base: Base, passByReference?: boolean)
	/**
	 * Constructs a {@link Base `Base`} object.
	 * @param base A {@link Base `Base`} object or base options.
	 * @param passByReference Whether to pass the objects in {@link base `base`} by reference or not. Default is `true`.
	 */
	constructor(base: Base | BaseOptions, passByReference?: boolean)
	constructor(baseOrOptions: Base | BaseOptions, passByReference: boolean = true) {
		this.name = baseOrOptions.name
		if (passByReference && baseOrOptions instanceof Base) this.price = baseOrOptions.price
		else this.price = new Price(baseOrOptions.price)
		this.image = baseOrOptions.image ?? "./resources/"

		// Statics
		Base.#amount++
		if (typeof Base.bases[baseOrOptions.name] === "undefined") Base.bases[baseOrOptions.name] = [this]
		else Base.bases[baseOrOptions.name].push(this)
	}

	//// Object Methods
	/**
	 * Converts this {@link Base `Base`} object into string.
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than 0. Default is 2.
	 * @returns The string.
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * Determine if this {@link Base `Base`} object is equal to another {@link Base `Base`} object.
	 * @param base The other {@link Base `Base`} object.
	 * @returns `true` if both {@link Base `Base`} objects are equal, `false` otherwise.
	 */
	equals(base: Base): boolean {
		if (this === base) return true
		return this.name === base.name
			&& this.price.equals(base.price)
	}

	/**
	 * Determine if this {@link Base `Base`} object is strictly equal to another {@link Base `Base`} object.
	 * @param base The other {@link Base `Base`} object.
	 * @returns `true` if both {@link Base `Base`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(base: Base): boolean {
		return this.equals(base)
			&& this.image === base.image
	}
}
