import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    const retriesCondition = args?.url.toString().split('/')[1];
    let result = await baseQuery(args, api, extraOptions);
    if (retriesCondition === 'auth') {
        return result;
    }
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery(
            '/auth/refresh',
            api,
            extraOptions
        );
        if (refreshResult?.data) {
            const tokens = refreshResult.data;
            console.log(
                refreshResult,
                ' - REFRESH RESULT, ',
                tokens,
                ' - TOKENS'
            );
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log('logOut');
        }
    }
    return result;
};

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Post'],
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        registration: build.mutation({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                credentials: 'include',
                body: data
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                credentials: 'include',
                method: 'POST'
            })
        }),
        refresh: build.mutation({
            query: () => ({
                url: '/auth/refresh',
                credentials: 'include',
                method: 'GET'
            })
        })
    })
});
