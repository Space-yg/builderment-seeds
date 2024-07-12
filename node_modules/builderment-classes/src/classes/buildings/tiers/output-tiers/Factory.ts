/**
 * @author Space.yg
 */

// Classes
import { OutputTiers } from "./OutputTiers.js"

// Types
import { type Price } from "../../../Price.js"
import { type OutputTiersOptions } from "./OutputTiers.js"

/** Options for {@link Factory `Factory`}. */
export interface FactoryOptions {
	/** The name of the factory. */
	name: string
	/** The amount of inputs of the factory. */
	inputs: number
	/** The description of the factory. */
	description: string
	/** The tiers of the factory. */
	tiers: OutputTiers | OutputTiersOptions
}

/**
 * Create a new factory.
 * @extends {{@link OutputTiers `OutputTiers`}
 */
export class Factory extends OutputTiers {

	//// Static properties
	//* Private
	/** Total factories that has been created. */
	static #amount: number = 0

	//* Public
	/**
	 * Total factories that has been created.
	 * @readonly
	 */
	static get amount(): number { return this.#amount }

	/** 
	 * All the factories that has been created.
	 * @readonly
	 */
	static readonly factories: { [/** The name of the factory */ name: string]: Factory } = {}

	//// Object Properties
	/** The name of the factory. */
	name: FactoryOptions["name"]
	/** The price of the first tier of the factory. */
	price: Price
	/** The amount of inputs of the factory. */
	inputs: FactoryOptions["inputs"]
	/** The description of the factory. */
	description: FactoryOptions["description"]

	//// Constructor
	/**
	 * Constructs a new {@link Factory `Factory`} object.
	 * @param options The factory options.
	 * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
	 */
	constructor(options: FactoryOptions, passByReference?: boolean)
	/**
	 * Constructs a new {@link Factory `Factory`} object.
	 * @param factory A {@link Factory `Factory`} object.
	 * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
	 */
	constructor(factory: Factory, passByReference?: boolean)
	/**
	 * Constructs a new {@link Factory `Factory`} object.
	 * @param factory A {@link Factory `Factory`} object or factory options.
	 * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
	 */
	constructor(factory: Factory | FactoryOptions, passByReference?: boolean)
	constructor(optionsOrFactory: Factory | FactoryOptions, passByReference: boolean = true) {
		super(optionsOrFactory.tiers, passByReference)

		this.name = optionsOrFactory.name
		this.price = this.tiers[this.minTierNum].price
		this.inputs = optionsOrFactory.inputs
		this.description = optionsOrFactory.description

		// Image
		if (optionsOrFactory instanceof Factory) for (const tier in this.tiers) this.tiers[tier].image = optionsOrFactory.tiers[tier].image ?? this.tiers[tier].image + `${this.name} Tier ${tier}.png`
		else {
			if (optionsOrFactory.tiers instanceof OutputTiers) for (const tier in this.tiers) this.tiers[tier].image = optionsOrFactory.tiers.tiers[tier].image ?? this.tiers[tier].image + `${this.name} Tier ${tier}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = optionsOrFactory.tiers[tier].image ?? this.tiers[tier].image + `factories/${this.name} Tier ${tier}.png`
		}

		// Statics
		Factory.#amount++
		Factory.factories[optionsOrFactory.name] = this
	}

	//// Object Methods
	/**
	 * These are similarities between the equals and strictlyEquals methods
	 * @param factory The other factory
	 * @returns true if both factories are the equal in the things that are similar between the equals and strictlyEquals methods, false otherwise
	 */
	protected override similarEquals(factory: Factory): boolean {
		return this.name === factory.name
			&& this.description === factory.description
			&& this.inputs === factory.inputs
	}

	/**
	 * Determine if this factory and another factory are the equal
	 * @param factory The other factory
	 * @returns true if both factories are the equal, false otherwise
	 */
	override equals(factory: Factory): boolean {
		return super.equals(factory)
			&& this.similarEquals(factory)
	}

	/**
	 * Determine if this factory and another factory are the strictly equal
	 * @param factory The other factory
	 * @returns true if both factories are the strictly equal, false otherwise
	 */
	override strictlyEquals(factory: Factory): boolean {
		return super.strictlyEquals(factory)
			&& this.similarEquals(factory)
	}
}