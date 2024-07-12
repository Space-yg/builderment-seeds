/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier.js"

// Types
import { type TierOptions } from "../Tier.js"
import { type RemoveFunctions } from "../../../../helpers.js"

/** Extra options for speed tier. */
export interface SpeedTierExtra {
	/** The speed at this tier. */
	speed: number
}

/** Constructors for speed tier. */
export interface SpeedTierContractors {
	/**
	 * Constructs a new {@link SpeedTier `SpeedTier`} object.
	 * @param options The speed tier options.
	 */
	new(options: SpeedTierOptions): SpeedTier
	/**
	 * Constructs a new {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier A {@link SpeedTier `SpeedTier`} object.
	 */
	new(speedTier: SpeedTier): SpeedTier
	/**
	 * Constructs a new {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier A {@link SpeedTier `SpeedTier`} object or speed tier options.
	 */
	new(speedTier: SpeedTier | SpeedTierOptions): SpeedTier
}

/**
 * Functions for speed tier.
 * @extends {{@link Tier `Tier`}
 */
export interface SpeedTierFunctions extends Tier {
	/**
	 * Determine if this {@link SpeedTier `SpeedTier`} object is equal to another {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
	 * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are equal, `false` otherwise.
	 */
	equals(speedTier: SpeedTier): boolean

	/**
	 * Determine if this {@link SpeedTier `SpeedTier`} object is strictly equal to another {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
	 * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(speedTier: SpeedTier): boolean
}

/**
 * Options for a speed tier.
 * @extends {{@link TierOptions `TierOptions`}
 */
export type SpeedTierOptions = TierOptions<SpeedTierExtra>

/**
 * Construct a new {@link SpeedTier `SpeedTier`}.
 * @extends {{@link Tier `Tier`}
 */
export type SpeedTier = RemoveFunctions<Tier> & SpeedTierExtra & SpeedTierFunctions
export const SpeedTier = Tier as unknown as SpeedTierContractors