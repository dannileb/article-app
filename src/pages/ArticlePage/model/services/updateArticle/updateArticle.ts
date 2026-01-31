import { createAsyncThunk } from '@reduxjs/toolkit';
import { processAsyncThunkError } from '#/shared/lib/redux/processAsyncThunkError';
import { ThunkConfig } from '#/shared/types/Redux';
import { getArticleData, getArticleForm } from '../../selectors';
import { Article } from '#/entities/Article';

export const updateArticle = createAsyncThunk<Article, undefined, ThunkConfig>(
    'article/updateArticle',
    async (_, { extra, rejectWithValue, getState }) => {
        const { api } = extra;
        try {
            const body = getArticleForm(getState());
            const id = getArticleData(getState())?.id;

            if (!body || id === undefined) {
                return rejectWithValue({
                    message: 'noBody',
                });
            }
            const response = await api.put<Article>(`/article/${id}`, body);
            return response.data;
        } catch (error: unknown) {
            return processAsyncThunkError(error, rejectWithValue);
        }
    },
);
