/**
 * All SVG credit goes to author.
 *
 * SVG Authot: Pixel Buddha
 * URL: https://www.flaticon.com/authors/pixel-buddha
 */

import { Svg } from "../Svg";

export const GreenLoadingSvg = () => {
    return (
        <Svg
            id="Layer_1"
            xmlSpace="preserve"
            x="0px"
            y="0px"
            viewBox="0 0 286.052 286.052"
            className="default-loader"
            style={{
                enableBackground: "new 0 0 286.052 286.052"
            }}
        >
            <defs>
                <style>{`
                    .default-loader {
                        animation-name: loader;
                        animation-duration: 1.5s;
                        animation-delay: 0s;
                        animation-iteration-count: infinite;
                        animation-timing-function: linear;
                    }

                    @keyframes loader {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(-360deg);
                        }
                    }
                `}</style>
            </defs>
            <g>
                <path
                    style={{
                        fill: "#3DB39E"
                    }}
                    d={
                        "M78.493,143.181H62.832v-0.125c0-43.623,34.809-80.328,79.201-80.122" +
                        "c21.642,0.098,41.523,8.841,55.691,23.135l25.843-24.931c-20.864-21.0" +
                        "43-49.693-34.049-81.534-34.049c-63.629,0-115.208,51.955-115.298,116" +
                        ".075h-15.84c-9.708,0-13.677,6.49-8.823,14.437l33.799,33.504c6.704,6" +
                        ".704,10.736,6.91,17.646,0l33.799-33.504C92.17,149.662,88.192,143.18" +
                        "1,78.493,143.181z M283.978,129.236l-33.799-33.433c-6.892-6.892-11.1" +
                        "56-6.481-17.637,0l-33.799,33.433c-4.854,7.929-0.894,14.419,8.814,14" +
                        ".419h15.635c-0.25,43.337-34.943,79.72-79.183,79.514c-21.633-0.089-4" +
                        "1.505-8.814-55.691-23.099l-25.843,24.896c20.873,21.007,49.702,33.99" +
                        "6,81.534,33.996c63.432,0,114.869-51.579,115.28-115.298h15.867C284.8" +
                        "72,143.655,288.832,137.156,283.978,129.236z"
                    }
                />
            </g>
        </Svg>
    );
}