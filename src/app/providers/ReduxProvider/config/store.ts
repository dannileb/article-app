import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '#/entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { $api, rtkQueryApi } from '#/shared/api/api';
import { preserveSrollPositionReducer } from '#/features/PreserveScrollPosition';

export function createReduxStore(
    initialState?: StateSchema,
    ascyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...ascyncReducers,
        user: userReducer,
        preserveScrollPosition: preserveSrollPositionReducer,
        [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }).concat(rtkQueryApi.middleware),
    });

    // @ts-expect-error fix later
    store.reducerManager = reducerManager;

    return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
