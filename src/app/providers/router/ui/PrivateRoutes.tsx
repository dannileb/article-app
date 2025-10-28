import { Outlet } from 'react-router';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUserIsAuth } from '#/entities/User';
import UnauthorizedPage from '#/pages/UnauthorizedPage';

export const PrivateRoutes = () => {
    const isAuth = useAppSelector(getUserIsAuth);

    if (!isAuth) {
        return <UnauthorizedPage />;
    }

    return <Outlet />;
};
