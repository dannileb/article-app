import { Outlet, useNavigation } from 'react-router';
import { NavBar } from '#/widgets/NavBar';
import { SideBar } from '#/widgets/SideBar';
import PageLoader from '#/widgets/PageLoader';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { getProfile } from '#/entities/User';

export const AppLayout = () => {
    const navigation = useNavigation();
    const isNavigating = navigation.state === 'loading';

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    return (
        <div className={'app'}>
            <Suspense fallback={<PageLoader fullscreen />}>
                <NavBar />
                <div className="content-page">
                    <SideBar />
                    <div className="page-wrapper">
                        <PageLoader show={isNavigating} />
                        <Outlet />
                    </div>
                </div>
            </Suspense>
        </div>
    );
};
