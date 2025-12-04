import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ProfileSchema } from '../../model/types/profile.types';
import { setupLocalStorageMock } from '#/shared/lib/tests/mockLocalStorage';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { Profile } from '#/entities/Profile';

const mockUser: Profile = {
    id: '1',
    username: 'test',
    name: 'test',
    surname: 'test',
    photo: 'test',
    age: 1,
    country: 'test',
    city: 'test',
    currency: 'test',
};

describe('profileSlice.test', () => {
    beforeAll(() => {
        setupLocalStorageMock();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should should set profile', () => {
        const state: DeepPartial<ProfileSchema> = {};
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setProfileForm(mockUser),
            ),
        ).toEqual({ form: mockUser });
    });

    test('should cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { ...mockUser, name: 'editedName' },
            data: mockUser,
            updateError: 'error message',
            isEditing: true,
        };

        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            form: mockUser,
            data: mockUser,
            updateError: undefined,
            isEditing: false,
        });
    });

    test('should set edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            isEditing: false,
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.edit()),
        ).toEqual({
            isEditing: true,
        });
    });
});
