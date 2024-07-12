/**
 * @author Space.yg
 */

import { Base, BaseOptions } from "../Base.js"

/**
 * Options for {@link Decoration `Decoration`}.
 * @extends {{@link BaseOptions `BaseOptions`}
 */
export interface DecorationOptions extends BaseOptions { }

/**
 * Create a new {@link Decoration `Decoration`}.
 * @extends {{@link Base `Base`}
 */
export class Decoration extends Base {

	//// Static Properties
	/** Total decorations that has been created. */
	static #amount: number = 0
	/**
	 * Total decorations that has been created.
	 * @readonly
	 */
	static override get amount(): number { return this.#amount }
	/** All the decorations that has been created. */
	/**
	 * All the decorations that has been created.
	 * @readonly
	*/
	static readonly decorations: { [/** The name of the decoration */ name: string]: Decoration[] } = {}
	/**
	 * The description of all decoration builds.
	 * @readonly
	 */
	static get description(): string { return "Purely decorative, make your factory one of a kind." }

	//// Constructor
	/**
	 * Constructs a new {@link Decoration `Decoration`} object.
	 * @param options The decoration options.
	 */
	constructor(options: DecorationOptions)
	/**
	 * Constructs a new {@link Decoration `Decoration`} object.
	 * @param decoration A {@link Decoration `Decoration`} object.
	 */
	constructor(decoration: Decoration)
	/**
	 * Constructs a new {@link Decoration `Decoration`} object.
	 * @param decoration A {@link Decoration `Decoration`} object or decoration options.
	 */
	constructor(decoration: Decoration | DecorationOptions)
	constructor(optionsOrDecoration: Decoration | DecorationOptions) {
		super(optionsOrDecoration)

		// Image
		this.image = optionsOrDecoration.image ?? this.image + `decorations/${this.name}`

		// Statics
		Decoration.#amount++
		if (typeof Decoration.decorations[optionsOrDecoration.name] === "undefined") Decoration.decorations[optionsOrDecoration.name] = [this]
		else Decoration.decorations[optionsOrDecoration.name].push(this)
	}
}