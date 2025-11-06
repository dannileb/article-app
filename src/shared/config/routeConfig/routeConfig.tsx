export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'article',

    NOT_FOUND = 'not_found',
    UNAUTHORIZED = 'unauthorized',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/:profileId',
    [AppRoutes.ARTICLES]: '/article/:articleId',

    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.UNAUTHORIZED]: '/unauthorized',
};
