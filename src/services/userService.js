import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authAPI } from './authService';

export const userAPI = authAPI.injectEndpoints({
    // reducerPath: 'userAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: `/users`
            })
        })
    })
});
