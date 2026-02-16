import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertTimestamp } from '#/shared/lib/date';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';
import { Article } from '#/entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
    PageableResponse<Article>,
    undefined,
    ThunkConfig
>(
    'article/fetchArticleRecommendations',
    async (_, { extra, rejectWithValue }) => {
        const { api } = extra;

        try {
            const response = await api.get<PageableResponse<Article>>(
                `/articles?limit=3&sort=views,desc`,
            );
            const adaptedData = response.data.items.map((article) => ({
                ...article,
                createdAt: convertTimestamp(Number(article.createdAt)),
            }));
            return {
                ...response.data,
                items: adaptedData,
            };
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
