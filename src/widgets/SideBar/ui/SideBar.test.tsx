import { userReducer } from '#/entities/User';
import { renderWithProviders } from '#/shared/lib/tests/renderWithTranslation';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { SideBar } from '#/widgets/SideBar/ui/SideBar';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';

const initialState: DeepPartial<StateSchema> = {
    user: {
        authData: {
            id: '1',
            username: 'test',
        },
    },
};

const asyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    user: userReducer,
};

const renderOptions = {
    reduxProps: {
        initialState,
        asyncReducers,
    },
};

describe('SideBar', () => {
    test('Default render', () => {
        renderWithProviders(SideBar, renderOptions);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toggle sidebar', () => {
        renderWithProviders(SideBar, renderOptions);
        const toggleButton = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
