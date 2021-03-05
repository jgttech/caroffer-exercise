import { useAxiosCars } from "../hooks/useAxiosCars";
import { response } from "../utils/response";
const axios = useAxiosCars();

export const postCarsBySearch = async criteria => {
    try {
        const { data={}, status=200 } = await axios.post("/search", criteria);

        return {...response, status, data };
    } catch(error) {
        return {...response, error };
    }
}