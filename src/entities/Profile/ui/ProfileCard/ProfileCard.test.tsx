import { profileReducer } from '../../model/slice/profileSlice';
import { userReducer } from '#/entities/User';
import { renderWithProviders } from '#/shared/lib/tests/renderWithTranslation';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { ProfileCard } from './ProfileCard';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { $api } from '#/shared/api/api';

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

describe('ProfileCard.test', () => {
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
        const mockedAxios = jest.spyOn($api, 'put');

        enterEditMode();
        fillFields();

        fireEvent.click(
            screen.getByTestId('ProfilePageToolbar.SaveEditButton'),
        );
        expect(mockedAxios).toHaveBeenCalledWith('/profile/1', {
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
