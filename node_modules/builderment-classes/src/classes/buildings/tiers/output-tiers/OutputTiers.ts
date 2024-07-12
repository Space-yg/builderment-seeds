/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers.js"
import { OutputTier } from "./OutputTier.js"

// Types
import { type TiersOptions } from "../Tiers.js"
import { type OutputTierOptions } from "./OutputTier.js"

/**
 * Options for output tiers.
 * @extends {{@link TiersOptions `TiersOptions`}
 */
export type OutputTiersOptions = TiersOptions<OutputTierOptions, OutputTier>

/**
 * Make a new output tier.
 * @extends {{@link Tiers `Tiers`}
 */
export class OutputTiers extends Tiers {

	//// Object Properties
	declare tiers: { [/** The tiers. They must be consecutive integers. */ tier: number]: OutputTier }
	override get maxTier(): OutputTier { return this.tiers[this.maxTierNum] }
	override get minTier(): OutputTier { return this.tiers[this.minTierNum] }

	//// Constructors
	/**
	 * Constructs a new {@link OutputTiers `OutputTiers`} object.
	 * @param options The output tier options.
	 * @param passByReference Whether to pass the objects in the {@link options `options`} by reference or not. Default is `true`.
	 */
	constructor(options: OutputTiersOptions, passByReference?: boolean)
	/**
	 * Constructs a new {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers An {@link OutputTiers `OutputTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link outputTiers `outputTiers`} by reference or not. Default is `true`.
	 */
	constructor(outputTiers: OutputTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers An {@link OutputTiers `OutputTiers`} object or output tier options.
	 * @param passByReference Whether to pass the objects in the {@link outputTiers `outputTiers`} by reference or not. Default is `true`.
	 */
	constructor(outputTiers: OutputTiers | OutputTiersOptions, passByReference?: boolean)
	constructor(optionsOrOutputTiers: OutputTiers | OutputTiersOptions, passByReference: boolean = true) {
		super(optionsOrOutputTiers, passByReference)

		// Make all Tier to OutputTier
		// OutputTiers
		if (optionsOrOutputTiers instanceof OutputTiers) {
			if (passByReference) this.tiers = optionsOrOutputTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new OutputTier(optionsOrOutputTiers.tiers[tier])
		}
		// OutputTiersOptions
		else {
			for (const tier in this.tiers) {
				const t = optionsOrOutputTiers[tier]
				if (t instanceof OutputTier) this.tiers[tier] = passByReference ? t : new OutputTier(t)
				else this.tiers[tier] = new OutputTier(t)
			}
		}
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
	 * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(outputTiers: OutputTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].output !== outputTiers.tiers[tier].output) return false
		return true
	}

	/**
	 * Determine if this {@link OutputTiers `OutputTiers`} object is equal to another {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
	 * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are equal, `false` otherwise.
	 */
	override equals(outputTiers: OutputTiers): boolean {
		return super.equals(outputTiers)
			&& this.similarEquals(outputTiers)
	}

	/**
	 * Determine if this {@link OutputTiers `OutputTiers`} object is strictly equal to another {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
	 * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(outputTiers: OutputTiers): boolean {
		return super.strictlyEquals(outputTiers)
			&& this.similarEquals(outputTiers)
	}
}