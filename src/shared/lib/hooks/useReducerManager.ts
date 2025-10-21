import { ReduxStoreWithManager } from '#/app/providers/ReduxProvider/config/StateSchema';
import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { ReducersList } from '#/shared/types/Redux';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

function isKeyofRedusersList(
    key: string,
    redusersList: ReducersList,
): key is keyof ReducersList {
    return key in redusersList;
}

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
        Object.entries(redusersList).forEach(([key, reducer]) => {
            if (isKeyofRedusersList(key, redusersList)) {
                store.reducerManager?.add(key, reducer);
            }
        });

        return () => {
            if (removeOnUnmount) {
                dispatch({
                    type: `@INIT RESET_REDUCERS: ${Object.keys(
                        redusersList,
                    ).join(', ')}`,
                });
                Object.keys(redusersList).forEach((key) => {
                    if (isKeyofRedusersList(key, redusersList)) {
                        store.reducerManager?.remove(key);
                    }
                });
            }
        };
    }, []);
};
