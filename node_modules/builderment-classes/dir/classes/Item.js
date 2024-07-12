import { Base } from "./Base.js";
import { Seed } from "./Seed.js";
import { Factory } from "./buildings/tiers/output-tiers/Factory.js";
import { extractor, extractorOutputPerMin, uraniumExtractor, uraniumExtractorOutputPerMin } from "../objects/buildings/factories.js";
import { coalPowerPlant, nuclearPowerPlant } from "../objects/buildings/power-plants.js";
class Item extends Base {
    factory;
    recipeImage;
    outputPerMin;
    outputAmount;
    resourcesNeeded;
    baseResources;
    get maxOutputPerMin() { return this.getOutputPerMin(this.factory.maxTierNum); }
    get maxResourcesNeeded() { return this.getResourcesNeeded(this.factory.maxTierNum); }
    static #amount = 0;
    static get amount() { return this.#amount; }
    static items = {};
    static getItem(item) {
        if (typeof item !== "string")
            return item;
        return Item.items[item];
    }
    static getAmountOfBaseResources(item, amount = 1) {
        if (typeof item === "string") {
            const i = Item.getItem(item);
            if (typeof i !== "undefined")
                return i.getAmountOfBaseResources(amount);
            throw new Error(`Unknown item "${item}"`);
        }
        else
            return item.getAmountOfBaseResources(amount);
    }
    constructor(itemOrOptions, passByReference = true) {
        if (itemOrOptions.factory.inputs !== itemOrOptions.resourcesNeeded.length)
            throw new Error("Total amount of resources needed does not equal to the amount of inputs of the factory.");
        super(itemOrOptions);
        this.image = itemOrOptions.image ?? this.image + `items/${this.name}.png`;
        this.recipeImage = itemOrOptions.recipeImage ?? `./resources/recipes/${this.name}.png`;
        this.outputPerMin = itemOrOptions.outputPerMin;
        this.outputAmount = itemOrOptions.outputAmount ?? 1;
        this.resourcesNeeded = {};
        if (passByReference) {
            this.factory = itemOrOptions.factory;
            if (itemOrOptions instanceof Item)
                this.resourcesNeeded = itemOrOptions.resourcesNeeded;
            else
                for (const input of itemOrOptions.resourcesNeeded)
                    this.resourcesNeeded[input.item.name] = { ...input, inputPerMin: input.amount * this.outputPerMin };
        }
        else {
            this.factory = new Factory(itemOrOptions.factory, passByReference);
            if (itemOrOptions instanceof Item)
                for (const inputOption in itemOrOptions.resourcesNeeded)
                    this.resourcesNeeded[inputOption] = { ...itemOrOptions.resourcesNeeded[inputOption], item: new Item(itemOrOptions.resourcesNeeded[inputOption].item, passByReference) };
            else
                for (const input of itemOrOptions.resourcesNeeded)
                    this.resourcesNeeded[input.item.name] = { ...input, inputPerMin: input.amount * this.outputPerMin };
        }
        this.baseResources = this.getAmountOfBaseResources();
        Item.#amount++;
        Item.items[itemOrOptions.name] = this;
    }
    needsFunction(item, scannedItems) {
        if (scannedItems.includes(this.name))
            return false;
        if (this === item)
            return true;
        scannedItems.push(this.name);
        if (Object.values(this.resourcesNeeded).length === 0)
            return false;
        return !Object.values(this.resourcesNeeded).every(resource => !resource.item.needsFunction(item, scannedItems));
    }
    needs(item) {
        const i = Item.getItem(item);
        if (typeof i === "undefined")
            return false;
        return this.needsFunction(i, []);
    }
    getAmountOfBaseResourcesFunction(amount, resources = {}) {
        if (Object.keys(this.resourcesNeeded).length) {
            for (const name in this.resourcesNeeded) {
                amount /= this.outputAmount;
                for (let i = 0; i < this.resourcesNeeded[name].amount; i++) {
                    resources = this.resourcesNeeded[name].item.getAmountOfBaseResourcesFunction(amount, resources);
                }
            }
        }
        else {
            if (typeof resources[this.name] === "undefined" || isNaN(resources[this.name]))
                resources[this.name] = amount;
            else
                resources[this.name] += amount;
        }
        return resources;
    }
    getAmountOfBaseResources(amount = 1) {
        const resources = this.getAmountOfBaseResourcesFunction(amount);
        for (const resource in resources)
            resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }
    getAmountOfResourcesFunction(amount, resources = {}) {
        if (isNaN(resources[this.name]))
            resources[this.name] = 0;
        resources[this.name] += amount;
        for (const name in this.resourcesNeeded) {
            amount /= this.outputAmount;
            for (let i = 0; i < this.resourcesNeeded[name].amount; i++) {
                resources = this.resourcesNeeded[name].item.getAmountOfResourcesFunction(amount, resources);
            }
        }
        return resources;
    }
    getAmountOfResources(amount = 1) {
        const resources = this.getAmountOfResourcesFunction(amount);
        for (const resource in resources)
            resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }
    getOutputPerMin(tier = 1) { return this.outputPerMin * this.factory.tiers[tier].output; }
    getResourcesNeeded(tier = 1) {
        const resources = [];
        for (const name in this.resourcesNeeded)
            resources.push({
                ...this.resourcesNeeded[name],
                inputPerMin: this.resourcesNeeded[name].inputPerMin * this.factory.tiers[tier].output,
            });
        return resources;
    }
    getMaxResourceAmountInSeed(resourcesOrSeed) {
        const resources = resourcesOrSeed instanceof Seed ? resourcesOrSeed.resources : resourcesOrSeed;
        const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin;
        const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin;
        var lowest = Number.MAX_SAFE_INTEGER;
        for (const name in this.baseResources)
            lowest = Math.min(lowest, resources[name] * (name === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput) / this.baseResources[name]);
        return lowest;
    }
    getMaxResourceAmountInSeedWithPowerPlants(resourcesOrSeed, resourceAmount = 100) {
        var coalPowerPlantExtractorReach;
        var nuclearPowerPlantExtractorReach;
        var uraniumOreDepositsInPatch;
        switch (resourcesOrSeed instanceof Seed ? resourcesOrSeed.resourceAmount : resourceAmount) {
            case 50:
                coalPowerPlantExtractorReach = NaN;
                nuclearPowerPlantExtractorReach = NaN;
                uraniumOreDepositsInPatch = NaN;
                break;
            case 75:
                coalPowerPlantExtractorReach = NaN;
                nuclearPowerPlantExtractorReach = NaN;
                uraniumOreDepositsInPatch = NaN;
                break;
            case 100:
                coalPowerPlantExtractorReach = 22;
                nuclearPowerPlantExtractorReach = 36;
                uraniumOreDepositsInPatch = 6.9;
                break;
            case 150:
                coalPowerPlantExtractorReach = NaN;
                nuclearPowerPlantExtractorReach = NaN;
                uraniumOreDepositsInPatch = 6.9;
                break;
            case 200:
                coalPowerPlantExtractorReach = 22;
                nuclearPowerPlantExtractorReach = 55;
                uraniumOreDepositsInPatch = 6.9;
                break;
        }
        const resources = resourcesOrSeed instanceof Seed ? resourcesOrSeed.resources : resourcesOrSeed;
        const r = { ...resources };
        const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin;
        const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin;
        const nuclearFuelCellBaseResources = nuclearPowerPlant.input.item.baseResources;
        r.Coal -= r["Uranium Ore"] / uraniumOreDepositsInPatch;
        r["Uranium Ore"] *= coalPowerPlant.speed;
        r.Coal = (r.Coal * coalPowerPlant.speed) - (r.Coal / coalPowerPlantExtractorReach * (coalPowerPlant.input.inputPerMin / extractorMaxOutput));
        while (r["Uranium Ore"] - nuclearFuelCellBaseResources["Uranium Ore"] / uraniumExtractorMaxOutput > 0) {
            for (const resource in nuclearFuelCellBaseResources)
                r[resource] -= nuclearFuelCellBaseResources[resource] / (resource === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput);
            const limited = Seed.getLimitedDeposit(this, r);
            if (limited.item.name === "Coal" || limited.item.name === "Uranium Ore")
                break;
            r[limited.item.name] += nuclearPowerPlantExtractorReach * nuclearPowerPlant.speed - nuclearPowerPlantExtractorReach;
        }
        while (true) {
            const limited = Seed.getLimitedDeposit(this, { ...r, Coal: r.Coal - coalPowerPlant.input.inputPerMin / extractorMaxOutput });
            if (limited.item.name === "Coal" || limited.item.name === "Uranium Ore")
                break;
            r.Coal -= coalPowerPlant.input.inputPerMin / extractorMaxOutput;
            r[limited.item.name] += coalPowerPlantExtractorReach * coalPowerPlant.speed - coalPowerPlantExtractorReach;
        }
        return this.getMaxResourceAmountInSeed(r);
    }
    similarEquals(item) {
        return Object.keys(this.resourcesNeeded).length === Object.keys(item.resourcesNeeded).length
            && this.outputAmount === item.outputAmount
            && this.outputPerMin === item.outputPerMin;
    }
    equals(item) {
        if (this === item)
            return true;
        for (const input in this.resourcesNeeded)
            if (typeof item.resourcesNeeded[input] === "undefined" || this.resourcesNeeded[input].amount !== item.resourcesNeeded[input].amount || this.resourcesNeeded[input].inputPerMin !== item.resourcesNeeded[input].inputPerMin || !this.resourcesNeeded[input].item.equals(item.resourcesNeeded[input].item))
                return false;
        return super.equals(item)
            && this.similarEquals(item)
            && this.factory.equals(item.factory);
    }
    strictlyEquals(item) {
        if (this === item)
            return true;
        for (const input in this.resourcesNeeded)
            if (typeof item.resourcesNeeded[input] === "undefined" || this.resourcesNeeded[input].amount !== item.resourcesNeeded[input].amount || this.resourcesNeeded[input].inputPerMin !== item.resourcesNeeded[input].inputPerMin || !this.resourcesNeeded[input].item.strictlyEquals(item.resourcesNeeded[input].item))
                return false;
        return super.strictlyEquals(item)
            && this.similarEquals(item)
            && this.factory.strictlyEquals(item.factory)
            && this.recipeImage === item.recipeImage;
    }
}
export { Item };
