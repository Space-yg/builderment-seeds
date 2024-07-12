"use strict";
for (const a of document.getElementsByTagName("a"))
    a.style.transition = "all .1s";
for (const input of document.querySelectorAll("input[type='checkbox']")) {
    const span = document.createElement("span");
    span.className = "checkbox";
    input.insertAdjacentElement("afterend", span);
}
function addInputRangeProgress(input) {
    const width = (+input.value - (+input.min || 0)) * input.clientWidth / ((+input.max || 100) - (+input.min || 0));
    input.style.background = `linear-gradient(to right, rgb(100, 206, 108) ${width}px, rgba(0, 0, 0, 0.1) ${width}px)`;
}
for (const input of document.querySelectorAll("input[type='range']")) {
    input.addEventListener("input", () => addInputRangeProgress(input));
    addInputRangeProgress(input);
}
for (const input of document.querySelectorAll("input[type='button']")) {
    const div = document.createElement("div");
    div.className = "button";
    input.insertAdjacentElement("afterend", div);
    div.appendChild(input);
}
