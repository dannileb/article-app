import { FC, PropsWithChildren, useEffect } from 'react';
import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { ReducersList } from '#/shared/types/Redux/ReducersList.types';
import { useStore } from 'react-redux';
import { Action } from '@reduxjs/toolkit';

type RtkqMock<A> = A extends {
    util: { upsertQueryData: (...args: infer Params) => unknown };
}
    ? {
          api: A;
          endpoint: Params[0];
          args: Params[1];
          data: Params[2];
      }
    : never;

const RtkqMockInjector = <Api,>({
    mocks,
    children,
}: PropsWithChildren<{ mocks: RtkqMock<Api>[] }>) => {
    const store = useStore();

    useEffect(() => {
        mocks?.forEach(({ api, endpoint, args, data }) => {
            store.dispatch(
                api.util.upsertQueryData(endpoint, args, data) as Action,
            );
        });
    }, [store, mocks]);

    return <>{children}</>;
};

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
