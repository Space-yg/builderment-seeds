import { Technology } from "../classes/Technology.js";
import * as items from "./items.js";
import * as currencies from "./currencies.js";
import * as decorations from "./buildings/decorations.js";
import * as factories from "./buildings/factories.js";
import * as storages from "./buildings/storages.js";
import * as itemCollectors from "./buildings/item-collectors.js";
import * as powerPlants from "./buildings/power-plants.js";
import * as transportations from "./buildings/transportations.js";
export const manufacturerUpgrade3 = new Technology({
    name: "Manufacturer Upgrade",
    price: { gems: 452300 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.industrialFrame,
            amount: 2000,
        },
        {
            item: items.superComputer,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: factories.manufacturer,
            tier: 4,
        },
    ],
});
export const manufacturerUpgrade2 = new Technology({
    name: "Manufacturer Upgrade",
    price: { gems: 106500 },
    unlocksTechnologies: [manufacturerUpgrade3],
    resourcesNeeded: [
        {
            item: items.industrialFrame,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.manufacturer,
            tier: 3,
        },
    ],
});
export const manufacturerUpgrade1 = new Technology({
    name: "Manufacturer Upgrade",
    price: { gems: 25100 },
    unlocksTechnologies: [manufacturerUpgrade2],
    resourcesNeeded: [
        {
            item: items.tungstenCarbide,
            amount: 2000,
        },
        {
            item: items.steel,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.manufacturer,
            tier: 2,
        },
    ],
});
export const forgeUpgrade3 = new Technology({
    name: "Forge Upgrade",
    price: { gems: 132500 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.superComputer,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.forge,
            tier: 4,
        },
    ],
});
export const forgeUpgrade2 = new Technology({
    name: "Forge Upgrade",
    price: { gems: 27100 },
    unlocksTechnologies: [forgeUpgrade3],
    resourcesNeeded: [
        {
            item: items.carbonFiber,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: factories.forge,
            tier: 3,
        },
    ],
});
export const forgeUpgrade1 = new Technology({
    name: "Forge Upgrade",
    price: { gems: 9800 },
    unlocksTechnologies: [forgeUpgrade2],
    resourcesNeeded: [
        {
            item: items.steelRod,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.forge,
            tier: 2,
        },
    ],
});
export const industrialFactoryUpgrade3 = new Technology({
    name: "Industrial Factory Upgrade",
    price: { gems: 106500 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.industrialFrame,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.industrialFactory,
            tier: 4,
        },
    ],
});
export const industrialFactoryUpgrade2 = new Technology({
    name: "Industrial Factory Upgrade",
    price: { gems: 31400 },
    unlocksTechnologies: [industrialFactoryUpgrade3],
    resourcesNeeded: [
        {
            item: items.tungstenCarbide,
            amount: 1000,
        },
        {
            item: items.rotor,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.industrialFactory,
            tier: 3,
        },
    ],
});
export const industrialFactoryUpgrade1 = new Technology({
    name: "Industrial Factory Upgrade",
    price: { gems: 6900 },
    unlocksTechnologies: [industrialFactoryUpgrade2],
    resourcesNeeded: [
        {
            item: items.steel,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.industrialFactory,
            tier: 2,
        },
    ],
});
export const gemTree = new Technology({
    name: "Gem Tree",
    price: { gems: 2400 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.woodLog,
            amount: 1000,
        },
        {
            item: items.stone,
            amount: 1000,
        },
        {
            item: items.ironOre,
            amount: 1000,
        },
        {
            item: items.copperOre,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.gemTree,
            tier: 1
        }
    ],
});
export const earthStatue = new Technology({
    name: "Earth Statue",
    price: { gems: null },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.earthToken,
            amount: 500,
        },
    ],
    unlocks: [decorations.earthStatue],
});
export const particleStatue = new Technology({
    name: "Particle Statue",
    price: { gems: null },
    unlocksTechnologies: [earthStatue],
    resourcesNeeded: [
        {
            item: items.particleGlue,
            amount: 1000,
        },
    ],
    unlocks: [decorations.particleStatue],
});
export const steelStatue = new Technology({
    name: "Steel Statue",
    price: { gems: null },
    unlocksTechnologies: [particleStatue],
    resourcesNeeded: [
        {
            item: items.steel,
            amount: 5000,
        },
    ],
    unlocks: [decorations.steelStatue],
});
export const circuitStatue = new Technology({
    name: "Circuit Statue",
    price: { gems: null },
    unlocksTechnologies: [steelStatue],
    resourcesNeeded: [
        {
            item: items.logicCircuit,
            amount: 3000,
        },
    ],
    unlocks: [decorations.circuitStatue],
});
export const gearStatue = new Technology({
    name: "Gear Statue",
    price: { gems: null },
    unlocksTechnologies: [circuitStatue],
    resourcesNeeded: [
        {
            item: items.ironGear,
            amount: 2000,
        },
    ],
    unlocks: [decorations.gearStatue],
});
export const decorativeWalls = new Technology({
    name: "Decorative Walls",
    price: { gems: 1300 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.woodPlank,
            amount: 200,
        },
        {
            item: items.concrete,
            amount: 50,
        },
    ],
    unlocks: [decorations.fence, decorations.concreteWall],
});
export const factoryDecorations = new Technology({
    name: "Factory Decorations",
    price: { gems: 360 },
    unlocksTechnologies: [decorativeWalls],
    resourcesNeeded: [
        {
            item: items.copperWire,
            amount: 150,
        },
        {
            item: items.ironGear,
            amount: 150,
        },
    ],
    unlocks: [decorations.hazardCone, decorations.barrel, decorations.brokenPipe, decorations.woodenCrate],
});
export const decorativeRocks = new Technology({
    name: "Decorative Rocks",
    price: { gems: 300 },
    unlocksTechnologies: [factoryDecorations],
    resourcesNeeded: [
        {
            item: items.stone,
            amount: 500,
        },
    ],
    unlocks: [decorations.rock1, decorations.rock2, decorations.rock3],
});
export const festiveDecorations = new Technology({
    name: "Festive Decorations",
    price: { gems: 300 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.coal,
            amount: 50,
        },
    ],
    unlocks: [decorations.pumpkin, decorations.snowman],
});
export const decorativeTrees = new Technology({
    name: "Decorative Trees",
    price: { gems: 120 },
    unlocksTechnologies: [festiveDecorations, decorativeRocks, gearStatue],
    resourcesNeeded: [
        {
            item: items.woodFrame,
            amount: 50,
        },
    ],
    unlocks: [decorations.prettyTree, decorations.firTree, decorations.birchTree, decorations.palmTree],
});
export const roboticArmUpgrade3 = new Technology({
    name: "Robotic Arm Upgrade",
    price: { gems: 133500 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.electricMotor,
            amount: 5000,
        },
        {
            item: items.nanoWire,
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
    price: { gems: 22300 },
    unlocksTechnologies: [roboticArmUpgrade3],
    resourcesNeeded: [
        {
            item: items.rotor,
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
    price: { gems: 6700 },
    unlocksTechnologies: [roboticArmUpgrade2],
    resourcesNeeded: [
        {
            item: items.computer,
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
    price: { gems: 2100 },
    unlocksTechnologies: [gemTree, roboticArmUpgrade1],
    resourcesNeeded: [
        {
            item: items.woodPlank,
            amount: 1000,
        },
        {
            item: items.logicCircuit,
            amount: 2500,
        },
    ],
    unlocks: [
        {
            build: transportations.roboticArm,
            tier: 1,
        },
    ],
});
export const machineShopUpgrade3 = new Technology({
    name: "Machine Shop Upgrade",
    price: { gems: 40500 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.concrete,
            amount: 1000,
        },
        {
            item: items.coupler,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: factories.machineShop,
            tier: 4,
        },
    ],
});
export const machineShopUpgrade2 = new Technology({
    name: "Machine Shop Upgrade",
    price: { gems: 16600 },
    unlocksTechnologies: [machineShopUpgrade3],
    resourcesNeeded: [
        {
            item: items.computer,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.machineShop,
            tier: 3,
        },
    ],
});
export const machineShopUpgrade1 = new Technology({
    name: "Machine Shop Upgrade",
    price: { gems: 3200 },
    unlocksTechnologies: [machineShopUpgrade2],
    resourcesNeeded: [
        {
            item: items.ironPlating,
            amount: 2000,
        },
        {
            item: items.electromagnet,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: factories.machineShop,
            tier: 2,
        },
    ],
});
export const storageUpgrade3 = new Technology({
    name: "Storage Upgrade",
    price: { gems: 49700 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.metalFrame,
            amount: 4000,
        },
        {
            item: items.concrete,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: storages.storage,
            tier: 4,
        },
    ],
});
export const storageUpgrade2 = new Technology({
    name: "Storage Upgrade",
    price: { gems: 17200 },
    unlocksTechnologies: [storageUpgrade3],
    resourcesNeeded: [
        {
            item: items.metalFrame,
            amount: 2000,
        },
        {
            item: items.steel,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: storages.storage,
            tier: 3,
        },
    ],
});
export const storageUpgrade1 = new Technology({
    name: "Storage Upgrade",
    price: { gems: 6900 },
    unlocksTechnologies: [storageUpgrade2],
    resourcesNeeded: [
        {
            item: items.metalFrame,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: storages.storage,
            tier: 2,
        },
    ],
});
export const storage = new Technology({
    name: "Storage",
    price: { gems: 1100 },
    unlocksTechnologies: [storageUpgrade1],
    resourcesNeeded: [
        {
            item: items.metalFrame,
            amount: 150,
        },
    ],
    unlocks: [
        {
            build: storages.storage,
            tier: 1,
        },
    ],
});
export const furnaceUpgrade3 = new Technology({
    name: "Furnace Upgrade",
    price: { gems: 33200 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.nanoWire,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.furnace,
            tier: 4,
        },
    ],
});
export const furnaceUpgrade2 = new Technology({
    name: "Furnace Upgrade",
    price: { gems: 14600 },
    unlocksTechnologies: [furnaceUpgrade3],
    resourcesNeeded: [
        {
            item: items.heatSink,
            amount: 5000,
        },
    ],
    unlocks: [
        {
            build: factories.furnace,
            tier: 3,
        },
    ],
});
export const furnaceUpgrade1 = new Technology({
    name: "Furnace Upgrade",
    price: { gems: 4000 },
    unlocksTechnologies: [furnaceUpgrade2],
    resourcesNeeded: [
        {
            item: items.electromagnet,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.furnace,
            tier: 2,
        },
    ],
});
export const nuclearPower = new Technology({
    name: "Nuclear Power",
    price: { gems: 81500 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.concrete,
            amount: 1000,
        },
        {
            item: items.steel,
            amount: 1000,
        },
        {
            item: items.enrichedUranium,
            amount: 100,
        },
    ],
    unlocks: [powerPlants.nuclearPowerPlant, items.emptyFuelCell, items.nuclearFuelCell],
});
export const coalPower = new Technology({
    name: "Coal Power",
    price: { gems: 600 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.coal,
            amount: 1000,
        },
    ],
    unlocks: [powerPlants.coalPowerPlant],
});
export const workshopUpgrade3 = new Technology({
    name: "Workshop Upgrade",
    price: { gems: 134400 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.turbocharger,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.workshop,
            tier: 4,
        },
    ],
});
export const workshopUpgrade2 = new Technology({
    name: "Workshop Upgrade",
    price: { gems: 17400 },
    unlocksTechnologies: [workshopUpgrade3],
    resourcesNeeded: [
        {
            item: items.ironGear,
            amount: 5000,
        },
        {
            item: items.logicCircuit,
            amount: 2000,
        },
    ],
    unlocks: [
        {
            build: factories.workshop,
            tier: 3,
        },
    ],
});
export const workshopUpgrade1 = new Technology({
    name: "Workshop Upgrade",
    price: { gems: 1200 },
    unlocksTechnologies: [workshopUpgrade2],
    resourcesNeeded: [
        {
            item: items.copperWire,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.workshop,
            tier: 2,
        },
    ],
});
export const undergroundBeltUpgrade2 = new Technology({
    name: "Underground Belt Upgrade",
    price: { gems: 116100 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.turbocharger,
            amount: 200,
        },
        {
            item: items.concrete,
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
    price: { gems: 25700 },
    unlocksTechnologies: [undergroundBeltUpgrade2],
    resourcesNeeded: [
        {
            item: items.nanoWire,
            amount: 100,
        },
        {
            item: items.concrete,
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
    price: { gems: 1700000 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.ironGear,
            amount: 150000,
        },
        {
            item: items.earthToken,
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
    price: { gems: 898500 },
    unlocksTechnologies: [speedUpgradeXII],
    resourcesNeeded: [
        {
            item: items.ironGear,
            amount: 100000,
        },
        {
            item: items.earthToken,
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
    price: { gems: 94700 },
    unlocksTechnologies: [speedUpgradeXI],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 71100 },
    unlocksTechnologies: [speedUpgradeX],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 47400 },
    unlocksTechnologies: [speedUpgradeIX],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 35600 },
    unlocksTechnologies: [speedUpgradeVIII],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 23700 },
    unlocksTechnologies: [speedUpgradeVII],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 11900 },
    unlocksTechnologies: [speedUpgradeVI],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 6000 },
    unlocksTechnologies: [speedUpgradeV],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 2400 },
    unlocksTechnologies: [speedUpgradeIV],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 1200 },
    unlocksTechnologies: [speedUpgradeIII],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 600 },
    unlocksTechnologies: [speedUpgradeII],
    resourcesNeeded: [
        {
            item: items.ironGear,
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
    price: { gems: 60 },
    unlocksTechnologies: [speedUpgradeI, undergroundBeltUpgrade1],
    resourcesNeeded: [
        {
            item: items.ironGear,
            amount: 50,
        },
    ],
    unlocks: [
        {
            build: transportations.beltSplitter,
            tier: 0,
        },
        {
            build: transportations.undergroundBelt,
            tier: 0,
        },
    ],
});
export const uraniumProcessing = new Technology({
    name: "Uranium Processing",
    price: { gems: 9100 },
    unlocksTechnologies: [nuclearPower],
    resourcesNeeded: [
        {
            item: items.tungstenCarbide,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.uraniumExtractor,
            tier: 1,
        },
        items.enrichedUranium,
    ],
});
export const extractorUpgrade4 = new Technology({
    name: "Extractor Upgrade",
    price: { gems: 312100 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.earthToken,
            amount: 20,
        },
    ],
    unlocks: [
        {
            build: factories.extractor,
            tier: 5,
        },
    ],
});
export const extractorUpgrade3 = new Technology({
    name: "Extractor Upgrade",
    price: { gems: 67200 },
    unlocksTechnologies: [extractorUpgrade4],
    resourcesNeeded: [
        {
            item: items.electricMotor,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.extractor,
            tier: 4,
        },
    ],
});
export const extractorUpgrade2 = new Technology({
    name: "Extractor Upgrade",
    price: { gems: 6900 },
    unlocksTechnologies: [extractorUpgrade3],
    resourcesNeeded: [
        {
            item: items.metalFrame,
            amount: 1000,
        },
    ],
    unlocks: [
        {
            build: factories.extractor,
            tier: 3,
        },
    ],
});
export const extractorUpgrade1 = new Technology({
    name: "Extractor Upgrade",
    price: { gems: 1200 },
    unlocksTechnologies: [extractorUpgrade2],
    resourcesNeeded: [
        {
            item: items.woodFrame,
            amount: 500,
        },
    ],
    unlocks: [
        {
            build: factories.extractor,
            tier: 2,
        },
    ],
});
export const earthTeleporter = new Technology({
    name: "Earth Teleporter",
    price: { gems: 156100 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.matterDuplicator,
            amount: 10,
        },
    ],
    unlocks: [
        {
            build: factories.earthTeleporter,
            tier: 1,
        },
        items.earthToken,
    ],
});
export const matterDuplication = new Technology({
    name: "Matter Duplication",
    price: { gems: 145600 },
    unlocksTechnologies: [earthTeleporter],
    resourcesNeeded: [
        {
            item: items.particleGlue,
            amount: 1000,
        },
        {
            item: items.quantumEntangler,
            amount: 50,
        },
    ],
    unlocks: [items.matterDuplicator],
});
export const quantumEntanglement = new Technology({
    name: "Quantum Entanglement",
    price: { gems: 51400 },
    unlocksTechnologies: [matterDuplication],
    resourcesNeeded: [
        {
            item: items.atomicLocator,
            amount: 40,
        },
    ],
    unlocks: [items.magneticFieldGenerator, items.quantumEntangler, items.particleGlue],
});
export const atomicLocator = new Technology({
    name: "Atomic Locator",
    price: { gems: 26500 },
    unlocksTechnologies: [quantumEntanglement],
    resourcesNeeded: [
        {
            item: items.superComputer,
            amount: 100,
        },
    ],
    unlocks: [items.atomicLocator],
});
export const energyCube = new Technology({
    name: "Energy Cube",
    price: { gems: 37600 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.battery,
            amount: 200,
        },
        {
            item: items.industrialFrame,
            amount: 100,
        },
    ],
    unlocks: [items.energyCube],
});
export const matterCompressor = new Technology({
    name: "Matter Compressor",
    price: { gems: 48200 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.turbocharger,
            amount: 200,
        },
        {
            item: items.industrialFrame,
            amount: 100,
        },
    ],
    unlocks: [items.tank, items.matterCompressor],
});
export const industrialFrame = new Technology({
    name: "Industrial Frame",
    price: { gems: 38300 },
    unlocksTechnologies: [matterCompressor, energyCube],
    resourcesNeeded: [
        {
            item: items.concrete,
            amount: 1000,
        },
        {
            item: items.metalFrame,
            amount: 1000,
        },
        {
            item: items.tungstenCarbide,
            amount: 1000,
        },
    ],
    unlocks: [items.industrialFrame],
});
export const stabilizer = new Technology({
    name: "Stabilizer",
    price: { gems: 22300 },
    unlocksTechnologies: [industrialFrame],
    resourcesNeeded: [
        {
            item: items.rotor,
            amount: 1000,
        },
    ],
    unlocks: [items.gyroscope, items.stabilizer],
});
export const superComputers = new Technology({
    name: "Super Computers",
    price: { gems: 16800 },
    unlocksTechnologies: [stabilizer, atomicLocator],
    resourcesNeeded: [
        {
            item: items.computer,
            amount: 100,
        },
        {
            item: items.turbocharger,
            amount: 100,
        },
    ],
    unlocks: [items.superComputer],
});
export const turbocharger = new Technology({
    name: "Turbocharger",
    price: { gems: 8500 },
    unlocksTechnologies: [superComputers],
    resourcesNeeded: [
        {
            item: items.tungstenCarbide,
            amount: 200,
        },
        {
            item: items.nanoWire,
            amount: 200,
        },
    ],
    unlocks: [items.coupler, items.turbocharger],
});
export const tungstenProduction = new Technology({
    name: "Tungsten Production",
    price: { gems: 600 },
    unlocksTechnologies: [uraniumProcessing, turbocharger, manufacturerUpgrade1],
    resourcesNeeded: [
        {
            item: items.wolframite,
            amount: 1000,
        },
    ],
    unlocks: [items.tungstenOre, items.tungstenCarbide],
});
export const microscopes = new Technology({
    name: "Microscopes",
    price: { gems: 13300 },
    unlocksTechnologies: [tungstenProduction],
    resourcesNeeded: [
        {
            item: items.nanoWire,
            amount: 400,
        },
    ],
    unlocks: [
        {
            build: factories.manufacturer,
            tier: 1,
        },
        items.condenserLens,
        items.electronMicroscope,
    ],
});
export const nanoWire = new Technology({
    name: "Nano Wire",
    price: { gems: 13500 },
    unlocksTechnologies: [microscopes],
    resourcesNeeded: [
        {
            item: items.electricMotor,
            amount: 100,
        },
    ],
    unlocks: [items.glass, items.carbonFiber, items.nanoWire],
});
export const motors = new Technology({
    name: "Motors",
    price: { gems: 8000 },
    unlocksTechnologies: [nanoWire],
    resourcesNeeded: [
        {
            item: items.battery,
            amount: 50,
        },
        {
            item: items.steelRod,
            amount: 200,
        },
    ],
    unlocks: [items.rotor, items.electricMotor],
});
export const batteries = new Technology({
    name: "Batteries",
    price: { gems: 4600 },
    unlocksTechnologies: [motors],
    resourcesNeeded: [
        {
            item: items.graphite,
            amount: 400,
        },
        {
            item: items.electromagnet,
            amount: 400,
        },
    ],
    unlocks: [items.battery],
});
export const concrete = new Technology({
    name: "Concrete",
    price: { gems: 2000 },
    unlocksTechnologies: [forgeUpgrade1],
    resourcesNeeded: [
        {
            item: items.steel,
            amount: 200,
        },
        {
            item: items.sand,
            amount: 1000,
        },
    ],
    unlocks: [items.steelRod, items.concrete],
});
export const steelProduction = new Technology({
    name: "Steel Production",
    price: { gems: 3400 },
    unlocksTechnologies: [concrete, batteries, industrialFactoryUpgrade1],
    resourcesNeeded: [
        {
            item: items.computer,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: factories.forge,
            tier: 1,
        },
        items.graphite,
        items.steel,
    ],
});
export const goldVault = new Technology({
    name: "Gold Vault",
    price: { gems: null },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: currencies.gold,
            amount: 20000,
        }
    ],
    unlocks: [itemCollectors.goldVault]
});
export const computers = new Technology({
    name: "Computers",
    price: { gems: 2100 },
    unlocksTechnologies: [steelProduction, goldVault],
    resourcesNeeded: [
        {
            item: items.ironPlating,
            amount: 500,
        },
        {
            item: items.logicCircuit,
            amount: 250,
        },
    ],
    unlocks: [
        {
            build: factories.industrialFactory,
            tier: 1,
        },
        items.heatSink,
        items.computer,
    ],
});
export const circuitry = new Technology({
    name: "Circuitry",
    price: { gems: 1300 },
    unlocksTechnologies: [robotics, computers],
    resourcesNeeded: [
        {
            item: items.copperWire,
            amount: 500,
        },
        {
            item: items.metalFrame,
            amount: 100,
        },
    ],
    unlocks: [items.silicon, items.logicCircuit],
});
export const sand = new Technology({
    name: "Sand",
    price: { gems: 100 },
    unlocksTechnologies: [],
    resourcesNeeded: [
        {
            item: items.stone,
            amount: 100,
        },
    ],
    unlocks: [items.sand],
});
export const metalFrames = new Technology({
    name: "Metal Frames",
    price: { gems: 800 },
    unlocksTechnologies: [storage, sand, circuitry, machineShopUpgrade1],
    resourcesNeeded: [
        {
            item: items.electromagnet,
            amount: 100,
        },
    ],
    unlocks: [items.ironPlating, items.metalFrame],
});
export const magnets = new Technology({
    name: "Magnets",
    price: { gems: 120 },
    unlocksTechnologies: [metalFrames, coalPower, furnaceUpgrade1],
    resourcesNeeded: [
        {
            item: items.copperWire,
            amount: 100,
        },
    ],
    unlocks: [
        {
            build: factories.machineShop,
            tier: 1,
        },
        items.electromagnet,
    ],
});
export const metalWorking = new Technology({
    name: "Metal Working",
    price: { gems: 60 },
    unlocksTechnologies: [advancedBelts, magnets, workshopUpgrade1],
    resourcesNeeded: [
        {
            item: items.ironIngot,
            amount: 50,
        },
        {
            item: items.copperIngot,
            amount: 50,
        },
    ],
    unlocks: [items.copperWire, items.ironGear],
});
export const smelting = new Technology({
    name: "Smelting",
    price: { gems: 50 },
    unlocksTechnologies: [extractorUpgrade1, metalWorking, decorativeTrees],
    resourcesNeeded: [
        {
            item: items.woodFrame,
            amount: 20,
        },
    ],
    unlocks: [
        {
            build: factories.furnace,
            tier: 1,
        },
        items.ironIngot,
        items.copperIngot,
    ],
});
export const woodFrame = new Technology({
    name: "Wood Frame",
    price: { gems: 20 },
    unlocksTechnologies: [smelting],
    resourcesNeeded: [
        {
            item: items.woodPlank,
            amount: 20,
        },
    ],
    unlocks: [items.woodFrame],
});
export const woodPlanks = new Technology({
    name: "Wood Planks",
    price: { gems: 10 },
    unlocksTechnologies: [woodFrame],
    resourcesNeeded: [
        {
            item: items.woodLog,
            amount: 10,
        },
    ],
    unlocks: [
        {
            build: factories.workshop,
            tier: 1,
        },
        items.woodPlank,
    ],
});
export const startingTech = new Technology({
    name: "Starting Tech",
    price: { gems: null },
    unlocksTechnologies: [woodPlanks],
    resourcesNeeded: [],
    unlocks: [
        itemCollectors.researchLab,
        {
            build: transportations.conveyorBelt,
            tier: 0,
        },
        {
            build: factories.extractor,
            tier: 1,
        },
    ],
    technologyNeeded: null,
});
woodPlanks.technologyNeeded = startingTech;
woodFrame.technologyNeeded = woodPlanks;
smelting.technologyNeeded = woodFrame;
metalWorking.technologyNeeded = smelting;
magnets.technologyNeeded = metalWorking;
metalFrames.technologyNeeded = magnets;
sand.technologyNeeded = metalFrames;
circuitry.technologyNeeded = metalFrames;
computers.technologyNeeded = circuitry;
steelProduction.technologyNeeded = computers;
batteries.technologyNeeded = steelProduction;
motors.technologyNeeded = batteries;
nanoWire.technologyNeeded = motors;
microscopes.technologyNeeded = nanoWire;
tungstenProduction.technologyNeeded = microscopes;
turbocharger.technologyNeeded = tungstenProduction;
superComputers.technologyNeeded = turbocharger;
stabilizer.technologyNeeded = superComputers;
industrialFrame.technologyNeeded = stabilizer;
matterCompressor.technologyNeeded = industrialFrame;
energyCube.technologyNeeded = industrialFrame;
atomicLocator.technologyNeeded = superComputers;
quantumEntanglement.technologyNeeded = atomicLocator;
matterDuplication.technologyNeeded = quantumEntanglement;
earthTeleporter.technologyNeeded = matterDuplication;
extractorUpgrade1.technologyNeeded = smelting;
extractorUpgrade2.technologyNeeded = extractorUpgrade1;
extractorUpgrade3.technologyNeeded = extractorUpgrade2;
extractorUpgrade4.technologyNeeded = extractorUpgrade3;
uraniumProcessing.technologyNeeded = tungstenProduction;
advancedBelts.technologyNeeded = metalWorking;
speedUpgradeI.technologyNeeded = advancedBelts;
speedUpgradeII.technologyNeeded = speedUpgradeI;
speedUpgradeIII.technologyNeeded = speedUpgradeII;
speedUpgradeIV.technologyNeeded = speedUpgradeIII;
speedUpgradeV.technologyNeeded = speedUpgradeIV;
speedUpgradeVI.technologyNeeded = speedUpgradeV;
speedUpgradeVII.technologyNeeded = speedUpgradeVI;
speedUpgradeVIII.technologyNeeded = speedUpgradeVII;
speedUpgradeIX.technologyNeeded = speedUpgradeVIII;
speedUpgradeX.technologyNeeded = speedUpgradeIX;
speedUpgradeXI.technologyNeeded = speedUpgradeX;
speedUpgradeXII.technologyNeeded = speedUpgradeXI;
undergroundBeltUpgrade1.technologyNeeded = advancedBelts;
undergroundBeltUpgrade2.technologyNeeded = undergroundBeltUpgrade1;
workshopUpgrade1.technologyNeeded = metalWorking;
workshopUpgrade2.technologyNeeded = workshopUpgrade1;
workshopUpgrade3.technologyNeeded = workshopUpgrade2;
coalPower.technologyNeeded = magnets;
nuclearPower.technologyNeeded = uraniumProcessing;
furnaceUpgrade1.technologyNeeded = magnets;
furnaceUpgrade2.technologyNeeded = furnaceUpgrade1;
furnaceUpgrade3.technologyNeeded = furnaceUpgrade2;
storage.technologyNeeded = metalFrames;
storageUpgrade1.technologyNeeded = storage;
storageUpgrade2.technologyNeeded = storageUpgrade1;
storageUpgrade3.technologyNeeded = storageUpgrade2;
machineShopUpgrade1.technologyNeeded = metalFrames;
machineShopUpgrade2.technologyNeeded = machineShopUpgrade1;
machineShopUpgrade3.technologyNeeded = machineShopUpgrade2;
robotics.technologyNeeded = circuitry;
roboticArmUpgrade1.technologyNeeded = robotics;
roboticArmUpgrade2.technologyNeeded = roboticArmUpgrade1;
roboticArmUpgrade3.technologyNeeded = roboticArmUpgrade2;
decorativeTrees.technologyNeeded = smelting;
festiveDecorations.technologyNeeded = decorativeTrees;
decorativeRocks.technologyNeeded = decorativeTrees;
factoryDecorations.technologyNeeded = decorativeRocks;
decorativeWalls.technologyNeeded = factoryDecorations;
gearStatue.technologyNeeded = decorativeTrees;
circuitStatue.technologyNeeded = gearStatue;
steelStatue.technologyNeeded = circuitStatue;
particleStatue.technologyNeeded = steelStatue;
earthStatue.technologyNeeded = particleStatue;
gemTree.technologyNeeded = robotics;
industrialFactoryUpgrade1.technologyNeeded = steelProduction;
industrialFactoryUpgrade2.technologyNeeded = industrialFactoryUpgrade1;
industrialFactoryUpgrade3.technologyNeeded = industrialFactoryUpgrade2;
forgeUpgrade1.technologyNeeded = concrete;
forgeUpgrade2.technologyNeeded = forgeUpgrade1;
forgeUpgrade3.technologyNeeded = forgeUpgrade2;
manufacturerUpgrade1.technologyNeeded = tungstenProduction;
manufacturerUpgrade2.technologyNeeded = manufacturerUpgrade1;
manufacturerUpgrade3.technologyNeeded = manufacturerUpgrade2;
goldVault.technologyNeeded = computers;
