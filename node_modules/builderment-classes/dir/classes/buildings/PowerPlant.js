import { Area } from "../Area.js";
import { Base } from "../Base.js";
class PowerPlant extends Base {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static powerPlants = {};
    static get description() { return "Increases the speed of nearby factories while consuming the input items. Effect does not stack with other power plants."; }
    input;
    speed;
    duration;
    region;
    constructor(optionsOrPowerPlant, passByReference = true) {
        super(optionsOrPowerPlant, passByReference);
        this.image = optionsOrPowerPlant.image ?? this.image + `power-plants/${this.name}.png`;
        this.input = optionsOrPowerPlant.input;
        this.speed = optionsOrPowerPlant.speed;
        this.duration = optionsOrPowerPlant.duration;
        this.region = passByReference && optionsOrPowerPlant.region instanceof Area ? optionsOrPowerPlant.region : new Area(optionsOrPowerPlant.region);
        PowerPlant.#amount++;
        PowerPlant.powerPlants[optionsOrPowerPlant.name] = this;
    }
    similarEquals(powerPlant) {
        if (typeof this.input === "undefined") {
            if (typeof powerPlant.input !== "undefined")
                return false;
        }
        else if (typeof powerPlant.input === "undefined")
            return false;
        return this.input.amount === powerPlant.input.amount
            && this.input.inputPerMin === powerPlant.input.inputPerMin
            && this.speed === powerPlant.speed
            && this.duration === powerPlant.duration
            && this.region.width === powerPlant.region.width
            && this.region.height === powerPlant.region.height;
    }
    equals(powerPlant) {
        return super.equals(powerPlant)
            && this.similarEquals(powerPlant)
            && this.input.item.equals(powerPlant.input.item);
    }
    strictlyEquals(powerPlant) {
        return super.strictlyEquals(powerPlant)
            && this.similarEquals(powerPlant)
            && this.input.item.strictlyEquals(powerPlant.input.item);
    }
}
export { PowerPlant };
