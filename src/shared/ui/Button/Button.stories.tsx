import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button } from './Button';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        view: {
            options: ['clear', 'primary', 'secondary'],
        },
        form: {
            options: ['default', 'brick', 'rounded'],
        },
        disabled: { control: { type: 'boolean' } },
    },
    args: {
        view: 'primary',
        form: 'default',
        disabled: false,
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {
        children: 'Кнопка',
    },
};
export const Dark: Story = {
    args: {
        children: 'Кнопка',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
