import { createReduxReducer } from "@wmi/framework";
import * as setCarsReset from "./setCarsReset";
import * as setCarsSearch from "./setCarsSearch";

const init = {
    isLoadingReset: false,
    resetError: null,

    cars: [],
    isLoadingCars: false,
    carsError: null
}

export const [
    reducer,
    useCarsReducer,
    useCarsData
] = createReduxReducer("cars", init, {
    setCarsReset,
    setCarsSearch
});