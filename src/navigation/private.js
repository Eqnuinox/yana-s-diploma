import { createBrowserRouter, Link, Navigate } from 'react-router-dom';
import { InitialPage, Login, PersonalAreaPage, CoursesPage } from '../pages';

export const privateRouter = createBrowserRouter([
    {
        path: 'home',
        element: <PersonalAreaPage />
    },
    {
        path: '/course',
        element: <CoursesPage />
    },
    {
        path: '*',
        element: <Navigate to="/home" replace />
    }
]);
