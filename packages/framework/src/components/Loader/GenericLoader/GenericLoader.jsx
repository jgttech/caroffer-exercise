import { useState, useEffect } from "react";
import { type, length as len } from "ramda";
import styled, { css, keyframes } from "styled-components";
import { GreenLoadingSvg as Svg } from "../../Svg/GreenLoadingSvg/GreenLoadingSvg";

const loaderFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
    }
`;

const loaderFadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateX(-50%) translateY(-50%);
    }
    to {
        opacity: 0;
        transform: translateX(-50%) translateY(0%);
    }
`;

const maskFadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 0.6; }
`;

const maskFadeOut = keyframes`
    from { opacity: 0.6; }
    to { opacity: 0; }
`;

const Container = styled.div`
    width: 150px;
    position: fixed;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    left: 50%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    ${({ show }) => css`
        animation: ${show ? loaderFadeIn : loaderFadeOut} 0.25s linear forwards
    `}
`;

const Card = styled.div`
    background-color: white;
    padding: 10px 20px;
    border-radius: 14px;
    box-shadow: 0px 0px 15px rgba(170, 170, 170, 0.5);
    position: absolute;
    width: max-content;
`;

const Mask = styled.div`
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 0.35rem;
    ${({ show }) => css`
        animation: ${show ? maskFadeIn : maskFadeOut} 0.20s linear forwards
    `}
`;

export const GenericLoader = ({ children, show, mask=false }) => {
    const [ render, setRender ] = useState(!!show);
    const onAnimationEnd = () => {
        if (!show) setRender(false);
    }

    useEffect(() => {
        if (show) setRender(true);
    }, [ show ]);

    return render && (
        <>
            {mask && <Mask show={show} onAnimationEnd={onAnimationEnd} />}
            <Container show={show} onAnimationEnd={onAnimationEnd}>
                <Svg />
                {!!children && type(children) === "String" && len(children) > 0 && (
                    <Card>
                        {children}
                    </Card>
                )}
            </Container>
        </>
    );
}