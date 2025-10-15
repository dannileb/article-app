import { FC } from 'react';
import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { ReducersList } from '#/shared/types/ReducersList.types';

export const ReduxDecorator =
    (initState: DeepPartial<StateSchema>, redusersList?: ReducersList) =>
    (Story: FC) =>
        (
            <ReduxProvider
                initialState={initState}
                asyncReducers={redusersList}
            >
                <Story />
            </ReduxProvider>
        );
