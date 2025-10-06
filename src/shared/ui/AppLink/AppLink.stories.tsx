import type { Meta, StoryObj } from '@storybook/react';

import { AppLink } from './AppLink';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const Component = AppLink;

const meta = {
    title: 'shared/AppLink',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: { to: '/', children: 'Ссылка' },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};
export const LightActive: Story = {
    args: {
        view: 'active',
    },
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const DarkActive: Story = {
    args: {
        view: 'active',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
