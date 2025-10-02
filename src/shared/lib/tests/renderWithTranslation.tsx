import i18n from '#/shared/config/i18n/i18nForTests';
import { render } from '@testing-library/react';
import { ComponentType } from 'react';
import { I18nextProvider, withTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router';

export function renderWithProviders(component: ComponentType) {
    const ComponentWithTranslation = withTranslation()(component);
    return render(
        <MemoryRouter initialEntries={['/']}>
            <I18nextProvider i18n={i18n}>
                <ComponentWithTranslation />
            </I18nextProvider>
        </MemoryRouter>,
    );
}
