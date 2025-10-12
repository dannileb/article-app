import { FC } from 'react';
import { ThemeWrapper } from '#/shared/ui/ThemeWrapper';
import { Theme } from '#/shared/config/theme/ThemeContext';

export const ThemeDecorator = (theme: Theme) => (Story: FC) =>
    (
        <ThemeWrapper theme={theme} className="app" style={{ padding: '8px' }}>
            <Story />
        </ThemeWrapper>
    );
