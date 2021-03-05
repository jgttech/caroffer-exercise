import { useLayoutEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { length as len, keys, type } from "ramda";
import { createSearchParams } from "../utils/createSearchParams";
import { getSearchParams } from "../utils/getSearchParams";
import { urlSearchMatch } from "../utils/urlSearchMatch";

export const useUrlWriter = urlParams => {
    const history = useHistory();
    const { search } = useLocation();
    const currentParams = getSearchParams(search);

    // Only allow rendering past this point when
    // the URL has been updated.
    useLayoutEffect(() => {
        if (!!urlParams && type(urlParams) === "Object" && !!len(keys(urlParams)))
            if (!urlSearchMatch(currentParams, urlParams))
                history.replace(createSearchParams(urlParams));
    }, [ urlParams ]);
}