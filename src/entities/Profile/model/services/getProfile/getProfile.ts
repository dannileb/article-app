import { Profile } from '../../types/profile.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';

export const getProfile = createAsyncThunk<
    Profile | undefined,
    void,
    ThunkConfig
>('profile/getProfile', async (_, { extra, rejectWithValue }) => {
    const { api } = extra;
    try {
        const response = await api.get<Profile>('/profile');
        return response.data;
    } catch (error: unknown) {
        return processAsyncThunkError(error, rejectWithValue);
    }
});
