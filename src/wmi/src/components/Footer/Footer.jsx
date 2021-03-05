import { FlexRow, Section, withTheme } from "@wmi/framework";
import { AppResetButton } from "../AppResetButton/AppResetButton";

export const Footer = withTheme((props, { maxWidth, minWidth }) => {
    return (
        <FlexRow
            as="div"
            justifyContent="center"
            alignItems="center"
            height="60px"
            background="#fafafa"
        >
            <Section
                maxWidth={maxWidth}
                minWidth={minWidth}
                width="100%"
            >
                <AppResetButton>
                    {"Reset All Application Data"}
                </AppResetButton>
            </Section>
        </FlexRow>
    );
});