/**
 * @author Space.yg
 */

import { Decoration } from "../../classes/buildings/Decoration.js"

// Connectable
export const fence = new Decoration({
	name: "Fence",
	price: { gems: 2 },
})
export const concreteWall = new Decoration({
	name: "Concrete Wall",
	price: { gems: 2 },
})

// Trees
export const prettyTree = new Decoration({
	name: "Pretty Tree",
	price: { gems: 10 },
})
export const firTree = new Decoration({
	name: "Fir Tree",
	price: { gems: 10 },
})
export const birchTree = new Decoration({
	name: "Birch Tree",
	price: { gems: 10 },
})
export const palmTree = new Decoration({
	name: "Palm Tree",
	price: { gems: 10 },
})

// Rocks
export const rock1 = new Decoration({
	name: "Rock",
	price: { gems: 10 },
	image: "./resources/decorations/Rock 1.png"
})
export const rock2 = new Decoration({
	name: "Rock",
	price: { gems: 10 },
	image: "./resources/decorations/Rock 2.png"
})
export const rock3 = new Decoration({
	name: "Rock",
	price: { gems: 10 },
	image: "./resources/decorations/Rock 3.png"
})

// Other
export const hazardCone = new Decoration({
	name: "Hazard Cone",
	price: { gems: 20 },
})
export const brokenPipe = new Decoration({
	name: "Broken Pipe",
	price: { gems: 20 },
})
export const barrel = new Decoration({
	name: "Barrel",
	price: { gems: 20 },
})
export const woodenCrate = new Decoration({
	name: "Wooden Crate",
	price: { gems: 20 },
})

// Statues
export const gearStatue = new Decoration({
	name: "Gear Statue",
	price: { gems: 20 },
})
export const circuitStatue = new Decoration({
	name: "Circuit Statue",
	price: { gems: 40 },
})
export const steelStatue = new Decoration({
	name: "Steel Statue",
	price: { gems: 60 },
})
export const particleStatue = new Decoration({
	name: "Particle Statue",
	price: { gems: 80 },
})
export const earthStatue = new Decoration({
	name: "Earth Statue",
	price: { gems: 100 },
})

// Event
export const pumpkin = new Decoration({
	name: "Pumpkin",
	price: { gems: 30 },
})
export const snowman = new Decoration({
	name: "Snowman",
	price: { gems: 30 },
})