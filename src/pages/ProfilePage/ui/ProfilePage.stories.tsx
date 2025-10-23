import type { Meta, StoryObj } from '@storybook/react';

import ProfilePage from './ProfilePage';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';
import { profileReducer } from '../model/slice/profileSlice';

const Component = ProfilePage;

const meta = {
    title: 'pages/ProfilePage',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: undefined,
            },
            { profile: profileReducer },
        ),
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
