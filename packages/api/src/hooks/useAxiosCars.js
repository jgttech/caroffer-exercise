import axios from "axios";

const baseURL = location.hostname === "localhost"
    ? process.env.API_HOST_LOCAL
    : process.env.API_HOST;

export const useAxiosCars = () => axios.create({
    validateStatus: status => status < 500,
    baseURL: `${baseURL}/cars`,
});