import { createBrowserRouter, Link, Navigate } from 'react-router-dom';
import { InitialPage, Login, PersonalAreaPage } from '../pages';

export const privateRouter = createBrowserRouter([
    {
        path: 'home',
        element: <PersonalAreaPage />
    },
    {
        path: '*',
        element: <Navigate to="/home" replace />
    }
]);
