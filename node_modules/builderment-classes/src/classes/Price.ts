/**
 * @author Space.yg
 */

/** The price options. */
export interface PriceOptions {
	/**
	 * The amount of gold.
	 * @default 0
	 */
	gold?: number | null
	/**
	 * The amount of gems.
	 * @default 0
	 */
	gems?: number | null
}

/** Make a new price. */
export class Price {

	//// Static Methods
	/**
	 * Add multiple prices together.
	 * @param prices Prices to add.
	 * @returns Total price.
	 */
	static add(...prices: (Price | PriceOptions)[]): Price {
		const total = new Price()
		for (const price of prices) total.add(price instanceof Price ? price : new Price(price))
		return total
	}

	/**
	 * Determine if all prices are equal to each other.
	 * @param prices The prices to compare.
	 * @returns `true` if all prices are equal, `false` otherwise.
	 */
	static equalPrices(...prices: (Price | PriceOptions)[]): boolean {
		if (!prices.length) return false

		const basePrice = prices[0] instanceof Price ? prices[0] : new Price(prices[0])
		return prices.slice(1).every(price => basePrice.equals(price instanceof Price ? price : new Price(price)))
	}

	//// Object Properties
	/**
	 * The amount of gold.
	 * @default 0
	 */
	gold: NonNullable<PriceOptions["gold"]> | null
	/**
	 * The amount of gems.
	 * @default 0
	 */
	gems: NonNullable<PriceOptions["gems"]> | null

	//// Constructors
	/**
	 * Construct a {@link Price `Price`} object.
	 */
	constructor()
	/**
	 * Construct a {@link Price `Price`} object.
	 * @param options The price options
	 */
	constructor(options: PriceOptions)
	/**
	 * Construct a {@link Price `Price`} object.
	 * @param price A {@link Price `Price`} object
	 */
	constructor(price: Price)
	/**
	 * Construct a {@link Price `Price`} object.
	 * @param price A {@link Price `Price`} object or price options
	 */
	constructor(price: Price | PriceOptions)
	constructor(optionsOrPrice?: Price | PriceOptions) {
		if (typeof optionsOrPrice === "undefined") {
			this.gold = 0
			this.gems = 0
		} else {
			this.gold = typeof optionsOrPrice.gold === "undefined" ? 0 : optionsOrPrice.gold
			this.gems = typeof optionsOrPrice.gems === "undefined" ? 0 : optionsOrPrice.gems
		}
	}

	//// Object Methods
	/**
	 * Converts this {@link Price `Price`} object to a string.
	 */
	toString(): string { return `Price({ gold: ${this.gold}, gems: ${this.gems} })` }

	/**
	 * Add two {@link Price `Price`} objects together. This method mutates the original {@link Price `Price`} object.
	 * @param price The other {@link Price `Price`} object to add.
	 * @returns The original {@link Price `Price`} object.
	 */
	add(price: Price): this {
		if (!(this.gold === null && price.gold === null)) this.gold! += price.gold!
		if (!(this.gems === null && price.gems === null)) this.gems! += price.gems!
		return this
	}

	/**
	 * Add two {@link Price `Price`} objects together. This method creates a new {@link Price `Price`} object.
	 * @param price The other {@link Price `Price`} object to add.
	 * @returns A new {@link Price `Price`} object.
	 */
	toAdd(price: Price): Price {
		return new Price({
			gold: this.gold === null && price.gold === null ? null : this.gold! + price.gold!,
			gems: this.gems === null && price.gems === null ? null : this.gems! + price.gems!,
		})
	}

	/**
	 * Determine if this {@link Price `Price`} object and another {@link Price `Price`} object are the equal.
	 * @param price The other price.
	 * @returns `true` if both prices are the equal, `false` otherwise.
	 */
	equals(price: Price): boolean {
		if (this === price) return true

		return this.gold === price.gold
			&& this.gems === price.gems
	}

	//// Symbols
	/**
	 * Called by `Object.prototype.toString`.
	 */
	get [Symbol.toStringTag](): string { return "Price" }

	/**
	 * Iterator called by the for-of loop.
	 */
	*[Symbol.iterator]() {
		yield this.gold
		yield this.gems
	}
}