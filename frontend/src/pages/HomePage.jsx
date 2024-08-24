import style from '../styles/pages/HomePage.module.css';
import TrendingPost from "../components/homepage/TrendingPost";
import PostCard from "../components/common/PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "../services/Post";
import { useSelector, useDispatch } from "react-redux";
import { Oval } from 'react-loader-spinner';
import { setLoading } from '../slices/authSlice';

export default function HomePage() {
    const dispatch = useDispatch();
    const { token, loading } = useSelector(state => state.auth);
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        dispatch(setLoading(true));
        try {
            const result = await getPosts(token,dispatch);
            if(result){
                setPosts(result?.data || {});
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (token) {
            fetchPosts();
        }
    }, []);

    return (
        <div>
            {loading ? (
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{ zIndex: 500, position: 'absolute', top: '0', left: '50%',marginTop:"8rem" }}
                    wrapperClass=""
                />
            ) : (
                <div className={style.container}>
                    <div className={style.maincontent}>
                        <TrendingPost posts={posts?.trendingPosts} />
                        <div className={style.posts}>
                            <h3 className={style.heading}>Top Stories</h3>
                            {Array.isArray(posts?.popularPosts) ? (
                                posts.popularPosts.map((val, index) => (
                                    <PostCard key={index} post={val} page="homepage" />
                                ))
                            ) : (
                                <p>No popular posts available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
