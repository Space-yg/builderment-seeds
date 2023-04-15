"use strict";

/**
 * @author Space.yg
 */

import { Factory } from "../classes/Factory.js";

export const extractor = new Factory({
    name: "Extractor",
    inputs: 0,
    description: "Place on resource nodes to extract infinite resources.",
    tiers: {
        1: {
            output: 1,
            price: 10,
            image: "https://static.wikia.nocookie.net/builderment/images/3/33/Extractor_1.png",
        },
        2: {
            output: 1.5,
            price: 200,
            image: "https://static.wikia.nocookie.net/builderment/images/1/1a/Extractor_2.png",
        },
        3: {
            output: 4 / 3,
            price: 1000,
            image: "https://static.wikia.nocookie.net/builderment/images/a/aa/Extractor_3.png",
        },
        4: {
            output: 1.5,
            price: 5000,
            image: "https://static.wikia.nocookie.net/builderment/images/1/1d/Extractor_4.png",
        },
        5: {
            output: 4 / 3,
            price: 20000,
            image: "https://static.wikia.nocookie.net/builderment/images/b/b4/Extractor_5.png",
        },
    }
});
export const uraniumExtractor = new Factory({
    name: "Uranium Extractor",
    inputs: 0,
    description: "Place on resource nodes to extract infinite resources.",
    tiers: {
        1: {
            output: 1,
            price: 23500,
            image: "https://static.wikia.nocookie.net/builderment/images/5/58/Uranium_extractor.png",
        },
    },
});
export const workshop = new Factory({
    name: "Workshop", 
    inputs: 1,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 10,
            image: "https://static.wikia.nocookie.net/builderment/images/e/ef/Workshop_1.png",
        },
        2: {
            output: 1.5,
            price: 1000,
            image: "https://static.wikia.nocookie.net/builderment/images/c/cf/Workshop_2.png",
        },
        3: {
            output: 4 / 3,
            price: 4000,
            image: "https://static.wikia.nocookie.net/builderment/images/e/e4/Workshop_3.png",
        },
        4: {
            output: 1.5,
            price: 12000,
            image: "https://static.wikia.nocookie.net/builderment/images/3/3a/Workshop_4.png",
        },
    },
});
export const furnace = new Factory({
    name: "Furnace",
    inputs: 1,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 30,
            image: "https://static.wikia.nocookie.net/builderment/images/1/1d/Furnace_1.png",
        },
        2: {
            output: 1.5,
            price: 200,
            image: "https://static.wikia.nocookie.net/builderment/images/8/8c/Furnace_2.png",
        },
        3: {
            output: 4 / 3,
            price: 800,
            image: "https://static.wikia.nocookie.net/builderment/images/6/64/Furnace_3.png",
        },
        4: {
            output: 1.5,
            price: 3200,
            image: "https://static.wikia.nocookie.net/builderment/images/f/fd/Furnace_4.png",
        },
    },
});
export const machineShop = new Factory({
    name: "Machine Shop",
    inputs: 2,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 100,
            image: "https://static.wikia.nocookie.net/builderment/images/3/31/Machine_shop_1.png",
        },
        2: {
            output: 1.5,
            price: 500,
            image: "https://static.wikia.nocookie.net/builderment/images/0/0c/Machine_shop_2.png",
        },
        3: {
            output: 4 / 3,
            price: 2000,
            image: "https://static.wikia.nocookie.net/builderment/images/3/3c/Machine_shop_3.png",
        },
        4: {
            output: 1.5,
            price: 8000,
            image: "https://static.wikia.nocookie.net/builderment/images/a/ae/Machine_shop_4.png",
        },
    },
});
export const forge = new Factory({
    name: "Forge",
    inputs: 2,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 100,
            image: "https://static.wikia.nocookie.net/builderment/images/4/49/Forge_1.png",
        },
        2: {
            output: 1.5,
            price: 500,
            image: "https://static.wikia.nocookie.net/builderment/images/a/a1/Forge_2.png",
        },
        3: {
            output: 4 / 3,
            price: 2000,
            image: "https://static.wikia.nocookie.net/builderment/images/8/8d/Forge_3.png",
        },
        4: {
            output: 1.5,
            price: 10000,
            image: "https://static.wikia.nocookie.net/builderment/images/f/f4/Forge_4.png",
        },
    },
});
export const industrialFactory = new Factory({
    name: "Industrial Factory",
    inputs: 3,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 300,
            image: "https://static.wikia.nocookie.net/builderment/images/c/c1/Industrial_factory_1.png",
        },
        2: {
            output: 1.5,
            price: 1000,
            image: "https://static.wikia.nocookie.net/builderment/images/b/b9/Industrial_factory_2.png",
        },
        3: {
            output: 4 / 3,
            price: 4000,
            image: "https://static.wikia.nocookie.net/builderment/images/8/8d/Industrial_factory_3.png",
        },
        4: {
            output: 1.5,
            price: 16000,
            image: "https://static.wikia.nocookie.net/builderment/images/1/1c/Industrial_factory_4.png",
        },
    },
});
export const manufacturer = new Factory({
    name: "Manufacturer",
    inputs: 4,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 1000,
            image: "https://static.wikia.nocookie.net/builderment/images/5/54/Manufacturer_1.png",
        },
        2: {
            output: 1.5,
            price: 4000,
            image: "https://static.wikia.nocookie.net/builderment/images/4/47/Manufacturer_2.png",
        },
        3: {
            output: 4 / 3,
            price: 20000,
            image: "https://static.wikia.nocookie.net/builderment/images/0/09/Manufacturer_3.png",
        },
        4: {
            output: 1.5,
            price: 80000,
            image: "https://static.wikia.nocookie.net/builderment/images/3/33/Manufacturer_4.png",
        },
    },
});
export const earthTeleporter = new Factory({
    name: "Earth Teleporter",
    inputs: 1,
    description: "Used to craft items automatically, select a recipe after building.",
    tiers: {
        1: {
            output: 1,
            price: 100000,
            image: "https://static.wikia.nocookie.net/builderment/images/7/74/Earth_telepoter.png",
        },
    },
});
export const gemTree = new Factory({
    name: "Gem Tree",
    description: "Money might not grow on trees but Gems do. Gem Apples can be harvested using a Robotic Arm. Send Gem Apples into the Research Lab or Gold Vault to get Gems.",
    inputs: 0,
    tiers: {
        1: {
            price: 250,
            output: 1,
            image: "https://static.wikia.nocookie.net/builderment/images/d/d6/Building_gem_tree.png",
        },
    },
});