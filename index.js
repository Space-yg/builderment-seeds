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

const tbody = document.getElementsByTagName("tbody")[0];
var seedData = [];
/**
 * Upload File
 * @param {Event} event 
*/
async function upload(event) {
    // Get File
    const reader = new FileReader();
    reader.onload = event => {
        const fileData = JSON.parse(event.target.result);
        
        // Remove Data from Table
        tbody.innerHTML = "";
        seedData = [];

        // Put data in table
        for (const key in fileData) {
            const tr = document.createElement("tr");
            const seedTag = document.createElement("th");
            seedTag.innerHTML = key;
            tr.appendChild(seedTag);
            var lowestET = fileData[key]["wood"] * 30 / ET["wood"];
            for (const info in fileData[key]) {
                const infoTag = document.createElement("td");
                infoTag.innerHTML = fileData[key][info];
                tr.appendChild(infoTag);
                (fileData[key][info] * 30 / ET[info] < lowestET) ? lowestET = fileData[key][info] * 30 / ET[info] : lowestET;
            }
            const td = document.createElement("td");
            td.innerHTML = Math.round(lowestET * 1000) / 1000;
            tr.appendChild(td);
            seedData.push(tr);
        }
        Filter();
    }
    reader.readAsText(event.target.files[0]);
}
document.getElementById("file").addEventListener("input", upload);

/**
 * Filter
 * @param {String} resourceFilter (select.selectedIndex) ? `${select.options[select.selectedIndex].parentElement.label} ${select.options[select.selectedIndex].text}` : "None"
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
    const resource = resourceFilter.split(" ");
    if (resource[1] === "Wood") column = 1;
    else if (resource[1] === "Stone") column = 2;
    else if (resource[1] === "Iron") column = 3;
    else if (resource[1] === "Copper") column = 4;
    else if (resource[1] === "Coal") column = 5;
    else if (resource[1] === "Wolframite") column = 6;
    else if (resource[1] === "Earth") column = 9;
    if (resource[0] === "Highest") rows.sort(function (a, b) { return b.cells[column].innerHTML - a.cells[column].innerHTML; });
    else if (resource[0] === "Lowest") rows.sort(function (a, b) { return a.cells[column].innerHTML - b.cells[column].innerHTML; });
    
    // Put data in table
    display(rows);
}

// Initials
const select = document.getElementById("resourceFilter");
const worldSize = document.getElementById("worldSizeFilter");
const resourceAmount = document.getElementById("resourceAmountFilter");

// Filter function
function Filter() {
    var resource = (select.selectedIndex) ? `${select.options[select.selectedIndex].parentElement.label} ${select.options[select.selectedIndex].text}` : "None";
    if (document.getElementById("worldSizeNone").checked) {
        if (document.getElementById("resourceAmountNone").checked) filter(resource, "None", "None");
        else filter(resource, "None", resourceAmount.value);
    } else {
        if (document.getElementById("resourceAmountNone").checked) filter(resource, worldSize.value, "None");
        else filter(resource, worldSize.value, resourceAmount.value);
    }
}

// Filter Resources
select.addEventListener("change", Filter);

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
