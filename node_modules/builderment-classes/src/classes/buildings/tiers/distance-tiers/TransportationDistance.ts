/**
 * @author Space.yg
 */

// Classes
import { DistanceTiers } from "./DistanceTiers.js"

// Types
import { type Price } from "../../../Price.js"
import { type DistanceTiersOptions } from "./DistanceTiers.js"

/** Options for {@link TransportationDistance `TransportationDistance`}. */
export interface TransportationDistanceOptions {
	/** The name of the transportation distance. */
	name: string
	/** The description of the transportation distance. This is the in-game description. */
	description: string
	/** The tiers of the transportation distance. */
	tiers: DistanceTiersOptions | DistanceTiers
}

/**
 * Make a new transportation distance.
 * @extends {{@link DistanceTiers `DistanceTiers`}
 */
export class TransportationDistance extends DistanceTiers {

	//// Static properties
	/** Total transportation distances that has been created. */
	static #amount = 0
	/**
	 * Total transportation distances that has been created.
	 * @readonly
	 */
	static get amount() { return this.#amount }
	/**
	 * All the transportation distances that has been created.
	 * @readonly
	 */
	static readonly transportationDistances: { [/** The name of the transportation distance. */ name: string]: TransportationDistance } = {}

	//// Properties
	/** The name of the transportation distance. */
	name: TransportationDistanceOptions["name"]
	/** The price of the first tier of the transportation distance. */
	price: Price
	/** The description of the transportation distance. */
	description: TransportationDistanceOptions["description"]

	//// Constructors
	/**
	 * Constructs a new {@link TransportationDistance `TransportationDistance`} object.
	 * @param options The transportation distance options.
	 * @param passByReference Whether to pass the objects in the {@link TransportationDistance `TransportationDistance`} by reference or not. Default is `true`.
	 */
	constructor(options: TransportationDistanceOptions, passByReference?: boolean)
	/**
	 * Constructs a new {@link TransportationDistance `TransportationDistance`} object.
	 * @param transportationDistance A {@link TransportationDistance `TransportationDistance`} object.
	 * @param passByReference Whether to pass the objects in the {@link TransportationDistance `TransportationDistance`} by reference or not. Default is `true`.
	 */
	constructor(transportationDistance: TransportationDistance, passByReference?: boolean)
	/**
	 * Constructs a new {@link TransportationDistance `TransportationDistance`} object.
	 * @param transportationDistance A {@link TransportationDistance `TransportationDistance`} object or transportation distance options.
	 * @param passByReference Whether to pass the objects in the {@link TransportationDistance `TransportationDistance`} by reference or not. Default is `true`.
	 */
	constructor(transportationDistance: TransportationDistance | TransportationDistanceOptions, passByReference?: boolean)
	constructor(optionsOrTransportationDistance: TransportationDistance | TransportationDistanceOptions, passByReference: boolean = true) {
		super(optionsOrTransportationDistance.tiers, passByReference)

		this.name = optionsOrTransportationDistance.name
		this.price = this.tiers[this.minTierNum].price
		this.description = optionsOrTransportationDistance.description

		// Image
		if (optionsOrTransportationDistance instanceof TransportationDistance) for (const tier in this.tiers) this.tiers[tier].image = optionsOrTransportationDistance.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name}.png`
		else {
			if (optionsOrTransportationDistance.tiers instanceof DistanceTiers) for (const tier in this.tiers) this.tiers[tier].image = optionsOrTransportationDistance.tiers.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = optionsOrTransportationDistance.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name}.png`
		}

		// Statics
		TransportationDistance.#amount++
		TransportationDistance.transportationDistances[optionsOrTransportationDistance.name] = this
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param transportationDistance The other {@link TransportationDistance `TransportationDistance`} object.
	 * @returns `true` if both {@link TransportationDistance `TransportationDistance`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(transportationDistance: TransportationDistance): boolean {
		return this.name === transportationDistance.name
			&& this.price.equals(transportationDistance.price)
			&& this.description === transportationDistance.description
	}

	/**
	 * Determine if this {@link TransportationDistance `TransportationDistance`} object is equal to another {@link TransportationDistance `TransportationDistance`} object.
	 * @param transportationDistance The other {@link TransportationDistance `TransportationDistance`} object.
	 * @returns `true` if both storages are the equal, `false` otherwise.
	 */
	override equals(transportationDistance: TransportationDistance): boolean {
		return super.equals(transportationDistance)
			&& this.similarEquals(transportationDistance)
	}

	/**
	 * Determine if this {@link TransportationDistance `TransportationDistance`} object is strictly equal to another {@link TransportationDistance `TransportationDistance`} object.
	 * @param transportationDistance The other {@link TransportationDistance `TransportationDistance`} object.
	 * @returns `true` if both storages are the strictly equal, `false` otherwise.
	 */
	override strictlyEquals(transportationDistance: TransportationDistance): boolean {
		return super.strictlyEquals(transportationDistance)
			&& this.similarEquals(transportationDistance)
	}
}