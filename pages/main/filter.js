import { setData } from "./table.js";
import { calculateResources, calculateResourcesWithPowerPlant, } from "./calculate.js";
const whiteBackground = document.getElementsByClassName("whiteBackground").item(0);
const loading = document.getElementsByClassName("lds-spinner").item(0);
export const progressBar = document.getElementById("progress-bar");
export const resourceFilter = document.getElementById("resourceFilter");
export const amountFilter = document.getElementById("amountFilter");
export const amount = document.getElementById("amount");
export const order = document.getElementById("order");
export const filterSeed = document.getElementById("filterSeed");
export const worldSize = document.getElementById("worldSizeFilter");
export const worldSizeCheck = document.getElementById("worldSizeCheck");
export const worldSizeRange = document.getElementById("worldSizeRange");
export const resourceAmount = document.getElementById("resourceAmountFilter");
export const resourceAmountCheck = document.getElementById("resourceAmountCheck");
export const resourceAmountRange = document.getElementById("resourceAmountRange");
export const calculateWithPowerPlantsCheck = document.getElementById("withPowerPlantsCheck");
const totalResults = document.getElementById("totalResults");
function filter(seeds, resourceFilter, worldSize, resourceAmount) {
    let filteredSeeds = [...seeds];
    let size = +worldSize;
    if (!isNaN(size))
        filteredSeeds = filteredSeeds.filter(seed => seed.ws === size);
    let amount = +resourceAmount;
    if (!isNaN(amount))
        filteredSeeds = filteredSeeds.filter(seed => seed.r === amount);
    if (amountFilter.value === "Seed")
        filteredSeeds = filteredSeeds.filter(seed => seed.sd === filterSeed.value);
    if (resourceFilter.length == 2) {
        if (calculateWithPowerPlantsCheck.checked)
            calculateResourcesWithPowerPlant(filteredSeeds);
        else
            calculateResources(filteredSeeds);
    }
    let resource = (resourceFilter[0] === "Wood Log") ?
        "wd" :
        (resourceFilter[0] === "Stone") ?
            "s" :
            (resourceFilter[0] === "Iron Ore") ?
                "i" :
                (resourceFilter[0] === "Copper Ore") ?
                    "cp" :
                    (resourceFilter[0] === "Coal") ?
                        "cl" :
                        (resourceFilter[0] === "Wolframite") ?
                            "wl" :
                            (resourceFilter[0] === "Uranium Ore") ?
                                "u" :
                                (calculateWithPowerPlantsCheck.checked) ?
                                    "pp" :
                                    "rf";
    if (resourceFilter[0] !== "None") {
        switch (resourceFilter[1]) {
            case "Max":
                filteredSeeds.sort((a, b) => b[resource] - a[resource]);
                break;
            case "Min":
                filteredSeeds.sort((a, b) => a[resource] - b[resource]);
                break;
            case ">":
                filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]);
                break;
            case "≥":
                filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]);
                break;
            case "=":
                filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]);
                break;
            case "≤":
                filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]);
                break;
            case "<":
                filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]);
                break;
        }
    }
    if (resourceFilter.length != 2) {
        if (calculateWithPowerPlantsCheck.checked)
            calculateResourcesWithPowerPlant(filteredSeeds);
        else
            calculateResources(filteredSeeds);
    }
    if (resourceFilter.length == 4) {
        (resourceFilter[3] === "Descending") ? filteredSeeds.sort((a, b) => b[resource] - a[resource]) :
            (resourceFilter[3] === "Ascending") ? filteredSeeds.sort((a, b) => a[resource] - b[resource]) : null;
    }
    totalResults.innerHTML = filteredSeeds.length.toString();
    setData(filteredSeeds);
}
export function Filter(seeds) {
    whiteBackground.style.visibility = "visible";
    loading.style.visibility = "visible";
    setTimeout(() => {
        let resource = (resourceFilter.selectedIndex) ?
            (amountFilter.selectedIndex >= 2) ?
                [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text, +amount.value, order.value] :
                [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text] :
            ["None"];
        if (worldSizeCheck.checked) {
            if (resourceAmountCheck.checked)
                filter(seeds, resource, worldSize.value, resourceAmount.value);
            else
                filter(seeds, resource, worldSize.value, "None");
        }
        else {
            if (resourceAmountCheck.checked)
                filter(seeds, resource, "None", resourceAmount.value);
            else
                filter(seeds, resource, "None", "None");
        }
        whiteBackground.style.visibility = "hidden";
        loading.style.visibility = "hidden";
        progressBar.parentElement.style.visibility = "hidden";
    }, 10);
}
function filtersDisplay() {
    filterSeed.style.display = "none";
    amount.style.display = "none";
    order.style.display = "none";
    if (amountFilter.value === "Seed") {
        filterSeed.style.display = "inline-block";
    }
    else if (amountFilter.value !== "Max" && amountFilter.value !== "Min") {
        amount.style.display = "inline-block";
        order.style.display = "inline-block";
    }
}
amountFilter.addEventListener("change", filtersDisplay);
filtersDisplay();
