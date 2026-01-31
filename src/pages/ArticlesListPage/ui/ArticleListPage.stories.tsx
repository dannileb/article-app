import type { Meta, StoryObj } from '@storybook/react';

import ArticlesListPage from './ArticlesListPage';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';
import { Article } from '#/entities/Article';
import { articlesListReducer } from '../model/slices/articlesPageSlice';

const Component = ArticlesListPage;

const mockArticle: Article = {
    id: '1',
    title: 'Article 1',
    preview: '#',
    description: 'Description 1',
    tags: ['tag1', 'tag2'],
    createdAt: '2020-01-01',
    content: [],
    author: {
        id: '1',
        username: 'username',
        photo: '#',
    },
};

const meta = {
    title: 'pages/ArticlesListPage',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {
    decorators: [
        ReduxDecorator(
            {
                articlesList: {
                    view: 'grid',
                    ids: ['1', '2', '3'],
                    entities: {
                        '1': mockArticle,
                        '2': mockArticle,
                        '3': mockArticle,
                    },
                },
            },
            { articlesList: articlesListReducer },
        ),
    ],
};

export const List: Story = {
    decorators: [
        ReduxDecorator(
            {
                articlesList: {
                    view: 'list',
                    ids: ['1', '2', '3'],
                    entities: {
                        '1': mockArticle,
                        '2': mockArticle,
                        '3': mockArticle,
                    },
                },
            },
            { articlesList: articlesListReducer },
        ),
    ],
};
