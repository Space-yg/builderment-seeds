/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers.js"
import { DistanceTier } from "./DistanceTier.js"

// Types
import { type TiersOptions } from "../Tiers.js"
import { type DistanceTierOptions } from "./DistanceTier.js"

/**
 * The options of the optional tiers.
 * @extends {{@link TiersOptions `TiersOptions`}
 */
export type DistanceTiersOptions = TiersOptions<DistanceTierOptions, DistanceTier>

/**
 * Make a new {@link DistanceTier `StorageTier`}.
 * @extends {{@link Tiers `Tiers`}
 */
export class DistanceTiers extends Tiers {

	//// Object Properties
	declare tiers: { [/** The tiers. They must be consecutive integers */ tier: number]: DistanceTier }

	//// Constructors
	/**
	 * Constructs a new {@link DistanceTiers `StorageTiers`} object.
	 * @param options The tier options.
	 * @param passByReference Whether to pass the objects in the {@link DistanceTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(options: DistanceTiersOptions, passByReference?: boolean)
	/**
	 * Constructs a new {@link DistanceTiers `StorageTiers`} object.
	 * @param options A {@link DistanceTiers `StorageTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link DistanceTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(speedTiers: DistanceTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link DistanceTiers `StorageTiers`} object.
	 * @param speedTiers A {@link DistanceTiers `StorageTiers`} object or tier options.
	 * @param passByReference Whether to pass the objects in the {@link DistanceTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(speedTiers: DistanceTiers | DistanceTiersOptions, passByReference?: boolean)
	constructor(optionsOrStorageTiers: DistanceTiers | DistanceTiersOptions, passByReference: boolean = true) {
		super(optionsOrStorageTiers, passByReference)

		// DistanceTiers
		if (optionsOrStorageTiers instanceof DistanceTiers) {
			// Make all Tier to StorageTiers
			if (passByReference) this.tiers = optionsOrStorageTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new DistanceTier(optionsOrStorageTiers.tiers[tier])
		}
		// DistanceTiersOptions
		else {
			// console.log(this.tiers)
			// Make all Tier to StorageTiers
			for (const tier in this.tiers) {
				const t = optionsOrStorageTiers[tier]
				if (t instanceof DistanceTier) this.tiers[tier] = passByReference ? t : new DistanceTier(t)
				else this.tiers[tier] = new DistanceTier(t)
			}
		}
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param speedTiers The other {@link DistanceTiers `StorageTiers`} object.
	 * @returns `true` if both {@link DistanceTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(speedTiers: DistanceTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].distance !== speedTiers.tiers[tier].distance) return false
		return true
	}

	/**
	 * Determine if this {@link DistanceTiers `StorageTiers`} object is equal to another {@link DistanceTiers `StorageTiers`} object.
	 * @param speedTiers The other {@link DistanceTiers `StorageTiers`} object.
	 * @returns `true` if both {@link DistanceTiers `StorageTiers`} objects are equal, `false` otherwise.
	 */
	override equals(speedTiers: DistanceTiers): boolean {
		return super.equals(speedTiers)
			&& this.similarEquals(speedTiers)
	}

	/**
	 * Determine if this {@link DistanceTiers `StorageTiers`} object is strictly equal to another {@link DistanceTiers `StorageTiers`} object.
	 * @param speedTiers The other {@link DistanceTiers `StorageTiers`} object.
	 * @returns `true` if both {@link DistanceTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(speedTiers: DistanceTiers): boolean {
		return super.strictlyEquals(speedTiers)
			&& this.similarEquals(speedTiers)
	}
}