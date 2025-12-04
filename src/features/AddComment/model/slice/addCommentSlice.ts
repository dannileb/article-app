import { sendComment } from '../services/sendComment';
import { AddCommentSchema } from '../types/addComment.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AddCommentSchema = {};

export const addCommentSlice = createSlice({
    name: 'addComment',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendComment.fulfilled, (state) => {
                state.text = '';
                state.error = undefined;
            })
            .addCase(sendComment.rejected, (state, action) => {
                state.error = action.payload?.message;
            });
    },
});

export const { actions: addCommentActions, reducer: addCommentReducer } =
    addCommentSlice;
