import { Theme } from '#/shared/config/theme/ThemeContext';
import classNames from 'classnames';
import { forwardRef } from 'react';
import classes from './ThemeWrapper.module.scss';

export interface ThemeWrapperProps
    extends React.HTMLAttributes<HTMLDivElement> {
    theme: Theme;
}

export const ThemeWrapper = forwardRef<HTMLDivElement, ThemeWrapperProps>(
    ({ className, children, theme, ...props }, ref) => {
        return (
            <div
                {...props}
                ref={ref}
                className={classNames(className, classes.themeWrapper)}
                data-theme={theme}
            >
                {children}
            </div>
        );
    },
);
