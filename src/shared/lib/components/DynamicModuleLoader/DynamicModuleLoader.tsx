import { PropsWithChildren } from 'react';
import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from '#/shared/types/Redux';
import { useReducerManager } from '#/shared/lib/hooks/useReducerManager';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (
    props: PropsWithChildren<DynamicModuleLoaderProps>,
) => {
    const { children, reducers, removeAfterUnmount } = props;

    useReducerManager(reducers, removeAfterUnmount);

    return <>{children}</>;
};
