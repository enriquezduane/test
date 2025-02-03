import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Header from './Header';
import styles from './../styles/CreatePost.module.css';

const CreatePost = ({ existingPost }) => {
  // Form state
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState(existingPost?.title || '');
  const [genre, setGenre] = useState(existingPost?.genre || '');
  const [content, setContent] = useState(existingPost?.content || '');

  // Mock user data (Replace with auth system later)
  const user = {
    username: 'GameMaster',
    avatar: 'https://via.placeholder.com/40'
  };

  // Navigation helper
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct new or updated post object
    const newPost = {
      id: existingPost?.id || Math.floor(Math.random() * 1000), // Generate an ID if it's a new post
      author: user.username,
      title,
      genre,
      content,
      votes: existingPost?.votes || 0,
      timestamp: new Date().toLocaleString(),
      comments: existingPost?.comments || 0,
    };

    console.log('Submitted Post:', newPost);
    
    // Redirect to another page (e.g., feed or profile)
    navigate('/user'); // Use navigate instead of history.push()
  };

  // Header functions
  const handleSearchClick = () => alert('Search button clicked!');
  const toggleSettings = () => {};

  return (
    <div className={styles.container}>
      {/* Use the reusable Header component */}
        <Header 
        user={user}
        onSearchClick={handleSearchClick}
        showSettings={showSettings}
        toggleSettings={setShowSettings}  
        />

      <main className={styles.mainContent}>
        <h1>{existingPost ? 'Edit Post' : 'Create Post'}</h1>
        <form onSubmit={handleSubmit} className={styles.postForm}>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />

          <label htmlFor="genre">Genre</label>
          <input 
            type="text" 
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter game genre (e.g., RPG, Gacha)"
            required
          />

          <label htmlFor="content">Content</label>
          <textarea 
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            required
          ></textarea>

          <button type="submit">
            {existingPost ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
