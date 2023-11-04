// @ts-ignore

// For development
// import { Item } from "../../../builderment-classes/src/index"

// For deployment
import { Item } from "../../builderment-classes/dir/index.js"

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

(async () => {
    // Extract seed data
    let s: any = await fetch("./pages/main/seeds.txt")
    s = await s.text()

    const seeds: Seed[] = []
    // abcdef0122233344455566677788
    for (const line of (s.match(/.{1,28}/g) as string[])) seeds.push({
        sd: line.substring(0, 6).replace(" ", ""),
        ws: parseInt(line[6]),
        r: parseInt(line[7]),
        wd: parseInt(line.substring(8, 11)),
        s: parseInt(line.substring(11, 14)),
        i: parseInt(line.substring(14, 17)),
        cp: parseInt(line.substring(17, 20)),
        cl: parseInt(line.substring(20, 23)),
        wl: parseInt(line.substring(23, 26)),
        u: parseInt(line.substring(26, 28)),
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
    function copy(event: MouseEvent) { navigator.clipboard.writeText((<HTMLTableCellElement> event.target!).innerHTML) }

    /**
     * Display data in table
     * @param seed The seed to add
     */
    function addSeedTableRow(seed: Seed) {
        for (const k in seed) {
            const key = k as keyof Seed

            // Resource Filter
            if (key == "rf") resourcesDivs[key].innerHTML += `<div class="entry" onclick="let t=event.target.innerHTML;event.target.innerHTML=event.target.title;event.target.title=t" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`
            // World Size and Resource Amount
            else if (key == "ws" || key == "r") resourcesDivs[key].innerHTML += `<div class="entry">${sliderValueToSize[seed[key]]}</div>`
            // Other
            else resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`
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
        let size = parseInt(worldSize)
        if (!isNaN(size)) filteredSeeds = filteredSeeds.filter(seed => seed.ws === size)
        
        // Filter World Size
        let amount = parseInt(resourceAmount)
        if (!isNaN(amount)) filteredSeeds = filteredSeeds.filter(seed => seed.r === amount)

        // Calculate Resources if it is Max or Min
        if (resourceFilter.length == 2) calculateResources(filteredSeeds)

        // Get resource to filter
        let resource: keyof Omit<Seed, "sd"> = (resourceFilter[0] === "Wood Log") ? "wd" : (resourceFilter[0] === "Stone") ? "s" : (resourceFilter[0] === "Iron Ore") ? "i" : (resourceFilter[0] === "Copper Ore") ? "cp" : (resourceFilter[0] === "Coal") ? "cl" : (resourceFilter[0] === "Wolframite") ? "wl" : (resourceFilter[0] === "Uranium Ore") ? "u" : "rf";

        // Sort or Filter resources
        (resourceFilter[0] === "None") ? null :
        (resourceFilter[1] === "Max") ? filteredSeeds.sort((a, b) => b[resource] - a[resource]) :
        (resourceFilter[1] === "Min") ? filteredSeeds.sort((a, b) => a[resource] - b[resource]) :
        (resourceFilter[1] === ">") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]) :
        (resourceFilter[1] === "≥") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]) :
        (resourceFilter[1] === "=") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]) :
        (resourceFilter[1] === "≤") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]) :
        (resourceFilter[1] === "<") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]) : null;

        // Calculate Resources if it is NOT Max or Min
        if (resourceFilter.length != 2) calculateResources(filteredSeeds);

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
                    (amountFilter.selectedIndex >= 2) ? [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterSigns, parseFloat(amount.value), order.value as FilterOrder] :
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
    resourceFilter.addEventListener("change", Filter)

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
})()