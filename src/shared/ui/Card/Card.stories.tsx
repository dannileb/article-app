import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Card } from './Card';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'shared/Card',
    component: Card,
    tags: ['autodocs'],
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Card content',
    },
};

export const clear: Story = {
    args: {
        view: 'clear',
        children: 'Card content',
    },
};
