import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertTimestamp } from '#/shared/lib/date';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';
import { Article } from '#/entities/Article';

export const fetchNextArticlesListPage = createAsyncThunk<
    PageableResponse<Article>,
    undefined,
    ThunkConfig
>(
    'articlesList/fetchNextArticlesListPage',
    async (_, { extra, rejectWithValue, getState }) => {
        const { api } = extra;
        const { articlesList } = getState();
        try {
            const page = articlesList?.currentPage ?? 1;
            const response = await api.get<PageableResponse<Article>>(
                `/articles?page=${page}`,
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
