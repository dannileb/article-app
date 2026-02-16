import { articleCommentsReducer } from './articleCommentSlice';
import { articleRecommendationsReducer } from './articleRecommendationsSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const articlePageReducer = combineReducers({
    comments: articleCommentsReducer,
    recommendations: articleRecommendationsReducer,
});
