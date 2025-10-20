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
    UserOutlined,
} from '@ant-design/icons';
import { RoutePath } from '#/shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { SideBarLink } from '#/widgets/SideBar/ui/SideBarLink/SideBarLink';
import { useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUser } from '#/entities/User';

export const SideBar = () => {
    const { t } = useTranslation();
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
        ];
        if (authData) {
            baseLinks.push({
                text: t('navBarLabel-profile'),
                to: RoutePath.profile,
                icon: <UserOutlined />,
            });
        }
        return baseLinks;
    }, [authData, t]);

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
                            <SideBarLink
                                key={index}
                                link={link}
                                collapsed={collapsed}
                            />
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
