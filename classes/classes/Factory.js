"use strict";

/**
 * @author Space.yg
 */

import { Tier } from "./Tier.js";
/**
 * @typedef {import("./Tier.js").TiersOptions} TiersOptions The options of the tier
 */

/**
 * The options of the input type
 * @typedef {Object} FactoryOptions
 * @property {String} name The name of the factory
 * @property {Number} inputs The amount of inputs of the factory
 * @property {String} description The description of the factory
 * @property {TiersOptions} tiers The tiers of the factory
 */

/** Make a new factory */
export class Factory extends Tier {
    
    /** Total factories that has been created */
    static #amount = 0;
    /**
     * Total factories that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    
    /** 
     * All the factories that has been created 
     * @type {{[name: string]: Factory}}
     */
    static #factories = {};
    /** 
     * All the factories that has been created 
     * @readonly
     */
    static get factories() { return this.#factories; }

    /**
     * Constructs a Factory object
     * @param {FactoryOptions} options The tier options
     */
    constructor(options) {
        super(options);
        /** The name of the factory */
        this.name = options.name;
        /** The price of the first tier of the factory */
        this.price = options.tiers[1].price;
        /** The amount of inputs of the factory */
        this.inputs = options.inputs;
        /** The description of the factory */
        this.description = options.description;

        Factory.#amount++;
        Factory.#factories[options.name] = this;
    }
};