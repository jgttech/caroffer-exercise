import { putResetCars } from "@wmi/api";
import { createKeyProp } from "@wmi/framework";

export const resolve = async () => {
    let { status, error, data } = await putResetCars();
    let cars = [];

    if (error && status !== 200)
        error = error?.response?.data?.error ?? null;
    else if (status === 200 && !error && !!data)
        cars = data?.cars ?? [];

    return {
        cars: createKeyProp(cars),
        error,
    };
}

export const pending = () => ({
    isLoadingReset: true,
});

export const success = ({ error, cars }) => ({
    isLoadingReset: false,
    resetError: error ?? null,
    cars
});

export const failure = resetError => ({
    isLoadingReset: false,
    resetError
});