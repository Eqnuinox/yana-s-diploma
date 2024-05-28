// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authAPI } from './authService';

export const courseAPI = authAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllCourses: build.query({
            query: () => ({
                url: '/courses'
            })
        }),
        getOneCourse: build.query({
            query: (id) => ({
                url: `/courses/${id}`
            })
        }),
        getCourseTests: build.query({
            query: (id) => ({
                url: `/courses/tests/${id}`
            })
        })
    })
});
