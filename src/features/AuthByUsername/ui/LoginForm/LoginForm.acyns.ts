import { LoginFormProps } from './LoginForm';
import { FC, lazy } from 'react';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () => import('./LoginForm'),
);
