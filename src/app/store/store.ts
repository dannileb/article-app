import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
