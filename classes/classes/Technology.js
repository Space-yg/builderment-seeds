"use strict";

/**
 * @author Space.yg
 */

import { Base } from "./Base.js";
import { storage, goldVault, researchLab } from "../objects/other.js";
import { Tier } from "./Tier.js";
import { Transportation } from "./Transportation.js";
/**
 * @typedef {import("./Base.js").BaseOptions} BaseOptions The base options
 */

/**
 * Upgrade Tier upgrade type
 * @typedef {Object} UpgradeOptions
 * @property {Factory | Transportation | storage} build The factory that will unlock it's tier
 * @property {Number} tier The tier of the factory it will be unlocked at
 */

/**
 * The new options of the technology type
 * @typedef {Object} newTechnologyOptions
 * @property {{item: Item, amount: Number}[]} resourcesNeeded The items needed to unlock this technology
 * @property {(Base | Tier | UpgradeOptions | storage | goldVault | researchLab)[]} unlocks The items, factories, or builds that this technology unlocks
 * @property {Technology[]} unlocksTechnologies The technologies that this technology unlocks
 */

/**
 * The options of the technology type
 * @typedef {BaseOptions & newTechnologyOptions} TechnologyOptions
 */

export class Technology extends Base {

    /** Total technologies that has been created */
    static #amount = 0;
    /**
     * Total technologies that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }

    /** 
     * All the technologies that has been created
     * @type {{[name: string]: Technology}}
     */
    static #technologies = {};
    /**
     * All the technologies that has been created
     * @readonly
     */
    static get technologies() { return this.#technologies; }

    /** The image URl of the Tech-tree */
    static get tree() { return new URL("https://static.wikia.nocookie.net/builderment/images/b/be/Tech_tree2.png"); }

    /**
     * Constructs a Technology object
     * @param {TechnologyOptions} options The Item options
     */
    constructor(options) {
        super(options);
        /**
         * The items needed to unlock this technology
         * @type {InputOptionsObject}
         */
        this.resourcesNeeded = {};
        for (const input of options.resourcesNeeded) this.resourcesNeeded[input.item.name] = input;
        /** The items, factories, or builds that this technology unlocks */
        this.unlocks = options.unlocks;
        /** The technologies that this technology unlocks */
        this.unlocksTechnologies = options.unlocksTechnologies;

        Technology.#amount++;
        Technology.#technologies[options.name] = this;
    }
}