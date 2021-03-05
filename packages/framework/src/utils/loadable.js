import React from "react";
import Loadable from "react-loadable";
import { GenericLoader } from "../components/Loader/GenericLoader/GenericLoader";

export const loadable = (namedExport, dynamicImport, Loader=null) => {
    const AsyncComponent = Loadable({
        loader: dynamicImport,
        loading: !!Loader ? Loader : () => <GenericLoader show={true} />,
        render: ({ [namedExport]: Component }, props) => {
            return (
                <Component {...props} />
            );
        }
    });

    return (props) => <AsyncComponent {...props} />;
}