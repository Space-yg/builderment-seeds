"use strict";

/**
 * @author Space.yg
 */

import { Item } from "../classes/Item.js";
import * as factory from "./factories.js";

// Base resources
export const woodLog = new Item({
    name: "Wood Log",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/f/fd/Item_wood_log.png",
    factory: factory.extractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703345841963179/wood_log.png",
    outputPerMin: 7.5,
});
export const stone = new Item({
    name: "Stone",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/e/ea/Item_stone.png",
    factory: factory.extractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703344462057593/stone.png",
    outputPerMin: 7.5,
});
export const ironOre = new Item({
    name: "Iron Ore",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/f/f6/Item_iron_ore.png",
    factory: factory.extractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703345388986538/iron_ore.png",
    outputPerMin: 7.5,
});
export const copperOre = new Item({
    name: "Copper Ore",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c9/Item_copper_ore.png",
    factory: factory.extractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703345594519592/copper_ore.png",
    outputPerMin: 7.5,
});
export const coal = new Item({
    name: "Coal",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/2/29/Item_coal.png",
    factory: factory.extractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703344692731954/coal.png",
    outputPerMin: 7.5,
});
export const wolframite = new Item({
    name: "Wolframite",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8d/Item_wolframite.png",
    factory: factory.extractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703344201998346/wolframite.png",
    outputPerMin: 7.5,
});

// Resources made from base resources only
export const woodPlank = new Item({
    name: "!ood Plank",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/e/ed/Item_wood_plank.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: woodLog,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/a/a2/Wood_plank_rec.png",
    outputPerMin: 15,
});
export const sand = new Item({
    name: "Sand",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/d/df/Item_sand.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: stone,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/0/07/Sand_rec.png",
    outputPerMin: 40,
});
export const ironIngot = new Item({
    name: "Iron Ingot",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e4/Item_iron_ingot.png",
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: ironOre,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/c/c4/Iron_ingot_rec.png",
    outputPerMin: 30,
});
export const copperIngot = new Item({
    name: "Copper Ingot",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/4/43/Item_copper_ingot.png",
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: copperOre,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/b/b6/Copper_ingot_rec.png",
    outputPerMin: 30,
});
export const tungstenOre = new Item({
    name: "Tungsten Ore",
    price: 5,
    image: "https://static.wikia.nocookie.net/builderment/images/1/1b/Item_tungsten_ore.png",
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: wolframite,
            amount: 5,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/b/b9/Tungsten_ore_rec.png",
    outputPerMin: 24,
});
export const graphite = new Item({
    name: "Graphite",
    price: 6,
    image: "https://static.wikia.nocookie.net/builderment/images/7/7e/Item_graphite.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/7/7f/Graphite_rec.png",
    outputPerMin: 15,
});

// Other
export const woodFrame = new Item({
    name: "Wood Frame",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8c/Item_wood_frame.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: woodPlank,
            amount: 4,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/5/5f/Wood_frame_rec.png",
    outputPerMin: 7.5,
});
export const copperWire = new Item({
    name: "Copper Wire",
    price: 2,
    image: "https://static.wikia.nocookie.net/builderment/images/5/5c/Item_copper_wire.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: copperIngot,
            amount: 3,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/7/71/Copper_wire_rec.png",
    outputPerMin: 30,
    outputAmount: 2,
});
export const heatSink = new Item({
    name: "Heat Sink",
    price: 5,
    image: "https://static.wikia.nocookie.net/builderment/images/4/4b/Item_heat_sink.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: copperIngot,
            amount: 5,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/c/cd/Heat_sink_rec.png",
    outputPerMin: 10,
});
export const ironGear = new Item({
    name: "Iron Gear",
    price: 2,
    image: "https://static.wikia.nocookie.net/builderment/images/5/52/Item_iron_gear.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: ironIngot,
            amount: 2,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/5/57/Iron_gear_rec.png",
    outputPerMin: 15,
});
export const ironPlating = new Item({
    name: "Iron Plating",
    price: 2,
    image: "https://static.wikia.nocookie.net/builderment/images/b/b0/Item_iron_plating.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: ironIngot,
            amount: 4,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/6/61/Iron_plating_rec.png",
    outputPerMin: 20,
    outputAmount: 2,
});
export const steel = new Item({
    name: "Steel",
    price: 12,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8b/Item_steel.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/1/16/Steel_rec.png",
    outputPerMin: 7.5,
});
export const steelRod = new Item({
    name: "Steel Rod",
    price: 35,
    image: "https://static.wikia.nocookie.net/builderment/images/a/af/Item_steel_rod.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: steel,
            amount: 3,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/d/de/Steel_rod_rec.png",
    outputPerMin: 15,
});
export const glass = new Item({
    name: "Glass",
    price: 4,
    image: "https://static.wikia.nocookie.net/builderment/images/f/f8/Item_glass.png",
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: sand,
            amount: 4,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/a/a6/Glass_rec.png",
    outputPerMin: 10,
});
export const condenserLens = new Item({
    name: "Condenser Lens",
    price: 12,
    image: "https://static.wikia.nocookie.net/builderment/images/2/26/Item_condenser_lens.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: glass,
            amount: 3,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/8/86/Condenser_lens_rec.png",
    outputPerMin: 40,
});
export const carbonFiber = new Item({
    name: "Carbon Fiber",
    price: 24,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c2/Item_carbon_fiber.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: graphite,
            amount: 4,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/b/ba/Carbon_fiber_rec.png",
    outputPerMin: 7.5,
});
export const tungstenCarbide = new Item({
    name: "Tungsten Carbide",
    price: 16,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e9/Item_tungsten_carbide.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/5/59/Tungsten_carbide_rec.png",
    outputPerMin: 12,
});
export const coupler = new Item({
    name: "Coupler",
    price: 16,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e4/Item_coupler.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: tungstenCarbide,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/6/6b/Coupler_rec.png",
    outputPerMin: 6,
});
export const concrete = new Item({
    name: "Concrete",
    price: 40,
    image: "https://static.wikia.nocookie.net/builderment/images/2/25/Item_concrete.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/b/b7/Concrete_rec.png",
    outputPerMin: 7.5,
});
export const metalFrame = new Item({
    name: "Metal Frame",
    price: 12,
    image: "https://static.wikia.nocookie.net/builderment/images/a/a6/Item_metal_frame.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/3/35/Metal_frame_rec.png",
    outputPerMin: 5,
});
export const industrialFrame = new Item({
    name: "Industrial Frame",
    price: 400,
    image: "https://static.wikia.nocookie.net/builderment/images/e/e1/Item_industrial_frame.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/0/0c/Industrial_frame_rec.png",
    outputPerMin: 3,
});
export const silicon = new Item({
    name: "Silicon",
    price: 2,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6d/Item_silicon.png",
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: sand,
            amount: 2,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/0/00/Silicon_rec.png",
    outputPerMin: 20,
});
export const logicCircuit = new Item({
    name: "Logic Circuit",
    price: 10,
    image: "https://static.wikia.nocookie.net/builderment/images/f/f2/Item_logic_circuit.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/9/91/Logic_circuit_rec.png",
    outputPerMin: 10,
});
export const nanoWire = new Item({
    name: "Nano Wire",
    price: 60,
    image: "https://static.wikia.nocookie.net/builderment/images/f/fe/Item_nano_wire.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/c/c9/Nano_wire_rec.png",
    outputPerMin: 5,
});
export const turbocharger = new Item({
    name: "Turbocharger",
    price: 250,
    image: "https://static.wikia.nocookie.net/builderment/images/9/99/Item_turbocharger.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/8/89/Turbocharger_rec.png",
    outputPerMin: 4,
});
export const electromagnet = new Item({
    name: "Electromagnet",
    price: 14,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c5/Item_electromagnet.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/1/14/Electromagnet_rec.png",
    outputPerMin: 10,
});
export const battery = new Item({
    name: "Battery",
    price: 150,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0b/Item_battery.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/b/b3/Battery_rec.png",
    outputPerMin: 2.5,
});
export const rotor = new Item({
    name: "Rotor",
    price: 40,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6b/Item_rotor.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/d/d5/Rotor_rec.png",
    outputPerMin: 10,
});
export const electricMotor = new Item({
    name: "Electric Motor",
    price: 250,
    image: "https://static.wikia.nocookie.net/builderment/images/4/45/Item_electric_motor.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/f/f6/Electric_motor_rec.png",
    outputPerMin: 3,
});
export const tank = new Item({
    name: "Tank",
    price: 250,
    image: "https://static.wikia.nocookie.net/builderment/images/0/0b/Item_tank.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/8/82/Tank_rec.png",
    outputPerMin: 6,
});
export const matterCompressor = new Item({
    name: "Matter Compressor",
    price: 1500,
    image: "https://static.wikia.nocookie.net/builderment/images/a/a8/Item_matter_compressor.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/5/56/Matter_compressor_rec.png",
    outputPerMin: 2,
});
export const particleGlue = new Item({
    name: "Particle Glue",
    price: 150,
    image: "https://static.wikia.nocookie.net/builderment/images/d/df/Item_particle_glue.png",
    factory: factory.workshop,
    resourcesNeeded: [
        {
            item: matterCompressor,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/7/7a/Particle_glue_rec.png",
    outputPerMin: 20,
    outputAmount: 10,
});
export const gyroscope = new Item({
    name: "Gyroscope",
    price: 100,
    image: "https://static.wikia.nocookie.net/builderment/images/5/54/Item_gyroscope.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/3/30/Gyroscope_rec.png",
    outputPerMin: 5,
});
export const energyCube = new Item({
    name: "Energy Cube",
    price: 700,
    image: "https://static.wikia.nocookie.net/builderment/images/a/ac/Item_energy_cube.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/b/b8/Energy_cube_rec.png",
    outputPerMin: 2,
});
export const computer = new Item({
    name: "Computer",
    price: 60,
    image: "https://static.wikia.nocookie.net/builderment/images/4/4f/Item_computer.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/a/ad/Computer_rec.png",
    outputPerMin: 7.5,
});
export const stabilizer = new Item({
    name: "Stabilizer",
    price: 500,
    image: "https://static.wikia.nocookie.net/builderment/images/c/c5/Item_stabilizer.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/9/9a/Stabilizer_rec.png",
    outputPerMin: 2.5,
});
export const magneticFieldGenerator = new Item({
    name: "Magnetic Field Generator",
    price: 1500,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8d/Item_magnetic_field_generator.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/6/67/Magnetic_field_generator_rec.png",
    outputPerMin: 1.5,
});
export const quantumEntangler = new Item({
    name: "Quantum Entangler",
    price: 2500,
    image: "https://static.wikia.nocookie.net/builderment/images/7/73/Item_quantum_entangler.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/9/9f/Quantum_entangler_rec.png",
    outputPerMin: 1,
});
export const electronMicroscope = new Item({
    name: "Electron Microscope",
    price: 300,
    image: "https://static.wikia.nocookie.net/builderment/images/7/71/Item_electron_microscope.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/1/18/Electron_microscope_rec.png",
    outputPerMin: 2.5,
});
export const superComputer = new Item({
    name: "Super Computer",
    price: 500,
    image: "https://static.wikia.nocookie.net/builderment/images/9/9f/Item_super_computer.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/5/58/Super_computer_rec.png",
    outputPerMin: 2,
});
export const atomicLocator = new Item({
    name: "Atomic Locator",
    price: 2500,
    image: "https://static.wikia.nocookie.net/builderment/images/b/b6/Item_atomic_locator.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/e/e9/Atomic_locator_rec.png",
    outputPerMin: 2,
});
export const matterDuplicator = new Item({
    name: "Matter Duplicator",
    price: 32000,
    image: "https://static.wikia.nocookie.net/builderment/images/7/77/Item_matter_duplicator.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/a/ac/Matter_duplicator_rec.png",
    outputPerMin: 2 / 3,
});
export const earthToken = new Item({
    name: "Earth Token",
    price: 32000,
    image: "https://static.wikia.nocookie.net/builderment/images/f/ff/Item_earth_token.png",
    factory: factory.earthTeleporter,
    resourcesNeeded: [
        {
            item: matterDuplicator,
            amount: 1,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/8/85/Earth_token_rec.png",
    outputPerMin: 60 / 42,
});

// Uranium
export const uraniumOre = new Item({
    name: "Uranium Ore",
    price: 10,
    image: "https://static.wikia.nocookie.net/builderment/images/5/5c/Uranium_ore.png",
    factory: factory.uraniumExtractor,
    resourcesNeeded: [],
    recipeImage: "https://media.discordapp.net/attachments/1007336434916675644/1091703344956985464/uranium_ore.png",
    outputPerMin: 10,
});
export const enrichedUranium = new Item({
    name: "Enriched Uranium",
    price: 1000,
    image: "https://static.wikia.nocookie.net/builderment/images/8/8c/Enriched_uranium.png",
    factory: factory.furnace,
    resourcesNeeded: [
        {
            item: uraniumOre,
            amount: 30,
        },
    ],
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/f/ff/Enriched_uranium_rec.png",
    outputPerMin: 1,
});
export const emptyFuelCell = new Item({
    name: "Empty Fuel Cell",
    price: 70,
    image: "https://static.wikia.nocookie.net/builderment/images/2/2b/Empty_fuel_cell.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/5/59/Empty_fuel_cell_rec.png",
    outputPerMin: 4,
});
export const nuclearFuelCell = new Item({
    name: "Nuclear Fuel Cell",
    price: 1200,
    image: "https://static.wikia.nocookie.net/builderment/images/7/7f/Nuclear_fuel_cell.png",
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
    recipeImage: "https://static.wikia.nocookie.net/builderment/images/c/cb/Nuclear_fuel_cell_rec.png",
    outputPerMin: 2,
});

// Gem Apple
export const gemApple = new Item({
    name: "Gem Apple",
    price: 1,
    image: "https://static.wikia.nocookie.net/builderment/images/2/2c/Item_gem_apple.png",
    factory: factory.gemTree,
    resourcesNeeded: [],
    recipeImage: "https://cdn.discordapp.com/attachments/1007336434916675644/1091703345149902959/gem_apple.png",
    outputPerMin: 0.2,
});