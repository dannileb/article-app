import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Tag } from './Tag';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'shared/Tag',
    component: Tag,
    tags: ['autodocs'],
    args: {
        children: 'Tag',
        style: {
            alignSelf: 'flex-start',
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DefaultDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const deletable: Story = {
    args: {
        deletable: true,
    },
};
