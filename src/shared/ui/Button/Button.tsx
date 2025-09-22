import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';

export interface ButtonProps
    extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    view?: 'clear' | 'primary';
}

export const Button = ({
    children,
    className,
    view = 'primary',
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props}
            className={classNames(classes.button, className, classes[view])}
        >
            {children}
        </button>
    );
};
