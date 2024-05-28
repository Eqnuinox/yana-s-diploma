import logo from './logo.svg';
import './App.css';
import { publicRouter } from './navigation/public';
import { RouterProvider } from 'react-router-dom';
import { privateRouter } from './navigation/private';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authAPI } from './services/authService';
import { authSlice } from './store/reducesrs/AuthSlice';

function App() {
    const { isAuth } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const { setAuth } = authSlice.actions;
    const [refresh] = authAPI.useRefreshMutation();
    const fetchRefresh = async () => {
        return await refresh();
    };

    useEffect(() => {
        fetchRefresh().then((data) => {
            if (data?.error?.status === 401) {
                return;
            }
            localStorage.setItem('accessToken', data?.data?.accessToken);
            dispatch(setAuth(true));
        });
    }, []);

    return (
        <RouterProvider router={isAuth ? privateRouter : publicRouter}>
            <div className="App"></div>
        </RouterProvider>
    );
}

export default App;
