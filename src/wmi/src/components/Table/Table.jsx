import { FlexRow, Section, Fade, withTheme, useWindowResize } from "@wmi/framework";
import { useState } from "react";
import { Table as AntdTable } from "antd";
import { useCarsData } from "carsReducer";

const render = data => {
    return (
        <Fade as="span" show={true}>
            {data}
        </Fade>
    );
}

const columns = [{
    title: "ID",
    dataIndex: "Id",
    key: "id",
    width: 100,
    fixed: "left",
    render
}, {
    title: "WMI",
    dataIndex: "WMI",
    key: "wmi",
    width: 100,
    fixed: "left",
    render
}, {
    title: "Name",
    dataIndex: "Name",
    key: "name",
    render
}, {
    title: "Vehicle Type",
    dataIndex: "VehicleType",
    key: "vehicleType",
    render
}, {
    title: "Country",
    dataIndex: "Country",
    key: "country",
    render
}, {
    title: "Date Available",
    dataIndex: "DateAvailableToPublic",
    key: "dateAvailableToPublic",
    render
}, {
    title: "Date Created",
    dataIndex: "CreatedOn",
    key: "createdOn",
    render
}, {
    title: "Last Updated",
    dataIndex: "UpdatedOn",
    key: "updatedOn",
    render
}];

export const Table = withTheme((props, { maxWidth, minWidth }) => {
    const { cars, isLoadingCars } = useCarsData();
    const [ tableY, setTableY ] = useState(innerHeight - 287);

    // Operate on the window resize.
    useWindowResize(() => setTableY(innerHeight - 287));

    return (
        <>
            <FlexRow
                as="div"
                justifyContent="center"
                alignItems="flex-start"
                height="calc(100% - 118px)"
                overflow="auto"
            >
                <Section
                    width="100%"
                    height="100%"
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                >
                    <Fade show={true}>
                        <AntdTable
                            columns={columns}
                            dataSource={cars ?? []}
                            loading={isLoadingCars}
                            scroll={{ y: tableY }}
                        />
                    </Fade>
                </Section>
            </FlexRow>
        </>
    );
});