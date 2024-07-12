import { Requirements } from './Requirements.js';
import { Base } from '../Base.js';
import { Area } from '../Area.js';
export const categoryToFolder = {
    "Balancer": "balancers",
    "Splitter": "splitters",
    "Workshop/Furnace": "workshops-or-furnaces",
    "Machine Shop/Forge": "machine-shops-or-forges",
    "Industrial Factory": "industrial-factories",
    "Manufacturer": "manufacturers",
    "Lab Balancer": "lab-balancers",
    "Overflow Valve": "valves",
};
class Design extends Base {
    static #amount = 0;
    static get amount() { return Design.#amount; }
    static designs = {};
    static get baseBlueprintURL() { return "https://builderment.com/blueprints"; }
    static blueprintURL(blueprintId) { return `${Design.baseBlueprintURL}?id=${blueprintId}`; }
    category;
    size;
    symmetrical;
    requirements;
    blueprintId;
    note;
    get blueprintURL() { return Design.blueprintURL(this.blueprintId); }
    constructor(objectOrOptions, passByReference = true) {
        super(objectOrOptions, passByReference);
        this.image = objectOrOptions.image ?? this.image + `designs/${categoryToFolder[objectOrOptions.category]}/${objectOrOptions.blueprintId}.jpeg`;
        this.category = objectOrOptions.category;
        this.size = passByReference && objectOrOptions.size instanceof Area ? objectOrOptions.size : new Area(objectOrOptions.size);
        this.symmetrical = objectOrOptions.symmetrical;
        this.requirements = passByReference ? objectOrOptions.requirements : new Requirements(objectOrOptions.requirements);
        this.note = objectOrOptions.note;
        if (objectOrOptions.blueprintId.length !== 6)
            throw new Error(`Blueprint of ${this.name} (${objectOrOptions.blueprintId}) must be 6 characters long`);
        this.blueprintId = objectOrOptions.blueprintId;
        Design.#amount++;
        if (typeof Design.designs[this.category] === "undefined")
            Design.designs[this.category] = {};
        if (typeof Design.designs[this.category][this.name] === "undefined")
            Design.designs[this.category][this.name] = [];
        Design.designs[this.category][this.name].push(this);
    }
    similarlyEquals(design) {
        return this.category === design.category
            && this.size.equals(design.size)
            && this.symmetrical === design.symmetrical
            && this.requirements.equals(design.requirements);
    }
    equals(design) {
        return super.equals(design)
            && this.similarlyEquals(design);
    }
    strictlyEquals(design) {
        return super.strictlyEquals(design)
            && this.similarlyEquals(design)
            && this.blueprintId === design.blueprintId;
    }
}
export { Design };
