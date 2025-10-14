import type { Meta, StoryObj } from '@storybook/react';

import { NavBar } from './NavBar';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';

const Component = NavBar;

const meta = {
    title: 'widgets/NavBar',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [
        ReduxDecorator({
            user: {
                authData: {
                    username: 'admin',
                },
            },
        }),
    ],
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
