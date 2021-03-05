export const parseTypeValue = value =>
    value === "true" || value === "false"
        ? value === "true"
        : !!value && !isNaN(value)
            ? parseInt(value)
            : value