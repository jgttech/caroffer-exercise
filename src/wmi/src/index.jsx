import "@babel/register";
import "./prototypes";
import 'antd/dist/antd.css';
import theme from "./theme";
import { store } from "./store";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AsyncApp } from "./components/App/AsyncApp";
import { AppErrorBoundary } from "./components/App/AppErrorBoundary";
import { FrameworkProvider } from "@wmi/framework";
import { ThemeProvider } from "styled-components";

render(
    <ThemeProvider theme={theme}>
        <AppErrorBoundary>
            <FrameworkProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <AsyncApp />
                    </BrowserRouter>
                </Provider>
            </FrameworkProvider>
        </AppErrorBoundary>
    </ThemeProvider>,
    document.querySelector("#app")
);
