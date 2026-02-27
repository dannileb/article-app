import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';
import { Theme } from '#/shared/config/theme/ThemeContext';
import { ThemeDecorator } from '#/shared/config/storybook';
import { DownOutlined } from '@ant-design/icons';

const meta = {
    title: 'shared/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    args: {
        trigger: <Button icon={<DownOutlined />} />,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DefaultDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
