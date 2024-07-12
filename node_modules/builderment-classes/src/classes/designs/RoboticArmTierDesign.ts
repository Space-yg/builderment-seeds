/**
 * @author Space.yg
 */

// Classes
import { Design } from "./Design.js"

// Types
import { type DesignOptions } from "./Design.js"

/**
 * Options for {@link RoboticArmTierDesign}.
 * @extends {{@link DesignOptions `DesignOptions`}
 */
export interface RoboticArmTierDesignOptions extends Omit<DesignOptions, "name"> {
	/** The name of the robotic arm tier design. */
	name?: string
	/** The category of the robotic arm tier design. */
	category: "Lab Balancer" | "Overflow Valve"
}

/**
 * A robotic arm tier design is a design that may need robotic arms to function.
 * @extends {{@link Design `Design`}
 */
export class RoboticArmTierDesign extends Design {

	//// Static Properties
	//* Private
	/** The amount of robotic arm tier designs that has been made. */
	static #amount: number = 0

	//* Public
	/**
	 * The amount of robotic arm tier designs that has been made.
	 * @readonly
	 */
	static override get amount(): number { return RoboticArmTierDesign.#amount }

	/**
	 * All robotic arm tier designs that has been made.
	 * @readonly
	 */
	static readonly roboticArmTierDesigns: { [/** The category of the robotic arm tier design. */ category: string]: { [/** The Robotic Arm tier of the robotic arm tier design. */ roboticArmTier: number]: RoboticArmTierDesign[] } } = {}

	//// Constructors
	/**
	 * Construct a {@link RoboticArmTierDesign `RoboticArmTierDesign`} object.
	 * @param options The robotic arm tier design options.
	 * @param passByReference Whether to pass the objects in {@link options `options`} by reference or not. Default is `true`.
	 */
	constructor(options: RoboticArmTierDesignOptions, passByReference?: boolean)
	/**
	 * Construct a {@link RoboticArmTierDesign `RoboticArmTierDesign`} object.
	 * @param roboticArmTierDesign A {@link RoboticArmTierDesign `RoboticArmTierDesign`} object.
	 * @param passByReference Whether to pass the objects in {@link roboticArmTierDesign `roboticArmTierDesign`} by reference or not. Default is `true`.
	 */
	constructor(roboticArmTierDesign: RoboticArmTierDesign, passByReference?: boolean)
	/**
	 * Construct a {@link RoboticArmTierDesign `RoboticArmTierDesign`} object.
	 * @param roboticArmTierDesign A {@link RoboticArmTierDesign `RoboticArmTierDesign`} object or robotic arm tier design options.
	 * @param passByReference Whether to pass the objects in {@link roboticArmTierDesign `roboticArmTierDesign`} by reference or not. Default is `true`.
	 */
	constructor(roboticArmTierDesign: RoboticArmTierDesign | RoboticArmTierDesignOptions, passByReference?: boolean)
	constructor(objectOrOptions: RoboticArmTierDesign | RoboticArmTierDesignOptions, passByReference: boolean = true) {
		if (objectOrOptions instanceof RoboticArmTierDesign) super(objectOrOptions, passByReference)
		else super({
			...objectOrOptions,
			name: typeof objectOrOptions.name === "undefined" ? `${objectOrOptions.size.width}x${objectOrOptions.size.height}` : objectOrOptions.name,
		})

		// Statics
		RoboticArmTierDesign.#amount++
		if (typeof RoboticArmTierDesign.roboticArmTierDesigns[this.category] === "undefined") RoboticArmTierDesign.roboticArmTierDesigns[this.category] = {}
		if (typeof RoboticArmTierDesign.roboticArmTierDesigns[this.category][this.requirements.roboticArmTier] === "undefined") RoboticArmTierDesign.roboticArmTierDesigns[this.category][this.requirements.roboticArmTier] = []
		RoboticArmTierDesign.roboticArmTierDesigns[this.category][this.requirements.roboticArmTier].push(this)
	}
}