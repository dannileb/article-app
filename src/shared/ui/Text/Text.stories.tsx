import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Text } from './Text';

const meta = {
    title: 'shared/Text',
    component: Text,
    tags: ['autodocs'],
    args: {
        children:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus.',
        size: 'm',
        view: 'primary',
    },
} satisfies Meta<typeof Text>;

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
export const Size_S: Story = {
    args: {
        size: 's',
    },
};
export const Size_M: Story = {
    args: {
        size: 'm',
    },
};
export const Size_L: Story = {
    args: {
        size: 'l',
    },
};
