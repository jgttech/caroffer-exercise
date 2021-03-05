import { createReduxReducer } from "@wmi/framework";

const init = {
    search: "",
    country: false,
    vehicleType: false,
    createdOn: false,
    countrySort: true,
    vehicleTypeSort: true,
    createdOnSort: true
}

export const [
    reducer,
    useSearchReducer,
    useSearchData
] = createReduxReducer("search", init, {
    setSearch: search => ({ search }),
    setCountry: country => ({ country }),
    setVehicleType: vehicleType => ({ vehicleType }),
    setCreatedOn: createdOn => ({ createdOn }),
    setCountrySort: countrySort => ({ countrySort }),
    setVehicleTypeSort: vehicleTypeSort => ({ vehicleTypeSort }),
    setCreatedOnSort: createdOnSort => ({ createdOnSort }),
    setCriteria: data => state => ({...state,
        search: data?.search ?? state?.search,
        country: data?.country ?? state?.country,
        vehicleType: data?.vehicleType ?? state?.vehicleType,
        createdOn: data?.createdOn ?? state?.createdOn,
        countrySort: data?.countrySort ?? state?.countrySort,
        vehicleTypeSort: data?.vehicleTypeSort ?? state?.vehicleTypeSort,
        createdOnSort: data?.createdOnSort ?? state?.createdOnSort
    })
});