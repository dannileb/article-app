import { useTranslation } from 'react-i18next';
import { Button } from '#/shared/ui/Button/Button';
import classes from './LoginForm.module.scss';
import { Input } from '#/shared/ui/Input/Input';
import { memo, useCallback } from 'react';
import { loginActions } from '../../model/slice/loginSlice';
import { useAppDispatch, useAppSelector } from '#/shared/lib/hooks/reduxHooks';
import { getLoginForm } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { LoginOutlined } from '@ant-design/icons';
import { Text } from '#/shared/ui/Text/Text';
import { Heading } from '#/shared/ui/Heading/Heading';

interface LoginFormProps {
    onLogin: () => void;
}

const LoginFormInner = ({ onLogin }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const { username, password, error, isLoading } =
        useAppSelector(getLoginForm) ?? {};

    const handleChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const handleChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const handleLogin = useCallback(async () => {
        if (!username || !password) {
            return;
        }
        try {
            await dispatch(loginByUsername({ username, password })).unwrap();
            onLogin();
        } catch (error) {
            console.error('Login failed:', error);
        }
    }, [username, password, dispatch, onLogin]);

    return (
        <form
            className={classes.form}
            action={() => {
                return;
            }}
        >
            <Heading level={2} className={classes.title}>
                {t('loginForm_title')}
            </Heading>
            <Input
                label={t('loginForm_username-label')}
                placeholder={t('loginForm_username')}
                autoFocus={true}
                onChange={handleChangeUsername}
                value={username}
            />
            <Input
                type="password"
                autoComplete="current-password"
                label={t('loginForm_password-label')}
                placeholder={t('loginForm_password')}
                onChange={handleChangePassword}
                value={password}
            />
            {error && <Text view="error">{error}</Text>}
            <Button
                onClick={handleLogin}
                isLoading={isLoading}
                icon={<LoginOutlined />}
            >
                {t('loginForm_login')}
            </Button>
        </form>
    );
};

export const LoginForm = memo(LoginFormInner);
