import { useState } from 'react';
import PostPage from './PostPage';

const PostPageWrapper = () => {
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
        { id: 1, author: 'User1', text: 'Great post!', timestamp: '1h ago' },
        
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
        comments: [] // Changed from `18` to an empty array
    
    },
    {
        id: 3,
        author: 'CyberNinja',
        title: 'FPS Game Patch is a Game Changer!',
        genre: 'FPS',
        content: 'The latest patch fixed so many issues, and the new map is 🔥!',
        votes: 62,
        timestamp: '3h ago',
        comments: []
    },
    {
        id: 4,
        author: 'RogueSamurai',
        title: 'Stealth Game Finally Gets the Love it Deserves',
        genre: 'Stealth',
        content: 'They just dropped an update with new mechanics, and it makes the game so much better!',
        votes: 54,
        timestamp: '5h ago',
        comments: []
    },
    {
        id: 5,
        author: '8BitLegend',
        title: 'Retro Revival - Classic Platformer Remastered!',
        genre: 'Platformer',
        content: 'The remaster of this classic is everything I hoped for! Feels just like the original but better.',
        votes: 90,
        timestamp: '30m ago',
        comments: []
    },
    {
        id: 6,
        author: 'MMOGrinder',
        title: 'New MMO Expansion - Worth the Hype?',
        genre: 'MMO',
        content: 'I’ve been playing the new expansion all day, and the world-building is insane!',
        votes: 120,
        timestamp: '6h ago',
        comments: []
    },
    {
        id: 7,
        author: 'SpeedRunnerX',
        title: 'Speedrunning This Game is Insanely Fun!',
        genre: 'Speedrun',
        content: 'Just found a crazy glitch that saves 5 minutes—this game is breaking speedrun records!',
        votes: 77,
        timestamp: '2h ago',
        comments: []
    },
    {
        id: 8,
        author: 'LootBoxKing',
        title: 'Gacha Pulls Were Actually Lucky for Once!',
        genre: 'Gacha',
        content: 'I can’t believe it—I finally pulled the 5-star character on my first 10-pull!',
        votes: 102,
        timestamp: '1h ago',
        comments: []
    },
    {
        id: 9,
        author: 'VRExplorer',
        title: 'VR Horror Game is the Scariest Thing Ever',
        genre: 'Horror',
        content: 'Tried playing this new VR horror game, and I screamed so loud my neighbors got concerned 😱.',
        votes: 88,
        timestamp: '4h ago',
        comments: []
    },
    {
        id: 10,
        author: 'TacticalMind',
        title: 'Strategy Game AI is TOO Smart Now!',
        genre: 'Strategy',
        content: 'The new AI update makes the game so much harder, but I love the challenge!',
        votes: 95,
        timestamp: '3h ago',
        comments: []
    }

  ]);

  const handleVote = (postId, isUpvote) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, votes: isUpvote ? post.votes + 1 : post.votes - 1 }
        : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                author: 'GameMaster',
                text: commentText,
                timestamp: 'Just now'
              }
            ]
          }
        : post
    ));
  };

  const handleUpdateComment = (postId, commentId, newText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId
              ? { ...comment, text: newText, timestamp: 'Edited just now' }
              : comment
          )
        };
      }
      return post;
    }));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  return (
    <PostPage 
      posts={posts} 
      onVote={handleVote} 
      onComment={handleAddComment}
      onUpdateComment={handleUpdateComment}
      onDeleteComment={handleDeleteComment}
    />
  );
};

export default PostPageWrapper;
