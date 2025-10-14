import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Heading } from './Heading';

const meta = {
    title: 'shared/Heading',
    component: Heading,
    tags: ['autodocs'],
    args: {
        children:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus.',
        view: 'primary',
    },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = {
    args: {
        view: 'secondary',
    },
};
