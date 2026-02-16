export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
    !!state.articlePage?.recommendations.isLoading;

export const getArticleRecommendationsError = (state: StateSchema) =>
    state.articlePage?.recommendations?.error;
