export const getArticlesListPage = (state: StateSchema) =>
    state.articlesList?.currentPage ?? 1;
