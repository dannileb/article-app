import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AddCommentForm from './AddCommentForm';
import { ThemeDecorator } from '#/shared/config/storybook';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ReduxDecorator } from '#/shared/config/storybook/ReduxDecorator';
import { addCommentReducer } from '../../model/slice/addCommentSlice';

const meta = {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    tags: ['autodocs'],
    args: {
        entityId: '1',
        entityType: 'articles',
    },
    decorators: [
        ReduxDecorator(
            {
                addComment: {},
            },
            {
                addComment: addCommentReducer,
            },
        ),
    ],
} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
