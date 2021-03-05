import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #app {
        height: 100%;
    }
`;

export const FrameworkProvider = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            {children}
        </>
    );
}
