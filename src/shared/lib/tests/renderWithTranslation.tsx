import { ReduxProvider } from '#/app/providers/ReduxProvider/ui/ReduxProvider';
import i18n from '#/shared/config/i18n/i18nForTests';
import {
    RtkqMock,
    RtkqMockInjector,
} from '#/shared/lib/redux/RtkqMockInjector';
import { render } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';

type ReduxProviderProps = Pick<
    ComponentProps<typeof ReduxProvider>,
    'initialState' | 'asyncReducers'
>;

type RenderWithProvidersOprions<Api> = {
    reduxProps?: ReduxProviderProps & { rtkqMocks?: RtkqMock<Api>[] };
};

export function renderWithProviders<Api>(
    component: ReactNode,
    options?: RenderWithProvidersOprions<Api>,
) {
    const { reduxProps } = options ?? {};
    return render(
        <MemoryRouter initialEntries={['/']}>
            <ReduxProvider
                initialState={reduxProps?.initialState}
                asyncReducers={reduxProps?.asyncReducers}
            >
                {options?.reduxProps?.rtkqMocks?.length ? (
                    <RtkqMockInjector mocks={options.reduxProps.rtkqMocks}>
                        <I18nextProvider i18n={i18n}>
                            {component}
                        </I18nextProvider>
                    </RtkqMockInjector>
                ) : (
                    <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
                )}
            </ReduxProvider>
        </MemoryRouter>,
    );
}
