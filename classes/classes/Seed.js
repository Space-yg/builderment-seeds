"use strict";

/**
 * @author Space.yg
 */

import { Item } from "./Item.js";
import { extractor } from "../objects/factories.js";

/**
 * The resources type for all resources in a seed
 * @typedef {Object} ResourcesOptions
 * @property {Number} woodLog The amount of Wood Log deposits in the seed
 * @property {Number} stone The amount of Stone deposits in the seed
 * @property {Number} ironOre The amount of Iron Ore deposits in the seed
 * @property {Number} copperOre The amount of Copper Ore deposits in the seed
 * @property {Number} coal The amount of Coal deposits in the seed
 * @property {Number} wolframite The amount of Wolframite deposits in the seed
 * @property {Number} uraniumOre The amount of Uranium Ore deposits in the seed
 */

/**
 * The resources type for all resources in a seed
 * @typedef {Object} OptionalResourcesOptions
 * @property {Number} [woodLog] The amount of Wood Log deposits in the seed
 * @property {Number} [stone] The amount of Stone deposits in the seed
 * @property {Number} [ironOre] The amount of Iron Ore deposits in the seed
 * @property {Number} [copperOre] The amount of Copper Ore deposits in the seed
 * @property {Number} [coal] The amount of Coal deposits in the seed
 * @property {Number} [wolframite] The amount of Wolframite deposits in the seed
 * @property {Number} [uraniumOre] The amount of Uranium Ore deposits in the seed
 */

/**
 * The options of the item type
 * @typedef {Object} SeedOptions
 * @property {ResourcesOptions} resources The resources in a seed
 * @property {50 | 75 | 100 | 150 | 200} [worldSize] The world size of the seed
 * - Default: 100
 * @property {50 | 75 | 100 | 150 | 200} [resourceAmount] The resource amount of the seed
 * - Default: 100
 * @property {String} [seed] The seed
 */

/** Make a new seed */
export class Seed {

    /** Total Items that has been created */
    static #amount = 0;
    /**
     * Total Items that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }

    /** 
     * All the items that has been created 
     * @type {{[seed: string]: Seed}}
     */
    static #seeds = {};
    /**
     * Total Items that has been created
     * @readonly
     */
    static get seeds() { return this.#seeds; }

    /**
     * Construct a Seed object
     * @param {SeedOptions} options The Item options
     */
    constructor(options) {
        /** The resources in a seed */
        this.resources = options.resources;
        /**
         * The world size of the seed
         * - Default: 100
         */
        this.worldSize = options.worldSize ?? 100;
        /**
         * The resource amount of the seed
         * - Default: 100
         */
        this.resourceAmount = options.resourceAmount ?? 100;
        /** The seed */
        this.seed = options.seed;

        if (options.seed) {
            Seed.#amount++;
            Seed.#seeds[options.seed] = this;
        }
    }

    /**
     * Get the maximum amount of an item that can be made in a seed
     * @param {Item | String} item The item of name of the item to get the max of
     */
    getMax(item) {
        var i;
        if (typeof item === "string") {
            for (const name in Item.items) if (item === name) {
                i = Item.items[item].getAmountOfBaseResources();
                break;
            }
            if (!i) throw new Error("Unknown item.");
        } else i = item.getAmountOfBaseResources();
        var maximum = Number.MAX_SAFE_INTEGER;
        for (const key in object) maximum = Math.min(maximum, this[key] * extractor.maxOutput / i[Item.variableNameToItemName[key]]);
        return maximum;
    }
}