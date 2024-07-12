import { Base } from "../Base.js";
class ItemCollector extends Base {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static itemCollectors = {};
    description;
    limit;
    inputs;
    constructor(itemCollectorOrOptions) {
        super(itemCollectorOrOptions);
        this.image = itemCollectorOrOptions.image ?? this.image + `item-collectors/${this.name}.png`;
        this.description = itemCollectorOrOptions.description;
        this.limit = itemCollectorOrOptions.limit;
        this.inputs = itemCollectorOrOptions.inputs;
        ItemCollector.#amount++;
        ItemCollector.itemCollectors[itemCollectorOrOptions.name] = this;
    }
    similarEquals(itemCollector) {
        return this.description === itemCollector.description
            && this.limit === itemCollector.limit
            && this.inputs === itemCollector.inputs;
    }
    equals(itemCollector) {
        return super.equals(itemCollector)
            && this.similarEquals(itemCollector);
    }
    strictlyEquals(itemCollector) {
        return super.strictlyEquals(itemCollector)
            && this.similarEquals(itemCollector);
    }
}
export { ItemCollector };
