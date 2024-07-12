/**
 * @author Space.yg
 */

/** Options for area. */
export interface AreaOptions {
	/** The width. */
	width: number
	/** The height. */
	height: number
}

/** Create a new area. */
export class Area {

	//// Object Properties
	/** The width. */
	width: number
	/** The height. */
	height: number

	//* Getters
	/**
	 * Area.
	 * @readonly
	 */
	get area() { return this.width * this.height }

	//// Constructors
	/**
	 * Constructs a new {@link Area `Area`} object.
	 * @param options The area options.
	 */
	constructor(options: AreaOptions)
	/**
	 * Constructs a new {@link Area `Area`} object.
	 * @param area An {@link Area `Area`} object.
	 */
	constructor(area: Area)
	/**
	 * Constructs a new {@link Area `Area`} object.
	 * @param area An {@link Area `Area`} object or area options.
	 */
	constructor(area: Area | AreaOptions)
	constructor(optionsOrArea: Area | AreaOptions) {
		this.width = optionsOrArea.width
		this.height = optionsOrArea.height
	}

	//// Object Methods
	/**
	 * Determine if this {@link Area `Area`} object is equal to another {@link Area `Area`} object.
	 * @param area The other {@link Area `Area`} object.
	 * @returns `true` if both {@link Area `Area`} objects are equal, `false` otherwise.
	 */
	equals(area: Area): boolean {
		if (this === area) return true

		return this.width === area.width
			&& this.height === area.height
	}
}