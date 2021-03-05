import { useRequestBody, withMongoClient, _200 } from "@wmi/services";
import { length as len, keys } from "ramda";

export const handler = withMongoClient(async (event, client) => {
    let cars = [];
    const wmi = client.db("sandbox").collection("wmi");
    const { search, country, createdOn, vehicleType, ...data } = useRequestBody(event);
    let { countrySort, createdOnSort, vehicleTypeSort } = data;

    // Convert sort flags into MongoDB acceptable format
    countrySort = countrySort == null ? 0 : !!countrySort ? 1 : -1;
    vehicleTypeSort = vehicleTypeSort == null ? 0 : !!vehicleTypeSort ? 1 : -1;
    createdOnSort = createdOnSort == null ? 0 : !!createdOnSort ? 1 : -1;

    // I know this is not the best approach. Ideally, this would
    // use indexes from MongoDB in an indexed and paginated collection.
    // But for the purposes of this getting done and sent back, I
    // this works to get the idea across as a Lambda function.
    if (!search && !country && !createdOn && !vehicleType) {
        // Get all the "cars".
        const results = await wmi.find({});

        // Add each "car" to "cars".
        await results.forEach(car => cars.push(car));
    } else if (search) {
        const sortCriteria = {};

        if (country)
            sortCriteria.Country = countrySort;

        if (createdOn)
            sortCriteria.CreatedOn = createdOnSort;

        if (vehicleType)
            sortCriteria.VehicleType = vehicleTypeSort;

        // Get search results.
        let results = await wmi.find({
            $text: {
                $search: search,
                $caseSensitive: false,
            }
        });

        if (!!len(keys(sortCriteria)))
            results = await results.sort(sortCriteria);

        // Add each "car" to "cars".
        await results.forEach(car => cars.push(car));

        console.log(JSON.stringify(cars, null, 4));
    }

    return _200({ cars });
})