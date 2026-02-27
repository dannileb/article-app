import type { Meta, StoryObj } from '@storybook/react';

import { NotificationsList } from './NotificationsList';
import { mockNotifications } from '../../consts/mocks';

const meta = {
    title: 'entities/NotificationsList',
    component: NotificationsList,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        notifications: mockNotifications,
        isLoading: false,
    },
} satisfies Meta<typeof NotificationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
