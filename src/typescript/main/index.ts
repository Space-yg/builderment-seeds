// @ts-ignore

// For development
// import { Item } from "../../../builderment-classes/src/index"

// For deployment
import { Item } from "../../../builderment-classes/dir/index.js"

/** A seed */
interface Seed {
    /** Seed */
    sd: string
    /** Wood Log */
    wd: number
    /** Stone */
    s: number
    /** Iron */
    i: number
    /** Copper */
    cp: number
    /** Coal */
    cl: number
    /** Wolframite */
    wl: number
    /** Uranium */
    u: number
    /** World Size */
    ws: number
    /** Resource Amount */
    r: number
    /** Resource Filter */
    rf: number
}

/** The filter signs */
type FilterSigns = ">" | "≥" | "=" | "≤" | "<"

/** The filter order */
type FilterOrder = "Ascending" | "Descending"

type FilterMinMax = "Max" | "Min"

/** A resource filter that specifies how to filter the resources */
type ResourceFilter = ["None"] | [string, FilterMinMax] | [string, FilterSigns, number, FilterOrder]

// @TODO Make power plant function a lazy function

(async () => {
    // Extract seed data
    let s: any = await fetch("./pages/main/seeds.txt")
    s = await s.text()

    const seeds: Seed[] = []
    // abcdef0122233344455566677788
    for (const line of (s.match(/.{1,28}/g) as string[])) seeds.push({
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
    } as Seed)

    //// Loading
    const whiteBackground = <HTMLDivElement> document.getElementsByClassName("whiteBackground").item(0)
    const loading = <HTMLDivElement> document.getElementsByClassName("lds-spinner").item(0)
    
    //// Filters
    // Resource Filter
    const resourceFilter = <HTMLSelectElement> document.getElementById("resourceFilter")
    // Amount Filter
    const amountFilter = <HTMLSelectElement> document.getElementById("amountFilter")
    const amount = <HTMLInputElement> document.getElementById("amount")
    const order = <HTMLSelectElement> document.getElementById("order")
    // World Size Filter
    const worldSize = <HTMLInputElement> document.getElementById("worldSizeFilter")
    const worldSizeCheck = <HTMLInputElement> document.getElementById("worldSizeCheck")
    const worldSizeRange = <HTMLSpanElement> document.getElementById("worldSizeRange")
    // Resource Amount Filter
    const resourceAmount = <HTMLInputElement> document.getElementById("resourceAmountFilter")
    const resourceAmountCheck = <HTMLInputElement> document.getElementById("resourceAmountCheck")
    const resourceAmountRange = <HTMLSpanElement> document.getElementById("resourceAmountRange")
    // Calculate with Power Plants
    const calculateWithPowerPlantsCheck = <HTMLInputElement> document.getElementById("withPowerPlantsCheck")
    // Total Results
    const totalResults = <HTMLSpanElement> document.getElementById("totalResults")!
    
    //// Table
    // Table data
    const tableData = <HTMLDivElement> document.getElementById("data")!
    // Add all resources to resourcesDivs
    const resourcesDivs: {[name: string]: HTMLDivElement} = {}
    for (const resourceDiv of <HTMLCollectionOf<HTMLDivElement>> tableData.children) resourcesDivs[resourceDiv.dataset["name"]!] = resourceDiv

    // Show More Button
    const showMore = <HTMLDivElement> document.getElementById("showMore")!

    const sliderValueToSize: {[values: string]: string} = {
        "1": "50",
        "2": "75",
        "3": "100",
        "4": "150",
        "5": "200",
    }

    var seedData = [...seeds]

    /** Test any functionality */
    function test() { console.log("Test") }

    /** Copy text */
    function copy(event: PointerEvent) { navigator.clipboard.writeText((<HTMLTableCellElement> event.target!).innerHTML) }

    /**
     * Display data in table
     * @param seed The seed to add
     */
    function addSeedTableRow(seed: Seed) {
        for (const k in seed) {
            const key = k as keyof Seed

            switch (key) {
                // Resource Filter
                case "rf": resourcesDivs[key].innerHTML += `<div class="entry" onclick="s(event)" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`; break
                // World Size and Resource Amount
                case "ws": case "r": resourcesDivs[key].innerHTML += `<div class="entry">${sliderValueToSize[seed[key]]}</div>`; break
                // Seed
                case "sd": resourcesDivs[key].innerHTML += `<div class="entry" onclick="c(event)">${seed[key]}</div>`; break
                // Other
                default: resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`; break
            }
        }
    }

    /**
     * Add Show More button
     * @param data The data of the seeds
     * @param lastIndex The last index of the last seed
     */
    function addShowMoreButton(data: Seed[], lastIndex: number) {
        showMore.hidden = false
        showMore.onclick = () => addData(data, lastIndex, 50)
    }

    /**
     * Add data to table
     * @param data The data of the seeds
     * @param lastIndex The last index of the last seed
     * @param amount The amount MORE to add
     */
    function addData(data: Seed[], lastIndex: number, amount: number) {
        showMore.onclick = null

        // Add data to table
        for (let i = lastIndex; i < Math.min(lastIndex + amount, data.length); i++) addSeedTableRow(data[i])

        // Add Show More button
        if (data.length > lastIndex + amount) addShowMoreButton(data, lastIndex + amount)
        else showMore.hidden = true
    }

    /**
     * Reset data in table
     * @param data The data of the seeds
     * @param showLimit The limit of how many seeds to show
     */
    function setData(data: Seed[], showLimit: number = 50) {
        showMore.onclick = null

        // Clear All data
        for (const name in resourcesDivs) resourcesDivs[name].innerHTML = ""

        // Add data to table
        for (let i = 0; i < Math.min(showLimit, data.length); i++) addSeedTableRow(data[i])

        // Add Show More button
        if (data.length > showLimit) addShowMoreButton(data, showLimit)
        else showMore.hidden = true
    }

    /**
     * Filter seed data then set it to the table
     * @param resourceFilter [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or ["None"]
     * @param worldSize worldSize.value
     * @param resourceAmount resourceAmount.value
     */
    function filter(resourceFilter: ResourceFilter, worldSize: string, resourceAmount: string) {
        // Add all data to row
        let filteredSeeds = [...seedData]
        
        // Filter World Size
        let size = +worldSize
        if (!isNaN(size)) filteredSeeds = filteredSeeds.filter(seed => seed.ws === size)
        
        // Filter World Size
        let amount = +resourceAmount
        if (!isNaN(amount)) filteredSeeds = filteredSeeds.filter(seed => seed.r === amount)

        // Calculate Resources if it is Max or Min
        if (resourceFilter.length == 2) {
            if (calculateWithPowerPlantsCheck.checked) calculateResourcesWithPowerPlant(filteredSeeds)
            else calculateResources(filteredSeeds)
        }

        // Get resource to filter
        let resource: keyof Omit<Seed, "sd"> = (resourceFilter[0] === "Wood Log") ? "wd" : (resourceFilter[0] === "Stone") ? "s" : (resourceFilter[0] === "Iron Ore") ? "i" : (resourceFilter[0] === "Copper Ore") ? "cp" : (resourceFilter[0] === "Coal") ? "cl" : (resourceFilter[0] === "Wolframite") ? "wl" : (resourceFilter[0] === "Uranium Ore") ? "u" : "rf";

        // Sort or Filter resources
        if (resourceFilter[0] !== "None") {
            switch (resourceFilter[1]) {
                case "Max": filteredSeeds.sort((a, b) => b[resource] - a[resource]); break
                case "Min": filteredSeeds.sort((a, b) => a[resource] - b[resource]); break
                case ">": filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]); break
                case "≥": filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]); break
                case "=": filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]); break
                case "≤": filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]); break
                case "<": filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]); break
            }
        }
        // Calculate Resources if it is NOT Max or Min
        if (resourceFilter.length != 2) {
            if (calculateWithPowerPlantsCheck.checked) calculateResourcesWithPowerPlant(filteredSeeds)
            else calculateResources(filteredSeeds)
        }

        // Filter Order
        if (resourceFilter.length == 4) {
            (resourceFilter[3] === "Descending") ? filteredSeeds.sort((a, b) => b[resource] - a[resource]) :
            (resourceFilter[3] === "Ascending") ? filteredSeeds.sort((a, b) => a[resource] - b[resource]) : null;
        }

        // Total Results
        totalResults.innerHTML = filteredSeeds.length.toString()
        
        // Put data in table
        setData(filteredSeeds)
    }

    /** Main Filter function */
    function Filter() {
        // Show Loading
        whiteBackground.style.visibility = "visible"
        loading.style.visibility = "visible"

        setTimeout(() => {
            let resource: ResourceFilter =
                (resourceFilter.selectedIndex) ?
                    (amountFilter.selectedIndex >= 2) ? [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterSigns, +amount.value, order.value as FilterOrder] :
                    [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterMinMax] :
                ["None"]
            
            // World Size
            if (worldSizeCheck.checked) {
                // Resource Amount
                if (resourceAmountCheck.checked) filter(resource, worldSize.value, resourceAmount.value)
                else filter(resource, worldSize.value, "None")
            } else {
                // Resource Amount
                if (resourceAmountCheck.checked) filter(resource, "None", resourceAmount.value)
                else filter(resource, "None", "None")
            }

            // Hide Loading
            whiteBackground.style.visibility = "hidden"
            loading.style.visibility = "hidden"
        }, 10)
    }
    // Amount Filter
    amountFilter.addEventListener("change", Filter)
    amount.addEventListener("change", Filter)
    order.addEventListener("change", Filter)
    // World Size Filter
    worldSize.addEventListener("mouseup", () => (worldSizeCheck.checked) ? Filter() : null)
    worldSize.addEventListener("touchend", () => (worldSizeCheck.checked) ? Filter() : null)
    worldSize.addEventListener("input", () => worldSizeRange.innerHTML = sliderValueToSize[worldSize.value] + "%")
    worldSizeCheck.addEventListener("click", Filter)
    // Resource Amount
    resourceAmount.addEventListener("mouseup", () => (resourceAmountCheck.checked) ? Filter() : "")
    resourceAmount.addEventListener("touchend", () => (resourceAmountCheck.checked) ? Filter() : "")
    resourceAmount.addEventListener("input", () => resourceAmountRange.innerHTML = sliderValueToSize[resourceAmount.value] + "%")
    resourceAmountCheck.addEventListener("click", Filter)
    // Calculate with Power Plants
    calculateWithPowerPlantsCheck.addEventListener("click", Filter)
    Filter()

    /** Calculate the resources */
    function calculateResources(seeds: Seed[]) {
        if (Item.items[resourceFilter.value] !== undefined) {
            const item: Item = Item.items[resourceFilter.value]
            
            // Calculate resources
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
            })
        } else seeds.forEach(seed => seed.rf = 0)
    }
    /** Calculate the resources with Power Plants */
    function calculateResourcesWithPowerPlant(seeds: Seed[]) {
        // Calculate resources
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
        })
    }
    resourceFilter.addEventListener("change", () => {
        calculateWithPowerPlantsCheck.parentElement!.style.display = resourceFilter.value == "Earth Token" ? "inline-block" : "none"
        calculateWithPowerPlantsCheck.checked = false
        Filter()
    })

    /** Show filter options */
    function amountFunction() {
        if (amountFilter.selectedIndex >= 2) {
            amount.style.display = "inline-block"
            order.style.display = "inline-block"
        } else {
            amount.style.display = "none"
            order.style.display = "none"
        }
    }
    amountFilter.addEventListener("change", amountFunction)

    /////////////////////
    //// POWER PLANT ////
    /////////////////////

    const fuelCostRatio = {
        woodLog: 18,
        stone: 20,
        ironOre: 18,
        copperOre: 0,
        coal: 18,
        wolframite: 30,
        uraniumOre: 30,
    }
    const etRatio = {
        woodLog: 7242,
        stone: 5028,
        ironOre: 7932,
        copperOre: 5315,
        coal: 6954,
        wolframite: 3520,
    }
    const _resourcesWithoutUranium: readonly ["woodLog", "stone", "ironOre", "copperOre", "coal", "wolframite"] = ["woodLog", "stone", "ironOre", "copperOre", "coal", "wolframite"]
    const urExRate = 10
    const exRate = 30
    const avUr = 7
    const urPatchError = 2
    const scoreError = 0.98
    const coalBoostUr = 1.2
    const coalPpRate = 20
    const plantVars: readonly [[number, number], [number, number], [number, number], [number, number], [number, number]] = [[17.97, 23.29], [17.15, 33.09], [16.36, 41.28], [14.5, 50.22], [12.57, 50.79]]
    const sig = 5
    function getMaxResourceAmountInSeedWithPowerPlant(resources: {
        worldSize: number,
        resourceAmount: number,
        woodLog: number,
        stone: number,
        ironOre: number,
        copperOre: number,
        coal: number,
        wolframite: number,
        uraniumOre: number,
    }): number {
        const uraniumPatches: number = Math.round(resources.uraniumOre / avUr) + urPatchError
        const extractorsCoalPp: number = plantVars[resources.resourceAmount - 1][0]
        const extractorsNuclearPp: number = plantVars[resources.resourceAmount - 1][1]
        const nuclearPp: number = resources.uraniumOre * urExRate / fuelCostRatio.uraniumOre * coalBoostUr
        const extraExtractors: number = nuclearPp * extractorsNuclearPp * 0.4
        const fuelCostExtractors: {[x: string]: number} = {}
        for (let i = 0; i < _resourcesWithoutUranium.length; i++) fuelCostExtractors[_resourcesWithoutUranium[i]] = nuclearPp * fuelCostRatio[_resourcesWithoutUranium[i]] / exRate

        function getExcess(nuclearBoostCoal: number, estimatedScore: number): [number, number] {
            const totalCoal = resources.coal * (nuclearBoostCoal * 1.4 + (1 - nuclearBoostCoal) * 1.2)
            const needed: {[x: string]: number} = {}
            const coalBoost: {[x: string]: number} = {}
            const coalExtractors: {[x: string]: number} = {}
            const nuclearExtractors: {[x: string]: number} = {}
            for (let i = 0; i < _resourcesWithoutUranium.length; i++) {
                const resource = _resourcesWithoutUranium[i]
                needed[resource] = estimatedScore / scoreError / exRate * etRatio[resource] + fuelCostExtractors[resource]
                coalBoost[resource] = resource !== "coal" ? (1.4 - needed[resource] / resources[resource]) / 0.2 : 1 - nuclearBoostCoal
                coalExtractors[resource] = (coalBoost[resource] < 2 ? (coalBoost[resource] < 1 ? coalBoost[resource] : 2 - coalBoost[resource]) : 0) * resources[resource] / extractorsCoalPp * coalPpRate / exRate
                nuclearExtractors[resource] = (coalBoost[resource] < 1 ? 1 - coalBoost[resource] : 0) * resources[resource] * 0.4
            }
            const sumNeededExtras = [Object.values(coalExtractors).reduce((a, b) => a + b), Object.values(nuclearExtractors).reduce((a, b) => a + b)]
            // @ts-ignore
            const available = [totalCoal - needed["coal"] - (coalBoostUr == 1 ? 0 : uraniumPatches) * coalPpRate / exRate, extraExtractors];
            [available[0] - sumNeededExtras[0], available[1] - sumNeededExtras[1]]
            return [available[0] - sumNeededExtras[0], available[1] - sumNeededExtras[1]]
        }

        const _resourcesOverETRatio: number[] = []
        for (let i = 0; i < _resourcesWithoutUranium.length; i++) _resourcesOverETRatio.push(resources[_resourcesWithoutUranium[i]] / etRatio[_resourcesWithoutUranium[i]])
        var estimatedScore = Math.floor(Math.min(..._resourcesOverETRatio) * exRate * 10) / 10
        const excess_0 = getExcess(0, estimatedScore)
        const excess_1 = getExcess(1, estimatedScore)
        const constant = 1 / (1 + (excess_0[1] - excess_1[1]) / (excess_1[0] - excess_0[0]))

        const extremes: [number, number] = [estimatedScore, estimatedScore * 1.4]
        for (let i = 0; i < 100; i++) {
            const excess = i == 0 ? excess_0 : getExcess(0, estimatedScore)
            if (Math.round((extremes[1] - extremes[0]) * 10 ** sig) / 10 ** sig === 0) break
            if ((excess[1] - excess[0]) * constant + excess[0] < 0) extremes[1] = estimatedScore
            else extremes[0] = estimatedScore
            estimatedScore = extremes.reduce((a, b) => a + b) / 2
        }
        return Math.round(estimatedScore * 10 ** sig) / 10 ** sig
    }

    // let l = []
    // let count = 0
    // for (const seed of seeds) {
    //     l.push({
    //         seed: seed.sd,
    //         score: getMaxResourceAmountInSeedWithPowerPlant({
    //             worldSize: seed.ws,
    //             resourceAmount: seed.r,
    //             woodLog: seed.wd,
    //             stone: seed.s,
    //             ironOre: seed.i,
    //             copperOre: seed.cp,
    //             coal: seed.cl,
    //             wolframite: seed.wl,
    //             uraniumOre: seed.u,
    //         }),
    //     })
    // }
    // l.sort((a, b) => b.score - a.score)
})()