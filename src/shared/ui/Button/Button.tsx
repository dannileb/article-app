import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

export interface ButtonProps
    extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    view?: 'clear' | 'primary' | 'secondary' | 'compact';
    form?: 'default' | 'brick' | 'rounded';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
}

export const Button = ({
    children,
    className,
    view = 'primary',
    form = 'default',
    disabled,
    isLoading,
    icon,
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={classNames(
                classes.button,
                classes[form],
                classes[view],
                className,
            )}
        >
            <div className={classes.buttonIconContainer}>
                {isLoading ? <LoadingOutlined /> : icon}
            </div>
            {children}
        </button>
    );
};
