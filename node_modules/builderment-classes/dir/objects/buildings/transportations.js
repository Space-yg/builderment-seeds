import { TransportationDistance } from "../../classes/buildings/tiers/distance-tiers/TransportationDistance.js";
import { TransportationSpeed } from "../../classes/buildings/tiers/speed-tier/TransportationSpeed.js";
export const conveyorBelt = new TransportationSpeed({
    name: "Conveyor Belt",
    description: "Conveyor Belts transport items around the world. Connect to belts, extractors, factories, and other buildings.",
    tiers: {
        0: {
            price: { gold: 4 },
            speed: 150,
        },
        1: { speed: 165 },
        2: { speed: 180 },
        3: { speed: 195 },
        4: { speed: 210 },
        5: { speed: 240 },
        6: { speed: 270 },
        7: { speed: 300 },
        8: { speed: 330 },
        9: { speed: 375 },
        10: { speed: 420 },
        11: { speed: 450 },
        12: { speed: 480 },
    },
});
export const BeltSpeeds = Object.values(conveyorBelt.tiers).map(tier => tier.speed);
export const undergroundBelt = new TransportationDistance({
    name: "Underground Belt",
    description: "Underground Belts transport items underground, allowing them to avoid obstacles. Connect to another underground belt entrance / exist with up to 4 tiles of space between them.",
    tiers: {
        0: {
            price: { gold: 10 },
            distance: 4,
        },
        1: { distance: 5 },
        2: { distance: 6 },
    },
});
export const UndergroundBeltDistances = Object.values(undergroundBelt.tiers).map(tier => tier.distance);
export const beltSplitter = new TransportationDistance({
    name: "Belt Splitter",
    description: "Belt Splitters evenly distribute items to connected belts or factories.",
    tiers: {
        0: {
            price: { gold: 10 },
            distance: 1,
        },
    },
});
export const roboticArm = new TransportationSpeed({
    name: "Robotic Arm",
    description: "Robotic Arms can move items between buildings and belts from any direction. They can also filter for specific items.",
    tiers: {
        1: {
            price: { gold: 250 },
            speed: 1,
        },
        2: {
            price: { gold: 800 },
            speed: 2,
        },
        3: {
            price: { gold: 2000 },
            speed: 4,
        },
        4: {
            price: { gold: 8000 },
            speed: 6,
        },
    },
});
