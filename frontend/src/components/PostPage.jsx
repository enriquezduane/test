import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import styles from '../styles/PostPage.module.css';

const PostPage = ({ posts, onVote, onComment, onUpdateComment, onDeleteComment }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  // This state holds the temporary edit text for comments being edited.
  const [editingComments, setEditingComments] = useState({});

  // Ensure that the postId from params is compared as a number
  const post = posts.find((p) => p.id === Number(postId));

  if (!post) {
    return (
      <div className={styles.container}>
        <Header user={{ username: 'GameMaster' }} />
        <main className={styles.mainContent}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Back to Feed
          </button>
          <div className={styles.notFound}>Post not found</div>
        </main>
      </div>
    );
  }

  // Hardcoded current user (replace with dynamic user data if available)
  const user = {
    username: 'GameMaster',
    avatar: 'https://via.placeholder.com/40'
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  // Handlers for editing an individual comment
  const startEditing = (commentId, currentText) => {
    setEditingComments((prev) => ({ ...prev, [commentId]: currentText }));
  };

  const cancelEditing = (commentId) => {
    setEditingComments((prev) => {
      const updated = { ...prev };
      delete updated[commentId];
      return updated;
    });
  };

  const saveEditedComment = (commentId) => {
    const newText = editingComments[commentId];
    onUpdateComment(post.id, commentId, newText);
    cancelEditing(commentId);
  };

  return (
    <div className={styles.container}>
      <Header 
        user={user}
        showSettings={false}
        toggleSettings={() => {}}
      />

      <main className={styles.mainContent}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Back to Feed
        </button>

        <div className={styles.postContainer}>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.meta}>
              <span className={styles.author}>By {post.author}</span>
              <span className={styles.genre}>{post.genre}</span>
              <span className={styles.time}>{post.timestamp}</span>
            </div>
            <p className={styles.content}>{post.content}</p>

            <div className={styles.voting}>
              <button onClick={() => onVote(post.id, true)} className={styles.voteButton}>
                ▲
              </button>
              <span className={styles.voteCount}>{post.votes}</span>
              <button onClick={() => onVote(post.id, false)} className={styles.voteButton}>
                ▼
              </button>
            </div>
          </div>

          <div className={styles.comments}>
            <h3 className={styles.commentsHeading}>{post.comments.length} Comments</h3>

            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className={styles.commentInput}
                required
              />
              <button type="submit" className={styles.postCommentButton}>
                Post Comment
              </button>
            </form>

            {post.comments.map((comment) => {
              const isEditing = editingComments.hasOwnProperty(comment.id);
              return (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>{comment.author}</span>
                    <span className={styles.commentTime}>{comment.timestamp}</span>
                    {comment.author === user.username && !isEditing && (
                      <>
                        <button
                          className={styles.commentEditButton}
                          onClick={() => startEditing(comment.id, comment.text)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.commentDeleteButton}
                          onClick={() => onDeleteComment(post.id, comment.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                  {isEditing ? (
                    <div className={styles.commentEditing}>
                      <textarea
                        className={styles.commentEditInput}
                        value={editingComments[comment.id]}
                        onChange={(e) =>
                          setEditingComments((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        className={styles.commentSaveButton}
                        onClick={() => saveEditedComment(comment.id)}
                      >
                        Save
                      </button>
                      <button
                        className={styles.commentCancelButton}
                        onClick={() => cancelEditing(comment.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className={styles.commentText}>{comment.text}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
