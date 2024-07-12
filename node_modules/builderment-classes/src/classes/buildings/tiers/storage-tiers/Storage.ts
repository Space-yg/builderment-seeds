/**
 * @author Space.yg
 */

// Classes
import { Price } from "../../../Price.js"
import { StorageTiers } from "./StorageTiers.js"

// Types
import { type StorageTiersOptions } from "./StorageTiers.js"

/** Options for {@link Storage `Storage`}. */
export interface StorageOptions {
	/** The name of the storage. */
	name: string
	/** The description of the storage. */
	description: string
	/** The tiers of the storage. */
	tiers: StorageTiersOptions | StorageTiers
}

/**
 * Create a new storage.
 * @extends {{@link StorageTiers `StorageTiers`}
 */
export class Storage extends StorageTiers {

	//// Object Properties
	/** The name of the storage. */
	name: StorageOptions["name"]
	/**
	 * The price of the storage.
	 * @default
	 * ```javascript
	 * new Price({
	 * 	gold: 0,
	 * 	gems: 0
	 * })
	 * ```
	 */
	price: Price
	/** The description of the storage. */
	description: StorageOptions["description"]

	//// Constructors
	/**
	 * Construct a {@link Storage `Storage`} object.
	 * @param options The tier options.
	 */
	constructor(options: StorageOptions, passByReference?: boolean)
	/**
	 * Construct a {@link Storage `Storage`} object.
	 * @param storage A {@link Storage `Storage`} object.
	 */
	constructor(storage: Storage, passByReference?: boolean)
	/**
	 * Construct a {@link Storage `Storage`} object.
	 * @param storage A {@link Storage `Storage`} object or tier options.
	 */
	constructor(storage: Storage | StorageOptions, passByReference?: boolean)
	constructor(optionsOrStorage: Storage | StorageOptions, passByReference: boolean = true) {
		super(optionsOrStorage.tiers, passByReference)

		this.name = optionsOrStorage.name
		this.price = this.tiers[this.minTierNum].price
		this.description = optionsOrStorage.description

		// Image
		if (optionsOrStorage instanceof Storage) for (const tier in this.tiers) this.tiers[tier].image = optionsOrStorage.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`
		else {
			if (optionsOrStorage.tiers instanceof StorageTiers) for (const tier in this.tiers) this.tiers[tier].image = optionsOrStorage.tiers.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = optionsOrStorage.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`
		}
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param storage The other {@link Storage `Storage`} object.
	 * @returns `true` if both {@link Storage `Storage`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(storage: Storage): boolean {
		return this.name === storage.name
			&& this.price.equals(storage.price)
			&& this.description === storage.description
	}

	/**
	 * Determine if this {@link Storage `Storage`} object is equal to another {@link Storage `Storage`} object.
	 * @param storage The other {@link Storage `Storage`} object.
	 * @returns `true` if both storages are the equal, `false` otherwise.
	 */
	override equals(storage: Storage): boolean {
		return super.equals(storage)
			&& this.similarEquals(storage)
	}

	/**
	 * Determine if this {@link Storage `Storage`} object is strictly equal to {@link Storage `Storage`} object.
	 * @param storage The other {@link Storage `Storage`} object.
	 * @returns `true` if both storages are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(storage: Storage): boolean {
		return super.strictlyEquals(storage)
			&& this.similarEquals(storage)
	}
}