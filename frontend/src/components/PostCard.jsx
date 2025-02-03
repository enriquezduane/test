import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post, onVote, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGenre, setEditedGenre] = useState(post.genre);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    onUpdate(post.id, editedGenre, editedContent);
    setIsEditing(false);
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.voteContainer}>
        <button onClick={() => onVote(post.id, true)} className={styles.voteButton}>
          ▲
        </button>
        <span className={styles.voteCount}>{post.votes}</span>
        <button onClick={() => onVote(post.id, false)} className={styles.voteButton}>
          ▼
        </button>
      </div>

      <Link to={`/posts/${post.id}`} className={styles.postLink}>
        <div className={styles.postContent}>
          <div className={styles.postHeader}>
            {isEditing ? (
              <input
                type="text"
                value={editedGenre}
                onChange={(e) => setEditedGenre(e.target.value)}
                className={styles.genreInput}
              />
            ) : (
              <span className={styles.genreTag}>{post.genre}</span>
            )}

            <div className={styles.authorTime}>
              <span className={styles.postAuthor}>Posted by {post.author}</span>
              <span className={styles.postTime}>{post.timestamp}</span>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={styles.contentInput}
            />
          ) : (
            <>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postText}>{post.content}</p>
            </>
          )}
        </div>
      </Link>

      <div className={styles.postFooter}>
        <button className={styles.commentsButton}>
          💬 {post.comments.length}
        </button>
        {post.author === 'GameMaster' && (
          <>
            {isEditing ? (
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            <button className={styles.deleteButton} onClick={() => onDelete(post.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
