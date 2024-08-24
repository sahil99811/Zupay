import axios from "axios";
import { setToken } from '../slices/authSlice';
import { toast } from 'react-hot-toast';
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getSummary = async (content, token,dispatch) => {
    try {
        const result = await axios.get(`${backendURL}/summarize`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401;
            },
            params: { content } 
        });
        if (result.status === 201) {
            toast.success(result?.data?.message); // Show success toast
            return result; // Return the result if status is 201
        }
        toast.error(result?.data?.message); // Show error toast
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
