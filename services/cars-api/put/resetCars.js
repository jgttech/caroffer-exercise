import carsData from "../json/honda_wmi.json";
import { withMongoClient, _200, _500 } from "@wmi/services";

export const handler = withMongoClient(async (event, client) => {
    const cars = [];
    const wmi = client.db("sandbox").collection("wmi");

    // Clear all the collections data.
    await wmi.remove({});

    // Reset ALL the data based on the JSON file.
    const { result: { ok }} = await wmi.insertMany(carsData);

    // Create indexes on the newly inserted data for searching on.
    await wmi.createIndex({
        Name: "text",
        VehicleType: "text",
        WMI: "text",
        Country: "text"
    });

    // Get all the newly reset documents. This makes it easier instead
    // of having to make another API call, we can just get all that data
    // and send it back to the user.
    const documents = await wmi.find({});
    await documents.forEach((car, key) => cars.push({...car, key }));

    return !ok ? _500("Operation failed.") : _200({ cars });
});