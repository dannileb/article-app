import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';
import i18n from '#/shared/config/i18n/i18nForTests';
import { render } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';

type ReduxProviderProps = Pick<
    ComponentProps<typeof ReduxProvider>,
    'initialState' | 'asyncReducers'
>;

type RenderWithProvidersOprions = {
    reduxProps?: ReduxProviderProps;
};

export function renderWithProviders(
    component: ReactNode,
    options?: RenderWithProvidersOprions,
) {
    const { reduxProps } = options ?? {};
    return render(
        <MemoryRouter initialEntries={['/']}>
            <ReduxProvider
                initialState={reduxProps?.initialState}
                asyncReducers={reduxProps?.asyncReducers}
            >
                <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
            </ReduxProvider>
        </MemoryRouter>,
    );
}
