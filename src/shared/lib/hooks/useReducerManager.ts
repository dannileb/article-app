import { ReduxStoreWithManager } from '#/app/providers/ReduxProvider/config/StateSchema';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { ReducersList } from '#/shared/types/ReducersList.types';
import { Reducer } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useReducerManager = (
    redusersList: ReducersList,
    removeOnUnmount = true,
) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({
            type: `@INIT ADD_REDUCERS: ${Object.keys(redusersList).join(', ')}`,
        });
        Object.entries(redusersList).forEach(
            ([key, reducer]: [keyof StateSchema, Reducer]) => {
                store.reducerManager.add(key, reducer);
            },
        );

        return () => {
            if (removeOnUnmount) {
                dispatch({
                    type: `@INIT RESET_REDUCERS: ${Object.keys(
                        redusersList,
                    ).join(', ')}`,
                });
                Object.keys(redusersList).forEach((key: keyof StateSchema) => {
                    store.reducerManager.remove(key);
                });
            }
        };
    }, []);
};
