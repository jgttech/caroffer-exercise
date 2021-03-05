import { response } from "./response";

export const _200 = body => {
    return {...response,
        statusCode: 200,
        body: JSON.stringify(body)
    };
}