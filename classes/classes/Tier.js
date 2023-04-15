"use strict";

/**
 * @author Space.yg
 */

/**
 * The other options of the tier
 * @typedef {Object} otherTiersOptions
 * @property {Number} output The output increase added to the previous tier.
 * - Example: from tier 2 to tier 3 extractor, the increase is 1.333
 * @property {?Number} price The price of that tier
 * - Default is 0
 * @property {?String} image The URL to the image of that tier. If image is not provided, it will use the image from the previous tier.
 */

/**
 * The options of the tier
 * @typedef {{[tier: Number]: otherTiersOptions}} TiersOptions
 */

/** Make a new Tier */
export class Tier {

    /**
     * Constructs a Factory object
     * @param {Object} options The tier options
     * @param {TiersOptions} options.tiers The tier options
     */
    constructor(options) {
        //// Tier
        /** All tiers */
        this.tiers = options.tiers;
        // Check for empty properties
        var lastImage;
        for (const tier in this.tiers) {
            // Price
            if (this.tiers[tier].price === null | this.tiers[tier].price === undefined) this.tiers[tier].price = 0;
            // Image
            if (this.tiers[tier].image === null | this.tiers[tier].image === undefined) this.tiers[tier].image = lastImage;
            else {
                this.tiers[tier].image = new URL(this.tiers[tier].image);
                lastImage = this.tiers[tier].image;
            }
        }

        //// Maximum Tier
        /** Maximum tier */
        this.maxTier = 0;
        // Get max tier and check if tier is less than 1
        for (const tier in options.tiers) {
            if (tier < 0) throw new Error("Tier cannot be less than 0.");
            this.maxTier = Math.max(this.maxTier, tier);
        }
        // Check if total amount of tiers equals max tier
        if (this.maxTier !== Object.keys(options.tiers).length &&
            Object.keys(options.tiers).indexOf(0) !== -1 &&
            this.maxTier + 1 !== Object.keys(options.tiers).length)
            throw new Error("Total amount of tiers does not equal to the max tier.");
        
        /** Minimum tier */
        this.minTier = Number.MAX_SAFE_INTEGER;
        Object.keys(options.tiers).forEach(tier => this.minTier = Math.min(this.minTier, Number(tier)));
    }

    /**
     * Get the total price to get to a tier
     * @param {Number} tier The tier
     */
    getTotalPrice(tier) {
        var total = 0;
        if (tier < this.minTier) throw new Error("Tier cannot be less than minimum tier.");
        if (tier > this.maxTier) throw new Error("Tier cannot be greater than maximum tier.");
        for (let i = this.minTier; i <= tier; i++) total += this.tiers[i].price;
        return total;
    }
    /** Get the total price to get to the maximum tier */
    get maxPrice() { return this.getTotalPrice(this.maxTier); }

    /**
     * Get the total output of a tier
     * @param {Number} tier The tier
     */
    getTotalOutput(tier) {
        var total = 1;
        if (tier < this.minTier) throw new Error("Tier cannot be less than minimum tier.");
        if (tier > this.maxTier) throw new Error("Tier cannot be greater than maximum tier.");
        for (let i = this.minTier; i <= tier; i++) total *= this.tiers[i].output;
        return Math.round(total * 100_000_000_000_000) / 100_000_000_000_000;
    }
    /** Get the maximum output */
    get maxOutput() { return this.getTotalOutput(this.maxTier); }
}