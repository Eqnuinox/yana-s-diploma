import logo from './logo.svg';
import './App.css';
import { publicRouter } from './navigation/public';
import { RouterProvider } from 'react-router-dom';
import { privateRouter } from './navigation/private';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authAPI } from './services/authService';

function App() {
    const { isAuth } = useSelector((state) => state.authReducer);
    const [refresh] = authAPI.useRefreshMutation();
    const fetchRefresh = async () => {
        return await refresh();
    };

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            fetchRefresh().then((data) => {
                localStorage.setItem('accessToken', data?.data?.accessToken);
            });
        }
        

    }, []);

    return (
        <RouterProvider router={isAuth ? privateRouter : publicRouter}>
            <div className="App"></div>
        </RouterProvider>
    );
}

export default App;
