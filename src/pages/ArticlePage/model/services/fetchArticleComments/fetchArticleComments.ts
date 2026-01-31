import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertTimestamp } from '#/shared/lib/date';
import { ArticleCommentsResponse } from '../../types/articleComments.types';

export const fetchArticleComments = createAsyncThunk<
    ArticleCommentsResponse,
    { articleId: string },
    ThunkConfig
>(
    'articlePage/fetchArticleComments',
    async ({ articleId }, { extra, rejectWithValue }) => {
        const { api } = extra;
        try {
            const response = await api.get<ArticleCommentsResponse>(
                `/article/${articleId}/comments`,
            );
            const adaptedData = response.data.data.map((comment) => ({
                ...comment,
                createdAt: convertTimestamp(Number(comment.createdAt)),
            }));
            return {
                data: adaptedData,
                totalCount: response.data.totalCount,
            };
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
