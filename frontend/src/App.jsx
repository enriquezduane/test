import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import LoginSignup from './components/LoginSignup'

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
        path: '*',
        element: <Navigate replace to="/home" />,
    },
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
