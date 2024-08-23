import style from '../../styles/components/common/PostCard.module.css';
import impression from '../../assets/impression.png';
import deleteicon from '../../assets/deletebutton.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import { deletePost } from '../../services/Post'; 

Modal.setAppElement("#root");

// Define custom styles for the modal
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(47, 47, 47, 0.75)', // Dark semi-transparent background for the modal overlay
        zIndex: 300, // Ensure modal appears above other content
    },
    content: {
        top: "50%", // Center the modal vertically
        left: "50%", // Center the modal horizontally
        right: "auto",
        bottom: "auto",
        
        marginRight: "-50%", // Adjust margin to properly center the modal 
        transform: "translate(-50%, -50%)", // Center the modal using transform
        animation: "slideIn 1.5s ease-in-out", // Apply slide-in animation
    }
};

export default function PostCard({ post, page, onDelete,token }) {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false); // State to manage modal visibility

    function openModal() {
        setIsOpen(true); // Function to open the modal
    }

    function closeModal() {
        setIsOpen(false); // Function to close the modal
    }

    const handleDelete = async (event) => {
        try {
            event.stopPropagation();
            console.log(token);
            await deletePost(post._id,token); // Call the deletePost service
            closeModal(); // Close the modal after successful deletion
            onDelete();
        } catch (error) {
            console.error("Error deleting post:", error);
            // Handle error (e.g., show a notification)
        }
    };

    const onClickHandler = () => {
        navigate((page === "homepage" || page === "search") ? `posts/${post._id}` : `${post._id}`);
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
           {
            (page !== "homepage" && page !== "search")&& <img src={deleteicon} className={style.deleteicon} onClick={(e) => { e.stopPropagation(); openModal(); }} alt="Delete" />
           }

            <Modal
                isOpen={modalIsOpen} // Control modal visibility
                onRequestClose={closeModal} // Close modal when requested
                style={customStyles} // Apply custom styles to the modal
                contentLabel="Confirm Delete" // Accessibility label for the modal content
            >
               <div className={style.popupContainer}>
               <div className={style.messageContainer}>
                    <span>Are you sure you want to delete this post?</span>
                </div>
                <div className={style.buttonContainer}>
                    <button className={style.confirmButton} onClick={handleDelete}>Confirm Delete</button>
                    <button className={style.cancelButton} onClick={closeModal}>Cancel</button>
                </div>
               </div>
            </Modal>
        </div>
    );
}

// Define prop types for better validation
PostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        impression: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        createdBy: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    page: PropTypes.string,
    onDelete: PropTypes.func ,
    token:PropTypes.string
};
