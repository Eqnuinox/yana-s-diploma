import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: {},
    isLoading: false,
    error: '',
    isAuth: false
};

export const authSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
        }
    }
});

export default authSlice.reducer;
