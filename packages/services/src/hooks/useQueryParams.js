import { type } from "ramda";
import base64url from "base64url";
import { parseTypeValue } from "../utils/parseTypeValue";

export const useQueryParams = ({ multiValueQueryStringParameters: params }, queryParams) => {
    if (!queryParams || type(queryParams) !== "Array") return {};
    else {
        const resultParams = {};

        for (const param of queryParams) {
            const value = parseTypeValue(params?.[param]?.[0]);

            resultParams[param] = param === "search"
                ? base64url.decode(value)
                : value;
        }

        return resultParams;
    }
}