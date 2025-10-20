import { userActions, UserWithToken } from '#/entities/User';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    UserWithToken,
    LoginByUsernameProps,
    ThunkConfig
>(
    'login/loginByUsername',
    async ({ username, password }, { rejectWithValue, extra, dispatch }) => {
        const { api } = extra;
        try {
            const response = await api.post<UserWithToken>('/login', {
                username,
                password,
            });

            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
            dispatch(userActions.setAuthData(response.data.user));

            return response.data;
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
