import { keys } from "ramda";

// Generates objects with keys in the same positions so they
// can be compared and the comparison returned.
export const urlSearchMatch = (urlParamsA, urlParamsB) => {
    const keysA = keys(urlParamsA).sort();
    const keysB = keys(urlParamsB).sort();
    const objA = {};
    const objB = {};

    for (const key of keysA)
        objA[key] = urlParamsA[key];

    for (const key of keysB)
        objB[key] = urlParamsB[key];

    return JSON.stringify(objA) === JSON.stringify(objB);
}