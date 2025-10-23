import { Profile } from '../../types/profile.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { getProfileForm } from '../../selectors';

export const updateProfile = createAsyncThunk<Profile, undefined, ThunkConfig>(
    'profile/updateProfile',
    async (_, { extra, rejectWithValue, getState }) => {
        const { api } = extra;
        try {
            const body = getProfileForm(getState());

            if (!body) {
                return rejectWithValue({
                    message: 'errors.noBody',
                });
            }
            const response = await api.put<Profile>(
                `/profile/${body.id}`,
                body,
            );
            return response.data;
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
