import type { Meta, StoryObj } from '@storybook/react';

import { AppLink } from './AppLink';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/app/providers/ThemeProvider';

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

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
