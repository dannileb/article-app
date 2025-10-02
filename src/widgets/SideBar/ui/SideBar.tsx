import { useMemo, useState } from 'react';
import classes from './SideBar.module.scss';
import classNames from 'classnames';
import { ThemeSwitcher } from '#/widgets/ThemeSwitcher';
import { LangSwitcher } from '#/widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from '#/shared/ui/Button/Button';
import {
    HomeOutlined,
    InfoCircleOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { AppLink } from '#/shared/ui/AppLink/AppLink';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { matchPath } from 'react-router';

export const SideBar = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const sidebarLinks = useMemo(
        () => [
            {
                text: t('navBarLabel-main'),
                to: RoutePath.main,
                icon: <HomeOutlined />,
            },
            {
                text: t('navBarLabel-about'),
                to: RoutePath.about,
                icon: <InfoCircleOutlined />,
            },
        ],
        [t],
    );

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    return (
        <div
            data-testid="sidebar"
            className={classNames(classes.sidebar, {
                [classes.collapsed]: collapsed,
            })}
        >
            <div className={classes.contentContainer}>
                <div className={classes.content}>
                    {sidebarLinks.map((link, index) => {
                        return (
                            <AppLink
                                key={index}
                                to={link.to}
                                className={classes.link}
                                view={
                                    matchPath(link.to, pathname)
                                        ? 'active'
                                        : 'secondary'
                                }
                                title={link.text}
                            >
                                {collapsed ? link.icon : link.text}
                            </AppLink>
                        );
                    })}
                </div>
                <div className={classes.switchers}>
                    <ThemeSwitcher />
                    <LangSwitcher shortened={collapsed} />
                </div>
            </div>
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                className={classes.toggleButton}
                view="compact"
            ></Button>
        </div>
    );
};
