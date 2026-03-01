import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Rating } from './Rating';

const meta = {
    title: 'entities/Rating',
    component: Rating,
    tags: ['autodocs'],
    args: {
        title: 'Rating title',
        onSendFeedback: () => {},
    },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithFeedback: Story = {
    args: {
        feedback: 'Feedback',
        feedbackPlaceholder: 'Feedback placeholder',
        withFeedback: true,
    },
};
