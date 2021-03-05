import styled from "styled-components";
import { background } from "styled-system";
import { Flex } from "../Flex/Flex";

export const FlexRow = styled(Flex)`
    ${background}
    flex-flow: row ${({ wrap=false }) => !!wrap ? "wrap" : "nowrap"};
`;