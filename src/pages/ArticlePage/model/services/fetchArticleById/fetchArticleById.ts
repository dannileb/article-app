import { ArticleResponse } from '../../types/article.types';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertTimestamp } from '#/shared/lib/date';

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
            const convertedData = {
                ...response.data.data,
                createdAt: convertTimestamp(
                    Number(response.data.data.createdAt),
                ),
            };
            return {
                data: convertedData,
                readonly: response.data.readonly,
            };
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
