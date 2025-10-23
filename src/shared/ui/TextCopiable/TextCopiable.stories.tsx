import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { TextCopiable } from './TextCopiable';

const meta = {
    title: 'shared/TextCopiable',
    component: TextCopiable,
    tags: ['autodocs'],
    args: {
        children:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus.',
        size: 'm',
        view: 'primary',
    },
} satisfies Meta<typeof TextCopiable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = {
    args: {
        view: 'secondary',
    },
};
export const Error: Story = {
    args: {
        view: 'error',
    },
};
