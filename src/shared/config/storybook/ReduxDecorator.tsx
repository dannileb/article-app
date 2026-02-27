import { FC } from 'react';
import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { ReducersList } from '#/shared/types/Redux/ReducersList.types';
import {
    RtkqMock,
    RtkqMockInjector,
} from '#/shared/lib/redux/RtkqMockInjector';

export const ReduxDecorator =
    <Api,>(
        initState: DeepPartial<StateSchema>,
        redusersList?: ReducersList,
        rtkqMocks?: RtkqMock<Api>[],
    ) =>
    (Story: FC) => (
        <ReduxProvider initialState={initState} asyncReducers={redusersList}>
            {rtkqMocks?.length ? (
                <RtkqMockInjector mocks={rtkqMocks}>
                    <Story />
                </RtkqMockInjector>
            ) : (
                <Story />
            )}
        </ReduxProvider>
    );
