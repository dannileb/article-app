import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';

export interface ButtonProps
    extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    view?: 'clear' | 'primary' | 'secondary' | 'compact';
    form?: 'default' | 'brick' | 'rounded';
    icon?: React.ReactNode;
}

export const Button = ({
    children,
    className,
    view = 'primary',
    form = 'default',
    disabled = false,
    icon,
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props}
            className={classNames(
                classes.button,
                classes[form],
                classes[view],
                {
                    [classes.disabled]: disabled,
                },
                className,
            )}
        >
            <div className={classes.buttonIconContainer}>{icon}</div>
            {children}
        </button>
    );
};
