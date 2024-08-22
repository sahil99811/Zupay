import PostCard from "../components/common/PostCard";
import style from '../styles/pages/CommonCss.module.css';
import { useEffect, useState } from "react";
import { Oval } from 'react-loader-spinner';
import { searchPosts } from "../services/Post";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function SearchResultPage() {
  const location=useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const {token}=useSelector(state=>state.auth);
    const fetchData = async () => {
        try {
            setLoading(true); 
           const result= await searchPosts(location.search.split("=")[1],token);
           if(result){
            setData(result);
           }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        
        fetchData();
    }, [location]);

    return (
        <div className={style.container}>
            {loading ? (
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{ zIndex: 500, position: 'absolute', top: '0', left: '50%', marginTop: "8rem" }}
                    wrapperClass=""
                />
            ) : (
                <div className={style.maincontent}>
                    {data.length > 0 ? (
                        data.map((val, index) => (
                            <PostCard key={index} post={val} page="search" />
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
