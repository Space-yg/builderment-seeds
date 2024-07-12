/**
 * @author Space.yg
 */

// Classes
import { objToString, RemoveFunctions } from "../../../helpers.js"
import { Price } from "../../Price.js"

// Types
import { type PriceOptions } from "../../Price.js"

/** Optional options for a tier */
export type TierOptions<Extra extends object = {}> = {
	/**
	 * The price of that tier.
	 * @default
	 * ```javascript
	 * Price({
	 * 	gold: 0,
	 * 	gems: 0,
	 * })
	 * ```
	*/
	price?: Price | PriceOptions
	/**
	 * The relative path or URL to the image of this tier.
	 * @default "./resources/"
	 */
	image?: string
} & Extra

/** Make a new tier. */
export class Tier {

	//// Object Properties
	/**
	 * The price of that tier.
	 * @default 
	 * ```javascript
	 * new Price({
	 * 	gold: 0,
	 * 	gems: 0,
	 * })
	 * ```
	 */
	price: Price
	/**
	 * The relative path or URL to the image of this tier.
	 * @default "./resources/"
	 */
	image: NonNullable<TierOptions["image"]>

	//// Constructors
	/**
	 * Construct a {@link Tier `Tier`} object.
	 * @param options The tier options.
	 */
	constructor(options: TierOptions)
	/**
	 * Construct a {@link Tier `Tier`} object.
	 * @param tier A {@link Tier `Tier`} object.
	 */
	constructor(tier: Tier)
	/**
	 * Construct a {@link Tier `Tier`} object.
	 * @param tier A {@link Tier `Tier`} object or tier options.
	 */
	constructor(tier: Tier | TierOptions)
	constructor(optionsOrTier: Tier | TierOptions) {
		this.price = optionsOrTier.price instanceof Price ? optionsOrTier.price : typeof optionsOrTier.price === "undefined" ? new Price() : new Price(optionsOrTier.price)
		this.image = optionsOrTier.image ?? "./resources/"

		// Add the rest of the properties
		for (const option in optionsOrTier) {
			if ((["price", "image"].indexOf(option) + 1)) continue
			// @ts-ignore
			this[option as keyof Tier] = optionsOrTier[option]
		}
	}

	//// Object Methods
	/**
	 * Converts the tier into string.
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than `0`. Default is `2`.
	 * @returns The string.
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param tier The other {@link Tier `Tier`} object.
	 * @returns `true` if both {@link Tier `Tier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected similarEquals(tier: Tier): boolean {
		return this.price.equals(tier.price)
	}

	/**
	 * Determine if this {@link Tier `Tier`} object is equal to another {@link Tier `Tier`} object.
	 * @param tier The other {@link Tier `Tier`} object.
	 * @returns `true` if both {@link Tier `Tier`} objects are equal, `false` otherwise.
	 */
	equals(tier: Tier): boolean {
		if (this === tier) return true

		for (const property in this) if (!(["price", "image"].indexOf(property) + 1)) {
			const value = this[property as keyof RemoveFunctions<Tier>]
			if (["string", "bigint", "boolean", "number", "undefined"].indexOf(typeof value) + 1 && value !== tier[property as keyof Tier]) return false
			else if (typeof value === "object") {
				// @ts-ignore
				if (Object.hasOwn(value, "equals") && !value.equals(tier[property])) return false
				else if (value !== tier[property as keyof Tier]) return false
			}
		}

		return this.similarEquals(tier)
	}

	/**
	 * Determine if this {@link Tier `Tier`} object is strictly equal to another {@link Tier `Tier`} object.
	 * @param tier The other {@link Tier `Tier`} object.
	 * @returns `true` if both {@link Tier `Tier`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(tier: Tier): boolean {
		if (this === tier) return true

		for (const property in this) if (!(["price", "image"].indexOf(property) + 1)) {
			const value = this[property as keyof RemoveFunctions<Tier>]
			if (["string", "bigint", "boolean", "number", "undefined"].indexOf(typeof value) + 1 && value !== tier[property as keyof Tier]) return false
			else if (typeof value === "object") {
				// @ts-ignore
				if (Object.hasOwn(value, "strictlyEquals") && !value.strictlyEquals(tier[property])) return false
				// @ts-ignore
				else if (Object.hasOwn(value, "equals") && !value.equals(tier[property])) return false
				else if (value !== tier[property as keyof Tier]) return false
			}
		}

		return this.similarEquals(tier)
			&& this.image === tier.image
	}
}