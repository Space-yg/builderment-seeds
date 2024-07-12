import { OutputTiers } from "./OutputTiers.js";
class Factory extends OutputTiers {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static factories = {};
    name;
    price;
    inputs;
    description;
    constructor(optionsOrFactory, passByReference = true) {
        super(optionsOrFactory.tiers, passByReference);
        this.name = optionsOrFactory.name;
        this.price = this.tiers[this.minTierNum].price;
        this.inputs = optionsOrFactory.inputs;
        this.description = optionsOrFactory.description;
        if (optionsOrFactory instanceof Factory)
            for (const tier in this.tiers)
                this.tiers[tier].image = optionsOrFactory.tiers[tier].image ?? this.tiers[tier].image + `${this.name} Tier ${tier}.png`;
        else {
            if (optionsOrFactory.tiers instanceof OutputTiers)
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrFactory.tiers.tiers[tier].image ?? this.tiers[tier].image + `${this.name} Tier ${tier}.png`;
            else
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrFactory.tiers[tier].image ?? this.tiers[tier].image + `factories/${this.name} Tier ${tier}.png`;
        }
        Factory.#amount++;
        Factory.factories[optionsOrFactory.name] = this;
    }
    similarEquals(factory) {
        return this.name === factory.name
            && this.description === factory.description
            && this.inputs === factory.inputs;
    }
    equals(factory) {
        return super.equals(factory)
            && this.similarEquals(factory);
    }
    strictlyEquals(factory) {
        return super.strictlyEquals(factory)
            && this.similarEquals(factory);
    }
}
export { Factory };
