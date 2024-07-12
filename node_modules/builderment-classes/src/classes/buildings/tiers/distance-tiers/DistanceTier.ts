/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier.js"

// Types
import { type TierOptions } from "../Tier.js"
import { type RemoveFunctions } from "../../../../helpers.js"

/** Extra options for distance tier. */
export interface DistanceTierExtra {
	/** The distance at this tier. */
	distance: number
}

/** Constructors for distance tier. */
export interface DistanceTierContractors {
	/**
	 * Constructs a new {@link DistanceTier `DistanceTier`} object.
	 * @param options The distance tier options.
	 */
	new(options: DistanceTierOptions): DistanceTier
	/**
	 * Constructs a new {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier A {@link DistanceTier `DistanceTier`} object.
	 */
	new(distanceTier: DistanceTier): DistanceTier
	/**
	 * Constructs a new {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier A {@link DistanceTier `DistanceTier`} object or distance tier options.
	 */
	new(distanceTier: DistanceTier | DistanceTierOptions): DistanceTier
}

/**
 * Functions for distance tier.
 * @extends {{@link Tier `Tier`}
 */
export interface DistanceTierFunctions extends Tier {
	/**
	 * Determine if this {@link DistanceTier `DistanceTier`} object is equal to another {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
	 * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are equal, `false` otherwise.
	 */
	equals(distanceTier: DistanceTier): boolean

	/**
	 * Determine if this {@link DistanceTier `DistanceTier`} object is strictly equal to another {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
	 * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(distanceTier: DistanceTier): boolean
}

/**
 * Options for a distance tier.
 * @extends {{@link TierOptions `TierOptions`}
 */
export type DistanceTierOptions = TierOptions<DistanceTierExtra>

/**
 * Construct a new {@link DistanceTier `DistanceTier`}.
 * @extends {{@link Tier `Tier`}
 */
export type DistanceTier = RemoveFunctions<Tier> & DistanceTierExtra & DistanceTierFunctions
export const DistanceTier = Tier as unknown as DistanceTierContractors