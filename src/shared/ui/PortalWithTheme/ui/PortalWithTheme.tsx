import {
    ThemeWrapper,
    ThemeWrapperProps,
} from '#/shared/ui/ThemeWrapper/ui/ThemeWrapper';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalWithThemeProps
    extends React.PropsWithChildren<ThemeWrapperProps> {
    htmlElement?: HTMLElement;
}

export const PortalWithTheme = forwardRef<HTMLDivElement, PortalWithThemeProps>(
    ({ children, htmlElement = document.body, ...themeProps }, ref) => {
        return createPortal(
            <ThemeWrapper {...themeProps} ref={ref}>
                {children}
            </ThemeWrapper>,
            htmlElement,
        );
    },
);
