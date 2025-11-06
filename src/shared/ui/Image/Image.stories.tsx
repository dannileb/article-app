import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Image } from './Image';

const meta = {
    title: 'shared/Image',
    component: Image,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
