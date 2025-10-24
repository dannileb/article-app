import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Avatar } from './Avatar';

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    args: {
        src: '#',
        alt: 'avatar',
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
