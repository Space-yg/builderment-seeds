/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers.js"
import { StorageTier } from "./StorageTier.js"

// Types
import { type TiersOptions } from "../Tiers.js"
import { type StorageTierOptions } from "./StorageTier.js"

/**
 * The options of the optional tiers.
 * @extends {{@link TiersOptions `TiersOptions`}
 */
export type StorageTiersOptions = TiersOptions<StorageTierOptions, StorageTier>

/**
 * Make a new {@link StorageTier `StorageTier`}.
 * @extends {{@link Tiers `Tiers`}
 */
export class StorageTiers extends Tiers {

	//// Object Properties
	declare tiers: { [/** The tiers. They must be consecutive integers. */ tier: number]: StorageTier }
	override get maxTier(): StorageTier { return this.tiers[this.maxTierNum] }
	override get minTier(): StorageTier { return this.tiers[this.minTierNum] }

	//// Constructors
	/**
	 * Constructs a new {@link StorageTiers `StorageTiers`} object.
	 * @param options The tier options.
	 * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(options: StorageTiersOptions, passByReference?: boolean)
	/**
	 * Constructs a new {@link StorageTiers `StorageTiers`} object.
	 * @param options A {@link StorageTiers `StorageTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(storageTiers: StorageTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers A {@link StorageTiers `StorageTiers`} object or tier options.
	 * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(storageTiers: StorageTiers | StorageTiersOptions, passByReference?: boolean)
	constructor(optionsOrStorageTiers: StorageTiers | StorageTiersOptions, passByReference: boolean = true) {
		super(optionsOrStorageTiers, passByReference)

		// StorageTiers
		if (optionsOrStorageTiers instanceof StorageTiers) {
			// Make all Tier to StorageTiers
			if (passByReference) this.tiers = optionsOrStorageTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new StorageTier(optionsOrStorageTiers.tiers[tier])
		}
		// StorageTiersOptions
		else {
			// Make all Tier to StorageTiers
			for (const tier in this.tiers) {
				const t = optionsOrStorageTiers[tier]
				if (t instanceof StorageTier) this.tiers[tier] = passByReference ? t : new StorageTier(t)
				else this.tiers[tier] = new StorageTier(t)
			}
		}
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
	 * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(storageTiers: StorageTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].storage !== storageTiers.tiers[tier].storage) return false
		return true
	}

	/**
	 * Determine if this {@link StorageTiers `StorageTiers`} object is equal to another {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
	 * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are equal, `false` otherwise.
	 */
	override equals(storageTiers: StorageTiers): boolean {
		return super.equals(storageTiers)
			&& this.similarEquals(storageTiers)
	}

	/**
	 * Determine if this {@link StorageTiers `StorageTiers`} object is strictly equal to another {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
	 * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(storageTiers: StorageTiers): boolean {
		return super.strictlyEquals(storageTiers)
			&& this.similarEquals(storageTiers)
	}
}