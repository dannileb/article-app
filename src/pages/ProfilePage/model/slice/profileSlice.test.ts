import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { Profile, ProfileSchema } from '../../model/types/profile.types';
import { setupLocalStorageMock } from '#/shared/lib/tests/mockLocalStorage';
import { DeepPartial } from '#/shared/types/DeepPartial.types';

describe('profileSlice.test', () => {
    beforeAll(() => {
        setupLocalStorageMock();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should should set profile', () => {
        const mockUser: Profile = {
            id: 1,
            username: 'test',
            name: 'test',
            surname: 'test',
            photo: 'test',
            age: 1,
            country: 'test',
            city: 'test',
            currency: 'test',
        };
        const state: DeepPartial<ProfileSchema> = {};
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setProfileForm(mockUser),
            ),
        ).toEqual({ form: mockUser });
    });
});
