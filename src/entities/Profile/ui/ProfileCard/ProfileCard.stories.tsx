import type { Meta, StoryObj } from '@storybook/react';

import { ProfileCard } from './ProfileCard';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';
import { profileReducer } from '#/entities/Profile';

const mockUser = {
    id: '1',
    username: 'TestUsername',
    name: 'Тест',
    surname: 'Тестовый',
    photo: '#',
    age: 64,
    country: 'Страна',
    city: 'Город',
    currency: 'COP',
};

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        profileId: undefined,
    },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: {
                    data: mockUser,
                    form: mockUser,
                    isLoading: false,
                    error: undefined,
                    readonly: true,
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: false,
                },
            },
            { profile: profileReducer },
        ),
    ],
};

export const Loading: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: {
                    data: undefined,
                    form: undefined,
                    isLoading: true,
                    readonly: true,
                },
            },
            { profile: profileReducer },
        ),
    ],
};

export const Editable: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: {
                    data: mockUser,
                    form: mockUser,
                    isLoading: false,
                    error: undefined,
                    readonly: false,
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: false,
                },
            },
            { profile: profileReducer },
        ),
    ],
};

export const Editing: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: {
                    data: mockUser,
                    form: mockUser,
                    isLoading: false,
                    error: undefined,
                    readonly: false,
                    isUpdateLoading: false,
                    updateError: undefined,
                    isEditing: true,
                },
            },
            { profile: profileReducer },
        ),
    ],
};

export const Error: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: {
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
            { profile: profileReducer },
        ),
    ],
};

export const ErrorUpdate: Story = {
    args: {},
    decorators: [
        ReduxDecorator(
            {
                profile: {
                    data: mockUser,
                    form: mockUser,
                    isLoading: false,
                    error: undefined,
                    isUpdateLoading: false,
                    updateError: 'Сообщение об ошибке',
                    isEditing: true,
                },
            },
            { profile: profileReducer },
        ),
    ],
};
