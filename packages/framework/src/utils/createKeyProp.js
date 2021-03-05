import { type } from "ramda";

export const createKeyProp = (array=[]) => {
    return !array || type(array) !== "Array" ? [] : array.map((el, key) => {
        return type(el) === "Object" ? {...el, key } : el;
    });
}