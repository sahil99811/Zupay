import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
import { setToken } from '../slices/authSlice';
import { toast } from 'react-hot-toast';
export const createPost=async (formdata,token,dispatch)=>{
    try{

        const result=await axios.post(`${backendURL}/posts`,formdata,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401; 
            }
        })
        if (result.status === 201) {
            toast.success(result?.data?.message);
            return true;
        }
        toast.error(result?.data?.message); 
        dispatch(setToken(null)); 
        localStorage.removeItem("token"); 
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getUserPosts=async (token,dispatch)=>{
    try{
        const result=await axios.get(`${backendURL}/user/posts`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401;
            }
        })
        if (result.status === 201) {
            toast.success(result?.data?.message);
            return result.data;
        }
        toast.error(result?.data?.message); 
        dispatch(setToken(null)); 
        localStorage.removeItem("token"); 
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getPosts=async (token,dispatch)=>{
    try{
        const result=await axios.get(`${backendURL}/posts`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401;
            }
        })

        if (result.status === 201) {
            toast.success(result?.data?.message);
            return result.data;
        }
        toast.error(result?.data?.message); 
        dispatch(setToken(null)); 
        localStorage.removeItem("token"); 
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}
export const getPostDetails=async (id,token,dispatch)=>{
    try{
        const result=await axios.get(`${backendURL}/posts/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401 || status=== 404;
            }
        })
        if (result.status === 201) {
            if (!result?.data?.data) {
                toast.success("There is no quiz to show first create a quiz");
            } else {
                toast.success(result?.data?.message); 
            }
            return result; 
        } else if (result?.status === 404) {
            toast.error(result?.data?.message);
            return false;
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

export const deletePost=async (id,token,dispatch)=>{
    try{
       const result= await axios.delete(`${backendURL}/posts/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401 || status=== 404;
            }
        })
        if (result.status === 201) {
            toast.success(result?.data?.message); 
            return true; 
        } else if (result?.status === 404) {
            toast.error(result?.data?.message);
            return false;
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

export const searchPosts=async (query,token,dispatch)=>{
    try{
        const result=await axios.get(`${backendURL}/posts/search?search=${query}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
        if (result.status === 201) {
            toast.success(result?.data?.message); 
            return result.data.data; 
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

