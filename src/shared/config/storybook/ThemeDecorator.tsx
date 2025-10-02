import { FC } from 'react';
import { Theme, ThemeProvider } from '../../../app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: FC) =>
    (
        <ThemeProvider theme={theme} className="app">
            <Story />
        </ThemeProvider>
    );
