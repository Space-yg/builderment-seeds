"use strict";

/**
 * @author Space.yg
 */

import { Tier } from "./Tier.js";
/**
 * @typedef {import("./Tier.js").TiersOptions} TiersOptions The options of the tier
 */

/**
 * The options of the transportation type
 * @typedef {Object} TransportationOptions
 * @property {String} name The name of the transportation
 * @property {String} description The description of the transportation
 * @property {TiersOptions} tiers The tiers of the transportation
 */

/** Make a new transportation */
export class Transportation extends Tier {

    /** Total transportations that has been created*/
    static #amount = 0;
    /**
     * Total transportations that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    
    /** 
     * All the transportations that has been created
     * @type {{[name: string]: Transportation}}
     */
    static #transportations = {};
    /**
     * All the transportations that has been created
     * @readonly
     */
    static get transportations() { return this.#transportations; }

    /**
     * Constructs a Transportation object
     * @param {TransportationOptions} options The tier options
     */
    constructor(options) {
        super(options);
        /** The name of the transportation */
        this.name = options.name;
        /** The price of the first tier of the transportation */
        this.price = options.tiers[this.minTier].price;
        /** The description of the transportation */
        this.description = options.description;
        
        Transportation.#amount++;
        Transportation.#transportations[options.name] = this;
    }
}