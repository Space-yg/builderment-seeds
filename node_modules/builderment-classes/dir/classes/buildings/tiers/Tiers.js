import { Tier } from "./Tier.js";
import { Price } from "../../Price.js";
import { objToString } from "../../../helpers.js";
export class Tiers {
    tiers;
    get maxPrice() { return this.getTotalPrice(this.maxTierNum); }
    get maxTierNum() { return Math.max(...Object.keys(this.tiers).map(tier => +tier)); }
    get minTierNum() { return Math.min(...Object.keys(this.tiers).map(tier => +tier)); }
    get maxTier() { return this.tiers[this.maxTierNum]; }
    get minTier() { return this.tiers[this.minTierNum]; }
    constructor(optionsOrTiers, passByReference = true) {
        if (optionsOrTiers instanceof Tiers) {
            if (passByReference)
                this.tiers = optionsOrTiers.tiers;
            else {
                this.tiers = {};
                for (const tier in optionsOrTiers.tiers)
                    this.tiers[tier] = new Tier(optionsOrTiers.tiers[tier]);
            }
        }
        else {
            const minTier = Math.min(...Object.keys(optionsOrTiers).map(tier => +tier));
            if (parseInt(minTier + "") !== minTier)
                throw new Error(`All tiers must be integers.`);
            this.tiers = {};
            const maxTier = Math.max(...Object.keys(optionsOrTiers).map(tier => +tier));
            for (let i = minTier; i <= maxTier; i++) {
                const tier = optionsOrTiers[i];
                if (!tier)
                    throw new Error(`The number ${i} is missing from the tiers. The tiers must include all integers from the smallest value (${this.minTierNum}) to the largest value (${this.maxTierNum}).`);
                if (tier instanceof Tier)
                    this.tiers[i] = passByReference ? tier : new Tier(tier);
                else
                    this.tiers[i] = new Tier(tier);
            }
        }
    }
    toString(limit = 2) {
        if (limit <= 0)
            throw new Error("limit must be greater than 0");
        return objToString(this, limit);
    }
    hasN(tier, error = false) {
        if (!(tier in this.tiers)) {
            if (!error)
                return false;
            if (tier < this.minTierNum)
                throw new Error(`"tier" (${tier}) cannot be less than minimum tier (${this.minTierNum}).`);
            if (tier > this.minTierNum)
                throw new Error(`"tier" (${tier}) cannot be greater than maximum tier (${this.maxTierNum}).`);
            throw new Error(`"tier" (${tier}) cannot be a non-integer number.`);
        }
        return true;
    }
    has(tier) {
        for (const t in this.tiers)
            if (this.tiers[t].equals(tier))
                return true;
        return false;
    }
    strictlyHas(tier) {
        for (const t in this.tiers)
            if (this.tiers[t].strictlyEquals(tier))
                return true;
        return false;
    }
    hasReference(tier) {
        for (const t in this.tiers)
            if (this.tiers[t] === tier)
                return true;
        return false;
    }
    getTotalPrice(tier) {
        this.hasN(tier, true);
        const total = new Price();
        for (let i = this.minTierNum; i <= tier; i++)
            total.add(this.tiers[i].price);
        return total;
    }
    similarEquals(tiers) {
        if (this === tiers)
            return true;
        return Object.keys(this.tiers).length === Object.keys(tiers.tiers).length;
    }
    equals(tiers) {
        if (!this.similarEquals(tiers))
            return false;
        for (const tier in this.tiers)
            if (!this.tiers[tier].equals(tiers.tiers[tier]))
                return false;
        return true;
    }
    strictlyEquals(tiers) {
        if (!this.similarEquals(tiers))
            return false;
        for (const tier in this.tiers)
            if (!this.tiers[tier].strictlyEquals(tiers.tiers[tier]))
                return false;
        return true;
    }
}
