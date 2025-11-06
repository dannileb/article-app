import { HTMLAttributes, createElement } from 'react';
import classNames from 'classnames';
import classes from './Heading.module.scss';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    view?: 'primary' | 'secondary';
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({
    children,
    view = 'primary',
    level = 1,
    className,
    ...props
}: HeadingProps) => {
    return createElement(
        `h${level}`,
        {
            ...props,
            className: classNames(classes.heading, classes[view], className),
        },
        children,
    );
};
