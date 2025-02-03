import { useState } from 'react';
import Header from './Header';
import PostCard from './PostCard';
import styles from './../styles/UserProfile.module.css';

const UserProfile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const user = {
    username: 'GameMaster',
    avatar: 'https://via.placeholder.com/150',
    description: 'I am a passionate gamer who loves exploring new worlds and sharing epic adventures.',
    postsCount: 1,
    commentsCount: 1,
    votes: 120,
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'GameMaster',
      title: 'Epic RPG Journey',
      genre: 'RPG',
      content: 'My journey through the lands of Eldoria was nothing short of epic...',
      votes: 120,
      timestamp: '2h ago',
      comments: [
        { id: 1, author: 'User2', text: 'Awesome story!', timestamp: '1h ago' }
      ]
    },
    // Add other posts...
  ]);

  const handleVote = (postId, isUpvote) => {
    setPosts(
      posts.map(post =>
        post.id === postId
          ? { ...post, votes: isUpvote ? post.votes + 1 : post.votes - 1 }
          : post
      )
    );
  };

  // Add this function to handle deletion of a post.
  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className={styles.container}>
      <Header 
        user={user}
        showSettings={showSettings}
        toggleSettings={setShowSettings}
      />

      <div className={styles.profileBanner}>
        <img src={user.avatar} alt="Profile Avatar" className={styles.profileAvatar} />
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{user.username}</h1>
          <p className={styles.profileDescription}>{user.description}</p>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{user.postsCount}</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{user.commentsCount}</span>
              <span className={styles.statLabel}>Comments</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{user.votes}</span>
              <span className={styles.statLabel}>Votes</span>
            </div>
          </div>
        </div>
      </div>

      <main className={styles.mainContent}>
        <h2 className={styles.postsHeading}>My Posts</h2>
        <div className={styles.postsContainer}>
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onVote={handleVote}
              onDelete={handleDelete}
              onUpdate={(postId, genre, content) => {
                setPosts(
                  posts.map(p => p.id === postId
                    ? { ...p, genre, content }
                    : p
                  )
                );
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
