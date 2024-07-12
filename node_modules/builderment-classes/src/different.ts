/**
 * @author Space.yg
 * 
 * Get all differences between created objects and images.
 */

import fs from "fs"

// Classes
import { categoryToFolder } from "./classes/designs/Design.js"
import { NToM } from "./classes/designs/NToM.js"
import { RoboticArmTierDesign } from "./classes/designs/RoboticArmTierDesign.js"

// Objects
import * as _ from "./objects/designs/balancers.js"
import * as __ from "./objects/designs/factory-splitters.js"
import * as ___ from "./objects/designs/lab-balancers.js"
import * as ____ from "./objects/designs/splitters.js"
import * as _____ from "./objects/designs/valves.js"
_
__
___
____
_____

const folderToCategory: { [folder: string]: string } = {}
for (const category in categoryToFolder) folderToCategory[categoryToFolder[category as keyof typeof categoryToFolder]] = category

//// N to M
// Get NToM all files
const allNToMFiles = new Set<string>()
fs.readdirSync("./resources/designs").forEach(dir => {
	if (dir === "lab-balancers" || dir === "valves") return
	fs.readdirSync(`./resources/designs/${dir}`).forEach(file => {
		allNToMFiles.add(dir + "/" + file)
	})
})

// Get all n to m blueprints and add extension to it
const allNToM: NToM[] = []
for (const category in NToM.nToM) {
	for (const n in NToM.nToM[category]) {
		for (const m in NToM.nToM[category][n]) {
			NToM.nToM[category][n][m].forEach(nToM => allNToM.push(nToM))
		}
	}
}

console.log("\x1b[38;5;40mN:Ms\x1b[0m")

console.log("\x1b[38;5;220m• Check if image is in NToMs\x1b[38;5;196m")
let error = false
allNToMFiles.forEach(file => {
	if (!allNToM.some(nToM => categoryToFolder[nToM.category] + "/" + nToM.blueprintId + ".jpeg" === file)) {
		console.log(`  • ${file} should be added to nToMs`)
		error = true
	}
})
if (!error) console.log("\x1b[38;5;40m  • Nothing should be added to nToMs")
process.stdout.write("\x1b[0m")

console.log("\x1b[38;5;220m• Check if NToM is in images\x1b[38;5;196m")
error = false
allNToM.forEach(nToM => {
	if (!allNToMFiles.has(categoryToFolder[nToM.category] + "/" + nToM.blueprintId + ".jpeg")) {
		console.log(`  • ${nToM.name} ${nToM.category} (${nToM.blueprintId}) should be removed`)
		error = true
	}
})
if (!error) console.log("\x1b[38;5;40m  • Nothing should be removed")
console.log("\x1b[0m")

//// Robotic Arm
// Get NToM all files
const allRoboticArmFiles = new Set<string>()
fs.readdirSync("./resources/designs").forEach(dir => {
	if (dir === "lab-balancers" || dir === "valves") fs.readdirSync(`./resources/designs/${dir}`).forEach(file => {
		allRoboticArmFiles.add(dir + "/" + file)
	})
})
// Get all robotic arm designs
const allRoboticArmDesigns: RoboticArmTierDesign[] = []
for (const category in RoboticArmTierDesign.roboticArmTierDesigns) {
	for (const roboticArmTier in RoboticArmTierDesign.roboticArmTierDesigns[category]) {
		RoboticArmTierDesign.roboticArmTierDesigns[category][roboticArmTier].forEach(tier => allRoboticArmDesigns.push(tier))
	}
}

console.log("\x1b[38;5;40mRobotic Arm Designs\x1b[0m")

console.log("\x1b[38;5;220m• Check if image is in RoboticArmTierDesigns\x1b[38;5;196m")
error = false
allRoboticArmFiles.forEach(file => {
	if (!allRoboticArmDesigns.some(tier => categoryToFolder[tier.category] + "/" + tier.blueprintId + ".jpeg" === file)) {
		console.log(`  • ${file} should be added to RoboticArmTierDesigns`)
		error = true
	}
})
if (!error) console.log("\x1b[38;5;40m  • Nothing should be added to RoboticArmTierDesigns")
process.stdout.write("\x1b[0m")

console.log("\x1b[38;5;220m• Check if RoboticArmTierDesign is in images\x1b[38;5;196m")
error = false
allRoboticArmDesigns.forEach(tier => {
	if (!allRoboticArmFiles.has(categoryToFolder[tier.category] + "/" + tier.blueprintId + ".jpeg")) {
		console.log(`  • ${tier.name} ${tier.category} (${tier.blueprintId})'s image should be added`)
		error = true
	}
})
if (!error) console.log("\x1b[38;5;40m  • No image should be added")
process.stdout.write("\x1b[0m")

// TODO: Add difference for all classes