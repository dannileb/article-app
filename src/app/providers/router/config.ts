import { AppLayout } from '#/app/AppLayout';
import { PrivateRoutes } from '#/app/providers/router/ui/PrivateRoutes';
import NotFoundPage from '#/pages/NotFoundPage';
import UnauthorizedPage from '#/pages/UnauthorizedPage';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { createBrowserRouter } from 'react-router';

export const routerConfig = createBrowserRouter([
    {
        path: RoutePath.main,
        Component: AppLayout,
        children: [
            {
                index: true,
                lazy: () => import('#/pages/MainPage'),
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
