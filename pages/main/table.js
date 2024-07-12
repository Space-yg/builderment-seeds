import { sliderValueToSize } from "./index.js";
import { calculateWithPowerPlantsCheck } from "./filter.js";
const tableData = document.getElementById("data");
const resourcesDivs = {};
for (const resourceDiv of tableData.children)
    resourcesDivs[resourceDiv.dataset["name"]] = resourceDiv;
const showMore = document.getElementById("showMore");
function addSeedTableRow(seed) {
    for (const k in seed) {
        const key = k;
        switch (key) {
            case "rf":
                if (!calculateWithPowerPlantsCheck.checked)
                    resourcesDivs[key].innerHTML += `<div class="entry" onclick="s(event)" title="${Math.round(seed.rf * 100000) / 100000}">${Math.round(seed.rf * 1000) / 1000}</div>`;
                break;
            case "ws":
            case "r":
                resourcesDivs[key].innerHTML += `<div class="entry">${sliderValueToSize[seed[key]]}</div>`;
                break;
            case "sd":
                resourcesDivs[key].innerHTML += `<div class="entry" onclick="c(event)">${seed[key]}</div>`;
                break;
            case "pp":
                if (calculateWithPowerPlantsCheck.checked)
                    resourcesDivs["rf"].innerHTML += `<div class="entry" onclick="s(event)" title="${Math.round(seed[key] * 100000) / 100000}">${Math.round(seed[key] * 1000) / 1000}</div>`;
                break;
            default:
                resourcesDivs[key].innerHTML += `<div class="entry">${seed[key]}</div>`;
                break;
        }
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
export function setData(data, showLimit = 50) {
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
