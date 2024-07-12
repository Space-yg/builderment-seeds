/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier.js"

// Types
import { type TierOptions } from "../Tier.js"
import { type RemoveFunctions } from "../../../../helpers.js"

/** Extra options for output tier. */
export interface OutputTierExtra {
	/** The output at this tier. */
	output: number
}

/** Constructors for output tier. */
export interface OutputTierContractors {
	/**
	 * Constructs a new {@link OutputTier `OutputTier`} object.
	 * @param options The output tier options.
	 */
	new(options: OutputTierOptions): OutputTier
	/**
	 * Constructs a new {@link OutputTier `OutputTier`} object.
	 * @param outputTier A {@link OutputTier `OutputTier`} object.
	 */
	new(outputTier: OutputTier): OutputTier
	/**
	 * Constructs a new {@link OutputTier `OutputTier`} object.
	 * @param outputTier A {@link OutputTier `OutputTier`} object or output tier options.
	 */
	new(outputTier: OutputTier | OutputTierOptions): OutputTier
}

/**
 * Functions for output tier.
 * @extends {{@link Tier `Tier`}
 */
export interface OutputTierFunctions extends Tier {
	/**
	 * Determine if this {@link OutputTier `OutputTier`} object is equal to another {@link OutputTier `OutputTier`} object.
	 * @param outputTier The other {@link OutputTier `OutputTier`} object.
	 * @returns `true` if both {@link OutputTier `OutputTier`} objects are equal, `false` otherwise.
	 */
	equals(outputTier: OutputTier): boolean

	/**
	 * Determine if this {@link OutputTier `OutputTier`} object is strictly equal to another {@link OutputTier `OutputTier`} object.
	 * @param outputTier The other {@link OutputTier `OutputTier`} object.
	 * @returns `true` if both {@link OutputTier `OutputTier`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(outputTier: OutputTier): boolean
}

/**
 * Options for a output tier.
 * @extends {{@link TierOptions `TierOptions`}
 */
export type OutputTierOptions = TierOptions<OutputTierExtra>

/**
 * Construct a new {@link OutputTier `OutputTier`}.
 * @extends {{@link Tier `Tier`}
 */
export type OutputTier = RemoveFunctions<Tier> & OutputTierExtra & OutputTierFunctions
export const OutputTier = Tier as unknown as OutputTierContractors