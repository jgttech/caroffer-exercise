import axios from "axios";
const baseURL = process.env.API_HOST;

export const useAxiosCars = () => axios.create({
    validateStatus: status => status < 500,
    baseURL: `${baseURL}/cars`,
});