import { Base } from "./Base.js";
import { Item } from "./Item.js";
import { ItemCollector } from "./buildings/ItemCollector.js";
import { Tiers } from "./buildings/tiers/Tiers.js";
import { OutputTiers } from "./buildings/tiers/output-tiers/OutputTiers.js";
import { Factory } from "./buildings/tiers/output-tiers/Factory.js";
import { StorageTiers } from "./buildings/tiers/storage-tiers/StorageTiers.js";
import { Storage } from "./buildings/tiers/storage-tiers/Storage.js";
import { DistanceTiers } from "./buildings/tiers/distance-tiers/DistanceTiers.js";
import { TransportationDistance } from "./buildings/tiers/distance-tiers/TransportationDistance.js";
import { Price } from "./Price.js";
class Technology extends Base {
    static #amount = 0;
    static get amount() { return this.#amount; }
    static technologies = {};
    static get treeImage() { return "./resources/technologies/Tech Tree.png"; }
    static get totalPrice() {
        var total = { gold: 0, gems: 0 };
        for (const technologies in this.technologies)
            for (const technology of this.technologies[technologies])
                for (const currency in total)
                    total[currency] += technology.price[currency] ?? 0;
        return total;
    }
    static getTechnology(technology) {
        if (typeof technology !== "string")
            return [technology];
        return Technology.technologies[technology];
    }
    resourcesNeeded;
    unlocks;
    unlocksTechnologies;
    technologyNeeded;
    get totalPrice() {
        if (this.technologyNeeded === null)
            return new Price();
        return Price.add(this.price, this.technologyNeeded.totalPrice);
    }
    constructor(technologyOrOptions, passByReference = true) {
        super(technologyOrOptions);
        const firstUnlock = technologyOrOptions.unlocks[0];
        this.image = technologyOrOptions.image ?? this.image + `technologies/${this.name}` + (Object.hasOwn(firstUnlock, "build") ?
            firstUnlock.build instanceof TransportationDistance && firstUnlock.build.name === "Underground Belt Upgrade" ?
                ` ${firstUnlock.tier}` :
                ` Tier ${firstUnlock.tier}` :
            "") + ".png";
        if (passByReference) {
            this.technologyNeeded = typeof technologyOrOptions.technologyNeeded === "undefined" ? null : technologyOrOptions.technologyNeeded;
            this.resourcesNeeded = technologyOrOptions.resourcesNeeded;
            this.unlocks = technologyOrOptions.unlocks;
            this.unlocksTechnologies = technologyOrOptions.unlocksTechnologies ?? [];
        }
        else {
            this.technologyNeeded = typeof technologyOrOptions.technologyNeeded === "undefined" || technologyOrOptions.technologyNeeded === null ? null : new Technology(technologyOrOptions.technologyNeeded);
            this.resourcesNeeded = [];
            for (const resourceNeeded of technologyOrOptions.resourcesNeeded)
                this.resourcesNeeded.push({
                    amount: resourceNeeded.amount,
                    item: new Item(resourceNeeded.item)
                });
            this.unlocks = [];
            for (const unlock of technologyOrOptions.unlocks)
                this.unlocks.push(unlock instanceof Base ? new Base(unlock) : unlock instanceof ItemCollector ? new ItemCollector(unlock) : {
                    tier: unlock.tier,
                    build: unlock.build instanceof Factory ?
                        new Factory(unlock.build) :
                        unlock.build instanceof TransportationDistance ?
                            new TransportationDistance(unlock.build) :
                            unlock.build instanceof Storage ?
                                new Storage(unlock.build) :
                                unlock.build instanceof OutputTiers ?
                                    new OutputTiers(unlock.build) :
                                    unlock.build instanceof StorageTiers ?
                                        new StorageTiers(unlock.build) :
                                        unlock.build instanceof DistanceTiers ?
                                            new DistanceTiers(unlock.build) :
                                            new Tiers(unlock.build)
                });
            this.unlocksTechnologies = [];
            if (typeof technologyOrOptions.unlocksTechnologies !== "undefined")
                for (const unlocksTechnology of technologyOrOptions.unlocksTechnologies)
                    this.unlocksTechnologies.push(unlocksTechnology);
        }
        Technology.#amount++;
        if (typeof Technology.technologies[technologyOrOptions.name] === "undefined")
            Technology.technologies[technologyOrOptions.name] = [this];
        else
            Technology.technologies[technologyOrOptions.name].push(this);
    }
    needsFunction(technology) {
        if (this === technology)
            return true;
        if (typeof this.technologyNeeded === "undefined" || this.technologyNeeded === null)
            return false;
        return this.technologyNeeded.needsFunction(technology);
    }
    needs(technology) {
        const t = Technology.getTechnology(technology);
        if (typeof t === "undefined")
            return false;
        const tech = t[0];
        return this.needsFunction(tech);
    }
    equals(technology) {
        return super.equals(technology)
            && this.resourcesNeeded.length === technology.resourcesNeeded.length
            && this.resourcesNeeded.every(input => technology.resourcesNeeded.some(otherInput => input.amount === otherInput.amount && input.item.equals(otherInput.item)))
            && this.unlocks.every(unlock => technology.unlocks.some(otherUnlock => {
                if (typeof otherUnlock === "undefined")
                    return false;
                if (unlock instanceof Base) {
                    if (!(otherUnlock instanceof Base))
                        return false;
                    if (unlock instanceof ItemCollector)
                        return otherUnlock instanceof ItemCollector && unlock.equals(otherUnlock);
                    else
                        return !(otherUnlock instanceof ItemCollector) && unlock.equals(otherUnlock);
                }
                else {
                    if (otherUnlock instanceof Base)
                        return false;
                    if (unlock.tier !== otherUnlock.tier)
                        return false;
                    if (Object.getPrototypeOf(unlock.build).constructor.name === Object.getPrototypeOf(otherUnlock.build).constructor.name)
                        return unlock.build.equals(otherUnlock.build);
                    else
                        return false;
                }
            }))
            && this.unlocks.length === technology.unlocks.length
            && (typeof this.unlocksTechnologies === "undefined" ?
                typeof technology.unlocksTechnologies === "undefined" :
                typeof technology.unlocksTechnologies === "undefined" ?
                    false :
                    this.unlocksTechnologies.every(tech => technology.unlocksTechnologies.some(otherTech => tech.equals(otherTech))));
    }
    strictlyEquals(technology) {
        return super.strictlyEquals(technology)
            && this.resourcesNeeded.length === technology.resourcesNeeded.length
            && this.resourcesNeeded.every(input => technology.resourcesNeeded.some(otherInput => input.amount === otherInput.amount && input.item.strictlyEquals(otherInput.item)))
            && this.unlocks.every(unlock => technology.unlocks.some(otherUnlock => {
                if (typeof otherUnlock === "undefined")
                    return false;
                if (unlock instanceof Base) {
                    if (!(otherUnlock instanceof Base))
                        return false;
                    if (unlock instanceof ItemCollector)
                        return otherUnlock instanceof ItemCollector && unlock.strictlyEquals(otherUnlock);
                    else
                        return !(otherUnlock instanceof ItemCollector) && unlock.strictlyEquals(otherUnlock);
                }
                else {
                    if (otherUnlock instanceof Base)
                        return false;
                    if (unlock.tier !== otherUnlock.tier)
                        return false;
                    if (Object.getPrototypeOf(unlock.build).constructor.name === Object.getPrototypeOf(otherUnlock.build).constructor.name)
                        return unlock.build.equals(otherUnlock.build);
                    else
                        return false;
                }
            }))
            && this.unlocks.length === technology.unlocks.length
            && (typeof this.unlocksTechnologies === "undefined" ?
                typeof technology.unlocksTechnologies === "undefined" :
                typeof technology.unlocksTechnologies === "undefined" ?
                    false :
                    this.unlocksTechnologies.every(tech => technology.unlocksTechnologies.some(otherTech => tech.strictlyEquals(otherTech))));
    }
}
export { Technology };
