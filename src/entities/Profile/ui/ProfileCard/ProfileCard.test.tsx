import { profileReducer } from '../../model/slice/profileSlice';
import { userReducer } from '#/entities/User';
import { renderWithProviders } from '#/shared/lib/tests/renderWithTranslation';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { ProfileCard } from './ProfileCard';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { $api } from '#/shared/api/api';

jest.mock('#/shared/api/api', () => ({
    rtkQueryApi: {
        reducerPath: 'api',
        reducer: () => ({}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        middleware: () => (next: any) => (action: any) => next(action),
    },
    $api: {
        get: jest.fn(),
        put: jest.fn(),
        post: jest.fn(),
        delete: jest.fn(),
    },
}));
const mockedAxios = jest.mocked($api);

const initialState: DeepPartial<StateSchema> = {
    user: {
        authData: {
            id: '1',
            username: 'test',
        },
    },
    profile: {
        data: {
            id: '1',
            username: 'test',
            name: 'test',
            surname: 'test',
            photo: 'test',
            age: 1,
            country: 'test',
            city: 'test',
            currency: 'test',
        },
        form: {
            id: '1',
            username: 'test',
            name: 'test',
            surname: 'test',
            photo: 'test',
            age: 1,
            country: 'test',
            city: 'test',
            currency: 'test',
        },
        readonly: false,
        isEditing: false,
        isLoading: false,
        isUpdateLoading: false,
        updateError: '',
        error: '',
    },
};

const asyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    user: userReducer,
    profile: profileReducer,
};

const renderOptions = {
    reduxProps: {
        initialState,
        asyncReducers,
    },
};

describe('ProfileEditor.test', () => {
    const fields = [
        'ProfileEditor.NameInput',
        'ProfileEditor.SurnameInput',
        'ProfileEditor.UsernameInput',
        'ProfileEditor.CountryInput',
        'ProfileEditor.CityInput',
        'ProfileEditor.CurrencyInput',
        'ProfileEditor.PhotoInput',
    ];

    const enterEditMode = () => {
        fireEvent.click(screen.getByTestId('ProfilePageToolbar.EditButton'));
    };

    const fillFields = () => {
        fields.forEach((testId) => {
            fireEvent.change(screen.getByTestId(testId), {
                target: { value: 'edited' },
            });
        });
        fireEvent.change(screen.getByTestId('ProfileEditor.AgeInput'), {
            target: { value: '20' },
        });
    };

    beforeEach(() => {
        renderWithProviders(
            <ProfileCard profileId="1" editable />,
            renderOptions,
        );
    });
    test('changes edit mode', () => {
        expect(
            screen.getByTestId('ProfilePageToolbar.EditButton'),
        ).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('ProfilePageToolbar.EditButton'));
        expect(
            screen.getByTestId('ProfilePageToolbar.CancelEditButton'),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('ProfilePageToolbar.SaveEditButton'),
        ).toBeInTheDocument();
    });

    test('changes input data', () => {
        enterEditMode();
        fillFields();
        fields.forEach((testId) => {
            expect(screen.getByTestId(testId)).toHaveValue('edited');
        });
        expect(screen.getByTestId('ProfileEditor.AgeInput')).toHaveValue(20);
    });

    test('reset input data', () => {
        enterEditMode();
        fillFields();
        fireEvent.click(
            screen.getByTestId('ProfilePageToolbar.CancelEditButton'),
        );
        fireEvent.click(screen.getByTestId('ProfilePageToolbar.EditButton'));
        fields.forEach((testId) => {
            expect(screen.getByTestId(testId)).toHaveValue('test');
        });
        expect(screen.getByTestId('ProfileEditor.AgeInput')).toHaveValue(1);
    });

    test('save input data', async () => {
        enterEditMode();
        fillFields();

        fireEvent.click(
            screen.getByTestId('ProfilePageToolbar.SaveEditButton'),
        );
        expect(mockedAxios.put).toHaveBeenCalledWith('/profile/1', {
            id: '1',
            name: 'edited',
            surname: 'edited',
            username: 'edited',
            country: 'edited',
            city: 'edited',
            currency: 'edited',
            photo: 'edited',
            age: 20,
        });
    });
});
