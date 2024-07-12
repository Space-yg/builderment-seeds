import { Item } from "../../../builderment-classes/dir/classes/Item.js";
import * as _ from "../../../builderment-classes/dir/objects/items.js";
_;
import { resourceFilter } from "./filter.js";
export function calculateResources(seeds) {
    if (Item.items[resourceFilter.value] !== undefined) {
        const item = Item.items[resourceFilter.value];
        seeds.forEach(seed => {
            seed.rf = item.getMaxResourceAmountInSeed({
                "Wood Log": seed.wd,
                Stone: seed.s,
                "Iron Ore": seed.i,
                "Copper Ore": seed.cp,
                Coal: seed.cl,
                Wolframite: seed.wl,
                "Uranium Ore": seed.u,
            });
        });
    }
    else
        seeds.forEach(seed => seed.rf = 0);
}
export function calculateResourcesWithPowerPlant(seeds) {
    seeds.forEach(seed => {
        seed.pp = seed.pp || getMaxResourceAmountInSeedWithPowerPlant({
            worldSize: seed.ws,
            resourceAmount: seed.r,
            woodLog: seed.wd,
            stone: seed.s,
            ironOre: seed.i,
            copperOre: seed.cp,
            coal: seed.cl,
            wolframite: seed.wl,
            uraniumOre: seed.u,
        });
    });
}
const fuelCostRatio = {
    woodLog: 18,
    stone: 20,
    ironOre: 18,
    copperOre: 0,
    coal: 18,
    wolframite: 30,
    uraniumOre: 30,
};
const etRatio = {
    woodLog: 7242,
    stone: 5028,
    ironOre: 7932,
    copperOre: 5315,
    coal: 6954,
    wolframite: 3520,
};
const _resourcesWithoutUranium = ["woodLog", "stone", "ironOre", "copperOre", "coal", "wolframite"];
const urExRate = 10;
const exRate = 30;
const avUr = 7;
const urPatchError = 2;
const scoreError = 0.98;
const coalBoostUr = 1.2;
const coalPpRate = 20;
const plantVars = [[17.97, 23.29], [17.15, 33.09], [16.36, 41.28], [14.5, 50.22], [12.57, 50.79]];
const sig = 5;
function getMaxResourceAmountInSeedWithPowerPlant(resources) {
    const uraniumPatches = Math.round(resources.uraniumOre / avUr) + urPatchError;
    const extractorsCoalPp = plantVars[resources.resourceAmount - 1][0];
    const extractorsNuclearPp = plantVars[resources.resourceAmount - 1][1];
    const nuclearPp = resources.uraniumOre * urExRate / fuelCostRatio.uraniumOre * coalBoostUr;
    const extraExtractors = nuclearPp * extractorsNuclearPp * 0.4;
    const fuelCostExtractors = {};
    for (let i = 0; i < _resourcesWithoutUranium.length; i++)
        fuelCostExtractors[_resourcesWithoutUranium[i]] = nuclearPp * fuelCostRatio[_resourcesWithoutUranium[i]] / exRate;
    function getExcess(nuclearBoostCoal, estimatedScore) {
        const totalCoal = resources.coal * (nuclearBoostCoal * 1.4 + (1 - nuclearBoostCoal) * 1.2);
        const needed = {};
        const coalBoost = {};
        const coalExtractors = {};
        const nuclearExtractors = {};
        for (let i = 0; i < _resourcesWithoutUranium.length; i++) {
            const resource = _resourcesWithoutUranium[i];
            needed[resource] = estimatedScore / scoreError / exRate * etRatio[resource] + fuelCostExtractors[resource];
            coalBoost[resource] = resource !== "coal" ? (1.4 - needed[resource] / resources[resource]) / 0.2 : 1 - nuclearBoostCoal;
            coalExtractors[resource] = (coalBoost[resource] < 2 ? (coalBoost[resource] < 1 ? coalBoost[resource] : 2 - coalBoost[resource]) : 0) * resources[resource] / extractorsCoalPp * coalPpRate / exRate;
            nuclearExtractors[resource] = (coalBoost[resource] < 1 ? 1 - coalBoost[resource] : 0) * resources[resource] * 0.4;
        }
        const sumNeededExtras = [Object.values(coalExtractors).reduce((a, b) => a + b), Object.values(nuclearExtractors).reduce((a, b) => a + b)];
        const available = [totalCoal - needed["coal"] - (coalBoostUr == 1 ? 0 : uraniumPatches) * coalPpRate / exRate, extraExtractors];
        [available[0] - sumNeededExtras[0], available[1] - sumNeededExtras[1]];
        return [available[0] - sumNeededExtras[0], available[1] - sumNeededExtras[1]];
    }
    const _resourcesOverETRatio = [];
    for (let i = 0; i < _resourcesWithoutUranium.length; i++)
        _resourcesOverETRatio.push(resources[_resourcesWithoutUranium[i]] / etRatio[_resourcesWithoutUranium[i]]);
    var estimatedScore = Math.floor(Math.min(..._resourcesOverETRatio) * exRate * 10) / 10;
    const excess_0 = getExcess(0, estimatedScore);
    const excess_1 = getExcess(1, estimatedScore);
    const constant = 1 / (1 + (excess_0[1] - excess_1[1]) / (excess_1[0] - excess_0[0]));
    const extremes = [estimatedScore, estimatedScore * 1.4];
    for (let i = 0; i < 100; i++) {
        const excess = i == 0 ? excess_0 : getExcess(0, estimatedScore);
        if (Math.round((extremes[1] - extremes[0]) * 10 ** sig) / 10 ** sig === 0)
            break;
        if ((excess[1] - excess[0]) * constant + excess[0] < 0)
            extremes[1] = estimatedScore;
        else
            extremes[0] = estimatedScore;
        estimatedScore = extremes.reduce((a, b) => a + b) / 2;
    }
    return Math.round(estimatedScore * 10 ** sig) / 10 ** sig;
}
