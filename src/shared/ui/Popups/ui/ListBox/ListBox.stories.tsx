import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ListBox } from './ListBox';

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    tags: ['autodocs'],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: '123',
        items: [
            { content: 'Item 1', value: '1' },
            { content: 'Item 2', value: '2' },
        ],
        onChange: (value) => console.log(value),
    },
};
