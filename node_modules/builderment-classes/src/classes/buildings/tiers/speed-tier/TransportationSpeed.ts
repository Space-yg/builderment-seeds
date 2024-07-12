/**
 * @author Space.yg
 */

// Classes
import { Price } from "../../../Price.js"
import { SpeedTiers } from "./SpeedTiers.js"

// Types
import { type SpeedTiersOptions } from "./SpeedTiers.js"

/** Options for {@link TransportationSpeed `TransportationSpeed`}. */
export interface TransportationSpeedOptions {
	/** The name of the transportation speed. */
	name: string
	/** The description of the transportation speed. */
	description: string
	/** The tiers of the transportation speed. */
	tiers: SpeedTiersOptions | SpeedTiers
}

/**
 * Create a new transportation speed.
 * @extends {{@link SpeedTiers `SpeedTiers`}
 */
export class TransportationSpeed extends SpeedTiers {

	//// Static properties
	/** Total transportations that has been created. */
	static #amount = 0
	/**
	 * Total transportations that has been created.
	 * @readonly
	 */
	static get amount() { return this.#amount }
	/**
	 * All the transportations that has been created.
	 * @readonly
	 */
	static readonly transportationSpeeds: { [/** The name of the transportation. */ name: string]: TransportationSpeed } = {}

	//// Properties
	/** The name of the transportation. */
	name: TransportationSpeedOptions["name"]
	/** The price of the first tier of the transportation. */
	price: Price
	/** The description of the transportation. */
	description: TransportationSpeedOptions["description"]

	//// Constructors
	/**
	 * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param options The transportation options
	 * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
	 */
	constructor(options: TransportationSpeedOptions, passByReference?: boolean)
	/**
	 * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportation A {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
	 */
	constructor(transportation: TransportationSpeed, passByReference?: boolean)
	/**
	 * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportation A {@link TransportationSpeed `TransportationSpeed`} object or transportation options.
	 * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
	 */
	constructor(transportation: TransportationSpeed | TransportationSpeedOptions, passByReference?: boolean)
	constructor(optionsOrTransportation: TransportationSpeed | TransportationSpeedOptions, passByReference: boolean = true) {
		super(optionsOrTransportation.tiers, passByReference)

		this.name = optionsOrTransportation.name
		this.price = this.tiers[this.minTierNum].price
		this.description = optionsOrTransportation.description

		// Image
		if (optionsOrTransportation instanceof TransportationSpeed) for (const tier in this.tiers) this.tiers[tier].image = optionsOrTransportation.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`
		else {
			if (optionsOrTransportation.tiers instanceof SpeedTiers) for (const tier in this.tiers) this.tiers[tier].image = optionsOrTransportation.tiers.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = optionsOrTransportation.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`
		}

		// Statics
		TransportationSpeed.#amount++
		TransportationSpeed.transportationSpeeds[optionsOrTransportation.name] = this
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param transportationSpeed The other {@link TransportationSpeed `TransportationSpeed`} object.
	 * @returns `true` if both {@link TransportationSpeed `TransportationSpeed`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(transportationSpeed: TransportationSpeed): boolean {
		return this.name === transportationSpeed.name
			&& this.price.equals(transportationSpeed.price)
			&& this.description === transportationSpeed.description
	}

	/**
	 * Determine if this {@link TransportationSpeed `TransportationSpeed`} object is equal to another {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportationSpeed The other {@link TransportationSpeed `TransportationSpeed`} object.
	 * @returns `true` if both storages are the equal, `false` otherwise.
	 */
	override equals(transportationSpeed: TransportationSpeed): boolean {
		return super.equals(transportationSpeed)
			&& this.similarEquals(transportationSpeed)
	}

	/**
	 * Determine if this {@link TransportationSpeed `TransportationSpeed`} object is strictly equal to another {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportationSpeed speed The other {@link TransportationSpeed `TransportationSpeed`} object.
	 * @returns `true` if both storages are the strictly equal, `false` otherwise.
	 */
	override strictlyEquals(transportationSpeed: TransportationSpeed): boolean {
		return super.strictlyEquals(transportationSpeed)
			&& this.similarEquals(transportationSpeed)
	}
}