import { routerConfig } from '#/app/providers/router/config';
import { RouterProvider } from 'react-router';

const AppRouter = () => {
    return <RouterProvider router={routerConfig} />;
};
export default AppRouter;
