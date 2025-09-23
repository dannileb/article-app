import { renderWithTranslation } from '#/shared/lib/tests/renderWithTranslation';
import { SideBar } from '#/widgets/SideBar/ui/SideBar';
import { fireEvent, screen } from '@testing-library/react';

describe('SideBar', () => {
    test('Default render', () => {
        renderWithTranslation(SideBar);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toggle sidebar', () => {
        renderWithTranslation(SideBar);
        const toggleButton = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
