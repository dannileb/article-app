import { HTMLAttributes, PropsWithChildren } from 'react';
import classes from './Card.module.scss';
import classNames from 'classnames';

export interface CardProps
    extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    view?: 'default' | 'clear';
    width?: number | string;
}

export const Card = ({
    view = 'default',
    width,
    className,
    children,
    ...props
}: CardProps) => {
    return (
        <div
            className={classNames(
                classes.card,
                classes[view],
                { [classes.clickable]: !!props.onClick },
                className,
            )}
            style={{ width, ...props.style }}
            {...props}
        >
            {children}
        </div>
    );
};
