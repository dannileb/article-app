import { Article } from '#/entities/Article';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    ArticlesListSchema,
    ArticlesListView,
} from '../types/articlesList.types';
import { ARTICLES_LIST_VIEW_KEY } from '#/shared/consts/localStorage';
import { fetchNextArticlesListPage } from '../services/fetchNextArticlesListPage/fetchNextArticlesListPage';

const adapter = createEntityAdapter<Article>();

const initialState = adapter.getInitialState<ArticlesListSchema>({
    isLoading: false,
    error: undefined,
    totalCount: undefined,
    currentPage: 1,
    lastPage: false,
    ids: [],
    entities: {},
    view: 'grid',
});

export const getArticles = adapter.getSelectors<StateSchema>(
    (state) => state.articlesList || initialState,
);

function assertLocalStorageArticleView(
    view: string | null,
): asserts view is ArticlesListView {
    if (view !== 'grid' && view !== 'list') {
        throw new Error('Invalid view');
    }
}

export const articlesListPageSlice = createSlice({
    name: 'articlesList',
    initialState,
    reducers: {
        toggleView: (state) => {
            state.view = state.view === 'grid' ? 'list' : 'grid';
            localStorage.setItem(ARTICLES_LIST_VIEW_KEY, state.view);
        },
        initState: (state) => {
            try {
                const view = localStorage.getItem(ARTICLES_LIST_VIEW_KEY);
                assertLocalStorageArticleView(view);
                state.view = view;
            } catch {
                state.view = 'grid';
            }
            state._inited = true;
        },
        addCurrentPage: (state) => {
            if (state.currentPage) {
                state.currentPage += 1;
            } else {
                state.currentPage = 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNextArticlesListPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNextArticlesListPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lastPage = action.payload.lastPage;
                adapter.addMany(state, action.payload.items);
            })
            .addCase(fetchNextArticlesListPage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { actions: articlesListActions, reducer: articlesListReducer } =
    articlesListPageSlice;
