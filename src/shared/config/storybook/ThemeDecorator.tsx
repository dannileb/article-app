import { FC } from 'react';
import { Theme } from '../../../app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: FC) =>
    (
        <div className={`app ${theme}`}>
            <Story />
        </div>
    );
