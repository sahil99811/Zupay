import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const createPost=async (formdata,token)=>{
    try{
        console.log(formdata,token,backendURL);
        const result=await axios.post(`${backendURL}/posts`,formdata,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
        console.log(result.data);
    }catch(error){
        console.log(error);
   
    }
}

export const getUserPosts=async (token)=>{
    try{
        const result=await axios.get(`${backendURL}/user/posts`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
        return result.data
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getPosts=async (token)=>{
    try{
        const result=await axios.get(`${backendURL}/posts`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
        return result.data
    }catch(error){
        console.log(error);
        return false;
    }
}
export const getPostDetails=async (id,token)=>{
    try{
        const result=await axios.get(`${backendURL}/posts/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
        return result;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const deletePost=async (id,token)=>{
    try{
        await axios.delete(`${backendURL}/posts/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
        return true;
    }catch(error){
        console.log(error);
       return false;
    }
}

export const searchPosts=async (query,token)=>{
    try{
        const result=await axios.get(`${backendURL}/posts/search?search=${query}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
       return  result.data.data
    }catch(error){
        console.log(error);
        return false;
    }
}

