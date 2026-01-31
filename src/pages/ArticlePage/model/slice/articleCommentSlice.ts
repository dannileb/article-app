import { CommentType } from '#/entities/Comment';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';
import { ArticleCommentsSchema } from '../types/articleComments.types';
import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

const adapter = createEntityAdapter<CommentType>();

const initialState = adapter.getInitialState<ArticleCommentsSchema>({
    isLoading: false,
    error: undefined,
    totalCount: 0,
    ids: [],
    entities: {},
});

export const getArticleComments = adapter.getSelectors<StateSchema>(
    (state) => state.articleComments || initialState,
);

export const articleCommentsSlice = createSlice({
    name: 'articleComments',
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<CommentType>) {
            const entity = action.payload;
            const id = entity.id;

            if (state.entities[id]) return;

            state.ids.unshift(id);
            state.entities[id] = entity;
            state.totalCount = state.totalCount ? state.totalCount + 1 : 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArticleComments.fulfilled, (state, action) => {
                state.isLoading = false;
                adapter.setAll(state, action.payload.data);
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchArticleComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    },
});
export const {
    actions: articleCommentsActions,
    reducer: articleCommentsReducer,
} = articleCommentsSlice;
