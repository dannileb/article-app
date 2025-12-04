import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Input } from './Input';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'shared/Input',
    component: Input,
    tags: ['autodocs'],
    args: {
        label: 'Поле ввода',
        placeholder: 'Введите текст',
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const LightPassword: Story = {
    args: {
        type: 'password',
    },
};
export const DarkPassword: Story = {
    args: {
        type: 'password',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const WithActionButton: Story = {
    args: {
        withActionButton: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
