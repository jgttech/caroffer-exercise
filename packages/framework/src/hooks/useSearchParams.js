import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSearchParams } from "../utils/getSearchParams";

export const useSearchParams = () => {
    const { search } = useLocation();
    const [ searchObject, setSearchObject ] = useState(getSearchParams(search));

    // When the search criteria changes, update the object
    // stored in this hook to be used by whatever component needs it.
    useEffect(() => {
        setSearchObject(getSearchParams(search));
    }, [ search ]);

    return searchObject;
}