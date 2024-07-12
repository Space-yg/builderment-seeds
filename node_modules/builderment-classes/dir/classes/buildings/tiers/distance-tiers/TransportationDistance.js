import { DistanceTiers } from "./DistanceTiers.js";
class TransportationDistance extends DistanceTiers {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static transportationDistances = {};
    name;
    price;
    description;
    constructor(optionsOrTransportationDistance, passByReference = true) {
        super(optionsOrTransportationDistance.tiers, passByReference);
        this.name = optionsOrTransportationDistance.name;
        this.price = this.tiers[this.minTierNum].price;
        this.description = optionsOrTransportationDistance.description;
        if (optionsOrTransportationDistance instanceof TransportationDistance)
            for (const tier in this.tiers)
                this.tiers[tier].image = optionsOrTransportationDistance.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name}.png`;
        else {
            if (optionsOrTransportationDistance.tiers instanceof DistanceTiers)
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrTransportationDistance.tiers.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name}.png`;
            else
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrTransportationDistance.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name}.png`;
        }
        TransportationDistance.#amount++;
        TransportationDistance.transportationDistances[optionsOrTransportationDistance.name] = this;
    }
    similarEquals(transportationDistance) {
        return this.name === transportationDistance.name
            && this.price.equals(transportationDistance.price)
            && this.description === transportationDistance.description;
    }
    equals(transportationDistance) {
        return super.equals(transportationDistance)
            && this.similarEquals(transportationDistance);
    }
    strictlyEquals(transportationDistance) {
        return super.strictlyEquals(transportationDistance)
            && this.similarEquals(transportationDistance);
    }
}
export { TransportationDistance };
