import * as s from "./seeds.json" assert {type: "json"};

// Test any functionality
function test() { console.log("Test"); }

// Other
const ET = {
    wood: 7242,
    stone: 5028,
    iron: 7932,
    copper: 5315,
    coal: 6954,
    wolframite: 3520
};
const seeds = s.default;
const tbody = document.getElementsByTagName("tbody")[0];
var seedData = [];

// Put data in table
for (const key in seeds) {
    const tr = document.createElement("tr");
    const seedTag = document.createElement("th");
    seedTag.innerHTML = key;
    tr.appendChild(seedTag);
    var lowestET = seeds[key]["wood"] * 30 / ET["wood"];
    for (const info in seeds[key]) {
        const infoTag = document.createElement("td");
        infoTag.innerHTML = seeds[key][info];
        tr.appendChild(infoTag);
        (seeds[key][info] * 30 / ET[info] < lowestET) ? lowestET = seeds[key][info] * 30 / ET[info] : lowestET;
    }
    const td = document.createElement("td");
    td.innerHTML = Math.round(lowestET * 1000) / 1000;
    tr.appendChild(td);
    seedData.push(tr);
}

/**
 * Filter
 * @param {String[]} resourceFilter [Resource, Filter] or [`None`]
 * @param {String} worldSize worldSize.value
 * @param {String} resourceAmount resourceAmount.value
*/
function filter(resourceFilter, worldSize, resourceAmount) {
    // Add all data to row
    var rows = [];
    for (let i = 0; i < seedData.length; i++) rows.push(seedData[i]);
    
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
    var column;
    if (resourceFilter[0] === "Wood") column = 1;
    else if (resourceFilter[0] === "Stone") column = 2;
    else if (resourceFilter[0] === "Iron") column = 3;
    else if (resourceFilter[0] === "Copper") column = 4;
    else if (resourceFilter[0] === "Coal") column = 5;
    else if (resourceFilter[0] === "Wolframite") column = 6;
    else column = 9;
    if (resourceFilter[1] === "Max") rows.sort(function (a, b) { return b.cells[column].innerHTML - a.cells[column].innerHTML; });
    else if (resourceFilter[1] === "Min") rows.sort(function (a, b) { return a.cells[column].innerHTML - b.cells[column].innerHTML; });
    else if (resourceFilter[1] === ">") rows = rows.filter(row => Number(row.cells[column].innerHTML) > resourceFilter[2]);
    else if (resourceFilter[1] === "≥") rows = rows.filter(row => Number(row.cells[column].innerHTML) >= resourceFilter[2]);
    else if (resourceFilter[1] === "=") rows = rows.filter(row => Number(row.cells[column].innerHTML) == resourceFilter[2]);
    else if (resourceFilter[1] === "≤") rows = rows.filter(row => Number(row.cells[column].innerHTML) <= resourceFilter[2]);
    else if (resourceFilter[1] === "<") rows = rows.filter(row => Number(row.cells[column].innerHTML) < resourceFilter[2]);
    if (resourceFilter[3] === "Descending") rows.sort(function (a, b) { return b.cells[column].innerHTML - a.cells[column].innerHTML; });
    else if (resourceFilter[3] === "Ascending") rows.sort(function (a, b) { return a.cells[column].innerHTML - b.cells[column].innerHTML; });
    console.log(resourceFilter);
    // Put data in table
    display(rows);
}

// Initials
const resourceFilter = document.getElementById("resourceFilter");
const amountFilter = document.getElementById("amountFilter");
const amount = document.getElementById("amount");
const order = document.getElementById("order");
const worldSize = document.getElementById("worldSizeFilter");
const resourceAmount = document.getElementById("resourceAmountFilter");

// Filter function
function Filter() {
    // [Resource, ">" || "≥" || "=" || "≤" || "<", Amount, "Ascending" || "Descending"] or [Resource, "Max" || "Min"] or [`None`]
    var resource = (resourceFilter.selectedIndex) ? (amountFilter.selectedIndex >= 2) ? [resourceFilter.options[resourceFilter.selectedIndex].text, amountFilter.options[amountFilter.selectedIndex].text, Number(amount.value), order.value] : [resourceFilter.options[resourceFilter.selectedIndex].text, amountFilter.options[amountFilter.selectedIndex].text] : ["None"];
    if (document.getElementById("worldSizeNone").checked) {
        if (document.getElementById("resourceAmountNone").checked) filter(resource, "None", "None");
        else filter(resource, "None", resourceAmount.value);
    } else {
        if (document.getElementById("resourceAmountNone").checked) filter(resource, worldSize.value, "None");
        else filter(resource, worldSize.value, resourceAmount.value);
    }
}
Filter();

// Resource Filter
resourceFilter.addEventListener("change", Filter);

// Amount Filter
amountFilter.addEventListener("change", Filter);
function amountFunction() {
    if (amountFilter.selectedIndex >= 2) {
        amount.style.visibility = "visible";
        order.style.visibility = "visible";
    } else {
        amount.style.visibility = "hidden";
        order.style.visibility = "hidden";
    }
}
amountFilter.addEventListener("change", amountFunction);
amount.addEventListener("change", Filter);
order.addEventListener("change", Filter);

// World Size Filter
worldSize.addEventListener("mouseup", Filter);
document.getElementById("worldSizeNone").addEventListener("click", Filter);
document.getElementById("worldSizeNum").addEventListener("click", Filter);

// Resource Amount
resourceAmount.addEventListener("mouseup", Filter);
document.getElementById("resourceAmountNone").addEventListener("click", Filter);
document.getElementById("resourceAmountNum").addEventListener("click", Filter);

// Display data in table
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
