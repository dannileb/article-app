import { Article } from '#/entities/Article';
import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    ArticlesListSchema,
    ArticlesListView,
    ArticleSortValue,
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

const ARTICLE_SORT_VALUES: readonly ArticleSortValue[] = [
    'latest',
    'oldest',
    'popular',
    'default',
] as const;

export function isArticleSortValue(value: unknown): value is ArticleSortValue {
    return (
        typeof value === 'string' &&
        ARTICLE_SORT_VALUES.includes(value as ArticleSortValue)
    );
}

export const articlesListPageSlice = createSlice({
    name: 'articlesList',
    initialState,
    reducers: {
        toggleView: (state) => {
            state.view = state.view === 'grid' ? 'list' : 'grid';
            localStorage.setItem(ARTICLES_LIST_VIEW_KEY, state.view);
        },
        initState: (
            state,
            {
                payload: params,
            }: PayloadAction<
                | {
                      sort?: string;
                      searchKey?: string;
                  }
                | undefined
            >,
        ) => {
            const { sort, searchKey } = params ?? {};
            if (isArticleSortValue(sort)) {
                state.sort = sort;
            }
            console.debug(searchKey);
            state.searchKey = searchKey;
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
        resetCurrentPage: (state) => {
            state.currentPage = 1;
        },
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload;
        },
        setSortParams: (state, action: PayloadAction<ArticleSortValue>) => {
            state.sort = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNextArticlesListPage.pending, (state, action) => {
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    adapter.removeAll(state);
                }
            })
            .addCase(fetchNextArticlesListPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lastPage = action.payload.lastPage;
                if (action.meta.arg.replace) {
                    adapter.setAll(state, action.payload.items);
                } else {
                    adapter.addMany(state, action.payload.items);
                }
            })
            .addCase(fetchNextArticlesListPage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { actions: articlesListActions, reducer: articlesListReducer } =
    articlesListPageSlice;
