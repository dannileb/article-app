import { Outlet, useNavigation } from 'react-router';
import { NavBar } from '#/widgets/NavBar';
import { useTheme } from '#/app/providers/ThemeProvider';
import classNames from 'classnames';
import { SideBar } from '#/widgets/SideBar';
import PageLoader from '#/widgets/PageLoader';
import { Suspense } from 'react';

export const AppLayout = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const isNavigating = navigation.state === 'loading';

    return (
        <div className={classNames('app', theme)}>
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
