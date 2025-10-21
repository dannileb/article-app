import { User } from '../../types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';

export const getUserAuth = createAsyncThunk<User, undefined, ThunkConfig>(
    'user/getUserAuth',
    async (_, { extra, rejectWithValue }) => {
        const { api } = extra;

        try {
            const response = await api.get<User>('/me');
            return response.data;
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
