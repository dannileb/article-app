import { useMemo, useState } from 'react';
import classes from './SideBar.module.scss';
import classNames from 'classnames';
import { ThemeSwitcher } from '#/widgets/ThemeSwitcher';
import { LangSwitcher } from '#/widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from '#/shared/ui/Button/Button';
import {
    ContainerOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    LeftOutlined,
    RightOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { SideBarLink } from './SideBarLink/SideBarLink';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUser } from '#/entities/User';
import { generatePath } from 'react-router';

export const SideBar = () => {
    const { t } = useTranslation('translation');
    const { authData } = useAppSelector(getUser);

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const sidebarLinks = useMemo(() => {
        const baseLinks = [
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
            {
                text: t('navBarLabel-articles'),
                to: RoutePath.articles,
                icon: <ContainerOutlined />,
            },
        ];
        if (authData) {
            baseLinks.push({
                text: t('navBarLabel-profile'),
                to: generatePath(RoutePath.profile, { profileId: authData.id }),
                icon: <UserOutlined />,
            });
        }
        return baseLinks;
    }, [authData, t]);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <aside
            data-testid="sidebar"
            className={classNames(classes.sidebar, {
                [classes.collapsed]: collapsed,
            })}
        >
            <div className={classes.contentContainer}>
                <nav className={classes.content}>
                    {sidebarLinks.map((link, index) => {
                        return (
                            <SideBarLink
                                key={index}
                                link={link}
                                collapsed={collapsed}
                            />
                        );
                    })}
                </nav>
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
        </aside>
    );
};
