import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile.types';
import { getProfile } from '../services/getProfile/getProfile';
import { updateProfile } from '../services/updateProfile/updateProfile';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = state.data;
            state.updateError = undefined;
        },
        setProfileForm: (state, action: PayloadAction<Partial<Profile>>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            } as Profile;
        },
    },
    extraReducers: (builder) => {
        builder
            // getProfile
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.profileData;
                state.form = action.payload.profileData;
                state.readonly = action.payload.readonly;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            // updateProfile
            .addCase(updateProfile.pending, (state) => {
                state.isUpdateLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isUpdateLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isUpdateLoading = false;
                state.updateError = action.payload?.message;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
