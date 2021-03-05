import { response } from "./response";

export const _500 = error => {
    return {...response,
        statusCode: 500,
        body: JSON.stringify({
            error
        })
    };
}