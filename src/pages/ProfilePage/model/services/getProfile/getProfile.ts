import { ProfileResponse } from '../../types/profile.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';

interface GetProfileArgs {
    profileId: string;
}

export const getProfile = createAsyncThunk<
    ProfileResponse,
    GetProfileArgs,
    ThunkConfig
>('profile/getProfile', async ({ profileId }, { extra, rejectWithValue }) => {
    const { api } = extra;
    try {
        const response = await api.get<ProfileResponse>(
            `/profile/${profileId}`,
        );
        return response.data;
    } catch (error: unknown) {
        return processAsyncThunkError(error, rejectWithValue);
    }
});
