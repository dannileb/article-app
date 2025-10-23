import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { DndInput } from './DndInput';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'shared/DndInput',
    component: DndInput,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof DndInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
