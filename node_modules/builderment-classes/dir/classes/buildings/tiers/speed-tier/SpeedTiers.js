import { Tiers } from "../Tiers.js";
import { SpeedTier } from "./SpeedTier.js";
export class SpeedTiers extends Tiers {
    get maxTier() { return this.tiers[this.maxTierNum]; }
    get minTier() { return this.tiers[this.minTierNum]; }
    constructor(optionsOrStorageTiers, passByReference = true) {
        super(optionsOrStorageTiers, passByReference);
        if (optionsOrStorageTiers instanceof SpeedTiers) {
            if (passByReference)
                this.tiers = optionsOrStorageTiers.tiers;
            else
                for (const tier in this.tiers)
                    this.tiers[tier] = new SpeedTier(optionsOrStorageTiers.tiers[tier]);
        }
        else {
            for (const tier in this.tiers) {
                const t = optionsOrStorageTiers[tier];
                if (t instanceof SpeedTier)
                    this.tiers[tier] = passByReference ? t : new SpeedTier(t);
                else
                    this.tiers[tier] = new SpeedTier(t);
            }
        }
    }
    similarEquals(speedTiers) {
        for (const tier in this.tiers)
            if (this.tiers[tier].speed !== speedTiers.tiers[tier].speed)
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
