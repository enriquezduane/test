import styles from './../styles/UserPage.module.css';
import { useState } from 'react';
import PostCard from './PostCard'; 
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const FeedPage = () => {
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();
    
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'Gamer123',
            title: 'Exciting RPG Update!',
            genre: 'RPG',
            content: 'Just finished the new RPG expansion - absolutely amazing!',
            votes: 45,
            timestamp: '2h ago',
            comments: [
                { id: 1, author: 'User1', text: 'Great post!', timestamp: '1h ago' }
            ]
        },
        {
            id: 2,
            author: 'PixelWarrior',
            title: 'New Indie Game is a Hidden Gem!',
            genre: 'Adventure',
            content: 'Just discovered this indie adventure game—absolutely blown away by the story and art style!',
            votes: 78,
            timestamp: '1h ago',
            comments: 23
        },
        {
            id: 3,
            author: 'CyberNinja',
            title: 'FPS Game Patch is a Game Changer!',
            genre: 'FPS',
            content: 'The latest patch fixed so many issues, and the new map is 🔥!',
            votes: 62,
            timestamp: '3h ago',
            comments: 18
        },
        {
            id: 4,
            author: 'RogueSamurai',
            title: 'Stealth Game Finally Gets the Love it Deserves',
            genre: 'Stealth',
            content: 'They just dropped an update with new mechanics, and it makes the game so much better!',
            votes: 54,
            timestamp: '5h ago',
            comments: 10
        },
        {
            id: 5,
            author: '8BitLegend',
            title: 'Retro Revival - Classic Platformer Remastered!',
            genre: 'Platformer',
            content: 'The remaster of this classic is everything I hoped for! Feels just like the original but better.',
            votes: 90,
            timestamp: '30m ago',
            comments: 32
        },
        {
            id: 6,
            author: 'MMOGrinder',
            title: 'New MMO Expansion - Worth the Hype?',
            genre: 'MMO',
            content: 'I’ve been playing the new expansion all day, and the world-building is insane!',
            votes: 120,
            timestamp: '6h ago',
            comments: 45
        },
        {
            id: 7,
            author: 'SpeedRunnerX',
            title: 'Speedrunning This Game is Insanely Fun!',
            genre: 'Speedrun',
            content: 'Just found a crazy glitch that saves 5 minutes—this game is breaking speedrun records!',
            votes: 77,
            timestamp: '2h ago',
            comments: 28
        },
        {
            id: 8,
            author: 'LootBoxKing',
            title: 'Gacha Pulls Were Actually Lucky for Once!',
            genre: 'Gacha',
            content: 'I can’t believe it—I finally pulled the 5-star character on my first 10-pull!',
            votes: 102,
            timestamp: '1h ago',
            comments: 41
        },
        {
            id: 9,
            author: 'VRExplorer',
            title: 'VR Horror Game is the Scariest Thing Ever',
            genre: 'Horror',
            content: 'Tried playing this new VR horror game, and I screamed so loud my neighbors got concerned 😱.',
            votes: 88,
            timestamp: '4h ago',
            comments: 19
        },
        {
            id: 10,
            author: 'TacticalMind',
            title: 'Strategy Game AI is TOO Smart Now!',
            genre: 'Strategy',
            content: 'The new AI update makes the game so much harder, but I love the challenge!',
            votes: 95,
            timestamp: '3h ago',
            comments: 36
        }
        
        
    ]);

    const user = {
        username: 'GameMaster',
        avatar: 'https://via.placeholder.com/40'
    };

    const handleVote = (postId, isUpvote) => {
        setPosts(posts.map(post => post.id === postId ? {
            ...post,
            votes: isUpvote ? post.votes + 1 : post.votes - 1
        } : post));
    };

    const handleAddComment = (postId, commentText) => {
        setPosts(posts.map(post => post.id === postId ? {
            ...post,
            comments: [...post.comments, {
                id: Date.now(),
                author: user.username,
                text: commentText,
                timestamp: 'Just now'
            }]
        } : post));
    };

    return (
        <div className={styles.container}>
            <Header 
                user={user}
                showSettings={showSettings}
                toggleSettings={() => setShowSettings(!showSettings)}
            />

            <main className={styles.mainContent}>
                <div className={styles.postsContainer}>
                    {posts.map(post => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            onVote={handleVote}
                            onUpdate={(postId, genre, content) => {
                                setPosts(posts.map(p => p.id === postId ? {
                                    ...p,
                                    genre,
                                    content
                                } : p));
                            }}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FeedPage;