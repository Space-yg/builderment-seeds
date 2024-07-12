import { Tiers } from "../Tiers.js";
import { OutputTier } from "./OutputTier.js";
export class OutputTiers extends Tiers {
    get maxTier() { return this.tiers[this.maxTierNum]; }
    get minTier() { return this.tiers[this.minTierNum]; }
    constructor(optionsOrOutputTiers, passByReference = true) {
        super(optionsOrOutputTiers, passByReference);
        if (optionsOrOutputTiers instanceof OutputTiers) {
            if (passByReference)
                this.tiers = optionsOrOutputTiers.tiers;
            else
                for (const tier in this.tiers)
                    this.tiers[tier] = new OutputTier(optionsOrOutputTiers.tiers[tier]);
        }
        else {
            for (const tier in this.tiers) {
                const t = optionsOrOutputTiers[tier];
                if (t instanceof OutputTier)
                    this.tiers[tier] = passByReference ? t : new OutputTier(t);
                else
                    this.tiers[tier] = new OutputTier(t);
            }
        }
    }
    similarEquals(outputTiers) {
        for (const tier in this.tiers)
            if (this.tiers[tier].output !== outputTiers.tiers[tier].output)
                return false;
        return true;
    }
    equals(outputTiers) {
        return super.equals(outputTiers)
            && this.similarEquals(outputTiers);
    }
    strictlyEquals(outputTiers) {
        return super.strictlyEquals(outputTiers)
            && this.similarEquals(outputTiers);
    }
}
