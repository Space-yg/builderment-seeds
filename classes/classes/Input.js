"use strict";

/**
 * @author Space.yg
 */

import { Item } from "./Item.js";

/**
 * The new options of the tier
 * @typedef {Object} InputOptions
 * @property {Item} item The item of the input
 * @property {Number} amount The amount needed to make the parent item
 */

/**
 * @typedef {Object} inputPerMin Total input/min in tier 1
 * @property {Number} inputPerMin Total input/min in tier 1
 */

/**
 * The options of the input type
 * @typedef {{[name: string]: InputOptions & inputPerMin}} InputOptionsObject
 */