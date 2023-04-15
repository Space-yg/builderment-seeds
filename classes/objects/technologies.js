"use strict";

/**
 * @author Space.yg
 */

// Classes
import { Technology } from "../classes/Technology.js";

// Objects
import * as decorations from "./decorations.js";
import * as factory from "./factories.js";
import * as item from "./items.js";
import * as other from "./other.js";
import * as powerPlants from "./powerPlants.js";
import * as transportations from "./transportations.js";

/* Template
export const _ = new Technology({
    name: "",
    price: 0,
    image: "",
    unlocksTechnologies: [_],
    resourcesNeeded: [
        {
            item: item._,
            amount: 0,
        },
    ],
    unlocks: [_],
});
*/

// Manufacturer
export const manufacturerUpgrade3 = new Technology({
    name: "Manufacturer Upgrade",
    price: 452300,
    image: "https://static.wikia.nocookie.net/builderment/images/1/1a/Manufacturer_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.industrialFrame,
            amount: 2000,
        },
        {
            item: item.superComputer,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: factory.manufacturer,
            tier: 4,
        },
    ],
});
export const manufacturerUpgrade2 = new Technology({
    name: "Manufacturer Upgrade",
    price: 106500,
    image: "https://static.wikia.nocookie.net/builderment/images/1/14/Manufacturer_tier_3.png",
    unlocksTechnologies: [manufacturerUpgrade3],
    resourcesNeeded: [
        {
            item: item.industrialFrame,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.manufacturer,
            tier: 3,
        },
    ],
});
export const manufacturerUpgrade1 = new Technology({
    name: "Manufacturer Upgrade",
    price: 25100,
    image: "https://static.wikia.nocookie.net/builderment/images/8/83/Manufacturer_tier_2.png",
    unlocksTechnologies: [manufacturerUpgrade2],
    resourcesNeeded: [
        {
            item: item.tungstenCarbide,
            amount: 2000,
        },
        {
            item: item.steel,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.manufacturer,
            tier: 2,
        },
    ],
});


// Forge
export const forgeUpgrade3 = new Technology({
    name: "Forge Upgrade",
    price: 132500,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e4/Forge_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.superComputer,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.forge,
            tier: 4,
        },
    ],
});
export const forgeUpgrade2 = new Technology({
    name: "Forge Upgrade",
    price: 27100,
    image: "https://static.wikia.nocookie.net/builderment/images/2/28/Forge_tier_3.png",
    unlocksTechnologies: [forgeUpgrade3],
    resourcesNeeded: [
        {
            item: item.carbonFiber,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: factory.forge,
            tier: 3,
        },
    ],
});
export const forgeUpgrade1 = new Technology({
    name: "Forge Upgrade",
    price: 9800,
    image: "https://static.wikia.nocookie.net/builderment/images/f/f6/Forge_tier_2.png",
    unlocksTechnologies: [forgeUpgrade2],
    resourcesNeeded: [
        {
            item: item.steelRod,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.forge,
            tier: 2,
        },
    ],
});

// Industrial Factory
export const industrialFactoryUpgrade3 = new Technology({
    name: "Industrial Factory Upgrade",
    price: 106500,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8b/Industrial_factory_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.industrialFrame,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.industrialFactory,
            tier: 4,
        },
    ],
});
export const industrialFactoryUpgrade2 = new Technology({
    name: "Industrial Factory Upgrade",
    price: 31400,
    image: "https://static.wikia.nocookie.net/builderment/images/9/9f/Industrial_factory_tier_3.png",
    unlocksTechnologies: [industrialFactoryUpgrade3],
    resourcesNeeded: [
        {
            item: item.tungstenCarbide,
            amount: 1000,
        },
        {
            item: item.rotor,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.industrialFactory,
            tier: 3,
        },
    ],
});
export const industrialFactoryUpgrade1 = new Technology({
    name: "Industrial Factory Upgrade",
    price: 6900,
    image: "https://static.wikia.nocookie.net/builderment/images/e/ed/Industrial_factory_tier_2.png",
    unlocksTechnologies: [industrialFactoryUpgrade2],
    resourcesNeeded: [
        {
            item: item.steel,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.industrialFactory,
            tier: 2,
        },
    ],
});

// Decorations
export const gemTree = new Technology({
    name: "Gem Tree",
    price: 2400,
    image: "https://static.wikia.nocookie.net/builderment/images/2/25/Gem_tree.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.woodLog,
            amount: 1000,
        },
        {
            item: item.stone,
            amount: 1000,
        },
        {
            item: item.ironOre,
            amount: 1000,
        },
        {
            item: item.copperOre,
            amount: 1000,
        },
    ],
    unlocks: [factory.gemTree],
});
export const earthStatue = new Technology({
    name: "Earth Statue",
    price: null,
    image: "https://static.wikia.nocookie.net/builderment/images/4/4b/Earth_statue.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.earthToken,
            amount: 500,
        },
    ],
    unlocks: [decorations.earthStatue],
});
export const particleStatue = new Technology({
    name: "Particle Statue",
    price: null,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0d/Particle_statue.png",
    unlocksTechnologies: [earthStatue],
    resourcesNeeded: [
        {
            item: item.particleGlue,
            amount: 1000,
        },
    ],
    unlocks: [decorations.particleStatue],
});
export const steelStatue = new Technology({
    name: "Steel Statue",
    price: null,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0d/Steel_statue.png",
    unlocksTechnologies: [particleStatue],
    resourcesNeeded: [
        {
            item: item.steel,
            amount: 5000,
        },
    ],
    unlocks: [decorations.steelStatue],
});
export const circuitStatue = new Technology({
    name: "Circuit Statue",
    price: null,
    image: "https://static.wikia.nocookie.net/builderment/images/b/b8/Circuit_statue.png",
    unlocksTechnologies: [steelStatue],
    resourcesNeeded: [
        {
            item: item.logicCircuit,
            amount: 3000,
        },
    ],
    unlocks: [decorations.circuitStatue],
});
export const gearStatue = new Technology({
    name: "Gear Statue",
    price: null,
    image: "https://static.wikia.nocookie.net/builderment/images/2/2d/Gear_statue.png",
    unlocksTechnologies: [circuitStatue],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 2000,
        },
    ],
    unlocks: [decorations.gearStatue],
});
export const decorativeWalls = new Technology({
    name: "Decorative Walls",
    price: 1300,
    image: "https://static.wikia.nocookie.net/builderment/images/8/89/Fence_%26_concrete_wall.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.woodPlank,
            amount: 200,
        },
        {
            item: item.concrete,
            amount: 50,
        },
    ],
    unlocks: [decorations.fence, decorations.concreteWall],
});
export const factoryDecorations = new Technology({
    name: "Factory Decorations",
    price: 360,
    image: "https://static.wikia.nocookie.net/builderment/images/d/d4/Hazard_cone_%26_barrel_%26_broken_pipe_%26_wooden_crate.png",
    unlocksTechnologies: [decorativeWalls],
    resourcesNeeded: [
        {
            item: item.copperWire,
            amount: 150,
        },
        {
            item: item.ironGear,
            amount: 150,
        },
    ],
    unlocks: [decorations.hazardCone, decorations.barrel, decorations.brokenPipe, decorations.woodenCrate],
});
export const decorativeRocks = new Technology({
    name: "Decorative Rocks",
    price: 300,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0b/Rock.png",
    unlocksTechnologies: [factoryDecorations],
    resourcesNeeded: [
        {
            item: item.stone,
            amount: 500,
        },
    ],
    unlocks: [decorations.rock1, decorations.rock2, decorations.rock3],
});
export const festiveDecorations = new Technology({
    name: "Festive Decorations",
    price: 300,
    image: "https://static.wikia.nocookie.net/builderment/images/0/01/Pumpkin_%26_snowman.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.coal,
            amount: 50,
        },
    ],
    unlocks: [decorations.pumpkin, decorations.snowman],
});
export const decorativeTrees = new Technology({
    name: "Decorative Trees",
    price: 120,
    image: "https://static.wikia.nocookie.net/builderment/images/4/4d/Pretty_tree_%26_fir_tree_%26_birch_tree_%26_palm_tree.png",
    unlocksTechnologies: [festiveDecorations, decorativeRocks, gearStatue],
    resourcesNeeded: [
        {
            item: item.woodFrame,
            amount: 50,
        },
    ],
    unlocks: [decorations.prettyTree, decorations.firTree, decorations.birchTree, decorations.palmTree],
});

// Robotic Arms
export const roboticArmUpgrade3 = new Technology({
    name: "Robotic Arm Upgrade",
    price: 133500,
    image: "https://static.wikia.nocookie.net/builderment/images/1/16/Robotic_arm_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.electricMotor,
            amount: 5000,
        },
        {
            item: item.nanoWire,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: transportations.roboticArm,
            tier: 4,
        },
    ],
});
export const roboticArmUpgrade2 = new Technology({
    name: "Robotic Arm Upgrade",
    price: 22300,
    image: "https://static.wikia.nocookie.net/builderment/images/2/2d/Robotic_arm_tier_3.png",
    unlocksTechnologies: [roboticArmUpgrade3],
    resourcesNeeded: [
        {
            item: item.rotor,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: transportations.roboticArm,
            tier: 3,
        },
    ],
});
export const roboticArmUpgrade1 = new Technology({
    name: "Robotic Arm Upgrade",
    price: 6700,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8a/Robotic_arm_tier_2.png",
    unlocksTechnologies: [roboticArmUpgrade2],
    resourcesNeeded: [
        {
            item: item.computer,
            amount: 200,
        },
    ],
    unlocks: [
        {
            build: transportations.roboticArm,
            tier: 2,
        },
    ],
});
export const robotics = new Technology({
    name: "Robotics",
    price: 2100,
    image: "https://static.wikia.nocookie.net/builderment/images/3/32/Robotic_arm.png",
    unlocksTechnologies: [gemTree, roboticArmUpgrade1],
    resourcesNeeded: [
        {
            item: item.woodPlank,
            amount: 1000,
        },
        {
            item: item.logicCircuit,
            amount: 2500,
        },
    ],
    unlocks: [transportations.roboticArm],
});

// Machine Shop
export const machineShopUpgrade3 = new Technology({
    name: "Machine Shop Upgrade",
    price: 40500,
    image: "https://static.wikia.nocookie.net/builderment/images/3/3c/Machine_shop_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.concrete,
            amount: 1000,
        },
        {
            item: item.coupler,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: factory.machineShop,
            tier: 3,
        },
    ],
});
export const machineShopUpgrade2 = new Technology({
    name: "Machine Shop Upgrade",
    price: 16600,
    image: "https://static.wikia.nocookie.net/builderment/images/a/ae/Machine_shop_tier_3.png",
    unlocksTechnologies: [machineShopUpgrade3],
    resourcesNeeded: [
        {
            item: item.computer,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.machineShop,
            tier: 3,
        },
    ],
});
export const machineShopUpgrade1 = new Technology({
    name: "Machine Shop Upgrade",
    price: 3200,
    image: "https://static.wikia.nocookie.net/builderment/images/4/41/Machine_shop_tier_2.png",
    unlocksTechnologies: [machineShopUpgrade2],
    resourcesNeeded: [
        {
            item: item.ironPlating,
            amount: 2000,
        },
        {
            item: item.electromagnet,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: factory.machineShop,
            tier: 2,
        },
    ],
});

// Storage
export const storageUpgrade3 = new Technology({
    name: "Storage Upgrade",
    price: 49700,
    image: "https://static.wikia.nocookie.net/builderment/images/c/ce/Storage_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.metalFrame,
            amount: 4000,
        },
        {
            item: item.concrete,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: other.storage,
            tier: 4,
        },
    ],
});
export const storageUpgrade2 = new Technology({
    name: "Storage Upgrade",
    price: 17200,
    image: "https://static.wikia.nocookie.net/builderment/images/2/20/Storage_tier_3.png",
    unlocksTechnologies: [storageUpgrade3],
    resourcesNeeded: [
        {
            item: item.metalFrame,
            amount: 2000,
        },
        {
            item: item.steel,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: other.storage,
            tier: 3,
        },
    ],
});
export const storageUpgrade1 = new Technology({
    name: "Storage Upgrade",
    price: 6900,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e1/Storage_tier_2.png",
    unlocksTechnologies: [storageUpgrade2],
    resourcesNeeded: [
        {
            item: item.metalFrame,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: other.storage,
            tier: 2,
        },
    ],
});
export const storage = new Technology({
    name: "storage",
    price: 1100,
    image: "https://static.wikia.nocookie.net/builderment/images/4/48/Storage.png",
    unlocksTechnologies: [storageUpgrade1],
    resourcesNeeded: [
        {
            item: item.metalFrame,
            amount: 150,
        },
    ],
    unlocks: [other.storage],
});

// Furnace
export const furnaceUpgrade3 = new Technology({
    name: "Furnace Upgrade",
    price: 33200,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6d/Furnace_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.nanoWire,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.furnace,
            tier: 4,
        },
    ],
});
export const furnaceUpgrade2 = new Technology({
    name: "Furnace Upgrade",
    price: 14600,
    image: "https://static.wikia.nocookie.net/builderment/images/b/ba/Furnace_tier_3.png",
    unlocksTechnologies: [furnaceUpgrade3],
    resourcesNeeded: [
        {
            item: item.heatSink,
            amount: 5000,
        },
    ],
    unlocks: [
        {
            build: factory.furnace,
            tier: 3,
        },
    ],
});
export const furnaceUpgrade1 = new Technology({
    name: "Furnace Upgrade",
    price: 4000,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8e/Furnace_tier_2.png",
    unlocksTechnologies: [furnaceUpgrade2],
    resourcesNeeded: [
        {
            item: item.electromagnet,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.furnace,
            tier: 2,
        },
    ],
});

// Power Plants
export const nuclearPower = new Technology({
    name: "Nuclear Power",
    price: 81500,
    image: "https://static.wikia.nocookie.net/builderment/images/4/48/Nuclear_power_plant_%26_empty_fuel_cell_%26_nuclear_fuel_cell.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.concrete,
            amount: 1000,
        },
        {
            item: item.steel,
            amount: 1000,
        },
        {
            item: item.enrichedUranium,
            amount: 100,
        },
    ],
    unlocks: [powerPlants.nuclearPowerPlant, item.emptyFuelCell, item.nuclearFuelCell],
});
export const coalPower = new Technology({
    name: "Coal Power",
    price: 600,
    image: "https://static.wikia.nocookie.net/builderment/images/7/71/Coal_power_plant.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.coal,
            amount: 1000,
        },
    ],
    unlocks: [powerPlants.coalPowerPlant],
});

// Workshop
export const workshopUpgrade3 = new Technology({
    name: "Workshop Upgrade",
    price: 134400,
    image: "https://static.wikia.nocookie.net/builderment/images/4/42/Workshop_tier_4.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.turbocharger,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.workshop,
            tier: 4,
        },
    ],
});
export const workshopUpgrade2 = new Technology({
    name: "Workshop Upgrade",
    price: 17400,
    image: "https://static.wikia.nocookie.net/builderment/images/f/fe/Workshop_tier_3.png",
    unlocksTechnologies: [workshopUpgrade3],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 5000,
        },
        {
            item: item.logicCircuit,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: factory.workshop,
            tier: 3,
        },
    ],
});
export const workshopUpgrade1 = new Technology({
    name: "Workshop Upgrade",
    price: 1200,
    image: "https://static.wikia.nocookie.net/builderment/images/8/84/Workshop_tier_2.png",
    unlocksTechnologies: [workshopUpgrade2],
    resourcesNeeded: [
        {
            item: item.copperWire,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.workshop,
            tier: 2,
        },
    ],
});

// Belts
export const undergroundBeltUpgrade2 = new Technology({
    name: "Underground Belt Upgrade",
    price: 116100,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8c/Underground_belt_distance_6.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.turbocharger,
            amount: 200,
        },
        {
            item: item.concrete,
            amount: 4000,
        },
    ],
    unlocks: [
        {
            build: transportations.undergroundBelt,
            tier: 2,
        },
    ],
});
export const undergroundBeltUpgrade1 = new Technology({
    name: "Underground Belt Upgrade",
    price: 25700,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c7/Underground_belt_distance_5.png",
    unlocksTechnologies: [undergroundBeltUpgrade2],
    resourcesNeeded: [
        {
            item: item.nanoWire,
            amount: 100,
        },
        {
            item: item.concrete,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: transportations.undergroundBelt,
            tier: 1,
        },
    ],
});
export const speedUpgradeXII = new Technology({
    name: "Speed Upgrade XII",
    price: 1700000,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c7/Belt_speed_upgrade_12.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 150000,
        },
        {
            item: item.earthToken,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 12,
        },
    ],
});
export const speedUpgradeXI = new Technology({
    name: "Speed Upgrade XI",
    price: 898500,
    image: "https://static.wikia.nocookie.net/builderment/images/a/a8/Belt_speed_upgrade_11.png",
    unlocksTechnologies: [speedUpgradeXII],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 100000,
        },
        {
            item: item.earthToken,
            amount: 50,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 11,
        },
    ],
});
export const speedUpgradeX = new Technology({
    name: "Speed Upgrade X",
    price: 94700,
    image: "https://static.wikia.nocookie.net/builderment/images/0/03/Belt_speed_upgrade_10.png",
    unlocksTechnologies: [speedUpgradeXI],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 80000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 10,
        },
    ],
});
export const speedUpgradeIX = new Technology({
    name: "Speed Upgrade IX",
    price: 71100,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6c/Belt_speed_upgrade_9.png",
    unlocksTechnologies: [speedUpgradeX],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 60000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 9,
        },
    ],
});
export const speedUpgradeVIII = new Technology({
    name: "Speed Upgrade VIII",
    price: 47400,
    image: "https://static.wikia.nocookie.net/builderment/images/8/88/Belt_speed_upgrade_8.png",
    unlocksTechnologies: [speedUpgradeIX],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 40000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 8,
        },
    ],
});
export const speedUpgradeVII = new Technology({
    name: "Speed Upgrade VII",
    price: 35600,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6a/Belt_speed_upgrade_7.png",
    unlocksTechnologies: [speedUpgradeVIII],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 30000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 7,
        },
    ],
});
export const speedUpgradeVI = new Technology({
    name: "Speed Upgrade VI",
    price: 23700,
    image: "https://static.wikia.nocookie.net/builderment/images/3/39/Belt_speed_upgrade_5.png",
    unlocksTechnologies: [speedUpgradeVII],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 20000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 6,
        },
    ],
});
export const speedUpgradeV = new Technology({
    name: "Speed Upgrade V",
    price: 11900,
    image: "https://static.wikia.nocookie.net/builderment/images/3/39/Belt_speed_upgrade_5.png",
    unlocksTechnologies: [speedUpgradeVI],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 10000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 5,
        },
    ],
});
export const speedUpgradeIV = new Technology({
    name: "Speed Upgrade IV",
    price: 6000,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6a/Belt_speed_upgrade_4.png",
    unlocksTechnologies: [speedUpgradeV],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 5000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 4,
        },
    ],
});
export const speedUpgradeIII = new Technology({
    name: "Speed Upgrade III",
    price: 2400,
    image: "https://static.wikia.nocookie.net/builderment/images/a/aa/Belt_speed_upgrade_3.png",
    unlocksTechnologies: [speedUpgradeIV],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 3,
        },
    ],
});
export const speedUpgradeII = new Technology({
    name: "Speed Upgrade II",
    price: 1200,
    image: "https://static.wikia.nocookie.net/builderment/images/5/5a/Belt_speed_upgrade_2.png",
    unlocksTechnologies: [speedUpgradeIII],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 2,
        },
    ],
});
export const speedUpgradeI = new Technology({
    name: "Speed Upgrade I",
    price: 600,
    image: "https://static.wikia.nocookie.net/builderment/images/9/9d/Belt_speed_upgrade_1.png",
    unlocksTechnologies: [speedUpgradeII],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: transportations.conveyorBelt,
            tier: 1,
        },
    ],
});
export const advancedBelts = new Technology({
    name: "Advanced Belts",
    price: 60,
    image: "https://static.wikia.nocookie.net/builderment/images/f/f1/Belt_splitter_%26_underground_belt.png",
    unlocksTechnologies: [speedUpgradeI, undergroundBeltUpgrade1],
    resourcesNeeded: [
        {
            item: item.ironGear,
            amount: 50,
        },
    ],
    unlocks: [transportations.beltSplitter, transportations.undergroundBelt],
});

// Extractors
export const uraniumProcessing = new Technology({
    name: "Uranium Processing",
    price: 9100,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e6/Uranium_extractor_%26_enriched_uranium.png",
    unlocksTechnologies: [nuclearPower],
    resourcesNeeded: [
        {
            item: item.tungstenCarbide,
            amount: 1000,
        },
    ],
    unlocks: [factory.uraniumExtractor, item.enrichedUranium],
});
export const extractorUpgrade4 = new Technology({
    name: "Extractor Upgrade",
    price: 312100,
    image: "https://static.wikia.nocookie.net/builderment/images/b/ba/Extractor_tier_5.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.earthToken,
            amount: 20,
        },
    ],
    unlocks: [
        {
            build: factory.extractor,
            tier: 5,
        },
    ],
});
export const extractorUpgrade3 = new Technology({
    name: "Extractor Upgrade",
    price: 67200,
    image: "https://static.wikia.nocookie.net/builderment/images/9/9c/Extractor_tier_4.png",
    unlocksTechnologies: [extractorUpgrade4],
    resourcesNeeded: [
        {
            item: item.electricMotor,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.extractor,
            tier: 4,
        },
    ],
});
export const extractorUpgrade2 = new Technology({
    name: "Extractor Upgrade",
    price: 6900,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0f/Extractor_tier_3.png",
    unlocksTechnologies: [extractorUpgrade3],
    resourcesNeeded: [
        {
            item: item.metalFrame,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factory.extractor,
            tier: 3,
        },
    ],
});
export const extractorUpgrade1 = new Technology({
    name: "Extractor Upgrade",
    price: 1200,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e2/Extractor_tier_2.png",
    unlocksTechnologies: [extractorUpgrade2],
    resourcesNeeded: [
        {
            item: item.woodFrame,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factory.extractor,
            tier: 2,
        },
    ],
});

// Items
export const earthTeleporter = new Technology({
    name: "Earth Teleporter",
    price: 156100,
    image: "https://static.wikia.nocookie.net/builderment/images/d/dc/Earth_teleporter_%26_earth_token.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.matterDuplicator,
            amount: 10,
        },
    ],
    unlocks: [factory.earthTeleporter, item.earthToken],
});
export const matterDuplication = new Technology({
    name: "Matter Duplication",
    price: 145600,
    image: "https://static.wikia.nocookie.net/builderment/images/2/27/Matter_duplicator_%28tech%29.png",
    unlocksTechnologies: [earthTeleporter],
    resourcesNeeded: [
        {
            item: item.particleGlue,
            amount: 1000,
        },
        {
            item: item.quantumEntangler,
            amount: 50,
        },
    ],
    unlocks: [item.matterDuplicator],
});
export const quantumEntanglement = new Technology({
    name: "Quantum Entanglement",
    price: 51400,
    image: "https://static.wikia.nocookie.net/builderment/images/9/9f/Magnetic_field_generator_%26_quantum_entangler_%26_particle_glue.png",
    unlocksTechnologies: [matterDuplication],
    resourcesNeeded: [
        {
            item: item.atomicLocator,
            amount: 40,
        },
    ],
    unlocks: [item.magneticFieldGenerator, item.quantumEntangler, item.particleGlue],
});
export const atomicLocator = new Technology({
    name: "Atomic Locator",
    price: 26500,
    image: "https://static.wikia.nocookie.net/builderment/images/a/a9/Atomic_locator_%28tech%29.png",
    unlocksTechnologies: [quantumEntanglement],
    resourcesNeeded: [
        {
            item: item.superComputer,
            amount: 100,
        },
    ],
    unlocks: [item.atomicLocator],
});
export const energyCube = new Technology({
    name: "Energy Cube",
    price: 37600,
    image: "https://static.wikia.nocookie.net/builderment/images/a/a5/Energy_cube_%28tech%29.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.battery,
            amount: 200,
        },
        {
            item: item.industrialFrame,
            amount: 100,
        },
    ],
    unlocks: [item.energyCube],
});
export const matterCompressor = new Technology({
    name: "Matter Compressor",
    price: 48200,
    image: "https://static.wikia.nocookie.net/builderment/images/1/16/Tank_%26_matter_compressor.png",
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: item.turbocharger,
            amount: 200,
        },
        {
            item: item.industrialFrame,
            amount: 100,
        },
    ],
    unlocks: [item.tank, item.matterCompressor],
});
export const industrialFrame = new Technology({
    name: "Industrial Frame",
    price: 38300,
    image: "https://static.wikia.nocookie.net/builderment/images/2/2e/Industrial_frame_%28tech%29.png",
    unlocksTechnologies: [matterCompressor, energyCube],
    resourcesNeeded: [
        {
            item: item.concrete,
            amount: 1000,
        },
        {
            item: item.metalFrame,
            amount: 1000,
        },
        {
            item: item.tungstenCarbide,
            amount: 1000,
        },
    ],
    unlocks: [item.industrialFrame],
});
export const stabilizer = new Technology({
    name: "Stabilizer",
    price: 22300,
    image: "https://static.wikia.nocookie.net/builderment/images/7/71/Gyroscope_%26_stabilizer.png",
    unlocksTechnologies: [industrialFrame],
    resourcesNeeded: [
        {
            item: item.rotor,
            amount: 1000,
        },
    ],
    unlocks: [item.gyroscope, item.stabilizer],
});
export const superComputers = new Technology({
    name: "Super Computers",
    price: 16800,
    image: "https://static.wikia.nocookie.net/builderment/images/6/62/Coupler_%26_turbocharger.png",
    unlocksTechnologies: [stabilizer, atomicLocator],
    resourcesNeeded: [
        {
            item: item.computer,
            amount: 100,
        },
        {
            item: item.turbocharger,
            amount: 100,
        },
    ],
    unlocks: [item.superComputer],
});
export const turbocharger = new Technology({
    name: "Turbocharger",
    price: 8500,
    image: "https://static.wikia.nocookie.net/builderment/images/6/62/Coupler_%26_turbocharger.png",
    unlocksTechnologies: [superComputers],
    resourcesNeeded: [
        {
            item: item.tungstenCarbide,
            amount: 200,
        },
        {
            item: item.nanoWire,
            amount: 200,
        },
    ],
    unlocks: [item.coupler, item.turbocharger],
});
export const tungstenProduction = new Technology({
    name: "Tungsten Production",
    price: 600,
    image: "https://static.wikia.nocookie.net/builderment/images/4/47/Tungsten_ore_%26_tungsten_carbide.png",
    unlocksTechnologies: [uraniumProcessing, turbocharger, manufacturerUpgrade1],
    resourcesNeeded: [
        {
            item: item.wolframite,
            amount: 1000,
        },
    ],
    unlocks: [item.tungstenOre, item.tungstenCarbide],
});
export const microscopes = new Technology({
    name: "Microscopes",
    price: 13300,
    image: "https://static.wikia.nocookie.net/builderment/images/0/09/Manufacturer_%26_condenser_lens_%26_electron_microscope.png",
    unlocksTechnologies: [tungstenProduction],
    resourcesNeeded: [
        {
            item: item.nanoWire,
            amount: 400,
        },
    ],
    unlocks: [factory.manufacturer, item.condenserLens, item.electronMicroscope],
});
export const nanoWire = new Technology({
    name: "Nano Wire",
    price: 13500,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c9/Glass_%26_carbon_fiber_%26_nano_wire.png",
    unlocksTechnologies: [microscopes],
    resourcesNeeded: [
        {
            item: item.electricMotor,
            amount: 100,
        },
    ],
    unlocks: [item.glass, item.carbonFiber, item.nanoWire],
});
export const motors = new Technology({
    name: "Motors",
    price: 8000,
    image: "https://static.wikia.nocookie.net/builderment/images/4/41/Rotor_%26_electric_motor.png",
    unlocksTechnologies: [nanoWire],
    resourcesNeeded: [
        {
            item: item.battery,
            amount: 50,
        },
        {
            item: item.steelRod,
            amount: 200,
        },
    ],
    unlocks: [item.rotor, item.electricMotor],
});
export const batteries = new Technology({
    name: "Batteries",
    price: 4600,
    image: "https://static.wikia.nocookie.net/builderment/images/7/71/Battery_%28tech%29.png",
    unlocksTechnologies: [motors],
    resourcesNeeded: [
        {
            item: item.graphite,
            amount: 400,
        },
        {
            item: item.electromagnet,
            amount: 400,
        },
    ],
    unlocks: [item.battery],
});
export const concrete = new Technology({
    name: "Concrete",
    price: 2000,
    image: "https://static.wikia.nocookie.net/builderment/images/a/af/Steel_rod_%26_concrete.png",
    unlocksTechnologies: [forgeUpgrade1],
    resourcesNeeded: [
        {
            item: item.steel,
            amount: 200,
        },
        {
            item: item.sand,
            amount: 1000,
        },
    ],
    unlocks: [item.steelRod, item.concrete],
});
export const steelProduction = new Technology({
    name: "Steel Production",
    price: 3400,
    image: "https://static.wikia.nocookie.net/builderment/images/8/88/Forge_%26_graphite_%26_steel.png",
    unlocksTechnologies: [concrete, batteries, industrialFactoryUpgrade1],
    resourcesNeeded: [
        {
            item: item.computer,
            amount: 100,
        },
    ],
    unlocks: [factory.forge, item.graphite, item.steel],
});
export const computers = new Technology({
    name: "Computers",
    price: 2100,
    image: "https://static.wikia.nocookie.net/builderment/images/5/54/Industrial_factory_%26_heat_sink_%26_computer.png",
    unlocksTechnologies: [steelProduction],
    resourcesNeeded: [
        {
            item: item.ironPlating,
            amount: 500,
        },
        {
            item: item.logicCircuit,
            amount: 250,
        },
    ],
    unlocks: [factory.industrialFactory, item.heatSink, item.computer],
});
export const circuitry = new Technology({
    name: "Circuitry",
    price: 1300,
    image: "https://static.wikia.nocookie.net/builderment/images/6/65/Silicon_%26_logic_circuit.png",
    unlocksTechnologies: [robotics, computers],
    resourcesNeeded: [
        {
            item: item.copperWire,
            amount: 500,
        },
        {
            item: item.metalFrame,
            amount: 100,
        },
    ],
    unlocks: [item.sand, item.silicon, item.logicCircuit],
});
export const metalFrames = new Technology({
    name: "Metal Frames",
    price: 800,
    image: "https://static.wikia.nocookie.net/builderment/images/8/87/Iron_plating_%26_metal_frame.png",
    unlocksTechnologies: [storage, circuitry, machineShopUpgrade1],
    resourcesNeeded: [
        {
            item: item.electromagnet,
            amount: 100,
        },
    ],
    unlocks: [item.ironPlating, item.metalFrame],
});
export const magnets = new Technology({
    name: "Magnets",
    price: 120,
    image: "https://static.wikia.nocookie.net/builderment/images/1/11/Machine_shop_%26_electromagnet.png",
    unlocksTechnologies: [metalFrames, coalPower, furnaceUpgrade1],
    resourcesNeeded: [
        {
            item: item.copperWire,
            amount: 100,
        },
    ],
    unlocks: [factory.machineShop, item.electromagnet],
});
export const metalWorking = new Technology({
    name: "Metal Working",
    price: 60,
    image: "https://static.wikia.nocookie.net/builderment/images/7/76/Copper_wire_%26_iron_gear.png",
    unlocksTechnologies: [advancedBelts, magnets, workshopUpgrade1],
    resourcesNeeded: [
        {
            item: item.ironIngot,
            amount: 50,
        },
        {
            item: item.copperIngot,
            amount: 50,
        },
    ],
    unlocks: [item.copperWire, item.ironGear],
});

// Starting Point
export const smelting = new Technology({
    name: "Smelting",
    price: 50,
    image: "https://static.wikia.nocookie.net/builderment/images/0/04/Furnace_%26_iron_ingot_%26_copper_ingot.png",
    unlocksTechnologies: [extractorUpgrade1, metalWorking, decorativeTrees],
    resourcesNeeded: [
        {
            item: item.woodFrame,
            amount: 20,
        },
    ],
    unlocks: [factory.furnace, item.ironIngot, item.copperIngot],
});
export const woodFrame = new Technology({
    name: "Wood Frame",
    price: 20,
    image: "https://static.wikia.nocookie.net/builderment/images/1/1a/Wood_frame_%26_gold_vault.png",
    unlocksTechnologies: [smelting],
    resourcesNeeded: [
        {
            item: item.woodPlank,
            amount: 20,
        },
    ],
    unlocks: [item.woodFrame, other.goldVault],
});
export const woodPlanks = new Technology({
    name: "Wood Planks",
    price: 10,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0b/Workshop_%26_wood_plank.png",
    unlocksTechnologies: [woodFrame],
    resourcesNeeded: [
        {
            item: item.woodLog,
            amount: 10,
        },
    ],
    unlocks: [factory.workshop, item.woodPlank],
});
export const startingTech = new Technology({
    name: "Starting Tech",
    price: 0,
    image: "https://static.wikia.nocookie.net/builderment/images/b/bf/Lab_%26_belt_%26_extractor.png",
    unlocksTechnologies: [woodPlanks],
    resourcesNeeded: [],
    unlocks: [other.researchLab, transportations.conveyorBelt, factory.extractor],
});