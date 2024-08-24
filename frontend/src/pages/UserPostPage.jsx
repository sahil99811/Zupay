import PostCard from "../components/common/PostCard";
import style from '../styles/pages/CommonCss.module.css';
import { useEffect, useState } from "react";
import { getUserPosts } from "../services/Post";
import { useSelector, useDispatch } from "react-redux";
import { Oval } from 'react-loader-spinner';
import { setLoading } from "../slices/authSlice";

export default function UserPostPage() {
  const dispatch = useDispatch();
  const { token, loading } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      dispatch(setLoading(true));
      const result = await getUserPosts(token,dispatch);
      if (result) {
        setPosts(result.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      dispatch(setLoading(false)); // Stop loading once posts are fetched or an error occurs
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostDelete = () => {
    fetchPosts(); // Re-fetch posts after a deletion
  };

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
        />
      ) : (
        <div className={style.maincontent}>
          {posts.length > 0 ? (
            posts.map((val, index) => (
              <PostCard key={index} post={val} page="userPosts" onDelete={handlePostDelete} token={token} />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      )}
    </div>
  );
}
