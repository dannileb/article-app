import { PropsWithChildren, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { RtkqMock } from './types';

export const RtkqMockInjector = <Api,>({
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
