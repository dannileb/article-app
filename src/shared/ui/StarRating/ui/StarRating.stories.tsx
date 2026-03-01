import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { StarRating } from './StarRating';

const meta = {
    title: 'shared/StarRating',
    component: StarRating,
    tags: ['autodocs'],
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FivePoint: Story = {
    args: {
        ratingRange: 5,
        value: 3,
    },
};

export const TenPoint: Story = {
    args: {
        ratingRange: 10,
        value: 7,
    },
};

export const Disabled: Story = {
    args: {
        ratingRange: 5,
        value: 3,
        disabled: true,
    },
};
