import { ThemeConsumer } from "styled-components";

const ThemeComponent = ({ component, props, theme }) => {
    const Component = component(props, theme);

    return (
        <>
            {Component}
        </>
    );
}

export const withTheme = Component => props => {
    return (
        <ThemeConsumer>
            {theme => (
                <ThemeComponent
                    component={Component}
                    props={props}
                    theme={theme}
                />
            )}
        </ThemeConsumer>
    );
}