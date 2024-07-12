import { Tiers } from "../Tiers.js";
import { StorageTier } from "./StorageTier.js";
export class StorageTiers extends Tiers {
    get maxTier() { return this.tiers[this.maxTierNum]; }
    get minTier() { return this.tiers[this.minTierNum]; }
    constructor(optionsOrStorageTiers, passByReference = true) {
        super(optionsOrStorageTiers, passByReference);
        if (optionsOrStorageTiers instanceof StorageTiers) {
            if (passByReference)
                this.tiers = optionsOrStorageTiers.tiers;
            else
                for (const tier in this.tiers)
                    this.tiers[tier] = new StorageTier(optionsOrStorageTiers.tiers[tier]);
        }
        else {
            for (const tier in this.tiers) {
                const t = optionsOrStorageTiers[tier];
                if (t instanceof StorageTier)
                    this.tiers[tier] = passByReference ? t : new StorageTier(t);
                else
                    this.tiers[tier] = new StorageTier(t);
            }
        }
    }
    similarEquals(storageTiers) {
        for (const tier in this.tiers)
            if (this.tiers[tier].storage !== storageTiers.tiers[tier].storage)
                return false;
        return true;
    }
    equals(storageTiers) {
        return super.equals(storageTiers)
            && this.similarEquals(storageTiers);
    }
    strictlyEquals(storageTiers) {
        return super.strictlyEquals(storageTiers)
            && this.similarEquals(storageTiers);
    }
}
