import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: `/users`
            })
        })
    })
});
