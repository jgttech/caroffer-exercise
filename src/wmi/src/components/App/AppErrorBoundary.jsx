import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = () => (
    <div>
        {"Oops! An error has occurred! Please contact the helpdesk."}
    </div>
);

export const AppErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            {children}
        </ErrorBoundary>
    );
}