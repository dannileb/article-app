import { AppLayout } from '#/app/AppLayout';
import NotFoundPage from '#/pages/NotFoundPage';
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
                path: RoutePath.not_found,
                Component: NotFoundPage,
            },
        ],
    },
]);
