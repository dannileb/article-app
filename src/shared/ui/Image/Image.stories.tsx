import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { AppImage } from './Image';

const meta = {
    title: 'shared/Image',
    component: AppImage,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
