import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CommentsList from './CommentsList';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';
import { commentsApi } from '../../api/commentsApi';

const meta = {
    title: 'features/Comments',
    component: CommentsList,
    tags: ['autodocs'],
    args: {
        entityId: '1',
        entityType: 'article',
    },
    decorators: [
        ReduxDecorator(
            {
                user: {
                    isAuthenticated: true,
                },
            },
            undefined,
            [
                {
                    api: commentsApi,
                    endpoint: 'getComments',
                    args: { entityType: 'article', entityId: '1' },
                    data: {
                        totalCount: 2,
                        data: [
                            {
                                id: '1',
                                text: 'Comment text',
                                author: {
                                    id: '1',
                                    username: 'User',
                                },
                                createdAt: '01.01.2020',
                            },
                            {
                                id: '1',
                                text: 'Comment text',
                                author: {
                                    id: '1',
                                    username: 'User',
                                },
                                createdAt: '01.01.2020',
                            },
                        ],
                    },
                },
            ],
        ),
    ],
} satisfies Meta<typeof CommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
