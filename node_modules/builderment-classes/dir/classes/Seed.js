import { Item } from "./Item.js";
import { extractor, extractorOutputPerMin, uraniumExtractor, uraniumExtractorOutputPerMin } from "../objects/buildings/factories.js";
import { objToString } from "../helpers.js";
function hexByteValue(array) {
    var hex = "";
    array.forEach(num => {
        var h = num.toString(16);
        hex += (h.length !== 2 ? "0" : "") + h;
    });
    return parseInt(hex, 16);
}
class Seed {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static seeds = {};
    static getLimitedDeposits(item, resources) {
        var baseResources = Item.getAmountOfBaseResources(item);
        const limitedAmounts = {};
        for (const key in baseResources) {
            const k = key;
            if (!resources[k])
                throw new Error(`Resource (${k}) cannot be 0, null, or undefined`);
            limitedAmounts[k] = resources[k] / baseResources[k];
        }
        const amounts = [];
        for (let i = Object.keys(limitedAmounts).length; i > 0; i--) {
            const min = Math.min(...Object.values(limitedAmounts));
            const name = Object.keys(limitedAmounts).find(key => limitedAmounts[key] === min);
            delete limitedAmounts[name];
            amounts.push({
                item: Item.items[name],
                amount: min,
            });
        }
        for (let i = 0; i < amounts.length - 1; i++) {
            amounts[i].amount = amounts[i + 1].amount * baseResources[amounts[i].item.name] - resources[amounts[i].item.name];
        }
        amounts[amounts.length - 1].amount = 0;
        return amounts;
    }
    static getLimitedDeposit(item, resources) { return Seed.getLimitedDeposits(item, resources)[0]; }
    static async constructFromFile(path) {
        const data = new Uint8Array(await (await fetch(path)).arrayBuffer());
        console.log(data);
        const depositsInfoLocationByte = [22, 26];
        const depositsInfoLocation = [0, 0];
        const seedOptions = {
            resources: {
                "Copper Ore": 0,
                "Iron Ore": 0,
                "Uranium Ore": 0,
                "Wood Log": 0,
                Coal: 0,
                Stone: 0,
                Wolframite: 0,
            },
        };
        console.log(data.slice(...depositsInfoLocationByte));
        depositsInfoLocation[0] = hexByteValue([...data.slice(...depositsInfoLocationByte)]) + 1;
        depositsInfoLocation[1] = depositsInfoLocation[0] + 71;
        console.log(depositsInfoLocation);
        return new Seed(seedOptions);
    }
    resources;
    worldSize;
    resourceAmount;
    seed;
    constructor(objectOrOptions, passByReference = true) {
        if (passByReference)
            this.resources = objectOrOptions.resources;
        else
            this.resources = { ...objectOrOptions.resources };
        this.worldSize = objectOrOptions.worldSize ?? 100;
        this.resourceAmount = objectOrOptions.resourceAmount ?? 100;
        this.seed = objectOrOptions.seed;
        if (typeof objectOrOptions.seed !== "undefined") {
            Seed.#amount++;
            Seed.seeds[objectOrOptions.seed] = this;
        }
    }
    toString(limit = 2) {
        if (limit <= 0)
            throw new Error("limit must be greater than 0");
        return objToString(this, limit);
    }
    getLimitedDeposits(item) { return Seed.getLimitedDeposits(item, this.resources); }
    getLimitedDeposit(item) { return Seed.getLimitedDeposit(item, this.resources); }
    getMax(item) {
        var i = Item.getAmountOfBaseResources(item);
        const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin;
        const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin;
        var maximum = Number.MAX_SAFE_INTEGER;
        for (const key in i)
            maximum = Math.min(maximum, this.resources[key] * (key === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput) / i[key]);
        return maximum;
    }
    equals(seed) {
        if (this === seed)
            return true;
        for (const resource in this.resources)
            if (this.resources[resource] !== seed.resources[resource])
                return false;
        return this.resourceAmount === seed.resourceAmount
            && this.worldSize === seed.worldSize;
    }
    strictlyEquals(seed) {
        return this.equals(seed)
            && this.seed === seed.seed;
    }
}
export { Seed };
