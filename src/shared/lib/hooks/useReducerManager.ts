import { useAppDispatch } from '#/shared/lib/hooks/reduxHooks';
import { ReducersList, ReduxStoreWithManager } from '#/shared/types/Redux';
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
        Object.entries(redusersList).forEach(([name, reducer]) => {
            if (isKeyofRedusersList(name, redusersList)) {
                store.reducerManager.add(name, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeOnUnmount) {
                Object.entries(redusersList).forEach(([name]) => {
                    if (isKeyofRedusersList(name, redusersList)) {
                        store.reducerManager.remove(name);
                        dispatch({ type: `@DESTROY ${name} reducer` });
                    }
                });
            }
        };
    }, []);
};
