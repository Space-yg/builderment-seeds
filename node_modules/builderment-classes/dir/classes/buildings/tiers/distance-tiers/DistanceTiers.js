import { Tiers } from "../Tiers.js";
import { DistanceTier } from "./DistanceTier.js";
export class DistanceTiers extends Tiers {
    constructor(optionsOrStorageTiers, passByReference = true) {
        super(optionsOrStorageTiers, passByReference);
        if (optionsOrStorageTiers instanceof DistanceTiers) {
            if (passByReference)
                this.tiers = optionsOrStorageTiers.tiers;
            else
                for (const tier in this.tiers)
                    this.tiers[tier] = new DistanceTier(optionsOrStorageTiers.tiers[tier]);
        }
        else {
            for (const tier in this.tiers) {
                const t = optionsOrStorageTiers[tier];
                if (t instanceof DistanceTier)
                    this.tiers[tier] = passByReference ? t : new DistanceTier(t);
                else
                    this.tiers[tier] = new DistanceTier(t);
            }
        }
    }
    similarEquals(speedTiers) {
        for (const tier in this.tiers)
            if (this.tiers[tier].distance !== speedTiers.tiers[tier].distance)
                return false;
        return true;
    }
    equals(speedTiers) {
        return super.equals(speedTiers)
            && this.similarEquals(speedTiers);
    }
    strictlyEquals(speedTiers) {
        return super.strictlyEquals(speedTiers)
            && this.similarEquals(speedTiers);
    }
}
