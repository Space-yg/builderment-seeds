import { objToString } from "../../../helpers.js";
import { Price } from "../../Price.js";
export class Tier {
    price;
    image;
    constructor(optionsOrTier) {
        this.price = optionsOrTier.price instanceof Price ? optionsOrTier.price : typeof optionsOrTier.price === "undefined" ? new Price() : new Price(optionsOrTier.price);
        this.image = optionsOrTier.image ?? "./resources/";
        for (const option in optionsOrTier) {
            if ((["price", "image"].indexOf(option) + 1))
                continue;
            this[option] = optionsOrTier[option];
        }
    }
    toString(limit = 2) {
        if (limit <= 0)
            throw new Error("limit must be greater than 0");
        return objToString(this, limit);
    }
    similarEquals(tier) {
        return this.price.equals(tier.price);
    }
    equals(tier) {
        if (this === tier)
            return true;
        for (const property in this)
            if (!(["price", "image"].indexOf(property) + 1)) {
                const value = this[property];
                if (["string", "bigint", "boolean", "number", "undefined"].indexOf(typeof value) + 1 && value !== tier[property])
                    return false;
                else if (typeof value === "object") {
                    if (Object.hasOwn(value, "equals") && !value.equals(tier[property]))
                        return false;
                    else if (value !== tier[property])
                        return false;
                }
            }
        return this.similarEquals(tier);
    }
    strictlyEquals(tier) {
        if (this === tier)
            return true;
        for (const property in this)
            if (!(["price", "image"].indexOf(property) + 1)) {
                const value = this[property];
                if (["string", "bigint", "boolean", "number", "undefined"].indexOf(typeof value) + 1 && value !== tier[property])
                    return false;
                else if (typeof value === "object") {
                    if (Object.hasOwn(value, "strictlyEquals") && !value.strictlyEquals(tier[property]))
                        return false;
                    else if (Object.hasOwn(value, "equals") && !value.equals(tier[property]))
                        return false;
                    else if (value !== tier[property])
                        return false;
                }
            }
        return this.similarEquals(tier)
            && this.image === tier.image;
    }
}
