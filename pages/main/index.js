import { Item } from "../../builderment-classes/dir/index.js";
(async () => {
    let s = await fetch("./pages/main/seeds.txt");
    s = await s.text();
    const seeds = [];
    for (const line of s.match(/.{1,28}/g))
        seeds.push({
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
    const totalResults = document.getElementById("totalResults");
    const tbody = document.getElementsByTagName("tbody")[0];
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
            if (key == "rf")
                resourcesDivs[key].innerHTML += `<div class="entry" onclick="let t=event.target.innerHTML;event.target.innerHTML=event.target.title;event.target.title=t" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`;
            else
                resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`;
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
        let size = parseInt(worldSize);
        if (!isNaN(size))
            filteredSeeds = filteredSeeds.filter(seed => seed.ws === size);
        let amount = parseInt(resourceAmount);
        if (!isNaN(amount))
            filteredSeeds = filteredSeeds.filter(seed => seed.r === amount);
        let resource = (resourceFilter[0] === "Wood Log") ? "wd" : (resourceFilter[0] === "Stone") ? "s" : (resourceFilter[0] === "Iron Ore") ? "i" : (resourceFilter[0] === "Copper Ore") ? "cp" : (resourceFilter[0] === "Coal") ? "cl" : (resourceFilter[0] === "Wolframite") ? "wl" : (resourceFilter[0] === "Uranium Ore") ? "u" : "rf";
        (resourceFilter[0] === "None") ? null :
            (resourceFilter[1] === "Max") ? filteredSeeds.sort((a, b) => { return b[resource] - a[resource]; }) :
                (resourceFilter[1] === "Min") ? filteredSeeds.sort((a, b) => { return a[resource] - b[resource]; }) :
                    (resourceFilter[1] === ">") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] > resourceFilter[2]) :
                        (resourceFilter[1] === "≥") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] >= resourceFilter[2]) :
                            (resourceFilter[1] === "=") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] === resourceFilter[2]) :
                                (resourceFilter[1] === "≤") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] <= resourceFilter[2]) :
                                    (resourceFilter[1] === "<") ? filteredSeeds = filteredSeeds.filter(seed => seed[resource] < resourceFilter[2]) : null;
        (resourceFilter[3] === "Descending") ? filteredSeeds.sort((a, b) => { return b[resource] - a[resource]; }) :
            (resourceFilter[3] === "Ascending") ? filteredSeeds.sort((a, b) => { return a[resource] - b[resource]; }) : null;
        totalResults.innerHTML = "Total results: " + filteredSeeds.length;
        setData(filteredSeeds);
    }
    function Filter() {
        whiteBackground.style.visibility = "visible";
        loading.style.visibility = "visible";
        setTimeout(() => {
            let resource = (resourceFilter.selectedIndex) ?
                (amountFilter.selectedIndex >= 2) ? [resourceFilter.value, amountFilter.options[amountFilter.selectedIndex].text, parseFloat(amount.value), order.value] :
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
    Filter();
    function calculateResources() {
        whiteBackground.style.visibility = "visible";
        loading.style.visibility = "visible";
        setTimeout(() => {
            if (Item.items[resourceFilter.value] !== undefined) {
                const item = Item.items[resourceFilter.value];
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
                });
            }
            else
                seedData.forEach(seed => seed.rf = 0);
        });
        Filter();
    }
    resourceFilter.addEventListener("change", calculateResources);
    calculateResources();
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
})();
