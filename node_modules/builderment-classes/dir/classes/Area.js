export class Area {
    width;
    height;
    get area() { return this.width * this.height; }
    constructor(optionsOrArea) {
        this.width = optionsOrArea.width;
        this.height = optionsOrArea.height;
    }
    equals(area) {
        if (this === area)
            return true;
        return this.width === area.width
            && this.height === area.height;
    }
}
