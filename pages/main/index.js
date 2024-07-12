import { resourceFilter, calculateWithPowerPlantsCheck, amountFilter, amount, order, filterSeed, Filter, worldSize, worldSizeCheck, resourceAmount, worldSizeRange, resourceAmountCheck, resourceAmountRange, progressBar, } from "./filter.js";
export const sliderValueToSize = {
    "1": "50",
    "2": "75",
    "3": "100",
    "4": "150",
    "5": "200",
};
const addResources = {
    1: {
        wd: 170,
        s: 130,
        i: 170,
        cp: 130,
        cl: 170,
        wl: 70,
        u: 10,
    },
    2: {
        wd: 255,
        s: 195,
        i: 255,
        cp: 195,
        cl: 255,
        wl: 105,
        u: 15,
    },
    3: {
        wd: 340,
        s: 260,
        i: 340,
        cp: 260,
        cl: 340,
        wl: 140,
        u: 20,
    },
    4: {
        wd: 510,
        s: 390,
        i: 510,
        cp: 390,
        cl: 510,
        wl: 210,
        u: 30,
    },
    5: {
        wd: 680,
        s: 520,
        i: 680,
        cp: 520,
        cl: 680,
        wl: 280,
        u: 40,
    },
};
export const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function test() { console.log("Test"); }
function copy(event) { navigator.clipboard.writeText(event.target.innerHTML); }
function toBase62(n) {
    if (n === 0)
        return "0";
    var result = [];
    while (n > 0) {
        result.push(base62[n % base62.length]);
        n = Math.floor(n / base62.length);
    }
    return result.reduce((pre, cur) => cur + pre);
}
export function addProgress(input) {
    const width = (+input.value - (+input.min || 0)) * input.clientWidth / ((+input.max || 100) - (+input.min || 0));
    input.style.background = `linear-gradient(to right, rgb(100, 206, 108) ${width}px, rgba(0, 0, 0, 0.1) ${width}px)`;
    return input;
}
export function addProgressToAll(element = document) {
    const ranges = element.querySelectorAll("input[type='range']");
    for (const range of ranges) {
        range.addEventListener("input", () => addProgress(range));
        addProgress(range);
    }
    return ranges;
}
const req = new XMLHttpRequest();
req.responseType = "arraybuffer";
req.addEventListener("loadstart", () => {
    progressBar.parentElement.style.visibility = "visible";
});
req.addEventListener("progress", event => {
    if (event.lengthComputable) {
        progressBar.firstElementChild.innerHTML = `${Math.floor(event.loaded / 10_000) / 100}`;
        progressBar.lastElementChild.innerHTML = `MB / ${Math.floor(event.total / 10_000) / 100} MB`;
        const percentComplete = event.loaded / event.total;
        progressBar.style.width = 150 * percentComplete + "px";
    }
});
req.addEventListener("load", async function () {
    let s = this.response;
    s = new Uint8Array(s);
    const seeds = [];
    const seedsUtf8 = [];
    for (let i = 0; i < s.length; i += 12)
        seedsUtf8.push(s.slice(i, i + 12));
    console.time("new");
    for (const utf8 of seedsUtf8) {
        const wsOrRa = utf8[4].toString(2).padStart(8, "0");
        const r = parseInt(wsOrRa.slice(4), 2);
        seeds.push({
            sd: toBase62(utf8[0] + utf8[1] * 256 + utf8[2] * 256 ** 2 + utf8[3] * 256 ** 3),
            ws: parseInt(wsOrRa.slice(0, 4), 2),
            r: r,
            wd: utf8[5] + addResources[r]["wd"],
            s: utf8[6] + addResources[r]["s"],
            i: utf8[7] + addResources[r]["i"],
            cp: utf8[8] + addResources[r]["cp"],
            cl: utf8[9] + addResources[r]["cl"],
            wl: utf8[10] + addResources[r]["wl"],
            u: utf8[11] + addResources[r]["u"],
            rf: 0,
            pp: 0,
        });
    }
    console.timeEnd("new");
    amountFilter.addEventListener("change", () => Filter(seeds));
    amount.addEventListener("change", () => Filter(seeds));
    order.addEventListener("change", () => Filter(seeds));
    filterSeed.addEventListener("change", () => {
        Filter(seeds);
    });
    worldSize.addEventListener("mouseup", () => (worldSizeCheck.checked) ? Filter(seeds) : null);
    worldSize.addEventListener("focusout", () => (worldSizeCheck.checked) ? Filter(seeds) : null);
    worldSize.addEventListener("input", () => worldSizeRange.innerHTML = sliderValueToSize[worldSize.value] + "%");
    worldSizeCheck.addEventListener("click", () => Filter(seeds));
    resourceAmount.addEventListener("mouseup", () => (resourceAmountCheck.checked) ? Filter(seeds) : null);
    resourceAmount.addEventListener("focusout", () => (resourceAmountCheck.checked) ? Filter(seeds) : null);
    resourceAmount.addEventListener("input", () => resourceAmountRange.innerHTML = sliderValueToSize[resourceAmount.value] + "%");
    resourceAmountCheck.addEventListener("click", () => Filter(seeds));
    calculateWithPowerPlantsCheck.addEventListener("click", () => Filter(seeds));
    Filter(seeds);
    resourceFilter.addEventListener("change", () => {
        calculateWithPowerPlantsCheck.parentElement.style.display = resourceFilter.value == "Earth Token" ? "inline-block" : "none";
        calculateWithPowerPlantsCheck.checked = false;
        Filter(seeds);
    });
    addProgressToAll();
});
req.open("GET", "./pages/main/seeds.bin");
req.send();
