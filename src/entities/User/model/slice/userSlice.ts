import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user.types';
import { getUserAuth } from '../services/getUserAuth/getUserAuth';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';

const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(getUserAuth.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
