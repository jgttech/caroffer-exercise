import { useLayoutEffect } from "react";

export const useWindowResize = (callbackEffect=() => {}) => {
    useLayoutEffect(() => {
        // Subscribe the callback event function.
        window.addEventListener("resize", callbackEffect);

        // Unsunscribe the callback event function.
        return () => window.removeEventListener("resize", callbackEffect);
    }, []);
}