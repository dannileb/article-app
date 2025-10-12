import classNames from 'classnames';
import classes from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '#/shared/ui/Button/Button';
import { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { LoginModal } from '#/features/AuthByUsername';

export const NavBar = () => {
    const { t } = useTranslation();
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

    return (
        <div className={classNames(classes.navbar)}>
            <div className={classes.title}>{t('header_title')}</div>
            <Button
                icon={<LoginOutlined />}
                onClick={() => {
                    setLoginModalOpen(true);
                }}
            />
            <LoginModal
                isOpen={loginModalOpen}
                onClickOutside={() => {
                    setLoginModalOpen(false);
                }}
            >
                <p>{t('loginModal_heading')}</p>
            </LoginModal>
        </div>
    );
};
