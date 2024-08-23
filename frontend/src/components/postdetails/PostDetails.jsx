
import style from '../../styles/components/postdetails/PostDetails.module.css';
import send from '../../assets/send.png';
import downside from '../../assets/downside.png';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import usePostDetails from '../../hooks/usePostDetails';

export default function PostDetails() {
    const { id } = useParams();
    const { token } = useSelector(state => state.auth);

    const {
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
    } = usePostDetails(id, token);

    return (
        <div className={style.container}>
            {loading ? (
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{ zIndex: 500, position: 'absolute', top: '10%', left: '50%' }}
                />
            ) : error ? (
                <div className={style.errorMessage}>{error}</div>
            ) : postDetails ? (
                <>
                    <header className={style.heading}>
                        <img src={postDetails.thumbnail} className={style.thumbnail} alt="Thumbnail" />
                        <div className={style.headinginfo}>
                            <span className={style.impression}>{`Impression: ${postDetails.impression + 1}`}</span>
                            <span className={style.createAt}>Created At: {new Date(postDetails.createdAt).toLocaleDateString()}</span>
                        </div>
                    </header>
                    <main className={style.mainContent}>
                        <h3 className={style.title}>{postDetails.title}</h3>
                        <span className={style.category}>{postDetails.category}</span>
                        <p className={style.description}>
                            {postDetails.description}
                        </p>
                        <ul className={style.contentList}>
                            {postDetails.content.map((item, index) => (
                                <li key={index} className={style.contentItem}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button
                            className={style.button}
                            onClick={getpostSummary}
                        >
                            Get Summary of blog in short from AI
                        </button>
                        {summary && (
                            <div className={style.summarySection}>
                                <h4>Summary</h4>
                                <p>{summary}</p>
                            </div>
                        )}
                    </main>
                     
                    <section className={style.commentSection}>
                        <div className={style.commentHeader}>
                            <div className={style.commentHeading}>
                                <h3>Comments</h3>
                                <img
                                    src={downside}
                                    onClick={onClickHandler}
                                    alt="Toggle comments"
                                    aria-label="Toggle comments"
                                    className={style.toggleCommentsIcon}
                                />
                            </div>
                            {commentsOpen && (
                                <div className={style.commentList}>
                                    {postDetails.comments.length > 0 ? (
                                        postDetails.comments.map((val, index) => (
                                            <div key={index} className={style.commentItem}>
                                                <div className={style.commentText}>
                                                    <p>{val.text}</p>
                                                    <span className={style.commentDate}>{new Date(val.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <span className={style.commentAuthor}>{val.author.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {!admin && (
                            <div className={style.commentInputContainer}>
                                <input
                                    type="text"
                                    placeholder="Enter Your Comment"
                                    className={style.commentInput}
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                />
                                <img
                                    src={send}
                                    className={style.sendIcon}
                                    alt="Send"
                                    onClick={sendComment}
                                    aria-label="Send comment"
                                />
                            </div>
                        )}
                    </section>
                </>
            ) : null}
        </div>
    );
}
