import { updateArticle } from '../services/updateArticle/updateArticle';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleBlockType, ArticleSchema } from '../types/article.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userActions } from '#/entities/User';

const initialState: ArticleSchema = {
    isLoading: false,
    readonly: true,
    isEditing: false,
};

// TODO: написать тесты
export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = state.data;
            state.updateError = undefined;
            state.isEditing = false;
        },
        setArticleTitle: (state, action: PayloadAction<string>) => {
            if (state.form) {
                state.form.title = action.payload;
            }
        },
        addArtcileTag: (state, action: PayloadAction<string>) => {
            if (state.form) {
                state.form.tags.push(action.payload);
            }
        },
        deleteArtcileTag: (state, action: PayloadAction<string>) => {
            if (state.form) {
                state.form.tags = state.form.tags.filter(
                    (tag) => tag !== action.payload,
                );
            }
        },
        addArticleBlock: (state, action: PayloadAction<ArticleBlockType>) => {
            if (state.form) {
                const newBlock = {
                    type: action.payload,
                    title: '',
                    blockContent: '',
                };
                state.form.content.push(newBlock);
            }
        },
        deleteArticleBlock: (state, action: PayloadAction<number>) => {
            if (state.form) {
                state.form.content.splice(action.payload, 1);
            }
        },
        setBlockTitle: (
            state,
            action: PayloadAction<{ index: number; title: string }>,
        ) => {
            if (state.form) {
                const newContent = state.form.content.map((block, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...block,
                            title: action.payload.title,
                        };
                    }
                    return block;
                });
                state.form.content = newContent;
            }
        },
        setBlockContent: (
            state,
            action: PayloadAction<{ index: number; content: string }>,
        ) => {
            if (state.form) {
                const newContent = state.form.content.map((block, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...block,
                            blockContent: action.payload.content,
                        };
                    }
                    return block;
                });
                state.form.content = newContent;
            }
        },
        edit: (state) => {
            state.isEditing = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchArticleById
            .addCase(fetchArticleById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
                state.form = action.payload.data;
                state.readonly = action.payload.readonly;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            // updateArticle
            .addCase(updateArticle.pending, (state) => {
                state.isUpdateLoading = true;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.isUpdateLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.isEditing = false;
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.isUpdateLoading = false;
                state.updateError = action.payload?.message;
                state.isEditing = false;
            })
            // handleLogout
            .addCase(userActions.logout, (state) => {
                state.form = state.data;
                state.updateError = undefined;
                state.isEditing = false;
            });
    },
});

export const { actions: articleActions, reducer: articleReducer } =
    articleSlice;
