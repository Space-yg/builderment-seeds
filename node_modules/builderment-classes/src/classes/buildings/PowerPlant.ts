/**
 * @author Space.yg
 */

// Classes
import { Area } from "../Area.js"
import { Base } from "../Base.js"

// Types
import { type AreaOptions } from "../Area.js"
import { type BaseOptions } from "../Base.js"
import { type InputPerMinOptions } from "../Input.js"

/**
 * Options for {@link PowerPlant `PowerPlant`}.
 * @extends {{@link BaseOptions `BaseOptions`}
 */
export interface PowerPlantOptions extends BaseOptions {
	/** The input needed to activate the power plant. */
	input?: InputPerMinOptions
	/** The boost speed that the power plant gives. */
	speed: number
	/** The amount of seconds the power plant is active before needing to recharge. */
	duration: number
	/** The region of the power plant boost. */
	region: AreaOptions | Area
}

// TODO: Try to resolve the input in power plant
/**
 * Create a power plant.
 * @extends {{@link Base `Base`}
 */
export class PowerPlant extends Base {

	//// Static Properties
	/** Total power plants that has been created. */
	static #amount: number = 0
	/**
	 * Total power plants that has been created.
	 * @readonly
	 */
	static override get amount(): number { return this.#amount }

	/** 
	 * All the power plants that has been created.
	 * @readonly
	 */
	static readonly powerPlants: { [/** The name of the power plant. */ name: string]: PowerPlant } = {}

	/**
	 * The description of all power plants.
	 * @readonly
	 */
	static get description(): string { return "Increases the speed of nearby factories while consuming the input items. Effect does not stack with other power plants." }

	//// Object Properties
	/** The input needed to activate the power plant. */
	input: PowerPlantOptions["input"]
	/** The boost speed that the power plant gives. */
	speed: PowerPlantOptions["speed"]
	/** The amount of seconds the power plant is active before needing to recharge. */
	duration: PowerPlantOptions["duration"]
	/** The region of the power plant boost. */
	region: Area

	//// Constructors
	/**
	 * Constructs a new {@link PowerPlant `PowerPlant`} object.
	 * @param options The power plant options.
	 * @param passByReference Whether to pass the objects in {@link options `options`} by reference or not. Default is `true`.
	 */
	constructor(options: PowerPlantOptions, passByReference?: boolean)
	/**s
	 * Constructs a new {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant A {@link PowerPlant `PowerPlant`} object.
	 * @param passByReference Whether to pass the objects in {@link powerPlant `powerPlant`} by reference or not. Default is `true`.
	 */
	constructor(powerPlant: PowerPlant, passByReference?: boolean)
	/**
	 * Constructs a new {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant A {@link PowerPlant `PowerPlant`} object or power plant options.
	 * @param passByReference Whether to pass the objects in {@link powerPlant `powerPlant`} by reference or not. Default is `true`.
	 */
	constructor(powerPlant: PowerPlant | PowerPlantOptions, passByReference?: boolean)
	constructor(optionsOrPowerPlant: PowerPlant | PowerPlantOptions, passByReference: boolean = true) {
		super(optionsOrPowerPlant, passByReference)

		this.image = optionsOrPowerPlant.image ?? this.image + `power-plants/${this.name}.png`
		this.input = optionsOrPowerPlant.input
		this.speed = optionsOrPowerPlant.speed
		this.duration = optionsOrPowerPlant.duration
		this.region = passByReference && optionsOrPowerPlant.region instanceof Area ? optionsOrPowerPlant.region : new Area(optionsOrPowerPlant.region)

		// Static
		PowerPlant.#amount++
		PowerPlant.powerPlants[optionsOrPowerPlant.name] = this
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
	 * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected similarEquals(powerPlant: PowerPlant): boolean {
		if (typeof this.input === "undefined") { if (typeof powerPlant.input !== "undefined") return false }
		else if (typeof powerPlant.input === "undefined") return false
		return this.input!.amount === powerPlant.input!.amount
			&& this.input!.inputPerMin === powerPlant.input!.inputPerMin
			&& this.speed === powerPlant.speed
			&& this.duration === powerPlant.duration
			&& this.region.width === powerPlant.region.width
			&& this.region.height === powerPlant.region.height
	}

	/**
	 * Determine if this {@link PowerPlant `PowerPlant`} object is equal to another {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
	 * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are equal, `false` otherwise.
	 */
	override equals(powerPlant: PowerPlant): boolean {
		return super.equals(powerPlant)
			&& this.similarEquals(powerPlant)
			&& this.input!.item.equals(powerPlant.input!.item)
	}

	/**
	 * Determine if this {@link PowerPlant `PowerPlant`} object is strictly equal to another {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
	 * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(powerPlant: PowerPlant): boolean {
		return super.strictlyEquals(powerPlant)
			&& this.similarEquals(powerPlant)
			&& this.input!.item.strictlyEquals(powerPlant.input!.item)
	}
}