/**
 * @author Space.yg
 * You can use the Item, Factory, Tier, and Input classes to make your own items and factories!
 */

/** Make a new item */
class Item {

    /**
     * Total Items that has been created
     * @type {int}
     */
    static amount = 0;
    /** 
     * All the items that has been created 
     * @type {{itemName: Item}}
     */
    static items = {};

    /**
     * Construct an Item
     * @param {String} name The name of the item
     * @param {int} price The price of 1 of the item
     * @param {Factory} factory The factory that makes the item
     * @param {Input[]} resourceNeeded The resources needed to make the item
     * @param {Number} productionPerMin Item's output/min in tier 1 of the factory
     * @param {int} outputAmount Item's output per manufacture. E.g: Copper Wire = 2
     */
    constructor(name, price, factory, resourceNeeded, productionPerMin, outputAmount = 1) {
        this.name = name;
        this.price = price;
        this.factory = factory;
        this.resourceNeeded = resourceNeeded;
        this.productionPerMin = productionPerMin;
        this.outputAmount = outputAmount;
        
        this.baseResources = this.getBaseResources();

        Item.amount++;
        Item.items[name] = this;
    }

    /**
     * Get the amount of base resources of the item
     * @param {Number} amount The amount to be added to the total of the item
     * @param resources The amount of base resources needed to make the item
     * @returns The amount of base resources needed to make the item
     */
    #getBaseResourcesFunction(amount, resources = {}) {
        if (this.resourceNeeded.length) {
            for (let i = 0; i < this.resourceNeeded.length; i++) {
                amount /= this.outputAmount;
                for (let j = 0; j < this.resourceNeeded[i].amount; j++) {
                    resources = this.resourceNeeded[i].item.#getBaseResourcesFunction(amount, resources);
                }
            }
        } else {
            if (isNaN(resources[this.name])) resources[this.name] = amount;
            else resources[this.name] += amount;
        }
        return resources;
    }

    /**
     * Get the amount of base resources used to make the item
     * @param {Number} amount The amount of that resource
     * @returns An object containing the base resources
     */
    getBaseResources(amount = 1) {
        const resources = this.#getBaseResourcesFunction(amount);
        for (const resource in resources) resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }

    /**
     * Get the amount of resources needed to make the item
     * @param {Number} amount The amount to be added to the total of the item
     * @param resources The amount of resources needed to make the item
     * @returns The amount of resources needed to make the item
     */
    #getResourcesFunction(amount, resources = {}) {
        if (isNaN(resources[this.name])) resources[this.name] = 0;
        resources[this.name] += amount;
        for (let i = 0; i < this.resourceNeeded.length; i++) {
            amount /= this.outputAmount;
            for (let j = 0; j < this.resourceNeeded[i].amount; j++) {
                resources = this.resourceNeeded[i].item.#getResourcesFunction(amount, resources);
            }
        }
        return resources;
    }

    /**
     * Get the amount of resources used to make the item
     * @param {Number} amount The amount of that resource
     * @returns An object containing the base resources
     */
    getResources(amount = 1) {
        const resources = this.#getResourcesFunction(amount);
        for (const resource in resources) resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }

    /**
     * Get the production based on the tier
     * @param {int} tier The tier to get the output of
     * @returns The production of the item at a tier
     */
    getProduction(tier = 1) {
        return this.productionPerMin * this.factory.tier.getOutput(tier);
    }
    
    /**
     * Get the max production of the item
     * @returns The max production of the item
     */
    getMaxProduction() {
        return this.getProduction(this.factory.maxTier);
    }

    /**
     * Get the resources needed to make the item at a tier
     * @param {int} tier The tier to get the resources needed
     * @returns the resources needed to make the item at the tier
     */
    getResources(tier = 1) {
        const max = [];
        for (let i = 0; i < this.resourceNeeded.length; i++) max.push(new Input(this.resourceNeeded[i].item, this.resourceNeeded[i].amount, this.resourceNeeded[i].inputPerMin * this.factory.tier.getOutput(tier)));
        return max;
    }

    /**
     * Get the resources needed to make the item at the max tier
     * @returns The resources needed to make the item at the max tier
     */
    getMaxResources() {
        return this.getInput(this.factory.maxTier);
    }

    // METHODS THAT ONLY WORK WITH NORMAL GAME ITEMS

    /**
     * Get the maximum amount you can get of this item in a seed
     * @param {{woodLog: int, stone: int, ironOre: int, copperOre: int, coal: int, wolframite: int} | Seed} resources The resources in the world
     * @returns the maximum amount you can get of this item
     */
    getMaxResourceAmountInSeed(resources) {
        const maxOutput = extractor.tier.getMaxOutput() * 7.5;
        var lowest = Number.MAX_SAFE_INTEGER;
        for (const name in this.baseResources) {
            lowest = Math.min(lowest, resources[{
                "Wood Log": "woodLog",
                "Stone": "stone",
                "Iron Ore": "ironOre",
                "Copper Ore": "copperOre",
                "Coal": "coal",
                "Wolframite": "wolframite"
            }[name]] * maxOutput / this.baseResources[name]);
        }
        return lowest;
    }
}

/** Set a tier */
class Tier {
    /**
     * Construct a Tier object
     * @param {int} max The max Tier
     * @param {int[]} prices The prices of each tier
    */
   constructor(max, prices) {
       this.max = max;
       this.prices = prices;
    }
    
    /**
     * Get the price at the tier
     * @param {int} tier The tier
     * @returns The price of the tier
    */
   getPrice(tier) {
       const price = this.prices[tier - 1];
        if (price === undefined) throw new Error("Tier is less than 1, greater than max or 5, or not inputted.");
        return price;
    }

    /**
     * Get the output % of the tier level based on the max
     * @param {int} tier The tier you want to get
     * @returns 1 || 1.5 || 2 || 3 || 4 || Error
     */
    getOutput(tier) {
        const t = (tier === 1) ? 1 : (tier === 2 & this.max > 1) ? 1.5 : (tier === 3 & this.max > 2) ? 2 : (tier === 4 & this.max > 3) ? 3 : (tier === 5 & this.max > 4) ? 4 : null;
        if (t === null) throw new Error("Tier is less than 1, greater than max or 5, or not inputted.");
        return t;
    }

    /**
     * Get the maximum output % of the max tier
     * @returns {1 | 1.5 | 2 | 3 | 4 | Error}
     */
    getMaxOutput() {
        return this.getOutput(this.max);
    }
}

/** Set an input */
class Input {
    /**
     * Constructs an Input object
     * @param {Item} item The item of the input
     * @param {Number} amount The amount needed to make the parent item
     * @param {Number} inputPerMin Total input/min in tier 1
     */
    constructor(item, amount, inputPerMin) {
        this.item = item;
        this.amount = amount;
        this.inputPerMin = inputPerMin;
    }
}

/** Make a factory */
class Factory {
    
    /** 
     * All the items that has been created 
     * @type {{factoryName: Factory}}
     */
    static factories = {};

    /**
     * Construct a Workshop object
     * @param {String} name The name of the factory
     * @param {int} inputs The amount of inputs of the factory
     * @param {int} maxTier The maximum tier of the factory
     * @param {int[]} prices The prices of each tier of the factory
     */
    constructor(name, inputs, maxTier, prices) {
        if (maxTier != prices.length) throw new Error("Length of prices does not equal to amount of tier.");
        this.name = name;
        this.inputs = inputs;
        this.maxTier = maxTier;
        this.tier = new Tier(maxTier, prices);
        this.price = prices[0];
        Factory.factories[name] = this;
    }

    /**
     * Get the price factory
     * @param {int} tier The tier
     * @returns The price of the tier
     */
    getPrice(tier) {
        return this.tier.getPrice(tier);
    }

    /**
     * Get the total price to get to a tier of a factory
     * @param {int} tier The tier
     * @returns The total price to get to this tier of this factory
     */
    getTotalPrice(tier) {
        let total = this.getPrice(tier);
        for (let i = 1; i < tier; i++) total += this.getPrice(i);
        return total;
    }
}

// CLASSES THAT ONLY WORK WITH NORMAL GAME ITEMS

/** Make a seed */
class Seed {
    /**
     * Construct a Seed object using a resource object
     * @param {{woodLog: int, stone: int, ironOre: int, copperOre: int, coal: int, wolframite: int}} resources The resources in the world
     * @param {int} worldSize The world size of the seed
     * @param {int} resourceAmount The resource amount of the seed
     * @param {String} seed The seed
     */
    constructor(resources, worldSize = 100, resourceAmount = 100, seed = "") {
        this.woodLog = resources.woodLog;
        this.stone = resources.stone;
        this.ironOre = resources.ironOre;
        this.copperOre = resources.copperOre;
        this.coal = resources.coal;
        this.wolframite = resources.wolframite;
        this.worldSize = worldSize;
        this.resourceAmount = resourceAmount;
        this.seed = seed;
    }

    /**
     * Get the maximum amount of an item that can be made in a seed
     * @param {Item} item The item to get the max of
     * @returns The maximum amount of this item that can be made in this seed
     */
    getMax(item) {
        const i = item.getBaseResources();
        const extractorMaxOutput = Extractor.getMaxOutput();
        return Math.min(this.woodLog * extractorMaxOutput / i["Wood Log"], this.stone * extractorMaxOutput / i["Stone"], this.ironOre * extractorMaxOutput / i["Iron Ore"], this.copperOre * extractorMaxOutput / i["Copper"], this.coal * extractorMaxOutput / i["Coal"], this.wolframite * extractorMaxOutput / i["Wolframite"]);
    }
}

const extractor = new Factory("Extractor", 0, 5, [10, 200, 1000, 5000, 20000]);
