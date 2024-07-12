import { BeltSpeeds, UndergroundBeltDistances } from "../../objects/buildings/transportations.js";
export const RoboticArmTiers = [0, 1, 2, 3, 4];
function arrToString(arr) {
    if (arr.length === 1)
        return arr[0];
    if (arr.length === 2)
        return `${arr[0]} and ${arr[1]}`;
    var s = "";
    arr.forEach((element, i) => s += element + (i === arr.length - 1 ? "" : i === arr.length - 2 ? ", and " : ", "));
    return s;
}
export class Requirements {
    minBeltSpeed;
    maxBeltSpeed;
    tunnelLength;
    roboticArmTier;
    constructor(optionsOrRequirements = {}) {
        this.minBeltSpeed = optionsOrRequirements.minBeltSpeed ?? BeltSpeeds[0];
        this.maxBeltSpeed = optionsOrRequirements.maxBeltSpeed ?? BeltSpeeds.at(-1);
        if (this.minBeltSpeed > this.maxBeltSpeed)
            throw new Error(`minBeltSpeed (${this.minBeltSpeed}) cannot be greater than maxBeltSpeed (${this.maxBeltSpeed})`);
        if (typeof optionsOrRequirements.tunnelLength === "undefined")
            this.tunnelLength = UndergroundBeltDistances[0];
        else if (UndergroundBeltDistances.every(length => optionsOrRequirements.tunnelLength !== length))
            throw new Error(`tunnelLength (${optionsOrRequirements.tunnelLength}) is not a valid length. Valid numbers include the following: ${arrToString([...UndergroundBeltDistances])}`);
        else
            this.tunnelLength = optionsOrRequirements.tunnelLength;
        if (typeof optionsOrRequirements.roboticArmTier === "undefined")
            this.roboticArmTier = RoboticArmTiers[0];
        else if (RoboticArmTiers.every(length => optionsOrRequirements.roboticArmTier !== length))
            throw new Error(`roboticArmTier (${optionsOrRequirements.roboticArmTier}) is not a valid tier. Valid numbers include the following: ${arrToString([...RoboticArmTiers])}`);
        else
            this.roboticArmTier = optionsOrRequirements.roboticArmTier;
    }
    toString() {
        return `{\n\tminBeltSpeed: ${this.minBeltSpeed}\n\tmaxBeltSpeed: ${this.maxBeltSpeed}\n\ttunnelLength: ${this.tunnelLength}\n\troboticArmTier: ${this.roboticArmTier}\n}`;
    }
    equals(requirements) {
        return this.minBeltSpeed === requirements.minBeltSpeed
            && this.maxBeltSpeed === requirements.maxBeltSpeed
            && this.tunnelLength === requirements.tunnelLength
            && this.roboticArmTier === requirements.roboticArmTier;
    }
}
