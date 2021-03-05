import { Popover, Radio } from "antd";

const SortContent = ({ onClick, value }) => {
    return (
        <Radio.Group defaultValue="1" value={value} buttonStyle="solid">
            <Radio.Button value="1" onClick={onClick}>
                {"Ascending"}
            </Radio.Button>
            <Radio.Button value="-1" onClick={onClick}>
                {"Descending"}
            </Radio.Button>
        </Radio.Group>
    );
}

export const SortPopover = ({ children, onClick, value }) => {
    return (
        <Popover
            title="Sort Order"
            content={(
                <SortContent
                    onClick={onClick}
                    value={value}
                />
            )}
        >
            {children}
        </Popover>
    );
}