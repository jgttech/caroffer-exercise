import { useEffect } from "react";
import { AsyncSearch } from "../Search/AsyncSearch";
import { AsyncTable } from "../Table/AsyncTable";
import { AsyncFooter } from "../Footer/AsyncFooter";
import { useHistory } from "react-router-dom";
import { useCarsData, useCarsReducer } from "carsReducer";
import { useSearchData, useSearchReducer } from "searchReducer";
import {
    Fade,
    GenericLoader,
    createSearchParams,
    useSearchParams,
    useUrlWriter
} from "@wmi/framework";

export const App = () => {
    const history = useHistory();
    const searchObj = useSearchParams();
    const { setCarsSearch } = useCarsReducer();
    const { setCriteria } = useSearchReducer();
    const { isLoadingReset, isLoadingCars } = useCarsData();
    const data = useSearchData();
    const { search, country, vehicleType, createdOn } = data;
    const { countrySort, vehicleTypeSort, createdOnSort } = data;

    // Auto-update the URL string when these values change.
    useUrlWriter({
        search,
        country,
        vehicleType,
        createdOn,
        countrySort,
        vehicleTypeSort,
        createdOnSort
    });

    // Configure the URL to contain and retain the users search crteria
    // This is great for users who like to bookmark their searches.
    useEffect(() => {
        setCriteria(searchObj);

        const queryParams = {
            country: searchObj?.country ?? country,
            vehicleType: searchObj?.vehicleType ?? vehicleType,
            createdOn: searchObj?.createdOn ?? createdOn,
            search: searchObj?.search ?? search,
            countrySort: searchObj?.countrySort ?? countrySort,
            vehicleTypeSort: searchObj?.vehicleTypeSort ?? vehicleTypeSort,
            createdOnSort: searchObj?.createdOnSort ?? createdOnSort
        }

        history.replace(createSearchParams(queryParams));

        setCarsSearch(queryParams);
    }, []);

    return (
        <>
            <Fade show={true} direction="up" height="calc(100% - 50px)">
                <AsyncSearch />
                <AsyncTable />
                <AsyncFooter />
            </Fade>
            <GenericLoader show={isLoadingReset && !isLoadingCars}>
                {"Reseting application data, please wait..."}
            </GenericLoader>
            <GenericLoader show={!isLoadingReset && isLoadingCars}>
                {"Loading data, please wait..."}
            </GenericLoader>
        </>
    );
}