import { FC } from 'react';
import { BrowserRouter } from 'react-router';

export const RouterDecorator = (Story: FC) => (
    <BrowserRouter>
        <Story />
    </BrowserRouter>
);
