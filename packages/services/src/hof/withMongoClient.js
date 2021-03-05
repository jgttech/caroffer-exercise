import { MongoClient } from "mongodb";
import { _200 } from "../utils/_200";
import { _500 } from "../utils/_500";

export const withMongoClient = eventCallback => async event => {
    const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
    let response = _500("Unknown error");

    try {
        await client.connect();

        if (eventCallback)
            response = await eventCallback(event, client);
    } catch(exception) {
        console.error(exception);
        response = _500("Unexpected error");
    } finally {
        if (client)
            client.close();
    }

    return response;
}