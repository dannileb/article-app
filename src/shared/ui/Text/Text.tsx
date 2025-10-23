import { HTMLAttributes } from 'react';
import classes from './Text.module.scss';
import classNames from 'classnames';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    view?: 'primary' | 'secondary' | 'error';
    size?: 's' | 'm' | 'l';
    align?: 'left' | 'center' | 'right';
}

export const Text = ({
    children,
    view = 'primary',
    size = 'm',
    align = 'left',
    ...props
}: TextProps) => {
    return (
        <p
            {...props}
            className={classNames(
                classes.text,
                classes[view],
                classes[`size_${size}`],
                classes[`align_${align}`],
                props.className,
            )}
        >
            {children}
        </p>
    );
};
