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
    // total Results
    const totalResults = <HTMLParagraphElement> document.getElementById("totalResults")!
    
    //// Table
    // Table data
    const tbody = document.getElementsByTagName("tbody")[0]

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

    /**
     * Copy text
     * @param {PoNumbererEvent} event 
     */
    function copy(event: MouseEvent) { navigator.clipboard.writeText((<HTMLTableCellElement> event.target!).innerHTML) }

    /**
     * Display data in table
     * @param seed The seed to add
     */
    function addSeedTableRow(seed: Seed) {
        //// New Format
        for (const k in seed) {
            const key = k as keyof Seed
            if (key == "rf") resourcesDivs[key].innerHTML += `<div class="entry" onclick="let t=event.target.innerHTML;event.target.innerHTML=event.target.title;event.target.title=t" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`
            else resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`
        }

        // //// Old Format
        // // Make new row
        // const tr = document.createElement("tr")

        // // Add seed, resources, world size, and resource amount
        // tr.innerHTML += `<th onclick="navigator.clipboard.writeText(event.target.innerHTML)">${seed.sd}</th>
        // <td>${seed.wd}</td>
        // <td>${seed.s}</td>
        // <td>${seed.i}</td>
        // <td>${seed.cp}</td>
        // <td>${seed.cl}</td>
        // <td>${seed.wl}</td>
        // <td>${(seed.u) ? seed.u : "unknown"}</td>
        // <td>${sliderValueToSize[seed.ws]}</td>
        // <td>${sliderValueToSize[seed.r]}</td>`

        // // Add Resource Filter
        // const td = document.createElement("td")
        // td.innerHTML = (Math.round(seed.rf * 1000) / 1000).toString()
        // td.title = (Math.round(seed.rf * 100000) / 100000).toString()
        // td.addEventListener("click", event => {
        //     let temp = (<HTMLTableCellElement> event.target!).innerHTML;
        //     (<HTMLTableCellElement> event.target!).innerHTML = (<HTMLTableCellElement> event.target!).title;
        //     (<HTMLTableCellElement> event.target!).title = temp
        // })
        // tr.appendChild(td)

        // // Add to table
        // tbody.appendChild(tr)
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
        // tbody.innerHTML = ""

        // Add data to table
        for (let i = 0; i < Math.min(showLimit, data.length); i++) addSeedTableRow(data[i])

        // Add Show More button
        if (data.length > showLimit) addShowMoreButton(data, showLimit)
        else showMore.hidden = true
    }

    /**
     * Filter
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

        // Filter Resource
        let resource: keyof Omit<Seed, "sd"> = (resourceFilter[0] === "Wood Log") ? "wd" : (resourceFilter[0] === "Stone") ? "s" : (resourceFilter[0] === "Iron Ore") ? "i" : (resourceFilter[0] === "Copper Ore") ? "cp" : (resourceFilter[0] === "Coal") ? "cl" : (resourceFilter[0] === "Wolframite") ? "wl" : (resourceFilter[0] === "Uranium Ore") ? "u" : "rf";
        (resourceFilter[0] === "None") ? null :
        (resourceFilter[1] === "Max") ? filteredSeeds.sort((a, b) => {return b[resource] - a[resource]}) :
        (resourceFilter[1] === "Min") ? filteredSeeds.sort((a, b) => {return a[resource] - b[resource]}) :
        (resourceFilter[1] === ">") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]) :
        (resourceFilter[1] === "≥") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]) :
        (resourceFilter[1] === "=") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]) :
        (resourceFilter[1] === "≤") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]) :
        (resourceFilter[1] === "<") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]) : null;
        (resourceFilter[3] === "Descending") ? filteredSeeds.sort((a, b) => { return b[resource] - a[resource]}) :
        (resourceFilter[3] === "Ascending") ? filteredSeeds.sort((a, b) => { return a[resource] - b[resource]}) : null

        // Total Results
        totalResults.innerHTML = "Total results: " + filteredSeeds.length
        
        // Put data in table
        setData(filteredSeeds)
    }

    /** Main Filter function */
    function Filter() {
        whiteBackground.style.visibility = "visible"
        loading.style.visibility = "visible"
        setTimeout(() => {
            let resource: ResourceFilter =
                (resourceFilter.selectedIndex) ?
                    (amountFilter.selectedIndex >= 2) ? [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterSigns, parseFloat(amount.value), order.value as FilterOrder] :
                    [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text as FilterMinMax] :
                ["None"]
            if (worldSizeCheck.checked) {
                if (resourceAmountCheck.checked) filter(resource, worldSize.value, resourceAmount.value)
                else filter(resource, worldSize.value, "None")
            } else {
                if (resourceAmountCheck.checked) filter(resource, "None", resourceAmount.value)
                else filter(resource, "None", "None")
            }
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

    // Calculate the resources
    function calculateResources() {
        whiteBackground.style.visibility = "visible"
        loading.style.visibility = "visible"
        setTimeout(() => {
            if (Item.items[resourceFilter.value] !== undefined) {
                const item: Item = Item.items[resourceFilter.value]
                
                // Calculate resource
                seedData.forEach(seed => {
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
            } else seedData.forEach(seed => seed.rf = 0)
        })
        Filter()
    }
    resourceFilter.addEventListener("change", calculateResources)
    calculateResources()

    // Show filter options
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