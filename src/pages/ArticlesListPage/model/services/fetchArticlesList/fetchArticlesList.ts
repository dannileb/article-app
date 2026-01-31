import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticlesListResponse } from '../../types/articlesList.types';
import { convertTimestamp } from '#/shared/lib/date';
import { PageableResponse } from '#/shared/types/Axios/Axios.types';
import { Article } from '#/entities/Article';

export const fetchArticlesList = createAsyncThunk<
    ArticlesListResponse,
    undefined,
    ThunkConfig
>('articlePage/fetchArticleComments', async (_, { extra, rejectWithValue }) => {
    const { api } = extra;
    try {
        const response = await api.get<PageableResponse<Article>>(`/articles`);
        const adaptedData = response.data.items.map((article) => ({
            ...article,
            createdAt: convertTimestamp(Number(article.createdAt)),
        }));
        return adaptedData;
    } catch (error: unknown) {
        return processAsyncThunkError(error, rejectWithValue);
    }
});
