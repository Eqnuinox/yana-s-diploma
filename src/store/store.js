import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPI } from '../services/userService';
import { authAPI } from '../services/authService';
import authReducer from './reducesrs/AuthSlice';
import { courseAPI } from '../services/courseService';

const rootReducer = combineReducers({
    authReducer,
    [authAPI.reducerPath]: authAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authAPI.middleware)
    });
};
