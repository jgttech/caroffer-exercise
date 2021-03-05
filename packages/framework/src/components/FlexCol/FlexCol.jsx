import styled from "styled-components";
import { Flex } from "../Flex/Flex";

export const FlexCol = styled(Flex)`
    flex-flow: column ${({ wrap=false }) => !!wrap ? "wrap" : "nowrap"};
`;