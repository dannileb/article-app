import { Article } from '#/entities/Article';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticleRecommendationsSchema } from '../types/articleRecommendations.types';
import { fetchArticleRecommendations } from '../services/fetchArticlesRecommendations/fetchArticleRecommendations';

const adapter = createEntityAdapter<Article>();

const initialState = adapter.getInitialState<ArticleRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
});

export const getArticleRecommendations = adapter.getSelectors<StateSchema>(
    (state) => state.articlePage?.recommendations || initialState,
);

export const articleRecommendationsSlice = createSlice({
    name: 'articleRecommendations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                adapter.setAll(state, action.payload.items);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    },
});

export const {
    actions: articleRecommendationsActions,
    reducer: articleRecommendationsReducer,
} = articleRecommendationsSlice;
