import { Item } from "../classes/Item.js";
import * as factory from "./buildings/factories.js";
import { coalPowerPlant, nuclearPowerPlant } from "./buildings/power-plants.js";
export const woodLog = new Item({
    name: "Wood Log",
    price: { gold: 1 },
    factory: factory.extractor,
    resourcesNeeded: [],
    outputPerMin: 7.5,
});
export const stone = new Item({
    name: "Stone",
    price: { gold: 1 },
    factory: factory.extractor,
    resourcesNeeded: [],
    outputPerMin: 7.5,
});
export const ironOre = new Item({
    name: "Iron Ore",
    price: { gold: 1 },
    factory: factory.extractor,
    resourcesNeeded: [],
    outputPerMin: 7.5,
});
export const copperOre = new Item({
    name: "Copper Ore",
    price: { gold: 1 },
    factory: factory.extractor,
    resourcesNeeded: [],
    outputPerMin: 7.5,
});
export const coal = new Item({
    name: "Coal",
    price: { gold: 1 },
    factory: factory.extractor,
    resourcesNeeded: [],
    outputPerMin: 7.5,
});
coalPowerPlant.input = {
    item: coal,
    amount: 5,
    inputPerMin: 20,
};
export const wolframite = new Item({
    name: "Wolframite",
    price: { gold: 1 },
    factory: factory.extractor,
    resourcesNeeded: [],
    outputPerMin: 7.5,
});
export const woodPlank = new Item({
    name: "Wood Plank",
    price: { gold: 1 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: woodLog,
            amount: 1,
        },
    ],
    outputPerMin: 15,
});
export const sand = new Item({
    name: "Sand",
    price: { gold: 1 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: stone,
            amount: 1,
        },
    ],
    outputPerMin: 40,
});
export const ironIngot = new Item({
    name: "Iron Ingot",
    price: { gold: 1 },
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: ironOre,
            amount: 1,
        },
    ],
    outputPerMin: 30,
});
export const copperIngot = new Item({
    name: "Copper Ingot",
    price: { gold: 1 },
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: copperOre,
            amount: 1,
        },
    ],
    outputPerMin: 30,
});
export const tungstenOre = new Item({
    name: "Tungsten Ore",
    price: { gold: 5 },
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: wolframite,
            amount: 5,
        },
    ],
    outputPerMin: 24,
});
export const graphite = new Item({
    name: "Graphite",
    price: { gold: 6 },
    factory: factory.forge,
    resourcesNeeded: [
        {
            item: coal,
            amount: 3,
        },
        {
            item: woodLog,
            amount: 3,
        },
    ],
    outputPerMin: 15,
});
export const woodFrame = new Item({
    name: "Wood Frame",
    price: { gold: 1 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: woodPlank,
            amount: 4,
        },
    ],
    outputPerMin: 7.5,
});
export const copperWire = new Item({
    name: "Copper Wire",
    price: { gold: 2 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: copperIngot,
            amount: 3,
        },
    ],
    outputPerMin: 30,
    outputAmount: 2,
});
export const heatSink = new Item({
    name: "Heat Sink",
    price: { gold: 5 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: copperIngot,
            amount: 5,
        },
    ],
    outputPerMin: 10,
});
export const ironGear = new Item({
    name: "Iron Gear",
    price: { gold: 2 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: ironIngot,
            amount: 2,
        },
    ],
    outputPerMin: 15,
});
export const ironPlating = new Item({
    name: "Iron Plating",
    price: { gold: 2 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: ironIngot,
            amount: 4,
        },
    ],
    outputPerMin: 20,
    outputAmount: 2,
});
export const steel = new Item({
    name: "Steel",
    price: { gold: 12 },
    factory: factory.forge,
    resourcesNeeded: [
        {
            item: graphite,
            amount: 1,
        },
        {
            item: ironOre,
            amount: 6,
        },
    ],
    outputPerMin: 7.5,
});
export const steelRod = new Item({
    name: "Steel Rod",
    price: { gold: 35 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: steel,
            amount: 3,
        },
    ],
    outputPerMin: 15,
});
export const glass = new Item({
    name: "Glass",
    price: { gold: 4 },
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: sand,
            amount: 4,
        },
    ],
    outputPerMin: 10,
});
export const condenserLens = new Item({
    name: "Condenser Lens",
    price: { gold: 12 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: glass,
            amount: 3,
        },
    ],
    outputPerMin: 40,
});
export const carbonFiber = new Item({
    name: "Carbon Fiber",
    price: { gold: 24 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: graphite,
            amount: 4,
        },
    ],
    outputPerMin: 7.5,
});
export const tungstenCarbide = new Item({
    name: "Tungsten Carbide",
    price: { gold: 16 },
    factory: factory.forge,
    resourcesNeeded: [
        {
            item: tungstenOre,
            amount: 2,
        },
        {
            item: graphite,
            amount: 1,
        },
    ],
    outputPerMin: 12,
});
export const coupler = new Item({
    name: "Coupler",
    price: { gold: 16 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: tungstenCarbide,
            amount: 1,
        },
    ],
    outputPerMin: 6,
});
export const concrete = new Item({
    name: "Concrete",
    price: { gold: 40 },
    factory: factory.forge,
    resourcesNeeded: [
        {
            item: sand,
            amount: 10,
        },
        {
            item: steelRod,
            amount: 1,
        },
    ],
    outputPerMin: 7.5,
});
export const metalFrame = new Item({
    name: "Metal Frame",
    price: { gold: 12 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: woodFrame,
            amount: 1,
        },
        {
            item: ironPlating,
            amount: 4,
        },
    ],
    outputPerMin: 5,
});
export const industrialFrame = new Item({
    name: "Industrial Frame",
    price: { gold: 400 },
    factory: factory.industrialFactory,
    resourcesNeeded: [
        {
            item: concrete,
            amount: 6,
        },
        {
            item: metalFrame,
            amount: 2,
        },
        {
            item: tungstenCarbide,
            amount: 8,
        },
    ],
    outputPerMin: 3,
});
export const silicon = new Item({
    name: "Silicon",
    price: { gold: 2 },
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: sand,
            amount: 2,
        },
    ],
    outputPerMin: 20,
});
export const logicCircuit = new Item({
    name: "Logic Circuit",
    price: { gold: 10 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: copperWire,
            amount: 3,
        },
        {
            item: silicon,
            amount: 2,
        },
    ],
    outputPerMin: 10,
});
export const nanoWire = new Item({
    name: "Nano Wire",
    price: { gold: 60 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: carbonFiber,
            amount: 2,
        },
        {
            item: glass,
            amount: 4,
        },
    ],
    outputPerMin: 5,
});
export const turbocharger = new Item({
    name: "Turbocharger",
    price: { gold: 250 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: ironGear,
            amount: 8,
        },
        {
            item: logicCircuit,
            amount: 4,
        },
        {
            item: nanoWire,
            amount: 2,
        },
        {
            item: coupler,
            amount: 4,
        },
    ],
    outputPerMin: 4,
});
export const electromagnet = new Item({
    name: "Electromagnet",
    price: { gold: 14 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: copperWire,
            amount: 6,
        },
        {
            item: ironIngot,
            amount: 2,
        },
    ],
    outputPerMin: 10,
});
export const battery = new Item({
    name: "Battery",
    price: { gold: 150 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: electromagnet,
            amount: 8,
        },
        {
            item: graphite,
            amount: 8,
        },
    ],
    outputPerMin: 2.5,
});
export const rotor = new Item({
    name: "Rotor",
    price: { gold: 40 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: steelRod,
            amount: 1,
        },
        {
            item: ironPlating,
            amount: 2,
        },
    ],
    outputPerMin: 10,
});
export const electricMotor = new Item({
    name: "Electric Motor",
    price: { gold: 250 },
    factory: factory.industrialFactory,
    resourcesNeeded: [
        {
            item: battery,
            amount: 1,
        },
        {
            item: ironGear,
            amount: 4,
        },
        {
            item: rotor,
            amount: 2,
        },
    ],
    outputPerMin: 3,
});
export const tank = new Item({
    name: "Tank",
    price: { gold: 250 },
    factory: factory.industrialFactory,
    resourcesNeeded: [
        {
            item: glass,
            amount: 2,
        },
        {
            item: concrete,
            amount: 4,
        },
        {
            item: tungstenCarbide,
            amount: 4,
        },
    ],
    outputPerMin: 6,
});
export const matterCompressor = new Item({
    name: "Matter Compressor",
    price: { gold: 1500 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: industrialFrame,
            amount: 1,
        },
        {
            item: turbocharger,
            amount: 2,
        },
        {
            item: electricMotor,
            amount: 2,
        },
        {
            item: tank,
            amount: 1,
        },
    ],
    outputPerMin: 2,
});
export const particleGlue = new Item({
    name: "Particle Glue",
    price: { gold: 150 },
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: matterCompressor,
            amount: 1,
        },
    ],
    outputPerMin: 20,
    outputAmount: 10,
});
export const gyroscope = new Item({
    name: "Gyroscope",
    price: { gold: 100 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: copperWire,
            amount: 12,
        },
        {
            item: rotor,
            amount: 2,
        },
    ],
    outputPerMin: 5,
});
export const energyCube = new Item({
    name: "Energy Cube",
    price: { gold: 700 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: battery,
            amount: 2,
        },
        {
            item: industrialFrame,
            amount: 1,
        },
    ],
    outputPerMin: 2,
});
export const computer = new Item({
    name: "Computer",
    price: { gold: 60 },
    factory: factory.industrialFactory,
    resourcesNeeded: [
        {
            item: metalFrame,
            amount: 1,
        },
        {
            item: heatSink,
            amount: 3,
        },
        {
            item: logicCircuit,
            amount: 3,
        },
    ],
    outputPerMin: 7.5,
});
export const stabilizer = new Item({
    name: "Stabilizer",
    price: { gold: 500 },
    factory: factory.industrialFactory,
    resourcesNeeded: [
        {
            item: computer,
            amount: 1,
        },
        {
            item: electricMotor,
            amount: 1,
        },
        {
            item: gyroscope,
            amount: 2,
        },
    ],
    outputPerMin: 2.5,
});
export const magneticFieldGenerator = new Item({
    name: "Magnetic Field Generator",
    price: { gold: 1500 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: stabilizer,
            amount: 1,
        },
        {
            item: industrialFrame,
            amount: 1,
        },
        {
            item: electromagnet,
            amount: 10,
        },
        {
            item: nanoWire,
            amount: 10,
        },
    ],
    outputPerMin: 1.5,
});
export const quantumEntangler = new Item({
    name: "Quantum Entangler",
    price: { gold: 2500 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: magneticFieldGenerator,
            amount: 1,
        },
        {
            item: stabilizer,
            amount: 2,
        },
    ],
    outputPerMin: 1,
});
export const electronMicroscope = new Item({
    name: "Electron Microscope",
    price: { gold: 300 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: nanoWire,
            amount: 2,
        },
        {
            item: electromagnet,
            amount: 8,
        },
        {
            item: condenserLens,
            amount: 4,
        },
        {
            item: metalFrame,
            amount: 2,
        },
    ],
    outputPerMin: 2.5,
});
export const superComputer = new Item({
    name: "Super Computer",
    price: { gold: 500 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: computer,
            amount: 2,
        },
        {
            item: heatSink,
            amount: 8,
        },
        {
            item: turbocharger,
            amount: 1,
        },
        {
            item: coupler,
            amount: 8,
        },
    ],
    outputPerMin: 2,
});
export const atomicLocator = new Item({
    name: "Atomic Locator",
    price: { gold: 2500 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: superComputer,
            amount: 2,
        },
        {
            item: electronMicroscope,
            amount: 2,
        },
        {
            item: concrete,
            amount: 24,
        },
        {
            item: copperWire,
            amount: 50,
        },
    ],
    outputPerMin: 2,
});
export const matterDuplicator = new Item({
    name: "Matter Duplicator",
    price: { gold: 32000 },
    factory: factory.manufacturer,
    resourcesNeeded: [
        {
            item: atomicLocator,
            amount: 4,
        },
        {
            item: quantumEntangler,
            amount: 2,
        },
        {
            item: energyCube,
            amount: 5,
        },
        {
            item: particleGlue,
            amount: 100,
        },
    ],
    outputPerMin: 2 / 3,
});
export const earthToken = new Item({
    name: "Earth Token",
    price: { gold: 32000 },
    factory: factory.earthTeleporter,
    resourcesNeeded: [
        {
            item: matterDuplicator,
            amount: 1,
        },
    ],
    outputPerMin: 60 / 42,
});
export const uraniumOre = new Item({
    name: "Uranium Ore",
    price: { gold: 10 },
    factory: factory.uraniumExtractor,
    resourcesNeeded: [],
    outputPerMin: 10,
});
export const enrichedUranium = new Item({
    name: "Enriched Uranium",
    price: { gold: 1000 },
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: uraniumOre,
            amount: 30,
        },
    ],
    outputPerMin: 1,
});
export const emptyFuelCell = new Item({
    name: "Empty Fuel Cell",
    price: { gold: 70 },
    factory: factory.machineShop,
    resourcesNeeded: [
        {
            item: tungstenCarbide,
            amount: 3,
        },
        {
            item: glass,
            amount: 5,
        },
    ],
    outputPerMin: 4,
});
export const nuclearFuelCell = new Item({
    name: "Nuclear Fuel Cell",
    price: { gold: 1200 },
    factory: factory.industrialFactory,
    resourcesNeeded: [
        {
            item: emptyFuelCell,
            amount: 1,
        },
        {
            item: steelRod,
            amount: 1,
        },
        {
            item: enrichedUranium,
            amount: 1,
        },
    ],
    outputPerMin: 2,
});
nuclearPowerPlant.input = {
    item: nuclearFuelCell,
    amount: 1,
    inputPerMin: 1,
};
export const gemApple = new Item({
    name: "Gem Apple",
    price: { gems: 1 },
    factory: factory.gemTree,
    resourcesNeeded: [],
    outputPerMin: 0.2,
});
