import { ArticleResponse } from '../../types/article.types';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleById = createAsyncThunk<
    ArticleResponse,
    { articleId: string },
    ThunkConfig
>(
    'articlePage/fetchArticleById',
    async ({ articleId }, { extra, rejectWithValue }) => {
        const { api } = extra;
        try {
            const response = await api.get<ArticleResponse>(
                `/articles/${articleId}`,
            );
            return response.data;
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
