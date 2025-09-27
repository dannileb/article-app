import type { Preview } from '@storybook/react-webpack5';
import '#/app/styles/index.scss';
import {
    ThemeDecorator,
    RouterDecorator,
} from '../../src/shared/config/storybook';
import { Theme } from '../../src/app/providers/ThemeProvider';

const preview: Preview = {
    decorators: [RouterDecorator, ThemeDecorator(Theme.LIGHT)],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
