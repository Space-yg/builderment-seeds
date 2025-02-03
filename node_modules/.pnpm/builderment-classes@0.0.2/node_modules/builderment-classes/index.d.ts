declare module "helpers" {
    /**
     * @author Space.yg
     */
    /**
     * Show all properties in a type.
     * @template T The type.
     */
    export type Prettify<T> = {
        [K in keyof T]: T[K]
    } & {}
    /**
     * Removes all functions from {@link T `T`}.
     * @template T The type to remove all functions from.
     */
    export type RemoveFunctions<T> = {
        [P in keyof T as T[P] extends Function ? never : P]: T[P]
    }
    /**
     * Capitalize the first letters in a string and remove any unnecessary spacings.
     * @param string The string.
     * @returns The string with capitalized first letters.
     */
    export function capitalizeFirstLetters(string: string): string
    /**
     * Converts an array to a string.
     * @param arr The array.
     * @param limit The limit of how many tabs.
     * @param tabs The amount of tabs (\t).
     * @returns The string.
     */
    export function arrayToString(arr: any[], limit?: number, tabs?: string): string
    /**
     * Converts an object to a string.
     * @param obj The object.
     * @param limit The limit of how many tabs.
     * @param tabs The amount of tabs (\t).
     * @returns The string.
     */
    export function objToString(obj: any, limit?: number, tabs?: string): string
}
declare module "classes/Price" {
    /**
     * @author Space.yg
     */
    /** The price options. */
    export interface PriceOptions {
        /**
         * The amount of gold.
         * @default 0
         */
        gold?: number | null
        /**
         * The amount of gems.
         * @default 0
         */
        gems?: number | null
    }
    /** Make a new price. */
    export class Price {
        /**
         * Add multiple prices together.
         * @param prices Prices to add.
         * @returns Total price.
         */
        static add(...prices: (Price | PriceOptions)[]): Price
        /**
         * Determine if all prices are equal to each other.
         * @param prices The prices to compare.
         * @returns `true` if all prices are equal, `false` otherwise.
         */
        static equalPrices(...prices: (Price | PriceOptions)[]): boolean
        /**
         * The amount of gold.
         * @default 0
         */
        gold: NonNullable<PriceOptions["gold"]> | null
        /**
         * The amount of gems.
         * @default 0
         */
        gems: NonNullable<PriceOptions["gems"]> | null
        /**
         * Construct a {@link Price `Price`} object.
         */
        constructor()
        /**
         * Construct a {@link Price `Price`} object.
         * @param options The price options
         */
        constructor(options: PriceOptions)
        /**
         * Construct a {@link Price `Price`} object.
         * @param price A {@link Price `Price`} object
         */
        constructor(price: Price)
        /**
         * Construct a {@link Price `Price`} object.
         * @param price A {@link Price `Price`} object or price options
         */
        constructor(price: Price | PriceOptions)
        /**
         * Converts this {@link Price `Price`} object to a string.
         */
        toString(): string
        /**
         * Add two {@link Price `Price`} objects together. This method mutates the original {@link Price `Price`} object.
         * @param price The other {@link Price `Price`} object to add.
         * @returns The original {@link Price `Price`} object.
         */
        add(price: Price): this
        /**
         * Add two {@link Price `Price`} objects together. This method creates a new {@link Price `Price`} object.
         * @param price The other {@link Price `Price`} object to add.
         * @returns A new {@link Price `Price`} object.
         */
        toAdd(price: Price): Price
        /**
         * Determine if this {@link Price `Price`} object and another {@link Price `Price`} object are the equal.
         * @param price The other price.
         * @returns `true` if both prices are the equal, `false` otherwise.
         */
        equals(price: Price): boolean
        /**
         * Called by `Object.prototype.toString`.
         */
        get [Symbol.toStringTag](): string;
        /**
         * Iterator called by the for-of loop.
         */
        [Symbol.iterator](): Generator<number | null, void, unknown>
    }
}
declare module "classes/buildings/tiers/Tier" {
    import { Price } from "classes/Price"
    import { type PriceOptions } from "classes/Price"
    /** Optional options for a tier */
    export type TierOptions<Extra extends object = {}> = {
        /**
         * The price of that tier.
         * @default
         * ```javascript
         * Price({
         * 	gold: 0,
         * 	gems: 0,
         * })
         * ```
        */
        price?: Price | PriceOptions
        /**
         * The relative path or URL to the image of this tier.
         * @default "./resources/"
         */
        image?: string
    } & Extra
    /** Make a new tier. */
    export class Tier {
        /**
         * The price of that tier.
         * @default
         * ```javascript
         * new Price({
         * 	gold: 0,
         * 	gems: 0,
         * })
         * ```
         */
        price: Price
        /**
         * The relative path or URL to the image of this tier.
         * @default "./resources/"
         */
        image: NonNullable<TierOptions["image"]>
        /**
         * Construct a {@link Tier `Tier`} object.
         * @param options The tier options.
         */
        constructor(options: TierOptions)
        /**
         * Construct a {@link Tier `Tier`} object.
         * @param tier A {@link Tier `Tier`} object.
         */
        constructor(tier: Tier)
        /**
         * Construct a {@link Tier `Tier`} object.
         * @param tier A {@link Tier `Tier`} object or tier options.
         */
        constructor(tier: Tier | TierOptions)
        /**
         * Converts the tier into string.
         * @param limit The limit of how many tabs can be used. `limit` must be greater than `0`. Default is `2`.
         * @returns The string.
         */
        toString(limit?: number): string
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param tier The other {@link Tier `Tier`} object.
         * @returns `true` if both {@link Tier `Tier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(tier: Tier): boolean
        /**
         * Determine if this {@link Tier `Tier`} object is equal to another {@link Tier `Tier`} object.
         * @param tier The other {@link Tier `Tier`} object.
         * @returns `true` if both {@link Tier `Tier`} objects are equal, `false` otherwise.
         */
        equals(tier: Tier): boolean
        /**
         * Determine if this {@link Tier `Tier`} object is strictly equal to another {@link Tier `Tier`} object.
         * @param tier The other {@link Tier `Tier`} object.
         * @returns `true` if both {@link Tier `Tier`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(tier: Tier): boolean
    }
}
declare module "classes/buildings/tiers/Tiers" {
    /**
     * @author Space.yg
     */
    import { Tier } from "classes/buildings/tiers/Tier"
    import { Price } from "classes/Price"
    import { type TierOptions } from "classes/buildings/tiers/Tier"
    /**
     * Options for {@link Tiers `Tiers`}.
     * @template O The options
     * @template T The tier
     */
    export interface TiersOptions<O extends TierOptions, T extends Tier> {
        [/** The tiers. They must be consecutive integers. */ tier: number]: O | T
    }
    /** Make a new tiers. */
    export class Tiers {
        /** All tiers. */
        tiers: {
            [/** The tiers. They must be consecutive integers. */ tier: number]: Tier
        }
        /**
         * Get the total price to get to the maximum tier.
         * @readonly
         */
        get maxPrice(): Price
        /**
         * Maximum tier number.
         * @readonly
         */
        get maxTierNum(): number
        /**
         * Minimum tier number.
         * @readonly
         */
        get minTierNum(): number
        /**
         * Maximum tier.
         * @readonly
         */
        get maxTier(): Tier
        /**
         * Minimum tier.
         * @readonly
         */
        get minTier(): Tier
        /**
         * Constructs a {@link Tier `Tier`} object.
         * @param options The tiers options.
         * @param passByReference Whether to pass the objects in the {@link Tier `Tier`} by reference or not. Default is `true`.
         */
        constructor(options: TiersOptions<TierOptions, Tier>, passByReference?: boolean)
        /**
         * Constructs a {@link Tier `Tier`} object.
         * @param tiers A {@link Tier `Tier`} object.
         * @param passByReference Whether to pass the objects in the {@link Tier `Tier`} by reference or not. Default is `true`.
         */
        constructor(tiers: Tiers, passByReference?: boolean)
        /**
         * Constructs a {@link Tier `Tier`} object.
         * @param tiers A {@link Tier `Tier`} object or tiers options.
         * @param passByReference Whether to pass the objects in the {@link Tier `Tier`} by reference or not. Default is `true`.
         */
        constructor(tiers: Tiers | TiersOptions<TierOptions, Tier>, passByReference?: boolean)
        /**
         * Converts the tiers into string.
         * @param limit The limit of how many tabs can be used. `limit` must be greater than `0`. Default is `2`.
         * @returns The string.
         */
        toString(limit?: number): string
        /**
         * Check if a tier number is in this {@link Tiers `Tiers`} object's tiers.
         * @param tier Tier number to search for.
         * @param error Whether to throw an error.
         * @throws Error if tier number was not found.
         * @returns Whether the tier number is in this {@link Tiers `Tiers`} object's tiers.
         */
        hasN(tier: number, error?: boolean): boolean
        /**
         * Check if this {@link Tiers `Tiers`} object has a {@link Tier `Tier`} object as one of its tiers.
         * @param tier The {@link Tier `Tier`} object to check.
         * @returns `true` if this {@link Tiers `Tiers`} object has {@link tier `tier`} as one of its tiers, `false` otherwise.
         */
        has(tier: Tier): boolean
        /**
         * Check if this {@link Tiers `Tiers`} object strictly has a {@link Tier `Tier`} object as one of its tiers.
         * @param tier The {@link Tier `Tier`} object to check.
         * @returns `true` if this {@link Tiers `Tiers`} object strictly has {@link tier `tier`} as one of its tiers, `false` otherwise.
         */
        strictlyHas(tier: Tier): boolean
        /**
         * Check if this {@link Tiers `Tiers`} object has a reference to {@link Tier `Tier`} object as one of its tiers.
         * @param tier The {@link Tier `Tier`} object to check.
         * @returns `true` if this {@link Tiers `Tiers`} object has a reference to {@link tier `tier`} as one of its tiers, `false` otherwise.
         */
        hasReference(tier: Tier): boolean
        /**
         * Get the total price to get to a tier.
         * @param tier The tier.
         */
        getTotalPrice(tier: number): Price
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param tiers The other {@link Tiers `Tiers`} object.
         * @returns `true` if both {@link Tiers `Tiers`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(tiers: Tiers): boolean
        /**
         * Determine if this {@link Tiers `Tiers`} object is equal to another {@link Tiers `Tiers`} object.
         * @param tiers The other {@link Tiers `Tiers`} object.
         * @returns `true` if both tiers are equal, `false` otherwise.
         */
        equals(tiers: Tiers): boolean
        /**
         * Determine if this {@link Tiers `Tiers`} object is strictly equal to another {@link Tiers `Tiers`} object.
         * @param tiers The other {@link Tiers `Tiers`}.
         * @returns `true` if both tiers are strictly equal, `false` otherwise
         */
        strictlyEquals(tiers: Tiers): boolean
    }
}
declare module "classes/buildings/tiers/distance-tiers/DistanceTier" {
    /**
     * @author Space.yg
     */
    import { Tier } from "classes/buildings/tiers/Tier"
    import { type TierOptions } from "classes/buildings/tiers/Tier"
    import { type RemoveFunctions } from "helpers"
    /** Extra options for distance tier. */
    export interface DistanceTierExtra {
        /** The distance at this tier. */
        distance: number
    }
    /** Constructors for distance tier. */
    export interface DistanceTierContractors {
        /**
         * Constructs a new {@link DistanceTier `DistanceTier`} object.
         * @param options The distance tier options.
         */
        new(options: DistanceTierOptions): DistanceTier
        /**
         * Constructs a new {@link DistanceTier `DistanceTier`} object.
         * @param distanceTier A {@link DistanceTier `DistanceTier`} object.
         */
        new(distanceTier: DistanceTier): DistanceTier
        /**
         * Constructs a new {@link DistanceTier `DistanceTier`} object.
         * @param distanceTier A {@link DistanceTier `DistanceTier`} object or distance tier options.
         */
        new(distanceTier: DistanceTier | DistanceTierOptions): DistanceTier
    }
    /**
     * Functions for distance tier.
     * @extends {{@link Tier `Tier`}
     */
    export interface DistanceTierFunctions extends Tier {
        /**
         * Determine if this {@link DistanceTier `DistanceTier`} object is equal to another {@link DistanceTier `DistanceTier`} object.
         * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
         * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are equal, `false` otherwise.
         */
        equals(distanceTier: DistanceTier): boolean
        /**
         * Determine if this {@link DistanceTier `DistanceTier`} object is strictly equal to another {@link DistanceTier `DistanceTier`} object.
         * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
         * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(distanceTier: DistanceTier): boolean
    }
    /**
     * Options for a distance tier.
     * @extends {{@link TierOptions `TierOptions`}
     */
    export type DistanceTierOptions = TierOptions<DistanceTierExtra>
    /**
     * Construct a new {@link DistanceTier `DistanceTier`}.
     * @extends {{@link Tier `Tier`}
     */
    export type DistanceTier = RemoveFunctions<Tier> & DistanceTierExtra & DistanceTierFunctions
    export const DistanceTier: DistanceTierContractors
}
declare module "classes/buildings/tiers/distance-tiers/DistanceTiers" {
    /**
     * @author Space.yg
     */
    import { Tiers } from "classes/buildings/tiers/Tiers"
    import { DistanceTier } from "classes/buildings/tiers/distance-tiers/DistanceTier"
    import { type TiersOptions } from "classes/buildings/tiers/Tiers"
    import { type DistanceTierOptions } from "classes/buildings/tiers/distance-tiers/DistanceTier"
    /**
     * The options of the optional tiers.
     * @extends {{@link TiersOptions `TiersOptions`}
     */
    export type DistanceTiersOptions = TiersOptions<DistanceTierOptions, DistanceTier>
    /**
     * Make a new {@link DistanceTier `StorageTier`}.
     * @extends {{@link Tiers `Tiers`}
     */
    export class DistanceTiers extends Tiers {
        tiers: {
            [/** The tiers. They must be consecutive integers */ tier: number]: DistanceTier
        }
        /**
         * Constructs a new {@link DistanceTiers `StorageTiers`} object.
         * @param options The tier options.
         * @param passByReference Whether to pass the objects in the {@link DistanceTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(options: DistanceTiersOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link DistanceTiers `StorageTiers`} object.
         * @param options A {@link DistanceTiers `StorageTiers`} object.
         * @param passByReference Whether to pass the objects in the {@link DistanceTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(speedTiers: DistanceTiers, passByReference?: boolean)
        /**
         * Constructs a new {@link DistanceTiers `StorageTiers`} object.
         * @param speedTiers A {@link DistanceTiers `StorageTiers`} object or tier options.
         * @param passByReference Whether to pass the objects in the {@link DistanceTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(speedTiers: DistanceTiers | DistanceTiersOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param speedTiers The other {@link DistanceTiers `StorageTiers`} object.
         * @returns `true` if both {@link DistanceTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(speedTiers: DistanceTiers): boolean
        /**
         * Determine if this {@link DistanceTiers `StorageTiers`} object is equal to another {@link DistanceTiers `StorageTiers`} object.
         * @param speedTiers The other {@link DistanceTiers `StorageTiers`} object.
         * @returns `true` if both {@link DistanceTiers `StorageTiers`} objects are equal, `false` otherwise.
         */
        equals(speedTiers: DistanceTiers): boolean
        /**
         * Determine if this {@link DistanceTiers `StorageTiers`} object is strictly equal to another {@link DistanceTiers `StorageTiers`} object.
         * @param speedTiers The other {@link DistanceTiers `StorageTiers`} object.
         * @returns `true` if both {@link DistanceTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(speedTiers: DistanceTiers): boolean
    }
}
declare module "classes/buildings/tiers/distance-tiers/TransportationDistance" {
    /**
     * @author Space.yg
     */
    import { DistanceTiers } from "classes/buildings/tiers/distance-tiers/DistanceTiers"
    import { type Price } from "classes/Price"
    import { type DistanceTiersOptions } from "classes/buildings/tiers/distance-tiers/DistanceTiers"
    /** Options for {@link TransportationDistance `TransportationDistance`}. */
    export interface TransportationDistanceOptions {
        /** The name of the transportation distance. */
        name: string
        /** The description of the transportation distance. This is the in-game description. */
        description: string
        /** The tiers of the transportation distance. */
        tiers: DistanceTiersOptions | DistanceTiers
    }
    /**
     * Make a new transportation distance.
     * @extends {{@link DistanceTiers `DistanceTiers`}
     */
    export class TransportationDistance extends DistanceTiers {
        #private
        /**
         * Total transportation distances that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the transportation distances that has been created.
         * @readonly
         */
        static readonly transportationDistances: {
            [/** The name of the transportation distance. */ name: string]: TransportationDistance
        }
        /** The name of the transportation distance. */
        name: TransportationDistanceOptions["name"]
        /** The price of the first tier of the transportation distance. */
        price: Price
        /** The description of the transportation distance. */
        description: TransportationDistanceOptions["description"]
        /**
         * Constructs a new {@link TransportationDistance `TransportationDistance`} object.
         * @param options The transportation distance options.
         * @param passByReference Whether to pass the objects in the {@link TransportationDistance `TransportationDistance`} by reference or not. Default is `true`.
         */
        constructor(options: TransportationDistanceOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link TransportationDistance `TransportationDistance`} object.
         * @param transportationDistance A {@link TransportationDistance `TransportationDistance`} object.
         * @param passByReference Whether to pass the objects in the {@link TransportationDistance `TransportationDistance`} by reference or not. Default is `true`.
         */
        constructor(transportationDistance: TransportationDistance, passByReference?: boolean)
        /**
         * Constructs a new {@link TransportationDistance `TransportationDistance`} object.
         * @param transportationDistance A {@link TransportationDistance `TransportationDistance`} object or transportation distance options.
         * @param passByReference Whether to pass the objects in the {@link TransportationDistance `TransportationDistance`} by reference or not. Default is `true`.
         */
        constructor(transportationDistance: TransportationDistance | TransportationDistanceOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param transportationDistance The other {@link TransportationDistance `TransportationDistance`} object.
         * @returns `true` if both {@link TransportationDistance `TransportationDistance`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(transportationDistance: TransportationDistance): boolean
        /**
         * Determine if this {@link TransportationDistance `TransportationDistance`} object is equal to another {@link TransportationDistance `TransportationDistance`} object.
         * @param transportationDistance The other {@link TransportationDistance `TransportationDistance`} object.
         * @returns `true` if both storages are the equal, `false` otherwise.
         */
        equals(transportationDistance: TransportationDistance): boolean
        /**
         * Determine if this {@link TransportationDistance `TransportationDistance`} object is strictly equal to another {@link TransportationDistance `TransportationDistance`} object.
         * @param transportationDistance The other {@link TransportationDistance `TransportationDistance`} object.
         * @returns `true` if both storages are the strictly equal, `false` otherwise.
         */
        strictlyEquals(transportationDistance: TransportationDistance): boolean
    }
}
declare module "classes/buildings/tiers/speed-tier/SpeedTier" {
    /**
     * @author Space.yg
     */
    import { Tier } from "classes/buildings/tiers/Tier"
    import { type TierOptions } from "classes/buildings/tiers/Tier"
    import { type RemoveFunctions } from "helpers"
    /** Extra options for speed tier. */
    export interface SpeedTierExtra {
        /** The speed at this tier. */
        speed: number
    }
    /** Constructors for speed tier. */
    export interface SpeedTierContractors {
        /**
         * Constructs a new {@link SpeedTier `SpeedTier`} object.
         * @param options The speed tier options.
         */
        new(options: SpeedTierOptions): SpeedTier
        /**
         * Constructs a new {@link SpeedTier `SpeedTier`} object.
         * @param speedTier A {@link SpeedTier `SpeedTier`} object.
         */
        new(speedTier: SpeedTier): SpeedTier
        /**
         * Constructs a new {@link SpeedTier `SpeedTier`} object.
         * @param speedTier A {@link SpeedTier `SpeedTier`} object or speed tier options.
         */
        new(speedTier: SpeedTier | SpeedTierOptions): SpeedTier
    }
    /**
     * Functions for speed tier.
     * @extends {{@link Tier `Tier`}
     */
    export interface SpeedTierFunctions extends Tier {
        /**
         * Determine if this {@link SpeedTier `SpeedTier`} object is equal to another {@link SpeedTier `SpeedTier`} object.
         * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
         * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are equal, `false` otherwise.
         */
        equals(speedTier: SpeedTier): boolean
        /**
         * Determine if this {@link SpeedTier `SpeedTier`} object is strictly equal to another {@link SpeedTier `SpeedTier`} object.
         * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
         * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(speedTier: SpeedTier): boolean
    }
    /**
     * Options for a speed tier.
     * @extends {{@link TierOptions `TierOptions`}
     */
    export type SpeedTierOptions = TierOptions<SpeedTierExtra>
    /**
     * Construct a new {@link SpeedTier `SpeedTier`}.
     * @extends {{@link Tier `Tier`}
     */
    export type SpeedTier = RemoveFunctions<Tier> & SpeedTierExtra & SpeedTierFunctions
    export const SpeedTier: SpeedTierContractors
}
declare module "classes/buildings/tiers/speed-tier/SpeedTiers" {
    /**
     * @author Space.yg
     */
    import { Tiers } from "classes/buildings/tiers/Tiers"
    import { SpeedTier } from "classes/buildings/tiers/speed-tier/SpeedTier"
    import { type TiersOptions } from "classes/buildings/tiers/Tiers"
    import { type SpeedTierOptions } from "classes/buildings/tiers/speed-tier/SpeedTier"
    /**
     * The options of the optional tiers.
     * @extends {{@link TiersOptions `TiersOptions`}
     */
    export type SpeedTiersOptions = TiersOptions<SpeedTierOptions, SpeedTier>
    /**
     * Make a new speed tiers.
     * @extends {{@link Tiers `Tiers`}
     */
    export class SpeedTiers extends Tiers {
        tiers: {
            [/** The tiers. They must be consecutive integers. */ tier: number]: SpeedTier
        }
        get maxTier(): SpeedTier
        get minTier(): SpeedTier
        /**
         * Constructs a new {@link SpeedTiers `StorageTiers`} object.
         * @param options The tier options.
         * @param passByReference Whether to pass the objects in the {@link SpeedTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(options: SpeedTiersOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link SpeedTiers `StorageTiers`} object.
         * @param options A {@link SpeedTiers `StorageTiers`} object.
         * @param passByReference Whether to pass the objects in the {@link SpeedTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(speedTiers: SpeedTiers, passByReference?: boolean)
        /**
         * Constructs a new {@link SpeedTiers `StorageTiers`} object.
         * @param speedTiers A {@link SpeedTiers `StorageTiers`} object or tier options.
         * @param passByReference Whether to pass the objects in the {@link SpeedTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(speedTiers: SpeedTiers | SpeedTiersOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param speedTiers The other {@link SpeedTiers `StorageTiers`} object.
         * @returns `true` if both {@link SpeedTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(speedTiers: SpeedTiers): boolean
        /**
         * Determine if this {@link SpeedTiers `StorageTiers`} object is equal to another {@link SpeedTiers `StorageTiers`} object.
         * @param speedTiers The other {@link SpeedTiers `StorageTiers`} object.
         * @returns `true` if both {@link SpeedTiers `StorageTiers`} objects are equal, `false` otherwise.
         */
        equals(speedTiers: SpeedTiers): boolean
        /**
         * Determine if this {@link SpeedTiers `StorageTiers`} object is strictly equal to another {@link SpeedTiers `StorageTiers`} object.
         * @param speedTiers The other {@link SpeedTiers `StorageTiers`} object.
         * @returns `true` if both {@link SpeedTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(speedTiers: SpeedTiers): boolean
    }
}
declare module "classes/buildings/tiers/speed-tier/TransportationSpeed" {
    /**
     * @author Space.yg
     */
    import { Price } from "classes/Price"
    import { SpeedTiers } from "classes/buildings/tiers/speed-tier/SpeedTiers"
    import { type SpeedTiersOptions } from "classes/buildings/tiers/speed-tier/SpeedTiers"
    /** Options for {@link TransportationSpeed `TransportationSpeed`}. */
    export interface TransportationSpeedOptions {
        /** The name of the transportation speed. */
        name: string
        /** The description of the transportation speed. */
        description: string
        /** The tiers of the transportation speed. */
        tiers: SpeedTiersOptions | SpeedTiers
    }
    /**
     * Create a new transportation speed.
     * @extends {{@link SpeedTiers `SpeedTiers`}
     */
    export class TransportationSpeed extends SpeedTiers {
        #private
        /**
         * Total transportations that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the transportations that has been created.
         * @readonly
         */
        static readonly transportationSpeeds: {
            [/** The name of the transportation. */ name: string]: TransportationSpeed
        }
        /** The name of the transportation. */
        name: TransportationSpeedOptions["name"]
        /** The price of the first tier of the transportation. */
        price: Price
        /** The description of the transportation. */
        description: TransportationSpeedOptions["description"]
        /**
         * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
         * @param options The transportation options
         * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
         */
        constructor(options: TransportationSpeedOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
         * @param transportation A {@link TransportationSpeed `TransportationSpeed`} object.
         * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
         */
        constructor(transportation: TransportationSpeed, passByReference?: boolean)
        /**
         * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
         * @param transportation A {@link TransportationSpeed `TransportationSpeed`} object or transportation options.
         * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
         */
        constructor(transportation: TransportationSpeed | TransportationSpeedOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param transportationSpeed The other {@link TransportationSpeed `TransportationSpeed`} object.
         * @returns `true` if both {@link TransportationSpeed `TransportationSpeed`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(transportationSpeed: TransportationSpeed): boolean
        /**
         * Determine if this {@link TransportationSpeed `TransportationSpeed`} object is equal to another {@link TransportationSpeed `TransportationSpeed`} object.
         * @param transportationSpeed The other {@link TransportationSpeed `TransportationSpeed`} object.
         * @returns `true` if both storages are the equal, `false` otherwise.
         */
        equals(transportationSpeed: TransportationSpeed): boolean
        /**
         * Determine if this {@link TransportationSpeed `TransportationSpeed`} object is strictly equal to another {@link TransportationSpeed `TransportationSpeed`} object.
         * @param transportationSpeed speed The other {@link TransportationSpeed `TransportationSpeed`} object.
         * @returns `true` if both storages are the strictly equal, `false` otherwise.
         */
        strictlyEquals(transportationSpeed: TransportationSpeed): boolean
    }
}
declare module "objects/buildings/transportations" {
    /**
     * @author Space.yg
     */
    import { TransportationDistance } from "classes/buildings/tiers/distance-tiers/TransportationDistance"
    import { TransportationSpeed } from "classes/buildings/tiers/speed-tier/TransportationSpeed"
    /** Conveyor Belts transport items around the world. Connect to belts, extractors, factories, and other buildings. */
    export const conveyorBelt: TransportationSpeed
    /**
     * The speeds of the Conveyor Belt.
     * @readonly
     */
    export const BeltSpeeds: number[]
    /** Underground Belts transport items underground, allowing them to avoid obstacles. Connect to another underground belt entrance / exist with up to 4 tiles of space between them. */
    export const undergroundBelt: TransportationDistance
    /**
     * The {@link undergroundBelt Underground Belt} distances.
     * @readonly
     */
    export const UndergroundBeltDistances: number[]
    /** Belt Splitters evenly distribute items to connected belts or factories. */
    export const beltSplitter: TransportationDistance
    /** Robotic Arms can move items between buildings and belts from any direction. They can also filter for specific items. */
    export const roboticArm: TransportationSpeed
}
declare module "classes/designs/Requirements" {
    /**
     * @author Space.yg
     */
    import { BeltSpeeds, UndergroundBeltDistances } from "objects/buildings/transportations"
    /** The robotic arm tiers for the Requirements class. */
    export const RoboticArmTiers: readonly [0, 1, 2, 3, 4]
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
    /** Requirements of a build. */
    export class Requirements {
        /** The minimum belt speed of the build. */
        minBeltSpeed: NonNullable<RequirementsOptions["minBeltSpeed"]>
        /** The maximum belt speed of the build. */
        maxBeltSpeed: NonNullable<RequirementsOptions["maxBeltSpeed"]>
        /** The minimum belt tunnel length of the build. */
        tunnelLength: NonNullable<RequirementsOptions["tunnelLength"]>
        /** The robotic arm tier of the build. */
        roboticArmTier: NonNullable<RequirementsOptions["roboticArmTier"]>
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
        /**
         * Converts this {@link Requirements `Requirements`} object into string.
         * @returns The string.
         */
        toString(): string
        /**
         * Determine if this {@link Requirements `Requirements`} object is equal to another {@link Requirements `Requirements`} object.
         * @param requirements The other {@link Requirements `Requirements`} object.
         * @returns `true` if both {@link Requirements `Requirements`} objects are equal, `false` otherwise.
         */
        equals(requirements: Requirements): boolean
    }
}
declare module "classes/Base" {
    /**
     * @author Space.yg
     */
    import { Price } from "classes/Price"
    import { type PriceOptions } from "classes/Price"
    /** The base options. */
    export interface BaseOptions {
        /** The name. */
        name: string
        /** The price. */
        price: Price | PriceOptions
        /**
         * URL or relative path to the image.
         * @default "./resources/"
         */
        image?: string
    }
    /** The base of some classes. */
    export class Base {
        #private
        /**
         * Total bases that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the bases that has been created.
         * @readonly
         */
        static readonly bases: {
            [/** The name. */ name: string]: Base[]
        }
        /** The name. */
        name: BaseOptions["name"]
        /** The price. */
        price: Price
        /**
         * URL or relative path to the image.
         * @default "./resources/"
         */
        image: NonNullable<BaseOptions["image"]>
        /**
         * Constructs a {@link Base `Base`} object.
         * @param options The base options.
         */
        constructor(options: BaseOptions)
        /**
         * Constructs a {@link Base `Base`} object.
         * @param base A {@link Base `Base`} object.
         * @param passByReference Whether to pass the objects in {@link base `base`} by reference or not. Default is `true`.
         */
        constructor(base: Base, passByReference?: boolean)
        /**
         * Constructs a {@link Base `Base`} object.
         * @param base A {@link Base `Base`} object or base options.
         * @param passByReference Whether to pass the objects in {@link base `base`} by reference or not. Default is `true`.
         */
        constructor(base: Base | BaseOptions, passByReference?: boolean)
        /**
         * Converts this {@link Base `Base`} object into string.
         * @param limit The limit of how many tabs can be used. `limit` must be greater than 0. Default is 2.
         * @returns The string.
         */
        toString(limit?: number): string
        /**
         * Determine if this {@link Base `Base`} object is equal to another {@link Base `Base`} object.
         * @param base The other {@link Base `Base`} object.
         * @returns `true` if both {@link Base `Base`} objects are equal, `false` otherwise.
         */
        equals(base: Base): boolean
        /**
         * Determine if this {@link Base `Base`} object is strictly equal to another {@link Base `Base`} object.
         * @param base The other {@link Base `Base`} object.
         * @returns `true` if both {@link Base `Base`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(base: Base): boolean
    }
}
declare module "classes/Area" {
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
        /** The width. */
        width: number
        /** The height. */
        height: number
        /**
         * Area.
         * @readonly
         */
        get area(): number
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
        /**
         * Determine if this {@link Area `Area`} object is equal to another {@link Area `Area`} object.
         * @param area The other {@link Area `Area`} object.
         * @returns `true` if both {@link Area `Area`} objects are equal, `false` otherwise.
         */
        equals(area: Area): boolean
    }
}
declare module "classes/designs/Design" {
    /**
     * @author Space.yg
     */
    import { Requirements } from "classes/designs/Requirements"
    import { Base } from "classes/Base"
    import { Area } from "classes/Area"
    import { type BaseOptions } from "classes/Base"
    import { type AreaOptions } from "classes/Area"
    /** Convert design categories to folder names. */
    export const categoryToFolder: {
        readonly Balancer: "balancers"
        readonly Splitter: "splitters"
        readonly "Workshop/Furnace": "workshops-or-furnaces"
        readonly "Machine Shop/Forge": "machine-shops-or-forges"
        readonly "Industrial Factory": "industrial-factories"
        readonly Manufacturer: "manufacturers"
        readonly "Lab Balancer": "lab-balancers"
        readonly "Overflow Valve": "valves"
    }
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
        #private
        /**
         * The amount of design that have been made.
         * @readonly
         */
        static get amount(): number
        /**
         * The designs that have been made.
         * @readonly
         */
        static readonly designs: {
            [/** The name of the design. */ name: string]: {
                [/** The category of the design. */ category: string]: Design[]
            }
        }
        /**
         * Get the base blueprint URL.
         * @readonly
         */
        static get baseBlueprintURL(): "https://builderment.com/blueprints"
        /**
         * Get the blueprint URL of a blueprint.
         * @param blueprintId The blueprint ID.
         * @returns The URL of the blueprint.
         */
        static blueprintURL(blueprintId: string): `https://builderment.com/blueprints?id=${string}`
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
        /**
         * Get the blueprint URL.
         * @readonly
         */
        get blueprintURL(): `https://builderment.com/blueprints?id=${string}`
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
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param design The other {@link Design `Design`} object.
         * @returns `true` if both {@link Design `Design`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarlyEquals(design: Design): boolean
        /**
         * Determine if this {@link Design `Design`} object is equal to another {@link Design `Design`} object.
         * @param design The other {@link Design `Design`} object.
         * @returns `true` if both {@link Design `Design`} objects are equal, `false` otherwise.
         */
        equals(design: Design): boolean
        /**
         * Determine if this {@link Design `Design`} object is strictly equal to another {@link Design `Design`} object.
         * @param design The other {@link Design `Design`} object.
         * @returns `true` if both {@link Design `Design`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(design: Design): boolean
    }
}
declare module "classes/designs/NToM" {
    /**
     * @author Space.yg
     */
    import { Design } from "classes/designs/Design"
    import { type DesignOptions } from "classes/designs/Design"
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
        #private
        /**
         * The amount of N:M designs that has been made.
         * @readonly
         */
        static get amount(): number
        /**
         * All N:M designs that has been made.
         * @readonly
         */
        static readonly nToM: {
            [/** The name of the category of the N:M. */ category: string]: {
                [/** The amount of inputs of the N:M. */ n: number]: {
                    [/** The amount of outputs of the N:M. */ m: number]: NToM[]
                }
            }
        }
        /** The amount of inputs of the N:M. */
        n: NToMOptions["n"]
        /** The amount of outputs of the N:M. */
        m: NToMOptions["m"]
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
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param nToM The other {@link NToM `NToM`} object.
         * @returns `true` if both {@link NToM `NToM`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarlyEquals(nToM: NToM): boolean
        /**
         * Determine if this {@link NToM `NToM`} object is equal to another {@link NToM `NToM`} object.
         * @param nToM The other {@link NToM `NToM`} object.
         * @returns `true` if both {@link NToM `NToM`} objects are equal, `false` otherwise.
         */
        equals(nToM: NToM): boolean
        /**
         * Determine if this {@link NToM `NToM`} object is strictly equal to another {@link NToM `NToM`} object.
         * @param nToM The other {@link NToM `NToM`} object.
         * @returns `true` if both {@link NToM `NToM`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(nToM: NToM): boolean
    }
}
declare module "classes/designs/RoboticArmTierDesign" {
    /**
     * @author Space.yg
     */
    import { Design } from "classes/designs/Design"
    import { type DesignOptions } from "classes/designs/Design"
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
        #private
        /**
         * The amount of robotic arm tier designs that has been made.
         * @readonly
         */
        static get amount(): number
        /**
         * All robotic arm tier designs that has been made.
         * @readonly
         */
        static readonly roboticArmTierDesigns: {
            [/** The category of the robotic arm tier design. */ category: string]: {
                [/** The Robotic Arm tier of the robotic arm tier design. */ roboticArmTier: number]: RoboticArmTierDesign[]
            }
        }
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
    }
}
declare module "objects/designs/balancers" { }
declare module "objects/designs/factory-splitters" { }
declare module "objects/designs/lab-balancers" { }
declare module "objects/designs/splitters" { }
declare module "objects/designs/valves" { }
declare module "different" { }
declare module "classes/Currency" {
    /**
     * @author Space.yg
     */
    import { Base } from "classes/Base"
    /** Create a new currency */
    export class Currency extends Base {
    }
}
declare module "classes/buildings/tiers/output-tiers/OutputTier" {
    /**
     * @author Space.yg
     */
    import { Tier } from "classes/buildings/tiers/Tier"
    import { type TierOptions } from "classes/buildings/tiers/Tier"
    import { type RemoveFunctions } from "helpers"
    /** Extra options for output tier. */
    export interface OutputTierExtra {
        /** The output at this tier. */
        output: number
    }
    /** Constructors for output tier. */
    export interface OutputTierContractors {
        /**
         * Constructs a new {@link OutputTier `OutputTier`} object.
         * @param options The output tier options.
         */
        new(options: OutputTierOptions): OutputTier
        /**
         * Constructs a new {@link OutputTier `OutputTier`} object.
         * @param outputTier A {@link OutputTier `OutputTier`} object.
         */
        new(outputTier: OutputTier): OutputTier
        /**
         * Constructs a new {@link OutputTier `OutputTier`} object.
         * @param outputTier A {@link OutputTier `OutputTier`} object or output tier options.
         */
        new(outputTier: OutputTier | OutputTierOptions): OutputTier
    }
    /**
     * Functions for output tier.
     * @extends {@link Tier `Tier`}
     */
    export interface OutputTierFunctions extends Tier {
        /**
         * Determine if this {@link OutputTier `OutputTier`} object is equal to another {@link OutputTier `OutputTier`} object.
         * @param outputTier The other {@link OutputTier `OutputTier`} object.
         * @returns `true` if both {@link OutputTier `OutputTier`} objects are equal, `false` otherwise.
         */
        equals(outputTier: OutputTier): boolean
        /**
         * Determine if this {@link OutputTier `OutputTier`} object is strictly equal to another {@link OutputTier `OutputTier`} object.
         * @param outputTier The other {@link OutputTier `OutputTier`} object.
         * @returns `true` if both {@link OutputTier `OutputTier`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(outputTier: OutputTier): boolean
    }
    /**
     * Options for a output tier.
     * @extends {@link TierOptions `TierOptions`}
     */
    export type OutputTierOptions = TierOptions<OutputTierExtra>
    /**
     * Construct a new {@link OutputTier `OutputTier`}.
     * @extends {@link Tier `Tier`}
     */
    export type OutputTier = RemoveFunctions<Tier> & OutputTierExtra & OutputTierFunctions
    export const OutputTier: OutputTierContractors
}
declare module "classes/buildings/tiers/output-tiers/OutputTiers" {
    /**
     * @author Space.yg
     */
    import { Tiers } from "classes/buildings/tiers/Tiers"
    import { OutputTier } from "classes/buildings/tiers/output-tiers/OutputTier"
    import { type TiersOptions } from "classes/buildings/tiers/Tiers"
    import { type OutputTierOptions } from "classes/buildings/tiers/output-tiers/OutputTier"
    /**
     * Options for output tiers.
     * @extends {{@link TiersOptions `TiersOptions`}
     */
    export type OutputTiersOptions = TiersOptions<OutputTierOptions, OutputTier>
    /**
     * Make a new output tier.
     * @extends {{@link Tiers `Tiers`}
     */
    export class OutputTiers extends Tiers {
        tiers: {
            [/** The tiers. They must be consecutive integers. */ tier: number]: OutputTier
        }
        get maxTier(): OutputTier
        get minTier(): OutputTier
        /**
         * Constructs a new {@link OutputTiers `OutputTiers`} object.
         * @param options The output tier options.
         * @param passByReference Whether to pass the objects in the {@link options `options`} by reference or not. Default is `true`.
         */
        constructor(options: OutputTiersOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link OutputTiers `OutputTiers`} object.
         * @param outputTiers An {@link OutputTiers `OutputTiers`} object.
         * @param passByReference Whether to pass the objects in the {@link outputTiers `outputTiers`} by reference or not. Default is `true`.
         */
        constructor(outputTiers: OutputTiers, passByReference?: boolean)
        /**
         * Constructs a new {@link OutputTiers `OutputTiers`} object.
         * @param outputTiers An {@link OutputTiers `OutputTiers`} object or output tier options.
         * @param passByReference Whether to pass the objects in the {@link outputTiers `outputTiers`} by reference or not. Default is `true`.
         */
        constructor(outputTiers: OutputTiers | OutputTiersOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
         * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(outputTiers: OutputTiers): boolean
        /**
         * Determine if this {@link OutputTiers `OutputTiers`} object is equal to another {@link OutputTiers `OutputTiers`} object.
         * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
         * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are equal, `false` otherwise.
         */
        equals(outputTiers: OutputTiers): boolean
        /**
         * Determine if this {@link OutputTiers `OutputTiers`} object is strictly equal to another {@link OutputTiers `OutputTiers`} object.
         * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
         * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(outputTiers: OutputTiers): boolean
    }
}
declare module "classes/buildings/tiers/output-tiers/Factory" {
    /**
     * @author Space.yg
     */
    import { OutputTiers } from "classes/buildings/tiers/output-tiers/OutputTiers"
    import { type Price } from "classes/Price"
    import { type OutputTiersOptions } from "classes/buildings/tiers/output-tiers/OutputTiers"
    /** Options for {@link Factory `Factory`}. */
    export interface FactoryOptions {
        /** The name of the factory. */
        name: string
        /** The amount of inputs of the factory. */
        inputs: number
        /** The description of the factory. */
        description: string
        /** The tiers of the factory. */
        tiers: OutputTiers | OutputTiersOptions
    }
    /**
     * Create a new factory.
     * @extends {{@link OutputTiers `OutputTiers`}
     */
    export class Factory extends OutputTiers {
        #private
        /**
         * Total factories that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the factories that has been created.
         * @readonly
         */
        static readonly factories: {
            [/** The name of the factory */ name: string]: Factory
        }
        /** The name of the factory. */
        name: FactoryOptions["name"]
        /** The price of the first tier of the factory. */
        price: Price
        /** The amount of inputs of the factory. */
        inputs: FactoryOptions["inputs"]
        /** The description of the factory. */
        description: FactoryOptions["description"]
        /**
         * Constructs a new {@link Factory `Factory`} object.
         * @param options The factory options.
         * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
         */
        constructor(options: FactoryOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link Factory `Factory`} object.
         * @param factory A {@link Factory `Factory`} object.
         * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
         */
        constructor(factory: Factory, passByReference?: boolean)
        /**
         * Constructs a new {@link Factory `Factory`} object.
         * @param factory A {@link Factory `Factory`} object or factory options.
         * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
         */
        constructor(factory: Factory | FactoryOptions, passByReference?: boolean)
        /**
         * These are similarities between the equals and strictlyEquals methods
         * @param factory The other factory
         * @returns true if both factories are the equal in the things that are similar between the equals and strictlyEquals methods, false otherwise
         */
        protected similarEquals(factory: Factory): boolean
        /**
         * Determine if this factory and another factory are the equal
         * @param factory The other factory
         * @returns true if both factories are the equal, false otherwise
         */
        equals(factory: Factory): boolean
        /**
         * Determine if this factory and another factory are the strictly equal
         * @param factory The other factory
         * @returns true if both factories are the strictly equal, false otherwise
         */
        strictlyEquals(factory: Factory): boolean
    }
}
declare module "objects/buildings/factories" {
    /**
     * @author Space.yg
     */
    import { Factory } from "classes/buildings/tiers/output-tiers/Factory"
    /** *Place on resource nodes to extract infinite resources.* */
    export const extractor: Factory
    /** The output/min of {@link extractor Extractors}. */
    export const extractorOutputPerMin: 7.5
    /** *Place on resource nodes to extract infinite resources.* */
    export const uraniumExtractor: Factory
    /** The output/min of {@link uraniumExtractor Uranium Extractors}. */
    export const uraniumExtractorOutputPerMin: 10
    /** *Used to craft items automatically, select a recipe after building.* */
    export const workshop: Factory
    /** *Used to craft items automatically, select a recipe after building.* */
    export const furnace: Factory
    /** *Used to craft items automatically, select a recipe after building.* */
    export const machineShop: Factory
    /** *Used to craft items automatically, select a recipe after building.* */
    export const forge: Factory
    /** *Used to craft items automatically, select a recipe after building.* */
    export const industrialFactory: Factory
    /** *Used to craft items automatically, select a recipe after building.* */
    export const manufacturer: Factory
    /** *Used to craft items automatically, select a recipe after building.* */
    export const earthTeleporter: Factory
    /** *Money might not grow on trees but Gems do. Gem Apples can be harvested using a Robotic Arm. Send Gem Apples into the Research Lab or Gold Vault to get Gems.* */
    export const gemTree: Factory
    /** The output/min of {@link gemTree Gem Trees}. */
    export const gemTreeOutputPerMin: 0.2
}
declare module "classes/Seed" {
    /**
     * @author Space.yg
     */
    import { Item } from "classes/Item"
    import type { InputOptions } from "./Input.d.ts"
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
    /** Make a new seed. */
    export class Seed {
        #private
        /**
         * Total seeds that has been created with a seed.
         * @readonly
         */
        static get amount(): number
        /**
         * All the seeds that has been created with a seed.
         * @readonly
         */
        static readonly seeds: {
            [/** The seed */ seed: string]: Seed
        }
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
        /**
         * **This function is incomplete. Do not use.**
         *
         * Construct a {@link Seed} object from a world save file
         * @param path The path to the world save file
         * @returns A {@link Seed} object
         */
        static constructFromFile(path: string): Promise<Seed>
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
        /**
         * Converts the seed into string
         * @param limit The limit of how many tabs can be used. `limit` must be greater than 0. Default is 2
         * @returns The string
         */
        toString(limit?: number): string
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
        /**
         * Determine if this seed and another seed are the equal
         * @param seed The other seed
         * @returns true if both seeds are the equal, false otherwise
         */
        equals(seed: Seed): boolean
        /**
         * Determine if this seed and another seed are the strictly equal
         * @param seed The other seed
         * @returns true if both seeds are the strictly equal, false otherwise
         */
        strictlyEquals(seed: Seed): boolean
    }
}
declare module "classes/buildings/PowerPlant" {
    /**
     * @author Space.yg
     */
    import { Area } from "classes/Area"
    import { Base } from "classes/Base"
    import { type AreaOptions } from "classes/Area"
    import { type BaseOptions } from "classes/Base"
    import type { InputPerMinOptions } from "../Input.d.ts"
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
    /**
     * Create a power plant.
     * @extends {{@link Base `Base`}
     */
    export class PowerPlant extends Base {
        #private
        /**
         * Total power plants that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the power plants that has been created.
         * @readonly
         */
        static readonly powerPlants: {
            [/** The name of the power plant. */ name: string]: PowerPlant
        }
        /**
         * The description of all power plants.
         * @readonly
         */
        static get description(): string
        /** The input needed to activate the power plant. */
        input: PowerPlantOptions["input"]
        /** The boost speed that the power plant gives. */
        speed: PowerPlantOptions["speed"]
        /** The amount of seconds the power plant is active before needing to recharge. */
        duration: PowerPlantOptions["duration"]
        /** The region of the power plant boost. */
        region: Area
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
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
         * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(powerPlant: PowerPlant): boolean
        /**
         * Determine if this {@link PowerPlant `PowerPlant`} object is equal to another {@link PowerPlant `PowerPlant`} object.
         * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
         * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are equal, `false` otherwise.
         */
        equals(powerPlant: PowerPlant): boolean
        /**
         * Determine if this {@link PowerPlant `PowerPlant`} object is strictly equal to another {@link PowerPlant `PowerPlant`} object.
         * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
         * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(powerPlant: PowerPlant): boolean
    }
}
declare module "objects/buildings/power-plants" {
    /**
     * @author Space.yg
     */
    import { PowerPlant } from "classes/buildings/PowerPlant"
    export const coalPowerPlant: PowerPlant
    export const nuclearPowerPlant: PowerPlant
}
declare module "classes/Item" {
    /**
     * @author Space.yg
     */
    import { Base } from "classes/Base"
    import { Seed } from "classes/Seed"
    import { Factory } from "classes/buildings/tiers/output-tiers/Factory"
    import { type BaseOptions } from "classes/Base"
    import { type ResourcesOptions, type advancedWorldChoices } from "classes/Seed"
    import type { InputOptions, InputPerMinOptions, InputOptionsObject } from "./Input.d.ts"
    /**
     * Options for {@link Item `Item`}.
     * @extends {{@link BaseOptions `BaseOptions`}
     */
    export interface ItemOptions extends BaseOptions {
        /** The factory that makes the item. */
        factory: Factory
        /** The resources needed to make the item. */
        resourcesNeeded: InputOptions[]
        /**
         * The relative path or URL to the image of the recipe of the item.
         * @default ""
         */
        recipeImage?: string
        /** The output/min of the item in tier 1 of the factory. */
        outputPerMin: number
        /**
         * The amount of items produces each manufacture.
         *
         * Example: Copper wire's output amount is `2`.
         * @default 1
         */
        outputAmount?: number
    }
    /**
     * Make a new item.
     * @extends {{@link Base `Base`}
     */
    export class Item extends Base {
        #private
        /** The factory that makes the item. */
        factory: ItemOptions["factory"]
        /** The image URL of the recipe of the item. */
        recipeImage: NonNullable<ItemOptions["recipeImage"]>
        /** The output/min of the item in tier 1 of the factory. */
        outputPerMin: ItemOptions["outputPerMin"]
        /**
         * The amount of items produces each manufacture.
         *
         * Example: Copper wire's output amount is `2`.
         * @default 1
         */
        outputAmount: NonNullable<ItemOptions["outputAmount"]>
        /** The resources needed to make the item. */
        resourcesNeeded: InputOptionsObject
        /** The base resources needed of 1 of the item. */
        baseResources: Partial<ResourcesOptions>
        /** Get the max output/min of the factory to make this item. */
        get maxOutputPerMin(): number
        /** Get the resources needed to make the item at the max tier. */
        get maxResourcesNeeded(): InputPerMinOptions[]
        /**
         * Total items that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the items that has been created.
         * @readonly
         */
        static readonly items: {
            [/** The name of the item. */ name: string]: Item
        }
        /**
         * Get an Item object from name or Item.
         * @param item The item to get.
         * @returns The item if found or undefined if not found.
         */
        static getItem(item: Item | string): Item | undefined
        /**
         * Get the base resources of an item.
         * @param item An Item object to get the base resources of.
         * @param amount The amount of that resource. Default is `1`.
         * @returns The base resources.
         */
        static getAmountOfBaseResources(item: Item, amount?: number): Partial<ResourcesOptions>
        /**
         * Get the base resources of an item.
         * @param item The item name to get the base resources of.
         * @param amount The amount of that resource. Default is `1`.
         * @throws Error if {@link item `item`} is unknown.
         * @returns The base resources.
         */
        static getAmountOfBaseResources(item: string, amount?: number): Partial<ResourcesOptions>
        /**
         * Get the base resources of an item.
         * @param item An item object or an item name to get the base resources of.
         * @param amount The amount of that resource. Default is `1`.
         * @throws Error if {@link item `item`} is unknown.
         * @returns The base resources.
         */
        static getAmountOfBaseResources(item: Item | string, amount?: number): Partial<ResourcesOptions>
        /**
         * Construct an {@link Item `Item`} object.
         * @param options The item options.
         */
        constructor(options: ItemOptions, passByReference?: boolean)
        /**
         * Construct an {@link Item `Item`} object from a pre-existing object.
         * @param item An item object.
         */
        constructor(item: Item, passByReference?: boolean)
        /**
         * Construct an {@link Item `Item`} object.
         * @param item The item object or item options.
         */
        constructor(item: Item | ItemOptions, passByReference?: boolean)
        /**
         * Check if this item needs another item in it's recipe tree.
         * @param item The item to search for.
         * @param scannedItems The scanned items so that they are skipped.
         * @returns `true` if found, `false` otherwise.
         */
        private needsFunction
        /**
         * Check if this item needs another item in it's recipe tree.
         * @param item The name of the item to search for.
         * @returns `true` if found, `false` otherwise.
         */
        needs(item: string): boolean
        /**
         * Check if this item needs another item in it's recipe tree.
         * @param item An Item object to search for.
         * @returns `true` if found, `false` otherwise.
         */
        needs(item: Item): boolean
        /**
         * Get the amount of base resources used to make the item.
         * @param amount The amount to be added to the total of the item.
         * @param resources The base resources needed to make the item.
         * @returns The amount of base resources needed to make the item.
         */
        private getAmountOfBaseResourcesFunction
        /**
         * Get the amount of base resources used to make the item.
         * @param amount The amount of that resource. Default is 1.
         */
        getAmountOfBaseResources(amount?: number): Partial<ResourcesOptions>
        /**
         * Get the amount of resources needed to make the item.
         * @param amount The amount to be added to the total of the item.
         * @param resources The amount of resources needed to make the item.
         * @returns The amount of resources needed to make the item.
         */
        private getAmountOfResourcesFunction
        /**
         * Get the amount of resources used to make the item.
         * @param amount The amount of that resource. Default is 1.
         */
        getAmountOfResources(amount?: number): any
        /**
         * Get the output/min based on the tier of the factory.
         * @param tier The tier to get the output of. Default is 1.
         */
        getOutputPerMin(tier?: number): number
        /**
         * Get the resources needed to make the item at a tier
         * @param tier The tier to get the resources needed. Default is 1
         */
        getResourcesNeeded(tier?: number): InputPerMinOptions[]
        /**
         * Get the maximum amount you can get of this item in a seed.
         *
         * **Note:** This method only works with the normal in-game items.
         * @param seed A {@link Seed `Seed`} object.
         * @returns the maximum amount you can get of this item.
         */
        getMaxResourceAmountInSeed(seed: Seed): number
        /**
         * Get the maximum amount you can get of this item in a seed.
         *
         * **Note:** This method only works with the normal in-game items.
         * @param resources The resources in the world.
         * @returns the maximum amount you can get of this item.
         */
        getMaxResourceAmountInSeed(resources: ResourcesOptions): number
        /**
         * Get an approximate of the maximum amount of this item that can be produced using Power Plants.
         *
         * Steps of how the process works:
         * 1. Coal Power Plants boost Uranium Extractors.
         * 2. Coal Power Plants boost Coal Extractors.
         * 3. Nuclear Power Plants power the rest of the deposits' Extractors.
         * 4. If Coal is not the limited resource, use it to boost the other resources.
         * 5. Calculate the maximum resource amount.
         *
         * **Note:** This method only works with the normal in-game items.
         * @param seed A {@link Seed `Seed`} object.
         * @returns The maximum amount of this item that can be produced using Power Plants.
         */
        getMaxResourceAmountInSeedWithPowerPlants(seed: Seed): number
        /**
         * Get an approximate of the maximum amount of this item that can be produced using Power Plants.
         *
         * Steps of how the process works:
         * 1. Coal Power Plants boost Uranium Extractors.
         * 2. Coal Power Plants boost Coal Extractors.
         * 3. Nuclear Power Plants power the rest of the deposits' Extractors.
         * 4. If Coal is not the limited resource, use it to boost the other resources.
         * 5. Calculate the maximum resource amount.
         *
         * **Note:** This method only works with the normal in-game items.
         * @param resources The resources in the world.
         * @param resourceAmount The resource amount of the world.
         * @returns The maximum amount of this item that can be produced using Power Plants.
         */
        getMaxResourceAmountInSeedWithPowerPlants(resources: ResourcesOptions, resourceAmount?: advancedWorldChoices): number
        /**
         * Get an approximate of the maximum amount of this item that can be produced using Power Plants.
         *
         * Steps of how the process works:
         * 1. Coal Power Plants boost Uranium Extractors.
         * 2. Coal Power Plants boost Coal Extractors.
         * 3. Nuclear Power Plants power the rest of the deposits' Extractors.
         * 4. If Coal is not the limited resource, use it to boost the other resources.
         * 5. Calculate the maximum resource amount.
         *
         * **Note:** This method only works with the normal in-game items.
         * @param resourcesOrSeed A {@link Seed `Seed`} object or resources in the world.
         * @param resourceAmount The resource amount of the world. If a {@link Seed `Seed`} object is supplied to {@link resourcesOrSeed `resourcesOrSeed`}, then this parameter is ignored.
         * @returns The maximum amount of this item that can be produced using Power Plants.
         */
        getMaxResourceAmountInSeedWithPowerPlants(resourcesOrSeed: ResourcesOptions | Seed, resourceAmount?: advancedWorldChoices): number
        /**
         * These are similarities between the equals and strictlyEquals methods.
         * @param item The other item.
         * @returns `true` if both items are the equal in the things that are similar between the equals and strictlyEquals methods, `false` otherwise.
         */
        protected similarEquals(item: Item): boolean
        /**
         * Determine if this {@link Item `Item`} object and another {@link Item `Item`} object are equal.
         * @param item The other {@link Item `Item`} object.
         * @returns `true` if both items are the equal, `false` otherwise.
         */
        equals(item: Item): boolean
        /**
         * Determine if this {@link Item `Item`} object and another {@link Item `Item`} object are strictly equal.
         * @param item The other {@link Item `Item`} object.
         * @returns `true` if both items are the strictly equal, `false` otherwise.
         */
        strictlyEquals(item: Item): boolean
    }
}
declare module "classes/buildings/ItemCollector" {
    /**
     * @author Space.yg
     */
    import { Base } from "classes/Base"
    import { type BaseOptions } from "classes/Base"
    /**
     * Options for {@link ItemCollector `ItemCollector`}.
     * @extends {{@link BaseOptions `BaseOptions`}
     */
    export interface ItemCollectorOptions extends BaseOptions {
        /** The description of the build. */
        description: string
        /** The limit how many of the build can be build. */
        limit: number
        /** The amount of inputs of the build. */
        inputs: number
    }
    /**
     * An item collector.
     * @extends {{@link Base `Base`}
     */
    export class ItemCollector extends Base {
        #private
        /**
         * Total item collectors that has been created.
         * @readonly
         */
        static get amount(): number
        /**
         * All the item collectors that has been created.
         * @readonly
         */
        static readonly itemCollectors: {
            [/** The name of the item collector */ name: string]: ItemCollector
        }
        /** The description of the build. */
        description: ItemCollectorOptions["description"]
        /** The limit how many of the build can be build. */
        limit: ItemCollectorOptions["limit"]
        /** The amount of inputs of the build. */
        inputs: ItemCollectorOptions["inputs"]
        /**
         * Construct an {@link ItemCollector `ItemCollector`} object.
         * @param options The item collector options.
         */
        constructor(options: ItemCollectorOptions)
        /**
         * Construct an {@link ItemCollector `ItemCollector`} object.
         * @param itemCollector An {@link ItemCollector `ItemCollector`} object.
         */
        constructor(itemCollector: ItemCollector)
        /**
         * Construct an {@link ItemCollector `ItemCollector`} object.
         * @param itemCollector an {@link ItemCollector `ItemCollector`} object or item collector options.
         */
        constructor(itemCollector: ItemCollector | ItemCollectorOptions)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param itemCollector The other {@link ItemCollector `ItemCollector`} object.
         * @returns `true` if both {@link ItemCollector `ItemCollector`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        private similarEquals
        /**
         * Determine if this {@link ItemCollector `ItemCollector`} object is equal to another {@link ItemCollector `ItemCollector`} object.
         * @param itemCollector The other {@link ItemCollector `ItemCollector`} object.
         * @returns `true` if both {@link ItemCollector `ItemCollector`} objects are equal, `false` otherwise.
         */
        equals(itemCollector: ItemCollector): boolean
        /**
         * Determine if this {@link ItemCollector `ItemCollector`} object is strictly equal to another {@link ItemCollector `ItemCollector`} object.
         * @param itemCollector The other {@link ItemCollector `ItemCollector`} object.
         * @returns `true` if both {@link ItemCollector `ItemCollector`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(itemCollector: ItemCollector): boolean
    }
}
declare module "classes/buildings/tiers/storage-tiers/StorageTier" {
    /**
     * @author Space.yg
     */
    import { Tier } from "classes/buildings/tiers/Tier"
    import { type TierOptions } from "classes/buildings/tiers/Tier"
    import { type RemoveFunctions } from "helpers"
    /** Extra options for storage tier. */
    export interface StorageTierExtra {
        /** The storage at this tier. */
        storage: number
    }
    /** Constructors for storage tier. */
    export interface StorageTierContractors {
        /**
         * Constructs a new {@link StorageTier `StorageTier`} object.
         * @param options The storage tier options.
         */
        new(options: StorageTierOptions): StorageTier
        /**
         * Constructs a new {@link StorageTier `StorageTier`} object.
         * @param storageTier A {@link StorageTier `StorageTier`} object.
         */
        new(storageTier: StorageTier): StorageTier
        /**
         * Constructs a new {@link StorageTier `StorageTier`} object.
         * @param storageTier A {@link StorageTier `StorageTier`} object or storage tier options.
         */
        new(storageTier: StorageTier | StorageTierOptions): StorageTier
    }
    /**
     * Functions for storage tier.
     * @extends {{@link Tier `Tier`}
     */
    export interface StorageTierFunctions extends Tier {
        /**
         * Determine if this {@link StorageTier `StorageTier`} object is equal to another {@link StorageTier `StorageTier`} object.
         * @param storageTier The other {@link StorageTier `StorageTier`} object.
         * @returns `true` if both {@link StorageTier `StorageTier`} objects are equal, `false` otherwise.
         */
        equals(storageTier: StorageTier): boolean
        /**
         * Determine if this {@link StorageTier `StorageTier`} object is strictly equal to another {@link StorageTier `StorageTier`} object.
         * @param storageTier The other {@link StorageTier `StorageTier`} object.
         * @returns `true` if both {@link StorageTier `StorageTier`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(storageTier: StorageTier): boolean
    }
    /**
     * Options for a storage tier.
     * @extends {{@link TierOptions `TierOptions`}
     */
    export type StorageTierOptions = TierOptions<StorageTierExtra>
    /**
     * Construct a new {@link StorageTier `StorageTier`}.
     * @extends {{@link Tier `Tier`}
     */
    export type StorageTier = RemoveFunctions<Tier> & StorageTierExtra & StorageTierFunctions
    export const StorageTier: StorageTierContractors
}
declare module "classes/buildings/tiers/storage-tiers/StorageTiers" {
    /**
     * @author Space.yg
     */
    import { Tiers } from "classes/buildings/tiers/Tiers"
    import { StorageTier } from "classes/buildings/tiers/storage-tiers/StorageTier"
    import { type TiersOptions } from "classes/buildings/tiers/Tiers"
    import { type StorageTierOptions } from "classes/buildings/tiers/storage-tiers/StorageTier"
    /**
     * The options of the optional tiers.
     * @extends {{@link TiersOptions `TiersOptions`}
     */
    export type StorageTiersOptions = TiersOptions<StorageTierOptions, StorageTier>
    /**
     * Make a new {@link StorageTier `StorageTier`}.
     * @extends {{@link Tiers `Tiers`}
     */
    export class StorageTiers extends Tiers {
        tiers: {
            [/** The tiers. They must be consecutive integers. */ tier: number]: StorageTier
        }
        get maxTier(): StorageTier
        get minTier(): StorageTier
        /**
         * Constructs a new {@link StorageTiers `StorageTiers`} object.
         * @param options The tier options.
         * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(options: StorageTiersOptions, passByReference?: boolean)
        /**
         * Constructs a new {@link StorageTiers `StorageTiers`} object.
         * @param options A {@link StorageTiers `StorageTiers`} object.
         * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(storageTiers: StorageTiers, passByReference?: boolean)
        /**
         * Constructs a new {@link StorageTiers `StorageTiers`} object.
         * @param storageTiers A {@link StorageTiers `StorageTiers`} object or tier options.
         * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
         */
        constructor(storageTiers: StorageTiers | StorageTiersOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
         * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(storageTiers: StorageTiers): boolean
        /**
         * Determine if this {@link StorageTiers `StorageTiers`} object is equal to another {@link StorageTiers `StorageTiers`} object.
         * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
         * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are equal, `false` otherwise.
         */
        equals(storageTiers: StorageTiers): boolean
        /**
         * Determine if this {@link StorageTiers `StorageTiers`} object is strictly equal to another {@link StorageTiers `StorageTiers`} object.
         * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
         * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
         */
        strictlyEquals(storageTiers: StorageTiers): boolean
    }
}
declare module "classes/buildings/tiers/storage-tiers/Storage" {
    /**
     * @author Space.yg
     */
    import { Price } from "classes/Price"
    import { StorageTiers } from "classes/buildings/tiers/storage-tiers/StorageTiers"
    import { type StorageTiersOptions } from "classes/buildings/tiers/storage-tiers/StorageTiers"
    /** Options for {@link Storage `Storage`}. */
    export interface StorageOptions {
        /** The name of the storage. */
        name: string
        /** The description of the storage. */
        description: string
        /** The tiers of the storage. */
        tiers: StorageTiersOptions | StorageTiers
    }
    /**
     * Create a new storage.
     * @extends {{@link StorageTiers `StorageTiers`}
     */
    export class Storage extends StorageTiers {
        /** The name of the storage. */
        name: StorageOptions["name"]
        /**
         * The price of the storage.
         * @default
         * ```javascript
         * new Price({
         * 	gold: 0,
         * 	gems: 0
         * })
         * ```
         */
        price: Price
        /** The description of the storage. */
        description: StorageOptions["description"]
        /**
         * Construct a {@link Storage `Storage`} object.
         * @param options The tier options.
         */
        constructor(options: StorageOptions, passByReference?: boolean)
        /**
         * Construct a {@link Storage `Storage`} object.
         * @param storage A {@link Storage `Storage`} object.
         */
        constructor(storage: Storage, passByReference?: boolean)
        /**
         * Construct a {@link Storage `Storage`} object.
         * @param storage A {@link Storage `Storage`} object or tier options.
         */
        constructor(storage: Storage | StorageOptions, passByReference?: boolean)
        /**
         * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
         * @param storage The other {@link Storage `Storage`} object.
         * @returns `true` if both {@link Storage `Storage`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
         */
        protected similarEquals(storage: Storage): boolean
        /**
         * Determine if this {@link Storage `Storage`} object is equal to another {@link Storage `Storage`} object.
         * @param storage The other {@link Storage `Storage`} object.
         * @returns `true` if both storages are the equal, `false` otherwise.
         */
        equals(storage: Storage): boolean
        /**
         * Determine if this {@link Storage `Storage`} object is strictly equal to {@link Storage `Storage`} object.
         * @param storage The other {@link Storage `Storage`} object.
         * @returns `true` if both storages are strictly equal, `false` otherwise.
         */
        strictlyEquals(storage: Storage): boolean
    }
}
declare module "classes/Technology" {
    /**
     * @author Space.yg
     */
    import { Price } from "classes/Price"
    import { Base } from "classes/Base"
    import { ItemCollector } from "classes/buildings/ItemCollector"
    import { Tiers } from "classes/buildings/tiers/Tiers"
    import { type BaseOptions } from "classes/Base"
    import { type PriceOptions } from "classes/Price"
    import type { InputOptions } from "./Input.d.ts"
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
        #private
        /**
         * Total technologies that has been created
         * @readonly
         */
        static get amount(): number
        /**
         * All the technologies that has been created
         * @readonly
         */
        static readonly technologies: {
            [/** The name of the technology */ name: string]: Technology[]
        }
        /**
         * The image path of the Tech-tree.
         * @readonly
         */
        static get treeImage(): string
        /**
         * Total price of all technologies
         * @readonly
         */
        static get totalPrice(): PriceOptions
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
        get totalPrice(): Price
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
        /**
         * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
         * @param technology The {@link Technology `Technology`} object to check if it is needed to unlock this {@link Technology `Technology`} object.
         * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
         */
        private needsFunction
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
        /**
         * Determine if this technology and another technology are the equal
         * @param technology The other technology
         * @returns true if both technologies are the equal, false otherwise
         */
        equals(technology: Technology): boolean
        /**
         * Determine if this technology and another technology are the strictly equal
         * @param technology The other technology
         * @returns true if both technologies are the strictly equal, false otherwise
         */
        strictlyEquals(technology: Technology): boolean
    }
}
declare module "classes/buildings/Decoration" {
    /**
     * @author Space.yg
     */
    import { Base, BaseOptions } from "classes/Base"
    /**
     * Options for {@link Decoration `Decoration`}.
     * @extends {{@link BaseOptions `BaseOptions`}
     */
    export interface DecorationOptions extends BaseOptions {
    }
    /**
     * Create a new {@link Decoration `Decoration`}.
     * @extends {{@link Base `Base`}
     */
    export class Decoration extends Base {
        #private
        /**
         * Total decorations that has been created.
         * @readonly
         */
        static get amount(): number
        /** All the decorations that has been created. */
        /**
         * All the decorations that has been created.
         * @readonly
        */
        static readonly decorations: {
            [/** The name of the decoration */ name: string]: Decoration[]
        }
        /**
         * The description of all decoration builds.
         * @readonly
         */
        static get description(): string
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
    }
}
declare module "objects/currencies" {
    /**
     * @author Space.yg
     */
    import { Currency } from "classes/Currency"
    /** Gold. */
    export const gold: Currency
    /** Gem. */
    export const gem: Currency
}
declare module "objects/items" {
    /**
     * @author Space.yg
     */
    import { Item } from "classes/Item"
    export const woodLog: Item
    export const stone: Item
    export const ironOre: Item
    export const copperOre: Item
    export const coal: Item
    export const wolframite: Item
    export const woodPlank: Item
    export const sand: Item
    export const ironIngot: Item
    export const copperIngot: Item
    export const tungstenOre: Item
    export const graphite: Item
    export const woodFrame: Item
    export const copperWire: Item
    export const heatSink: Item
    export const ironGear: Item
    export const ironPlating: Item
    export const steel: Item
    export const steelRod: Item
    export const glass: Item
    export const condenserLens: Item
    export const carbonFiber: Item
    export const tungstenCarbide: Item
    export const coupler: Item
    export const concrete: Item
    export const metalFrame: Item
    export const industrialFrame: Item
    export const silicon: Item
    export const logicCircuit: Item
    export const nanoWire: Item
    export const turbocharger: Item
    export const electromagnet: Item
    export const battery: Item
    export const rotor: Item
    export const electricMotor: Item
    export const tank: Item
    export const matterCompressor: Item
    export const particleGlue: Item
    export const gyroscope: Item
    export const energyCube: Item
    export const computer: Item
    export const stabilizer: Item
    export const magneticFieldGenerator: Item
    export const quantumEntangler: Item
    export const electronMicroscope: Item
    export const superComputer: Item
    export const atomicLocator: Item
    export const matterDuplicator: Item
    export const earthToken: Item
    export const uraniumOre: Item
    export const enrichedUranium: Item
    export const emptyFuelCell: Item
    export const nuclearFuelCell: Item
    export const gemApple: Item
}
declare module "objects/buildings/decorations" {
    /**
     * @author Space.yg
     */
    import { Decoration } from "classes/buildings/Decoration"
    export const fence: Decoration
    export const concreteWall: Decoration
    export const prettyTree: Decoration
    export const firTree: Decoration
    export const birchTree: Decoration
    export const palmTree: Decoration
    export const rock1: Decoration
    export const rock2: Decoration
    export const rock3: Decoration
    export const hazardCone: Decoration
    export const brokenPipe: Decoration
    export const barrel: Decoration
    export const woodenCrate: Decoration
    export const gearStatue: Decoration
    export const circuitStatue: Decoration
    export const steelStatue: Decoration
    export const particleStatue: Decoration
    export const earthStatue: Decoration
    export const pumpkin: Decoration
    export const snowman: Decoration
}
declare module "objects/buildings/storages" {
    /**
     * @author Space.yg
     */
    import { Storage } from "classes/buildings/tiers/storage-tiers/Storage"
    /** *Storage buildings can only store one type of item at a time. Max capacity can be upgraded.* */
    export const storage: Storage
}
declare module "objects/buildings/item-collectors" {
    /**
     * @author Space.yg
     */
    import { ItemCollector } from "classes/buildings/ItemCollector"
    /** Item sent into the Research Lab can be used to unlock technology. Items not used for research will give you gold instead. */
    export const researchLab: ItemCollector
    /** Item sent into the Gold Vault converted into gold that can be used to build your factory. */
    export const goldVault: ItemCollector
}
declare module "objects/technologies" {
    /**
     * @author Space.yg
     */
    import { Technology } from "classes/Technology"
    export const manufacturerUpgrade3: Technology
    export const manufacturerUpgrade2: Technology
    export const manufacturerUpgrade1: Technology
    export const forgeUpgrade3: Technology
    export const forgeUpgrade2: Technology
    export const forgeUpgrade1: Technology
    export const industrialFactoryUpgrade3: Technology
    export const industrialFactoryUpgrade2: Technology
    export const industrialFactoryUpgrade1: Technology
    export const gemTree: Technology
    export const earthStatue: Technology
    export const particleStatue: Technology
    export const steelStatue: Technology
    export const circuitStatue: Technology
    export const gearStatue: Technology
    export const decorativeWalls: Technology
    export const factoryDecorations: Technology
    export const decorativeRocks: Technology
    export const festiveDecorations: Technology
    export const decorativeTrees: Technology
    export const roboticArmUpgrade3: Technology
    export const roboticArmUpgrade2: Technology
    export const roboticArmUpgrade1: Technology
    export const robotics: Technology
    export const machineShopUpgrade3: Technology
    export const machineShopUpgrade2: Technology
    export const machineShopUpgrade1: Technology
    export const storageUpgrade3: Technology
    export const storageUpgrade2: Technology
    export const storageUpgrade1: Technology
    export const storage: Technology
    export const furnaceUpgrade3: Technology
    export const furnaceUpgrade2: Technology
    export const furnaceUpgrade1: Technology
    export const nuclearPower: Technology
    export const coalPower: Technology
    export const workshopUpgrade3: Technology
    export const workshopUpgrade2: Technology
    export const workshopUpgrade1: Technology
    export const undergroundBeltUpgrade2: Technology
    export const undergroundBeltUpgrade1: Technology
    export const speedUpgradeXII: Technology
    export const speedUpgradeXI: Technology
    export const speedUpgradeX: Technology
    export const speedUpgradeIX: Technology
    export const speedUpgradeVIII: Technology
    export const speedUpgradeVII: Technology
    export const speedUpgradeVI: Technology
    export const speedUpgradeV: Technology
    export const speedUpgradeIV: Technology
    export const speedUpgradeIII: Technology
    export const speedUpgradeII: Technology
    export const speedUpgradeI: Technology
    export const advancedBelts: Technology
    export const uraniumProcessing: Technology
    export const extractorUpgrade4: Technology
    export const extractorUpgrade3: Technology
    export const extractorUpgrade2: Technology
    export const extractorUpgrade1: Technology
    export const earthTeleporter: Technology
    export const matterDuplication: Technology
    export const quantumEntanglement: Technology
    export const atomicLocator: Technology
    export const energyCube: Technology
    export const matterCompressor: Technology
    export const industrialFrame: Technology
    export const stabilizer: Technology
    export const superComputers: Technology
    export const turbocharger: Technology
    export const tungstenProduction: Technology
    export const microscopes: Technology
    export const nanoWire: Technology
    export const motors: Technology
    export const batteries: Technology
    export const concrete: Technology
    export const steelProduction: Technology
    export const goldVault: Technology
    export const computers: Technology
    export const circuitry: Technology
    export const sand: Technology
    export const metalFrames: Technology
    export const magnets: Technology
    export const metalWorking: Technology
    export const smelting: Technology
    export const woodFrame: Technology
    export const woodPlanks: Technology
    export const startingTech: Technology
}
declare module "index" {
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
            GitHub: string
            /** My Instagram account */
            Instagram: string
            /** My X (Twitter) account */
            X: string
        }
    }
    export { Area, AreaOptions, } from "classes/Area"
    export { Base, BaseOptions, } from "classes/Base"
    export { Currency } from "classes/Currency"
    export type { InputOptions, InputOptionsObject, InputPerMinOptions, } from "./classes/Input.d.ts"
    export { Item, ItemOptions, } from "classes/Item"
    export { Price, PriceOptions, } from "classes/Price"
    export { advancedWorldChoices, ResourcesOptions, Seed, SeedOptions, } from "classes/Seed"
    export { BuildTierOptions, Technology, TechnologyOptions, } from "classes/Technology"
    export { Decoration, DecorationOptions, } from "classes/buildings/Decoration"
    export { ItemCollector, ItemCollectorOptions, } from "classes/buildings/ItemCollector"
    export { PowerPlant, PowerPlantOptions, } from "classes/buildings/PowerPlant"
    export { Tier, TierOptions, } from "classes/buildings/tiers/Tier"
    export { Tiers, TiersOptions, } from "classes/buildings/tiers/Tiers"
    export { DistanceTier, DistanceTierContractors, DistanceTierExtra, DistanceTierFunctions, DistanceTierOptions, } from "classes/buildings/tiers/distance-tiers/DistanceTier"
    export { DistanceTiers, DistanceTiersOptions, } from "classes/buildings/tiers/distance-tiers/DistanceTiers"
    export { TransportationDistance, TransportationDistanceOptions, } from "classes/buildings/tiers/distance-tiers/TransportationDistance"
    export { OutputTier, OutputTierContractors, OutputTierExtra, OutputTierFunctions, OutputTierOptions, } from "classes/buildings/tiers/output-tiers/OutputTier"
    export { OutputTiers, OutputTiersOptions, } from "classes/buildings/tiers/output-tiers/OutputTiers"
    export { Factory, FactoryOptions, } from "classes/buildings/tiers/output-tiers/Factory"
    export { SpeedTier, SpeedTierContractors, SpeedTierExtra, SpeedTierFunctions, SpeedTierOptions, } from "classes/buildings/tiers/speed-tier/SpeedTier"
    export { SpeedTiers, SpeedTiersOptions, } from "classes/buildings/tiers/speed-tier/SpeedTiers"
    export { TransportationSpeed, TransportationSpeedOptions, } from "classes/buildings/tiers/speed-tier/TransportationSpeed"
    export { StorageTier, StorageTierContractors, StorageTierExtra, StorageTierFunctions, StorageTierOptions, } from "classes/buildings/tiers/storage-tiers/StorageTier"
    export { StorageTiers, StorageTiersOptions, } from "classes/buildings/tiers/storage-tiers/StorageTiers"
    export { Storage, StorageOptions, } from "classes/buildings/tiers/storage-tiers/Storage"
    export { Design, DesignOptions, } from "classes/designs/Design"
    export { Requirements, RequirementsOptions, RoboticArmTiers, } from "classes/designs/Requirements"
    export { NToM, NToMOptions, } from "classes/designs/NToM"
    export { RoboticArmTierDesign, RoboticArmTierDesignOptions, } from "classes/designs/RoboticArmTierDesign"
    export * as currencies from "objects/currencies"
    export * as items from "objects/items"
    export * as technologies from "objects/technologies"
    export * as decorations from "objects/buildings/decorations"
    export * as factories from "objects/buildings/factories"
    export * as itemCollectors from "objects/buildings/item-collectors"
    export * as powerPlants from "objects/buildings/power-plants"
    export * as others from "objects/buildings/storages"
    export * as transportations from "objects/buildings/transportations"
    export * as balancers from "objects/designs/balancers"
    export * as factorySplitters from "objects/designs/factory-splitters"
    export * as labBalancers from "objects/designs/lab-balancers"
    export * as splitters from "objects/designs/splitters"
    export * as valves from "objects/designs/valves"
}
declare module "test" { }
