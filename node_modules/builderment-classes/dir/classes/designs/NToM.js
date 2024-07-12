import { Design } from "./Design.js";
class NToM extends Design {
    static #amount = 0;
    static get amount() { return NToM.#amount; }
    static nToM = {};
    n;
    m;
    constructor(objectOrOptions, passByReference = true) {
        if (objectOrOptions instanceof NToM)
            super(objectOrOptions, passByReference);
        else
            super({
                ...objectOrOptions,
                name: typeof objectOrOptions.name === "undefined" ? `${objectOrOptions.n}:${objectOrOptions.m}` : objectOrOptions.name,
            }, passByReference);
        this.n = objectOrOptions.n;
        this.m = objectOrOptions.m;
        NToM.#amount++;
        if (typeof NToM.nToM[this.category] === "undefined")
            NToM.nToM[this.category] = {};
        if (typeof NToM.nToM[this.category][this.n] === "undefined")
            NToM.nToM[this.category][this.n] = {};
        if (typeof NToM.nToM[this.category][this.n][this.m] === "undefined")
            NToM.nToM[this.category][this.n][this.m] = [];
        NToM.nToM[this.category][this.n][this.m].push(this);
    }
    similarlyEquals(nToM) {
        return this.n === nToM.n
            && this.m === nToM.m;
    }
    equals(nToM) {
        return super.equals(nToM)
            && this.similarlyEquals(nToM);
    }
    strictlyEquals(nToM) {
        return super.strictlyEquals(nToM)
            && this.similarlyEquals(nToM);
    }
}
export { NToM };
