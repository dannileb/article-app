import { FC } from 'react';
import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';
import { DeepPartial } from '#/shared/types/DeepPartial.types';

export const ReduxDecorator =
    (initState: DeepPartial<StateSchema>) => (Story: FC) =>
        (
            <ReduxProvider initialState={initState}>
                <Story />
            </ReduxProvider>
        );
