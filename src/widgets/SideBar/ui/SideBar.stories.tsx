import type { Meta, StoryObj } from '@storybook/react';

import { SideBar } from './SideBar';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';

const Component = SideBar;

const meta = {
    title: 'widgets/SideBar',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [
        ReduxDecorator({
            user: {
                authData: undefined,
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

export const LightWithProfile: Story = {
    args: {},
    decorators: [
        ReduxDecorator({
            user: {
                authData: {
                    id: 1,
                    username: 'admin',
                },
            },
        }),
    ],
};
