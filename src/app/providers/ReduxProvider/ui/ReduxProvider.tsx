import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '#/app/providers/ReduxProvider/config/StateSchema';
import { createReduxStore } from '#/app/providers/ReduxProvider/config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
}

export const ReduxProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState);

    return <Provider store={store}>{children}</Provider>;
};
