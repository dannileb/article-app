import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        view: { options: ['clear', 'primary', 'secondary'] },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Кнопка',
    },
};

export const Clear: Story = {
    args: {
        view: 'clear',
        children: 'Кнопка',
    },
};

export const Secondary: Story = {
    args: {
        view: 'secondary',
        children: 'Кнопка',
    },
};
