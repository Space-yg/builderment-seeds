import { Base } from "../Base.js";
class Decoration extends Base {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static decorations = {};
    static get description() { return "Purely decorative, make your factory one of a kind."; }
    constructor(optionsOrDecoration) {
        super(optionsOrDecoration);
        this.image = optionsOrDecoration.image ?? this.image + `decorations/${this.name}`;
        Decoration.#amount++;
        if (typeof Decoration.decorations[optionsOrDecoration.name] === "undefined")
            Decoration.decorations[optionsOrDecoration.name] = [this];
        else
            Decoration.decorations[optionsOrDecoration.name].push(this);
    }
}
export { Decoration };
