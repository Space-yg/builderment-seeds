/**
 * @author Space.yg
 */

// Classes
import { Requirements } from './Requirements.js'
import { Base } from '../Base.js'
import { Area } from '../Area.js'

// Types
import { type BaseOptions } from '../Base.js'
import { type AreaOptions } from '../Area.js'

/** Convert design categories to folder names. */
export const categoryToFolder = {
	"Balancer": "balancers",
	"Splitter": "splitters",
	"Workshop/Furnace": "workshops-or-furnaces",
	"Machine Shop/Forge": "machine-shops-or-forges",
	"Industrial Factory": "industrial-factories",
	"Manufacturer": "manufacturers",
	"Lab Balancer": "lab-balancers",
	"Overflow Valve": "valves",
} as const

/**
 * Options for {@link Design `Design`}.
 * @extends {{@link BaseOptions `BaseOptions`}
 */
export interface DesignOptions extends BaseOptions {
	/** The category of the design. */
	category: keyof typeof categoryToFolder
	/** The size of the design. */
	size: Area | AreaOptions
	/** Is the design symmetrical? */
	symmetrical: boolean
	/** The requirements of the design. */
	requirements: Requirements
	/** The blueprint ID of the design. */
	blueprintId: string
	/**
	 * A note about the design.
	 * @default undefined
	 */
	note?: string
}

/**
 * A Design is a set of buildings.
 * @extends {{@link Base `Base`}
 */
export class Design extends Base {

	//// Static properties
	/** The amount of design that have been made. */
	static #amount: number = 0
	/**
	 * The amount of design that have been made.
	 * @readonly
	 */
	static override get amount(): number { return Design.#amount }

	/**
	 * The designs that have been made.
	 * @readonly
	 */
	static readonly designs: { [/** The name of the design. */ name: string]: { [/** The category of the design. */ category: string]: Design[] } } = {}

	/**
	 * Get the base blueprint URL.
	 * @readonly
	 */
	static get baseBlueprintURL(): "https://builderment.com/blueprints" { return "https://builderment.com/blueprints" }

	//// Static Methods
	/**
	 * Get the blueprint URL of a blueprint.
	 * @param blueprintId The blueprint ID.
	 * @returns The URL of the blueprint.
	 */
	static blueprintURL(blueprintId: string): `https://builderment.com/blueprints?id=${string}` { return `${Design.baseBlueprintURL}?id=${blueprintId}` }

	//// Object Properties
	/** The category of the design. */
	category: DesignOptions["category"]
	/** The size of the design. */
	size: Area
	/** Is the design symmetrical? */
	symmetrical: DesignOptions["symmetrical"]
	/** The requirements of the design. */
	requirements: DesignOptions["requirements"]
	/** The blueprint code of the design. */
	blueprintId: DesignOptions["blueprintId"]
	/**
	 * A note about the design.
	 * @default undefined
	 */
	note?: DesignOptions["note"]

	//* Getters
	/**
	 * Get the blueprint URL.
	 * @readonly
	 */
	get blueprintURL() { return Design.blueprintURL(this.blueprintId) }  // Do not convert to property. It's better this way.

	//// Constructor
	/**
	 * Construct a {@link Design `Design`} object.
	 * @param options The design options.
	 * @param passByReference Whether to pass the objects in {@link options `options`} by reference or not. Default is `true`.
	 */
	constructor(options: DesignOptions, passByReference?: boolean)
	/**
	 * Construct a {@link Design `Design`} object.
	 * @param design A {@link Design `Design`} object.
	 * @param passByReference Whether to pass the objects in {@link design `design`} by reference or not. Default is `true`.
	 */
	constructor(design: Design, passByReference?: boolean)
	/**
	 * Construct a {@link Design `Design`} object.
	 * @param objectOrOptions A design object or design options.
	 * @param passByReference Whether to pass the objects in {@link design `design`} by reference or not. Default is `true`.
	 */
	constructor(objectOrOptions: Design | DesignOptions, passByReference?: boolean)
	constructor(objectOrOptions: Design | DesignOptions, passByReference: boolean = true) {
		super(objectOrOptions, passByReference)

		this.image = objectOrOptions.image ?? this.image + `designs/${categoryToFolder[objectOrOptions.category]}/${objectOrOptions.blueprintId}.jpeg`
		this.category = objectOrOptions.category
		this.size = passByReference && objectOrOptions.size instanceof Area ? objectOrOptions.size : new Area(objectOrOptions.size)
		this.symmetrical = objectOrOptions.symmetrical
		this.requirements = passByReference ? objectOrOptions.requirements : new Requirements(objectOrOptions.requirements)
		this.note = objectOrOptions.note
		if (objectOrOptions.blueprintId.length !== 6) throw new Error(`Blueprint of ${this.name} (${objectOrOptions.blueprintId}) must be 6 characters long`)
		this.blueprintId = objectOrOptions.blueprintId

		// Statics
		Design.#amount++
		if (typeof Design.designs[this.category] === "undefined") Design.designs[this.category] = {}
		if (typeof Design.designs[this.category][this.name] === "undefined") Design.designs[this.category][this.name] = []
		Design.designs[this.category][this.name].push(this)
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param design The other {@link Design `Design`} object.
	 * @returns `true` if both {@link Design `Design`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected similarlyEquals(design: Design): boolean {
		return this.category === design.category
			&& this.size.equals(design.size)
			&& this.symmetrical === design.symmetrical
			&& this.requirements.equals(design.requirements)
	}

	/**
	 * Determine if this {@link Design `Design`} object is equal to another {@link Design `Design`} object.
	 * @param design The other {@link Design `Design`} object.
	 * @returns `true` if both {@link Design `Design`} objects are equal, `false` otherwise.
	 */
	override equals(design: Design): boolean {
		return super.equals(design)
			&& this.similarlyEquals(design)
	}

	/**
	 * Determine if this {@link Design `Design`} object is strictly equal to another {@link Design `Design`} object.
	 * @param design The other {@link Design `Design`} object.
	 * @returns `true` if both {@link Design `Design`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(design: Design): boolean {
		return super.strictlyEquals(design)
			&& this.similarlyEquals(design)
			&& this.blueprintId === design.blueprintId
	}
}