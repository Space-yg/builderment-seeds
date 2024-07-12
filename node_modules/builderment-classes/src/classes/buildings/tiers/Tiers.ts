/**
 * @author Space.yg
 */

// Classes
import { Tier } from "./Tier.js"
import { Price } from "../../Price.js"

// Functions
import { objToString } from "../../../helpers.js"

// Types
import { type TierOptions } from "./Tier.js"

/**
 * Options for {@link Tiers `Tiers`}.
 * @template O The options
 * @template T The tier
 */
export interface TiersOptions<O extends TierOptions, T extends Tier> {
	[/** The tiers. They must be consecutive integers. */ tier: number]: O | T
}

/** Make a new tiers. */
export class Tiers {

	//// Object Properties
	/** All tiers. */
	tiers: { [/** The tiers. They must be consecutive integers. */ tier: number]: Tier }

	/**
	 * Get the total price to get to the maximum tier.
	 * @readonly
	 */
	get maxPrice(): Price { return this.getTotalPrice(this.maxTierNum) }

	/**
	 * Maximum tier number.
	 * @readonly
	 */
	get maxTierNum(): number { return Math.max(...Object.keys(this.tiers).map(tier => +tier)) }

	/**
	 * Minimum tier number.
	 * @readonly
	 */
	get minTierNum(): number { return Math.min(...Object.keys(this.tiers).map(tier => +tier)) }

	/**
	 * Maximum tier.
	 * @readonly
	 */
	get maxTier(): Tier { return this.tiers[this.maxTierNum] }

	/**
	 * Minimum tier.
	 * @readonly
	 */
	get minTier(): Tier { return this.tiers[this.minTierNum] }

	//// Constructors
	/**
	 * Constructs a {@link Tier `Tier`} object.
	 * @param options The tiers options.
	 * @param passByReference Whether to pass the objects in the {@link Tier `Tier`} by reference or not. Default is `true`.
	 */
	constructor(options: TiersOptions<TierOptions, Tier>, passByReference?: boolean)
	/**
	 * Constructs a {@link Tier `Tier`} object.
	 * @param tiers A {@link Tier `Tier`} object.
	 * @param passByReference Whether to pass the objects in the {@link Tier `Tier`} by reference or not. Default is `true`.
	 */
	constructor(tiers: Tiers, passByReference?: boolean)
	/**
	 * Constructs a {@link Tier `Tier`} object.
	 * @param tiers A {@link Tier `Tier`} object or tiers options.
	 * @param passByReference Whether to pass the objects in the {@link Tier `Tier`} by reference or not. Default is `true`.
	 */
	constructor(tiers: Tiers | TiersOptions<TierOptions, Tier>, passByReference?: boolean)
	constructor(optionsOrTiers: Tiers | TiersOptions<TierOptions, Tier>, passByReference: boolean = true) {
		// Tiers
		if (optionsOrTiers instanceof Tiers) {
			if (passByReference) this.tiers = optionsOrTiers.tiers
			else {
				this.tiers = {}
				for (const tier in optionsOrTiers.tiers) this.tiers[tier] = new Tier(optionsOrTiers.tiers[tier])
			}
		}
		// TiersOptions
		else {
			// First tier must be an integer
			const minTier = Math.min(...Object.keys(optionsOrTiers).map(tier => +tier))
			if (parseInt(minTier + "") !== minTier) throw new Error(`All tiers must be integers.`)

			this.tiers = {}

			// For each tier from the minimum to the maximum
			const maxTier = Math.max(...Object.keys(optionsOrTiers).map(tier => +tier))
			for (let i = minTier; i <= maxTier; i++) {
				const tier = optionsOrTiers[i]

				// Check if tier exists
				if (!tier) throw new Error(`The number ${i} is missing from the tiers. The tiers must include all integers from the smallest value (${this.minTierNum}) to the largest value (${this.maxTierNum}).`)

				// Add tier
				if (tier instanceof Tier) this.tiers[i] = passByReference ? tier : new Tier(tier)
				else this.tiers[i] = new Tier(tier)
			}
		}
	}

	//// Object Methods
	/**
	 * Converts the tiers into string.
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than `0`. Default is `2`.
	 * @returns The string.
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * Check if a tier number is in this {@link Tiers `Tiers`} object's tiers.
	 * @param tier Tier number to search for.
	 * @param error Whether to throw an error.
	 * @throws Error if tier number was not found.
	 * @returns Whether the tier number is in this {@link Tiers `Tiers`} object's tiers.
	 */
	hasN(tier: number, error: boolean = false): boolean {
		if (!(tier in this.tiers)) {
			if (!error) return false

			if (tier < this.minTierNum) throw new Error(`"tier" (${tier}) cannot be less than minimum tier (${this.minTierNum}).`)
			if (tier > this.minTierNum) throw new Error(`"tier" (${tier}) cannot be greater than maximum tier (${this.maxTierNum}).`)
			throw new Error(`"tier" (${tier}) cannot be a non-integer number.`)
		}
		return true
	}

	/**
	 * Check if this {@link Tiers `Tiers`} object has a {@link Tier `Tier`} object as one of its tiers.
	 * @param tier The {@link Tier `Tier`} object to check.
	 * @returns `true` if this {@link Tiers `Tiers`} object has {@link tier `tier`} as one of its tiers, `false` otherwise.
	 */
	has(tier: Tier): boolean {
		for (const t in this.tiers) if (this.tiers[t].equals(tier)) return true
		return false
	}

	/**
	 * Check if this {@link Tiers `Tiers`} object strictly has a {@link Tier `Tier`} object as one of its tiers.
	 * @param tier The {@link Tier `Tier`} object to check.
	 * @returns `true` if this {@link Tiers `Tiers`} object strictly has {@link tier `tier`} as one of its tiers, `false` otherwise.
	 */
	strictlyHas(tier: Tier): boolean {
		for (const t in this.tiers) if (this.tiers[t].strictlyEquals(tier)) return true
		return false
	}

	/**
	 * Check if this {@link Tiers `Tiers`} object has a reference to {@link Tier `Tier`} object as one of its tiers.
	 * @param tier The {@link Tier `Tier`} object to check.
	 * @returns `true` if this {@link Tiers `Tiers`} object has a reference to {@link tier `tier`} as one of its tiers, `false` otherwise.
	 */
	hasReference(tier: Tier): boolean {
		for (const t in this.tiers) if (this.tiers[t] === tier) return true
		return false
	}

	/**
	 * Get the total price to get to a tier.
	 * @param tier The tier.
	 */
	getTotalPrice(tier: number): Price {
		this.hasN(tier, true)

		const total = new Price()
		for (let i = this.minTierNum; i <= tier; i++) total.add(this.tiers[i].price)
		return total
	}

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param tiers The other {@link Tiers `Tiers`} object.
	 * @returns `true` if both {@link Tiers `Tiers`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected similarEquals(tiers: Tiers): boolean {
		if (this === tiers) return true
		return Object.keys(this.tiers).length === Object.keys(tiers.tiers).length
	}

	/**
	 * Determine if this {@link Tiers `Tiers`} object is equal to another {@link Tiers `Tiers`} object.
	 * @param tiers The other {@link Tiers `Tiers`} object.
	 * @returns `true` if both tiers are equal, `false` otherwise.
	 */
	equals(tiers: Tiers): boolean {
		if (!this.similarEquals(tiers)) return false
		for (const tier in this.tiers) if (!this.tiers[tier].equals(tiers.tiers[tier])) return false
		return true
	}

	/**
	 * Determine if this {@link Tiers `Tiers`} object is strictly equal to another {@link Tiers `Tiers`} object.
	 * @param tiers The other {@link Tiers `Tiers`}.
	 * @returns `true` if both tiers are strictly equal, `false` otherwise
	 */
	strictlyEquals(tiers: Tiers): boolean {
		if (!this.similarEquals(tiers)) return false
		for (const tier in this.tiers) if (!this.tiers[tier].strictlyEquals(tiers.tiers[tier])) return false
		return true
	}
}