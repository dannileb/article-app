import { useTranslation } from 'react-i18next';
import { Button } from '#/shared/ui/Button/Button';
import classes from './LoginForm.module.scss';
import { Input } from '#/shared/ui/Input/Input';
import { useState } from 'react';

export const LoginForm = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<string>('');

    return (
        <div className={classes.form}>
            <Input
                value={value}
                onChange={setValue}
                label={t('loginForm_username-label')}
                placeholder={t('loginForm_username')}
                autoFocus={true}
            />
            <Input
                type="password"
                label={t('loginForm_password-label')}
                placeholder={t('loginForm_password')}
            />
            <Button>{t('loginForm_login')}</Button>
        </div>
    );
};
