import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const createComment=async (postid,comment,token)=>{
    try{
        const result=await axios.post(`${backendURL}/comment/${postid}`,{text:comment},{
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