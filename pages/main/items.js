// Format of each resource
// const exampleResource = new Item("Example Resource", price, factoryName, Input(otherExampleResources, amount, inputPerMin)[], productionPerMin, outputAmount = 1);

// Factories
const workshop = new Factory("Workshop", 1, 4, [10, 1000, 4000, 12000]);
const furnace = new Factory("Furnace", 1, 4, [30, 200, 800, 3200]);
const machineShop = new Factory("Machine Shop", 2, 4, [100, 500, 2000, 8000]);
const forge = new Factory("Forge", 2, 4, [100, 500, 2000, 10000]);
const industrialFactory = new Factory("Industrial Factory", 3, 4, [300, 1000, 4000, 16000]);
const manufacturer = new Factory("Manufacturer", 4, 4, [1000, 4000, 20000, 80000]);
const earthTeleporter = new Factory("Earth Teleporter", 1, 1, [100000]);

// Base resources
const woodLog = new Item("Wood Log", 1, extractor, [], 7.5);
const stone = new Item("Stone", 1, extractor, [], 7.5);
const ironOre = new Item("Iron Ore", 1, extractor, [], 7.5);
const copperOre = new Item("Copper Ore", 1, extractor, [], 7.5);
const coal = new Item("Coal", 1, extractor, [], 7.5);
const wolframite = new Item("Wolframite", 1, extractor, [], 7.5);

// Resources made from base resources only
const woodPlank = new Item("Wood Plank", 1, workshop, [new Input(woodLog, 1, 15)], 15);
const sand = new Item("Sand", 1, workshop, [new Input(stone, 1, 40)], 40);
const ironIngot = new Item("Iron Ingot", 1, furnace, [new Input(ironOre, 1, 30)], 30);
const copperIngot = new Item("Copper Ingot", 1, furnace, [new Input(copperOre, 1, 30)], 30);
const tungstenOre = new Item("Tungsten Ore", 5, furnace, [new Input(wolframite, 5, 120)], 24);
const graphite = new Item("Graphite", 6, forge, [new Input(coal, 3, 45), new Input(woodLog, 3, 45)], 15);

// Other
const woodFrame = new Item("Wood Frame", 1, workshop, [new Input(woodPlank, 4, 30)], 7.5);
const copperWire = new Item("Copper Wire", 2, workshop, [new Input(copperIngot, 3, 45)], 30, 2);
const heatSink = new Item("Heat Sink", 5, workshop, [new Input(copperIngot, 5, 50)], 10);
const ironGear = new Item("Iron Gear", 2, workshop, [new Input(ironIngot, 2, 30)], 15);
const ironPlating = new Item("Iron Plating", 2, workshop, [new Input(ironIngot, 4, 40)], 20, 2);
const steel = new Item("Steel", 12, forge, [new Input(graphite, 1, 7.5), new Input(ironOre, 6, 45)], 7.5);
const steelRod = new Item("Steel Rod", 35, workshop, [new Input(steel, 3, 45)], 15);
const glass = new Item("Glass", 4, furnace, [new Input(sand, 4, 40)], 10);
const condenserLens = new Item("Condenser Lens", 12, workshop, [new Input(glass, 3, 40)], 40);
const carbonFiber = new Item("Carbon Fiber", 24, workshop, [new Input(graphite, 4, 30)], 7.5);
const tungstenCarbide = new Item("Concrete", 16, forge, [new Input(tungstenOre, 2, 24), new Input(graphite, 1, 12)], 12);
const coupler = new Item("Coupler", 16, workshop, [new Input(tungstenCarbide, 1, 6)], 6);
const concrete = new Item("Concrete", 40, forge, [new Input(sand, 10, 75), new Input(steelRod, 1, 7.5)], 7.5);
const metalFrame = new Item("Metal Frame", 12, machineShop, [new Input(woodFrame, 1, 5), new Input(ironPlating, 4, 20)], 5);
const industrialFrame = new Item("Industrial Frame", 400, industrialFactory, [new Input(concrete, 6, 18), new Input(metalFrame, 2, 6), new Input(tungstenCarbide, 8, 24)], 3);
const silicon = new Item("Silicon", 2, furnace, [new Input(sand, 2, 40)], 20);
const logicCircuit = new Item("Logic Circuit", 10, machineShop, [new Input(copperWire, 3, 30), new Input(silicon, 2, 20)], 10);
const nanoWire = new Item("Nano Wire", 60, machineShop, [new Input(carbonFiber, 2, 10), new Input(glass, 4, 20)], 5);
const turbocharge = new Item("Turbocharge", 250, manufacturer, [new Input(ironGear, 8, 32), new Input(logicCircuit, 4, 16), new Input(nanoWire, 2, 8), new Input(coupler, 4, 16)], 4);
const electromagnet = new Item("Electromagnet", 14, machineShop, [new Input(copperWire, 6, 45), new Input(ironIngot, 2, 15)], 10);
const battery = new Item("Battery", 150, machineShop, [new Input(electromagnet, 8, 20), new Input(graphite, 8, 20)], 2.5);
const rotor = new Item("Rotor", 40, machineShop, [new Input(steelRod, 1, 10), new Input(ironPlating, 2, 20)], 10);
const electricMotor = new Item("Electric Motor", 250, industrialFactory, [new Input(battery, 1, 3), new Input(ironGear, 4, 12), new Input(rotor, 2, 6)], 3);
const tank = new Item("Tank", 250, industrialFactory, [new Input(glass, 2, 12), new Input(concrete, 4, 24), new Input(tungstenCarbide, 4, 24)], 6);
const matterCompressor = new Item("Matter Compressor", 1500, manufacturer, [new Input(industrialFrame, 1, 2), new Input(turbocharge, 2, 4), new Input(electricMotor, 2, 4), new Input(tank, 1, 2)], 2);
const particleGlue = new Item("Particle Glue", 150, workshop, [new Input(matterCompressor, 1, 2)], 20, 10);
const gyroscope = new Item("Gyroscope", 100, machineShop, [new Input(copperWire, 12, 60), new Input(rotor, 2, 10)], 5);
const energyCube = new Item("Energy Cube", 700, machineShop, [new Input(battery, 2, 4), new Input(industrialFrame, 1, 2)], 2);
const computer = new Item("Computer", 60, industrialFactory, [new Input(metalFrame, 1, 7.5), new Input(heatSink, 3, 22.5), new Input(logicCircuit, 3, 22.5)], 7.5);
const stabilizer = new Item("Stabilizer", 500, industrialFactory, [new Input(computer, 1, 2.5), new Input(electricMotor, 1, 2.5), new Input(gyroscope, 2, 5)], 2.5);
const magneticFieldGenerator = new Item("Magnetic Field Generator", 1500, manufacturer, [new Input(stabilizer, 1, 1.5), new Input(industrialFrame, 1, 1.5), new Input(electromagnet, 10, 15), new Input(nanoWire, 10, 15)], 1.5);
const quantumEntangler = new Item("Quantum Entangler", 2500, machineShop, [new Input(magneticFieldGenerator, 1, 1), new Input(stabilizer, 2, 2)], 1);
const electronMicroscope = new Item("Electron Microscope", 300, manufacturer, [new Input(nanoWire, 2, 5), new Input(electromagnet, 8, 20), new Input(condenserLens, 4, 10), new Input(metalFrame, 2, 5)], 2.5);
const superComputer = new Item("Super Computer", 500, manufacturer, [new Input(computer, 2, 4), new Input(heatSink, 8, 16), new Input(turbocharge, 1, 2), new Input(coupler, 8, 16)], 2);
const atomicLocator = new Item("Atomic Locator", 2500, manufacturer, [new Input(superComputer, 2, 4), new Input(electronMicroscope, 2, 4), new Input(concrete, 24, 48), new Input(copperWire, 50, 100)], 2);
const matterDuplicator = new Item("Matter Duplicator", 32000, manufacturer, [new Input(atomicLocator, 4, 8 / 3), new Input(quantumEntangler, 2, 4 / 3), new Input(energyCube, 5, 10 / 3), new Input(particleGlue, 100, 200 / 3)], 2 / 3);
const earthToken = new Item("Earth Token", 32000, earthTeleporter, [new Input(matterDuplicator, 1, 60 / 42)], 60 / 42);

// Uranium Stuff
const uranium = new Item("Uranium", 10, uraniumExtractor, [], 10);
const enrichedUranium = new Item("Enriched Uranium", 1000, furnace, [new Input(uranium, 30, 30)], 1);
const emptyFuelCell = new Item("Empty Fuel Cell", 70, machineShop, [new Input(tungstenCarbide, 3, 12), new Input(glass, 5, 20)], 4);
const nuclearFuelCell = new Item("Nuclear Fuel Cell", 1200, industrialFactory, [new Input(emptyFuelCell, 1, 2), new Input(steelRod, 1, 2), new Input(enrichedUranium, 1, 2)], 2);
