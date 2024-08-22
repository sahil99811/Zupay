import style from '../../styles/components/common/PostCard.module.css';
import impression from '../../assets/impression.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PostCard({ post ,page}) {
    const navigate = useNavigate();
  
    const onClickHandler = () => {
        navigate((page==="homepage"||page==="search")?`posts/${post._id}`:`${post._id}`);
    };
    
    // Ensure post data is valid
    if (!post) {
        return <div>Post data is missing.</div>;
    }

    return (
        <div className={style.container} onClick={onClickHandler}>
            {post.thumbnail ? (
                <img src={post.thumbnail} className={style.thumbnail} alt="Post Thumbnail" />
            ) : (
                <div className={style.thumbnailPlaceholder}>No Image</div>
            )}
            <div className={style.impression}>
                <img src={impression} alt="Impression icon" className={style.impressionLogo} />
                <span className={style.impressions}>{post.impression || 0}</span> {/* Default to 0 if impression is missing */}
            </div>
            <div className={style.postInfo}>
                <div className={style.headingcontainer}>
                    <p className={style.heading}>{post.title || "Untitled"}</p> {/* Default to "Untitled" if title is missing */}
                    <p className={style.info}>{post.description || "No description available"}</p> {/* Default message for description */}
                </div>
                <span className={style.createdby}>{post.createdBy?.name || "Unknown"}</span> {/* Default to "Unknown" if name is missing */}
            </div>
            
        </div>
    );
}

// Define prop types for better validation
PostCard.propTypes = {
    post: PropTypes.shape({
        _id:PropTypes.string,
        thumbnail: PropTypes.string,
        impression: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        createdBy: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    page:PropTypes.string
};
