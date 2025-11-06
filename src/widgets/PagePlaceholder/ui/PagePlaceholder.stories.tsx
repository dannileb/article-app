import type { Meta, StoryObj } from '@storybook/react';

import { PagePlaceholder } from './PagePlaceholder';

const Component = PagePlaceholder;

const meta = {
    title: 'widgets/PagePlaceholder',
    component: Component,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithApiError: Story = {
    args: { i18nErrorKey: 'errorKey' },
};
