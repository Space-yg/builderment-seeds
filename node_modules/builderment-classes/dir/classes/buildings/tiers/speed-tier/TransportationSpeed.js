import { SpeedTiers } from "./SpeedTiers.js";
class TransportationSpeed extends SpeedTiers {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static transportationSpeeds = {};
    name;
    price;
    description;
    constructor(optionsOrTransportation, passByReference = true) {
        super(optionsOrTransportation.tiers, passByReference);
        this.name = optionsOrTransportation.name;
        this.price = this.tiers[this.minTierNum].price;
        this.description = optionsOrTransportation.description;
        if (optionsOrTransportation instanceof TransportationSpeed)
            for (const tier in this.tiers)
                this.tiers[tier].image = optionsOrTransportation.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`;
        else {
            if (optionsOrTransportation.tiers instanceof SpeedTiers)
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrTransportation.tiers.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`;
            else
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrTransportation.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`;
        }
        TransportationSpeed.#amount++;
        TransportationSpeed.transportationSpeeds[optionsOrTransportation.name] = this;
    }
    similarEquals(transportationSpeed) {
        return this.name === transportationSpeed.name
            && this.price.equals(transportationSpeed.price)
            && this.description === transportationSpeed.description;
    }
    equals(transportationSpeed) {
        return super.equals(transportationSpeed)
            && this.similarEquals(transportationSpeed);
    }
    strictlyEquals(transportationSpeed) {
        return super.strictlyEquals(transportationSpeed)
            && this.similarEquals(transportationSpeed);
    }
}
export { TransportationSpeed };
