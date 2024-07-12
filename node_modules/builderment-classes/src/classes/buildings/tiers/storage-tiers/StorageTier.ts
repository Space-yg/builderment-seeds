/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier.js"

// Types
import { type TierOptions } from "../Tier.js"
import { type RemoveFunctions } from "../../../../helpers.js"

/** Extra options for storage tier. */
export interface StorageTierExtra {
	/** The storage at this tier. */
	storage: number
}

/** Constructors for storage tier. */
export interface StorageTierContractors {
	/**
	 * Constructs a new {@link StorageTier `StorageTier`} object.
	 * @param options The storage tier options.
	 */
	new(options: StorageTierOptions): StorageTier
	/**
	 * Constructs a new {@link StorageTier `StorageTier`} object.
	 * @param storageTier A {@link StorageTier `StorageTier`} object.
	 */
	new(storageTier: StorageTier): StorageTier
	/**
	 * Constructs a new {@link StorageTier `StorageTier`} object.
	 * @param storageTier A {@link StorageTier `StorageTier`} object or storage tier options.
	 */
	new(storageTier: StorageTier | StorageTierOptions): StorageTier
}

/**
 * Functions for storage tier.
 * @extends {{@link Tier `Tier`}
 */
export interface StorageTierFunctions extends Tier {
	/**
	 * Determine if this {@link StorageTier `StorageTier`} object is equal to another {@link StorageTier `StorageTier`} object.
	 * @param storageTier The other {@link StorageTier `StorageTier`} object.
	 * @returns `true` if both {@link StorageTier `StorageTier`} objects are equal, `false` otherwise.
	 */
	equals(storageTier: StorageTier): boolean

	/**
	 * Determine if this {@link StorageTier `StorageTier`} object is strictly equal to another {@link StorageTier `StorageTier`} object.
	 * @param storageTier The other {@link StorageTier `StorageTier`} object.
	 * @returns `true` if both {@link StorageTier `StorageTier`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(storageTier: StorageTier): boolean
}

/**
 * Options for a storage tier.
 * @extends {{@link TierOptions `TierOptions`}
 */
export type StorageTierOptions = TierOptions<StorageTierExtra>

/**
 * Construct a new {@link StorageTier `StorageTier`}.
 * @extends {{@link Tier `Tier`}
 */
export type StorageTier = RemoveFunctions<Tier> & StorageTierExtra & StorageTierFunctions
export const StorageTier = Tier as unknown as StorageTierContractors