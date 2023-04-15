"use strict";

/**
 * @author Space.yg
 */

import { Base } from "./Base.js";
/**
 * @typedef {import("./Base.js").BaseOptions} BaseOptions The base options
 */

/** Make new a Decoration */
export class Decoration extends Base {

    /** Total decorations that has been created */
    static #amount = 0;
    /**
     * Total decorations that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }

    /** 
     * All the decorations that has been created
     * @type {Object<string, Decoration[]>}
     */
    static #decorations = {};
    /** 
     * All the decorations that has been created
     * @readonly
     */
    static get decorations() { return this.#decorations; }

    /** 
     * The description of all decoration builds
     * @readonly
     */
    static get description() { return "Purely decorative, make your factory one of a kind."; }

    /**
     * Constructs a Decoration object
     * @param {BaseOptions} options The Base options
     */
    constructor(options) {
        super(options);

        Decoration.#amount++;
        if (!Decoration.#decorations[options.name]) Decoration.#decorations[options.name] = [this];
        else Decoration.#decorations[options.name].push(this);
    }
}