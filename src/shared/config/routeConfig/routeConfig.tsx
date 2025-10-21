export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUNT = 'not_found',
    PROFILE = 'profile',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/:profileId',
    [AppRoutes.NOT_FOUNT]: '*',
};
