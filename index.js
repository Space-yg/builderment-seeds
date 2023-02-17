// Get the JSON file
let s = await fetch("./seeds.json");
s = await s.json();

// Initials
/** @type {{sd: string, wd: int, s: int, i: int, cp: int, cl: int, wl: int, ws: int, r: int}[]} */
const seeds = s.seeds;
const tbody = document.getElementsByTagName("tbody")[0];
const resourceFilter = document.getElementById("resourceFilter");
// Loading and White background
const whiteBackground = document.getElementsByClassName("whiteBackground").item(0);
const loading = document.getElementsByClassName("lds-spinner").item(0);
// Amount Filter
const amountFilter = document.getElementById("amountFilter");
const amount = document.getElementById("amount");
const order = document.getElementById("order");
// World Size Filter
const worldSize = document.getElementById("worldSizeFilter");
const worldSizeCheck = document.getElementById("worldSizeCheck");
// World Size Filter
const resourceAmount = document.getElementById("resourceAmountFilter");
const resourceAmountCheck = document.getElementById("resourceAmountCheck");
// total Results
const totalResults = document.getElementById("totalResults");

var seedData = [...seeds];

// Test any functionality
function test() { console.log("Test"); }

/**
 * Copy text
 * @param {PointerEvent} event 
 */
function copy(event) { navigator.clipboard.writeText(event.target.innerHTML); }

//// Add the resource filter
// rf is resource filter
seedData.forEach(seed => seed.rf = 0 );

/**
 * Display data in table
 * @param {{sd: String, wd: int, s: int, i: int, cp: int, cl: int, wl: int, ws: int, r: int, rf: Number}[]} seed The seed
 */
function addSeedTableRow(seed) {
    // Make new row
    const tr = document.createElement("tr");
    // Add seed
    const th = document.createElement("th");
    th.innerHTML = seed.sd;
    th.title = "Copy";
    th.addEventListener("click", copy);
    tr.appendChild(th);
    // Add resources
    for (const resource of ["wd", "s", "i", "cp", "cl", "wl"]) {
        const td = document.createElement("td");
        td.innerHTML = seed[resource];
        tr.appendChild(td);
    }
    // Add World Size and Resource Amount
    for (const setting of ["ws", "r"]) {
        const td = document.createElement("td");
        td.innerHTML = (seed[setting] === 1) ? 50 : (seed[setting] === 2) ? 75 : (seed[setting] === 3) ? 100 : (seed[setting] === 4) ? 150 : 200;
        tr.appendChild(td);
    }
    // Add Resource Filter
    const td = document.createElement("td");
    td.innerHTML = Math.round(seed.rf * 1000) / 1000;
    td.title = Math.round(seed.rf * 100000) / 100000;
    td.addEventListener("click", event => {
        let temp = event.target.innerHTML;
        event.target.innerHTML = event.target.title;
        event.target.title = temp;
    });
    tr.appendChild(td);
    // Add to table
    tbody.appendChild(tr);
}

/**
 * Add Show More button
 * @param {{sd: String, wd: int, s: int, i: int, cp: int, cl: int, wl: int, ws: int, r: int, rf: Number}[]} data The data of the seeds
 * @param {int} lastIndex The last index of the last seed
 */
function addShowMoreButton(data, lastIndex) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const button = document.createElement("button");
    button.setAttribute("class", "showMore");
    button.addEventListener("click", () => { addData(data, lastIndex, 50); });
    button.innerHTML = "Show more";
    th.setAttribute("colspan", "10");
    th.style.textAlign = "center";
    th.appendChild(button);
    tr.appendChild(th);
    tbody.appendChild(tr);
}

/**
 * Add data to table
 * @param {{sd: String, wd: int, s: int, i: int, cp: int, cl: int, wl: int, ws: int, r: int, rf: Number}[]} data The data of the seeds
 * @param {int} lastIndex The last index of the last seed
 * @param {int} amount The amount MORE to add
 */
function addData(data, lastIndex, amount) {
    // Remove Show More Button
    tbody.lastChild.remove();

    // Add data to table
    for (let i = lastIndex; i < Math.min(lastIndex + amount, data.length); i++) addSeedTableRow(data[i]);

    // Add Show More button
    if (data.length > lastIndex + amount) addShowMoreButton(data, lastIndex + amount);
}

/**
 * Reset data in table
 * @param {{sd: String, wd: int, s: int, i: int, cp: int, cl: int, wl: int, ws: int, r: int, rf: Number}[]} data The data of the seeds
 * @param {int} showLimit The limit of how many seeds to show
 */
function setData(data, showLimit = 50) {
    // Clear All data
    tbody.innerHTML = "";

    // Add data to table
    for (let i = 0; i < Math.min(showLimit, data.length); i++) addSeedTableRow(data[i]);

    // Add Show More button
    if (data.length > showLimit) addShowMoreButton(data, showLimit);
}

/**
 * Filter
 * @param {["None"] | [String ,"Max" | "Min"] | [String, ">" | "≥" | "=" | "≤" | "<", int, "Ascending" | "Descending"]} resourceFilter [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or ["None"]
 * @param {String} worldSize worldSize.value
 * @param {String} resourceAmount resourceAmount.value
*/
function filter(resourceFilter, worldSize, resourceAmount) {
    // Add all data to row
    let filteredSeeds = [...seedData];

    // Filter World Size
    let size = parseInt(worldSize);
    if (!isNaN(size)) filteredSeeds = filteredSeeds.filter(seed => {return seed.ws === size});

    // Filter World Size
    let amount = parseInt(resourceAmount);
    if (!isNaN(amount)) filteredSeeds = filteredSeeds.filter(seed => seed.r === amount);

    // Filter Resource
    let resource = (resourceFilter[0] === "Wood Log") ? "wd" : (resourceFilter[0] === "Stone") ? "s" : (resourceFilter[0] === "Iron Ore") ? "i" : (resourceFilter[0] === "Copper Ore") ? "cp" : (resourceFilter[0] === "Coal") ? "cl" : (resourceFilter[0] === "Wolframite") ? "wl" : "rf";
    (resourceFilter[1] === "None") ? null :
    (resourceFilter[1] === "Max") ? filteredSeeds.sort((a, b) => {return b[resource] - a[resource]}) :
    (resourceFilter[1] === "Min") ? filteredSeeds.sort((a, b) => {return a[resource] - b[resource]}) :
    (resourceFilter[1] === ">") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]) :
    (resourceFilter[1] === "≥") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]) :
    (resourceFilter[1] === "=") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]) :
    (resourceFilter[1] === "≤") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]) :
    (resourceFilter[1] === "<") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]) : null;
    (resourceFilter[3] === "Descending") ? filteredSeeds.sort((a, b) => { return b[resource] - a[resource]}) :
    (resourceFilter[3] === "Ascending") ? filteredSeeds.sort((a, b) => { return a[resource] - b[resource]}) : null;

    // Total Results
    totalResults.innerHTML = "Total results: " + filteredSeeds.length;
    
    // Put data in table
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) setData(filteredSeeds, 100);
    else setData(filteredSeeds);
}

// Filter function
function Filter() {
    whiteBackground.style.visibility = "visible";
    loading.style.visibility = "visible";
    setTimeout(() => {
        /** @type {["None"] | [String, "Max" | "Min"] | [String, ">" | "≥" | "=" | "≤" | "<", int, "Ascending" | "Descending"]} [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or ["None"] */
        let resource = (resourceFilter.selectedIndex) ? (amountFilter.selectedIndex >= 2) ? [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text, Number(amount.value), order.value] : [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text] : ["None"];
        if (worldSizeCheck.checked) {
            if (resourceAmountCheck.checked) filter(resource, worldSize.value, resourceAmount.value);
            else filter(resource, worldSize.value, "None");
        } else {
            if (resourceAmountCheck.checked) filter(resource, "None", resourceAmount.value);
            else filter(resource, "None", "None");
        }
        whiteBackground.style.visibility = "hidden";
        loading.style.visibility = "hidden";
    }, 10);
}
// Amount Filter
amountFilter.addEventListener("change", Filter);
amount.addEventListener("change", Filter);
order.addEventListener("change", Filter);
// World Size Filter
worldSize.addEventListener("mouseup", () => (worldSizeCheck.checked) ? Filter() : "");
worldSize.addEventListener("touchend", () => (worldSizeCheck.checked) ? Filter() : "");
worldSizeCheck.addEventListener("click", Filter);
// Resource Amount
resourceAmount.addEventListener("mouseup", () => (resourceAmountCheck.checked) ? Filter() : "");
resourceAmount.addEventListener("touchend", () => (resourceAmountCheck.checked) ? Filter() : "");
resourceAmountCheck.addEventListener("click", Filter);
Filter();

// Calculate the resources
function calculateResources() {
    whiteBackground.style.visibility = "visible";
    loading.style.visibility = "visible";
    setTimeout(() => {
        if (Item.items[resourceFilter.value] !== undefined) {
            /** @type {Item} */
            const item = Item.items[resourceFilter.value];
            // Calculate resource
            seedData.forEach(seed => {
                seed.rf = item.getMaxResourceAmountInSeed({
                    woodLog: seed.wd,
                    stone: seed.s,
                    ironOre: seed.i,
                    copperOre: seed.cp,
                    coal: seed.cl,
                    wolframite: seed.wl
                });
            });
        } else seedData.forEach(seed => seed.tr = 0);
    }, 10);
    Filter();
}
resourceFilter.addEventListener("change", calculateResources);

// Show filter options
function amountFunction() {
    if (amountFilter.selectedIndex >= 2) {
        amount.style.display = "inline-block";
        order.style.display = "inline-block";
    } else {
        amount.style.display = "none";
        order.style.display = "none";
    }
}
amountFilter.addEventListener("change", amountFunction);