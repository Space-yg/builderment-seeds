"use strict";

/**
 * @author Space.yg
 */

/**
 * The base options
 * @typedef {Object} BaseOptions
 * @property {String} name The name
 * @property {Number} price The price
 * @property {String} image The URL to the image
 */

/** The base of some classes */
export class Base {

    /**
     * Total bases that has been created
     * @type {Number}
     */
    static #amount = 0;
    /**
     * Total bases that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }

    /**
     * All the bases that has been created 
     * @type {{[name: string]: Base[]}}
     */
    static #bases = {};
    /**
     * All the bases that has been created 
     * @readonly
     */
    static get bases() { return this.#bases; }

    /**
     * Constructs a Base
     * @param {BaseOptions} options The Base options
     */
    constructor(options) {
        /** The name */
        this.name = options.name;
        /** The price */
        this.price = options.price;
        /** The URL to the image */
        this.image = new URL(options.image);

        Base.#amount++;
        if (!Base.#bases[options.name]) Base.#bases[options.name] = [this];
        else Base.#bases[options.name].push(this);
    }
}
