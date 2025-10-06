import type { Meta, StoryObj } from '@storybook/react';

import { CatchedError } from './CatchedError';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const Component = CatchedError;

const meta = {
    title: 'widgets/CatchedError',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: { error: new Error('Текст ошибки') },
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
