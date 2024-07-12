import { Design } from "./Design.js";
class RoboticArmTierDesign extends Design {
    static #amount = 0;
    static get amount() { return RoboticArmTierDesign.#amount; }
    static roboticArmTierDesigns = {};
    constructor(objectOrOptions, passByReference = true) {
        if (objectOrOptions instanceof RoboticArmTierDesign)
            super(objectOrOptions, passByReference);
        else
            super({
                ...objectOrOptions,
                name: typeof objectOrOptions.name === "undefined" ? `${objectOrOptions.size.width}x${objectOrOptions.size.height}` : objectOrOptions.name,
            });
        RoboticArmTierDesign.#amount++;
        if (typeof RoboticArmTierDesign.roboticArmTierDesigns[this.category] === "undefined")
            RoboticArmTierDesign.roboticArmTierDesigns[this.category] = {};
        if (typeof RoboticArmTierDesign.roboticArmTierDesigns[this.category][this.requirements.roboticArmTier] === "undefined")
            RoboticArmTierDesign.roboticArmTierDesigns[this.category][this.requirements.roboticArmTier] = [];
        RoboticArmTierDesign.roboticArmTierDesigns[this.category][this.requirements.roboticArmTier].push(this);
    }
}
export { RoboticArmTierDesign };
