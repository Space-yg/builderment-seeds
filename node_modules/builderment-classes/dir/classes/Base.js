import { Price } from "./Price.js";
import { objToString } from "../helpers.js";
class Base {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static bases = {};
    name;
    price;
    image;
    constructor(baseOrOptions, passByReference = true) {
        this.name = baseOrOptions.name;
        if (passByReference && baseOrOptions instanceof Base)
            this.price = baseOrOptions.price;
        else
            this.price = new Price(baseOrOptions.price);
        this.image = baseOrOptions.image ?? "./resources/";
        Base.#amount++;
        if (typeof Base.bases[baseOrOptions.name] === "undefined")
            Base.bases[baseOrOptions.name] = [this];
        else
            Base.bases[baseOrOptions.name].push(this);
    }
    toString(limit = 2) {
        if (limit <= 0)
            throw new Error("limit must be greater than 0");
        return objToString(this, limit);
    }
    equals(base) {
        if (this === base)
            return true;
        return this.name === base.name
            && this.price.equals(base.price);
    }
    strictlyEquals(base) {
        return this.equals(base)
            && this.image === base.image;
    }
}
export { Base };
