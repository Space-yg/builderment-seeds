/**
 * @author Space.yg
 * You can use the Item, Factory, Tier, and Input classes to make your own items and factories!
 */

/** Make a new item */
class Item {

    /**
     * Total Items that has been created
     * @type {Number}
     */
    static amount = 0;
    /** 
     * All the items that has been created 
     * @type {Object<string, Item>}
     */
    static items = {};

    /**
     * Construct an Item
     * @param {String} name The name of the item
     * @param {Number} price The price of 1 of the item
     * @param {Factory} factory The factory that makes the item
     * @param {Input[]} resourceNeeded The resources needed to make the item
     * @param {Number} productionPerMin Item's output/min in tier 1 of the factory
     * @param {Number} outputAmount Item's output per manufacture. E.g: Copper Wire = 2
     */
    constructor(name, price, factory, resourceNeeded, productionPerMin, outputAmount = 1) {
        this.name = name;
        this.price = price;
        this.factory = factory;
        this.resourceNeeded = resourceNeeded;
        this.productionPerMin = productionPerMin;
        this.outputAmount = outputAmount;
        
        this.baseResources = this.getAmountOfBaseResources();

        Item.amount++;
        Item.items[name] = this;
    }

    /**
     * Get the amount of base resources used to make the item
     * @param {Number} amount The amount to be added to the total of the item
     * @param resources The base resources needed to make the item
     * @returns The amount of base resources needed to make the item
     */
    #getAmountOfBaseResourcesFunction(amount, resources = {}) {
        if (this.resourceNeeded.length) {
            for (let i = 0; i < this.resourceNeeded.length; i++) {
                amount /= this.outputAmount;
                for (let j = 0; j < this.resourceNeeded[i].amount; j++) {
                    resources = this.resourceNeeded[i].item.#getAmountOfBaseResourcesFunction(amount, resources);
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
    getAmountOfBaseResources(amount = 1) {
        const resources = this.#getAmountOfBaseResourcesFunction(amount);
        for (const resource in resources) resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }

    /**
     * Get the amount of resources needed to make the item
     * @param {Number} amount The amount to be added to the total of the item
     * @param resources The amount of resources needed to make the item
     * @returns The amount of resources needed to make the item
     */
    #getAmountOfResourcesFunction(amount, resources = {}) {
        if (isNaN(resources[this.name])) resources[this.name] = 0;
        resources[this.name] += amount;
        for (let i = 0; i < this.resourceNeeded.length; i++) {
            amount /= this.outputAmount;
            for (let j = 0; j < this.resourceNeeded[i].amount; j++) {
                resources = this.resourceNeeded[i].item.#getAmountOfResourcesFunction(amount, resources);
            }
        }
        return resources;
    }

    /**
     * Get the amount of resources used to make the item
     * @param {Number} amount The amount of that resource
     * @returns An object containing the base resources
     */
    getAmountOfResources(amount = 1) {
        const resources = this.#getAmountOfResourcesFunction(amount);
        for (const resource in resources) resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }

    /**
     * Get the production based on the tier
     * @param {Number} tier The tier to get the output of
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
     * @param {Number} tier The tier to get the resources needed
     * @returns the resources needed to make the item at the tier
     */
    getResourcesNeeded(tier = 1) {
        const max = [];
        for (let i = 0; i < this.resourceNeeded.length; i++) max.push(new Input(this.resourceNeeded[i].item, this.resourceNeeded[i].amount, this.resourceNeeded[i].inputPerMin * this.factory.tier.getOutput(tier)));
        return max;
    }

    /**
     * Get the resources needed to make the item at the max tier
     * @returns The resources needed to make the item at the max tier
     */
    getMaxResourcesNeeded() {
        return this.getResourcesNeeded(this.factory.maxTier);
    }

    // METHODS THAT ONLY WORK WITH NORMAL GAME ITEMS

    /**
     * Get the maximum amount you can get of this item in a seed
     * @param {{woodLog: Number, stone: Number, ironOre: Number, copperOre: Number, coal: Number, wolframite: Number, uranium: Number} | Seed} resources The resources in the world
     * @returns the maximum amount you can get of this item
     */
    getMaxResourceAmountInSeed(resources) {
        const maxOutput = extractor.tier.getMaxOutput() * 7.5;
        const uraniumMaxOutput = uraniumExtractor.tier.getMaxOutput() * 10;
        var lowest = Number.MAX_SAFE_INTEGER;
        for (const name in this.baseResources) {
            lowest = Math.min(lowest, resources[{
                "Wood Log": "woodLog",
                "Stone": "stone",
                "Iron Ore": "ironOre",
                "Copper Ore": "copperOre",
                "Coal": "coal",
                "Wolframite": "wolframite",
                "Uranium": "uranium",
            }[name]] * ((name === "Uranium") ? uraniumMaxOutput : maxOutput) / this.baseResources[name]);
        }
        return lowest;
    }

    // TESTING

    /**
     * Get the maximum amount you can get of this item in a seed
     * @param {{woodLog: Number, stone: Number, ironOre: Number, copperOre: Number, coal: Number, wolframite: Number, uranium: Number} | Seed} resources The resources in the world
     * @returns the maximum amount you can get of this item
     */
    getMaxResourceAmountInSeedWithPowerPlants(resources) {
        const maxOutput = extractor.tier.getMaxOutput() * 7.5;
        const uraniumMaxOutput = uraniumExtractor.tier.getMaxOutput() * 10;
        /** @type {{woodLog: Number, stone: Number, ironOre: Number, copperOre: Number, coal: Number, wolframite: Number, uranium: Number}} */
        const calculatedResources = {};
        const itemToResource = {
            "Wood Log": "woodLog",
            "Stone": "stone",
            "Iron Ore": "ironOre",
            "Copper Ore": "copperOre",
            "Coal": "coal",
            "Wolframite": "wolframite",
            "Uranium": "uranium",
        };
        var lowest = Number.MAX_SAFE_INTEGER;
        var lowestName, secondLowestName;
        var previousLowest;
        // Get the max resource output
        /** @type {{woodLog: Number, stone: Number, ironOre: Number, copperOre: Number, coal: Number, wolframite: Number, uranium: Number}} */
        const maxResourceOutput = {};
        for (const name in resources) maxResourceOutput[name] = resources[itemToResource[name]] * ((name === "Uranium") ? uraniumMaxOutput : maxOutput);
        // Max out the uranium from the coal power plants
        // Max uranium deposits per coal power plants is 9
        for (let i = 0; i < resources.uranium; i++)  maxResourceOutput.uranium += 0; // Add best and worse case scenario
        
        // Get the max of the item from each base resource
        for (const name in maxResourceOutput) calculatedResources[name] = maxResourceOutput[name] / this.baseResources[name];
        while (calculatedResources.uranium > 0) {
            // Get the lowest (limited) resource
            for (const name in this.baseResources) {
                lowest = Math.min(lowest, calculatedResources[name]);
                secondLowestName = (lowest !== previousLowest) ? lowestName : secondLowestName;
                lowestName = (lowest !== previousLowest) ? itemToResource[name] : lowestName;
                previousLowest = lowest;
            }
            while (calculatedResources[secondLowestName] > calculatedResources[lowestName]) {
                resources
            }
        }

        return lowest;
    }
}

/** Set a tier */
class Tier {
    /**
     * Construct a Tier object
     * @param {Number} max The max Tier
     * @param {Number[]} prices The prices of each tier
     */
    constructor(max, prices) {
       this.max = max;
       this.prices = prices;
    }
    
    /**
     * Get the price at the tier
     * @param {Number} tier The tier
     * @returns The price of the tier
     */
    getPrice(tier) {
       const price = this.prices[tier - 1];
        if (price === undefined) throw new Error("Tier is less than 1, greater than max or 5, or not inputted.");
        return price;
    }

    /**
     * Get the output of the tier level based on the max
     * @param {Number} tier The tier you want to get
     * @returns The output
     */
    getOutput(tier) {
        if (tier > this.max) throw new Error("Tier cannot be greater than maximum tier of factory.");
        if (tier < 1) throw new Error("Tier cannot be less than 1.");
        return (tier === 1) ? 1 : (tier === 2) ? 1.5 : (tier === 3) ? 2 : (tier === 4) ? 3 : 4;
    }

    /**
     * Get the maximum output % of the max tier
     * @returns The maximum output
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
     * Total factories that has been created
     * @type {Number}
     */
    static amount = 0;
    /** 
     * All the factories that has been created 
     * @type {Object<string, Factory>}
     */
    static factories = {};

    /**
     * Construct a Workshop object
     * @param {String} name The name of the factory
     * @param {Number} inputs The amount of inputs of the factory
     * @param {Number} maxTier The maximum tier of the factory
     * @param {Number[]} prices The prices of each tier of the factory
     */
    constructor(name, inputs, maxTier, prices) {
        if (maxTier != prices.length) throw new Error("Length of prices does not equal to amount of tier.");
        this.name = name;
        this.inputs = inputs;
        this.maxTier = maxTier;
        this.tier = new Tier(maxTier, prices);
        this.price = prices[0];

        Factory.amount++;
        Factory.factories[name] = this;
    }

    /**
     * Get the price factory
     * @param {Number} tier The tier
     * @returns The price of the tier
     */
    getPrice(tier) {
        return this.tier.getPrice(tier);
    }

    /**
     * Get the total price to get to a tier of a factory
     * @param {Number} tier The tier
     * @returns The total price to get to this tier of this factory
     */
    getTotalPrice(tier) {
        let total = this.getPrice(tier);
        for (let i = 1; i < tier; i++) total += this.getPrice(i);
        return total;
    }
}

/** Make a power plant */
class PowerPlant {

    /**
     * Total power plants that has been created
     * @type {Number}
     */
    static amount = 0;
    /** 
     * All the power plants that has been created 
     * @type {Object<string, PowerPlant>}
     */
    static powerPlants = {};

    /**
     * Constructs a Power Plant object
     * @param {String} name The name of the power plant
     * @param {Input} input The input needed to activate the power plant
     * @param {Number} price The price of the power plant
     * @param {Number} speed The boost speed that the power plant gives
     * @param {Number} duration The amount of seconds the power plant is active before recharging
     */
    constructor(name, input, price, speed, duration) {
        this.name = name;
        this.input = input;
        this.price = price;
        this.speed = speed;
        this.duration = duration;

        PowerPlant.amount++;
        PowerPlant.powerPlants[name] = this;
    }
}

// CLASSES THAT ONLY WORK WITH NORMAL GAME ITEMS

/** Make a seed */
class Seed {
    /**
     * Construct a Seed object using a resource object
     * @param {{woodLog: Number, stone: Number, ironOre: Number, copperOre: Number, coal: Number, wolframite: Number, uranium: Number}} resources The resources in the world
     * @param {Number} worldSize The world size of the seed
     * @param {Number} resourceAmount The resource amount of the seed
     * @param {String} seed The seed
     */
    constructor(resources, worldSize = 100, resourceAmount = 100, seed = "") {
        this.woodLog = resources.woodLog;
        this.stone = resources.stone;
        this.ironOre = resources.ironOre;
        this.copperOre = resources.copperOre;
        this.coal = resources.coal;
        this.wolframite = resources.wolframite;
        this.uranium = resources.uranium;
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
        const i = item.getAmountOfBaseResources();
        const extractorMaxOutput = extractor.tier.getMaxOutput();
        return Math.min(this.woodLog * extractorMaxOutput / i["Wood Log"], this.stone * extractorMaxOutput / i["Stone"], this.ironOre * extractorMaxOutput / i["Iron Ore"], this.copperOre * extractorMaxOutput / i["Copper"], this.coal * extractorMaxOutput / i["Coal"], this.wolframite * extractorMaxOutput / i["Wolframite"], this.uranium * uraniumExtractor.tier.getMaxOutput() / i["Uranium"]);
    }
}

// Extractors
const extractor = new Factory("Extractor", 0, 5, [10, 200, 1000, 5000, 20000]);
const uraniumExtractor = new Factory("Uranium Extractor", 0, 1, [23500]);
