import { userActions, UserWithToken } from '#/entities/User';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ResponseError } from '#/shared/types/Axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    UserWithToken,
    LoginByUsernameProps,
    { rejectValue: ResponseError }
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
    try {
        const response = await axios.post<UserWithToken>(
            'http://localhost:8000/api/login',
            {
                username,
                password,
            },
        );

        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        thunkApi.dispatch(userActions.setAuthData(response.data.user));

        return response.data;
    } catch (error: unknown) {
        return processAsyncThunkError(error, thunkApi);
    }
});
