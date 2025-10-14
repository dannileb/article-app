import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button } from './Button';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { EditOutlined } from '@ant-design/icons';

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
        children: 'Кнопка',
        view: 'primary',
        form: 'default',
        disabled: false,
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightWithIcon: Story = {
    args: {
        icon: <EditOutlined />,
    },
};
export const DarkWithIcon: Story = {
    args: {
        icon: <EditOutlined />,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const LightDisabled: Story = {
    args: {
        disabled: true,
    },
};

export const DarkDisabled: Story = {
    args: {
        disabled: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
