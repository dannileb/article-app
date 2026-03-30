import { AppLayout } from '#/app/AppLayout';
import { PrivateRoutes } from './ui/PrivateRoutes';
import NotFoundPage from '#/pages/NotFoundPage';
import UnauthorizedPage from '#/pages/UnauthorizedPage';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { createBrowserRouter, redirect } from 'react-router';

export const routerConfig = createBrowserRouter([
    {
        path: RoutePath.main,
        Component: AppLayout,
        children: [
            {
                index: true,
                loader: () => redirect(RoutePath.articles),
            },
            {
                path: RoutePath.about,
                lazy: () => import('#/pages/AboutPage'),
            },
            {
                path: RoutePath.profile,
                lazy: () => import('#/pages/ProfilePage'),
            },
            {
                path: RoutePath.article,
                lazy: () => import('#/pages/ArticlePage'),
            },
            {
                path: RoutePath.articles,
                lazy: () => import('#/pages/ArticlesListPage'),
            },
            {
                Component: PrivateRoutes,
            },
            {
                path: RoutePath.not_found,
                Component: NotFoundPage,
            },
            {
                path: RoutePath.unauthorized,
                Component: UnauthorizedPage,
            },
        ],
    },
]);
