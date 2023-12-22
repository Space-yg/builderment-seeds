import { Item } from "../../../builderment-classes/dir/index.js";
(async () => {
    let s = await fetch("./pages/main/seeds.txt");
    s = await s.text();
    const seeds = [];
    for (const line of s.match(/.{1,28}/g))
        seeds.push({
            sd: line.substring(0, 6).replace(" ", ""),
            ws: +line[6],
            r: +line[7],
            wd: +line.substring(8, 11),
            s: +line.substring(11, 14),
            i: +line.substring(14, 17),
            cp: +line.substring(17, 20),
            cl: +line.substring(20, 23),
            wl: +line.substring(23, 26),
            u: +line.substring(26, 28),
            rf: 0,
        });
    const whiteBackground = document.getElementsByClassName("whiteBackground").item(0);
    const loading = document.getElementsByClassName("lds-spinner").item(0);
    const resourceFilter = document.getElementById("resourceFilter");
    const amountFilter = document.getElementById("amountFilter");
    const amount = document.getElementById("amount");
    const order = document.getElementById("order");
    const worldSize = document.getElementById("worldSizeFilter");
    const worldSizeCheck = document.getElementById("worldSizeCheck");
    const worldSizeRange = document.getElementById("worldSizeRange");
    const resourceAmount = document.getElementById("resourceAmountFilter");
    const resourceAmountCheck = document.getElementById("resourceAmountCheck");
    const resourceAmountRange = document.getElementById("resourceAmountRange");
    const calculateWithPowerPlantsCheck = document.getElementById("withPowerPlantsCheck");
    const totalResults = document.getElementById("totalResults");
    const tableData = document.getElementById("data");
    const resourcesDivs = {};
    for (const resourceDiv of tableData.children)
        resourcesDivs[resourceDiv.dataset["name"]] = resourceDiv;
    const showMore = document.getElementById("showMore");
    const sliderValueToSize = {
        "1": "50",
        "2": "75",
        "3": "100",
        "4": "150",
        "5": "200",
    };
    var seedData = [...seeds];
    function test() { console.log("Test"); }
    function copy(event) { navigator.clipboard.writeText(event.target.innerHTML); }
    function addSeedTableRow(seed) {
        for (const k in seed) {
            const key = k;
            switch (key) {
                case "rf":
                    resourcesDivs[key].innerHTML += `<div class="entry" onclick="s(event)" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`;
                    break;
                case "ws":
                case "r":
                    resourcesDivs[key].innerHTML += `<div class="entry">${sliderValueToSize[seed[key]]}</div>`;
                    break;
                case "sd":
                    resourcesDivs[key].innerHTML += `<div class="entry" onclick="c(event)">${seed[key]}</div>`;
                    break;
                default:
                    resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`;
                    break;
            }
        }
    }
    function addShowMoreButton(data, lastIndex) {
        showMore.hidden = false;
        showMore.onclick = () => addData(data, lastIndex, 50);
    }
    function addData(data, lastIndex, amount) {
        showMore.onclick = null;
        for (let i = lastIndex; i < Math.min(lastIndex + amount, data.length); i++)
            addSeedTableRow(data[i]);
        if (data.length > lastIndex + amount)
            addShowMoreButton(data, lastIndex + amount);
        else
            showMore.hidden = true;
    }
    function setData(data, showLimit = 50) {
        showMore.onclick = null;
        for (const name in resourcesDivs)
            resourcesDivs[name].innerHTML = "";
        for (let i = 0; i < Math.min(showLimit, data.length); i++)
            addSeedTableRow(data[i]);
        if (data.length > showLimit)
            addShowMoreButton(data, showLimit);
        else
            showMore.hidden = true;
    }
    function filter(resourceFilter, worldSize, resourceAmount) {
        let filteredSeeds = [...seedData];
        let size = +worldSize;
        if (!isNaN(size))
            filteredSeeds = filteredSeeds.filter(seed => seed.ws === size);
        let amount = +resourceAmount;
        if (!isNaN(amount))
            filteredSeeds = filteredSeeds.filter(seed => seed.r === amount);
        if (resourceFilter.length == 2) {
            if (calculateWithPowerPlantsCheck.checked)
                calculateResourcesWithPowerPlant(filteredSeeds);
            else
                calculateResources(filteredSeeds);
        }
        let resource = (resourceFilter[0] === "Wood Log") ? "wd" : (resourceFilter[0] === "Stone") ? "s" : (resourceFilter[0] === "Iron Ore") ? "i" : (resourceFilter[0] === "Copper Ore") ? "cp" : (resourceFilter[0] === "Coal") ? "cl" : (resourceFilter[0] === "Wolframite") ? "wl" : (resourceFilter[0] === "Uranium Ore") ? "u" : "rf";
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
    function Filter() {
        whiteBackground.style.visibility = "visible";
        loading.style.visibility = "visible";
        setTimeout(() => {
            let resource = (resourceFilter.selectedIndex) ?
                (amountFilter.selectedIndex >= 2) ? [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text, +amount.value, order.value] :
                    [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text] :
                ["None"];
            if (worldSizeCheck.checked) {
                if (resourceAmountCheck.checked)
                    filter(resource, worldSize.value, resourceAmount.value);
                else
                    filter(resource, worldSize.value, "None");
            }
            else {
                if (resourceAmountCheck.checked)
                    filter(resource, "None", resourceAmount.value);
                else
                    filter(resource, "None", "None");
            }
            whiteBackground.style.visibility = "hidden";
            loading.style.visibility = "hidden";
        }, 10);
    }
    amountFilter.addEventListener("change", Filter);
    amount.addEventListener("change", Filter);
    order.addEventListener("change", Filter);
    worldSize.addEventListener("mouseup", () => (worldSizeCheck.checked) ? Filter() : null);
    worldSize.addEventListener("touchend", () => (worldSizeCheck.checked) ? Filter() : null);
    worldSize.addEventListener("input", () => worldSizeRange.innerHTML = sliderValueToSize[worldSize.value] + "%");
    worldSizeCheck.addEventListener("click", Filter);
    resourceAmount.addEventListener("mouseup", () => (resourceAmountCheck.checked) ? Filter() : "");
    resourceAmount.addEventListener("touchend", () => (resourceAmountCheck.checked) ? Filter() : "");
    resourceAmount.addEventListener("input", () => resourceAmountRange.innerHTML = sliderValueToSize[resourceAmount.value] + "%");
    resourceAmountCheck.addEventListener("click", Filter);
    calculateWithPowerPlantsCheck.addEventListener("click", Filter);
    Filter();
    function calculateResources(seeds) {
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
    function calculateResourcesWithPowerPlant(seeds) {
        seeds.forEach(seed => {
            seed.rf = getMaxResourceAmountInSeedWithPowerPlant({
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
    resourceFilter.addEventListener("change", () => {
        calculateWithPowerPlantsCheck.parentElement.style.display = resourceFilter.value == "Earth Token" ? "inline-block" : "none";
        calculateWithPowerPlantsCheck.checked = false;
        Filter();
    });
    function amountFunction() {
        if (amountFilter.selectedIndex >= 2) {
            amount.style.display = "inline-block";
            order.style.display = "inline-block";
        }
        else {
            amount.style.display = "none";
            order.style.display = "none";
        }
    }
    amountFilter.addEventListener("change", amountFunction);
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
})();
