import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './../styles/UserPage.module.css';

const Header = ({ user, onSearchClick, showSettings, toggleSettings }) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings, toggleSettings]);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
      <Link to="/feed" className={styles.siteName}>
          GAMEY FORUMS 
        </Link>
      </div>

      <div className={styles.headerCenter}>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search posts..."
            className={styles.searchBar}
          />
          <button 
            onClick={onSearchClick}
            className={styles.searchIconButton}
          >
            🔍
          </button>
        </div>
      </div>

      <div className={styles.headerRight}>
        <Link to="/createPost" className={styles.createPostButton}>
          Create Post
        </Link>
        <img src={user.avatar} alt="Avatar" className={styles.avatar} />
        <Link to="/user">
          <span className={styles.username}>{user.username}</span>
        </Link>
        <div className={styles.settingsContainer} ref={dropdownRef}>
          <button 
            onClick={() => toggleSettings(!showSettings)}
            className={styles.settingsButton}
          >
            ⚙️
          </button>
          {showSettings && (
            <div className={styles.settingsDropdown}>
              <Link to="/user">
                <button className={styles.dropdownItem}>Profile</button>
              </Link>
              <Link to="/home"><button className={styles.dropdownItem}>Logout</button></Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
