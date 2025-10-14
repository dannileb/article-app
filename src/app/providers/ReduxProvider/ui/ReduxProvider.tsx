import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '#/app/providers/ReduxProvider/config/StateSchema';
import { createReduxStore } from '#/app/providers/ReduxProvider/config/store';
import { DeepPartial } from '#/shared/types/DeepPartial.types';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const ReduxProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
};
