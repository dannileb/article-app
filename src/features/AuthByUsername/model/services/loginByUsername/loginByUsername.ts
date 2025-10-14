import { userActions, UserWithToken } from '#/entities/User';
import i18n from '#/shared/config/i18n/i18n';
import { ACESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

interface LoginError {
    message: string;
}

export const loginByUsername = createAsyncThunk<
    UserWithToken,
    LoginByUsernameProps,
    { rejectValue: LoginError }
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
        localStorage.setItem(ACESS_TOKEN_KEY, response.data.accessToken);
        thunkApi.dispatch(userActions.setAuthData(response.data.user));

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError<LoginError>(error)) {
            const axiosError = error;

            return thunkApi.rejectWithValue({
                message: axiosError.response?.data?.message
                    ? i18n.t(axiosError.response.data.message)
                    : i18n.t('errors.unknown'),
            });
        }

        return thunkApi.rejectWithValue({
            message: i18n.t('errors.unknown'),
        });
    }
});
