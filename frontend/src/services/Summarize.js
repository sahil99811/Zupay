import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getSummary = async (content, token) => {
    try {
        console.log(token);
        const result = await axios.get(`${backendURL}/summarize`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: { content }  // Pass content as a query parameter
        });
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};
