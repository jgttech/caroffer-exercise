import { length as len, type } from "ramda";
import base64url from "base64url";

export const getSearchParams = searchStr => searchStr
    .substr(1, len(searchStr) - 1)
    .split("&")
    .map(criteria => {
        const [ key, value ] = criteria.split("=");

        return {
            [key]: (
                value === "false" || value === "true"
                    ? value === "true"
                    : !!value && !isNaN(value)
                        ? parseInt(value)
                        : type(value) === "String"
                            ? base64url.decode(value)
                            : value
            )
        };
    })
    .reduce((a, b) => {
        return {...a, ...b };
    }, {});