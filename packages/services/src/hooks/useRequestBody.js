export const useRequestBody = ({ body }) => {
    if (!body) return {};
    else {
        return JSON.parse(body);
    }
}