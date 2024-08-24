import axios from "axios";
import toast from "react-hot-toast";
import { setToken } from "../slices/authSlice";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const createComment=async (postid,comment,token,dispatch)=>{
    try{
        const result=await axios.post(`${backendURL}/comment/${postid}`,{text:comment},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401 
            }
        })
        if (result.status === 201) {
            toast.success(result?.data?.message); 
            return result; 
        } 
        dispatch(setToken(null));
        localStorage.removeItem("token");
        toast.error(result?.data?.message); 
        return false;
    }catch(error){

        console.log(error);
        return false;
    }
}