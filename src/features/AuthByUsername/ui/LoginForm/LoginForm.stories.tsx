import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { LoginForm } from './LoginForm';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    args: {
        onLogin: () => {
            return;
        },
    },
    decorators: [
        ReduxDecorator({
            login: {
                isLoading: false,
                error: '',
                username: '',
                password: '',
            },
        }),
    ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
