import styles from './../styles/LandingPage.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {

    const categories = [
        { name: 'PC Gaming', threads: 245, posts: 12.4 },
        { name: 'Console Gaming', threads: 189, posts: 8.9 },
        { name: 'Mobile Gaming', threads: 156, posts: 6.2 },
        { name: 'Indie Games', threads: 302, posts: 15.1 },
        { name: 'Game Development', threads: 98, posts: 4.3 },
        { name: 'Off-Topic', threads: 432, posts: 21.6 }
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Gamey Forums</h1>
                <nav className={styles.nav}>
                    <Link to="/login" className={styles.navButton}>Login/Signup</Link>
                </nav>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.hero}>
                    <h2 className={styles.heroTitle}>Connect with Gamers Worldwide</h2>
                    <p className={styles.heroText}>Discuss, share, and explore the latest in gaming culture</p>
                </div>

                <div className={styles.categoryGrid}>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.categoryCard}>
                            <h3 className={styles.categoryTitle}>{category.name}</h3>
                            <div className={styles.categoryStats}>
                                <span>{category.threads} Threads</span>
                                <span>{category.posts}k Posts</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className={styles.footer}>
                <p>© 2025 Gamey Forums. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
