export function capitalizeFirstLetters(string) {
    var i = string.split(" ");
    for (let index = i.length - 1; index >= 0; index--) {
        if (i[index] === "") {
            i.splice(index);
            continue;
        }
        i[index] = i[index][0].toUpperCase() + i[index].substring(1).toLowerCase();
    }
    return i.join(" ");
}
function toString(any, tabs, limit) {
    if (typeof any === "object") {
        if (tabs.length === limit)
            return "[object " + any.constructor.name + "]";
        else if (Array.isArray(any))
            return arrayToString(any, limit, tabs + "\t");
        else
            return objToString(any, limit, tabs + "\t");
    }
    else if (typeof any === "string")
        return `"${any}"`;
    else if (typeof any === "bigint")
        return any + "n";
    return any;
}
export function arrayToString(arr, limit = 1, tabs = "\t") {
    var string = "[\n";
    for (const value of arr) {
        string += tabs;
        string += toString(value, tabs, limit);
        string += ",\n";
    }
    string = string.slice(0, string.length - 2) + "\n";
    string += (tabs.length > 1 ? tabs.slice(0, tabs.length - 1) : "") + "]";
    if (arr.length === 0)
        return "[]";
    return string;
}
export function objToString(obj, limit = 1, tabs = "\t") {
    var string = (obj.constructor.name === "Object" ? "" : obj.constructor.name + " ") + "{\n";
    for (const key in obj) {
        string += tabs + key + ": ";
        string += toString(obj[key], tabs, limit);
        string += ",\n";
    }
    string = string.slice(0, string.length - 2) + "\n";
    string += tabs.slice(0, tabs.length - 1) + "}";
    return string;
}
