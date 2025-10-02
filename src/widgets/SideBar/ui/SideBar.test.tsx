import { renderWithProviders } from '#/shared/lib/tests/renderWithTranslation';
import { SideBar } from '#/widgets/SideBar/ui/SideBar';
import { fireEvent, screen } from '@testing-library/react';

describe('SideBar', () => {
    test('Default render', () => {
        renderWithProviders(SideBar);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toggle sidebar', () => {
        renderWithProviders(SideBar);
        const toggleButton = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
