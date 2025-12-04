import { CommentType } from '#/entities/Comment';
import { convertTimestamp } from '#/shared/lib/date';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface AddCommentArgs {
    entityType: string;
    entityId: string;
}

export const sendComment = createAsyncThunk<
    CommentType,
    AddCommentArgs,
    ThunkConfig
>(
    'addComment/sendComment',
    async ({ entityId, entityType }, { rejectWithValue, getState, extra }) => {
        const { api } = extra;
        try {
            const text = getState().addComment?.text;

            if (!text) {
                return rejectWithValue({ message: 'Comment text is required' });
            }

            const response = await api.post(
                `/${entityType}/${entityId}/comments`,
                {
                    text,
                    entityId,
                },
            );

            return {
                ...response.data,
                createdAt: convertTimestamp(Number(response.data.createdAt)),
            };
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
