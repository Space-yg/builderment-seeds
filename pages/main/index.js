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
    const tbody = document.getElementsByTagName("tbody")[0];
    const resourceFilter = document.getElementById("resourceFilter");
    const whiteBackground = document.getElementsByClassName("whiteBackground").item(0);
    const loading = document.getElementsByClassName("lds-spinner").item(0);
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
    var seedData = [...seeds];
    function test() { console.log("Test"); }
    function copy(event) { navigator.clipboard.writeText(event.target.innerHTML); }
    function addSeedTableRow(seed) {
        const tr = document.createElement("tr");
        tr.innerHTML += `<th onclick="navigator.clipboard.writeText(event.target.innerHTML)">${seed.sd}</th>
        <td>${seed.wd}</td>
        <td>${seed.s}</td>
        <td>${seed.i}</td>
        <td>${seed.cp}</td>
        <td>${seed.cl}</td>
        <td>${seed.wl}</td>
        <td>${(seed.u) ? seed.u : "unknown"}</td>
        <td>${(seed.ws === 1) ? 50 : (seed.ws === 2) ? 75 : (seed.ws === 3) ? 100 : (seed.ws === 4) ? 150 : 200}</td>
        <td>${(seed.r === 1) ? 50 : (seed.r === 2) ? 75 : (seed.r === 3) ? 100 : (seed.r === 4) ? 150 : 200}</td>`;
        const td = document.createElement("td");
        td.innerHTML = (Math.round(seed.rf * 1000) / 1000).toString();
        td.title = (Math.round(seed.rf * 100000) / 100000).toString();
        td.addEventListener("click", event => {
            let temp = event.target.innerHTML;
            event.target.innerHTML = event.target.title;
            event.target.title = temp;
        });
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    function addShowMoreButton(data, lastIndex) {
        const tr = document.createElement("tr");
        tr.addEventListener("click", () => addData(data, lastIndex, 50));
        const th = document.createElement("th");
        const span = document.createElement("span");
        span.setAttribute("class", "showMore");
        span.innerHTML = "Show more";
        th.setAttribute("colspan", "11");
        th.style.textAlign = "center";
        th.appendChild(span);
        tr.appendChild(th);
        tbody.appendChild(tr);
    }
    function addData(data, lastIndex, amount) {
        tbody.lastChild.remove();
        for (let i = lastIndex; i < Math.min(lastIndex + amount, data.length); i++)
            addSeedTableRow(data[i]);
        if (data.length > lastIndex + amount)
            addShowMoreButton(data, lastIndex + amount);
    }
    function setData(data, showLimit = 50) {
        tbody.innerHTML = "";
        for (let i = 0; i < Math.min(showLimit, data.length); i++)
            addSeedTableRow(data[i]);
        if (data.length > showLimit)
            addShowMoreButton(data, showLimit);
    }
    function filter(resourceFilter, worldSize, resourceAmount) {
        let filteredSeeds = [...seedData];
        let size = parseInt(worldSize);
        if (!isNaN(size))
            filteredSeeds = filteredSeeds.filter(seed => { return seed.ws === size; });
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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            setData(filteredSeeds, 100);
        else
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
    worldSize.addEventListener("mouseup", () => (worldSizeCheck.checked) ? Filter() : "");
    worldSize.addEventListener("touchend", () => (worldSizeCheck.checked) ? Filter() : "");
    worldSize.addEventListener("input", () => worldSizeRange.innerHTML = (worldSize.value === "1") ? "50%" : (worldSize.value === "2") ? "75%" : (worldSize.value === "3") ? "100%" : (worldSize.value === "4") ? "150%" : "200%");
    worldSizeCheck.addEventListener("click", Filter);
    resourceAmount.addEventListener("mouseup", () => (resourceAmountCheck.checked) ? Filter() : "");
    resourceAmount.addEventListener("touchend", () => (resourceAmountCheck.checked) ? Filter() : "");
    resourceAmount.addEventListener("input", () => resourceAmountRange.innerHTML = (resourceAmount.value === "1") ? "50%" : (resourceAmount.value === "2") ? "75%" : (resourceAmount.value === "3") ? "100%" : (resourceAmount.value === "4") ? "150%" : "200%");
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
