import { User } from '../../types/user.types';
import i18n from '#/shared/config/i18n/i18n';
import { ACESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginError {
    message: string;
}

export const getProfile = createAsyncThunk<
    User | undefined,
    void,
    { rejectValue: LoginError }
>('user/getProfile', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem(ACESS_TOKEN_KEY);
        if (accessToken === null) {
            return undefined;
        }
        const response = await axios.get<User>(
            'http://localhost:8000/api/profile',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
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
