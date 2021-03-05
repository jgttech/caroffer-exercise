import styled from "styled-components";
import { length as len } from "ramda";
import { Input, Checkbox, Button } from "antd";
import { CloseCircleOutlined, LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { FlexRow, Section, withTheme, Fade } from "@wmi/framework";
import { SortPopover } from "../SortPopover/SortPopover";
import { ArrowDown } from "../ArrowDown/ArrowDown";
import { ArrowUp } from "../ArrowUp/ArrowUp";
import { useSearchData, useSearchReducer } from "searchReducer";
import { useCarsData, useCarsReducer } from "carsReducer";
const { Search: AntdSearch } = Input;

const resetButtonStyle = {
    marginLeft: "13px",
    height: "40px"
}

const Counter = styled.span`
    font-weight: bold;
`;

const OptionHeader = styled.span`
    padding: 0 8px 0 0;
`;

const Option = styled.span`
    padding: ${({ first=false, last=false }) =>
        !!first
            ? "0 16px 0 0"
            : !!last
                ? "0 0 0 16px"
                : "0 16px"
    };
`;

export const Search = withTheme((props, { maxWidth, minWidth }) => {
    const { setCriteria } = useSearchReducer();
    const { setCarsSearch } = useCarsReducer();
    const { isLoadingCars, cars } = useCarsData();

    const data = useSearchData();
    const { search, country, vehicleType, createdOn } = data;
    const { countrySort, vehicleTypeSort, createdOnSort } = data;

    const handleChecked = prop => ({ target: { checked }}) => {
        setCriteria({ [prop]: checked });
    }

    const handleSort = prop => ({ target: { value }}) => {
        setCriteria({ [prop]: value === "1" ? true : value === "-1" ? false : true });
    }

    const onChange = ({ target: { value }}) => {
        setCriteria({ search: value });
    }

    const onSearch = () => {
        setCarsSearch({
            search,
            country,
            vehicleType,
            createdOn,
            countrySort,
            vehicleTypeSort,
            createdOnSort
        });
    }

    const onClearClick = () => {
        setCriteria({
            search: "",
            country: false,
            vehicleType: false,
            createdOn: false,
            countrySort: true,
            vehicleTypeSort: true,
            createdOnSort: true
        });
    }

    return (
        <>
            <FlexRow
                as="div"
                justifyContent="center"
                alignItems="flex-end"
                height="60px"
            >
                <Section
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                    width="100%"
                >
                    <FlexRow as="div">
                        <AntdSearch
                            allowClear
                            enterButton
                            size="large"
                            placeholder="Search vehicle information..."
                            onChange={onChange}
                            onSearch={onSearch}
                            value={search}
                            loading={isLoadingCars}
                        />
                        <Button
                            icon={<CloseCircleOutlined />}
                            style={resetButtonStyle}
                            onClick={onClearClick}
                        >
                            {"Clear"}
                        </Button>
                    </FlexRow>
                </Section>
            </FlexRow>
            <FlexRow
                as="div"
                justifyContent="center"
                alignItems="center"
                height="48px"
            >
                <Section
                    maxWidth={maxWidth}
                    minWidth={minWidth}
                    width="100%"
                >
                    <FlexRow as="div" justifyContent="space-between">
                        <div>
                            <OptionHeader>
                                <i>
                                    {"Sort by:"}
                                </i>
                            </OptionHeader>
                            <Option>
                                <Checkbox
                                    checked={country}
                                    onChange={handleChecked("country")}
                                >
                                    {"Country"}
                                </Checkbox>
                                <SortPopover
                                    value={!!countrySort ? "1" : "-1"}
                                    onClick={handleSort("countrySort")}
                                >
                                    {!!countrySort
                                        ? <ArrowUp />
                                        : <ArrowDown />
                                    }
                                    <MoreOutlined />
                                </SortPopover>
                            </Option>
                            <Option>
                                <Checkbox
                                    checked={vehicleType}
                                    onChange={handleChecked("vehicleType")}
                                >
                                    {"Vehicle Type"}
                                </Checkbox>
                                <SortPopover
                                    value={!!vehicleTypeSort ? "1" : "-1"}
                                    onClick={handleSort("vehicleTypeSort")}
                                >
                                    {!!vehicleTypeSort
                                        ? <ArrowUp />
                                        : <ArrowDown />
                                    }
                                    <MoreOutlined />
                                </SortPopover>
                            </Option>
                            <Option last>
                                <Checkbox
                                    checked={createdOn}
                                    onChange={handleChecked("createdOn")}
                                >
                                    {"Date Created"}
                                </Checkbox>
                                <SortPopover
                                    value={!!createdOnSort ? "1" : "-1"}
                                    onClick={handleSort("createdOnSort")}
                                >
                                    {!!createdOnSort
                                        ? <ArrowUp />
                                        : <ArrowDown />
                                    }
                                    <MoreOutlined />
                                </SortPopover>
                            </Option>
                        </div>
                        <div>
                            <Counter>
                                {"Found: "}
                                <Fade show={!isLoadingCars} display="inline-block">
                                    {isLoadingCars
                                        ? <LoadingOutlined />
                                        : !!cars && !!len(cars)
                                            ? len(cars)
                                            : "0"
                                    }
                                </Fade>
                            </Counter>
                        </div>
                    </FlexRow>
                </Section>
            </FlexRow>
        </>
    );
});