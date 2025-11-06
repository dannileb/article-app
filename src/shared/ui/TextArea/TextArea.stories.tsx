import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { TextArea } from './TextArea';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ThemeDecorator } from '#/shared/config/storybook';

const meta = {
    title: 'shared/TextArea',
    component: TextArea,
    tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
