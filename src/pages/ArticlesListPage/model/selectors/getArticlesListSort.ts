export const getArticlesListSort = (state: StateSchema) =>
    state.articlesList?.sort ?? 'default';
