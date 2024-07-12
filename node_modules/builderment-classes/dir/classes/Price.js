export class Price {
    static add(...prices) {
        const total = new Price();
        for (const price of prices)
            total.add(price instanceof Price ? price : new Price(price));
        return total;
    }
    static equalPrices(...prices) {
        if (!prices.length)
            return false;
        const basePrice = prices[0] instanceof Price ? prices[0] : new Price(prices[0]);
        return prices.slice(1).every(price => basePrice.equals(price instanceof Price ? price : new Price(price)));
    }
    gold;
    gems;
    constructor(optionsOrPrice) {
        if (typeof optionsOrPrice === "undefined") {
            this.gold = 0;
            this.gems = 0;
        }
        else {
            this.gold = typeof optionsOrPrice.gold === "undefined" ? 0 : optionsOrPrice.gold;
            this.gems = typeof optionsOrPrice.gems === "undefined" ? 0 : optionsOrPrice.gems;
        }
    }
    toString() { return `Price({ gold: ${this.gold}, gems: ${this.gems} })`; }
    add(price) {
        if (!(this.gold === null && price.gold === null))
            this.gold += price.gold;
        if (!(this.gems === null && price.gems === null))
            this.gems += price.gems;
        return this;
    }
    toAdd(price) {
        return new Price({
            gold: this.gold === null && price.gold === null ? null : this.gold + price.gold,
            gems: this.gems === null && price.gems === null ? null : this.gems + price.gems,
        });
    }
    equals(price) {
        if (this === price)
            return true;
        return this.gold === price.gold
            && this.gems === price.gems;
    }
    get [Symbol.toStringTag]() { return "Price"; }
    *[Symbol.iterator]() {
        yield this.gold;
        yield this.gems;
    }
}
