"use strict";

/**
 * @author Space.yg
 */

import { Base } from "./Base.js";
/**
 * @typedef {import("./Base.js").BaseOptions} BaseOptions The base options
 * @typedef {import("./Input.js").InputOptions} InputOptions The new options of the tier
 */

/**
 * @typedef {Object} regionOptions The region of the power plant boost
 * @property {Number} width The width of the region of the power plant boost
 * @property {Number} height The height of the region of the power plant boost
 */
/**
 * The new options of the power plant type
 * @typedef {Object} newPowerPlantOptions
 * @property {InputOptions} input The input needed to activate the power plant
 * @property {Number} speed The boost speed that the power plant gives
 * @property {Number} duration The amount of seconds the power plant is active before needing to recharge
 * @property {regionOptions} region The region of the power plant boost
 */

/**
 * The options of the power plant type
 * @typedef {BaseOptions & newPowerPlantOptions} PowerPlantOptions
 */

/** Make a new power plant */
export class PowerPlant extends Base {

    /** Total power plants that has been created */
    static #amount = 0;
    /**
     * Total power plants that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }

    /** 
     * All the power plants that has been created
     * @type {{[name: string]: PowerPlant}}
     */
    static #powerPlants = {};
    /** 
     * All the power plants that has been created
     * @readonly
     */
    static get powerPlants() { return this.#powerPlants; }

    /** The description of all power plants */
    static get description() { return "Increases the speed of nearby factories while consuming the input items. Effect does not stack with other power plants."; }

    /**
     * Constructs a Power Plant object
     * @param {PowerPlantOptions} options The Item options
     */
    constructor(options) {
        super(options);
        /** The input needed to activate the power plant */
        this.input = options.input;
        /** The boost speed that the power plant gives */
        this.speed = options.speed;
        /** The amount of seconds the power plant is active before needing to recharge */
        this.duration = options.duration;
        /** The region of the power plant boost */
        this.region = options.region;

        PowerPlant.#amount++;
        PowerPlant.#powerPlants[options.name] = this;
    }
}