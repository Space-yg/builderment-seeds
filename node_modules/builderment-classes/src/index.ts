/**
 * @author Space.yg
 */

interface DiscordUser {
	/** The user's id */
	id: string
	/** The user's username, not unique across the platform */
	username: string
	/** The user's Discord-tag */
	discriminator: string
	/** The user's display name, if it is set. For bots, this is the application name */
	global_name: string | null
	/** The user's avatar hash */
	avatar: string | null
	/** Whether the user belongs to an OAuth2 application */
	bot?: boolean
	/** Whether the user is an Official Discord System user (part of the urgent message system) */
	system?: boolean
	/** Whether the user has two factor enabled on their account */
	mfa_enabled?: boolean
	/** The user's banner hash */
	banner?: string | null
	/** The user's banner color encoded as an integer representation of hexadecimal color code */
	accentColor?: number | null
	/** The user's chosen language option */
	locale?: string
	/** Whether the email on this account has been verified */
	verified?: boolean
	/** The user's email */
	email?: string | null
	/** The flags on a user's account */
	flags?: number
	/** The type of Nitro subscription on a user's account */
	premium_type?: number
	/** The public flags on a user's account */
	public_flags?: number
	/** The user's avatar decoration hash */
	avatar_decoration?: string | null
}

export const Space: {
	/** The author a.k.a me :) */
	yg: {
		/** My Discord information */
		Discord: DiscordUser
		/** My GitHub account */
		GitHub: string,
		/** My Instagram account */
		Instagram: string,
		/** My X (Twitter) account */
		X: string,
	}
} = {
	yg: {
		Discord: {
			id: '710012954736590908',
			bot: false,
			system: false,
			flags: 4194368,
			username: 'space.yg',
			global_name: 'Space.yg',
			discriminator: '0',
			avatar: 'c6e77d918ce84cc49664ca505fab3727',
			banner: null,
			accentColor: null,
			avatar_decoration: null,
		},
		GitHub: "space-yg",
		Instagram: "space.yg",
		X: "space_yag",
	},
}

// Later
// TODO: Add .clone method to all classes
// TODO: Add .delete method to all classes
// TODO: Add Symbols to all classes

//// Classes
export {
	Area,
	AreaOptions,
} from "./classes/Area.js"
export {
	Base,
	BaseOptions,
} from "./classes/Base.js"
export { Currency } from "./classes/Currency.js"
export type {
	InputOptions,
	InputOptionsObject,
	InputPerMinOptions,
} from "./classes/Input.d.ts"
export {
	Item,
	ItemOptions,
} from "./classes/Item.js"
export {
	Price,
	PriceOptions,
} from "./classes/Price.js"
export {
	advancedWorldChoices,
	ResourcesOptions,
	Seed,
	SeedOptions,
} from "./classes/Seed.js"
export {
	BuildTierOptions,
	Technology,
	TechnologyOptions,
} from "./classes/Technology.js"

//* Buildings
export {
	Decoration,
	DecorationOptions,
} from "./classes/buildings/Decoration.js"
export {
	ItemCollector,
	ItemCollectorOptions,
} from "./classes/buildings/ItemCollector.js"
export {
	PowerPlant,
	PowerPlantOptions,
} from "./classes/buildings/PowerPlant.js"

//* Tiers
export {
	Tier,
	TierOptions,
} from "./classes/buildings/tiers/Tier.js"
export {
	Tiers,
	TiersOptions,
} from "./classes/buildings/tiers/Tiers.js"

//? DistanceTier
export {
	DistanceTier,
	DistanceTierContractors,
	DistanceTierExtra,
	DistanceTierFunctions,
	DistanceTierOptions,
} from "./classes/buildings/tiers/distance-tiers/DistanceTier.js"
export {
	DistanceTiers,
	DistanceTiersOptions,
} from "./classes/buildings/tiers/distance-tiers/DistanceTiers.js"
export {
	TransportationDistance,
	TransportationDistanceOptions,
} from "./classes/buildings/tiers/distance-tiers/TransportationDistance.js"

//? OutputTier
export {
	OutputTier,
	OutputTierContractors,
	OutputTierExtra,
	OutputTierFunctions,
	OutputTierOptions,
} from "./classes/buildings/tiers/output-tiers/OutputTier.js"
export {
	OutputTiers,
	OutputTiersOptions,
} from "./classes/buildings/tiers/output-tiers/OutputTiers.js"
export {
	Factory,
	FactoryOptions,
} from "./classes/buildings/tiers/output-tiers/Factory.js"

//? SpeedTier
export {
	SpeedTier,
	SpeedTierContractors,
	SpeedTierExtra,
	SpeedTierFunctions,
	SpeedTierOptions,
} from "./classes/buildings/tiers/speed-tier/SpeedTier.js"
export {
	SpeedTiers,
	SpeedTiersOptions,
} from "./classes/buildings/tiers/speed-tier/SpeedTiers.js"
export {
	TransportationSpeed,
	TransportationSpeedOptions,
} from "./classes/buildings/tiers/speed-tier/TransportationSpeed.js"

//? StorageTier
export {
	StorageTier,
	StorageTierContractors,
	StorageTierExtra,
	StorageTierFunctions,
	StorageTierOptions,
} from "./classes/buildings/tiers/storage-tiers/StorageTier.js"
export {
	StorageTiers,
	StorageTiersOptions,
} from "./classes/buildings/tiers/storage-tiers/StorageTiers.js"
export {
	Storage,
	StorageOptions,
} from "./classes/buildings/tiers/storage-tiers/Storage.js"

//* Designs
export {
	Design,
	DesignOptions,
} from "./classes/designs/Design.js"
export {
	Requirements,
	RequirementsOptions,
	RoboticArmTiers,
} from "./classes/designs/Requirements.js"
export {
	NToM,
	NToMOptions,
} from "./classes/designs/NToM.js"
export {
	RoboticArmTierDesign,
	RoboticArmTierDesignOptions,
} from "./classes/designs/RoboticArmTierDesign.js"


//// Objects
export * as currencies from "./objects/currencies.js"
export * as items from "./objects/items.js"
export * as technologies from "./objects/technologies.js"

// Buildings
export * as decorations from "./objects/buildings/decorations.js"
export * as factories from "./objects/buildings/factories.js"
export * as itemCollectors from "./objects/buildings/item-collectors.js"
export * as powerPlants from "./objects/buildings/power-plants.js"
export * as others from "./objects/buildings/storages.js"
export * as transportations from "./objects/buildings/transportations.js"

// Designs
export * as balancers from "./objects/designs/balancers.js"
export * as factorySplitters from "./objects/designs/factory-splitters.js"
export * as labBalancers from "./objects/designs/lab-balancers.js"
export * as splitters from "./objects/designs/splitters.js"
export * as valves from "./objects/designs/valves.js"