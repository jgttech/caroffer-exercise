import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { layout, position, grid, flexbox } from "styled-system";

const fadeIn = {
    default: keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
    `,
    down: keyframes`
        from {
            transform: translateY(-5%);
            opacity: 0;
        }
        to {
            transform: translateY(0%);
            opacity: 1;
        }
    `,
    up: keyframes`
        from {
            transform: translateY(5%);
            opacity: 0;
        }
        to {
            transform: translateY(0%);
            opacity: 1;
        }
    `,
    left: keyframes`
        from {
            transform: translateX(-5%);
            opacity: 0;
        }
        to {
            transform: translateX(0%);
            opacity: 1;
        }
    `,
    right: keyframes`
        from {
            transform: translateX(5%);
            opacity: 0;
        }
        to {
            transform: translateX(0%);
            opacity: 1;
        }
    `
}

const fadeOut = {
    default: keyframes`
        from { opacity: 1; }
        to { opacity: 0; }
    `,
    down: keyframes`
        from {
            transform: translateY(0%);
            opacity: 1;
        }
        to {
            transform: translateY(-5%);
            opacity: 0;
        }
    `,
    up: keyframes`
        from {
            transform: translateY(0%);
            opacity: 1;
        }
        to {
            transform: translateY(5%);
            opacity: 0;
        }
    `,
    left: keyframes`
        from {
            transform: translateX(0%);
            opacity: 1;
        }
        to {
            transform: translateX(-5%);
            opacity: 0;
        }
    `,
    right: keyframes`
        from {
            transform: translateX(0%);
            opacity: 1;
        }
        to {
            transform: translateX(5%);
            opacity: 0;
        }
    `
}

const FadeAnimation = styled.div`
    ${layout}
    ${position}
    ${grid}
    ${flexbox}

    ${({ show, direction="down" }) => show && css`
        animation: ${show
            ? fadeIn[direction ?? "default"] ?? fadeIn.default
            : fadeOut[direction ?? "default"] ?? fadeOut.default
        } 0.40s linear forwards
    `}
`;

export const Fade = ({ children, show, ...props }) => {
    const [ render, setRender ] = useState(!!show);
    const onAnimationEnd = () => {
        if (!show)
            setRender(false);
    }

    useEffect(() => {
        if (show && !render)
            setRender(true);
    }, [ show ]);

    return render && (
        <FadeAnimation {...props} show={show} onAnimationEnd={onAnimationEnd}>
            {children}
        </FadeAnimation>
    );
}