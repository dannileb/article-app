import { User } from '../../types/user.types';
import { ACCESS_TOKEN_KEY } from '#/shared/consts/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ResponseError } from '#/shared/types/Axios';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';

export const getUserAuth = createAsyncThunk<
    User | undefined,
    void,
    { rejectValue: ResponseError }
>('user/getUserAuth', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (accessToken === null) {
            return undefined;
        }
        const response = await axios.get<User>('http://localhost:8000/api/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error: unknown) {
        return processAsyncThunkError(error, thunkApi);
    }
});
