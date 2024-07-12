/**
 * @author Space.yg
 */

import { BeltSpeeds, UndergroundBeltDistances } from "../../objects/buildings/transportations.js"

// TODO: Change
/** The robotic arm tiers for the Requirements class. */
export const RoboticArmTiers = [0, 1, 2, 3, 4] as const

/** Options for {@link Requirements `Requirements`}. */
export interface RequirementsOptions {
	/** The minimum belt speed of the build. */
	minBeltSpeed?: typeof BeltSpeeds[number]
	/** The maximum belt speed of the build. */
	maxBeltSpeed?: typeof BeltSpeeds[number]
	/** The minimum belt tunnel length of the build. */
	tunnelLength?: typeof UndergroundBeltDistances[number]
	/** The robotic arm tier of the build. */
	roboticArmTier?: typeof RoboticArmTiers[number]
}

/** Convert an array to a string in correct English grammatically form. */
function arrToString(arr: any[]) {
	if (arr.length === 1) return arr[0]
	if (arr.length === 2) return `${arr[0]} and ${arr[1]}`

	var s = ""
	arr.forEach((element, i) => s += element + (i === arr.length - 1 ? "" : i === arr.length - 2 ? ", and " : ", "))
	return s
}

/** Requirements of a build. */
export class Requirements {

	//// Object Properties
	/** The minimum belt speed of the build. */
	minBeltSpeed: NonNullable<RequirementsOptions["minBeltSpeed"]>
	/** The maximum belt speed of the build. */
	maxBeltSpeed: NonNullable<RequirementsOptions["maxBeltSpeed"]>
	/** The minimum belt tunnel length of the build. */
	tunnelLength: NonNullable<RequirementsOptions["tunnelLength"]>
	/** The robotic arm tier of the build. */
	roboticArmTier: NonNullable<RequirementsOptions["roboticArmTier"]>

	//// Constructors
	/**
	 * Constructs a {@link Requirements `Requirements`} object.
	 * @param options The requirements options.
	 */
	constructor(options?: RequirementsOptions)
	/**
	 * Constructs a {@link Requirements `Requirements`} object.
	 * @param requirements A {@link Requirements `Requirements`} object.
	 */
	constructor(requirements: Requirements)
	/**
	 * Constructs a {@link Requirements `Requirements`} object.
	 * @param requirements A {@link Requirements `Requirements`} object and requirements options.
	 */
	constructor(requirements: Requirements | RequirementsOptions)
	constructor(optionsOrRequirements: Requirements | RequirementsOptions = {}) {
		// Belt Speeds
		this.minBeltSpeed = optionsOrRequirements.minBeltSpeed ?? BeltSpeeds[0]
		this.maxBeltSpeed = optionsOrRequirements.maxBeltSpeed ?? BeltSpeeds.at(-1)!
		if (this.minBeltSpeed > this.maxBeltSpeed) throw new Error(`minBeltSpeed (${this.minBeltSpeed}) cannot be greater than maxBeltSpeed (${this.maxBeltSpeed})`)

		// tunnelLength
		if (typeof optionsOrRequirements.tunnelLength === "undefined") this.tunnelLength = UndergroundBeltDistances[0]
		else if (UndergroundBeltDistances.every(length => optionsOrRequirements.tunnelLength !== length)) throw new Error(`tunnelLength (${optionsOrRequirements.tunnelLength}) is not a valid length. Valid numbers include the following: ${arrToString([...UndergroundBeltDistances])}`)
		else this.tunnelLength = optionsOrRequirements.tunnelLength

		// roboticArmTier
		if (typeof optionsOrRequirements.roboticArmTier === "undefined") this.roboticArmTier = RoboticArmTiers[0]
		else if (RoboticArmTiers.every(length => optionsOrRequirements.roboticArmTier !== length)) throw new Error(`roboticArmTier (${optionsOrRequirements.roboticArmTier}) is not a valid tier. Valid numbers include the following: ${arrToString([...RoboticArmTiers])}`)
		else this.roboticArmTier = optionsOrRequirements.roboticArmTier
	}

	//// Object Methods
	/**
	 * Converts this {@link Requirements `Requirements`} object into string.
	 * @returns The string.
	 */
	toString(): string {
		return `{\n\tminBeltSpeed: ${this.minBeltSpeed}\n\tmaxBeltSpeed: ${this.maxBeltSpeed}\n\ttunnelLength: ${this.tunnelLength}\n\troboticArmTier: ${this.roboticArmTier}\n}`
	}

	/**
	 * Determine if this {@link Requirements `Requirements`} object is equal to another {@link Requirements `Requirements`} object.
	 * @param requirements The other {@link Requirements `Requirements`} object.
	 * @returns `true` if both {@link Requirements `Requirements`} objects are equal, `false` otherwise.
	 */
	equals(requirements: Requirements): boolean {
		return this.minBeltSpeed === requirements.minBeltSpeed
			&& this.maxBeltSpeed === requirements.maxBeltSpeed
			&& this.tunnelLength === requirements.tunnelLength
			&& this.roboticArmTier === requirements.roboticArmTier
	}
}