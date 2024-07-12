import { StorageTiers } from "./StorageTiers.js";
export class Storage extends StorageTiers {
    name;
    price;
    description;
    constructor(optionsOrStorage, passByReference = true) {
        super(optionsOrStorage.tiers, passByReference);
        this.name = optionsOrStorage.name;
        this.price = this.tiers[this.minTierNum].price;
        this.description = optionsOrStorage.description;
        if (optionsOrStorage instanceof Storage)
            for (const tier in this.tiers)
                this.tiers[tier].image = optionsOrStorage.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`;
        else {
            if (optionsOrStorage.tiers instanceof StorageTiers)
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrStorage.tiers.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`;
            else
                for (const tier in this.tiers)
                    this.tiers[tier].image = optionsOrStorage.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`;
        }
    }
    similarEquals(storage) {
        return this.name === storage.name
            && this.price.equals(storage.price)
            && this.description === storage.description;
    }
    equals(storage) {
        return super.equals(storage)
            && this.similarEquals(storage);
    }
    strictlyEquals(storage) {
        return super.strictlyEquals(storage)
            && this.similarEquals(storage);
    }
}
