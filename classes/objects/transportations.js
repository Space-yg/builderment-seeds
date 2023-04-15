"use strict";

/**
 * @author Space.yg
 */

import { Transportation } from "../classes/Transportation.js";

export const conveyorBelt = new Transportation({
    name: "Conveyor Belt",
    description: "Conveyor Belts transport items around the world. Connect to belts, extractors, factories, and other buildings.",
    tiers: {
        0: {
            price: 4,
            output: 1,
            image: "https://static.wikia.nocookie.net/builderment/images/2/20/Conveyer_belt.png",
        },
        1: { output: 1.1 },
        2: { output: 1.2 / 1.1 },
        3: { output: 1.3 / 1.2 },
        4: { output: 1.4 / 1.3 },
        5: { output: 1.6 / 1.4 },
        6: { output: 1.8 / 1.6 },
        7: { output: 2 / 1.8 },
        8: { output: 2.2 / 2 },
        9: { output: 2.5 / 2.2 },
        10: { output: 2.8 / 2.5 },
        11: { output: 3 / 2.8 },
        12: { output: 3.2 / 3 },
    },
});
export const undergroundBelt = new Transportation({
    name: "Underground Belt",
    description: "Underground Belts transport items underground, allowing them to avoid obstacles. Connect to another underground belt entrance / exist with up to 4 tiles of space between them.",
    tiers: {
        0: {
            price: 10,
            output: 1,
            image: "https://static.wikia.nocookie.net/builderment/images/7/70/Underground_belt.png",
        },
        1: { output: 1.25 },
        2: { output: 1.2 },
    },
});
export const beltSplitter = new Transportation({
    name: "Belt Splitter",
    description: "Belt Splitters evenly distribute items to connected belts or factories.",
    tiers: {
        1: {
            price: 10,
            output: 1,
            image: "https://static.wikia.nocookie.net/builderment/images/4/47/Belt_splitter.png/revision/latest?cb=20220930165733",
        },
    },
});
export const roboticArm = new Transportation({
    name: "Robotic Arm",
    description: "Robotic Arms can move items between buildings and belts from any direction. They can also filter for specific items.",
    tiers: {
        1: {
            price: 250,
            output: 1,
            image: "https://static.wikia.nocookie.net/builderment/images/e/e0/Robot_arm_1.png",
        },
        2: {
            price: 800,
            output: 2,
            image: "https://static.wikia.nocookie.net/builderment/images/3/31/Robot_arm_2.png",
        },
        3: {
            price: 2000,
            output: 2,
            image: "https://static.wikia.nocookie.net/builderment/images/f/f9/Robot_arm_3.png",
        },
        4: {
            price: 8000,
            output: 1.5,
            image: "https://static.wikia.nocookie.net/builderment/images/2/2b/Robot_arm_4.png",
        },
    },
});