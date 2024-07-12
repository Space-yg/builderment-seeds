import { Currency } from "../classes/Currency.js";
export const gold = new Currency({
    name: "Gold",
    price: {
        gold: 1,
        gems: null,
    },
    image: "./resources/currencies/gold.png",
});
export const gem = new Currency({
    name: "Gem",
    price: {
        gold: null,
        gems: 1,
    },
    image: "./resources/currencies/gem.png",
});
