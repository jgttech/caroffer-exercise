import styled, { keyframes } from "styled-components";

export const Rotation = styled.div`
    display: inline-block;
    animation: ${keyframes`
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    `} 1s linear 0s infinite;
`;