import { Seed } from "@/types"
import { Item } from "builderment-classes"
import { getResourcesFromData } from "./dataReader"

export async function calculateResource(seeds: Seed[], resource: string, powerPlant: boolean = false, alt: boolean = false): Promise<Seed[]> {
	const item = Item.getItemsByName(resource)[0]
	if (typeof item === "undefined") throw new Error(`Item "${resource}" does not exist`)

	seeds = JSON.parse(JSON.stringify(seeds))

	// No power plant and alt
	if (!powerPlant && !alt) seeds.forEach(seed => {
		seed.r = item.getMaxAmount({
			"Wood Log": seed.w,
			Stone: seed.s,
			"Iron Ore": seed.i,
			"Copper Ore": seed.cp,
			Coal: seed.cl,
			Wolframite: seed.wl,
			"Uranium Ore": seed.u,
		})
	})
	// With power plant and/or alt
	else {
		const data = await (await fetch(`/${powerPlant && alt ? "powerPlant-and-alt" : powerPlant ? "powerPlant" : "alt"}/${item.name}.bin`)).arrayBuffer()
		const resources = getResourcesFromData(data)
		for (let i = 0; i < seeds.length; i++) seeds[i].r = resources[i]

		// seeds[0].r = (await item.getMaxInGameItemAmount({
		// 	"Wood Log": seeds[0].w,
		// 	Stone: seeds[0].s,
		// 	"Iron Ore": seeds[0].i,
		// 	"Copper Ore": seeds[0].cp,
		// 	Coal: seeds[0].cl,
		// 	Wolframite: seeds[0].wl,
		// 	"Uranium Ore": seeds[0].u,
		// }, powerPlant, alt)).maxAmount

		// console.time("Time")

		// FIX: this performance issue
		// const gpu = new GPU()
		// const calculate = gpu.createKernel(function(seeds) {

		// }).setOutput([seeds.length, seeds.length])

		// calculate()

		// const numOfProcesses = 2
		// let currentProcess = [0]
		// let i = 1
		// while (i < 5 /* seeds.length */) {
		// 	if (currentProcess[0] < numOfProcesses) {
		// 		currentProcess[0]++
		// 		new Promise(resolve => {
		// 			console.log(currentProcess[0])
		// 			console.log(i)
		// 			item.getMaxInGameItemAmount({
		// 				"Wood Log": seeds[i].w,
		// 				Stone: seeds[i].s,
		// 				"Iron Ore": seeds[i].i,
		// 				"Copper Ore": seeds[i].cp,
		// 				Coal: seeds[i].cl,
		// 				Wolframite: seeds[i].wl,
		// 				"Uranium Ore": seeds[i].u,
		// 			}, powerPlant, alt).then(res => {
		// 				seeds[i].r = res.maxAmount
		// 				console.log(currentProcess[0])
		// 				currentProcess[0]--
		// 				resolve(undefined)
		// 			})
		// 		})
		// 		i++
		// 	}
		// }

		// for (let i = 1; i < /* seeds.length */ 101; i += 4) {
		// 	if ((i - 1) % 100_000 === 0)
		// 		console.log("!!!!!", i, "!!!!!")
		// 	else if ((i - 1) % 10_000 === 0)
		// 		console.log(i)
		// 	await Promise.all([
		// 		new Promise(async resolve => {
		// 			seeds[i].r = (await item.getMaxInGameItemAmount({
		// 				"Wood Log": seeds[i].w,
		// 				Stone: seeds[i].s,
		// 				"Iron Ore": seeds[i].i,
		// 				"Copper Ore": seeds[i].cp,
		// 				Coal: seeds[i].cl,
		// 				Wolframite: seeds[i].wl,
		// 				"Uranium Ore": seeds[i].u,
		// 			}, powerPlant, alt)).maxAmount
		// 			resolve(undefined)
		// 		}),
		// 		new Promise(async resolve => {
		// 			if (i + 1 < seeds.length)
		// 				seeds[i + 1].r = (await item.getMaxInGameItemAmount({
		// 					"Wood Log": seeds[i + 1].w,
		// 					Stone: seeds[i + 1].s,
		// 					"Iron Ore": seeds[i + 1].i,
		// 					"Copper Ore": seeds[i + 1].cp,
		// 					Coal: seeds[i + 1].cl,
		// 					Wolframite: seeds[i + 1].wl,
		// 					"Uranium Ore": seeds[i + 1].u,
		// 				}, powerPlant, alt)).maxAmount
		// 			resolve(undefined)
		// 		}),
		// 		new Promise(async resolve => {
		// 			if (i + 2 < seeds.length)
		// 				seeds[i + 2].r = (await item.getMaxInGameItemAmount({
		// 					"Wood Log": seeds[i + 2].w,
		// 					Stone: seeds[i + 2].s,
		// 					"Iron Ore": seeds[i + 2].i,
		// 					"Copper Ore": seeds[i + 2].cp,
		// 					Coal: seeds[i + 2].cl,
		// 					Wolframite: seeds[i + 2].wl,
		// 					"Uranium Ore": seeds[i + 2].u,
		// 				}, powerPlant, alt)).maxAmount
		// 			resolve(undefined)
		// 		}),
		// 		new Promise(async resolve => {
		// 			if (i + 3 < seeds.length)
		// 				seeds[i + 3].r = (await item.getMaxInGameItemAmount({
		// 					"Wood Log": seeds[i + 3].w,
		// 					Stone: seeds[i + 3].s,
		// 					"Iron Ore": seeds[i + 3].i,
		// 					"Copper Ore": seeds[i + 3].cp,
		// 					Coal: seeds[i + 3].cl,
		// 					Wolframite: seeds[i + 3].wl,
		// 					"Uranium Ore": seeds[i + 3].u,
		// 				}, powerPlant, alt)).maxAmount
		// 			resolve(undefined)
		// 		}),
		// 	])

		// 	// seeds[i].r = (await item.getMaxInGameItemAmount({
		// 	// 	"Wood Log": seeds[i].w,
		// 	// 	Stone: seeds[i].s,
		// 	// 	"Iron Ore": seeds[i].i,
		// 	// 	"Copper Ore": seeds[i].cp,
		// 	// 	Coal: seeds[i].cl,
		// 	// 	Wolframite: seeds[i].wl,
		// 	// 	"Uranium Ore": seeds[i].u,
		// 	// }, powerPlant, alt)).maxAmount
		// }
		// console.log("done!")
		// console.timeEnd("Time")
	}

	// let i = 0
	// seeds[i].r = (await item.getMaxInGameItemAmount({
	// 	"Wood Log": seeds[i].w,
	// 	Stone: seeds[i].s,
	// 	"Iron Ore": seeds[i].i,
	// 	"Copper Ore": seeds[i].cp,
	// 	Coal: seeds[i].cl,
	// 	Wolframite: seeds[i].wl,
	// 	"Uranium Ore": seeds[i].u,
	// }, powerPlant, alt)).maxAmount
	// console.time("Time")
	// await Promise.all([
	// 	new Promise(async resolve => {
	// 		seeds[i].r = (await item.getMaxInGameItemAmount({
	// 			"Wood Log": seeds[i].w,
	// 			Stone: seeds[i].s,
	// 			"Iron Ore": seeds[i].i,
	// 			"Copper Ore": seeds[i].cp,
	// 			Coal: seeds[i].cl,
	// 			Wolframite: seeds[i].wl,
	// 			"Uranium Ore": seeds[i].u,
	// 		}, true, true)).maxAmount
	// 		resolve(undefined)
	// 	}),
	// 	new Promise(async resolve => {
	// 		seeds[i + 1].r = (await item.getMaxInGameItemAmount({
	// 			"Wood Log": seeds[i + 1].w,
	// 			Stone: seeds[i + 1].s,
	// 			"Iron Ore": seeds[i + 1].i,
	// 			"Copper Ore": seeds[i + 1].cp,
	// 			Coal: seeds[i + 1].cl,
	// 			Wolframite: seeds[i + 1].wl,
	// 			"Uranium Ore": seeds[i + 1].u,
	// 		}, true, true)).maxAmount
	// 		resolve(undefined)
	// 	}),
	// 	new Promise(async resolve => {
	// 		seeds[i + 2].r = (await item.getMaxInGameItemAmount({
	// 			"Wood Log": seeds[i + 2].w,
	// 			Stone: seeds[i + 2].s,
	// 			"Iron Ore": seeds[i + 2].i,
	// 			"Copper Ore": seeds[i + 2].cp,
	// 			Coal: seeds[i + 2].cl,
	// 			Wolframite: seeds[i + 2].wl,
	// 			"Uranium Ore": seeds[i + 2].u,
	// 		}, true, true)).maxAmount
	// 		resolve(undefined)
	// 	})
	// ])

	// seeds[i].r = (await item.getMaxInGameItemAmount({
	// 	"Wood Log": seeds[i].w,
	// 	Stone: seeds[i].s,
	// 	"Iron Ore": seeds[i].i,
	// 	"Copper Ore": seeds[i].cp,
	// 	Coal: seeds[i].cl,
	// 	Wolframite: seeds[i].wl,
	// 	"Uranium Ore": seeds[i].u,
	// }, true, true)).maxAmount
	// console.log("done!")
	// console.timeEnd("Time")

	return seeds
}