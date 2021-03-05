import { Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useCarsData, useCarsReducer } from "reducers/carsReducer/reducer";

export const AppResetButton = ({ children }) => {
    const { resetError, isLoadingReset } = useCarsData();
    const { setCarsReset } = useCarsReducer();

    const handleClick = () => {
        if (!resetError)
            setCarsReset();
    }

    return (
        <>
            <Button
                danger
                type="secondary"
                disabled={!!resetError}
                onClick={handleClick}
                loading={isLoadingReset}
                style={{ height: "40px" }}
                icon={<WarningOutlined />}
            >
                {children}
            </Button>
        </>
    );
}