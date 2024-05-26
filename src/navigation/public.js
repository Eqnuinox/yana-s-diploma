import { Navigate, createBrowserRouter } from 'react-router-dom';
import { InitialPage, Login, SignUp } from '../pages';

export const publicRouter = createBrowserRouter([
    {
        path: '/',
        element: <InitialPage />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'sign-up',
        element: <SignUp />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
]);
