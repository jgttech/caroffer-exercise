import { keys, type } from "ramda";
import base64url from "base64url";

export const createSearchParams = (searchObj={}) => {
    if (!searchObj || type(searchObj) !== "Object") return null;
    else {
        let searchString = new Set();

        for (const key of keys(searchObj)) {
            const value = searchObj[key];

            searchString.add(`${key}=${type(value) === "String"
                ? base64url(value)
                : value
            }`);
        }

        return "?" + Array.from(searchString).join("&");
    }
}