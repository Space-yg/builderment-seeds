/**
 * @author Space.yg
 */

// CLasses
import { Design } from "./Design.js"

// Types
import { type DesignOptions } from "./Design.js"

/**
 * Options for {@link NToM `NToM`}.
 * @extends {{@link DesignOptions `DesignOptions`}
 */
export interface NToMOptions extends Omit<DesignOptions, "name"> {
	/**
	 * The name of the N:M.
	 * @default `${n}:${m}`
	 */
	name?: string
	/** The name of the category of the N:M. */
	category: "Balancer" | "Splitter" | "Workshop/Furnace" | "Machine Shop/Forge" | "Industrial Factory" | "Manufacturer"
	/** The amount of inputs of the N:M. */
	n: number
	/** The amount of outputs of the N:M. */
	m: number
}

/**
 * An N:M is a design that does something. N is the number of inputs. M is the number of outputs.
 * @extends {{@link Design `Design`}
 */
export class NToM extends Design {

	//// Static properties
	//* Private
	/** The amount of N:M designs that has been made. */
	static #amount: number = 0

	//* Public
	/**
	 * The amount of N:M designs that has been made.
	 * @readonly
	 */
	static override get amount(): number { return NToM.#amount }

	/**
	 * All N:M designs that has been made.
	 * @readonly
	 */
	static readonly nToM: { [/** The name of the category of the N:M. */ category: string]: { [/** The amount of inputs of the N:M. */ n: number]: { [/** The amount of outputs of the N:M. */ m: number]: NToM[] } } } = {}

	//// Object Properties
	/** The amount of inputs of the N:M. */
	n: NToMOptions["n"]
	/** The amount of outputs of the N:M. */
	m: NToMOptions["m"]

	//// Constructors
	/**
	 * Construct an {@link NToM `NToM`} object.
	 * @param options The N:M options.
	 * @param passByReference Whether to pass the objects in {@link options `options`} by reference or not. Default is `true`.
	 */
	constructor(options: NToMOptions, passByReference?: boolean)
	/**
	 * Construct an {@link NToM `NToM`} object.
	 * @param nToM An {@link NToM `NToM`} object.
	 * @param passByReference Whether to pass the objects in {@link nToM `nToM`} by reference or not. Default is `true`.
	 */
	constructor(nToM: NToM, passByReference?: boolean)
	/**
	 * Construct an {@link NToM `NToM`} object.
	 * @param nToM An {@link NToM `NToM`} object or N:M options.
	 * @param passByReference Whether to pass the objects in {@link nToM `nToM`} by reference or not. Default is `true`.
	 */
	constructor(nToM: NToM | NToMOptions, passByReference?: boolean)
	constructor(objectOrOptions: NToM | NToMOptions, passByReference: boolean = true) {
		if (objectOrOptions instanceof NToM) super(objectOrOptions, passByReference)
		else super({
			...objectOrOptions,
			name: typeof objectOrOptions.name === "undefined" ? `${objectOrOptions.n}:${objectOrOptions.m}` : objectOrOptions.name,
		}, passByReference)

		this.n = objectOrOptions.n
		this.m = objectOrOptions.m

		// Add amount of N:M designs
		NToM.#amount++

		// Add N:M
		if (typeof NToM.nToM[this.category] === "undefined") NToM.nToM[this.category] = {}
		if (typeof NToM.nToM[this.category][this.n] === "undefined") NToM.nToM[this.category][this.n] = {}
		if (typeof NToM.nToM[this.category][this.n][this.m] === "undefined") NToM.nToM[this.category][this.n][this.m] = []
		NToM.nToM[this.category][this.n][this.m].push(this)
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param nToM The other {@link NToM `NToM`} object.
	 * @returns `true` if both {@link NToM `NToM`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarlyEquals(nToM: NToM): boolean {
		return this.n === nToM.n
			&& this.m === nToM.m
	}

	/**
	 * Determine if this {@link NToM `NToM`} object is equal to another {@link NToM `NToM`} object.
	 * @param nToM The other {@link NToM `NToM`} object.
	 * @returns `true` if both {@link NToM `NToM`} objects are equal, `false` otherwise.
	 */
	override equals(nToM: NToM): boolean {
		return super.equals(nToM)
			&& this.similarlyEquals(nToM)
	}

	/**
	 * Determine if this {@link NToM `NToM`} object is strictly equal to another {@link NToM `NToM`} object.
	 * @param nToM The other {@link NToM `NToM`} object.
	 * @returns `true` if both {@link NToM `NToM`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(nToM: NToM): boolean {
		return super.strictlyEquals(nToM)
			&& this.similarlyEquals(nToM)
	}
}