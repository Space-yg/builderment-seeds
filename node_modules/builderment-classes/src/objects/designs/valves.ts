/**
 * @author Space.yg
 */

import { RoboticArmTierDesign } from "../../classes/designs/RoboticArmTierDesign.js"
import { Requirements } from "../../classes/designs/Requirements.js"

// Overflow Valve 3x4
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 3, height: 4 }, symmetrical: false, price: { gold: 1132 }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 220 }), blueprintId: "lgak36", note: "Works only for <93% full belts" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 3, height: 4 }, symmetrical: false, price: { gold: 3132 }, requirements: new Requirements({ roboticArmTier: 3, maxBeltSpeed: 435 }), blueprintId: "lsnvlt", note: "Works only for <93% full belts" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 3, height: 4 }, symmetrical: false, price: { gold: 11132 }, requirements: new Requirements({ roboticArmTier: 4, maxBeltSpeed: 445 }), blueprintId: "92wgs9", note: "Works only for <93% full belts" })
// Overflow Valve 2x7
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 2, height: 7 }, symmetrical: false, price: { gold: 1112 }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 220 }), blueprintId: "yy12qc", note: "Works only for <93% full belts" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 2, height: 7 }, symmetrical: false, price: { gold: 3112 }, requirements: new Requirements({ roboticArmTier: 3, maxBeltSpeed: 435 }), blueprintId: "pxdzxb", note: "Works only for <93% full belts" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 2, height: 7 }, symmetrical: false, price: { gold: 11112 }, requirements: new Requirements({ roboticArmTier: 4, maxBeltSpeed: 445 }), blueprintId: "2j6zny", note: "Works only for <93% full belts" })
// Overflow Valve 5x5
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 5, height: 5 }, symmetrical: false, price: { gold: 654 }, requirements: new Requirements({ roboticArmTier: 1, maxBeltSpeed: 210 }), blueprintId: "hn30m8" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 5, height: 5 }, symmetrical: false, price: { gold: 2254 }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 450 }), blueprintId: "322913" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 5, height: 5 }, symmetrical: false, price: { gold: 6254 }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "sk4jvd" })
// Overflow Valve 5x6
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 5, height: 6 }, symmetrical: false, price: { gold: 686 }, requirements: new Requirements({ roboticArmTier: 1, maxBeltSpeed: 450 }), blueprintId: "mt2qb6" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 5, height: 6 }, symmetrical: false, price: { gold: 2286 }, requirements: new Requirements({ roboticArmTier: 2 }), blueprintId: "xdrjtz" })
// Overflow Valve 5x7
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 5, height: 7 }, symmetrical: false, price: { gold: 714 }, requirements: new Requirements({ roboticArmTier: 1 }), blueprintId: "3kqqqg" })
// Overflow Valve 3x7
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 3, height: 7 }, symmetrical: false, price: { gold: 3088 }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 165 }), blueprintId: "62zzcp" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 3, height: 7 }, symmetrical: false, price: { gold: 15088 }, requirements: new Requirements({ roboticArmTier: 3, maxBeltSpeed: 330 }), blueprintId: "kl870n" })
new RoboticArmTierDesign({ category: "Overflow Valve", size: { width: 3, height: 7 }, symmetrical: false, price: { gold: 63088 }, requirements: new Requirements({ roboticArmTier: 4 }), blueprintId: "df37xb" })
// Multi-lane Overflow Valve
new RoboticArmTierDesign({ name: "Multi-lane", category: "Overflow Valve", size: { width: Infinity, height: 42 }, symmetrical: false, price: { gold: null }, requirements: new Requirements({ roboticArmTier: 1, maxBeltSpeed: 235 }), blueprintId: "zdxwg6" })
new RoboticArmTierDesign({ name: "Multi-lane", category: "Overflow Valve", size: { width: Infinity, height: 42 }, symmetrical: false, price: { gold: null }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 475 }), blueprintId: "11bv5y" })
new RoboticArmTierDesign({ name: "Multi-lane", category: "Overflow Valve", size: { width: Infinity, height: 42 }, symmetrical: false, price: { gold: null }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "p2ad9n" })
// Multi-lane Overflow Valve [belt distance 5]
new RoboticArmTierDesign({ name: "Multi-lane", category: "Overflow Valve", size: { width: Infinity, height: 35 }, symmetrical: false, price: { gold: null }, requirements: new Requirements({ roboticArmTier: 1, tunnelLength: 5, maxBeltSpeed: 210 }), blueprintId: "70v6t7" })
new RoboticArmTierDesign({ name: "Multi-lane", category: "Overflow Valve", size: { width: Infinity, height: 35 }, symmetrical: false, price: { gold: null }, requirements: new Requirements({ roboticArmTier: 2, tunnelLength: 5, maxBeltSpeed: 450 }), blueprintId: "l15npb" })
new RoboticArmTierDesign({ name: "Multi-lane", category: "Overflow Valve", size: { width: Infinity, height: 35 }, symmetrical: false, price: { gold: null }, requirements: new Requirements({ roboticArmTier: 3, tunnelLength: 5 }), blueprintId: "hsypm9" })