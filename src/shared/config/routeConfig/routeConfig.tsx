export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLE = 'article',
    ARTICLES = 'articles',

    NOT_FOUND = 'not_found',
    UNAUTHORIZED = 'unauthorized',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/:profileId',
    [AppRoutes.ARTICLE]: '/article/:articleId',
    [AppRoutes.ARTICLES]: '/articles',

    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.UNAUTHORIZED]: '/unauthorized',
};
