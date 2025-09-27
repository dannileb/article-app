import type { Meta, StoryObj } from '@storybook/react';

import NotFoundPage from './NotFoundPage';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/app/providers/ThemeProvider';

const Component = NotFoundPage;

const meta = {
    title: 'pages/NotFoundPage',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
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
