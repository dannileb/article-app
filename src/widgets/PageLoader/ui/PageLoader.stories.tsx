import type { Meta, StoryObj } from '@storybook/react';

import { PageLoader } from './PageLoader';
import { Theme } from '#/app/providers/ThemeProvider';
import { ThemeDecorator } from '#/shared/config/storybook';

const Component = PageLoader;

const meta = {
    title: 'widgets/PageLoader',
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
