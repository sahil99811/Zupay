
import { useState, useEffect } from 'react';
import { getPostDetails } from '../services/Post';
import { createComment } from '../services/Comment';
import { getSummary } from '../services/Summarize';
import { useDispatch } from 'react-redux';
export default function usePostDetails(postId, token) {
    const dispatch=useDispatch();
    const [postDetails, setPostDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [summary, setSummary] = useState("");
    const [admin, setAdmin] = useState(false);

    const fetchPostDetails = async () => {
     
        setLoading(true);
        setError(null);
        try {
            const result = await getPostDetails(postId, token,dispatch);
            if (result && result.data) {
                setPostDetails(result.data.data);
                setAdmin(result.data.admin || false);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching the post details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const onClickHandler = () => {
        setCommentsOpen(prevState => !prevState);
    };

    const sendComment = async () => {
        if (comment.trim() === "") return;
        try {
            const result = await createComment(postDetails._id, comment, token,dispatch);
            if (result && result.data) {
                setPostDetails(prevDetails => ({
                    ...prevDetails,
                    comments: [...prevDetails.comments, result.data.comment],
                }));
                setComment("");
            }
        } catch (err) {
            console.error("Error sending comment:", err);
            alert('Failed to send the comment. Please try again.');
        }
    };

    const getpostSummary = async () => {
        if (!postDetails) return;
        try {
            const summaryData = `${postDetails.title} ${postDetails.description} ${postDetails.content.join(' ')}`;
            const result = await getSummary(summaryData, token,dispatch);
            if (result && result.data) {
                setSummary(result.data.data);
            }
        } catch (err) {
            console.error("Error fetching summary:", err);
            alert('Failed to fetch summary. Please try again.');
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, []);

    return {
        postDetails,
        loading,
        error,
        commentsOpen,
        comment,
        summary,
        admin,
        setComment,
        sendComment,
        getpostSummary,
        onClickHandler
    };
}
