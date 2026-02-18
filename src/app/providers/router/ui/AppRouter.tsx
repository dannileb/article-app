import { routerConfig } from '../config';
import { RouterProvider } from 'react-router';

const AppRouter = () => {
    return <RouterProvider router={routerConfig} />;
};
export default AppRouter;
