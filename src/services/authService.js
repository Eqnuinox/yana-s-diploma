import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/auth' }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: '/login',
                credentials: 'include',
                method: 'POST',
                body: data
            })
        }),
        registration: build.mutation({
            query: (data) => ({
                url: '/registration',
                method: 'POST',
                credentials: 'include',
                body: data
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                credentials: 'include',
                method: 'POST'
            })
        }),
        refresh: build.mutation({
            query: () => ({
                url: '/refresh',
                credentials: 'include',
                method: 'GET'
            })
        })
    })
});
