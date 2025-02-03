import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import LoginSignup from './components/LoginSignup'
import FeedPage from './components/FeedPage'
import UserProfile from './components/UserProfile'
import CreatePost from './components/CreatePost'
import PostPageWrapper from './components/PostPageWrapper' 

const router = createBrowserRouter([
    {
        path: '/home',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <LoginSignup />,
    },
    {
        path: '/feed',
        element: <FeedPage />,
    },
    {
        path: '/user',
        element: <UserProfile />,
    },
    {
        path: '/createPost',
        element: <CreatePost />,
    },
    {
        path: '/posts/:postId',
        element: <PostPageWrapper />,  // Use the wrapper here
    },
    {
        path: '*',
        element: <Navigate replace to="/home" />,
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
