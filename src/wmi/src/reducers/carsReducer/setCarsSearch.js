import { postCarsBySearch } from "@wmi/api";
import { createKeyProp } from "@wmi/framework";

export const resolve = async criteria => {
    const { status, error, data } = await postCarsBySearch(criteria);
    let cars = [];

    if (status === 200 && !error && !!data)
        cars = data?.cars ?? [];

    return {
        cars: createKeyProp(cars),
        status,
        error,
    };
}

export const pending = () => ({
    isLoadingCars: true,
});

export const success = ({ error: carsError, cars }) => ({
    isLoadingCars: false,
    carsError,
    cars
});

export const failure = carsError => ({
    isLoadingCars: false,
    carsError
});