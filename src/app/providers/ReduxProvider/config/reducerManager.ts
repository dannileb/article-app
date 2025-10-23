import { ReducerManager, StateSchemaKey } from '#/shared/types/Redux';
import { combineReducers, ReducersMapObject } from '@reduxjs/toolkit';

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemaKey[] = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state, action) => {
            if (keysToRemove.length > 0 && state) {
                state = { ...state };
                for (const key of keysToRemove) {
                    delete state[key];
                }
                keysToRemove = [];
            }

            const filteredState =
                state &&
                Object.fromEntries(
                    Object.keys(reducers).map((key) => [
                        key as StateSchemaKey,
                        state[key as StateSchemaKey],
                    ]),
                );

            return combinedReducer(filteredState, action);
        },
        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },
        remove: (key) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        },
    };
}
