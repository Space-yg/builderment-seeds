/**
 * @author Space.yg
 */

// Classes
import { Base } from "./Base.js"
import { Item } from "./Item.js"
import { InputOptions } from "./Input.js"
import { ItemCollector } from "./buildings/ItemCollector.js"
import { Tiers } from "./buildings/tiers/Tiers.js"
import { OutputTiers } from "./buildings/tiers/output-tiers/OutputTiers.js"
import { Factory } from "./buildings/tiers/output-tiers/Factory.js"
import { StorageTiers } from "./buildings/tiers/storage-tiers/StorageTiers.js"
import { Storage } from "./buildings/tiers/storage-tiers/Storage.js"
import { DistanceTiers } from "./buildings/tiers/distance-tiers/DistanceTiers.js"
import { TransportationDistance } from "./buildings/tiers/distance-tiers/TransportationDistance.js"

// Types
import { type BaseOptions } from "./Base.js"
import { Price, type PriceOptions } from "./Price.js"

/** The build and tier of the build. */
export interface BuildTierOptions {
	/** The build that will unlock it's tier */
	build: Tiers
	/** The tier of the factory it will be unlocked at */
	tier: number
}

/**
 * The technology options to make a new Technology.
 * @extends {{@link BaseOptions `BaseOptions`}
 */
export interface TechnologyOptions extends BaseOptions {
	/** The items needed to unlock this technology. */
	resourcesNeeded: InputOptions[]
	/** The items, factories, or builds that this technology unlocks. */
	unlocks: (Base | ItemCollector | BuildTierOptions)[]
	/**
	 * The technologies that this technology unlocks.
	 * @default []
	 */
	unlocksTechnologies?: Technology[]
	/**
	 * The technology needed to unlock this technology.
	 * @default null
	 */
	technologyNeeded?: Technology | null
}

/**
 * This class helps you make a new Technology.
 * @extends {{@link BaseOptions `BaseOptions`}
 */
export class Technology extends Base {

	//// Static Properties
	/** Total technologies that has been created */
	static #amount: number = 0
	/**
	 * Total technologies that has been created
	 * @readonly
	 */
	static override get amount(): number { return this.#amount }

	/**
	 * All the technologies that has been created
	 * @readonly
	 */
	static readonly technologies: { [/** The name of the technology */ name: string]: Technology[] } = {}

	/**
	 * The image path of the Tech-tree.
	 * @readonly
	 */
	static get treeImage(): string { return "./resources/technologies/Tech Tree.png" }

	/**
	 * Total price of all technologies
	 * @readonly
	 */
	static get totalPrice(): PriceOptions {
		var total: PriceOptions = { gold: 0, gems: 0 }
		for (const technologies in this.technologies) for (const technology of this.technologies[technologies]) for (const currency in total) total[currency as keyof PriceOptions]! += technology.price[currency as keyof PriceOptions] ?? 0
		return total
	}

	//// Static Methods
	/**
	 * Get a {@link Technology `Technology`} object.
	 * @param technology A {@link Technology `Technology`} object.
	 * @returns An array of {@link Technology `Technology`} objects.
	 */
	static getTechnology(technology: Technology): Technology[]
	/**
	 * Get a {@link Technology `Technology`} object.
	 * @param technology A technology name.
	 * @returns An array of {@link Technology `Technology`} objects if found, else `undefined`.
	 */
	static getTechnology(technology: string): Technology[] | undefined
	/**
	 * Get a {@link Technology `Technology`} object.
	 * @param technology A {@link Technology `Technology`} object or name.
	 * @returns An array of {@link Technology `Technology`} objects if found, else `undefined`.
	 */
	static getTechnology(technology: Technology | string): Technology[] | undefined
	static getTechnology(technology: Technology | string): Technology[] | undefined {
		if (typeof technology !== "string") return [technology]
		return Technology.technologies[technology]
	}

	//// Object Properties
	/** The items needed to unlock this technology */
	resourcesNeeded: TechnologyOptions["resourcesNeeded"]

	/** The items, factories, or builds that this technology unlocks. */
	unlocks: TechnologyOptions["unlocks"]

	/**
	 * The technologies that this technology unlocks.
	 * @default []
	*/
	unlocksTechnologies: NonNullable<TechnologyOptions["unlocksTechnologies"]>

	/**
	 * The technology needed to unlock this technology.
	 * @default null
	 */
	technologyNeeded: NonNullable<TechnologyOptions["technologyNeeded"]> | null

	/**
	 * Get the total price to get to this technology.
	 * @readonly
	 */
	get totalPrice(): Price {
		if (this.technologyNeeded === null) return new Price()
		return Price.add(this.price, this.technologyNeeded.totalPrice)
	}

	//// Constructors
	/**
	 * Constructs a {@link Technology `Technology`} object.
	 * @param options The technology options.
	 * @param passByReference Whether to pass the objects in the {@link technology `technology`} by reference or not. Default is `true`.
	 */
	constructor(options: TechnologyOptions, passByReference?: boolean)
	/**
	 * Constructs a {@link Technology `Technology`} object.
	 * @param technology A {@link Technology `Technology`} object.
	 * @param passByReference Whether to pass the objects in the {@link technology `technology`} by reference or not. Default is `true`.
	 */
	constructor(technology: Technology, passByReference?: boolean)
	/**
	 * Constructs a {@link Technology `Technology`} object.
	 * @param technology A {@link Technology `Technology`} object or technology options.
	 * @param passByReference Whether to pass the objects in the {@link technology `technology`} by reference or not. Default is `true`.
	 */
	constructor(technology: Technology | TechnologyOptions, passByReference?: boolean)
	constructor(technologyOrOptions: Technology | TechnologyOptions, passByReference: boolean = true) {
		super(technologyOrOptions)

		// Image
		const firstUnlock = technologyOrOptions.unlocks[0]
		this.image = technologyOrOptions.image ?? this.image + `technologies/${this.name}` + (
			// is BuildTierOptions
			Object.hasOwn(firstUnlock, "build") ?
				// is Transportation and underground belt upgrade
				(<BuildTierOptions> firstUnlock).build instanceof TransportationDistance && (<TransportationDistance> (<BuildTierOptions> firstUnlock).build).name === "Underground Belt Upgrade" ?
					` ${(<BuildTierOptions> firstUnlock).tier}` :
					` Tier ${(<BuildTierOptions> firstUnlock).tier}` :
				""
		) + ".png"

		// passByReference
		if (passByReference) {
			this.technologyNeeded = typeof technologyOrOptions.technologyNeeded === "undefined" ? null : technologyOrOptions.technologyNeeded
			this.resourcesNeeded = technologyOrOptions.resourcesNeeded
			this.unlocks = technologyOrOptions.unlocks
			this.unlocksTechnologies = technologyOrOptions.unlocksTechnologies ?? []
		}
		// Not passByReference
		else {
			// technologyNeeded
			this.technologyNeeded = typeof technologyOrOptions.technologyNeeded === "undefined" || technologyOrOptions.technologyNeeded === null ? null : new Technology(technologyOrOptions.technologyNeeded)

			// resourcesNeeded
			this.resourcesNeeded = []
			for (const resourceNeeded of technologyOrOptions.resourcesNeeded) this.resourcesNeeded.push({
				amount: resourceNeeded.amount,
				item: new Item(resourceNeeded.item)
			})

			// unlocks
			this.unlocks = []
			for (const unlock of technologyOrOptions.unlocks) this.unlocks.push(unlock instanceof Base ? new Base(unlock) : unlock instanceof ItemCollector ? new ItemCollector(unlock) : <BuildTierOptions> {
				tier: unlock.tier,
				build:
					unlock.build instanceof Factory ?
						new Factory(unlock.build) :
						unlock.build instanceof TransportationDistance ?
							new TransportationDistance(unlock.build) :
							unlock.build instanceof Storage ?
								new Storage(unlock.build) :
								unlock.build instanceof OutputTiers ?
									new OutputTiers(unlock.build) :
									unlock.build instanceof StorageTiers ?
										new StorageTiers(unlock.build) :
										unlock.build instanceof DistanceTiers ?
											new DistanceTiers(unlock.build) :
											new Tiers(unlock.build)
			})

			// unlocksTechnologies
			this.unlocksTechnologies = []
			if (typeof technologyOrOptions.unlocksTechnologies !== "undefined") for (const unlocksTechnology of technologyOrOptions.unlocksTechnologies) this.unlocksTechnologies.push(unlocksTechnology)
		}

		// Statics
		Technology.#amount++
		if (typeof Technology.technologies[technologyOrOptions.name] === "undefined") Technology.technologies[technologyOrOptions.name] = [this]
		else Technology.technologies[technologyOrOptions.name].push(this)
	}

	//// Object Methods
	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The {@link Technology `Technology`} object to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	private needsFunction(technology: Technology): boolean {
		// if this is the technology...
		if (this === technology) return true

		// if technology is very first technology...
		if (typeof this.technologyNeeded === "undefined" || this.technologyNeeded === null) return false

		// Find technology recursively
		return this.technologyNeeded.needsFunction(technology)
	}

	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The {@link Technology `Technology`} object to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	needs(technology: Technology): boolean
	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The technology name to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	needs(technology: string): boolean
	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The {@link Technology `Technology`} object or technology name to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	needs(technology: Technology | string): boolean
	needs(technology: Technology | string): boolean {
		// Get the technology
		const t = Technology.getTechnology(technology)
		if (typeof t === "undefined") return false
		const tech = t[0]

		// Find technology recursively
		return this.needsFunction(tech)
	}

	/**
	 * Determine if this technology and another technology are the equal
	 * @param technology The other technology
	 * @returns true if both technologies are the equal, false otherwise
	 */
	override equals(technology: Technology): boolean {
		return super.equals(technology)

			// resourcesNeeded
			&& this.resourcesNeeded.length === technology.resourcesNeeded.length
			&& this.resourcesNeeded.every(input => technology.resourcesNeeded.some(otherInput => input.amount === otherInput.amount && input.item.equals(otherInput.item)))

			// unlocks
			&& this.unlocks.every(unlock => technology.unlocks.some(otherUnlock => {
				if (typeof otherUnlock === "undefined") return false

				// Base | ItemCollector
				if (unlock instanceof Base) {
					if (!(otherUnlock instanceof Base)) return false

					if (unlock instanceof ItemCollector) return otherUnlock instanceof ItemCollector && unlock.equals(otherUnlock)
					else return !(otherUnlock instanceof ItemCollector) && unlock.equals(otherUnlock)
				}
				// BuildTierOptions
				else {
					if (otherUnlock instanceof Base) return false

					// Tier
					if (unlock.tier !== otherUnlock.tier) return false

					// Build
					// @ts-ignore
					if (Object.getPrototypeOf(unlock.build).constructor.name === Object.getPrototypeOf(otherUnlock.build).constructor.name) return unlock.build.equals(otherUnlock.build)
					else return false
				}
			}))
			&& this.unlocks.length === technology.unlocks.length

			// unlocksTechnologies
			&& (
				typeof this.unlocksTechnologies === "undefined" ?
					typeof technology.unlocksTechnologies === "undefined" :
					typeof technology.unlocksTechnologies === "undefined" ?
						false :
						this.unlocksTechnologies.every(tech => technology.unlocksTechnologies!.some(otherTech => tech.equals(otherTech)))
			)
	}

	/**
	 * Determine if this technology and another technology are the strictly equal
	 * @param technology The other technology
	 * @returns true if both technologies are the strictly equal, false otherwise
	 */
	override strictlyEquals(technology: Technology): boolean {
		return super.strictlyEquals(technology)

			// resourcesNeeded
			&& this.resourcesNeeded.length === technology.resourcesNeeded.length
			&& this.resourcesNeeded.every(input => technology.resourcesNeeded.some(otherInput => input.amount === otherInput.amount && input.item.strictlyEquals(otherInput.item)))

			// unlocks
			&& this.unlocks.every(unlock => technology.unlocks.some(otherUnlock => {
				if (typeof otherUnlock === "undefined") return false

				// Base | ItemCollector
				if (unlock instanceof Base) {
					if (!(otherUnlock instanceof Base)) return false

					if (unlock instanceof ItemCollector) return otherUnlock instanceof ItemCollector && unlock.strictlyEquals(otherUnlock)
					else return !(otherUnlock instanceof ItemCollector) && unlock.strictlyEquals(otherUnlock)
				}
				// BuildTierOptions
				else {
					if (otherUnlock instanceof Base) return false

					// Tier
					if (unlock.tier !== otherUnlock.tier) return false

					// Build
					// @ts-ignore
					if (Object.getPrototypeOf(unlock.build).constructor.name === Object.getPrototypeOf(otherUnlock.build).constructor.name) return unlock.build.equals(otherUnlock.build)
					else return false
				}
			}))
			&& this.unlocks.length === technology.unlocks.length

			// unlocksTechnologies
			&& (
				typeof this.unlocksTechnologies === "undefined" ?
					typeof technology.unlocksTechnologies === "undefined" :
					typeof technology.unlocksTechnologies === "undefined" ?
						false :
						this.unlocksTechnologies.every(tech => technology.unlocksTechnologies!.some(otherTech => tech.strictlyEquals(otherTech)))
			)
	}
}