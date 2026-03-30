import classNames from 'classnames';
import classes from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '#/shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { LoginModal } from '#/features/AuthByUsername';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getUser, userActions } from '#/entities/User';
import { Text } from '#/shared/ui/Text/Text';
import { Heading } from '#/shared/ui/Heading/Heading';
import { NotificationsButton } from '#/entities/Notification';

export const NavBar = () => {
    const { authData } = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

    const handleLogin = useCallback(() => {
        setLoginModalOpen(false);
    }, []);

    return (
        <div className={classNames(classes.navbar)}>
            <Heading level={3} className={classes.title}>
                {t('header_title')}
            </Heading>
            <div className={classes.rightSide}>
                <NotificationsButton />
                <div className={classes.userContainer}>
                    <Text className={classes.user}>
                        {authData?.username
                            ? `@${authData.username}`
                            : t('header_login_text')}
                    </Text>
                    <Button
                        icon={authData ? <LogoutOutlined /> : <LoginOutlined />}
                        onClick={() => {
                            if (authData) {
                                dispatch(userActions.logout());
                            } else {
                                setLoginModalOpen(true);
                            }
                        }}
                        data-testid={
                            authData
                                ? 'NavBar.LogoutButton'
                                : 'NavBar.LoginButton'
                        }
                    />
                </div>
            </div>
            <LoginModal
                isOpen={loginModalOpen}
                onLogin={handleLogin}
                onClickOutside={() => {
                    setLoginModalOpen(false);
                }}
            />
        </div>
    );
};
