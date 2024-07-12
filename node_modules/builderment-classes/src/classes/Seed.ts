/**
 * @author Space.yg
 */

// Classes
import { InputOptions } from "./Input.js"
import { Item } from "./Item.js"

// Objects
import { extractor, extractorOutputPerMin, uraniumExtractor, uraniumExtractorOutputPerMin } from "../objects/buildings/factories.js"

// Other
import { objToString } from "../helpers.js"

/** The resources type for all resources in a seed */
export interface ResourcesOptions {
	/** The amount of Wood Log deposits in the seed */
	"Wood Log": number
	/** The amount of Stone deposits in the seed */
	Stone: number
	/** The amount of Iron Ore deposits in the seed */
	"Iron Ore": number
	/** The amount of Copper Ore deposits in the seed */
	"Copper Ore": number
	/** The amount of Coal deposits in the seed */
	Coal: number
	/** The amount of Wolframite deposits in the seed */
	Wolframite: number
	/** The amount of Uranium Ore deposits in the seed */
	"Uranium Ore": number
}

/** The Advanced World number options for World Size and Resource Amount when creating a new seed */
export type advancedWorldChoices = 50 | 75 | 100 | 150 | 200

/** The options of the item type */
export interface SeedOptions {
	/** The resources in a seed */
	resources: ResourcesOptions
	/**
	 * The World Size of the seed
	 * @default 100
	 */
	worldSize?: advancedWorldChoices
	/**
	 * The Resource Amount of the seed
	 * @default 100
	 */
	resourceAmount?: advancedWorldChoices
	/** The seed */
	seed?: string
}

type BitsRange = [from: number, to: number]

/**
 * Converts an array of numbers as a hex value to decimal. Unsigned int
 * @param array The array
 * @returns The result of the array of hex numbers
 */
function hexByteValue(array: number[]): number {
	var hex = ""
	array.forEach(num => {
		var h = num.toString(16)
		hex += (h.length !== 2 ? "0" : "") + h
	})
	return parseInt(hex, 16)
}

/** Make a new seed. */
export class Seed {

	//// Static Properties
	//* Private
	/** Total seeds that has been created with a seed. */
	static #amount = 0

	//* Public
	/**
	 * Total seeds that has been created with a seed.
	 * @readonly
	 */
	static get amount() { return this.#amount }

	/**
	 * All the seeds that has been created with a seed.
	 * @readonly
	 */
	static readonly seeds: { [/** The seed */ seed: string]: Seed } = {}

	//// Static Methods
	// TODO: This can be remade to make it more efficient
	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The {@link Item `Item`} object to calculate the limited resource based on the base resource of that item
	 * @param resources The resources of the seed to calculate the limited resources
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	static getLimitedDeposits(item: Item, resources: ResourcesOptions): InputOptions[]
	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The item name to calculate the limited resource based on the base resource of that item
	 * @param resources The resources of the seed to calculate the limited resources
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	static getLimitedDeposits(item: string, resources: ResourcesOptions): InputOptions[]
	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The {@link Item `Item`} object or name to calculate the limited resource based on the base resource of that item
	 * @param resources The resources of the seed to calculate the limited resources
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	static getLimitedDeposits(item: Item | string, resources: ResourcesOptions): InputOptions[]
	static getLimitedDeposits(item: Item | string, resources: ResourcesOptions): InputOptions[] {
		// Get the base resources of the item
		var baseResources = Item.getAmountOfBaseResources(item)

		// Calculate the ratios
		const limitedAmounts: { [name: string]: number } = {}
		for (const key in baseResources) {
			const k = key as keyof ResourcesOptions
			if (!resources[k]) throw new Error(`Resource (${k}) cannot be 0, null, or undefined`)

			// Calculate the ratios
			limitedAmounts[k] = resources[k] / baseResources[k]!
		}

		// Arrange them
		const amounts: InputOptions[] = []
		for (let i = Object.keys(limitedAmounts).length; i > 0; i--) {
			const min = Math.min(...Object.values(limitedAmounts))
			const name = Object.keys(limitedAmounts).find(key => limitedAmounts[key] === min)!
			delete limitedAmounts[name]
			amounts.push({
				item: Item.items[name],
				amount: min,
			})
		}

		// Calculate the amount needed to NOT be the limited resource
		for (let i = 0; i < amounts.length - 1; i++) {
			amounts[i].amount = amounts[i + 1].amount * baseResources[amounts[i].item.name as keyof ResourcesOptions]! - resources[amounts[i].item.name as keyof ResourcesOptions]
		}
		amounts[amounts.length - 1].amount = 0

		return amounts
	}

	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The {@link Item `Item`} object to get the resources that limits making more of this item
	 * @param resources The resources in the seed
	 * @returns The limited resource
	 */
	static getLimitedDeposit(item: Item, resources: ResourcesOptions): InputOptions
	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The item name to get the resources that limits making more of this item
	 * @param resources The resources in the seed
	 * @returns The limited resource
	 */
	static getLimitedDeposit(item: string, resources: ResourcesOptions): InputOptions
	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The {@link Item `Item`} object or name to get the resources that limits making more of this item
	 * @param resources The resources in the seed
	 * @returns The limited resource
	 */
	static getLimitedDeposit(item: Item | string, resources: ResourcesOptions): InputOptions
	static getLimitedDeposit(item: Item | string, resources: ResourcesOptions): InputOptions { return Seed.getLimitedDeposits(item, resources)[0] }

	// TODO: Add support for constructing Seed object from .sav file
	/**
	 * **This function is incomplete. Do not use.**
	 * 
	 * Construct a {@link Seed} object from a world save file
	 * @param path The path to the world save file
	 * @returns A {@link Seed} object
	 */
	static async constructFromFile(path: string): Promise<Seed> {
		//// Get data from file
		const data: Uint8Array = new Uint8Array(await (await fetch(path)).arrayBuffer())
		console.log(data)

		//// Get resource data part
		/**
		 * The location of the number of the start of the deposits information
		 * @readonly
		 */
		const depositsInfoLocationByte: BitsRange = [22, 26]
		/** The location of the deposits information */
		const depositsInfoLocation: BitsRange = [0, 0]
		const seedOptions: SeedOptions = {
			resources: {
				"Copper Ore": 0,
				"Iron Ore": 0,
				"Uranium Ore": 0,
				"Wood Log": 0,
				Coal: 0,
				Stone: 0,
				Wolframite: 0,
			},
		}

		console.log(data.slice(...depositsInfoLocationByte))
		depositsInfoLocation[0] = hexByteValue([...data.slice(...depositsInfoLocationByte)]) + 1
		depositsInfoLocation[1] = depositsInfoLocation[0] + 71
		console.log(depositsInfoLocation)

		return new Seed(seedOptions)
	}

	//// Object Properties
	/** The resources in a seed. */
	resources: SeedOptions["resources"]
	/**
	 * The world size of the seed.
	 * @default 100
	 */
	worldSize: NonNullable<SeedOptions["worldSize"]>
	/**
	 * The resource amount of the seed.
	 * @default 100
	 */
	resourceAmount: NonNullable<SeedOptions["resourceAmount"]>
	/** The seed. */
	seed?: SeedOptions["seed"]

	//// Constructors
	/**
	 * Construct a {@link Seed} object.
	 * @param options The seed options.
	 */
	constructor(options: SeedOptions)
	/**
	 * Construct a {@link Seed} object.
	 * @param seed A {@link Seed} object.
	 * @param passByReference Whether to pass the objects in {@link seed `seed`} by reference or not. Default is `true.`
	 */
	constructor(seed: Seed, passByReference?: boolean)
	/**
	 * Construct a {@link Seed} object.
	 * @param seed A {@link Seed} object or seed options.
	 * @param passByReference Whether to pass the objects in {@link seed `seed`} by reference or not. Default is `true.`
	 */
	constructor(seed: Seed | SeedOptions, passByReference?: boolean)
	constructor(objectOrOptions: Seed | SeedOptions, passByReference: boolean = true) {
		if (passByReference) this.resources = objectOrOptions.resources
		else this.resources = { ...objectOrOptions.resources }
		this.worldSize = objectOrOptions.worldSize ?? 100
		this.resourceAmount = objectOrOptions.resourceAmount ?? 100
		this.seed = objectOrOptions.seed

		if (typeof objectOrOptions.seed !== "undefined") {
			Seed.#amount++
			Seed.seeds[objectOrOptions.seed] = this
		}
	}

	//// Object Methods
	/**
	 * Converts the seed into string
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than 0. Default is 2
	 * @returns The string
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The {@link Item `Item`} object to calculate the limited resource based on the base resource of that item
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	getLimitedDeposits(item: Item): InputOptions[]
	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The item name to calculate the limited resource based on the base resource of that item
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	getLimitedDeposits(item: string): InputOptions[]
	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The {@link Item `Item`} object or name to calculate the limited resource based on the base resource of that item
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	getLimitedDeposits(item: Item | string): InputOptions[]
	getLimitedDeposits(item: Item | string): InputOptions[] { return Seed.getLimitedDeposits(item, this.resources) }

	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The {@link Item `Item`} object to get the resources that limits making more of this item
	 * @returns The limited resource
	 */
	getLimitedDeposit(item: Item): InputOptions
	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The item name to get the resources that limits making more of this item
	 * @returns The limited resource
	 */
	getLimitedDeposit(item: string): InputOptions
	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The {@link Item `Item`} object or name to get the resources that limits making more of this item
	 * @returns The limited resource
	 */
	getLimitedDeposit(item: Item | string): InputOptions
	getLimitedDeposit(item: Item | string): InputOptions { return Seed.getLimitedDeposit(item, this.resources) }

	/**
	 * Get the maximum amount to make an item in the seed
	 * @param item The {@link Item `Item`} object to get the max of
	 * @returns The maximum amount to make the item in the seed
	 */
	getMax(item: Item): number
	/**
	 * Get the maximum amount to make an item in the seed
	 * @param item The item name to get the max of
	 * @returns The maximum amount to make the item in the seed
	 */
	getMax(item: string): number
	/**
	 * Get the maximum amount to make an item in the seed
	 * @param item The {@link Item `Item`} object or name to get the max of
	 * @returns The maximum amount to make the item in the seed
	 */
	getMax(item: Item | string): number
	getMax(item: Item | string): number {
		var i = Item.getAmountOfBaseResources(item)
		const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin
		const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin
		var maximum = Number.MAX_SAFE_INTEGER
		for (const key in i) maximum = Math.min(maximum, this.resources[key as keyof ResourcesOptions] * (key === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput) / i[key as keyof ResourcesOptions]!)
		return maximum
	}

	/**
	 * Determine if this seed and another seed are the equal
	 * @param seed The other seed
	 * @returns true if both seeds are the equal, false otherwise
	 */
	equals(seed: Seed): boolean {
		if (this === seed) return true
		for (const resource in this.resources) if (this.resources[resource as keyof ResourcesOptions] !== seed.resources[resource as keyof ResourcesOptions]) return false
		return this.resourceAmount === seed.resourceAmount
			&& this.worldSize === seed.worldSize
	}

	/**
	 * Determine if this seed and another seed are the strictly equal
	 * @param seed The other seed
	 * @returns true if both seeds are the strictly equal, false otherwise
	 */
	strictlyEquals(seed: Seed): boolean {
		return this.equals(seed)
			&& this.seed === seed.seed
	}
}