import { type } from "ramda";

export const withSwitch = (value, ops) => {
    let result = null;
    const applyTarget = (target) => {
        const T = type(target);

        return T === "Function" || T === "AsyncFunction"
            ? target(value)
            : target;
    }

    for (const prop in ops)
        if (value === prop) {
            result = applyTarget(ops[prop]);
            break;
        }

    if (!result && !!ops?.default)
        result = applyTarget(ops.default);

    return result;
}