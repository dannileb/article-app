import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Toggle } from './Toggle';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'shared/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    args: {
        items: [
            { key: '1', label: 'Item 1' },
            { key: '2', label: 'Item 2' },
        ],
        toggledKey: '1',
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
