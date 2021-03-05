import { useAxiosCars } from "../hooks/useAxiosCars";
import { response } from "../utils/response";
const axios = useAxiosCars();

export const putResetCars = async () => {
    try {
        const { data, status } = await axios.put(`/reset`);
        return {...response, status, data };
    } catch(error) {
        return {...response, error };
    }
}