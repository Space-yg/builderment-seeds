import * as s from "./seeds.json" assert {type: "json"};

// Initials
const seeds = s.default.seeds;
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

/** @type {HTMLTableRowElement[]} */
var seedData = [];

// Test any functionality
function test() { console.log("Test"); }

/**
 * Copy text
 * @param {PointerEvent} event 
 */
function copy(event) {
    // Copy
    navigator.clipboard.writeText(event.target.innerHTML);
}

// Put data in table
seeds.forEach(seed => {
    const tr = document.createElement("tr");
    const seedTag = document.createElement("th");
    seedTag.addEventListener("click", copy);
    seedTag.title = "Copy";
    const seedName = Object.keys(seed)[0];
    seedTag.innerHTML = seedName;
    tr.appendChild(seedTag);
    // Put Resource data in tr
    for (const info of ["wd", "s", "i", "cp", "cl", "wl"]) {
        const infoTag = document.createElement("td");
        infoTag.innerHTML = seed[seedName][info];
        tr.appendChild(infoTag);
    }
    // World Size
    const td1 = document.createElement("td");
    td1.innerHTML = (seed[seedName]["ws"] === 1) ? "50" : (seed[seedName]["ws"] === 2) ? "75" : (seed[seedName]["ws"] === 3) ? "100" : (seed[seedName]["ws"] === 4) ? "150" : "200";
    tr.appendChild(td1);
    // Resource Amount
    const td2 = document.createElement("td");
    td2.innerHTML = (seed[seedName]["r"] === 1) ? "50" : (seed[seedName]["r"] === 2) ? "75" : (seed[seedName]["r"] === 3) ? "100" : (seed[seedName]["r"] === 4) ? "150" : "200";
    tr.appendChild(td2);
    // Resource
    const td3 = document.createElement("td");
    td3.innerHTML = "0";
    tr.appendChild(td3);
    seedData.push(tr);
});

/**
 * Display data in table
 * @param {HTMLTableRowElement[]} data The data of the seeds
 * @param {int} showLimit The limit of how many seeds to show
 */
function display(data, showLimit = 50) {
    tbody.innerHTML = "";
    for (let i = 0; i < data.length && i < showLimit; i++) tbody.appendChild(data[i]);
    if (data.length >= showLimit) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const button = document.createElement("button");
        button.setAttribute("class", "showMore");
        button.addEventListener("click", () => { display(data, showLimit + 50); });
        button.innerHTML = "Show more";
        th.setAttribute("colspan", "10");
        th.style.textAlign = "center";
        th.appendChild(button);
        tr.appendChild(th);
        tbody.appendChild(tr);
    }
}

/**
 * Filter
 * @param {String[]} resourceFilter [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or ["None"]
 * @param {String} worldSize worldSize.value
 * @param {String} resourceAmount resourceAmount.value
*/
function filter(resourceFilter, worldSize, resourceAmount) {
    // Add all data to row
    var rows = [...seedData];
    
    // Filter World Size
    var size;
    if (worldSize === "1") size = 50;
    else if (worldSize === "2") size = 75;
    else if (worldSize === "3") size = 100;
    else if (worldSize === "4") size = 150;
    else if (worldSize === "5") size = 200;
    if (size !== undefined) rows = rows.filter(row => parseInt(row.cells[7].innerHTML) === size);
    
    // Filter Resources Amount
    var Amount;
    if (resourceAmount === "1") Amount = 50;
    else if (resourceAmount === "2") Amount = 75;
    else if (resourceAmount === "3") Amount = 100;
    else if (resourceAmount === "4") Amount = 150;
    else if (resourceAmount === "5") Amount = 200;
    if (Amount !== undefined) rows = rows.filter(row => parseInt(row.cells[8].innerHTML) === Amount);
    
    // Filter Resource
    if (resourceFilter[1] === "Max") rows.sort((a, b) => { return b.cells[9].innerHTML - a.cells[9].innerHTML; });
    else if (resourceFilter[1] === "Min") rows.sort((a, b) => { return a.cells[9].innerHTML - b.cells[9].innerHTML; });
    else if (resourceFilter[1] === ">") rows = rows.filter(row => Number(row.cells[9].innerHTML) > resourceFilter[2]);
    else if (resourceFilter[1] === "≥") rows = rows.filter(row => Number(row.cells[9].innerHTML) >= resourceFilter[2]);
    else if (resourceFilter[1] === "=") rows = rows.filter(row => Number(row.cells[9].innerHTML) == resourceFilter[2]);
    else if (resourceFilter[1] === "≤") rows = rows.filter(row => Number(row.cells[9].innerHTML) <= resourceFilter[2]);
    else if (resourceFilter[1] === "<") rows = rows.filter(row => Number(row.cells[9].innerHTML) < resourceFilter[2]);
    if (resourceFilter[3] === "Descending") rows.sort((a, b) => { return b.cells[9].innerHTML - a.cells[9].innerHTML; });
    else if (resourceFilter[3] === "Ascending") rows.sort((a, b) => { return a.cells[9].innerHTML - b.cells[9].innerHTML; });

    // Put data in table
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) display(rows, 100);
    else display(rows);
}

// Filter function
function Filter() {
    whiteBackground.style.visibility = "visible";
    loading.style.visibility = "visible";
    setTimeout(() => {
        // [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or ["None"]
        var resource = (resourceFilter.selectedIndex) ? (amountFilter.selectedIndex >= 2) ? [resourceFilter.options[resourceFilter.selectedIndex].text, amountFilter.options[amountFilter.selectedIndex].text, Number(amount.value), order.value] : [resourceFilter.options[resourceFilter.selectedIndex].text, amountFilter.options[amountFilter.selectedIndex].text] : ["None"];
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
worldSize.addEventListener("mouseup", Filter);
worldSizeCheck.addEventListener("click", Filter);
// Resource Amount
resourceAmount.addEventListener("mouseup", Filter);
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
            seedData.forEach(tr => tr.children.item(9).innerHTML = Math.round(item.getMaxResourceAmountInSeed({
                woodLog: parseInt(tr.children.item(1).innerHTML),
                stone: parseInt(tr.children.item(2).innerHTML),
                ironOre: parseInt(tr.children.item(3).innerHTML),
                copperOre: parseInt(tr.children.item(4).innerHTML),
                coal: parseInt(tr.children.item(5).innerHTML),
                wolframite: parseInt(tr.children.item(6).innerHTML)
            }) * 1000) / 1000);
        } else seedData.forEach(tr => tr.children.item(9).innerHTML = "0");
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