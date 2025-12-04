import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CommentItem } from './CommentItem';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';

const meta = {
    title: 'entities/CommentItem',
    component: CommentItem,
    tags: ['autodocs'],
    args: {
        comment: {
            id: '1',
            text: 'Comment text',
            author: {
                id: '1',
                username: 'User',
            },
            createdAt: '01.01.2020',
        },
        isAuthor: false,
        onAuthorClick: () => {
            alert('Author clicked');
        },
    },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Author: Story = {
    args: {
        isAuthor: true,
    },
};
