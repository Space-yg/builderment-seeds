// Add transition to all anchor tags
// This is so that the transition does not work when the page is loaded but work later
for (const a of document.getElementsByTagName("a")) a.style.transition = "all .1s"

//// Inputs
// Add span after all input[type="checkbox"]
for (const input of <NodeListOf<HTMLInputElement>> document.querySelectorAll("input[type='checkbox']")) {
	const span = document.createElement("span")
	span.className = "checkbox"
	input.insertAdjacentElement("afterend", span)
}
// Add progress to all input[type="range"]
function addInputRangeProgress(input: HTMLInputElement): void {
	const width = (+input.value - (+input.min || 0)) * input.clientWidth / ((+input.max || 100) - (+input.min || 0))
	input.style.background = `linear-gradient(to right, rgb(100, 206, 108) ${width}px, rgba(0, 0, 0, 0.1) ${width}px)`;
}
for (const input of <NodeListOf<HTMLInputElement>> document.querySelectorAll("input[type='range']")) {
	input.addEventListener("input", () => addInputRangeProgress(input))
	addInputRangeProgress(input);
}
// Warp all input[type="button"] with div.button
for (const input of <NodeListOf<HTMLInputElement>> document.querySelectorAll("input[type='button']")) {
	const div = document.createElement("div")
	div.className = "button"
	input.insertAdjacentElement("afterend", div)
	div.appendChild(input)
}