import type { Meta, StoryObj } from '@storybook/react';

import ArticlePage from './ArticlePage';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';
import { articleReducer } from '../model/slice/articleSlice';
import { Article, ArticleBase } from '../model/types/article.types';

const Component = ArticlePage;

const mockAuthor: Article['author'] = {
    id: '1',
    username: 'test',
    photo: 'test',
};
const mockArticleForm: ArticleBase = {
    title: 'Test Article',
    content: [],
    tags: ['test'],
};
const mockArticle: Article = {
    id: 'test_id',
    createdAt: '2022-01-01',
    author: mockAuthor,
    ...mockArticleForm,
};
const meta = {
    title: 'pages/ArticlePage',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                article: {
                    data: mockArticle,
                    form: mockArticleForm,
                    isLoading: false,
                    error: undefined,
                    readonly: true,
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: false,
                },
            },
            { article: articleReducer },
        ),
    ],
};

export const Loading: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                article: {
                    data: undefined,
                    form: undefined,
                    isLoading: true,
                    readonly: true,
                },
            },
            { article: articleReducer },
        ),
    ],
};

export const Editable: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                article: {
                    data: mockArticle,
                    form: mockArticleForm,
                    isLoading: false,
                    error: undefined,
                    readonly: false,
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: false,
                },
            },
            { article: articleReducer },
        ),
    ],
};

export const Editing: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                article: {
                    data: mockArticle,
                    form: mockArticleForm,
                    isLoading: false,
                    error: undefined,
                    readonly: false,
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: true,
                },
            },
            { article: articleReducer },
        ),
    ],
};

export const Error: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                article: {
                    data: undefined,
                    form: undefined,
                    isLoading: false,
                    error: 'Сообщение об ошибке',
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: false,
                    readonly: true,
                },
            },
            { article: articleReducer },
        ),
    ],
};

export const ErrorUpdate: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                article: {
                    data: mockArticle,
                    form: mockArticleForm,
                    isLoading: false,
                    error: undefined,
                    isUpdateLoading: false,
                    updateError: 'Сообщение об ошибке',
                    isEditing: true,
                },
            },
            { article: articleReducer },
        ),
    ],
};
