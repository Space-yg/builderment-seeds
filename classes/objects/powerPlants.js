"use strict";

/**
 * @author Space.yg
 */

import { PowerPlant } from "../classes/PowerPlant.js";
import { coal, nuclearFuelCell } from "./items.js";

export const coalPowerPlant = new PowerPlant({
    name: "Coal Power Plant",
    price: 2000,
    image: "https://static.wikia.nocookie.net/builderment/images/c/cb/Coal_power_plant_%28build%29.png",
    duration: 15,
    speed: 1.2,
    region: {
        width: 12,
        height: 12,
    },
    input: {
        item: coal,
        amount: 5,
        inputPerMin: 20,
    },
});
export const nuclearPowerPlant = new PowerPlant({
    name: "Nuclear Power Plant",
    price: 500000,
    image: "https://static.wikia.nocookie.net/builderment/images/6/6d/Nuclear_power_plant.png",
    duration: 60,
    speed: 1.4,
    region: {
        width: 21,
        height: 22,
    },
    input: {
        item: nuclearFuelCell,
        amount: 1,
        inputPerMin: 1,
    },
});